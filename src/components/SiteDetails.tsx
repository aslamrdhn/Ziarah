import React, { useState, useEffect } from 'react';
import { ZiarahSite } from '../data/sites';
import { X, MapPin, Navigation, Info, Clock, CheckCircle2, Heart, Sparkles, BookOpen, Bookmark, BookmarkCheck, QrCode, ShoppingBag, MessageSquare, Send, Lock, Unlock } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'info' | 'karomah' | 'doa' | 'kisah' | 'untold'>('info');
  const [newStory, setNewStory] = useState('');
  const [stories, setStories] = useState<{id: number; name: string; text: string; date: string}[]>([]);
  const [transactionType, setTransactionType] = useState<'infaq' | 'badal' | 'untold' | null>(null);
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
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inset-0 md:top-4 md:right-4 md:bottom-4 md:left-auto md:w-[400px] bg-white md:rounded-3xl shadow-xl z-[1000] overflow-hidden flex flex-col border-none md:border md:border-stone-200 pointer-events-auto"
        >
          <div className="relative h-64 shrink-0">
            <img 
              src={site.imageUrl} 
              alt={site.title} 
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent" />
            
            <div className="absolute top-4 right-4 flex space-x-2">
              <button 
                onClick={onToggleSave}
                className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all border border-white/30"
                title={isSaved ? "Hapus dari Rencana" : "Simpan ke Rencana"}
              >
                <Heart className={`w-5 h-5 transition-colors ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
              </button>
              <button 
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-all border border-white/30"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-brand-100 mb-2 bg-brand-900/40 px-2 py-1 rounded-md border border-brand-500/30 backdrop-blur-sm">
                {site.category}
              </div>
              <h2 className="text-2xl font-serif font-extrabold text-white leading-tight tracking-tight">
                {site.title}
              </h2>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex px-4 py-3 bg-white border-b border-stone-200 overflow-x-auto hide-scrollbar shrink-0">
            <button 
              onClick={() => setActiveTab('info')}
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors mr-2 ${activeTab === 'info' ? 'bg-brand-50 text-brand-700' : 'text-stone-500 hover:bg-stone-100'}`}
            >
              <Info className="w-4 h-4 mr-2" /> Informasi
            </button>
            {hasKaromah && (
              <button 
                onClick={() => setActiveTab('karomah')}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors mr-2 ${activeTab === 'karomah' ? 'bg-amber-50 text-amber-700' : 'text-stone-500 hover:bg-stone-100'}`}
              >
                <Sparkles className="w-4 h-4 mr-2" /> Karomah
              </button>
            )}
            {hasDoa && (
              <button 
                onClick={() => setActiveTab('doa')}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors mr-2 ${activeTab === 'doa' ? 'bg-emerald-50 text-emerald-700' : 'text-stone-500 hover:bg-stone-100'}`}
              >
                <BookOpen className="w-4 h-4 mr-2" /> Doa Khusus
              </button>
            )}
            <button 
              onClick={() => setActiveTab('kisah')}
              className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'kisah' ? 'bg-sky-50 text-sky-700' : 'text-stone-500 hover:bg-stone-100'}`}
            >
              <MessageSquare className="w-4 h-4 mr-2" /> Kisah Pengunjung
            </button>
            {hasUntold && (
              <button 
                onClick={() => setActiveTab('untold')}
                className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${activeTab === 'untold' ? 'bg-purple-50 text-purple-700' : 'text-stone-500 hover:bg-stone-100'}`}
              >
                <Lock className="w-4 h-4 mr-2" /> Untold Story
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-stone-50">
            {activeTab === 'info' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-brand-900 mb-2">{site.name}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {site.description}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm">
                  <div className="flex items-start text-sm mb-4">
                    <MapPin className="w-5 h-5 text-brand-600 mr-3 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-stone-900">{site.location.address}</div>
                      <div className="text-stone-500 mt-0.5">{site.location.city}, {site.location.province}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm mb-4">
                    <Clock className="w-5 h-5 text-brand-600 mr-3 shrink-0" />
                    <div className="font-semibold text-stone-900">
                      {site.openingHours}
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Navigation className="w-5 h-5 text-brand-600 mr-3 shrink-0" />
                    <div className="font-semibold text-stone-900 text-xs tracking-wider">
                      {site.location.lat}, {site.location.lng}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center mb-3">
                    <Info className="w-5 h-5 text-brand-600 mr-2" />
                    <h4 className="font-bold text-brand-900 tracking-tight">Sejarah Singkat</h4>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed bg-white p-5 rounded-2xl border border-stone-200 shadow-sm">
                    {site.history}
                  </p>
                </div>
                
                {site.facilities && site.facilities.length > 0 && (
                  <div>
                    <div className="flex items-center mb-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-600 mr-2" />
                      <h4 className="font-bold text-brand-900 tracking-tight">Fasilitas</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {site.facilities.map((fac, idx) => (
                        <span key={idx} className="bg-stone-100 text-stone-700 text-[11px] px-3 py-1.5 rounded-lg font-bold border border-stone-200">
                          {fac}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Monetization Actions */}
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setTransactionType('infaq')}
                    className="flex flex-col items-center justify-center p-3 bg-brand-50 hover:bg-brand-100 rounded-xl border border-brand-200 transition-colors group cursor-pointer"
                  >
                    <QrCode className="w-6 h-6 text-brand-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-brand-900">Infaq Digital</span>
                    <span className="text-[9px] text-brand-600 font-medium mt-0.5">Sedekah Instan</span>
                  </button>
                  <button 
                    onClick={() => setTransactionType('badal')}
                    className="flex flex-col items-center justify-center p-3 bg-gold-50 hover:bg-gold-100 rounded-xl border border-gold-200 transition-colors group cursor-pointer"
                  >
                    <ShoppingBag className="w-6 h-6 text-gold-600 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold text-gold-900">Pesan Badal</span>
                    <span className="text-[9px] text-gold-700 font-medium mt-0.5">Wakil Ziarah</span>
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'karomah' && hasKaromah && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center mb-4">
                  <Sparkles className="w-5 h-5 text-amber-500 mr-2" />
                  <h3 className="font-serif font-bold text-brand-900 text-lg">Kisah Karomah</h3>
                </div>
                <div className="space-y-3">
                  {site.karomah!.map((item, idx) => {
                    const kId = `${site.id}-karomah-${idx}`;
                    const isSavedKaromah = savedDoas.includes(kId);
                    return (
                      <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex items-start group relative pr-10 hover:border-brand-200 transition-colors">
                        <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-bold shrink-0 mr-3 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-stone-700 leading-relaxed pr-2">{item}</p>
                        {onToggleSaveDoa && (
                          <button 
                            onClick={() => onToggleSaveDoa(kId)}
                            title="Simpan ke Koleksi"
                            className={`absolute top-4 right-4 p-1.5 transition-all bg-white rounded-md border shadow-sm ${isSavedKaromah ? 'text-brand-600 border-brand-100 opacity-100' : 'text-stone-400 border-stone-100 md:opacity-0 group-hover:opacity-100 hover:text-brand-600 hover:border-brand-100'}`}
                          >
                            {isSavedKaromah ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-4 bg-stone-100 rounded-xl">
                  <p className="text-[11px] text-stone-500 italic text-center mb-3">
                    Kisah karomah di atas dirangkum dari tradisi lisan dan manuskrip sejarah lokal. Nilai utamanya adalah untuk menambah kecintaan dan meneladani ketakwaan beliau kepada Allah SWT.
                  </p>
                  <button 
                    onClick={onContribute}
                    className="w-full py-2.5 bg-amber-100 hover:bg-amber-200 text-amber-700 text-xs font-bold rounded-lg transition-colors border border-amber-200 flex items-center justify-center"
                  >
                    <Sparkles className="w-3 h-3 mr-2" /> Punya Kisah Lain? Kontribusi di Sini
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'doa' && hasDoa && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                <div className="flex items-center mb-2">
                  <BookOpen className="w-5 h-5 text-emerald-600 mr-2" />
                  <h3 className="font-serif font-bold text-brand-900 text-lg">Doa & Tawasul Khusus</h3>
                </div>
                <div className="space-y-5">
                  {site.doaKhusus!.map((doa, idx) => {
                    const dId = `${site.id}-doa-${idx}`;
                    const isSavedDoa = savedDoas.includes(dId);
                    return (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm relative group hover:border-brand-200 transition-colors">
                        <div className="flex items-start justify-between border-b border-stone-100 mb-3 pb-2">
                          <h4 className="font-serif font-bold text-brand-900 pr-8 text-lg">{doa.title}</h4>
                          {onToggleSaveDoa && (
                            <button 
                              onClick={() => onToggleSaveDoa(dId)}
                              title="Simpan ke Koleksi"
                              className={`absolute top-4 right-4 p-1.5 transition-all bg-white rounded-md border shadow-sm ${isSavedDoa ? 'text-brand-600 border-brand-100 opacity-100' : 'text-stone-400 border-stone-100 md:opacity-0 group-hover:opacity-100 hover:text-brand-600 hover:border-brand-100'}`}
                            >
                              {isSavedDoa ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                        <p className="text-lg font-arabic text-emerald-800 leading-loose text-right mb-4" dir="rtl">
                          {doa.text}
                        </p>
                        {doa.translation && (
                          <div className="bg-stone-50 p-3 rounded-lg border border-stone-100">
                            <p className="text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Artinya:</p>
                            <p className="text-sm text-stone-600 italic leading-relaxed">{doa.translation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-4 bg-stone-100 rounded-xl">
                  <button 
                    onClick={onContribute}
                    className="w-full py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 text-xs font-bold rounded-lg transition-colors border border-emerald-200 flex items-center justify-center"
                  >
                    <BookOpen className="w-3 h-3 mr-2" /> Ketahui Bacaan/Doa Lain? Kontribusi di Sini
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'kisah' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 text-sky-600 mr-2" />
                    <h3 className="font-serif font-bold text-brand-900 text-lg">Kisah Pengunjung</h3>
                  </div>
                  <span className="text-xs font-bold text-stone-500 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">{stories.length} Cerita</span>
                </div>

                {/* Input Form */}
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                     <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Tulis Pengalaman Anda</span>
                  </div>
                  <textarea
                    placeholder="Bagikan pengalaman spiritual atau cerita menarik Anda saat berziarah ke sini..."
                    className="w-full text-sm p-4 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none transition-shadow"
                    rows={3}
                    value={newStory}
                    onChange={(e) => setNewStory(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddStory}
                      disabled={!newStory.trim()}
                      className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-sm"
                    >
                      <Send className="w-4 h-4 mr-2 -ml-1" />
                      Kirim Kisah
                    </button>
                  </div>
                </div>

                {/* Stories List */}
                <div className="space-y-3 mt-6">
                  {stories.map(story => (
                    <div key={story.id} className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm relative group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-sky-400 to-sky-100 opacity-50 rounded-l-2xl"></div>
                      <div className="flex items-center justify-between mb-2 pl-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-sky-600 font-bold text-xs mr-3 shadow-sm">
                            {story.name.charAt(0)}
                          </div>
                          <div className="font-bold text-brand-900 text-sm">{story.name}</div>
                        </div>
                        <div className="text-[10px] text-stone-400 font-medium bg-stone-50 px-2 py-0.5 rounded-full">{story.date}</div>
                      </div>
                      <p className="text-sm text-stone-600 leading-relaxed pl-13 ml-11">
                        "{story.text}"
                      </p>
                    </div>
                  ))}
                  {stories.length === 0 && (
                    <div className="text-center py-8 text-stone-400 text-sm italic">
                      Belum ada cerita pengunjung. Jadilah yang pertama membagikan pengalaman Anda!
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'untold' && hasUntold && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif font-bold text-xl text-purple-900 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-purple-600" /> Kisah Rahasia
                  </h3>
                  {unlockedUntold.includes(site.id) && (
                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">Terbuka</span>
                  )}
                </div>
                
                {unlockedUntold.includes(site.id) ? (
                  <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                    <p className="text-stone-700 leading-relaxed relative z-10 text-sm italic border-l-4 border-purple-300 pl-4">
                      {site.untoldStory}
                    </p>
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm text-center relative overflow-hidden flex flex-col items-center">
                    <div className="absolute inset-0 bg-stone-50/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-6">
                      <Lock className="w-10 h-10 text-stone-400 mb-3" />
                      <h4 className="font-bold text-stone-900 mb-2">Konten Eksklusif</h4>
                      <p className="text-xs text-stone-500 mb-5 max-w-[250px]">Kisah ini dikumpulkan dari sumber tertutup dan tidak dipublikasikan secara umum. Buka akses untuk membacanya.</p>
                      <button 
                        onClick={() => setTransactionType('untold')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors flex items-center"
                      >
                        <Unlock className="w-4 h-4 mr-2" /> Buka Akses (Rp 15.000)
                      </button>
                    </div>
                    {/* Blurred preview text */}
                    <p className="text-stone-300 leading-relaxed text-sm italic blur-sm select-none">
                      Dalam sebuah manuskrip kuno yang tersimpan rapat, disebutkan bahwa tokoh ini memiliki kemampuan luar biasa yang jarang diketahui publik. Kisah ini dijaga lisan secara turun temurun oleh para penjaga rahasia...
                    </p>
                  </div>
                )}
              </motion.div>
            )}

          </div>
          
          <div className="p-4 border-t border-stone-200 bg-white shrink-0">
             <a 
               href={`https://www.google.com/maps/dir/?api=1&destination=${site.location.lat},${site.location.lng}`}
               target="_blank"
               rel="noopener noreferrer"
               className="w-full flex items-center justify-center py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-colors shadow-sm"
             >
               <Navigation className="w-4 h-4 mr-2" />
               Rute Perjalanan
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
