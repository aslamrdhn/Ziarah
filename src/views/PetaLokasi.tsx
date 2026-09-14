import React from 'react';
import { InteractiveMap } from '../components/InteractiveMap';
import { SiteDetails } from '../components/SiteDetails';
import { ziarahSites, ZiarahSite } from '../data/sites';

interface PetaLokasiProps {
  selectedSite: ZiarahSite | null;
  setSelectedSite: (site: ZiarahSite | null) => void;
  savedSiteIds: string[];
  handleToggleSave: (id: string) => void;
  savedDoas: string[];
  onToggleSaveDoa: (id: string) => void;
  onOpenKontribusi: () => void;
}

export const PetaLokasi: React.FC<PetaLokasiProps> = ({ selectedSite, setSelectedSite, savedSiteIds, handleToggleSave, savedDoas, onToggleSaveDoa, onOpenKontribusi }) => {
  return (
    <div className="flex-1 w-full relative z-20 flex flex-col">
      <InteractiveMap 
        sites={ziarahSites}
        selectedSite={selectedSite}
        onSelectSite={setSelectedSite}
      />
      {selectedSite && (
        <>
          {/* Mobile Overlay */}
          <div 
            className="md:hidden absolute inset-0 z-[999] bg-black/20 backdrop-blur-sm pointer-events-auto"
            onClick={() => setSelectedSite(null)}
          />
          <div className="absolute top-0 right-0 bottom-0 md:top-4 md:right-4 md:bottom-4 z-[1000] w-full md:max-w-sm pointer-events-none">
            <SiteDetails 
              site={selectedSite} 
              onClose={() => setSelectedSite(null)} 
              isSaved={savedSiteIds.includes(selectedSite.id)}
              onToggleSave={() => handleToggleSave(selectedSite.id)}
              savedDoas={savedDoas}
              onToggleSaveDoa={onToggleSaveDoa}
              onContribute={onOpenKontribusi}
            />
          </div>
        </>
      )}
    </div>
  );
};
