import React, { useState, useEffect } from 'react';
import { ZiarahSite } from '../data/sites';
import { X, MapPin, Navigation, Clock, Heart, BookOpen, Bookmark, BookmarkCheck, QrCode, Send, ScrollText, Trash2, Loader2, Calendar, ShieldCheck, Type, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TransactionModal } from './TransactionModal';
import { auth, db, handleFirestoreError, OperationType, isUserAdmin, checkAndRecordSubmissionCooldown } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useVerifiedDonationUnlock } from '../lib/transferProof';
import { optimizeSiteImageUrl, handleOptimizedImageError } from '../lib/imageOptimizer';
import { getSiteLogistics } from '../lib/siteLogistics';
import { sanitizePlainText, sanitizeMultilineText } from '../lib/sanitize';
import { getSiteSlug } from '../lib/siteSlugs';
import { useSiteCopy } from '../lib/siteCopy';

function splitIntoReadableParagraphs(rawText: string): string[] {
  const cleaned = (rawText || '').replace(/<!--more-->/g, '\n\n').trim();
  if (!cleaned) return [];
  const existingBlocks = cleaned
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (existingBlocks.length > 1) return existingBlocks;

  // Split long single-paragraph text into 2-sentence paragraphs for comfortable reading
  const sentences = cleaned.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g);
  if (!sentences || sentences.length <= 2) return [cleaned];

  const paragraphs: string[] = [];
  let buffer = '';
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i].trim();
    if (!s) continue;
    buffer = buffer ? `${buffer} ${s}` : s;
    if ((i + 1) % 2 === 0 || buffer.length >= 240) {
      paragraphs.push(buffer);
      buffer = '';
    }
  }
  if (buffer) {
    if (paragraphs.length > 0 && buffer.length < 85) {
      paragraphs[paragraphs.length - 1] = `${paragraphs[paragraphs.length - 1]} ${buffer}`;
    } else {
      paragraphs.push(buffer);
    }
  }
  return paragraphs;
}

function extractPullQuote(description: string, localAdab: string): string {
  const cleanDesc = (description || '').replace(/<!--more-->/g, ' ').trim();
  const sentences = cleanDesc.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 0) {
    const candidate = sentences.find((s) => s.trim().length >= 45 && s.trim().length <= 185) || sentences[0];
    return candidate.trim();
  }
  return (localAdab || cleanDesc).trim();
}

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
  onViewOnMap?: (site: ZiarahSite) => void;
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

