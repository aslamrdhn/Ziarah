import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import type { ZiarahSite } from '../data/sites';
import { initialSites } from '../data/initialSites';
import { getSiteSlug } from '../lib/siteSlugs';

interface SiteContextType {
  sites: ZiarahSite[];
  isLoading: boolean;
  isFullCatalogLoaded: boolean;
  isSeededInCloud: boolean;
  cloudSiteCount: number;
  ensureFullSitesLoaded: () => Promise<ZiarahSite[]>;
  refreshCloudSites: (forceRefresh?: boolean) => Promise<void>;
}

const SiteContext = createContext<SiteContextType>({
  sites: initialSites,
  isLoading: false,
  isFullCatalogLoaded: false,
  isSeededInCloud: false,
  cloudSiteCount: 0,
  ensureFullSitesLoaded: async () => initialSites,
  refreshCloudSites: async () => {},
});

const CLOUD_SITES_CACHE_KEY = 'zn_cloud_sites_cache_v1';
const ADMIN_DIRTY_TS_KEY = 'zn_admin_dirty_ts';

interface CachedCloudSitesPayload {
  ts: number;
  sites: Array<ZiarahSite & { isDeleted?: boolean }>;
}

/**
 * Merges static local sites with Firestore `/sites` documents.
 * - Matches each `cloudSite` against `localSites` by `s.id === cloudSite.id`
 *   OR `getSiteSlug(s) === cloudSite.id` OR `getSiteSlug(s) === getSiteSlug(cloudSite)`.
 * - Preserves canonical `id` (`baseLocal.id`) and overrides ALL fields from `cloudSite`
 *   so edits in Admin Kurator immediately replace static fields.
 * - Supports soft-delete (`isDeleted: true`) tombstones by ID or slug.
 */
export function mergeLocalAndCloudSites(
  localSites: ZiarahSite[],
  cloudSites: Array<ZiarahSite & { isDeleted?: boolean }>
): ZiarahSite[] {
  const mergedMap = new Map<string, ZiarahSite>();
  for (const s of localSites) {
    mergedMap.set(s.id, s);
  }

  for (const cloudSite of cloudSites) {
    if (!cloudSite || !cloudSite.id) continue;

    const cloudSlug = getSiteSlug({
      id: cloudSite.id,
      title: cloudSite.title || '',
      location: cloudSite.location || {
        lat: 0,
        lng: 0,
        address: '',
        city: '',
        province: '',
      },
    });

    const baseLocal = localSites.find(
      (s) =>
        s.id === cloudSite.id ||
        getSiteSlug(s) === cloudSite.id ||
        (Boolean(cloudSlug) && getSiteSlug(s) === cloudSlug)
    );

    const canonicalId = baseLocal ? baseLocal.id : cloudSite.id;

    if (cloudSite.isDeleted === true) {
      mergedMap.delete(canonicalId);
      mergedMap.delete(cloudSite.id);
      continue;
    }

    if (baseLocal) {
      const mergedLocation = {
        address:
          cloudSite.location?.address !== undefined
            ? cloudSite.location.address
            : baseLocal.location.address,
        city:
          cloudSite.location?.city !== undefined
            ? cloudSite.location.city
            : baseLocal.location.city,
        province:
          cloudSite.location?.province !== undefined
            ? cloudSite.location.province
            : baseLocal.location.province,
        lat:
          typeof cloudSite.location?.lat === 'number' && !Number.isNaN(cloudSite.location.lat)
            ? cloudSite.location.lat
            : baseLocal.location.lat,
        lng:
          typeof cloudSite.location?.lng === 'number' && !Number.isNaN(cloudSite.location.lng)
            ? cloudSite.location.lng
            : baseLocal.location.lng,
      };

      const mergedSite: ZiarahSite = {
        ...baseLocal,
        ...cloudSite,
        id: baseLocal.id,
        name: cloudSite.name !== undefined ? cloudSite.name : baseLocal.name,
        title: cloudSite.title !== undefined ? cloudSite.title : baseLocal.title,
        category: cloudSite.category !== undefined ? cloudSite.category : baseLocal.category,
        era: cloudSite.era !== undefined ? cloudSite.era : baseLocal.era,
        location: mergedLocation,
        description:
          cloudSite.description !== undefined ? cloudSite.description : baseLocal.description,
        history: cloudSite.history !== undefined ? cloudSite.history : baseLocal.history,
        karomah:
          Array.isArray(cloudSite.karomah) ? cloudSite.karomah : baseLocal.karomah,
        untoldStory:
          cloudSite.untoldStory !== undefined ? cloudSite.untoldStory : baseLocal.untoldStory,
        barokahHajat:
          cloudSite.barokahHajat !== undefined ? cloudSite.barokahHajat : baseLocal.barokahHajat,
        doaKhusus:
          Array.isArray(cloudSite.doaKhusus) ? cloudSite.doaKhusus : baseLocal.doaKhusus,
        haulSchedule:
          cloudSite.haulSchedule !== undefined ? cloudSite.haulSchedule : baseLocal.haulSchedule,
        localAdab:
          cloudSite.localAdab !== undefined ? cloudSite.localAdab : baseLocal.localAdab,
        sanad: cloudSite.sanad !== undefined ? cloudSite.sanad : baseLocal.sanad,
        karya: Array.isArray(cloudSite.karya) ? cloudSite.karya : baseLocal.karya,
        openingHours:
          cloudSite.openingHours !== undefined ? cloudSite.openingHours : baseLocal.openingHours,
        facilities:
          Array.isArray(cloudSite.facilities) ? cloudSite.facilities : baseLocal.facilities,
        imageUrl: cloudSite.imageUrl !== undefined ? cloudSite.imageUrl : baseLocal.imageUrl,
        imageSource:
          cloudSite.imageSource !== undefined ? cloudSite.imageSource : baseLocal.imageSource,
        references:
          Array.isArray(cloudSite.references) ? cloudSite.references : baseLocal.references,
      };
      mergedMap.set(baseLocal.id, mergedSite);
    } else if (
      cloudSite.name &&
      cloudSite.title &&
      cloudSite.location &&
      typeof cloudSite.location.lat === 'number' &&
      typeof cloudSite.location.lng === 'number'
    ) {
      mergedMap.set(cloudSite.id, cloudSite);
    }
  }

  return Array.from(mergedMap.values());
}

