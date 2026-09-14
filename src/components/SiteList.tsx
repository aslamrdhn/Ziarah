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
    <div className="flex flex-col h-full bg-white border-r border-neutral-200">
      <div className="p-6 border-b border-neutral-100">
        <h1 className="text-2xl font-bold font-serif text-neutral-900 mb-2">
          Ziarah Nusantara
        </h1>
        <p className="text-sm text-neutral-500 mb-6">
          Jelajahi jejak para wali dan ulama di Indonesia.
        </p>

        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-neutral-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-neutral-200 rounded-xl bg-neutral-50 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
            placeholder="Cari lokasi atau nama tokoh..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-1.5 flex items-center rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category === 'Tersimpan' && <Heart className={`w-3 h-3 mr-1.5 ${selectedCategory === 'Tersimpan' ? 'text-rose-400' : 'text-neutral-400'}`} />}
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sites.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-neutral-500 text-sm">Tidak ada lokasi yang ditemukan.</p>
          </div>
        ) : (
          sites.map(site => (
            <div
              key={site.id}
              onClick={() => onSelectSite(site)}
              className={`group flex gap-4 p-3 rounded-xl cursor-pointer transition-all border ${
                selectedSite?.id === site.id
                  ? 'border-brand-500 bg-brand-50 shadow-sm'
                  : 'border-transparent hover:border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              <img 
                src={site.imageUrl} 
                alt={site.title}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-lg object-cover bg-neutral-200 shrink-0"
              />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-1">
                  {site.category}
                </span>
                <h3 className="font-semibold text-neutral-900 text-sm leading-tight mb-1">
                  {site.title}
                </h3>
                <div className="flex items-center text-xs text-neutral-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {site.location.city}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

