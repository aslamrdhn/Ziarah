import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

export const PetaLokasi: React.FC<PetaLokasiProps> = ({ 
  selectedSite, setSelectedSite, savedSiteIds, handleToggleSave, 
  savedDoas, onToggleSaveDoa, onOpenKontribusi 
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const found = ziarahSites.find(s => s.id === id);
      if (found) setSelectedSite(found);
    } else {
      setSelectedSite(null);
    }
  }, [id, setSelectedSite]);

  const handleClose = () => {
    setSelectedSite(null);
    navigate('/peta');
  };

  const handleMapSelect = (site: ZiarahSite | null) => {
    setSelectedSite(site);
    if (site) {
      navigate(`/makam/${site.id}`);
    } else {
      navigate('/peta');
    }
  };

  return (
    <div className="flex-1 w-full relative z-20 flex flex-col">
      <InteractiveMap 
        sites={ziarahSites}
        selectedSite={selectedSite}
        onSelectSite={handleMapSelect}
      />
      {selectedSite && (
        <>
          {/* Mobile Overlay */}
          <div 
            className="md:hidden absolute inset-0 z-[999] bg-black/20 backdrop-blur-sm pointer-events-auto"
            onClick={handleClose}
          />
          <div className="absolute top-0 right-0 bottom-0 md:top-4 md:right-4 md:bottom-4 z-[1000] w-full md:max-w-sm pointer-events-none">
            <SiteDetails 
              site={selectedSite} 
              onClose={handleClose} 
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
