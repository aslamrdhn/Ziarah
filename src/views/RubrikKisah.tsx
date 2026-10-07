import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ScrollText, 
  Search, 
  MapPin, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink,
  ChevronRight,
  Clock,
  Compass
} from 'lucide-react';
import { ziarahSites } from '../data/sites';
import { Link } from 'react-router-dom';

interface RubrikItem {
  id: string;
  siteId: string;
  siteName: string;
  location: string;
  category: 'Manuskrip' | 'Kisah Rahasia' | 'Hikmah & Karomah';
  title: string;
  content: string;
  source: string;
  readTime: string;
}

export const RubrikKisah: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('savedRubrik') || '[]');
    } catch {
      return [];
    }
  });
  const [activeStoryModal, setActiveStoryModal] = useState<RubrikItem | null>(null);

  const toggleSaveArticle = (id: string) => {
    setSavedArticles(prev => {
      const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      localStorage.setItem('savedRubrik', JSON.stringify(next));
      return next;
    });
  };

  // Compile articles from sites data and untold stories
  const articles: RubrikItem[] = useMemo(() => {
    const list: RubrikItem[] = [];

    ziarahSites.forEach(site => {
      if (site.untoldStory) {
        list.push({
          id: `rubrik-${site.id}-untold`,
          siteId: site.id,
          siteName: site.name,
          location: `${site.location.city}, ${site.location.province}`,
          category: 'Kisah Rahasia',
          title: `Catatan Khusus: ${site.name}`,
          content: site.untoldStory,
          source: 'Manuskrip Lisan & Catatan Pengasuh Makam',
          readTime: '3 mnt'
        });
      }

      if (site.karomah && site.karomah.length > 0) {
        site.karomah.forEach((k, idx) => {
          list.push({
            id: `rubrik-${site.id}-karomah-${idx}`,
            siteId: site.id,
            siteName: site.name,
            location: `${site.location.city}, ${site.location.province}`,
            category: 'Hikmah & Karomah',
            title: `Karomah & Jejak Dakwah: ${site.name} (Bagian ${idx + 1})`,
            content: k,
            source: 'Babad & Riwayat Tradisi Nusantara',
            readTime: '2 mnt'
          });
        });
      }
    });

    // Add highlighted historical editorial entries
    list.push({
      id: 'rubrik-wali-songo-strategy',
      siteId: 'sunan-kalijaga',
      siteName: 'Sunan Kalijaga (Raden Sahid)',
      location: 'Demak, Jawa Tengah',
      category: 'Manuskrip',
      title: 'Filosofi Gamelan & Tembang Lir-Ilir dalam Dakwah Kultural',
      content: 'Pendekatan dakwah Sunan Kalijaga memadukan kearifan lokal Jawa dengan tauhid Islam. Melalui wayang kulit purwa dan tembang Ilir-Ilir, makna kebangkitan spiritual diajarkan secara metaforik tanpa konfrontasi fisik. Catatan serat kuno mencatat bagaimana beliau mendesain tata kota keraton dengan alun-alun, pohon beringin kembar, dan masjid agung sebagai simbol keterhubungan duniawi dan ukhrawi.',
      source: 'Katalog Serat Centhini & Naskah Babad Demak',
      readTime: '4 mnt'
    });

    list.push({
      id: 'rubrik-sekumpul-adab',
      siteId: 'guru-sekumpul',
      siteName: 'KH. Muhammad Zaini Abdul Ghani (Abah Guru Sekumpul)',
      location: 'Martapura, Kalimantan Selatan',
      category: 'Hikmah & Karomah',
      title: 'Adab Menghadiri Majelis Maulid & Keberkahan Jamuan Musafir',
      content: 'Abah Guru Sekumpul sangat memuliakan tamu dan penuntut ilmu. Selama haul dan majelis mingguan, ribuan dapur umum warga di Martapura menyajikan makanan gratis bagi siapa saja tanpa memandang status sosial. Tradisi luhur ini terus berlanjut hingga kini, membuktikan buah tarbiyah akhlak yang meresap ke dalam sanubari masyarakat Banjar.',
      source: 'Manuskrip Biografi & Kesaksian Para Habaib Martapura',
      readTime: '3 mnt'
    });

    return list;
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(item => {
      const matchCat = selectedCategory === 'Semua' 
        ? true 
        : selectedCategory === 'Tersimpan' 
          ? savedArticles.includes(item.id) 
          : item.category === selectedCategory;
      const matchQuery = !searchQuery 
        || item.title.toLowerCase().includes(searchQuery.toLowerCase())
        || item.content.toLowerCase().includes(searchQuery.toLowerCase())
        || item.siteName.toLowerCase().includes(searchQuery.toLowerCase())
        || item.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [articles, selectedCategory, searchQuery, savedArticles]);

  const categories = ['Semua', 'Kisah Rahasia', 'Manuskrip', 'Hikmah & Karomah', 'Tersimpan'];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-950 via-brand-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-lg mb-8 relative overflow-hidden border border-emerald-900/40"
      >
        <div className="absolute right-0 top-0 -mr-10 -mt-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-gold-300 text-xs font-semibold mb-4">
            <ScrollText className="w-4 h-4" />
            <span>Rubrik Khazanah Sejarah & Manuskrip</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight mb-3">
            Rubrik Ziarah Nusantara
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Menghadirkan naskah manuskrip, kisah tersembunyi (*untold stories*), hikmah karomah, dan khazanah sejarah keilmuan para Aulia dan Ulama Nusantara.
          </p>
        </div>
      </motion.div>

      {/* Filter & Search */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/90 shadow-xs mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari rubrik, tokoh wali, manuskrip, atau daerah..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div className="flex overflow-x-auto pb-1 sm:pb-0 gap-1.5 scrollbar-hide">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                type="button"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 450, damping: 25 }}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50/50 hover:text-emerald-800'
                }`}
              >
                {cat} {cat === 'Tersimpan' ? `(${savedArticles.length})` : ''}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/90 shadow-sm">
          <ScrollText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700 mb-1">Belum Ada Rubrik yang Sesuai</h3>
          <p className="text-xs text-slate-500">Silakan sesuaikan kata kunci pencarian atau kategori filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {filteredArticles.map((article) => {
            const isSaved = savedArticles.includes(article.id);
            return (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="px-2.5 py-1 rounded-xl font-bold uppercase tracking-wider text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      {article.category}
                    </span>
                    <div className="flex items-center text-slate-400 space-x-2">
                      <span className="flex items-center text-[11px] text-slate-500 font-medium">
                        <Clock className="w-3 h-3 mr-1" /> {article.readTime}
                      </span>
                      <motion.button
                        whileTap={{ scale: 1.35 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        onClick={() => toggleSaveArticle(article.id)}
                        className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                          isSaved 
                            ? 'bg-amber-50 text-amber-600 border-amber-200 shadow-2xs' 
                            : 'hover:bg-slate-100 text-slate-400 border-transparent'
                        }`}
                        title={isSaved ? "Hapus dari simpanan" : "Simpan rubrik"}
                      >
                        {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </motion.button>
                    </div>
                  </div>

                  <h2 className="text-base sm:text-lg font-serif font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2 leading-snug">
                    {article.title}
                  </h2>

                  <div className="flex items-center text-xs text-emerald-700 font-semibold mb-3">
                    <Compass className="w-3.5 h-3.5 mr-1 text-emerald-600 shrink-0" />
                    <span className="truncate">{article.siteName}</span>
                    <span className="mx-1.5 text-slate-300 shrink-0">•</span>
                    <span className="text-slate-500 font-normal truncate">{article.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                    {article.content}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
                  <span className="text-[11px] text-slate-400 italic truncate max-w-[200px]">
                    Sumber: {article.source}
                  </span>
                  <motion.button
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveStoryModal(article)}
                    className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
                  >
                    Baca Selengkapnya
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {/* Modal Detail Rubrik */}
      <AnimatePresence>
        {activeStoryModal && (
          <div className="fixed inset-0 z-[3000] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Header Modal */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/60 flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-lg uppercase tracking-wider mb-2 inline-block border border-emerald-200/60">
                    {activeStoryModal.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-black text-slate-900 leading-snug">
                    {activeStoryModal.title}
                  </h3>
                  <div className="flex items-center text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                    <span>{activeStoryModal.siteName} — {activeStoryModal.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveStoryModal(null)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Isi Modal */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
                <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl text-xs text-emerald-950 leading-relaxed">
                  <p className="font-semibold mb-0.5">Catatan Kurasi:</p>
                  Kisah ini dihimpun dan dikurasi dari tradisi manuskrip dan riwayat lisan peziarah nusantara sebagai pembelajaran moral, keteladanan spiritual, dan khazanah sejarah Islam Nusantara.
                </div>

                <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 border-l-2 border-emerald-400 pl-4 italic">
                  <p>{activeStoryModal.content}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <p><span className="font-semibold text-slate-700">Rujukan & Sumber:</span> {activeStoryModal.source}</p>
                </div>
              </div>

              {/* Footer Modal */}
              <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
                <Link
                  to={`/makam/${activeStoryModal.siteId}`}
                  onClick={() => setActiveStoryModal(null)}
                  className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center"
                >
                  Buka Profil Lengkap Makam
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Link>
                <button
                  onClick={() => setActiveStoryModal(null)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
