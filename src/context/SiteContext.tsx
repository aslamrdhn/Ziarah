import React, { createContext, useContext, useState, useEffect, useCallback, useRef, useMemo, startTransition } from 'react';
import type { ZiarahSite } from '../data/sites';
import { initialSites } from '../data/initialSites';

const CLOUD_SITES_CACHE_KEY = 'zn_cloud_sites_cache_v1';
const CLOUD_SITES_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

interface SiteContextType {
  sites: ZiarahSite[];
  isLoading: boolean;
  isSeededInCloud: boolean;
  cloudSiteCount: number;
  ensureFullSitesLoaded: () => Promise<ZiarahSite[]>;
  refreshCloudSites: (forceNetwork?: boolean) => Promise<void>;
}

const SiteContext = createContext<SiteContextType>({
  sites: initialSites,
  isLoading: false,
  isSeededInCloud: false,
  cloudSiteCount: 0,
  ensureFullSitesLoaded: async () => initialSites,
  refreshCloudSites: async () => {},
});

export const useSites = () => useContext(SiteContext);

function scheduleIdleTask(cb: () => void, timeoutMs = 1500): number {
  if (typeof window === 'undefined') return 0;
  const win = window as Window & {
    requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  };
  if (typeof win.requestIdleCallback === 'function') {
    return win.requestIdleCallback(cb, { timeout: timeoutMs });
  }
  return window.setTimeout(cb, 250);
}

function mergeLocalAndCloudSites(loadedLocalSites: ZiarahSite[], fetchedSites: ZiarahSite[]): ZiarahSite[] {
  const localMap = new Map<string, ZiarahSite>();
  loadedLocalSites.forEach((s) => localMap.set(s.id, s));

  const mergedMap = new Map<string, ZiarahSite>();
  loadedLocalSites.forEach((s) => mergedMap.set(s.id, s));

  const legacyPlaceholder =
    'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=900&q=80';

  fetchedSites.forEach((cloudSite) => {
    const baseLocal = localMap.get(cloudSite.id);
    if (baseLocal) {
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

  return Array.from(mergedMap.values());
}

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<ZiarahSite[]>(initialSites);
  const [isLoading, setIsLoading] = useState(false);
  const [isSeededInCloud, setIsSeededInCloud] = useState(false);
  const [cloudSiteCount, setCloudSiteCount] = useState(0);
  const fullLocalSitesRef = useRef<ZiarahSite[]>(initialSites);
  const hasLoadedLocalRef = useRef(false);
  const hasConnectedCloudRef = useRef(false);

  const ensureFullSitesLoaded = useCallback(async (): Promise<ZiarahSite[]> => {
    if (hasLoadedLocalRef.current) {
      return fullLocalSitesRef.current;
    }
    hasLoadedLocalRef.current = true;
    try {
      const { ziarahSites } = await import('../data/sites');
      fullLocalSitesRef.current = ziarahSites;
      startTransition(() => {
        setSites((prev) => (prev.length <= initialSites.length ? ziarahSites : prev));
      });
      return ziarahSites;
    } catch {
      hasLoadedLocalRef.current = false;
      return fullLocalSitesRef.current;
    }
  }, []);

  const refreshCloudSites = useCallback(async (forceNetwork = false) => {
    try {
      const loadedLocalSites = await ensureFullSitesLoaded();

      // Check local TTL cache first for public visitors to save Firestore read quota (F-05)
      if (!forceNetwork && typeof window !== 'undefined') {
        try {
          const cachedRaw = localStorage.getItem(CLOUD_SITES_CACHE_KEY);
          if (cachedRaw) {
            const parsed = JSON.parse(cachedRaw) as { ts: number; data: ZiarahSite[] };
            if (parsed && Array.isArray(parsed.data) && Date.now() - parsed.ts < CLOUD_SITES_CACHE_TTL_MS) {
              if (parsed.data.length > 0) {
                const mergedCached = mergeLocalAndCloudSites(loadedLocalSites, parsed.data);
                startTransition(() => {
                  setSites(mergedCached);
                  setIsSeededInCloud(true);
                  setCloudSiteCount(parsed.data.length);
                  setIsLoading(false);
                });
                return;
              }
            }
          }
        } catch {
          // Ignore cache parse error and proceed to Firestore getDocs
        }
      }

      const [{ db }, { collection, getDocs }] = await Promise.all([
        import('../lib/firebase'),
        import('firebase/firestore'),
      ]);

      const snapshot = await getDocs(collection(db, 'sites'));
      if (!snapshot.empty) {
        const fetchedSites = snapshot.docs.map((docSnap) => docSnap.data() as ZiarahSite);
        const mergedCloud = mergeLocalAndCloudSites(loadedLocalSites, fetchedSites);
        startTransition(() => {
          setSites(mergedCloud);
          setIsSeededInCloud(true);
          setCloudSiteCount(fetchedSites.length);
          setIsLoading(false);
        });
        try {
          localStorage.setItem(
            CLOUD_SITES_CACHE_KEY,
            JSON.stringify({ ts: Date.now(), data: fetchedSites })
          );
        } catch {
          // Ignore storage quota warning
        }
      } else {
        startTransition(() => {
          setIsSeededInCloud(false);
          setCloudSiteCount(0);
          setIsLoading(false);
        });
      }
    } catch {
      setIsLoading(false);
    }
  }, [ensureFullSitesLoaded]);

  const connectCloudSites = useCallback(async () => {
    if (hasConnectedCloudRef.current) return;
    hasConnectedCloudRef.current = true;
    await refreshCloudSites(false);
  }, [refreshCloudSites]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;
    if (path !== '/' && path !== '/direktori') {
      ensureFullSitesLoaded();
    }
    if (path.startsWith('/admin') || path.startsWith('/kurator')) {
      connectCloudSites();
    }

    let cloudTimerId: number | undefined;
    const onFirstInteraction = (e: Event) => {
      if (e.type === 'scroll' && window.scrollY < 48) return;
      cleanupListeners();
      scheduleIdleTask(() => {
        ensureFullSitesLoaded();
      }, 800);
      cloudTimerId = window.setTimeout(() => {
        scheduleIdleTask(() => {
          connectCloudSites();
        }, 2500);
      }, 2200);
    };

    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown'];
    const cleanupListeners = () => {
      events.forEach((evt) => window.removeEventListener(evt, onFirstInteraction));
      window.removeEventListener('scroll', onFirstInteraction);
    };

    events.forEach((evt) => window.addEventListener(evt, onFirstInteraction, { passive: true }));
    window.addEventListener('scroll', onFirstInteraction, { passive: true });

    return () => {
      cleanupListeners();
      if (cloudTimerId !== undefined) window.clearTimeout(cloudTimerId);
    };
  }, [ensureFullSitesLoaded, connectCloudSites]);

  const contextValue = useMemo<SiteContextType>(
    () => ({
      sites,
      isLoading,
      isSeededInCloud,
      cloudSiteCount,
      ensureFullSitesLoaded,
      refreshCloudSites,
    }),
    [sites, isLoading, isSeededInCloud, cloudSiteCount, ensureFullSitesLoaded, refreshCloudSites]
  );

  return <SiteContext.Provider value={contextValue}>{children}</SiteContext.Provider>;
};


