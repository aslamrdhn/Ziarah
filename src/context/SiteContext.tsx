import React, { createContext, useContext, useState, useEffect } from 'react';
import { ZiarahSite, ziarahSites as localSites } from '../data/sites';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface SiteContextType {
  sites: ZiarahSite[];
  isLoading: boolean;
}

const SiteContext = createContext<SiteContextType>({ sites: [], isLoading: true });

export const useSites = () => useContext(SiteContext);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<ZiarahSite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to firestore for real-time updates or just fetch once.
    // Given the dataset, we can fetch once or use onSnapshot for real-time.
    const unsubscribe = onSnapshot(
      collection(db, 'sites'),
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedSites = snapshot.docs.map(doc => doc.data() as ZiarahSite);
          setSites(fetchedSites);
        } else {
          // Fallback to local if empty, or just stay empty so user can seed it
          setSites([]); 
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching sites from Firestore:", error);
        // Fallback to local if error
        setSites(localSites);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <SiteContext.Provider value={{ sites, isLoading }}>
      {children}
    </SiteContext.Provider>
  );
};
