import React, { createContext, useContext, useState, useEffect } from 'react';
import { ZiarahSite, ziarahSites as localSites } from '../data/sites';

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

    const connectCloudSites = async () => {
      if (cancelled) return;
      try {
        const [{ db }, { collection, onSnapshot }] = await Promise.all([
          import('../lib/firebase'),
          import('firebase/firestore'),
        ]);
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
                const legacyPlaceholder =
                  'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80';
                const effectiveImageUrl =
                  cloudSite.imageUrl &&
                  cloudSite.imageUrl.trim() !== '' &&
                  cloudSite.imageUrl.trim() !== legacyPlaceholder
                    ? cloudSite.imageUrl.trim()
                    : baseLocal.imageUrl;

                mergedMap.set(cloudSite.id, {
                  ...baseLocal,
                  ...cloudSite,
                  imageUrl: effectiveImageUrl,
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
                  haulSchedule: cloudSite.haulSchedule || baseLocal.haulSchedule,
                  localAdab: cloudSite.localAdab || baseLocal.localAdab,
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
      } catch {
        setSites(localSites);
        setIsSeededInCloud(false);
        setIsLoading(false);
      }
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
