import React, { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Share2, Route as RouteIcon } from 'lucide-react';
import { InteractiveMap } from '../components/InteractiveMap';
import { ZiarahSite } from '../data/sites';
import { useSites } from '../context/SiteContext';
import { findSiteByParam, getSitePath } from '../lib/siteSlugs';
import { CURATED_ZIARAH_ROUTES, CuratedZiarahRoute } from '../lib/siteLogistics';

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
  const { sites: ziarahSites, isLoading } = useSites();
  const [activeRoute, setActiveRoute] = useState<CuratedZiarahRoute>(CURATED_ZIARAH_ROUTES[0]);
  const [activeRouteSites, setActiveRouteSites] = useState<ZiarahSite[]>([]);

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

  const handleActiveRouteChange = useCallback(
    (route: CuratedZiarahRoute, routeSites: ZiarahSite[]) => {
      setActiveRoute(route);
      setActiveRouteSites(routeSites);
    },
    []
  );

  const waRouteShareUrl = useMemo(() => {
    if (activeRoute.id === 'off' || activeRouteSites.length === 0) return '';
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ziarahnusantara.my.id';
    const siteListText = activeRouteSites
      .map((s, idx) => `${idx + 1}. Makam ${s.title} (${s.location.city}, ${s.location.province})`)
      .join('\n');
    const message =
      `Panduan Rute Rombongan — *${activeRoute.label}*\n` +
      `${activeRoute.description}\n\n` +
      `*Urutan Makam (${activeRouteSites.length} Titik):*\n${siteListText}\n\n` +
      `Buka peta interaktif, jadwal haul & bacaan doa lengkap di:\n${origin}/peta`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [activeRoute, activeRouteSites]);

  if (isLoading) {
    return (
      <div className="p-8 text-center text-stone-500 flex-1 flex items-center justify-center font-serif italic">
        Memuat Peta Interaktif Nusantara...
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 pt-2 pb-2 flex-1 flex flex-col gap-2">
      {activeRoute.id !== 'off' && activeRouteSites.length > 0 && (
        <div className="bg-white rounded-2xl px-3.5 py-2.5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <RouteIcon className="w-4 h-4 text-emerald-700 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            <div className="min-w-0">
              <span className="font-semibold text-slate-900">{activeRoute.label}</span>
              <span className="text-slate-500 hidden sm:inline"> · {activeRoute.description}</span>
            </div>
          </div>
          {waRouteShareUrl && (
            <a
              href={waRouteShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition shrink-0"
            >
              <Share2 className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
              <span>Bagikan Rute ke WA Rombongan</span>
            </a>
          )}
        </div>
      )}

      <div className="relative w-full h-[calc(100dvh-6.5rem)] md:h-[calc(100dvh-5.5rem)] min-h-[560px] flex flex-col">
        <InteractiveMap
          sites={ziarahSites}
          selectedSite={selectedSite}
          onSelectSite={handleMapSelect}
          onActiveRouteChange={handleActiveRouteChange}
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
