import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import { ZiarahSite } from '../data/sites';
import L from 'leaflet';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { optimizeSiteImageUrl, handleOptimizedImageError } from '../lib/imageOptimizer';

interface MapProps {
  sites: ZiarahSite[];
  selectedSite: ZiarahSite | null;
  onSelectSite: (site: ZiarahSite) => void;
}

function MapUpdater({ selectedSite }: { selectedSite: ZiarahSite | null }) {
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
        duration: 1.2
      });
    }
    return () => window.clearTimeout(timer);
  }, [selectedSite, map]);
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
  iconAnchor: [14, 14]
});

function UserLocationControl() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    const onLocationFound = (e: L.LocationEvent) => {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom() > 13 ? map.getZoom() : 13);
    };
    map.on('locationfound', onLocationFound);
    return () => {
      map.off('locationfound', onLocationFound);
    };
  }, [map]);

  return (
    <>
      {position && (
        <Marker position={position} icon={cachedUserIcon}>
          <Popup>Lokasi Anda Saat Ini</Popup>
        </Marker>
      )}
      <div className="leaflet-top leaflet-left mt-20 ml-2.5 z-[1000] absolute pointer-events-auto">
        <div className="leaflet-control pointer-events-auto">
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              map.locate({ setView: true, maxZoom: 14 });
            }}
            className="bg-[#FBF9F5]/95 backdrop-blur-md p-2.5 rounded-xl shadow-md border border-stone-300/90 text-stone-800 hover:text-emerald-800 hover:bg-white transition-all active:scale-95 cursor-pointer pointer-events-auto"
            title="Temukan Lokasi Saya"
          >
            <Compass className="w-5 h-5 text-emerald-800" />
          </button>
        </div>
      </div>
    </>
  );
}

// Memoized cache for DivIcons so renderToStaticMarkup is never re-run unnecessarily
const iconCache = new Map<string, L.DivIcon>();

const getCustomIcon = (category: string, isSelected: boolean): L.DivIcon => {
  const cacheKey = `${category}-${isSelected ? 'selected' : 'default'}`;
  const existing = iconCache.get(cacheKey);
  if (existing) return existing;

  let colorClass = 'text-emerald-900 bg-[#FBF9F5] border-emerald-700';
  if (category === 'Habaib') colorClass = 'text-amber-900 bg-[#FBF9F5] border-amber-600';
  if (category === 'Ulama Nusantara') colorClass = 'text-stone-900 bg-[#FBF9F5] border-stone-700';
  
  if (isSelected) {
    colorClass = 'text-[#dcc298] bg-stone-950 border-[#c5a059] shadow-xl scale-125';
  }

  const iconMarkup = renderToStaticMarkup(
    <div className={`flex items-center justify-center w-8 h-8 rounded-xl shadow-md border-2 transition-transform cursor-pointer ${colorClass}`}>
      <MapPin className="w-4 h-4" />
    </div>
  );

  const created = L.divIcon({
    html: iconMarkup,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  iconCache.set(cacheKey, created);
  return created;
};

export const InteractiveMap: React.FC<MapProps> = React.memo(({ sites, selectedSite, onSelectSite }) => {
  const validSites = sites.filter(
    site =>
      Number.isFinite(Number(site.location?.lat)) &&
      Number.isFinite(Number(site.location?.lng))
  );

  return (
    <div className="flex-1 w-full relative z-0 rounded-2xl overflow-hidden border border-stone-300/90 h-full flex flex-col">
      <MapContainer 
        center={[-2.5, 118.0]}
        zoom={5} 
        style={{ width: '100%', height: '100%', flex: 1, background: '#E6E2D8' }}
        zoomControl={false}
        preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl position="topleft" />
        <MapUpdater selectedSite={selectedSite} />
        <UserLocationControl />
        
        {validSites.map(site => (
          <Marker 
            key={site.id} 
            position={[Number(site.location.lat), Number(site.location.lng)]}
            icon={getCustomIcon(site.category, selectedSite?.id === site.id)}
            eventHandlers={{
              click: () => onSelectSite(site)
            }}
          >
            <Popup className="custom-popup">
              <div className="p-4 w-64 bg-[#FBF9F5] text-stone-900 rounded-2xl">
                <img 
                  src={optimizeSiteImageUrl(site.imageUrl, 400, 72)} 
                  onError={(e) => handleOptimizedImageError(e, site.imageUrl)}
                  alt={site.title} 
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded-xl mb-3"
                />
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 mb-1">
                  {site.category}
                </div>
                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug mb-1">{site.title}</h3>
                <p className="text-xs text-stone-500 mb-2 line-clamp-1">{site.name}</p>
                <div className="flex items-start text-xs text-stone-600 mb-3">
                  <Navigation className="w-3.5 h-3.5 mr-1.5 mt-0.5 shrink-0 text-emerald-800" />
                  <span className="truncate">{site.location.city}, {site.location.province}</span>
                </div>
                <button 
                  type="button"
                  className="w-full py-2 bg-stone-900 hover:bg-emerald-900 text-[#F9F8F4] rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  onClick={() => onSelectSite(site)}
                >
                  Buka Arsip & Detail
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
});