function getInitialHydratedSites(): ZiarahSite[] {
  if (typeof window === 'undefined') return initialSites;
  try {
    const rawCached = localStorage.getItem(CLOUD_SITES_CACHE_KEY);
    if (!rawCached) return initialSites;
    const parsed = JSON.parse(rawCached) as CachedCloudSitesPayload;
    if (parsed && Array.isArray(parsed.sites) && parsed.sites.length > 0) {
      return mergeLocalAndCloudSites(initialSites, parsed.sites);
    }
  } catch {
    // Ignore malformed cache
  }
  return initialSites;
}

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sites, setSites] = useState<ZiarahSite[]>(() => getInitialHydratedSites());
  const [isFullCatalogLoaded, setIsFullCatalogLoaded] = useState(false);
  const [cloudSiteCount, setCloudSiteCount] = useState(0);
  const fullLocalSitesRef = useRef<ZiarahSite[] | null>(null);
  const fullLoadPromiseRef = useRef<Promise<ZiarahSite[]> | null>(null);
  const cloudLoadedRef = useRef(false);

  const ensureFullSitesLoaded = useCallback(async (): Promise<ZiarahSite[]> => {
    if (fullLocalSitesRef.current) {
      return fullLocalSitesRef.current;
    }
    if (!fullLoadPromiseRef.current) {
      fullLoadPromiseRef.current = import('../data/sites').then((mod) => {
        fullLocalSitesRef.current = mod.ziarahSites;
        setIsFullCatalogLoaded(true);
        setSites((prev) => {
          let cachedCloud: Array<ZiarahSite & { isDeleted?: boolean }> = [];
          try {
            const raw = localStorage.getItem(CLOUD_SITES_CACHE_KEY);
            if (raw) {
              const parsed = JSON.parse(raw) as CachedCloudSitesPayload;
              if (parsed && Array.isArray(parsed.sites)) {
                cachedCloud = parsed.sites;
              }
            }
          } catch {}
          if (cachedCloud.length > 0) {
            return mergeLocalAndCloudSites(mod.ziarahSites, cachedCloud);
          }
          const prevMap = new Map(prev.map((s) => [s.id, s]));
          return mod.ziarahSites.map((s) => prevMap.get(s.id) || s);
        });
        return mod.ziarahSites;
      });
    }
    return fullLoadPromiseRef.current;
  }, []);

  /**
   * Stale-While-Revalidate Cloud Sync (via one-shot getDocs, zero Listen/channel overhead):
   * - If `forceRefresh === true`, clears `zn_cloud_sites_cache_v1` first.
   * - If `!forceRefresh` and `localStorage` has cached cloud sites, immediately renders
   *   the merged cached state, then fetches fresh `/sites` from Firestore so Admin changes appear immediately.
   */
  const refreshCloudSites = useCallback(
    async (forceRefresh = false) => {
      const localCatalog = await ensureFullSitesLoaded();

      if (forceRefresh) {
        try {
          localStorage.removeItem(CLOUD_SITES_CACHE_KEY);
        } catch {
          // Ignore storage error
        }
      } else {
        try {
          const rawCached = localStorage.getItem(CLOUD_SITES_CACHE_KEY);
          if (rawCached) {
            const parsed = JSON.parse(rawCached) as CachedCloudSitesPayload;
            if (parsed && Array.isArray(parsed.sites)) {
              setSites(mergeLocalAndCloudSites(localCatalog, parsed.sites));
            }
          }
        } catch {
          // Ignore malformed cache and proceed to network revalidation
        }
      }

      try {
        const [{ db }, { collection, getDocs }] = await Promise.all([
          import('../lib/firebase'),
          import('firebase/firestore'),
        ]);

        const snapshot = await getDocs(collection(db, 'sites'));
        const cloudSites: Array<ZiarahSite & { isDeleted?: boolean }> = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data() as ZiarahSite & { isDeleted?: boolean };
          cloudSites.push({ ...data, id: docSnap.id });
        });

        try {
          const payload: CachedCloudSitesPayload = {
            ts: Date.now(),
            sites: cloudSites,
          };
          localStorage.setItem(CLOUD_SITES_CACHE_KEY, JSON.stringify(payload));
        } catch {
          // Ignore quota error
        }

        const activeCloudCount = cloudSites.filter((s) => !s.isDeleted).length;
        setCloudSiteCount(activeCloudCount);

        if (cloudSites.length > 0) {
          setSites(mergeLocalAndCloudSites(localCatalog, cloudSites));
        } else {
          setSites(localCatalog);
        }
      } catch {
        // Fallback silently to local/cached catalog when offline
      }
    },
    [ensureFullSitesLoaded]
  );

  useEffect(() => {
    let mounted = true;

    const triggerFullAndCloudSync = (force = false) => {
      if (!mounted) return;
      if (!force && cloudLoadedRef.current) return;
      cloudLoadedRef.current = true;
      void refreshCloudSites(force);
    };

    const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
    const needsImmediateCatalog =
      pathname.startsWith('/admin') ||
      pathname.startsWith('/kurator') ||
      pathname.startsWith('/peta') ||
      pathname.startsWith('/situs') ||
      pathname.startsWith('/makam') ||
      pathname.startsWith('/rubrik') ||
      pathname.startsWith('/doa');

    let hasAdminDirtyFlag = false;
    try {
      hasAdminDirtyFlag = Boolean(localStorage.getItem(ADMIN_DIRTY_TS_KEY));
    } catch {}

    const interactionEvents = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;

    const handleFirstInteraction = () => {
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, handleFirstInteraction)
      );
      triggerFullAndCloudSync(false);
    };

    if (needsImmediateCatalog || hasAdminDirtyFlag) {
      triggerFullAndCloudSync(hasAdminDirtyFlag);
    } else if (typeof window !== 'undefined') {
      interactionEvents.forEach((evt) =>
        window.addEventListener(evt, handleFirstInteraction, { once: true, passive: true })
      );
    }

    const handleStorage = (e: StorageEvent) => {
      if (!mounted) return;
      if (e.key === ADMIN_DIRTY_TS_KEY || e.key === CLOUD_SITES_CACHE_KEY) {
        cloudLoadedRef.current = false;
        triggerFullAndCloudSync(true);
      }
    };

    const handleFocus = () => {
      if (!mounted) return;
      try {
        if (localStorage.getItem(ADMIN_DIRTY_TS_KEY)) {
          cloudLoadedRef.current = false;
          triggerFullAndCloudSync(true);
        }
      } catch {}
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleFocus);

    return () => {
      mounted = false;
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, handleFirstInteraction)
      );
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
  }, [ensureFullSitesLoaded, refreshCloudSites]);

  return (
    <SiteContext.Provider
      value={{
        sites,
        isLoading: false,
        isFullCatalogLoaded,
        isSeededInCloud: cloudSiteCount > 0,
        cloudSiteCount,
        ensureFullSitesLoaded,
        refreshCloudSites,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSites = () => useContext(SiteContext);
