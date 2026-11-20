import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Circle,
  useMap,
  useMapEvents,
  ZoomControl,
} from 'react-leaflet';
import { ZiarahSite } from '../data/sites';
import L from 'leaflet';
import {
  MapPin,
  Navigation,
  Route as RouteIcon,
  Calendar,
  BookOpen,
  X,
  ExternalLink,
  LocateFixed,
  Share2,
  Search,
  AlertCircle,
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { optimizeSiteImageUrl, handleOptimizedImageError } from '../lib/imageOptimizer';
import { useAuthenticSiteImage, getRegionalArchitecturalPhoto } from '../lib/authenticSiteImages';
import {
  CURATED_ZIARAH_ROUTES,
  CuratedZiarahRoute,
  calculateDistanceKm,
  getSiteLogistics,
} from '../lib/siteLogistics';
import { getSiteGoogleMapsNavigationUrl } from './SiteDetails';
import { stripMarkdownAsterisks } from '../lib/formatText';
import { getSiteDisplayHeading } from '../lib/siteSlugs';

const MapRouteThumbImage: React.FC<{ site: ZiarahSite; className?: string; width?: number }> = React.memo(
  ({ site, className = 'w-full h-full object-cover', width = 160 }) => {
    const resolvedUrl = useAuthenticSiteImage(site);
    const fallbackUrl = getRegionalArchitecturalPhoto(site);
    return (
      <img
        src={optimizeSiteImageUrl(resolvedUrl, width, 72)}
        onError={(e) => handleOptimizedImageError(e, resolvedUrl, fallbackUrl)}
        alt={getSiteDisplayHeading(site).heading}
        loading="lazy"
        className={className}
      />
    );
  }
);

interface MapProps {
  sites: ZiarahSite[];
  selectedSite: ZiarahSite | null;
  onSelectSite: (site: ZiarahSite) => void;
  onActiveRouteChange?: (route: CuratedZiarahRoute, routeSites: ZiarahSite[]) => void;
}

interface SiteCluster {
  id: string;
  lat: number;
  lng: number;
  sites: ZiarahSite[];
}

function MapViewportController({
  selectedSite,
  activeRouteSites,
  flyTarget,
}: {
  selectedSite: ZiarahSite | null;
  activeRouteSites: ZiarahSite[];
  flyTarget: { lat: number; lng: number; zoom: number; ts: number } | null;
}) {
  const map = useMap();

  useEffect(() => {
    const t1 = window.setTimeout(() => {
      map.invalidateSize();
    }, 100);
    const t2 = window.setTimeout(() => {
      map.invalidateSize();
    }, 400);

    if (
      selectedSite &&
      Number.isFinite(Number(selectedSite.location?.lat)) &&
      Number.isFinite(Number(selectedSite.location?.lng))
    ) {
      map.flyTo([Number(selectedSite.location.lat), Number(selectedSite.location.lng)], 13, {
        animate: true,
        duration: 1.1,
      });
    } else if (activeRouteSites.length > 1) {
      const bounds = L.latLngBounds(
        activeRouteSites.map((s) => [Number(s.location.lat), Number(s.location.lng)] as [number, number])
      );
      map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 10, duration: 1.1 });
    }
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [selectedSite, activeRouteSites, map]);

  useEffect(() => {
    if (flyTarget && Number.isFinite(flyTarget.lat) && Number.isFinite(flyTarget.lng)) {
      map.flyTo([flyTarget.lat, flyTarget.lng], flyTarget.zoom, {
        animate: true,
        duration: 1.1,
      });
    }
  }, [flyTarget, map]);

  return null;
}

function ZoomListener({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  const map = useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
  });
  return null;
}

const MAP_PIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>';

