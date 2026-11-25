import React, { useEffect, lazy, Suspense } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { InteractiveMap } from '../components/InteractiveMap';
import { ZiarahSite } from '../data/sites';
import { useSites } from '../context/SiteContext';
import { findSiteByParam, getSitePath } from '../lib/siteSlugs';

const SiteDetails = lazy(() =>
  import('../components/SiteDetails').then((m) => ({ default: m.SiteDetails }))
);

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
  const { sites: ziarahSites, isLoading, ensureFullSitesLoaded } = useSites();

  useEffect(() => {
    void ensureFullSitesLoaded();
  }, [ensureFullSitesLoaded]);

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
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 pt-2 pb-28 md:pb-12 flex-1 flex flex-col gap-4">
      <div className="rounded-2xl bg-white border border-stone-200/90 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-2xs">
        <p className="text-xs sm:text-sm text-stone-700">
          <strong className="font-semibold text-stone-900">Berangkat bersama keluarga atau rombongan bus?</strong>{' '}
          Unduh urutan maqbarah, titik Google Maps, dan Buku Saku Rute Ziarah terverifikasi.
        </p>
        <Link
          to="/panduan-rute"
          className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-[#064E3B] hover:bg-emerald-950 text-white text-xs font-semibold transition-colors shrink-0"
        >
          Buka Buku Saku Rute Rombongan →
        </Link>
      </div>
      <div className="relative w-full flex flex-col gap-6">
        <InteractiveMap
          sites={ziarahSites}
          selectedSite={selectedSite}
          onSelectSite={handleMapSelect}
        />
        {selectedSite && (
          <Suspense fallback={null}>
            <SiteDetails
              site={selectedSite}
              onClose={handleClose}
              isSaved={savedSiteIds.includes(selectedSite.id)}
              onToggleSave={() => handleToggleSave(selectedSite.id)}
              savedDoas={savedDoas}
              onToggleSaveDoa={onToggleSaveDoa}
              onContribute={onOpenKontribusi}
            />
          </Suspense>
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
          <Link to="/direktori">Direktori {ziarahSites.length} Makam Waliyullah</Link>
        </article>
      )}
    </div>
  );
};
