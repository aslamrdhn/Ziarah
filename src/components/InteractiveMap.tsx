import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import { ZiarahSite } from '../data/sites';
import L from 'leaflet';
import { MapPin, Navigation, Compass } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  sites: ZiarahSite[];
  selectedSite: ZiarahSite | null;
  onSelectSite: (site: ZiarahSite) => void;
}

// Function to update map view when selected site changes
function MapUpdater({ selectedSite }: { selectedSite: ZiarahSite | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedSite) {
      map.flyTo([selectedSite.location.lat, selectedSite.location.lng], 13, {
        animate: true,
        duration: 1.5
      });
    }
  }, [selectedSite, map]);
  return null;
}

// User location component and locate button
function UserLocationControl() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMap();

  useEffect(() => {
    map.on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom() > 13 ? map.getZoom() : 13);
    });
  }, [map]);

  const userIcon = L.divIcon({
    html: renderToStaticMarkup(
      <div className="flex items-center justify-center w-7 h-7 bg-emerald-600 rounded-full border-2 border-white shadow-lg">
        <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
      </div>
    ),
    className: 'custom-user-icon',
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  return (
    <>
      {position && (
        <Marker position={position} icon={userIcon}>
          <Popup>Lokasi Anda Saat Ini</Popup>
        </Marker>
      )}
      <div className="leaflet-top leaflet-right mt-4 mr-4 z-[1000] absolute">
         <div className="leaflet-control">
           <button 
             onClick={() => map.locate({setView: true, maxZoom: 14})}
             className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-200/90 text-slate-700 hover:text-emerald-700 hover:bg-slate-50 transition-all active:scale-95 cursor-pointer"
             title="Temukan Lokasi Saya"
           >
             <Compass className="w-5 h-5 text-emerald-700" />
           </button>
         </div>
      </div>
    </>
  );
}

// Custom DivIcon for modern clean look
const createCustomIcon = (category: string, isSelected: boolean) => {
  let colorClass = 'text-emerald-800 bg-emerald-50 border-emerald-300';
  if (category === 'Habaib') colorClass = 'text-amber-800 bg-amber-50 border-amber-300';
  if (category === 'Ulama Nusantara') colorClass = 'text-sky-800 bg-sky-50 border-sky-300';
  
  if (isSelected) {
    colorClass = 'text-gold-300 bg-emerald-950 border-gold-400 shadow-xl scale-125 ring-4 ring-emerald-500/20';
  }
  const iconMarkup = renderToStaticMarkup(
    <div className={`flex items-center justify-center w-8 h-8 rounded-2xl shadow-md border-2 transition-all ${colorClass}`}>
      <MapPin className="w-4 h-4" />
    </div>
  );
  return L.divIcon({
    html: iconMarkup,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

export const InteractiveMap: React.FC<MapProps> = React.memo(({ sites, selectedSite, onSelectSite }) => {
  return (
    <div className="flex-1 w-full relative z-0 rounded-3xl overflow-hidden shadow-xs border border-slate-200/90 min-h-[500px] md:min-h-[600px] h-full flex flex-col">
      <MapContainer 
        center={[-2.5, 118.0]} // Center of Indonesia
        zoom={5} 
        style={{ width: '100%', height: '100%', flex: 1, minHeight: '500px', background: '#e2e8f0' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl position="bottomright" />
        <MapUpdater selectedSite={selectedSite} />
        <UserLocationControl />
        
        {sites.map(site => (
          <Marker 
            key={site.id} 
            position={[site.location.lat, site.location.lng]}
            icon={createCustomIcon(site.category, selectedSite?.id === site.id)}
            eventHandlers={{
              click: () => onSelectSite(site)
            }}
          >
            <Popup className="custom-popup">
              <div className="p-4 w-64 bg-white text-slate-900 rounded-2xl">
                <img 
                  src={site.imageUrl} 
                  alt={site.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded-xl mb-3 shadow-2xs"
                />
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1 bg-emerald-50 inline-block px-2 py-0.5 rounded-lg border border-emerald-200/60">
                  {site.category}
                </div>
                <h3 className="font-serif font-black text-base text-slate-900 leading-snug mb-1">{site.title}</h3>
                <p className="text-xs text-slate-500 mb-2 line-clamp-1">{site.name}</p>
                <div className="flex items-start text-xs text-slate-500 mb-3">
                  <Navigation className="w-3.5 h-3.5 mr-1.5 mt-0.5 shrink-0 text-emerald-600" />
                  <span className="truncate">{site.location.city}, {site.location.province}</span>
                </div>
                <button 
                  className="w-full py-2 bg-gradient-to-r from-emerald-800 to-brand-900 hover:from-emerald-900 hover:to-brand-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                  onClick={() => onSelectSite(site)}
                >
                  Lihat Detail & Panduan
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
});