const cachedUserIcon = L.divIcon({
  html: '<div class="flex items-center justify-center w-7 h-7 bg-emerald-700 rounded-full border-2 border-white shadow-lg"><div class="w-2.5 h-2.5 bg-white rounded-full"></div></div>',
  className: 'custom-user-icon',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const iconCache = new Map<string, L.DivIcon>();

const getCustomPinIcon = (
  category: string,
  isSelected: boolean,
  sequenceIndex?: number
): L.DivIcon => {
  const seqKey = sequenceIndex !== undefined ? `-seq-${sequenceIndex}` : '';
  const cacheKey = `${category}-${isSelected ? 'selected' : 'default'}${seqKey}`;
  const existing = iconCache.get(cacheKey);
  if (existing) return existing;

  // Distinct Category Color Coding (Fase 4)
  let bgClass = 'bg-emerald-700 text-white border-white';
  if (category === 'Ulama Nusantara') bgClass = 'bg-stone-900 text-white border-white';
  if (category === 'Habaib') bgClass = 'bg-amber-600 text-white border-white';
  if (category === 'Auliya Nusantara') bgClass = 'bg-orange-800 text-white border-white';

  if (isSelected) {
    bgClass = 'bg-stone-950 text-amber-300 border-amber-400 scale-125 shadow-xl';
  }

  const innerContent =
    sequenceIndex !== undefined
      ? `<span class="text-xs font-bold font-mono">${sequenceIndex}</span>`
      : MAP_PIN_SVG;

  const iconMarkup = `<div class="relative flex items-center justify-center"><div class="flex items-center justify-center w-8 h-8 rounded-full shadow-md border-2 transition-transform cursor-pointer ${bgClass}">${innerContent}</div></div>`;

  const created = L.divIcon({
    html: iconMarkup,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  iconCache.set(cacheKey, created);
  return created;
};

const getClusterIcon = (count: number): L.DivIcon => {
  const cacheKey = `cluster-${count}`;
  const existing = iconCache.get(cacheKey);
  if (existing) return existing;

  const sizeClass = count >= 15 ? 'w-11 h-11 text-xs' : 'w-9 h-9 text-xs';
  const html = `<div class="flex items-center justify-center ${sizeClass} rounded-full bg-stone-900/95 text-white font-bold border-2 border-white shadow-lg cursor-pointer"><span>${count}</span></div>`;

  const created = L.divIcon({
    html,
    className: 'custom-cluster-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
  iconCache.set(cacheKey, created);
  return created;
};

function ClusterLayer({
  clusters,
  singleSites,
  selectedSiteId,
  routeSequenceMap,
  onMarkerTap,
}: {
  clusters: SiteCluster[];
  singleSites: ZiarahSite[];
  selectedSiteId?: string;
  routeSequenceMap: Map<string, number>;
  onMarkerTap: (site: ZiarahSite) => void;
}) {
  const map = useMap();

  return (
    <>
      {clusters.map((cluster) => (
        <Marker
          key={cluster.id}
          position={[cluster.lat, cluster.lng]}
          icon={getClusterIcon(cluster.sites.length)}
          eventHandlers={{
            click: () => {
              const bounds = L.latLngBounds(
                cluster.sites.map((s) => [Number(s.location.lat), Number(s.location.lng)] as [number, number])
              );
              map.flyToBounds(bounds, { padding: [60, 60], maxZoom: Math.min(map.getZoom() + 3, 13), duration: 0.9 });
            },
          }}
        />
      ))}

      {singleSites.map((site) => {
        const seq = routeSequenceMap.get(site.id);
        return (
          <Marker
            key={site.id}
            position={[Number(site.location.lat), Number(site.location.lng)]}
            icon={getCustomPinIcon(site.category, selectedSiteId === site.id, seq)}
            eventHandlers={{
              click: () => onMarkerTap(site),
            }}
          />
        );
      })}
    </>
  );
}

export const InteractiveMap: React.FC<MapProps> = React.memo(({ sites, selectedSite, onSelectSite, onActiveRouteChange }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [activeRouteId, setActiveRouteId] = useState<CuratedZiarahRoute['id']>('off');
  const [radiusKm, setRadiusKm] = useState<'all' | 15 | 50 | 100>('all');
  const [userGps, setUserGps] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsErrorMsg, setGpsErrorMsg] = useState<string | null>(null);
  const [previewSite, setPreviewSite] = useState<ZiarahSite | null>(null);
  const [mapSearchQuery, setMapSearchQuery] = useState<string>('');
  const [flyTarget, setFlyTarget] = useState<{ lat: number; lng: number; zoom: number; ts: number } | null>(null);
  const mapBoxRef = React.useRef<HTMLDivElement | null>(null);

  // Sync previewSite when selectedSite changes externally
  useEffect(() => {
    if (selectedSite) {
      setPreviewSite(selectedSite);
    }
  }, [selectedSite]);

  const validSites = useMemo(
    () =>
      sites.filter(
        (site) =>
          Number.isFinite(Number(site.location?.lat)) && Number.isFinite(Number(site.location?.lng))
      ),
    [sites]
  );

  const activeRouteObj = useMemo(
    () => CURATED_ZIARAH_ROUTES.find((r) => r.id === activeRouteId) || CURATED_ZIARAH_ROUTES[0],
    [activeRouteId]
  );

  const activeRouteSites = useMemo(() => {
    if (activeRouteObj.id === 'off') return [];
    return activeRouteObj.siteIds
      .map((id) => validSites.find((s) => s.id === id || s.legacyId === id))
      .filter((s): s is ZiarahSite => Boolean(s));
  }, [activeRouteObj, validSites]);

  const routeSequenceMap = useMemo(() => {
    const map = new Map<string, number>();
    activeRouteSites.forEach((site, idx) => {
      map.set(site.id, idx + 1);
    });
    return map;
  }, [activeRouteSites]);

  useEffect(() => {
    if (onActiveRouteChange) {
      onActiveRouteChange(activeRouteObj, activeRouteSites);
    }
  }, [activeRouteObj, activeRouteSites, onActiveRouteChange]);

  const waRouteShareUrl = useMemo(() => {
    if (activeRouteObj.id === 'off' || activeRouteSites.length === 0) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ziarahnusantara.my.id';
    const siteListText = activeRouteSites
      .map((s, idx) => `${idx + 1}. Makam ${s.title} (${s.location.city}, ${s.location.province})`)
      .join('\n');
    const message =
      `Panduan Rute Rombongan — *${activeRouteObj.label}*\n` +
      `${activeRouteObj.description}\n\n` +
      `*Urutan Makam (${activeRouteSites.length} Titik):*\n${siteListText}\n\n` +
      `Buka peta interaktif, jadwal haul & bacaan doa lengkap di:\n${origin}/peta`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [activeRouteObj, activeRouteSites]);

  // Filter sites by active route OR GPS radius + quick search query
  const filteredMapSites = useMemo(() => {
    let base = validSites;
    if (activeRouteObj.id !== 'off' && activeRouteSites.length > 0) {
      base = activeRouteSites;
    }
    if (radiusKm !== 'all' && userGps) {
      base = base.filter(
        (s) =>
          calculateDistanceKm(userGps.lat, userGps.lng, Number(s.location.lat), Number(s.location.lng)) <=
          radiusKm
      );
    }
    const q = mapSearchQuery.trim().toLowerCase();
    if (q) {
      base = base.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.location.city.toLowerCase().includes(q) ||
          s.location.province.toLowerCase().includes(q)
      );
    }
    return base;
  }, [validSites, activeRouteObj, activeRouteSites, radiusKm, userGps, mapSearchQuery]);

  // Dynamic grid-based clustering when zoomed out (zoom <= 7) and no specific route is selected
  const { clusters, singleSites } = useMemo(() => {
    if (zoomLevel >= 8 || activeRouteObj.id !== 'off' || filteredMapSites.length <= 15) {
      return { clusters: [] as SiteCluster[], singleSites: filteredMapSites };
    }

    const cellSize = zoomLevel <= 5 ? 1.6 : zoomLevel === 6 ? 0.95 : 0.55;
    const buckets = new Map<string, ZiarahSite[]>();

    filteredMapSites.forEach((site) => {
      const lat = Number(site.location.lat);
      const lng = Number(site.location.lng);
      const key = `${Math.floor(lat / cellSize)}_${Math.floor(lng / cellSize)}`;
      const list = buckets.get(key) || [];
      list.push(site);
      buckets.set(key, list);
    });

    const clusterList: SiteCluster[] = [];
    const singles: ZiarahSite[] = [];

    buckets.forEach((group, key) => {
      if (group.length === 1) {
        singles.push(group[0]);
      } else {
        const avgLat = group.reduce((acc, s) => acc + Number(s.location.lat), 0) / group.length;
        const avgLng = group.reduce((acc, s) => acc + Number(s.location.lng), 0) / group.length;
        clusterList.push({
          id: `cluster-${key}`,
          lat: avgLat,
          lng: avgLng,
          sites: group,
        });
      }
    });

    return { clusters: clusterList, singleSites: singles };
  }, [filteredMapSites, zoomLevel, activeRouteObj.id]);

  const handleRequestGps = useCallback((targetRadius?: 'all' | 15 | 50 | 100) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGpsErrorMsg('Izin lokasi (GPS) ditolak atau belum aktif di browser Anda.');
      return;
    }
    setIsLocating(true);
    setGpsErrorMsg(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserGps(coords);
        if (targetRadius) setRadiusKm(targetRadius);
        setFlyTarget({ lat: coords.lat, lng: coords.lng, zoom: 11, ts: Date.now() });
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
        setGpsErrorMsg('Izin lokasi (GPS) ditolak atau belum aktif di browser Anda.');
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  const handleFocusSiteOnMap = useCallback((site: ZiarahSite) => {
    const lat = Number(site.location.lat);
    const lng = Number(site.location.lng);
    setPreviewSite(site);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      setFlyTarget({ lat, lng, zoom: 14, ts: Date.now() });
    }
    mapBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSelectRadius = (r: 'all' | 15 | 50 | 100) => {
    if (r === 'all') {
      setRadiusKm('all');
      return;
    }
    if (!userGps) {
      handleRequestGps(r);
    } else {
      setRadiusKm(r);
    }
  };

  const previewDistanceKm = useMemo(() => {
    if (!previewSite || !userGps) return null;
    return calculateDistanceKm(
      userGps.lat,
      userGps.lng,
      Number(previewSite.location.lat),
      Number(previewSite.location.lng)
    );
  }, [previewSite, userGps]);

  const previewLogistics = useMemo(
    () => (previewSite ? getSiteLogistics(previewSite) : null),
    [previewSite]
  );

  const routePillsRef = React.useRef<HTMLDivElement | null>(null);
  const dragStateRef = React.useRef<{ isDown: boolean; startX: number; scrollLeft: number; moved: boolean }>({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const handlePillMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = routePillsRef.current;
    if (!el) return;
    dragStateRef.current = {
      isDown: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handlePillMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = routePillsRef.current;
    if (!el || !dragStateRef.current.isDown) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - dragStateRef.current.startX;
    if (Math.abs(walk) > 5) {
      dragStateRef.current.moved = true;
      el.scrollLeft = dragStateRef.current.scrollLeft - walk;
    }
  };

  const handlePillMouseUpOrLeave = () => {
    dragStateRef.current.isDown = false;
  };

  const handlePillWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = routePillsRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div
        ref={mapBoxRef}
        className="w-full h-[68dvh] md:h-[72dvh] min-h-[520px] relative z-0 rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs flex flex-col bg-[#FAF8F5] [&_.leaflet-bottom]:!bottom-24 md:[&_.leaflet-bottom]:!bottom-6"
      >
        {/* =====================================================================
            FLOATING TOP GIS PILL CONTROLS (Jalur Wali Songo & Radius GPS)
            ===================================================================== */}
        <div className="absolute top-3 inset-x-3 z-[900] pointer-events-none flex flex-col items-center gap-2">
          <div className="w-full max-w-full flex flex-wrap items-center justify-center gap-2 pointer-events-none">
            {/* Curated Wali Songo Route Selector Pills */}
            <div
              ref={routePillsRef}
              onMouseDown={handlePillMouseDown}
              onMouseMove={handlePillMouseMove}
              onMouseUp={handlePillMouseUpOrLeave}
              onMouseLeave={handlePillMouseUpOrLeave}
              onWheel={handlePillWheel}
              className="max-w-full flex items-center gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-stone-200/80 shadow-sm overflow-x-auto no-scrollbar touch-pan-x pointer-events-auto mx-auto cursor-grab active:cursor-grabbing select-none"
            >
              <span className="inline-flex items-center gap-1 pl-2.5 pr-1 text-[11px] font-semibold text-stone-700 whitespace-nowrap shrink-0">
                <RouteIcon className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
                <span className="hidden sm:inline">Jalur Ziarah:</span>
              </span>
              {CURATED_ZIARAH_ROUTES.map((route) => {
                const active = activeRouteId === route.id;
                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={() => {
                      if (dragStateRef.current.moved) return;
                      setActiveRouteId(route.id);
                      if (route.id !== 'off') setRadiusKm('all');
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap shrink-0 transition cursor-pointer ${
                      active
                        ? 'bg-stone-900 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {route.shortLabel}
                  </button>
                );
              })}
            </div>

            {/* GPS Radius Filter Pills */}
            <div className="max-w-full flex items-center gap-1 bg-white/95 backdrop-blur-md p-1.5 rounded-full border border-stone-200/80 shadow-sm overflow-x-auto no-scrollbar touch-pan-x pointer-events-auto mx-auto shrink-0">
              <button
                type="button"
                onClick={() => handleRequestGps()}
                className="px-2.5 py-1.5 rounded-full text-xs font-medium text-emerald-800 hover:bg-emerald-50 inline-flex items-center gap-1 transition cursor-pointer whitespace-nowrap shrink-0"
                title="Deteksi Posisi GPS Saya"
              >
                <LocateFixed className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} aria-hidden="true" />
                <span>{isLocating ? 'Mencari GPS...' : userGps ? 'GPS Aktif' : 'Lokasi Saya'}</span>
              </button>

              {(['all', 15, 50, 100] as const).map((r) => {
                const active = radiusKm === r;
                return (
                  <button
                    key={String(r)}
                    type="button"
                    onClick={() => handleSelectRadius(r)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap shrink-0 transition cursor-pointer ${
                      active
                        ? 'bg-emerald-700 text-white'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {r === 'all' ? 'Semua Jarak' : `≤ ${r} km`}
                  </button>
                );
              })}
            </div>
          </div>

          {/* GPS Error Toast / Alert Banner */}
          {gpsErrorMsg && (
            <div
              role="alert"
              className="mx-auto bg-rose-950/95 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl border border-rose-500/40 shadow-md text-xs flex items-center justify-between gap-2.5 pointer-events-auto max-w-xl"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" aria-hidden="true" />
                <span>{gpsErrorMsg}</span>
              </div>
              <button
                type="button"
                onClick={() => setGpsErrorMsg(null)}
                aria-label="Tutup peringatan GPS"
                className="p-1 text-rose-200 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Active Route Summary Banner + WA Group Share Button */}
          {activeRouteObj.id !== 'off' && (
            <div className="mx-auto bg-slate-900/95 text-white backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 shadow-md text-xs flex flex-wrap items-center justify-between gap-2.5 pointer-events-auto max-w-2xl">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-[10px] font-bold uppercase tracking-wider shrink-0">
                  {activeRouteSites.length} Titik
                </span>
                <p className="text-slate-200 truncate">{activeRouteObj.description}</p>
              </div>
              {waRouteShareUrl && (
                <a
                  href={waRouteShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-semibold inline-flex items-center gap-1.5 transition shrink-0"
                >
                  <Share2 className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                  <span>Bagikan Rute ke WA Rombongan</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* =====================================================================
            LEAFLET FULL-SCREEN MAP CANVAS
            ===================================================================== */}
        <MapContainer
          center={[-7.15, 111.2]}
          zoom={6}
          style={{ width: '100%', height: '100%', flex: 1, background: '#E6E2D8' }}
          zoomControl={false}
          preferCanvas={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <ZoomControl position="bottomleft" />
          <ZoomListener onZoomChange={setZoomLevel} />
          <MapViewportController
            selectedSite={selectedSite}
            activeRouteSites={activeRouteSites}
            flyTarget={flyTarget}
          />

        {/* User GPS Marker & Radius Circle */}
        {userGps && (
          <>
            <Marker position={[userGps.lat, userGps.lng]} icon={cachedUserIcon} />
            {radiusKm !== 'all' && (
              <Circle
                center={[userGps.lat, userGps.lng]}
                radius={radiusKm * 1000}
                pathOptions={{
                  color: '#134A35',
                  fillColor: '#1D5B43',
                  fillOpacity: 0.1,
                  weight: 1.5,
                }}
              />
            )}
          </>
        )}

        {/* Curated Wali Songo Route Polyline */}
        {activeRouteSites.length > 1 && (
          <Polyline
            positions={activeRouteSites.map((s) => [Number(s.location.lat), Number(s.location.lng)])}
            pathOptions={{
              color: activeRouteObj.color,
              weight: 3.5,
              opacity: 0.85,
              dashArray: '8, 8',
            }}
          />
        )}

        {/* Dynamic Clustered & Category-Colored Markers */}
        <ClusterLayer
          clusters={clusters}
          singleSites={singleSites}
          selectedSiteId={previewSite?.id || selectedSite?.id}
          routeSequenceMap={routeSequenceMap}
          onMarkerTap={(site) => {
            setPreviewSite(site);
          }}
        />
      </MapContainer>

      {/* =====================================================================
          CATEGORY LEGEND PILL (Bottom Left, Compact)
          ===================================================================== */}
      <div className="hidden sm:flex items-center gap-3 absolute bottom-24 md:bottom-6 left-14 z-[850] bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-stone-200/80 shadow-xs text-[11px] font-medium text-stone-700 pointer-events-auto">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
          Wali Songo
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-900" />
          Ulama
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
          Habaib
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-800" />
          Auliya
        </span>
      </div>

      {/* =====================================================================
          THUMB-ZONE SLIDE-UP BOTTOM SHEET ON MARKER TAP (When full drawer is not open)
          ===================================================================== */}
      {previewSite && !selectedSite && (
        <div
          role="dialog"
          aria-label={`Ringkasan Lokasi ${previewSite.title}`}
          className="absolute bottom-24 md:bottom-6 inset-x-3 sm:left-auto sm:right-4 sm:w-[410px] z-[950] bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-4 duration-200"
        >
          {/* Drag Handle Indicator on Mobile */}
          <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto mb-3 sm:hidden" />

          <div className="flex items-start gap-3.5">
            <MapRouteThumbImage
              site={previewSite}
              width={240}
              className="w-20 h-20 rounded-2xl object-cover bg-stone-200 shrink-0 border border-stone-200/60"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950/5 text-emerald-800">
                    {previewSite.category}
                  </span>
                  {previewDistanceKm !== null && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-700 tabular-nums">
                      {previewDistanceKm} km
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewSite(null)}
                  aria-label="Tutup pratinjau lokasi"
                  className="p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900 leading-snug truncate mt-1">
                {getSiteDisplayHeading(previewSite).heading}
              </h3>
              <p className="text-xs text-stone-500 truncate">{getSiteDisplayHeading(previewSite).subtitle}</p>
              <p className="text-xs text-stone-600 inline-flex items-center gap-1 mt-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
                <span className="truncate">
                  {previewSite.location.city}, {previewSite.location.province}
                </span>
              </p>
            </div>
          </div>

          {/* Haul Schedule Summary inside Bottom Sheet */}
          {previewLogistics && (
            <div className="mt-3 p-2.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/70 text-[11px] text-stone-600 flex items-start gap-2">
              <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="min-w-0">
                <strong className="text-stone-900 font-semibold">Jadwal Haul:</strong>{' '}
                <span className="whitespace-normal break-words leading-snug">{stripMarkdownAsterisks(previewLogistics.haulSchedule)}</span>
              </div>
            </div>
          )}

          {/* Single-Line Italic Serif Quote (Tahap Desain 2) */}
          <p className="font-serif italic text-xs text-stone-600 line-clamp-1 mt-2">
            &ldquo;
            {stripMarkdownAsterisks(
              (
                previewSite.untoldStory ||
                (Array.isArray(previewSite.karomah) ? previewSite.karomah[0] : previewSite.karomah) ||
                previewSite.description ||
                ''
              )
                .replace(/<!--more-->/g, ' ')
                .trim()
            ).slice(0, 100)}
            ...&rdquo;
          </p>

          {/* Thumb-Friendly Quick Actions */}
          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            <a
              href={getSiteGoogleMapsNavigationUrl(previewSite)}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200/90 text-xs font-medium inline-flex items-center justify-center gap-1.5 transition"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.75} aria-hidden="true" />
              <span>Rute Google Maps</span>
              <ExternalLink className="w-3 h-3 text-stone-400" strokeWidth={1.75} aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => onSelectSite(previewSite)}
              className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-emerald-800 text-white text-xs font-medium inline-flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
              <span>Baca Riwayat &amp; Doa</span>
            </button>
          </div>
        </div>
      )}
      </div>

      {/* =====================================================================
          QUICK SEARCH & DIRECT-TO-PIN CARD GRID BELOW MAP
          ===================================================================== */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-lg sm:text-xl font-semibold text-stone-900">
              Pencarian Cepat &amp; Titik Makam di Peta ({filteredMapSites.length} Lokasi)
            </h2>
            <p className="text-xs text-stone-500">
              Ketuk kartu makam di bawah untuk mengarahkan kamera peta langsung ke titik pusara.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search
              className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={mapSearchQuery}
              onChange={(e) => setMapSearchQuery(e.target.value)}
              placeholder="Cari nama makam atau kota di peta..."
              aria-label="Cari nama makam atau kota di peta"
              className="w-full pl-9 pr-8 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-700"
            />
            {mapSearchQuery && (
              <button
                type="button"
                onClick={() => setMapSearchQuery('')}
                aria-label="Bersihkan pencarian peta"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[460px] overflow-y-auto pr-1">
          {filteredMapSites.map((site) => {
            const seq = routeSequenceMap.get(site.id);
            const isSelectedPin = previewSite?.id === site.id || selectedSite?.id === site.id;
            return (
              <button
                key={site.id}
                type="button"
                onClick={() => handleFocusSiteOnMap(site)}
                className={`text-left p-3 rounded-2xl border transition flex items-center gap-3 cursor-pointer ${
                  isSelectedPin
                    ? 'bg-emerald-50/90 border-emerald-700 shadow-2xs'
                    : 'bg-[#FAF8F5] hover:bg-stone-100/80 border-stone-200/80'
                }`}
              >
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-200 shrink-0">
                  <MapRouteThumbImage site={site} width={160} className="w-full h-full object-cover" />
                  {seq !== undefined && (
                    <span className="absolute top-0.5 left-0.5 px-1.5 py-0.2 rounded bg-emerald-800 text-white text-[10px] font-bold">
                      #{seq}
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-serif font-semibold text-stone-900 truncate">
                    {getSiteDisplayHeading(site).heading}
                  </div>
                  <div className="text-[11px] text-stone-500 truncate">{getSiteDisplayHeading(site).subtitle}</div>
                  <div className="text-[11px] text-emerald-800 font-medium inline-flex items-center gap-1 mt-0.5 truncate">
                    <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span className="truncate">
                      {site.location.city}, {site.location.province}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
