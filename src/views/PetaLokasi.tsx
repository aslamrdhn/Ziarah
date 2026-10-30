import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { InteractiveMap } from '../components/InteractiveMap';
import { SiteDetails } from '../components/SiteDetails';
import { ZiarahSite } from '../data/sites';
import { useSites } from '../context/SiteContext';
import { findSiteByParam, getSitePath } from '../lib/siteSlugs';

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
  selectedSite,
  setSelectedSite,
  savedSiteIds,
  handleToggleSave,
  savedDoas,
  onToggleSaveDoa,
  onOpenKontribusi,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sites: ziarahSites, isLoading } = useSites();

  useEffect(() => {
    if (id) {
      const found = findSiteByParam(ziarahSites, id);
      if (found) setSelectedSite(found);
    } else {
      setSelectedSite(null);
    }
  }, [id, ziarahSites, setSelectedSite]);

  const handleClose = () => {
    setSelectedSite(null);
    navigate('/peta');
  };

  const handleMapSelect = (site: ZiarahSite | null) => {
    setSelectedSite(site);
    if (site) {
      navigate(getSitePath(site));
    } else {
      navigate('/peta');
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-stone-500 flex-1 flex items-center justify-center font-serif italic">
        Memuat Peta Interaktif Nusantara...
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 pb-2 flex-1 flex flex-col">
      <div className="relative w-full h-[calc(100dvh-9.5rem)] md:h-[calc(100dvh-7rem)] min-h-[460px] flex flex-col">
        <InteractiveMap sites={ziarahSites} selectedSite={selectedSite} onSelectSite={handleMapSelect} />
        {selectedSite && (
          <>
            {/* Mobile & Tablet Backdrop Overlay */}
            <div
              className="md:hidden absolute inset-0 z-[999] bg-stone-950/35 backdrop-blur-xs pointer-events-auto rounded-2xl cursor-pointer"
              onClick={handleClose}
            />
            <div className="absolute inset-0 md:inset-y-3 md:right-3 md:left-auto z-[1000] w-full md:w-[400px] lg:w-[420px] pointer-events-auto">
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

      {/* Crawlable Semantic SEO Article (SR-Only so visual map layout remains 100% clean) */}
      {selectedSite && (
        <article className="sr-only">
          <h1>
            Makam {selectedSite.title} ({selectedSite.name}) — {selectedSite.location.city},{' '}
            {selectedSite.location.province}
          </h1>
          <p>{selectedSite.description}</p>
          <p>{selectedSite.history}</p>
          <p>
            Alamat: {selectedSite.location.address}, {selectedSite.location.city}, {selectedSite.location.province}
          </p>
          <Link to="/panduan">Bacaan Doa Ziarah Kubur Lengkap</Link>
          <Link to="/direktori">Direktori 96 Makam Waliyullah</Link>
        </article>
      )}
    </div>
  );
};
