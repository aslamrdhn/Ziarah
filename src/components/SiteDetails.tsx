import React, { useState, useEffect } from 'react';
import { ZiarahSite } from '../data/sites';
import { X, MapPin, Navigation, Info, Clock, Heart, BookOpen, Bookmark, BookmarkCheck, QrCode, MessageSquare, Send, ScrollText, Trash2, Loader2, Calendar, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TransactionModal } from './TransactionModal';
import { auth, db, handleFirestoreError, OperationType, isUserAdmin, checkAndRecordSubmissionCooldown } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useVerifiedDonationUnlock } from '../lib/transferProof';
import { optimizeSiteImageUrl, handleOptimizedImageError } from '../lib/imageOptimizer';
import { getSiteLogistics } from '../lib/siteLogistics';
import { sanitizePlainText, sanitizeMultilineText } from '../lib/sanitize';
import { getSiteSlug } from '../lib/siteSlugs';

export function getEmotionalCliffhanger(text: string): { preview: string; remainder: string } {
  const raw = (text || '').trim();
  if (!raw) {
    return {
      preview: '',
      remainder: 'Lanjutan riwayat karomah, riyadhoh malam, dan wasiat batin beliau tersimpan dalam lembaran Khazanah Khusus.',
    };
  }

  const moreMarker = '<!--more-->';
  const markerIdx = raw.indexOf(moreMarker);
  if (markerIdx !== -1) {
    const previewPart = raw.slice(0, markerIdx).trim().replace(/[,.!?;:]+$/, '');
    const remainderPart = raw.slice(markerIdx + moreMarker.length).trim();
    return {
      preview: `${previewPart}... `,
      remainder:
        remainderPart ||
        'Saat itulah terjadi peristiwa batin yang membuat para murid dan saksi mata tertegun dalam keheningan malam penuh keberkahan.',
    };
  }

  let targetLen: number;
  if (raw.length > 180) {
    const ratioLen = Math.round(raw.length * 0.6);
    targetLen = Math.max(140, Math.min(280, ratioLen));
  } else {
    targetLen = Math.max(75, Math.round(raw.length * 0.6));
  }

  const searchWindowStart = Math.max(50, targetLen - 35);
  const searchWindowEnd = Math.min(raw.length - 15, targetLen + 35);
  const windowSlice = raw.slice(searchWindowStart, searchWindowEnd);

  let cutIndex = Math.min(targetLen, raw.length);
  const punctuationMatch = windowSlice.match(/[,;:]\s/);
  if (punctuationMatch && punctuationMatch.index !== undefined) {
    cutIndex = searchWindowStart + punctuationMatch.index + 1;
  } else {
    const spaceAfter = raw.indexOf(' ', targetLen);
    const spaceBefore = raw.lastIndexOf(' ', targetLen);
    if (spaceAfter !== -1 && spaceAfter - targetLen <= 22) {
      cutIndex = spaceAfter;
    } else if (spaceBefore > 45) {
      cutIndex = spaceBefore;
    }
  }

  const previewClean = raw.slice(0, cutIndex).trim().replace(/[,.!?;:]+$/, '');
  const restClean = raw.slice(cutIndex).trim();
  const fallbackContinuation =
    'Namun apa yang disaksikan oleh para santri dan juru kunci setelah peristiwa malam itu justru menyimpan rahasia keteladanan batin yang jarang diketahui khalayak ramai.';

  return {
    preview: `${previewClean}... `,
    remainder: restClean.length > 45 ? restClean : `${restClean} ${fallbackContinuation}`.trim(),
  };
}

function buildWhatsAppCliffhangerUrl(site: ZiarahSite, rawStoryText: string): string {
  const { preview } = getEmotionalCliffhanger(rawStoryText);
  const cuplikanCliffhanger = preview.replace(/\.\.\.\s*$/, '').trim();
  const locationLabel =
    typeof site.location === 'string'
      ? site.location
      : [site.location?.city, site.location?.province].filter(Boolean).join(', ');
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ziarahnusantara.my.id';
  const shareText = `Merinding membaca cuplikan kisah & karomah *${site.name}* (${locationLabel}):\n\n"${cuplikanCliffhanger}..."\n\nBaca kelanjutan kisah rahasia & panduan ziarahnya di sini:\n${origin}/situs/${getSiteSlug(site)}`;
  return `https://wa.me/?text=${encodeURIComponent(shareText)}`;
}

