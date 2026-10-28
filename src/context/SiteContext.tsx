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
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;

    const connectCloudSites = () => {
      if (cancelled) return;
      unsubscribe = onSnapshot(
        collection(db, 'sites'),
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedSites = snapshot.docs.map((docSnap) => docSnap.data() as ZiarahSite);
            const localMap = new Map<string, ZiarahSite>();
            localSites.forEach((s) => localMap.set(s.id, s));

            // Merge cloud sites with enriched local data & preserve newly added local sites
            const mergedMap = new Map<string, ZiarahSite>();
            localSites.forEach((s) => mergedMap.set(s.id, s));

            fetchedSites.forEach((cloudSite) => {
              const baseLocal = localMap.get(cloudSite.id);
              if (baseLocal) {
                mergedMap.set(cloudSite.id, {
                  ...baseLocal,
                  ...cloudSite,
                  imageUrl: baseLocal.imageUrl,
                  imageSource: cloudSite.imageSource || baseLocal.imageSource,
                  era: cloudSite.era || baseLocal.era,
                  sanad: cloudSite.sanad || baseLocal.sanad,
                  karya: cloudSite.karya && cloudSite.karya.length > 0 ? cloudSite.karya : baseLocal.karya,
                  references:
                    cloudSite.references && cloudSite.references.length > 0
                      ? cloudSite.references
                      : baseLocal.references,
                  karomah:
                    cloudSite.karomah && cloudSite.karomah.length > 0 ? cloudSite.karomah : baseLocal.karomah,
                  doaKhusus:
                    cloudSite.doaKhusus && cloudSite.doaKhusus.length > 0
                      ? cloudSite.doaKhusus
                      : baseLocal.doaKhusus,
                  untoldStory: cloudSite.untoldStory || baseLocal.untoldStory,
                });
              } else {
                mergedMap.set(cloudSite.id, cloudSite);
              }
            });

            setSites(Array.from(mergedMap.values()));
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
          setSites(localSites);
          setIsSeededInCloud(false);
          setIsLoading(false);
        }
      );
    };

    // Defer cloud listener slightly so initial render & LCP complete with zero main-thread contention
    const timer = window.setTimeout(connectCloudSites, 2200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <SiteContext.Provider value={{ sites, isLoading, isSeededInCloud, cloudSiteCount }}>
      {children}
    </SiteContext.Provider>
  );
};
