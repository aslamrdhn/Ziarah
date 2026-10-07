import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ZiarahSite } from '../data/sites';
import { useSites } from '../context/SiteContext';
import { SiteDetails } from '../components/SiteDetails';

export const MakamDetailView = ({ savedDoas, onToggleSaveDoa, onToggleSave, savedSiteIds }: { savedDoas: string[], onToggleSaveDoa: (id: string) => void, onToggleSave: (id: string) => void, savedSiteIds: string[] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState<ZiarahSite | null>(null);
  const { sites: ziarahSites, isLoading } = useSites();

  useEffect(() => {
    if (isLoading) return;
    const foundSite = ziarahSites.find((s: ZiarahSite) => s.id === id);
    if (foundSite) {
      setSite(foundSite);
    }
  }, [id, ziarahSites, isLoading]);

  if (isLoading) return <div className="p-12 text-center text-slate-400 font-medium">Memuat Detail Makam...</div>;

  if (!site) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto">
        <h2 className="text-xl sm:text-2xl font-serif font-black text-slate-900 mb-2">Makam Tidak Ditemukan</h2>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">Mohon maaf, data makam yang Anda cari tidak tersedia di direktori kami.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer">Kembali ke Direktori</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center p-4 md:p-8 relative">
      <Helmet>
        <title>{site.title} | Ziarah Nusantara</title>
        <meta name="description" content={site.history.substring(0, 150) + '...'} />
        <meta property="og:image" content={site.imageUrl} />
      </Helmet>
      <div className="w-full max-w-4xl relative h-[80vh]">
        <SiteDetails 
          site={site} 
          onClose={() => navigate(-1)} 
          isSaved={savedSiteIds.includes(site.id)}
          onToggleSave={() => onToggleSave(site.id)}
          savedDoas={savedDoas}
          onToggleSaveDoa={onToggleSaveDoa}
        />
      </div>
    </div>
  );
};