interface SiteDetailsProps {
  site: ZiarahSite | null;
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
  savedDoas?: string[];
  onToggleSaveDoa?: (id: string) => void;
  onContribute?: () => void;
}

interface StoryItem {
  id: string;
  name: string;
  text: string;
  date: string;
  authorUid?: string;
  createdAtMs?: number;
  isDefault?: boolean;
}

const DEFAULT_STORIES: StoryItem[] = [
  { id: 'default-1', name: 'Hamba Allah', text: `Tempatnya sangat sejuk dan nyaman untuk beri'tikaf dan berdzikir. Fasilitas juga sangat memadai. Masya Allah.`, date: 'Riwayat Peziarah', isDefault: true },
  { id: 'default-2', name: 'Ahmad S.', text: `Alhamdulillah dimudahkan sampai ke makam beliau. Terasa ketenangan batin yang luar biasa saat bertawasul di sini.`, date: 'Riwayat Peziarah', isDefault: true }
];

export const SiteDetails: React.FC<SiteDetailsProps> = React.memo(({ site, onClose, isSaved, onToggleSave, savedDoas = [], onToggleSaveDoa, onContribute }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'karomah' | 'kisah' | 'untold' | 'doa'>('info');
  const [authorName, setAuthorName] = useState('');
  const [newStory, setNewStory] = useState('');
  const [isSendingStory, setIsSendingStory] = useState(false);
  const [cloudStories, setCloudStories] = useState<StoryItem[]>([]);
  const [transactionType, setTransactionType] = useState<'infaq' | 'untold' | null>(null);
  const { isUnlocked: isDonationVerified } = useVerifiedDonationUnlock(site?.id);

  // Pre-fill author name if logged in
  useEffect(() => {
    if (auth.currentUser?.displayName && !authorName) {
      setAuthorName(auth.currentUser.displayName);
    }
  }, [site?.id]);

  // Reset tab & subscribe to real-time stories from Firestore when site changes
  useEffect(() => {
    setActiveTab('info');
    setNewStory('');
    if (!site?.id) {
      setCloudStories([]);
      return;
    }

    const q = query(collection(db, 'stories'), where('siteId', '==', site.id));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: StoryItem[] = snapshot.docs.map(docSnap => {
          const d = docSnap.data();
          const ts = d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now();
          const formattedDate = d.createdAt?.toDate
            ? d.createdAt.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
            : 'Baru saja';
          return {
            id: docSnap.id,
            name: d.authorName || 'Hamba Allah',
            text: d.text || '',
            date: formattedDate,
            authorUid: d.authorUid,
            createdAtMs: ts,
          };
        });
        fetched.sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
        setCloudStories(fetched);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'stories');
      }
    );

    return () => unsubscribe();
  }, [site?.id]);

  const allStories = [...cloudStories, ...DEFAULT_STORIES];

  const handleAddStory = async () => {
    const cleanText = sanitizeMultilineText(newStory, 1000);
    if (!site || cleanText.length < 3 || isSendingStory) return;
    const cooldown = checkAndRecordSubmissionCooldown('story', 15);
    if (!cooldown.allowed) return;
    setIsSendingStory(true);
    const storyRef = doc(collection(db, 'stories'));
    const cleanName = sanitizePlainText(authorName, 100) || sanitizePlainText(auth.currentUser?.displayName, 100) || 'Hamba Allah';

    try {
      await setDoc(storyRef, {
        siteId: sanitizePlainText(site.id, 128),
        authorName: cleanName,
        authorUid: auth.currentUser?.uid || 'guest',
        text: cleanText,
        createdAt: serverTimestamp(),
      });
      setNewStory('');
    } catch (error) {
      console.error('Error saving visitor story:', error);
      try {
        handleFirestoreError(error, OperationType.CREATE, `stories/${storyRef.id}`);
      } catch {
        // Logged structured error
      }
    } finally {
      setIsSendingStory(false);
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    try {
      await deleteDoc(doc(db, 'stories', storyId));
    } catch (error) {
      console.error('Error deleting story:', error);
      try {
        handleFirestoreError(error, OperationType.DELETE, `stories/${storyId}`);
      } catch {
        // Logged structured error
      }
    }
  };

  if (!site) return null;

  const hasKaromah = site.karomah && site.karomah.length > 0;
  const hasDoa = site.doaKhusus && site.doaKhusus.length > 0;
  const hasUntold = !!site.untoldStory;
  const currentUser = auth.currentUser;
  const isCurrentUserAdmin = isUserAdmin(currentUser);
  const isSiteUnlocked = isCurrentUserAdmin || isDonationVerified;

  return (
    <>
    <AnimatePresence>
      {site && (
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="w-full h-full bg-white rounded-2xl md:rounded-3xl shadow-2xl z-[1000] overflow-hidden flex flex-col border border-stone-200/90 pointer-events-auto"
        >
          <div className="relative h-60 sm:h-64 shrink-0 bg-stone-900">
            <img 
              src={optimizeSiteImageUrl(site.imageUrl, 720, 78)} 
              onError={(e) => handleOptimizedImageError(e, site.imageUrl)}
              alt={site.title} 
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent pointer-events-none" />
            
            <div className="absolute top-3 right-3 z-20 flex space-x-2 pointer-events-auto">
              <motion.button 
                type="button"
                whileTap={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 450, damping: 15 }}
                onClick={onToggleSave}
                className="p-2.5 bg-stone-900/50 hover:bg-stone-900/75 backdrop-blur-md rounded-xl text-white transition-colors border border-white/20 shadow-sm cursor-pointer"
                title={isSaved ? "Hapus dari Rencana" : "Simpan ke Rencana"}
              >
                <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} strokeWidth={1.75} />
              </motion.button>
              <motion.button 
                type="button"
                whileTap={{ scale: 0.85 }}
                onClick={onClose}
                className="p-2.5 bg-stone-900/50 hover:bg-stone-900/75 backdrop-blur-md rounded-xl text-white transition-colors border border-white/20 shadow-sm cursor-pointer"
                title="Tutup panel"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </motion.button>
            </div>
            
            <div className="absolute bottom-3.5 left-5 right-5 z-10 text-white pointer-events-none">
              <div className="inline-block text-[10px] font-medium uppercase tracking-widest text-stone-200 mb-1.5 bg-stone-950/60 px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                {site.category}
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-white leading-tight tracking-tight">
                {site.title}
              </h2>
              {site.imageSource && (
                <p className="text-[10px] text-stone-300/90 mt-1 line-clamp-1 font-serif italic">
                  Sumber Foto: {site.imageSource}
                </p>
              )}
            </div>
          </div>

          {/* Minimalist Underline Navigation Tabs */}
          <div className="relative z-20 flex px-5 bg-white border-b border-stone-200/80 overflow-x-auto scrollbar-hide shrink-0 gap-5 pointer-events-auto">
            <button 
              type="button"
              onClick={() => setActiveTab('info')}
              className={`shrink-0 flex items-center py-3 -mb-px text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer pointer-events-auto ${activeTab === 'info' ? 'border-emerald-800 text-emerald-950 font-semibold' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
            >
              <Info className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Info &amp; Sejarah
            </button>
            {hasKaromah && (
              <button 
                type="button"
                onClick={() => setActiveTab('karomah')}
                className={`shrink-0 flex items-center py-3 -mb-px text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer pointer-events-auto ${activeTab === 'karomah' ? 'border-emerald-800 text-emerald-950 font-semibold' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
              >
                <ScrollText className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Karomah
              </button>
            )}
            {hasUntold && (
              <button 
                type="button"
                onClick={() => setActiveTab('untold')}
                className={`shrink-0 flex items-center py-3 -mb-px text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer pointer-events-auto ${activeTab === 'untold' ? 'border-emerald-800 text-emerald-950 font-semibold' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Wasiat &amp; Rubrik
              </button>
            )}
            {hasDoa && (
              <button 
                type="button"
                onClick={() => setActiveTab('doa')}
                className={`shrink-0 flex items-center py-3 -mb-px text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer pointer-events-auto ${activeTab === 'doa' ? 'border-emerald-800 text-emerald-950 font-semibold' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Doa Khusus
              </button>
            )}
            <button 
              type="button"
              onClick={() => setActiveTab('kisah')}
              className={`shrink-0 flex items-center py-3 -mb-px text-xs font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer pointer-events-auto ${activeTab === 'kisah' ? 'border-emerald-800 text-emerald-950 font-semibold' : 'border-transparent text-stone-500 hover:text-stone-900'}`}
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" strokeWidth={1.75} /> Catatan Peziarah ({allStories.length})
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-white space-y-6">
            {activeTab === 'info' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-0">
                <div className="border-b border-stone-200/70 pb-6 mb-6">
                  {site.era && (
                    <div className="text-[11px] font-medium uppercase tracking-widest text-emerald-800 mb-1">
                      {site.era}
                    </div>
                  )}
                  <h3 className="font-serif text-lg text-stone-900 mb-2">{site.name}</h3>
                  <p className="text-[15px] sm:text-base text-stone-800 leading-[1.85]">
                    {site.description}
                  </p>
                </div>

                <div className="border-b border-stone-200/70 pb-6 mb-6 space-y-3 text-sm text-stone-700">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-1" strokeWidth={1.75} />
                    <div>
                      <div className="font-medium text-stone-900">{site.location.address}</div>
                      <div className="text-stone-500 text-xs mt-0.5">{site.location.city}, {site.location.province}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-emerald-800 shrink-0" strokeWidth={1.75} />
                    <div className="text-stone-800">{site.openingHours}</div>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-stone-500">
                    <Navigation className="w-4 h-4 text-emerald-800 shrink-0" strokeWidth={1.75} />
                    <div className="tabular-nums">
                      {site.location.lat}, {site.location.lng}
                    </div>
                  </div>
                </div>

                {/* Logistik Rombongan: Jadwal Haul Tahunan & Ketentuan Adab Lokal Juru Kunci */}
                {(() => {
                  const logistics = getSiteLogistics(site);
                  return (
                    <div className="border-b border-stone-200/70 pb-6 mb-6 space-y-4">
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 text-emerald-800 shrink-0 mt-1" strokeWidth={1.75} />
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-stone-900">Jadwal Haul Tahunan</div>
                          <p className="text-sm text-stone-700 mt-1 leading-relaxed">{logistics.haulSchedule}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-1" strokeWidth={1.75} />
                        <div>
                          <div className="text-xs font-semibold uppercase tracking-wider text-stone-900">Ketentuan Adab Lokal &amp; Juru Kunci</div>
                          <p className="text-sm text-stone-700 mt-1 leading-relaxed">{logistics.localAdab}</p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div className="border-b border-stone-200/70 pb-6 mb-6">
                  <h4 className="font-serif text-lg text-stone-900 mb-2">Riwayat &amp; Sejarah Lengkap</h4>
                  <p className="text-[15px] sm:text-base text-stone-800 leading-[1.85]">
                    {site.history}
                  </p>
                </div>

                {site.sanad && (
                  <div className="border-b border-stone-200/70 pb-6 mb-6">
                    <h4 className="font-serif text-lg text-stone-900 mb-2">Genealogi, Jaringan Guru &amp; Sanad Keilmuan</h4>
                    <p className="text-[15px] sm:text-base text-stone-800 leading-[1.85]">
                      {site.sanad}
                    </p>
                  </div>
                )}

                {site.karya && site.karya.length > 0 && (
                  <div className="border-b border-stone-200/70 pb-6 mb-6">
                    <h4 className="font-serif text-lg text-stone-900 mb-2">Karya Kitab, Warisan &amp; Jejak Peradaban</h4>
                    <ul className="space-y-2">
                      {site.karya.map((item, idx) => (
                        <li key={idx} className="text-sm text-stone-800 flex items-start leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-800 mt-2 mr-2.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {site.facilities && site.facilities.length > 0 && (
                  <div className="border-b border-stone-200/70 pb-6 mb-6">
                    <h4 className="font-serif text-lg text-stone-900 mb-2">Fasilitas Kompleks</h4>
                    <p className="text-sm text-stone-700 leading-relaxed">
                      {site.facilities.join(' · ')}
                    </p>
                  </div>
                )}

                {site.references && site.references.length > 0 && (
                  <div className="border-b border-stone-200/70 pb-6 mb-6">
                    <h4 className="font-serif text-lg text-stone-900 mb-2">Sumber Literatur &amp; Ensiklopedia</h4>
                    <ol className="space-y-1.5 list-decimal list-inside">
                      {site.references.map((ref, idx) => (
                        <li key={idx} className="text-xs text-stone-600 leading-relaxed font-serif">
                          {ref}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {site.imageSource && (
                  <div className="border-b border-stone-200/70 pb-6 mb-6 space-y-1">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      Referensi &amp; Atribusi Dokumentasi Foto
                    </div>
                    <p className="text-xs text-stone-600 font-serif italic leading-relaxed">
                      {site.imageSource}
                    </p>
                    <a
                      href={site.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs font-medium text-emerald-800 hover:underline underline-offset-4 pt-0.5"
                    >
                      Lihat Berkas Foto Asli (Wikimedia / Wikipedia) ↗
                    </a>
                  </div>
                )}

                {/* Infaq Digital Shortcut */}
                <div>
                  <button 
                    onClick={() => setTransactionType('infaq')}
                    className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] hover:bg-stone-100 rounded-2xl border border-stone-200/90 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center">
                      <div className="p-2 bg-emerald-900 text-white rounded-xl mr-3">
                        <QrCode className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-serif text-stone-900 block">Infaq Jariyah &amp; Pelestarian Arsip</span>
                        <span className="text-xs text-stone-600">Salurkan sedekah jariyah &amp; titipkan doa munajat</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-emerald-800 underline underline-offset-4">Infaq →</span>
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'karomah' && hasKaromah && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-0">
                <div className="border-b border-stone-200/70 pb-4 mb-6">
                  <div className="text-[11px] font-medium uppercase tracking-widest text-amber-800">
                    Riwayat Keteladanan &amp; Karomah
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 mt-0.5">Kisah Karomah {site.title}</h3>
                </div>

                <div>
                  {site.karomah!.map((item, idx) => {
                    const kId = `${site.id}-karomah-${idx}`;
                    const isSavedKaromah = savedDoas.includes(kId);
                    const isItemUnlocked = isSiteUnlocked || idx === 0;
                    const cliffhanger = getEmotionalCliffhanger(item);
                    const waShareUrl = buildWhatsAppCliffhangerUrl(site, item);

                    return (
                      <div key={idx} className="border-b border-stone-200/70 pb-6 mb-6 relative">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-serif text-lg text-stone-900">
                            Riwayat Ke-{idx + 1}
                          </h4>
                          {onToggleSaveDoa && isItemUnlocked && (
                            <button 
                              onClick={() => onToggleSaveDoa(kId)}
                              title="Simpan ke Koleksi"
                              className={`p-1.5 transition-colors rounded-lg cursor-pointer ${isSavedKaromah ? 'text-emerald-800 bg-emerald-50' : 'text-stone-400 hover:text-stone-800'}`}
                            >
                              {isSavedKaromah ? <BookmarkCheck className="w-4 h-4" strokeWidth={1.75} /> : <Bookmark className="w-4 h-4" strokeWidth={1.75} />}
                            </button>
                          )}
                        </div>

                        {isItemUnlocked ? (
                          <div className="space-y-3">
                            <p className="text-[15px] sm:text-base text-stone-800 leading-[1.85]">
                              {item.replace(/<!--more-->/g, '')}
                            </p>
                            <div>
                              <a
                                href={waShareUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4"
                              >
                                Bagikan cuplikan via WhatsApp
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-[15px] sm:text-base text-stone-800 leading-[1.85]">
                              <p>{cliffhanger.preview}</p>
                              <p className="mt-2 opacity-40 blur-[2px] select-none pointer-events-none line-clamp-2 text-stone-600">
                                {cliffhanger.remainder}
                              </p>
                            </div>

                            {/* 1 Kartu Editorial Bersih (Anti-AI Paywall) */}
                            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90">
                              <div className="text-[11px] font-medium tracking-widest uppercase text-amber-800">
                                Arsip Khazanah Terkunci
                              </div>
                              <h4 className="font-serif text-xl text-stone-900 mt-1">
                                Lanjutkan Membaca Wasiat &amp; Riwayat Batin Beliau
                              </h4>
                              <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                                Buka seluruh arsip kisah rahasia di 96+ makam Nusantara sekaligus berinfaq jariyah sekali saja dari perangkat Anda.
                              </p>
                              <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                <button
                                  type="button"
                                  onClick={() => setTransactionType('untold')}
                                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-medium transition-colors cursor-pointer"
                                >
                                  Buka Seluruh Arsip Kisah
                                </button>
                                <a
                                  href={waShareUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4 text-center sm:text-left"
                                >
                                  Bagikan cuplikan via WhatsApp
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-500">
                  <p className="italic">
                    Dirangkum dari tradisi lisan dan manuskrip sejarah lokal untuk meneladani ketakwaan beliau.
                  </p>
                  {onContribute && (
                    <button 
                      onClick={onContribute}
                      className="text-xs font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-4 shrink-0 cursor-pointer text-left sm:text-right"
                    >
                      Kontribusi riwayat lain →
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'doa' && hasDoa && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="border-b border-stone-200/70 pb-4">
                  <div className="text-[11px] font-medium uppercase tracking-widest text-emerald-800">
                    Amalan &amp; Wasilah
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 mt-0.5">Doa &amp; Tawasul Khusus</h3>
                </div>
                <div className="space-y-6">
                  {site.doaKhusus!.map((doa, idx) => {
                    const dId = `${site.id}-doa-${idx}`;
                    const isSavedDoa = savedDoas.includes(dId);
                    return (
                      <div key={idx} className="border-b border-stone-200/70 pb-6 relative">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="font-serif text-lg text-stone-900 pr-8">{doa.title}</h4>
                          {onToggleSaveDoa && (
                            <button 
                              onClick={() => onToggleSaveDoa(dId)}
                              title="Simpan ke Koleksi"
                              className={`p-1.5 transition-colors rounded-lg cursor-pointer ${isSavedDoa ? 'text-emerald-800 bg-emerald-50' : 'text-stone-400 hover:text-stone-800'}`}
                            >
                              {isSavedDoa ? <BookmarkCheck className="w-4 h-4" strokeWidth={1.75} /> : <Bookmark className="w-4 h-4" strokeWidth={1.75} />}
                            </button>
                          )}
                        </div>
                        <p className="text-2xl font-arabic text-stone-900 leading-[2.4] text-right mb-4" dir="rtl">
                          {doa.text}
                        </p>
                        {doa.translation && (
                          <p className="text-sm text-stone-600 font-serif italic leading-relaxed">
                            &ldquo;{doa.translation}&rdquo;
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
                {onContribute && (
                  <div className="pt-1">
                    <button 
                      onClick={onContribute}
                      className="text-xs font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
                    >
                      Ketahui bacaan atau doa lain? Kontribusi di sini →
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'kisah' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="border-b border-stone-200/70 pb-4 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-widest text-emerald-800">
                      Jejak Jamaah
                    </div>
                    <h3 className="font-serif text-xl text-stone-900 mt-0.5">Catatan Pengunjung</h3>
                  </div>
                  <span className="text-xs text-stone-500">{allStories.length} Catatan</span>
                </div>

                {/* Input Form */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-stone-800">Tulis Pengalaman Ziarah Anda</span>
                    <span className="text-[11px] text-stone-500">Tersimpan Permanen</span>
                  </div>
                  <input
                    type="text"
                    maxLength={100}
                    placeholder="Nama Anda (Kosongkan untuk Hamba Allah)"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full text-xs sm:text-sm px-3.5 py-2 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-700 placeholder:text-stone-400"
                  />
                  <textarea
                    placeholder="Bagikan pengalaman batin, kondisi rute, atau adab di makam ini..."
                    className="w-full text-xs sm:text-sm p-3.5 bg-white border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-700 resize-none transition-all placeholder:text-stone-400"
                    rows={3}
                    maxLength={1000}
                    value={newStory}
                    onChange={(e) => setNewStory(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddStory}
                      disabled={!newStory.trim() || newStory.trim().length < 3 || isSendingStory}
                      className="bg-emerald-900 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center cursor-pointer"
                    >
                      {isSendingStory ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5 mr-2" strokeWidth={1.75} />
                          Kirim Catatan
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Stories List */}
                <div className="divide-y divide-stone-200/70">
                  {allStories.map(story => {
                    const canDelete = !story.isDefault && (isCurrentUserAdmin || (currentUser && story.authorUid === currentUser.uid));
                    const storyWaUrl = buildWhatsAppCliffhangerUrl(site, story.text);
                    return (
                      <div key={story.id} className="py-4 first:pt-0">
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="font-medium text-stone-900 text-sm">{story.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-stone-400">{story.date}</span>
                            {canDelete && (
                              <button
                                onClick={() => handleDeleteStory(story.id)}
                                title="Hapus cerita"
                                className="p-1 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-stone-700 leading-relaxed">
                          &ldquo;{story.text}&rdquo;
                        </p>
                        <div className="mt-2">
                          <a
                            href={storyWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4"
                          >
                            Bagikan via WhatsApp
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'untold' && hasUntold && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="border-b border-stone-200/70 pb-4">
                  <div className="text-[11px] font-medium uppercase tracking-widest text-amber-800">
                    Arsip Sejarah &amp; Manuskrip
                  </div>
                  <h3 className="font-serif text-xl text-stone-900 mt-0.5">
                    Wasiat &amp; Riwayat Batin {site.title}
                  </h3>
                </div>
                
                {(() => {
                  const untoldCliffhanger = getEmotionalCliffhanger(site.untoldStory || '');
                  const untoldWaUrl = buildWhatsAppCliffhangerUrl(site, site.untoldStory || site.history);

                  return isSiteUnlocked ? (
                    <div className="space-y-4">
                      <p className="text-[15px] sm:text-base text-stone-800 leading-[1.85]">
                        {(site.untoldStory || '').replace(/<!--more-->/g, '')}
                      </p>
                      <div className="pt-4 border-t border-stone-200/70">
                        <a
                          href={untoldWaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4"
                        >
                          Bagikan cuplikan via WhatsApp
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      <div className="text-[15px] sm:text-base text-stone-800 leading-[1.85]">
                        <p>{untoldCliffhanger.preview}</p>
                        <p className="mt-2 opacity-40 blur-[2px] select-none pointer-events-none line-clamp-2 text-stone-600">
                          {untoldCliffhanger.remainder}
                        </p>
                      </div>

                      {/* 1 Kartu Editorial Bersih (Anti-AI Paywall) */}
                      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200/90">
                        <div className="text-[11px] font-medium tracking-widest uppercase text-amber-800">
                          Arsip Khazanah Terkunci
                        </div>
                        <h4 className="font-serif text-xl text-stone-900 mt-1">
                          Lanjutkan Membaca Wasiat &amp; Riwayat Batin Beliau
                        </h4>
                        <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
                          Buka seluruh arsip kisah rahasia di 96+ makam Nusantara sekaligus berinfaq jariyah sekali saja dari perangkat Anda.
                        </p>
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                          <button 
                            type="button"
                            onClick={() => setTransactionType('untold')}
                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-medium transition-colors cursor-pointer"
                          >
                            Buka Seluruh Arsip Kisah
                          </button>
                          <a
                            href={untoldWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4 text-center sm:text-left"
                          >
                            Bagikan cuplikan via WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })()}
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
        // Keep modal on success view so user can see reference code & optionally forward to WhatsApp
      }}
    />
  </>
  );
});
