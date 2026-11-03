import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { ZiarahSite } from '../data/sites';
import { initialSites } from '../data/initialSites';

interface SiteContextType {
  sites: ZiarahSite[];
  isLoading: boolean;
  isSeededInCloud: boolean;
  cloudSiteCount: number;
  ensureFullSitesLoaded: () => Promise<ZiarahSite[]>;
}

const SiteContext = createContext<SiteContextType>({
  sites: initialSites,
  isLoading: false,
  isSeededInCloud: false,
  cloudSiteCount: 0,
  ensureFullSitesLoaded: async () => initialSites,
});

export const useSites = () => useContext(SiteContext);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<ZiarahSite[]>(initialSites);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeededInCloud, setIsSeededInCloud] = useState(false);
  const [cloudSiteCount, setCloudSiteCount] = useState(0);
  const fullLocalSitesRef = useRef<ZiarahSite[]>(initialSites);
  const hasLoadedLocalRef = useRef(false);
  const hasConnectedCloudRef = useRef(false);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const ensureFullSitesLoaded = useCallback(async (): Promise<ZiarahSite[]> => {
    if (hasLoadedLocalRef.current) {
      return fullLocalSitesRef.current;
    }
    hasLoadedLocalRef.current = true;
    try {
      const { ziarahSites } = await import('../data/sites');
      fullLocalSitesRef.current = ziarahSites;
      setSites((prev) => (prev.length <= initialSites.length ? ziarahSites : prev));
      return ziarahSites;
    } catch {
      hasLoadedLocalRef.current = false;
      return fullLocalSitesRef.current;
    }
  }, []);

  const connectCloudSites = useCallback(async () => {
    if (hasConnectedCloudRef.current) return;
    hasConnectedCloudRef.current = true;
    try {
      const [loadedLocalSites, { db }, { collection, onSnapshot }] = await Promise.all([
        ensureFullSitesLoaded(),
        import('../lib/firebase'),
        import('firebase/firestore'),
      ]);

      unsubscribeRef.current = onSnapshot(
        collection(db, 'sites'),
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedSites = snapshot.docs.map((docSnap) => docSnap.data() as ZiarahSite);
            const localMap = new Map<string, ZiarahSite>();
            loadedLocalSites.forEach((s) => localMap.set(s.id, s));

            const mergedMap = new Map<string, ZiarahSite>();
            loadedLocalSites.forEach((s) => mergedMap.set(s.id, s));

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
            setSites(loadedLocalSites);
            setIsSeededInCloud(false);
            setCloudSiteCount(0);
          }
          setIsLoading(false);
        },
        () => {
          setSites(loadedLocalSites);
          setIsSeededInCloud(false);
          setIsLoading(false);
        }
      );
    } catch {
      setIsLoading(false);
    }
  }, [ensureFullSitesLoaded]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If user lands directly on a deep route (/peta, /situs/*, /makam/*, /admin), load full catalog right away
    const path = window.location.pathname;
    if (path !== '/' && path !== '/direktori') {
      ensureFullSitesLoaded();
    }
    if (path.startsWith('/admin') || path.startsWith('/kurator')) {
      connectCloudSites();
    }

    // On homepage/directory, defer loading 210 KB sites catalog & 420 KB Firebase SDK until first user interaction
    const onFirstInteraction = () => {
      cleanupListeners();
      ensureFullSitesLoaded();
      window.setTimeout(() => {
        connectCloudSites();
      }, 1200);
    };

    const events: (keyof WindowEventMap)[] = ['pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll'];
    const cleanupListeners = () => {
      events.forEach((evt) => window.removeEventListener(evt, onFirstInteraction));
    };

    events.forEach((evt) => window.addEventListener(evt, onFirstInteraction, { once: true, passive: true }));

    return () => {
      cleanupListeners();
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [ensureFullSitesLoaded, connectCloudSites]);

  return (
    <SiteContext.Provider
      value={{ sites, isLoading, isSeededInCloud, cloudSiteCount, ensureFullSitesLoaded }}
    >
      {children}
    </SiteContext.Provider>
  );
};


