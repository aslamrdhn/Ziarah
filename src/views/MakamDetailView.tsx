import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ziarahSites, ZiarahSite } from '../data/sites';
import { SiteDetails } from '../components/SiteDetails';

export const MakamDetailView = ({ savedDoas, onToggleSaveDoa, onToggleSave, savedSiteIds }: { savedDoas: string[], onToggleSaveDoa: (id: string) => void, onToggleSave: (id: string) => void, savedSiteIds: string[] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState<ZiarahSite | null>(null);

  useEffect(() => {
    const foundSite = ziarahSites.find(s => s.id === id);
    if (foundSite) {
      setSite(foundSite);
    }
  }, [id]);

  if (!site) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Makam Tidak Ditemukan</h2>
        <p className="text-stone-500 mb-4">Mohon maaf, data makam yang Anda cari tidak tersedia.</p>
        <button onClick={() => navigate('/')} className="px-6 py-2 bg-brand-600 text-white rounded-xl font-bold">Kembali ke Direktori</button>
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
        {/* Render the detail view but make it fill this container instead of floating absolute over map */}
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
