import React from 'react';
import { Search, MapPin, Heart } from 'lucide-react';
import { ZiarahSite } from '../data/sites';

interface SiteListProps {
  sites: ZiarahSite[];
  selectedSite: ZiarahSite | null;
  onSelectSite: (site: ZiarahSite) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const SiteList: React.FC<SiteListProps> = ({
  sites,
  selectedSite,
  onSelectSite,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange
}) => {
  const categories = ['Semua', 'Tersimpan', 'Wali Songo', 'Habib', 'Ulama Nusantara'];

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80">
      <div className="p-5 sm:p-6 border-b border-slate-100">
        <h1 className="text-xl sm:text-2xl font-serif font-black text-slate-900 mb-1">
          Ziarah Nusantara
        </h1>
        <p className="text-xs text-slate-500 mb-5">
          Jelajahi jejak para wali dan ulama di Indonesia.
        </p>

        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50/80 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
            placeholder="Cari lokasi atau nama tokoh..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1.5 flex items-center rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {category === 'Tersimpan' && <Heart className={`w-3 h-3 mr-1 ${selectedCategory === 'Tersimpan' ? 'text-rose-300 fill-rose-300' : 'text-slate-400'}`} />}
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {sites.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-xs sm:text-sm">Tidak ada lokasi yang ditemukan.</p>
          </div>
        ) : (
          sites.map(site => (
            <div
              key={site.id}
              onClick={() => onSelectSite(site)}
              className={`group flex gap-3.5 p-3 rounded-2xl cursor-pointer transition-all border ${
                selectedSite?.id === site.id
                  ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-500/20'
                  : 'border-slate-200/70 hover:border-emerald-300 hover:bg-slate-50/70'
              }`}
            >
              <img 
                src={site.imageUrl} 
                alt={site.title}
                referrerPolicy="no-referrer"
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover bg-slate-100 shrink-0 border border-slate-200/80"
              />
              <div className="flex flex-col justify-center min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-0.5">
                  {site.category}
                </span>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight mb-1 truncate">
                  {site.title}
                </h3>
                <div className="flex items-center text-[11px] text-slate-500">
                  <MapPin className="w-3 h-3 mr-1 text-emerald-600 shrink-0" />
                  <span className="truncate">{site.location.city}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

