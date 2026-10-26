import React, { createContext, useContext, useState, useEffect } from 'react';
import { ZiarahSite, ziarahSites as localSites } from '../data/sites';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface SiteContextType {
  sites: ZiarahSite[];
  isLoading: boolean;
  isSeededInCloud: boolean;
  cloudSiteCount: number;
}

const SiteContext = createContext<SiteContextType>({
  sites: localSites,
  isLoading: false,
  isSeededInCloud: false,
  cloudSiteCount: 0,
});

export const useSites = () => useContext(SiteContext);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<ZiarahSite[]>(localSites);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeededInCloud, setIsSeededInCloud] = useState(false);
  const [cloudSiteCount, setCloudSiteCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'sites'),
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedSites = snapshot.docs.map(doc => doc.data() as ZiarahSite);
          setSites(fetchedSites);
          setIsSeededInCloud(true);
          setCloudSiteCount(fetchedSites.length);
        } else {
          setSites(localSites);
          setIsSeededInCloud(false);
          setCloudSiteCount(0);
        }
        setIsLoading(false);
      },
      () => {
        // Gracefully use local fallback when offline or unreachable
        setSites(localSites);
        setIsSeededInCloud(false);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <SiteContext.Provider value={{ sites, isLoading, isSeededInCloud, cloudSiteCount }}>
      {children}
    </SiteContext.Provider>
  );
};