export const SiteDetails: React.FC<SiteDetailsProps> = React.memo(({
  site,
  onClose,
  isSaved,
  onToggleSave,
  savedDoas = [],
  onToggleSaveDoa,
  onContribute,
  onViewOnMap,
}) => {
  const [activeTab, setActiveTab] = useState<'kisah_utama' | 'panduan_doa'>('kisah_utama');
  const [largeReadingText, setLargeReadingText] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [newStory, setNewStory] = useState('');
  const [isSendingStory, setIsSendingStory] = useState(false);
  const [cloudStories, setCloudStories] = useState<StoryItem[]>([]);
  const [transactionType, setTransactionType] = useState<'infaq' | 'untold' | null>(null);
  const { isUnlocked: isDonationVerified } = useVerifiedDonationUnlock(site?.id);
  const siteCopy = useSiteCopy();

  // Pre-fill author name if logged in
  useEffect(() => {
    if (auth.currentUser?.displayName && !authorName) {
      setAuthorName(auth.currentUser.displayName);
    }
  }, [site?.id]);

  // Reset tab & subscribe to real-time stories from Firestore when site changes
  useEffect(() => {
    setActiveTab('kisah_utama');
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
  const logistics = getSiteLogistics(site);
  const pullQuoteText = extractPullQuote(site.description, logistics.localAdab);

  const historyParagraphs = splitIntoReadableParagraphs(site.history || site.description);
  const bodyParagraphClass = largeReadingText
    ? 'text-[17.5px] sm:text-[19px] text-stone-800 leading-[2.0] mb-5'
    : 'text-[16px] sm:text-[17px] text-stone-800 leading-[1.9] mb-5';

  const leadParagraphClass = largeReadingText
    ? 'font-serif text-xl sm:text-2xl text-stone-900 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-emerald-900 first-letter:float-left first-letter:mr-3 first-letter:leading-none'
    : 'font-serif text-lg sm:text-xl text-stone-900 leading-relaxed mb-5 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-emerald-900 first-letter:float-left first-letter:mr-3 first-letter:leading-none';

  return (
    <>
      <AnimatePresence>
        {site && (
          <div className="fixed inset-0 z-[2050] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-stone-950/60 backdrop-blur-xs pointer-events-auto">
            <div
              className="absolute inset-0 cursor-pointer"
              onClick={onClose}
              aria-label="Tutup lembar bacaan"
            />
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="relative z-10 w-full h-full sm:h-auto sm:max-w-3xl sm:max-h-[90vh] sm:rounded-3xl bg-[#FAF8F5] shadow-2xl overflow-hidden flex flex-col border border-stone-200/80 pointer-events-auto"
            >
              {/* Compact Editorial Cover Header */}
              <div className="relative shrink-0 h-36 sm:h-44 bg-stone-900">
                <img
                  src={optimizeSiteImageUrl(site.imageUrl, 720, 78)}
                  onError={(e) => handleOptimizedImageError(e, site.imageUrl)}
                  alt={site.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent pointer-events-none" />

                <div className="absolute top-3.5 right-3.5 z-20 flex items-center space-x-1.5 pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => setLargeReadingText((prev) => !prev)}
                    className={`px-2.5 py-2 backdrop-blur-md rounded-xl text-xs font-medium transition-colors border shadow-sm cursor-pointer flex items-center gap-1 ${
                      largeReadingText
                        ? 'bg-emerald-900/90 text-white border-emerald-500/40'
                        : 'bg-stone-900/60 hover:bg-stone-900/85 text-white border-white/20'
                    }`}
                    title="Ubah Ukuran Teks Bacaan"
                  >
                    <Type className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span className="text-[11px]">{largeReadingText ? 'A+' : 'A'}</span>
                  </button>
                  {onToggleSave && (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 1.25 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 15 }}
                      onClick={onToggleSave}
                      className="p-2 bg-stone-900/60 hover:bg-stone-900/85 backdrop-blur-md rounded-xl text-white transition-colors border border-white/20 shadow-sm cursor-pointer"
                      title={isSaved ? 'Hapus dari Rencana' : 'Simpan ke Rencana'}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} strokeWidth={1.75} />
                    </motion.button>
                  )}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="p-2 bg-stone-900/60 hover:bg-stone-900/85 backdrop-blur-md rounded-xl text-white transition-colors border border-white/20 shadow-sm cursor-pointer"
                    title="Tutup lembar bacaan"
                  >
                    <X className="w-4 h-4" strokeWidth={1.75} />
                  </motion.button>
                </div>

                <div className="absolute bottom-3.5 left-6 right-6 z-10 text-white pointer-events-none">
                  <div className="text-[11px] font-medium uppercase tracking-widest text-amber-300/95 mb-1">
                    {site.category} · {site.location.city}, {site.location.province}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif font-normal text-white leading-tight tracking-tight line-clamp-1">
                    {site.title}
                  </h2>
                </div>
              </div>

              {/* 2 Continuous Reader Tabs */}
              <div className="relative z-20 flex px-6 sm:px-10 bg-white border-b border-stone-200/80 overflow-x-auto scrollbar-hide shrink-0 gap-6 sm:gap-8 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('kisah_utama')}
                  className={`shrink-0 flex items-center py-3.5 -mb-px text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'kisah_utama'
                      ? 'border-emerald-900 text-emerald-950 font-semibold'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <ScrollText className="w-3.5 h-3.5 mr-2" strokeWidth={1.75} />
                  {siteCopy.readerTabMainStory}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('panduan_doa')}
                  className={`shrink-0 flex items-center py-3.5 -mb-px text-xs sm:text-sm font-medium whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                    activeTab === 'panduan_doa'
                      ? 'border-emerald-900 text-emerald-950 font-semibold'
                      : 'border-transparent text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 mr-2" strokeWidth={1.75} />
                  {siteCopy.readerTabPrayerGuide} ({allStories.length})
                </button>
              </div>

              {/* Main Reader Scroll Area */}
              <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth px-6 sm:px-10 md:px-12 py-7 sm:py-9 bg-[#FAF8F5]">
                {activeTab === 'kisah_utama' && (
                  <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[65ch] mx-auto"
                  >
                    {/* Babak I — Jejak Kehidupan & Perjuangan */}
                    <header className="mb-6 pb-5 border-b border-stone-200/70">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-800">
                          {site.era || 'Khazanah Sejarah Waliyullah'}
                        </span>
                        <button
                          type="button"
                          onClick={() => setLargeReadingText((prev) => !prev)}
                          className="text-xs text-stone-500 hover:text-stone-900 underline underline-offset-4 cursor-pointer"
                        >
                          {largeReadingText ? 'Ukuran Teks: Besar' : 'Perbesar Huruf (A+)'}
                        </button>
                      </div>
                      <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 leading-snug">
                        {site.name}
                      </h1>
                      <p className="text-xs sm:text-sm text-stone-500 mt-1">
                        Babak I — Jejak Kehidupan, Dakwah &amp; Perjuangan Beliau
                      </p>
                    </header>

                    <div>
                      {historyParagraphs.map((para, idx) => (
                        <p
                          key={idx}
                          className={idx === 0 ? leadParagraphClass : bodyParagraphClass}
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {site.sanad && (
                      <div className="mt-7 pt-6 border-t border-stone-200/70">
                        <h3 className="font-serif text-xl text-stone-900 mb-3">
                          Jaringan Guru &amp; Sanad Keilmuan
                        </h3>
                        {splitIntoReadableParagraphs(site.sanad).map((para, idx) => (
                          <p key={idx} className={bodyParagraphClass}>
                            {para}
                          </p>
                        ))}
                      </div>
                    )}

                    {site.karya && site.karya.length > 0 && (
                      <div className="mt-7 pt-6 border-t border-stone-200/70">
                        <h3 className="font-serif text-xl text-stone-900 mb-3">
                          Karya Kitab &amp; Warisan Peradaban
                        </h3>
                        <ul className="space-y-2.5 mb-5">
                          {site.karya.map((item, idx) => (
                            <li key={idx} className="text-[15.5px] text-stone-800 flex items-start leading-[1.85]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-800 mt-2.5 mr-3 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Editorial Pull-Quote */}
                    {pullQuoteText && (
                      <blockquote className="my-8 py-4 border-y border-amber-700/30 font-serif italic text-xl text-stone-900 leading-snug text-center">
                        &ldquo;{pullQuoteText}&rdquo;
                      </blockquote>
                    )}

                    {/* Babak II — Kesaksian Karomah & Keajaiban Batin */}
                    {hasKaromah && (
                      <section className="mt-8 pt-2">
                        <div className="text-[11px] font-medium uppercase tracking-widest text-amber-800">
                          Keteladanan Spiritual
                        </div>
                        <h3 className="font-serif text-2xl text-stone-900 mt-1 mb-4">
                          Babak II — Kesaksian Karomah &amp; Keajaiban Batin
                        </h3>

                        <div className="space-y-8">
                          {site.karomah!.map((item, idx) => {
                            const kId = `${site.id}-karomah-${idx}`;
                            const isSavedKaromah = savedDoas.includes(kId);
                            const isItemUnlocked = isSiteUnlocked || idx === 0;
                            const cliffhanger = getEmotionalCliffhanger(item);
                            const waShareUrl = buildWhatsAppCliffhangerUrl(site, item);

                            return (
                              <div key={idx} className="border-b border-stone-200/70 pb-7 last:border-b-0">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-serif text-lg sm:text-xl text-stone-900">
                                    Kesaksian Karomah Ke-{idx + 1}
                                  </h4>
                                  {onToggleSaveDoa && isItemUnlocked && (
                                    <button
                                      type="button"
                                      onClick={() => onToggleSaveDoa(kId)}
                                      title="Simpan ke Koleksi"
                                      className={`p-1.5 transition-colors rounded-lg cursor-pointer ${
                                        isSavedKaromah ? 'text-emerald-800 bg-emerald-50' : 'text-stone-400 hover:text-stone-800'
                                      }`}
                                    >
                                      {isSavedKaromah ? (
                                        <BookmarkCheck className="w-4 h-4" strokeWidth={1.75} />
                                      ) : (
                                        <Bookmark className="w-4 h-4" strokeWidth={1.75} />
                                      )}
                                    </button>
                                  )}
                                </div>

                                {isItemUnlocked ? (
                                  <div>
                                    {splitIntoReadableParagraphs(item).map((para, pIdx) => (
                                      <p key={pIdx} className={bodyParagraphClass}>
                                        {para}
                                      </p>
                                    ))}
                                    <div className="pt-1">
                                      <a
                                        href={waShareUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-4"
                                      >
                                        Bagikan cuplikan kisah ini via WhatsApp
                                      </a>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-5">
                                    <div>
                                      {splitIntoReadableParagraphs(cliffhanger.preview).map((para, pIdx) => (
                                        <p key={pIdx} className={bodyParagraphClass}>
                                          {para}
                                        </p>
                                      ))}
                                      <p className={`${bodyParagraphClass} opacity-40 blur-[2px] select-none pointer-events-none line-clamp-2 text-stone-600`}>
                                        {cliffhanger.remainder}
                                      </p>
                                    </div>

                                    {!hasUntold && (
                                      <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
                                        <div className="text-[11px] font-medium tracking-widest uppercase text-amber-800">
                                          {siteCopy.paywallBadge}
                                        </div>
                                        <h4 className="font-serif text-xl text-stone-900 mt-1">
                                          {siteCopy.paywallTitle}
                                        </h4>
                                        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                                          {siteCopy.paywallSubtitle}
                                        </p>
                                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                          <button
                                            type="button"
                                            onClick={() => setTransactionType('untold')}
                                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-medium transition-colors cursor-pointer"
                                          >
                                            {siteCopy.paywallPrimaryButton}
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
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    )}

                    {/* Babak III — Wasiat Rahasia & Naskah Khusus */}
                    {hasUntold && (
                      <section className="mt-8 pt-6 border-t border-stone-200/70">
                        <div className="text-[11px] font-medium uppercase tracking-widest text-amber-800">
                          Arsip Sejarah &amp; Manuskrip
                        </div>
                        <h3 className="font-serif text-2xl text-stone-900 mt-1 mb-4">
                          Babak III — Wasiat Rahasia &amp; Naskah Khusus
                        </h3>

                        {(() => {
                          const untoldCliffhanger = getEmotionalCliffhanger(site.untoldStory || '');
                          const untoldWaUrl = buildWhatsAppCliffhangerUrl(site, site.untoldStory || site.history);

                          return isSiteUnlocked ? (
                            <div>
                              {splitIntoReadableParagraphs(site.untoldStory || '').map((para, pIdx) => (
                                <p key={pIdx} className={bodyParagraphClass}>
                                  {para}
                                </p>
                              ))}
                              <div className="pt-2">
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
                              <div>
                                {splitIntoReadableParagraphs(untoldCliffhanger.preview).map((para, pIdx) => (
                                  <p key={pIdx} className={bodyParagraphClass}>
                                    {para}
                                  </p>
                                ))}
                                <p className={`${bodyParagraphClass} opacity-40 blur-[2px] select-none pointer-events-none line-clamp-3 text-stone-600`}>
                                  {untoldCliffhanger.remainder}
                                </p>
                              </div>

                              {/* Kartu Pembuka Khazanah (In-Place Unlock) */}
                              <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-2xs">
                                <div className="text-[11px] font-medium tracking-widest uppercase text-amber-800">
                                  {siteCopy.paywallBadge}
                                </div>
                                <h4 className="font-serif text-xl text-stone-900 mt-1">
                                  {siteCopy.paywallTitle}
                                </h4>
                                <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                                  {siteCopy.paywallSubtitle}
                                </p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                  <button
                                    type="button"
                                    onClick={() => setTransactionType('untold')}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-sm font-medium transition-colors cursor-pointer"
                                  >
                                    {siteCopy.paywallPrimaryButton}
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
                      </section>
                    )}

                    {/* Bottom Story Footer & Next Tab Link */}
                    <footer className="mt-10 pt-6 border-t border-stone-200/70 space-y-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('panduan_doa')}
                        className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200/90 text-left flex items-center justify-between transition-colors cursor-pointer shadow-2xs"
                      >
                        <div>
                          <span className="text-xs font-medium uppercase tracking-widest text-emerald-800 block">
                            Persiapan Ibadah &amp; Rute
                          </span>
                          <span className="font-serif text-base sm:text-lg text-stone-900">
                            Lihat Panduan Ziarah, Doa Khusus &amp; Catatan Peziarah
                          </span>
                        </div>
                        <span className="text-xs font-medium text-emerald-900 underline underline-offset-4 shrink-0 ml-3">
                          Buka Panduan →
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTransactionType('infaq')}
                        className="w-full flex items-center justify-between p-4 sm:p-5 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200/90 transition-colors cursor-pointer shadow-2xs"
                      >
                        <div className="flex items-center">
                          <div className="p-2.5 bg-emerald-900 text-white rounded-xl mr-3.5">
                            <QrCode className="w-4 h-4" strokeWidth={1.75} />
                          </div>
                          <div className="text-left">
                            <span className="text-sm sm:text-base font-serif text-stone-900 block">
                              Infaq Jariyah &amp; Pelestarian Arsip
                            </span>
                            <span className="text-xs text-stone-600">
                              Salurkan sedekah jariyah &amp; titipkan doa munajat
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-emerald-800 underline underline-offset-4">
                          Infaq →
                        </span>
                      </button>
                    </footer>
                  </motion.article>
                )}

                {activeTab === 'panduan_doa' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[65ch] mx-auto space-y-8"
                  >
                    {/* Lokasi, Jam Buka & Jadwal Haul */}
                    <section className="pb-7 border-b border-stone-200/70 space-y-4">
                      <div>
                        <div className="text-[11px] font-medium uppercase tracking-widest text-emerald-800">
                          Panduan Lapangan Peziarah
                        </div>
                        <h3 className="font-serif text-2xl text-stone-900 mt-1">
                          Lokasi, Jadwal Haul &amp; Adab Kompleks Makam
                        </h3>
                      </div>

                      <div className="space-y-3.5 text-sm sm:text-[15px] text-stone-700 pt-2">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-1" strokeWidth={1.75} />
                          <div>
                            <div className="font-medium text-stone-900 leading-relaxed">{site.location.address}</div>
                            <div className="text-stone-500 text-xs sm:text-sm mt-0.5">
                              {site.location.city}, {site.location.province}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-emerald-800 shrink-0" strokeWidth={1.75} />
                          <div className="text-stone-800">{site.openingHours}</div>
                        </div>
                        <div className="flex items-start gap-3 pt-1">
                          <Calendar className="w-4 h-4 text-emerald-800 shrink-0 mt-1" strokeWidth={1.75} />
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                              Jadwal Haul Tahunan
                            </div>
                            <p className="text-sm sm:text-[15px] text-stone-700 mt-1 leading-[1.8]">
                              {logistics.haulSchedule}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 pt-1">
                          <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-1" strokeWidth={1.75} />
                          <div>
                            <div className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                              Ketentuan Adab Lokal &amp; Juru Kunci
                            </div>
                            <p className="text-sm sm:text-[15px] text-stone-700 mt-1 leading-[1.8]">
                              {logistics.localAdab}
                            </p>
                          </div>
                        </div>
                      </div>

                      {site.facilities && site.facilities.length > 0 && (
                        <div className="pt-3">
                          <div className="text-xs font-semibold uppercase tracking-wider text-stone-900 mb-1.5">
                            Fasilitas Kompleks
                          </div>
                          <p className="text-sm sm:text-[15px] text-stone-700 leading-[1.85]">
                            {site.facilities.join(' · ')}
                          </p>
                        </div>
                      )}
                    </section>

                    {/* Doa & Tawasul Khusus */}
                    {hasDoa && (
                      <section className="pb-7 border-b border-stone-200/70 space-y-6">
                        <div>
                          <div className="text-[11px] font-medium uppercase tracking-widest text-emerald-800">
                            Amalan &amp; Wasilah
                          </div>
                          <h3 className="font-serif text-2xl text-stone-900 mt-1">
                            Doa &amp; Tawasul Khusus di Makam Beliau
                          </h3>
                        </div>

                        <div className="divide-y divide-stone-200/60">
                          {site.doaKhusus!.map((doa, idx) => {
                            const dId = `${site.id}-doa-${idx}`;
                            const isSavedDoa = savedDoas.includes(dId);
                            return (
                              <div key={idx} className="py-5 first:pt-0 last:pb-0">
                                <div className="flex items-start justify-between mb-4">
                                  <h4 className="font-serif text-lg sm:text-xl text-stone-900 pr-6">{doa.title}</h4>
                                  {onToggleSaveDoa && (
                                    <button
                                      type="button"
                                      onClick={() => onToggleSaveDoa(dId)}
                                      title="Simpan ke Koleksi"
                                      className={`p-1.5 transition-colors rounded-lg cursor-pointer ${
                                        isSavedDoa ? 'text-emerald-800 bg-emerald-50' : 'text-stone-400 hover:text-stone-800'
                                      }`}
                                    >
                                      {isSavedDoa ? (
                                        <BookmarkCheck className="w-4 h-4" strokeWidth={1.75} />
                                      ) : (
                                        <Bookmark className="w-4 h-4" strokeWidth={1.75} />
                                      )}
                                    </button>
                                  )}
                                </div>
                                <p
                                  className="text-2xl sm:text-3xl font-arabic text-stone-950 leading-[2.6] text-right mb-4"
                                  dir="rtl"
                                >
                                  {doa.text}
                                </p>
                                {doa.translation && (
                                  <p className="text-stone-600 italic text-xs sm:text-sm mt-1.5 leading-relaxed">
                                    &ldquo;{doa.translation}&rdquo;
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    )}

                    {/* Catatan Peziarah */}
                    <section className="pb-7 border-b border-stone-200/70 space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-medium uppercase tracking-widest text-emerald-800">
                            Jejak Jamaah
                          </div>
                          <h3 className="font-serif text-2xl text-stone-900 mt-0.5">
                            Catatan Peziarah ({allStories.length})
                          </h3>
                        </div>
                        {onContribute && (
                          <button
                            type="button"
                            onClick={onContribute}
                            className="text-xs font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
                          >
                            Koreksi data makam →
                          </button>
                        )}
                      </div>

                      <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs flex flex-col gap-3">
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
                          className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-[#FAF8F5]/60 border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-700 placeholder:text-stone-400"
                        />
                        <textarea
                          placeholder="Bagikan pengalaman batin, kondisi rute, atau adab di makam ini..."
                          className="w-full text-xs sm:text-sm p-3.5 bg-[#FAF8F5]/60 border border-stone-200 rounded-xl focus:outline-none focus:border-emerald-700 resize-none transition-all placeholder:text-stone-400"
                          rows={3}
                          maxLength={1000}
                          value={newStory}
                          onChange={(e) => setNewStory(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <button
                            type="button"
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

                      <div className="divide-y divide-stone-200/70">
                        {allStories.map((story) => {
                          const canDelete =
                            !story.isDefault && (isCurrentUserAdmin || (currentUser && story.authorUid === currentUser.uid));
                          const storyWaUrl = buildWhatsAppCliffhangerUrl(site, story.text);
                          return (
                            <div key={story.id} className="py-5 first:pt-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-medium text-stone-900 text-sm sm:text-base">{story.name}</div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-stone-400">{story.date}</span>
                                  {canDelete && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteStory(story.id)}
                                      title="Hapus cerita"
                                      className="p-1 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm sm:text-[15.5px] text-stone-700 leading-[1.85]">
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
                    </section>

                    {/* Referensi Literatur & Dokumentasi Foto */}
                    {(site.references?.length || site.imageSource) && (
                      <section className="space-y-4">
                        {site.references && site.references.length > 0 && (
                          <div>
                            <h4 className="font-serif text-lg text-stone-900 mb-2">
                              Sumber Literatur &amp; Ensiklopedia
                            </h4>
                            <ol className="space-y-1.5 list-decimal list-inside">
                              {site.references.map((ref, idx) => (
                                <li key={idx} className="text-xs sm:text-sm text-stone-600 leading-[1.8] font-serif">
                                  {ref}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                        {site.imageSource && (
                          <div className="pt-2 space-y-1">
                            <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                              Referensi &amp; Atribusi Dokumentasi Foto
                            </div>
                            <p className="text-xs sm:text-sm text-stone-600 font-serif italic leading-relaxed">
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
                      </section>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Action Footer: Google Maps Navigation + Optional Interactive Map View */}
              <div className="px-6 sm:px-10 py-3.5 border-t border-stone-200/80 bg-white shrink-0 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${site.location.lat},${site.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center py-2.5 px-4 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-medium text-xs sm:text-sm transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 mr-2" strokeWidth={1.75} />
                  Buka Navigasi Rute (Google Maps)
                </a>
                {onViewOnMap && (
                  <button
                    type="button"
                    onClick={() => onViewOnMap(site)}
                    className="w-full sm:w-auto flex items-center justify-center py-2.5 px-4 bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-xl font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                  >
                    <MapIcon className="w-3.5 h-3.5 mr-2 text-emerald-800" strokeWidth={1.75} />
                    Lihat di Peta Rute
                  </button>
                )}
              </div>
            </motion.div>
          </div>
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
