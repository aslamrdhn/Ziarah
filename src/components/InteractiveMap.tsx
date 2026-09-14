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
    
    // Initial locate is removed to prevent iframe permission issues
    // Users can click the locate button manually
  }, [map]);

  const userIcon = L.divIcon({
    html: renderToStaticMarkup(
      <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
      </div>
    ),
    className: 'custom-user-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
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
             className="bg-white p-2.5 rounded-xl shadow-md border border-stone-200 text-stone-600 hover:text-brand-600 hover:bg-stone-50 transition-colors"
             title="Temukan Lokasi Saya"
           >
             <Compass className="w-5 h-5" />
           </button>
         </div>
      </div>
    </>
  );
}

// Custom DivIcon for natural look
const createCustomIcon = (category: string, isSelected: boolean) => {
  let colorClass = 'text-brand-800 bg-brand-50 border-brand-200';
  if (category === 'Habaib') colorClass = 'text-gold-700 bg-gold-50 border-gold-200';
  if (category === 'Ulama Nusantara') colorClass = 'text-sky-700 bg-sky-50 border-sky-200';
  
  if (isSelected) {
    colorClass = 'text-gold-300 bg-brand-900 border-gold-400 shadow-lg scale-110';
  }
  const iconMarkup = renderToStaticMarkup(
    <div className={`flex items-center justify-center w-8 h-8 rounded-full shadow-sm border-2 transition-all ${colorClass}`}>
      <MapPin className="w-5 h-5" />
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
    <div className="flex-1 w-full relative z-0 rounded-2xl overflow-hidden shadow-sm border border-stone-200 min-h-[500px] md:min-h-[600px] h-full flex flex-col">
      <MapContainer 
        center={[-2.5, 118.0]} // Center of Indonesia
        zoom={5} 
        style={{ width: '100%', height: '100%', flex: 1, minHeight: '500px', background: '#e5e3df' }}
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
              <div className="p-4 w-64 bg-white text-stone-900 rounded-xl">
                <img 
                  src={site.imageUrl} 
                  alt={site.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover rounded-lg mb-3 shadow-sm"
                />
                <div className="text-[10px] font-bold uppercase tracking-wider text-gold-700 mb-1 bg-gold-50 inline-block px-1.5 py-0.5 rounded border border-gold-100">
                  {site.category}
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-900 leading-tight mb-1">{site.title}</h3>
                <p className="text-sm text-stone-500 mb-3">{site.name}</p>
                <div className="flex items-start text-sm text-stone-500 mb-4">
                  <Navigation className="w-4 h-4 mr-2 mt-0.5 shrink-0" />
                  <span>{site.location.city}, {site.location.province}</span>
                </div>
                <button 
                  className="w-full py-2 bg-brand-800 hover:bg-brand-900 text-white rounded-lg text-sm font-bold transition-colors"
                  onClick={() => onSelectSite(site)}
                >
                  Lihat Detail
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
});
