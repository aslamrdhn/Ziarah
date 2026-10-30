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
} from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { optimizeSiteImageUrl, handleOptimizedImageError } from '../lib/imageOptimizer';
import {
  CURATED_ZIARAH_ROUTES,
  CuratedZiarahRoute,
  calculateDistanceKm,
  getSiteLogistics,
} from '../lib/siteLogistics';

interface MapProps {
  sites: ZiarahSite[];
  selectedSite: ZiarahSite | null;
  onSelectSite: (site: ZiarahSite) => void;
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
}: {
  selectedSite: ZiarahSite | null;
  activeRouteSites: ZiarahSite[];
}) {
  const map = useMap();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      map.invalidateSize();
    }, 100);

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
    return () => window.clearTimeout(timer);
  }, [selectedSite, activeRouteSites, map]);

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

const cachedUserIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div className="flex items-center justify-center w-7 h-7 bg-emerald-700 rounded-full border-2 border-white shadow-lg">
      <div className="w-2.5 h-2.5 bg-white rounded-full" />
    </div>
  ),
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

  const iconMarkup = renderToStaticMarkup(
    <div className="relative flex items-center justify-center">
      <div
        className={`flex items-center justify-center w-8 h-8 rounded-full shadow-md border-2 transition-transform cursor-pointer ${bgClass}`}
      >
        {sequenceIndex !== undefined ? (
          <span className="text-xs font-bold font-mono">{sequenceIndex}</span>
        ) : (
          <MapPin className="w-4 h-4" />
        )}
      </div>
    </div>
  );

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
  const html = renderToStaticMarkup(
    <div
      className={`flex items-center justify-center ${sizeClass} rounded-full bg-stone-900/90 text-white font-bold border-2 border-white shadow-lg backdrop-blur-xs cursor-pointer`}
    >
      <span>{count}</span>
    </div>
  );

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

export const InteractiveMap: React.FC<MapProps> = React.memo(({ sites, selectedSite, onSelectSite }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(5);
  const [activeRouteId, setActiveRouteId] = useState<CuratedZiarahRoute['id']>('off');
  const [radiusKm, setRadiusKm] = useState<'all' | 15 | 50 | 100>('all');
  const [userGps, setUserGps] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [previewSite, setPreviewSite] = useState<ZiarahSite | null>(null);

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
      .map((id) => validSites.find((s) => s.id === id))
      .filter((s): s is ZiarahSite => Boolean(s));
  }, [activeRouteObj, validSites]);

  const routeSequenceMap = useMemo(() => {
    const map = new Map<string, number>();
    activeRouteSites.forEach((site, idx) => {
      map.set(site.id, idx + 1);
    });
    return map;
  }, [activeRouteSites]);

  // Filter sites by active route OR GPS radius
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
    return base;
  }, [validSites, activeRouteObj, activeRouteSites, radiusKm, userGps]);

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
    if (typeof navigator === 'undefined' || !navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserGps({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        if (targetRadius) setRadiusKm(targetRadius);
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
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

  return (
    <div className="flex-1 w-full relative z-0 rounded-3xl overflow-hidden border border-stone-200/80 shadow-xs h-full flex flex-col bg-[#FAF8F5]">
      {/* =====================================================================
          FLOATING TOP GIS PILL CONTROLS (Jalur Wali Songo & Radius GPS)
          ===================================================================== */}
      <div className="absolute top-3 left-3 right-3 z-[900] pointer-events-none flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar pointer-events-auto">
          {/* Curated Wali Songo Route Selector Pills */}
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-stone-200/80 shadow-sm">
            <span className="inline-flex items-center gap-1 pl-2.5 pr-1 text-[11px] font-semibold text-stone-700 whitespace-nowrap">
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
                    setActiveRouteId(route.id);
                    if (route.id !== 'off') setRadiusKm('all');
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition cursor-pointer ${
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
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-stone-200/80 shadow-sm shrink-0">
            <button
              type="button"
              onClick={() => handleRequestGps()}
              className="px-2.5 py-1.5 rounded-full text-xs font-medium text-emerald-800 hover:bg-emerald-50 inline-flex items-center gap-1 transition cursor-pointer whitespace-nowrap"
              title="Deteksi Posisi GPS Saya"
            >
              <LocateFixed className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} aria-hidden="true" />
              <span className="hidden md:inline">{userGps ? 'GPS Aktif' : 'Lokasi Saya'}</span>
            </button>

            {(['all', 15, 50, 100] as const).map((r) => {
              const active = radiusKm === r;
              return (
                <button
                  key={String(r)}
                  type="button"
                  onClick={() => handleSelectRadius(r)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap transition cursor-pointer ${
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

        {/* Active Route Summary Banner */}
        {activeRouteObj.id !== 'off' && (
          <div className="self-start bg-stone-900/90 text-white backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-md text-xs flex items-center gap-2.5 pointer-events-auto max-w-xl">
            <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-[10px] font-bold uppercase tracking-wider shrink-0">
              {activeRouteSites.length} Titik
            </span>
            <p className="text-stone-200 truncate">{activeRouteObj.description}</p>
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
        <MapViewportController selectedSite={selectedSite} activeRouteSites={activeRouteSites} />

        {/* User GPS Marker & Radius Circle */}
        {userGps && (
          <>
            <Marker position={[userGps.lat, userGps.lng]} icon={cachedUserIcon} />
            {radiusKm !== 'all' && (
              <Circle
                center={[userGps.lat, userGps.lng]}
                radius={radiusKm * 1000}
                pathOptions={{
                  color: '#047857',
                  fillColor: '#10b981',
                  fillOpacity: 0.08,
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
      <div className="hidden sm:flex items-center gap-3 absolute bottom-3 left-14 z-[850] bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-full border border-stone-200/80 shadow-xs text-[11px] font-medium text-stone-700 pointer-events-auto">
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
          className="absolute bottom-3 inset-x-3 sm:left-auto sm:right-4 sm:w-[410px] z-[950] bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-stone-200/80 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom-4 duration-200"
        >
          {/* Drag Handle Indicator on Mobile */}
          <div className="w-10 h-1 bg-stone-200 rounded-full mx-auto mb-3 sm:hidden" />

          <div className="flex items-start gap-3.5">
            <img
              src={optimizeSiteImageUrl(previewSite.imageUrl, 240, 75)}
              onError={(e) => handleOptimizedImageError(e, previewSite.imageUrl)}
              alt={previewSite.title}
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
                Makam {previewSite.title}
              </h3>
              <p className="text-xs text-stone-500 truncate">{previewSite.name}</p>
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
                <span className="line-clamp-1">{previewLogistics.haulSchedule}</span>
              </div>
            </div>
          )}

          {/* Thumb-Friendly Quick Actions */}
          <div className="mt-3.5 grid grid-cols-2 gap-2.5">
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${previewSite.location.lat},${previewSite.location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200/90 text-xs font-medium inline-flex items-center justify-center gap-1.5 transition"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
              <span>Rute Google Maps</span>
              <ExternalLink className="w-3 h-3 text-stone-400" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => onSelectSite(previewSite)}
              className="py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-emerald-800 text-white text-xs font-medium inline-flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Detail &amp; Doa</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
