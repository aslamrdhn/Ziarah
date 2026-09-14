import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { ZiarahSite, ziarahSites } from '../data/sites';

interface DaftarMakamProps {
  onSelectSite: (site: ZiarahSite) => void;
}

export const DaftarMakam: React.FC<DaftarMakamProps> = React.memo(({ onSelectSite }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');

  const categories = useMemo(() => ['Semua', 'Walisongo', 'Ulama Nusantara', 'Habaib', 'Auliya Nusantara'], []);
  const provinces = useMemo(() => ['Semua Provinsi', ...Array.from(new Set(ziarahSites.map(s => s.location.province)))].sort(), []);

  const filteredSites = useMemo(() => {
    return ziarahSites.filter(site => {
      const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            site.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || site.category === selectedCategory;
      const matchesProvince = selectedProvince === 'Semua Provinsi' || site.location.province === selectedProvince;
      
      return matchesSearch && matchesCategory && matchesProvince;
    });
  }, [searchQuery, selectedCategory, selectedProvince]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
      
      {/* Hero Section */}
      <div className="py-12 md:py-20 text-center md:text-left">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-6 border border-brand-100">
            <span>Direktori Ziarah Nusantara</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4 text-brand-900 leading-tight">
            Jelajahi Jejak <span className="text-gold-600 italic">Para Wali.</span>
          </h1>
          
          <p className="text-stone-500 text-lg md:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed">
            Temukan lokasi makam, panduan ziarah, dan sejarah tokoh ulama di Nusantara dengan mudah.
          </p>
        </div>
      </div>

      {/* Main Directory Interface */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-brand-900/5 border border-stone-200">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 text-stone-900 transition-colors"
              placeholder="Cari Makam atau Ulama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <select 
              className="bg-stone-50 border border-stone-200 text-stone-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              {provinces.map(prov => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all shrink-0 border ${
                selectedCategory === category
                  ? 'bg-brand-800 text-gold-300 border-brand-800 shadow-md'
                  : 'bg-white text-stone-500 border-stone-200 hover:bg-brand-50 hover:text-brand-800 hover:border-brand-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSites.map((site) => (
            <div 
              key={site.id} 
              className="group cursor-pointer bg-white hover:bg-stone-50 p-5 rounded-2xl transition-all duration-300 border border-stone-200 shadow-sm hover:shadow-lg hover:border-gold-300 flex flex-col h-full relative overflow-hidden"
              onClick={() => onSelectSite(site)}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-500 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-gold-700 uppercase tracking-widest bg-gold-50 border border-gold-100 px-2.5 py-1 rounded-md">
                  {site.category}
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-900 group-hover:text-brand-600 transition-colors mb-2 line-clamp-2 leading-snug">
                Makam {site.title}
              </h3>
              <p className="text-sm text-stone-500 mt-auto flex items-center">
                {site.location.city}, {site.location.province}
              </p>
            </div>
          ))}
          {filteredSites.length === 0 && (
            <div className="col-span-full text-center py-16 text-stone-500">
              <div className="inline-block p-4 bg-stone-50 rounded-full mb-4">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <p>Makam tidak ditemukan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
