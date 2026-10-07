import React, { useState, useEffect } from 'react';
import { ZiarahSite } from '../data/sites';
import { X, MapPin, Navigation, Info, Clock, CheckCircle2, Heart, Sparkles, BookOpen, Bookmark, BookmarkCheck, QrCode, MessageSquare, Send, Unlock, ScrollText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TransactionModal } from './TransactionModal';

interface SiteDetailsProps {
  site: ZiarahSite | null;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  savedDoas?: string[];
  onToggleSaveDoa?: (id: string) => void;
  onContribute?: () => void;
}

export const SiteDetails: React.FC<SiteDetailsProps> = React.memo(({ site, onClose, isSaved, onToggleSave, savedDoas = [], onToggleSaveDoa, onContribute }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'karomah' | 'kisah' | 'untold' | 'doa'>('info');
  const [newStory, setNewStory] = useState('');
  const [stories, setStories] = useState<{id: number; name: string; text: string; date: string}[]>([]);
  const [transactionType, setTransactionType] = useState<'infaq' | 'untold' | null>(null);
  const [unlockedUntold, setUnlockedUntold] = useState<string[]>(() => { try { return JSON.parse(localStorage.getItem('unlockedUntold') || '[]'); } catch { return []; } });
  useEffect(() => { localStorage.setItem('unlockedUntold', JSON.stringify(unlockedUntold)); }, [unlockedUntold]);

  // Reset tab when site changes
  useEffect(() => {
    setActiveTab('info');
    setNewStory('');
    setStories([
      { id: 1, name: 'Hamba Allah', text: `Tempatnya sangat sejuk dan nyaman untuk beri'tikaf dan berdzikir. Fasilitas juga sangat memadai. Masya Allah.`, date: '2 hari yang lalu' },
      { id: 2, name: 'Ahmad S.', text: `Alhamdulillah dimudahkan sampai ke makam beliau. Terasa ketenangan batin yang luar biasa saat bertawasul di sini.`, date: '1 minggu yang lalu' }
    ]);
  }, [site?.id]);

  const handleAddStory = () => {
    if (newStory.trim()) {
      setStories(prev => [
        { id: Date.now(), name: 'Anda', text: newStory, date: 'Baru saja' },
        ...prev
      ]);
      setNewStory('');
    }
  };

  if (!site) return null;

  const hasKaromah = site.karomah && site.karomah.length > 0;
  const hasDoa = site.doaKhusus && site.doaKhusus.length > 0;
  const hasUntold = !!site.untoldStory;

  return (
    <>
    <AnimatePresence>
      {site && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="absolute inset-0 md:top-3 md:right-3 md:bottom-3 md:left-auto md:w-[420px] bg-white md:rounded-3xl shadow-2xl z-[1000] overflow-hidden flex flex-col border-none md:border md:border-slate-200/90 pointer-events-auto"
        >
          <div className="relative h-64 shrink-0 bg-slate-900">
            <img 
              src={site.imageUrl} 
              alt={site.title} 
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="absolute top-3 right-3 flex space-x-2">
              <motion.button 
                whileTap={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 450, damping: 15 }}
                onClick={onToggleSave}
                className="p-2.5 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md rounded-xl text-white transition-colors border border-white/20 shadow-sm cursor-pointer"
                title={isSaved ? "Hapus dari Rencana" : "Simpan ke Rencana"}
              >
                <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
              </motion.button>
              <motion.button 
                whileTap={{ scale: 0.85 }}
                onClick={onClose}
                className="p-2.5 bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md rounded-xl text-white transition-colors border border-white/20 shadow-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>
            
            <div className="absolute bottom-4 left-5 right-5 text-white">
              <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-300 mb-1.5 bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-500/30 backdrop-blur-md">
                {site.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-black text-white leading-tight tracking-tight drop-shadow-sm">
                {site.title}
              </h2>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex px-3 py-2.5 bg-slate-50 border-b border-slate-200/80 overflow-x-auto scrollbar-hide shrink-0 gap-1.5">
            <motion.button 
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveTab('info')}
              className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeTab === 'info' ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
            >
              <Info className="w-3.5 h-3.5 mr-1.5" /> Info
            </motion.button>
            {hasKaromah && (
              <motion.button 
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveTab('karomah')}
                className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeTab === 'karomah' ? 'bg-white text-amber-800 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-500" /> Karomah
              </motion.button>
            )}
            <motion.button 
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveTab('kisah')}
              className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeTab === 'kisah' ? 'bg-white text-sky-800 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5 text-sky-500" /> Cerita
            </motion.button>
            {hasUntold && (
              <motion.button 
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveTab('untold')}
                className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeTab === 'untold' ? 'bg-white text-purple-800 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
              >
                <ScrollText className="w-3.5 h-3.5 mr-1.5 text-purple-500" /> Rubrik
              </motion.button>
            )}
            {hasDoa && (
              <motion.button 
                whileTap={{ scale: 0.94 }}
                onClick={() => setActiveTab('doa')}
                className={`flex items-center px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${activeTab === 'doa' ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80' : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'}`}
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Doa Khusus
              </motion.button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-5 bg-[#f8fafc] space-y-5">
            {activeTab === 'info' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div>
                  <h3 className="text-base font-serif font-bold text-slate-900 mb-1.5">{site.name}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {site.description}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3.5">
                  <div className="flex items-start text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">{site.location.address}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{site.location.city}, {site.location.province}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm">
                    <Clock className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0" />
                    <div className="font-semibold text-slate-900">
                      {site.openingHours}
                    </div>
                  </div>
                  <div className="flex items-center text-xs">
                    <Navigation className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0" />
                    <div className="font-mono text-slate-600 text-[11px]">
                      {site.location.lat}, {site.location.lng}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-2.5">
                    <Info className="w-4 h-4 text-emerald-600 mr-2" />
                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">Sejarah Singkat</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs">
                    {site.history}
                  </p>
                </div>
                
                {site.facilities && site.facilities.length > 0 && (
                  <div>
                    <div className="flex items-center mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" />
                      <h4 className="font-bold text-slate-900 text-sm tracking-tight">Fasilitas Kompleks</h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {site.facilities.map((fac, idx) => (
                        <span key={idx} className="bg-white text-slate-700 text-[11px] px-2.5 py-1 rounded-lg font-semibold border border-slate-200 shadow-xs">
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Infaq Digital Shortcut */}
                <div className="pt-1">
                  <button 
                    onClick={() => setTransactionType('infaq')}
                    className="w-full flex items-center justify-between p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100/70 hover:to-teal-100/70 rounded-2xl border border-emerald-200/80 transition-all group cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-emerald-600 text-white rounded-xl mr-3 shadow-xs">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-bold text-emerald-950 block">Infaq Digital Makam</span>
                        <span className="text-[10px] text-emerald-700 font-medium">Sedekah Jariyah & Pemeliharaan Kompleks</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs">Infaq →</span>
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'karomah' && hasKaromah && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mr-2.5 border border-amber-200/80">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-black text-slate-900 text-lg">Kisah Karomah</h3>
                </div>
                <div className="space-y-3">
                  {site.karomah!.map((item, idx) => {
                    const kId = `${site.id}-karomah-${idx}`;
                    const isSavedKaromah = savedDoas.includes(kId);
                    return (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex items-start group relative pr-10 hover:border-emerald-300 transition-all">
                        <div className="w-6 h-6 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mr-3 mt-0.5 border border-amber-200">
                          {idx + 1}
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pr-2">{item}</p>
                        {onToggleSaveDoa && (
                          <button 
                            onClick={() => onToggleSaveDoa(kId)}
                            title="Simpan ke Koleksi"
                            className={`absolute top-4 right-4 p-2 transition-all bg-white rounded-xl border shadow-xs cursor-pointer ${isSavedKaromah ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 'text-slate-400 border-slate-200 hover:text-emerald-700 hover:border-emerald-200'}`}
                          >
                            {isSavedKaromah ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <p className="text-[11px] text-slate-500 italic text-center mb-3 leading-relaxed">
                    Kisah karomah di atas dirangkum dari tradisi lisan dan manuskrip sejarah lokal. Nilai utamanya adalah untuk menambah kecintaan dan meneladani ketakwaan beliau kepada Allah SWT.
                  </p>
                  <button 
                    onClick={onContribute}
                    className="w-full py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-xl transition-all border border-amber-200 flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-2 text-amber-600" /> Punya Kisah Lain? Kontribusi di Sini
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'doa' && hasDoa && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mr-2.5 border border-emerald-200">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-black text-slate-900 text-lg">Doa & Tawasul Khusus</h3>
                </div>
                <div className="space-y-4">
                  {site.doaKhusus!.map((doa, idx) => {
                    const dId = `${site.id}-doa-${idx}`;
                    const isSavedDoa = savedDoas.includes(dId);
                    return (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs relative group hover:border-emerald-300 transition-all">
                        <div className="flex items-start justify-between border-b border-slate-100 mb-3 pb-2.5">
                          <h4 className="font-serif font-black text-slate-900 pr-8 text-base">{doa.title}</h4>
                          {onToggleSaveDoa && (
                            <button 
                              onClick={() => onToggleSaveDoa(dId)}
                              title="Simpan ke Koleksi"
                              className={`absolute top-4 right-4 p-2 transition-all bg-white rounded-xl border shadow-xs cursor-pointer ${isSavedDoa ? 'text-emerald-700 border-emerald-200 bg-emerald-50' : 'text-slate-400 border-slate-200 hover:text-emerald-700 hover:border-emerald-200'}`}
                            >
                              {isSavedDoa ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                        <p className="text-xl font-arabic text-emerald-950 leading-loose text-right mb-4" dir="rtl">
                          {doa.text}
                        </p>
                        {doa.translation && (
                          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Artinya:</p>
                            <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">{doa.translation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <button 
                    onClick={onContribute}
                    className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl transition-all border border-emerald-200 flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5 mr-2 text-emerald-700" /> Ketahui Bacaan/Doa Lain? Kontribusi di Sini
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'kisah' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mr-2.5 border border-sky-200">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-black text-slate-900 text-lg">Kisah Pengunjung</h3>
                  </div>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">{stories.length} Cerita</span>
                </div>

                {/* Input Form */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                     <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Tulis Pengalaman Anda</span>
                  </div>
                  <textarea
                    placeholder="Bagikan pengalaman spiritual atau cerita menarik Anda saat berziarah ke sini..."
                    className="w-full text-xs sm:text-sm p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 resize-none transition-all placeholder:text-slate-400"
                    rows={3}
                    value={newStory}
                    onChange={(e) => setNewStory(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddStory}
                      disabled={!newStory.trim()}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 mr-2" />
                      Kirim Kisah
                    </button>
                  </div>
                </div>

                {/* Stories List */}
                <div className="space-y-3 mt-4">
                  {stories.map(story => (
                    <div key={story.id} className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800 font-bold text-xs mr-2.5">
                            {story.name.charAt(0)}
                          </div>
                          <div className="font-bold text-slate-900 text-xs sm:text-sm">{story.name}</div>
                        </div>
                        <div className="text-[10px] text-slate-400 font-medium bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">{story.date}</div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                        "{story.text}"
                      </p>
                    </div>
                  ))}
                  {stories.length === 0 && (
                    <div className="text-center py-8 text-slate-400 text-xs italic">
                      Belum ada cerita pengunjung. Jadilah yang pertama membagikan pengalaman Anda!
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'untold' && hasUntold && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif font-black text-lg text-purple-950 flex items-center">
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mr-2.5 border border-purple-200">
                      <ScrollText className="w-4 h-4" />
                    </div>
                    Rubrik Sejarah & Manuskrip
                  </h3>
                  {unlockedUntold.includes(site.id) && (
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">Terbuka</span>
                  )}
                </div>
                
                {unlockedUntold.includes(site.id) ? (
                  <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-xs relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <p className="text-slate-700 leading-relaxed relative z-10 text-xs sm:text-sm italic border-l-4 border-purple-400 pl-4">
                      {site.untoldStory}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center relative overflow-hidden flex flex-col items-center">
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-10 flex flex-col items-center justify-center p-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-700 mb-3 shadow-xs border border-purple-200">
                        <ScrollText className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">Rubrik Khusus</h4>
                      <p className="text-xs text-slate-500 mb-4 max-w-[260px] leading-relaxed">Kisah dan manuskrip ini dikumpulkan dari sumber lisan dan arsip tertutup. Buka akses untuk membacanya.</p>
                      <button 
                        onClick={() => setTransactionType('untold')}
                        className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center cursor-pointer"
                      >
                        <Unlock className="w-4 h-4 mr-2" /> Buka Akses Rubrik (Rp 15.000)
                      </button>
                    </div>
                    {/* Blurred preview text */}
                    <p className="text-slate-400 leading-relaxed text-xs italic blur-[3px] select-none">
                      Dalam sebuah manuskrip kuno yang tersimpan rapat, disebutkan bahwa tokoh ini memiliki kemampuan luar biasa yang jarang diketahui publik. Kisah ini dijaga lisan secara turun temurun oleh para penjaga rahasia...
                    </p>
                  </div>
                )}
              </motion.div>
            )}

          </div>
          
          <div className="p-4 border-t border-slate-200/90 bg-white shrink-0">
             <a 
               href={`https://www.google.com/maps/dir/?api=1&destination=${site.location.lat},${site.location.lng}`}
               target="_blank"
               rel="noopener noreferrer"
               className="w-full flex items-center justify-center py-3.5 bg-gradient-to-r from-emerald-700 via-emerald-800 to-brand-900 hover:from-emerald-800 hover:to-brand-950 text-white rounded-2xl font-bold text-sm transition-all shadow-md shadow-emerald-950/10 border border-emerald-600/30 active:scale-[0.99]"
             >
               <Navigation className="w-4 h-4 mr-2" />
               Buka Navigasi Rute (Google Maps)
             </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    
    <TransactionModal 
      isOpen={transactionType !== null}
      onClose={() => setTransactionType(null)}
      site={site}
      type={transactionType || 'infaq'}
      onSuccess={() => {
        if (transactionType === 'untold' && site) {
          setUnlockedUntold(prev => [...prev, site.id]);
        }
        setTransactionType(null);
      }}
    />
  </>
  );
});
