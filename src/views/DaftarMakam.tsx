
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Sparkles, X, ScrollText, BookOpen, Compass, ChevronRight, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ZiarahSite } from '../data/sites';
import { useSites } from '../context/SiteContext';

interface DaftarMakamProps {
  onSelectSite: (site: ZiarahSite) => void;
}

export const DaftarMakam: React.FC<DaftarMakamProps> = React.memo(({ onSelectSite }) => {
  const { sites: ziarahSites, isLoading } = useSites();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');

  const categories = useMemo(() => ['Semua', 'Walisongo', 'Ulama Nusantara', 'Habaib', 'Auliya Nusantara'], []);
  const provinces = useMemo(() => ['Semua Provinsi', ...Array.from(new Set(ziarahSites.map((s: ZiarahSite) => s.location.province)))].sort(), [ziarahSites]);

  const filteredSites = useMemo(() => {
    return ziarahSites.filter((site: ZiarahSite) => {
      const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            site.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            site.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            site.location.province.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || site.category === selectedCategory;
      const matchesProvince = selectedProvince === 'Semua Provinsi' || site.location.province === selectedProvince;
      
      return matchesSearch && matchesCategory && matchesProvince;
    });
  }, [searchQuery, selectedCategory, selectedProvince, ziarahSites]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-slate-400">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-medium">Memuat direktori makam...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-4 pb-12">
      
      {/* Modern Hero Section */}
      <div className="py-8 sm:py-12 md:py-14">
        <div className="max-w-3xl">
          <motion.div 
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-emerald-800 text-xs font-semibold mb-4 shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Platform Ziarah Generasi Muda Nusantara</span>
          </motion.div>
          
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight mb-4 text-slate-900 leading-[1.15]">
            Jelajahi Jejak Spiritual <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-emerald-600 to-teal-700 italic">
              Para Waliyullah.
            </span>
          </h1>
          
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            Basis data komprehensif makam wali, ulama pejuang, dan habaib di Indonesia dengan navigasi presisi, panduan adab, doa khusus, serta rubrik kisah bersejarah.
          </p>
        </div>

        {/* Quick Highlights / Bento Metric Badges with Spring Motion */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8">
          {[
            { title: "9 Wali Songo", subtitle: "Jawa & Jalur Pantura" },
            { title: `${ziarahSites.length} Titik Lokasi`, subtitle: "Koordinat & Rute Akurat" },
            { title: "Doa & Rubrik", subtitle: "Wirid & Manuskrip Lisan" },
            { title: "Infaq Digital", subtitle: "100% Sedekah Langsung" },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5, scale: 1.025 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="bg-white/80 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 hover:shadow-md transition-shadow cursor-default"
            >
              <div className="text-emerald-700 font-bold text-xl sm:text-2xl font-serif">{item.title}</div>
              <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">{item.subtitle}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Filter & Search Hub */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-xl shadow-slate-900/5 border border-slate-200/90 mb-8">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 mb-6">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 sm:h-5 w-4 sm:w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 sm:pl-11 pr-10 py-3 sm:py-3.5 bg-slate-50/90 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-slate-900 text-sm sm:text-base placeholder-slate-400 transition-all shadow-inner"
              placeholder="Cari makam, ulama, atau kota (cth: Sunan Kalijaga, Kudus, Ampel)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Province Selector */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="relative w-full md:w-auto">
              <select 
                className="w-full md:w-auto appearance-none bg-slate-50/90 border border-slate-200 text-slate-700 py-3 sm:py-3.5 pl-4 pr-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 text-sm font-semibold cursor-pointer shadow-inner"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                {provinces.map(prov => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
              <Filter className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Interactive Category Segmented Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-1">
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            const count = category === 'Semua' 
              ? ziarahSites.length 
              : ziarahSites.filter(s => s.category === category).length;
            
            return (
              <motion.button
                key={category}
                layout
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center space-x-1.5 border cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm shadow-emerald-950/10'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50/60 hover:text-emerald-900 hover:border-emerald-200'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                }`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          Menampilkan <span className="font-bold text-slate-900">{filteredSites.length}</span> lokasi ziarah
          {selectedCategory !== 'Semua' && <span> di kategori <strong className="text-emerald-800">{selectedCategory}</strong></span>}
          {selectedProvince !== 'Semua Provinsi' && <span> di <strong className="text-emerald-800">{selectedProvince}</strong></span>}
        </p>

        {(searchQuery || selectedCategory !== 'Semua' || selectedProvince !== 'Semua Provinsi') && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
              setSelectedProvince('Semua Provinsi');
            }}
            className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
          >
            Reset Filter
          </motion.button>
        )}
      </div>

      {/* Grid of Modern Site Cards with Rich Motion */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredSites.map((site) => (
            <motion.div 
              key={site.id} 
              layout
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -10 }}
              whileHover={{ y: -7, scale: 1.01 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group cursor-pointer bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 flex flex-col h-full overflow-hidden"
              onClick={() => onSelectSite(site)}
            >
              {/* Card Image Header */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
                <img 
                  src={site.imageUrl} 
                  alt={site.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Category Micro Badge */}
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold text-slate-800 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-xl shadow-xs border border-white/40">
                    {site.category}
                  </span>
                </div>

                {/* Title & Town overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] text-emerald-300 font-medium flex items-center mb-0.5">
                    <MapPin className="w-3 h-3 mr-1 shrink-0" />
                    {site.location.city}, {site.location.province}
                  </p>
                  <h3 className="text-lg font-serif font-bold text-white leading-snug line-clamp-1 drop-shadow-xs">
                    {site.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                <h4 className="text-sm font-semibold text-slate-800 mb-2 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                  {site.name}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                  {site.description}
                </p>

                {/* Feature Tags (Rubrik, Doa, Karomah) */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 mb-4">
                  {site.untoldStory && (
                    <span className="inline-flex items-center text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200/60">
                      <ScrollText className="w-2.5 h-2.5 mr-1" /> Rubrik
                    </span>
                  )}
                  {site.doaKhusus && site.doaKhusus.length > 0 && (
                    <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200/60">
                      <BookOpen className="w-2.5 h-2.5 mr-1" /> Doa Khusus
                    </span>
                  )}
                  {site.karomah && site.karomah.length > 0 && (
                    <span className="inline-flex items-center text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/60">
                      <Sparkles className="w-2.5 h-2.5 mr-1" /> Karomah
                    </span>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="flex items-center justify-between text-xs font-bold text-emerald-700 group-hover:text-emerald-800 transition-colors">
                  <span>Buka Detail & Rute Peta</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredSites.length === 0 && (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm my-4">
            <div className="inline-flex p-4 bg-emerald-50 text-emerald-700 rounded-2xl mb-3">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">Makam Tidak Ditemukan</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-5">
              Coba gunakan kata kunci lain, atau sesuaikan filter kategori dan provinsi yang dipilih.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
                setSelectedProvince('Semua Provinsi');
              }}
              className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-bold transition-colors"
            >
              Tampilkan Semua Makam
            </button>
          </div>
        )}
      </div>
    </div>
  );
});
