import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ZiarahSite } from '../data/sites';
import { initialSites } from '../data/initialSites';

interface SiteContextType {
  sites: ZiarahSite[];
  isLoading: boolean;
  isSeededInCloud: boolean;
  cloudSiteCount: number;
}

const SiteContext = createContext<SiteContextType>({
  sites: initialSites,
  isLoading: false,
  isSeededInCloud: false,
  cloudSiteCount: 0,
});

export const useSites = () => useContext(SiteContext);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<ZiarahSite[]>(initialSites);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeededInCloud, setIsSeededInCloud] = useState(false);
  const [cloudSiteCount, setCloudSiteCount] = useState(0);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;
    let fullLocalSites: ZiarahSite[] = initialSites;

    // 1. Hydrate full 96-site catalog right after initial paint so LCP/FCP are never blocked by 210 KB JS
    const hydrateTimer = window.setTimeout(async () => {
      try {
        const { ziarahSites } = await import('../data/sites');
        if (cancelled) return;
        fullLocalSites = ziarahSites;
        setSites((prev) => (prev.length <= initialSites.length ? ziarahSites : prev));
      } catch {}
    }, 60);

    // 2. Connect Cloud Firestore listener after LCP settles
    const connectCloudSites = async () => {
      if (cancelled) return;
      try {
        const [{ ziarahSites: loadedLocalSites }, { db }, { collection, onSnapshot }] = await Promise.all([
          import('../data/sites'),
          import('../lib/firebase'),
          import('firebase/firestore'),
        ]);
        if (cancelled) return;
        fullLocalSites = loadedLocalSites;

        unsubscribe = onSnapshot(
          collection(db, 'sites'),
          (snapshot) => {
            if (!snapshot.empty) {
              const fetchedSites = snapshot.docs.map((docSnap) => docSnap.data() as ZiarahSite);
              const localMap = new Map<string, ZiarahSite>();
              fullLocalSites.forEach((s) => localMap.set(s.id, s));

              const mergedMap = new Map<string, ZiarahSite>();
              fullLocalSites.forEach((s) => mergedMap.set(s.id, s));

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
              setSites(fullLocalSites);
              setIsSeededInCloud(false);
              setCloudSiteCount(0);
            }
            setIsLoading(false);
          },
          () => {
            setSites(fullLocalSites);
            setIsSeededInCloud(false);
            setIsLoading(false);
          }
        );
      } catch {
        setSites(fullLocalSites);
        setIsSeededInCloud(false);
        setIsLoading(false);
      }
    };

    const cloudTimer = window.setTimeout(connectCloudSites, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(hydrateTimer);
      window.clearTimeout(cloudTimer);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <SiteContext.Provider value={{ sites, isLoading, isSeededInCloud, cloudSiteCount }}>
      {children}
    </SiteContext.Provider>
  );
};

