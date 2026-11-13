import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ZiarahSite, getSourceClassificationLabel } from '../data/sites';
import { X, MapPin, Navigation, Clock, Heart, BookOpen, Bookmark, BookmarkCheck, QrCode, Send, ScrollText, Trash2, Loader2, Calendar, ShieldCheck, Type, Map as MapIcon, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TransactionModal } from './TransactionModal';
import { auth, db, handleFirestoreError, OperationType, isUserAdmin, checkAndRecordSubmissionCooldown } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { useVerifiedDonationUnlock, useVerifiedBarokahUnlock } from '../lib/transferProof';
import { optimizeSiteImageUrl, handleOptimizedImageError } from '../lib/imageOptimizer';
import { getSiteLogistics, getSiteBarokahHajat, getSiteCompleteBarokahGuide, estimateHaulGregorian2026, sanitizeHistoricalLogisticsText } from '../lib/siteLogistics';
import { sanitizePlainText, sanitizeMultilineText } from '../lib/sanitize';
import { getSiteSlug, formatMakamHeading } from '../lib/siteSlugs';
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

export function getShortLockedSplit(text: string, maxChars: number = 120): { preview: string; remainder: string } {
  const rawInput = (text || '').trim();
  if (rawInput.includes('<!--more-->')) {
    return getEmotionalCliffhanger(rawInput);
  }
  const raw = rawInput.replace(/<!--more-->/g, ' ').trim();
  const fallbackRemainder =
    'Lanjutan riwayat karomah, riyadhoh malam, dan wasiat batin beliau tersimpan dalam lembaran Khazanah Khusus yang dijaga keaslian sanadnya oleh para juru kunci dan santri sepuh.';
  if (!raw) {
    return {
      preview: '',
      remainder: fallbackRemainder,
    };
  }

  const firstSentenceMatch = raw.match(/^[^.!?]+[.!?]/);
  let cutIndex = Math.min(maxChars, raw.length);
  if (firstSentenceMatch && firstSentenceMatch[0].length <= maxChars && firstSentenceMatch[0].length >= 45) {
    cutIndex = firstSentenceMatch[0].length;
  } else {
    const lastSpace = raw.lastIndexOf(' ', maxChars);
    if (lastSpace > 35) {
      cutIndex = lastSpace;
    }
  }

  const previewClean = raw.slice(0, cutIndex).trim().replace(/[,;:]+$/, '');
  const restClean = raw.slice(cutIndex).trim();

  return {
    preview: previewClean.endsWith('.') ? previewClean : `${previewClean}...`,
    remainder: restClean.length > 50 ? restClean : `${restClean} ${fallbackRemainder}`.trim(),
  };
}

function buildWhatsAppCliffhangerUrl(
  site: ZiarahSite,
  rawStoryText: string,
  sharePrefix = 'Merinding membaca cuplikan kisah & karomah'
): string {
  const { preview } = getShortLockedSplit(rawStoryText, 120);
  const cuplikanCliffhanger = preview.replace(/\.\.\.\s*$/, '').trim();
  const locationLabel =
    typeof site.location === 'string'
      ? site.location
      : [site.location?.city, site.location?.province].filter(Boolean).join(', ');
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://ziarahnusantara.my.id';
  const shareText = `${sharePrefix} *${site.name}* (${locationLabel}):\n\n"${cuplikanCliffhanger}..."\n\nBaca kelanjutan kisah rahasia & panduan ziarahnya di sini:\n${origin}/situs/${getSiteSlug(site)}`;
  return `https://wa.me/?text=${encodeURIComponent(shareText)}`;
}

export function getSiteGoogleMapsNavigationUrl(site: ZiarahSite): string {
  if (site.googleMapsUrl && site.googleMapsUrl.trim()) {
    return site.googleMapsUrl.trim();
  }
  const district = site.district || site.location?.district || site.location?.city || '';
  const city = site.city || site.location?.city || '';
  const province = site.province || site.location?.province || '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `Makam ${site.name}, ${district}, ${city}, ${province}`
  )}`;
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
  status?: string;
  createdAtMs?: number;
  isDefault?: boolean;
}

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
  const [activeTab, setActiveTab] = useState<'kisah_utama' | 'barokah_doa' | 'panduan_doa'>('kisah_utama');
  const [readingFontSize, setReadingFontSize] = useState<'base' | 'lg' | 'xl'>('base');
  const [authorName, setAuthorName] = useState('');
  const [newStory, setNewStory] = useState('');
  const [isSendingStory, setIsSendingStory] = useState(false);
  const [cloudStories, setCloudStories] = useState<StoryItem[]>([]);
  const [transactionType, setTransactionType] = useState<'infaq' | 'untold' | 'barokah_doa' | null>(null);
  const [personalHajat, setPersonalHajat] = useState<string>('');
  const [hajatSavedNotice, setHajatSavedNotice] = useState<boolean>(false);
  const [tasbihCount, setTasbihCount] = useState<number>(0);
  const [tasbihTarget, setTasbihTarget] = useState<33 | 99 | 100>(33);
  const [copiedPrayerSheet, setCopiedPrayerSheet] = useState<boolean>(false);
  const { isUnlocked: isDonationVerified } = useVerifiedDonationUnlock(site?.id);
  const { isUnlocked: isBarokahDonationVerified } = useVerifiedBarokahUnlock(site?.id);
  const { copy } = useSiteCopy();
  const barokahAmount = Math.max(2000, copy.barokahLockAmount || 2000);
  const rubrikAmount = Math.max(2000, copy.rubrikLockAmount || 10000);


  // Pre-fill author name if logged in & load saved personal hajat for this site
  useEffect(() => {
    if (auth.currentUser?.displayName && !authorName) {
      setAuthorName(auth.currentUser.displayName);
    }
    if (site?.id && typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`zn_hajat_${site.id}`) || '';
        setPersonalHajat(saved);
      } catch {
        setPersonalHajat('');
      }
    }
    setTasbihCount(0);
    setCopiedPrayerSheet(false);
  }, [site?.id]);

  // Reset tab & subscribe to real-time stories from Firestore when site changes
  useEffect(() => {
    setActiveTab('kisah_utama');
    setNewStory('');
    if (!site?.id) {
      setCloudStories([]);
      return;
    }

    const adminActive = isUserAdmin(auth.currentUser);
    const q = adminActive
      ? query(collection(db, 'stories'), where('siteId', '==', site.id))
      : query(
          collection(db, 'stories'),
          where('siteId', '==', site.id),
          where('status', 'in', ['approved', 'published'])
        );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: StoryItem[] = snapshot.docs
          .filter((docSnap) => {
            const d = docSnap.data();
            return adminActive || d.status === 'approved' || d.status === 'published';
          })
          .map((docSnap) => {
            const d = docSnap.data();
            const ts = d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now();
            const formattedDate = d.createdAt?.toDate
              ? d.createdAt.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'Baru saja';
            return {
              id: docSnap.id,
              name: d.authorName || 'Hamba Allah',
              text: d.text || '',
              date: d.status === 'pending' ? `${formattedDate} • Menunggu Moderasi` : formattedDate,
              authorUid: d.authorUid,
              status: d.status || 'approved',
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

  const allStories = cloudStories;

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
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      try {
        const prev = JSON.parse(localStorage.getItem('zn_my_pending_story_ids') || '[]');
        localStorage.setItem('zn_my_pending_story_ids', JSON.stringify([storyRef.id, ...prev].slice(0, 30)));
      } catch {}
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

  const safeSiteName = sanitizeHistoricalLogisticsText(site.name);
  const hasKaromah = site.karomah && site.karomah.length > 0;
  const completeBarokahGuide = getSiteCompleteBarokahGuide(site);
  const effectiveDoaKhusus = completeBarokahGuide.doaItems;
  const barokahHajatText = getSiteBarokahHajat(site);
  const hasUntold = !!site.untoldStory;
  const currentUser = auth.currentUser;
  const isCurrentUserAdmin = isUserAdmin(currentUser);
  // Strict lock without Admin bypass so all visitors (including site owner) see locked & blurred paid content unless unlocked via verified donation
  const isSiteUnlocked = isDonationVerified;
  const isBarokahUnlocked = isBarokahDonationVerified;
  const logistics = getSiteLogistics(site);
  const pullQuoteText = extractPullQuote(site.description, logistics.localAdab);

  const cycleFontSizeDown = () => {
    setReadingFontSize((prev) => (prev === 'xl' ? 'lg' : 'base'));
  };

  const cycleFontSizeUp = () => {
    setReadingFontSize((prev) => (prev === 'base' ? 'lg' : 'xl'));
  };

  const jumpToSectionInModal = (elementId: string) => {
    if (activeTab !== 'kisah_utama') {
      setActiveTab('kisah_utama');
      window.setTimeout(() => {
        document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 90);
    } else {
      document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSavePersonalHajat = (val: string) => {
    setPersonalHajat(val);
    if (site?.id && typeof window !== 'undefined') {
      try {
        localStorage.setItem(`zn_hajat_${site.id}`, val);
        setHajatSavedNotice(true);
        window.setTimeout(() => setHajatSavedNotice(false), 2000);
      } catch {
        // Ignore storage quota errors
      }
    }
  };

  const handleIncrementTasbih = () => {
    setTasbihCount((prev) => {
      const next = prev >= tasbihTarget ? 1 : prev + 1;
      try {
        if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
          navigator.vibrate(next === tasbihTarget ? [40, 60, 40] : 25);
        }
      } catch {
        // Ignore vibration API errors
      }
      return next;
    });
  };

  const handleCopyPrayerSheet = () => {
    const doaLines = effectiveDoaKhusus
      .map(
        (d, idx) =>
          `${idx + 1}. ${d.title}\n${d.text}\nLatin: ${d.latin || '-'}\nArtinya: "${d.translation || '-'}"`
      )
      .join('\n\n');
    const hajatLine = personalHajat.trim()
      ? `\nNiat & Hajat Pribadi Saya di ${safeSiteName}:\n"${personalHajat.trim()}"\n`
      : '';
    const fullSheet = `LEMBAR AMALAN TAWASSUL & MUNAJAT HAJAT\n${formatMakamHeading(site.title)} (${safeSiteName}) — ${site.location.city}, ${site.location.province}\n${hajatLine}\n${doaLines}\n\nSumber: https://ziarahnusantara.my.id/situs/${getSiteSlug(site)}`;
    try {
      navigator.clipboard?.writeText(fullSheet);
      setCopiedPrayerSheet(true);
      window.setTimeout(() => setCopiedPrayerSheet(false), 2500);
    } catch {
      // Ignore clipboard errors
    }
  };

  const renderBarokahDoaSection = (sectionId?: string) => (
    <section id={sectionId} className="mt-8 pt-6 border-t border-slate-200 space-y-5 scroll-mt-6">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-800">
            <Lock className="w-3.5 h-3.5 text-emerald-700" strokeWidth={1.75} />
            <span>{copy.barokahSectionTitle}</span>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md border text-[11px] font-medium ${
              completeBarokahGuide.isCuratedSpecific
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-stone-100 text-stone-700 border-stone-300'
            }`}
          >
            {completeBarokahGuide.curationStatusLabel}
          </span>
        </div>
        <h3 className="font-serif text-2xl text-slate-900 mt-1">
          Wasilah Hajat &amp; Amalan Tawassul di {formatMakamHeading(site.title)}
        </h3>
      </div>

      {/* Bagian Terbuka: Narasi Hajat yang Menyentuh Hati */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-800">
          {copy.barokahHookPrefix}
        </div>
        <h4 className="font-serif text-lg sm:text-xl text-slate-900 leading-snug">
          Mengapa Banyak Peziarah Membawa Hajat Ini ke Pusara {safeSiteName}?
        </h4>
        <p className="text-sm sm:text-[15.5px] text-slate-700 leading-relaxed">
          {barokahHajatText}
        </p>
      </div>

      {/* Kotak Interaktif Input Hajat Pribadi Peziarah (Tersimpan Privat di Perangkat) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor={`input-hajat-${sectionId || 'tab'}`}
            className="text-xs font-bold uppercase tracking-wider text-emerald-900"
          >
            Catat Niat &amp; Hajat Pribadi Anda di Maqbarah Ini
          </label>
          <span className="text-[11px] text-slate-500">
            {hajatSavedNotice ? 'Tersimpan di perangkat Anda' : 'Privat di perangkat Anda'}
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            "Ikhtiar Kesembuhan dari Penyakit (Syifa')",
            'Kelapangan Rezeki Halal & Bebas Hutang',
            'Ketenangan Hati & Sakinah Keluarga',
            'Keberkahan Ilmu & Keturunan Shalih',
          ].map((chipText) => (
            <button
              key={chipText}
              type="button"
              onClick={() =>
                handleSavePersonalHajat(
                  personalHajat.trim()
                    ? personalHajat.includes(chipText)
                      ? personalHajat
                      : `${personalHajat.trim()}; ${chipText}`
                    : `Ya Allah, dengan wasilah amal shalih dan kecintaan kepada kekasih-Mu ${safeSiteName}, kabulkanlah hajat kami: ${chipText}.`
                )
              }
              className="px-2.5 py-1 rounded-lg bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 text-[11px] font-medium transition-colors cursor-pointer"
            >
              + {chipText}
            </button>
          ))}
        </div>
        <textarea
          id={`input-hajat-${sectionId || 'tab'}`}
          rows={2}
          maxLength={400}
          value={personalHajat}
          onChange={(e) => handleSavePersonalHajat(e.target.value)}
          placeholder={`Tuliskan hajat khusus yang ingin Anda munajatkan saat berziarah ke ${safeSiteName} (misal: kelancaran usaha, kesembuhan orang tua, ketenangan rumah tangga)...`}
          className="w-full text-xs sm:text-sm p-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-700 text-slate-800 placeholder:text-slate-400 resize-none"
        />
      </div>


      {/* 3 Bagian Panduan Amalan Lengkap (Terbuka Penuh saat isBarokahUnlocked, atau BLUR saat Terkunci Rp 5.000) */}
      {isBarokahUnlocked ? (
        <div className="space-y-5">
          {/* Bila Peziarah Menuliskan Hajat Pribadi, Tampilkan di Kartu Munajat Khusus */}
          {personalHajat.trim() && (
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-900">
                Niat &amp; Munajat Hajat Pribadi Anda di {safeSiteName}
              </div>
              <p className="text-sm font-serif italic text-slate-900 leading-relaxed">
                &ldquo;{personalHajat.trim()}&rdquo;
              </p>
            </div>
          )}

          {/* 1) Tata Cara & Waktu Terbaik Bertawassul Hajat */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 block">
                Bagian 1 · Kaifiyah &amp; Adab Munajat
              </span>
              <button
                type="button"
                onClick={handleCopyPrayerSheet}
                className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedPrayerSheet ? 'Lembar Doa Tersalin' : 'Salin Lembar Doa & Hajat'}
              </button>
            </div>
            <h4 className="font-serif text-lg sm:text-xl text-slate-900">
              1. Tata Cara &amp; Waktu Terbaik Bertawassul Hajat di {safeSiteName}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
              {completeBarokahGuide.tataCaraWaktu.map((step, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2) Lafaz Bacaan Tawassul & Doa Khusus Hajat (Arab, Latin, Terjemahan) */}
          <div className="space-y-4">
            <div className="px-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 block">
                Bagian 2 · Bacaan Inti Maqbarah
              </span>
              <h4 className="font-serif text-lg sm:text-xl text-slate-900">
                2. Lafaz Bacaan Tawassul, Wirid Pegangan &amp; Doa Khusus Hajat
              </h4>
            </div>
            {effectiveDoaKhusus.map((doa, idx) => {
              const dId = `${site.id}-doa-${idx}`;
              const isSavedDoa = savedDoas.includes(dId);

              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-800 block mb-0.5">
                        Amalan &amp; Tawassul Makam #{idx + 1}
                      </span>
                      <h5 className="font-serif text-lg sm:text-xl text-slate-900">{doa.title}</h5>
                    </div>
                    {onToggleSaveDoa && (
                      <button
                        type="button"
                        onClick={() => onToggleSaveDoa(dId)}
                        title="Simpan Doa ke Koleksi"
                        className={`p-2 transition-colors rounded-xl border cursor-pointer shrink-0 ${
                          isSavedDoa
                            ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                            : 'text-slate-500 bg-slate-50 border-slate-200 hover:text-slate-900'
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

                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <p
                      className="text-2xl sm:text-3xl font-arabic text-slate-900 leading-[2.6] text-right"
                      dir="rtl"
                    >
                      {doa.text}
                    </p>
                    {doa.latin && (
                      <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 mb-1">
                          Transliterasi Latin
                        </div>
                        <p className="text-slate-800 italic text-xs sm:text-sm leading-relaxed">
                          {doa.latin}
                        </p>
                      </div>
                    )}
                    {doa.translation && (
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Terjemahan &amp; Makna Doa
                        </div>
                        <p className="text-slate-700 italic text-xs sm:text-sm leading-relaxed">
                          &ldquo;{doa.translation}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tasbih Digital Interaktif untuk Mengamalkan Wirid Pegangan di Makam */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 block">
                  Pendamping Dzikir Maqbarah
                </span>
                <h4 className="font-serif text-lg sm:text-xl text-slate-900">
                  Tasbih Digital Wirid Pegangan ({tasbihCount} / {tasbihTarget})
                </h4>
              </div>
              <div className="flex items-center gap-1.5">
                {([33, 99, 100] as const).map((targetVal) => (
                  <button
                    key={targetVal}
                    type="button"
                    onClick={() => {
                      setTasbihTarget(targetVal);
                      setTasbihCount(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                      tasbihTarget === targetVal
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {targetVal}x
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setTasbihCount(0)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={handleIncrementTasbih}
                className="w-full sm:flex-1 py-4 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-900 active:scale-[0.99] text-white font-serif text-lg font-medium transition-all cursor-pointer flex items-center justify-between"
              >
                <span>Ketuk Setiap Melafalkan Wirid</span>
                <span className="text-2xl font-sans font-bold">
                  {tasbihCount} / {tasbihTarget}
                </span>
              </button>
            </div>
          </div>

          {/* 3) Wirid Penutup & Adab Pulang Ziarah */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 block">
              Bagian 3 · Penyempurna Wasilah
            </span>
            <h4 className="font-serif text-lg sm:text-xl text-slate-900">
              3. Wirid Penutup &amp; Adab Pulang Ziarah
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
              {completeBarokahGuide.wiridPenutupAdab.map((item, wIdx) => (
                <li key={wIdx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="relative rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 overflow-hidden">
          {/* 1 Baris Kalimat Pembuka Panduan Kaifiyah Secara Terbuka Sebelum Lafaz Arab yang Di-Blur */}
          <div className="mb-4 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed">
            <strong className="font-semibold text-emerald-900">Panduan Kaifiyah Hajat:</strong>{' '}
            Awali dengan hadiah Al-Fatihah khusus sebanyak 3 kali ke hadirat {safeSiteName}, hadirkan niat hajat pribadi Anda, lalu bacalah wirid pegangan (Istighfar 3x, Shalawat 11x, Kalimat Tauhid 33x) dan munajat khusus berikut...
          </div>

          {/* Seluruh 3 Bagian Panduan Amalan Lengkap dalam keadaan BLUR */}
          <div className="blur-[6px] select-none pointer-events-none opacity-50 space-y-5" aria-hidden="true">
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-900">
                1. Tata Cara &amp; Waktu Terbaik Bertawassul Hajat di {safeSiteName}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {completeBarokahGuide.tataCaraWaktu.join(' ')}
              </p>
            </div>
            {effectiveDoaKhusus.map((doa, idx) => (
              <div key={idx} className="pt-3 border-t border-slate-200 space-y-2">
                <div className="text-xs font-semibold text-slate-800">
                  2. {doa.title}
                </div>
                <p
                  className="text-xl sm:text-2xl font-arabic text-slate-900 leading-[2.2] text-right"
                  dir="rtl"
                >
                  {doa.text}
                </p>
                {doa.latin && (
                  <p className="text-xs text-slate-700 italic">{doa.latin}</p>
                )}
                {doa.translation && (
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                    {doa.translation}
                  </p>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-slate-200 space-y-1">
              <div className="text-xs font-bold text-slate-900">
                3. Wirid Penutup &amp; Adab Pulang Ziarah
              </div>
              <p className="text-xs text-slate-600">
                {completeBarokahGuide.wiridPenutupAdab.join(' ')}
              </p>
            </div>
          </div>

          {/* Overlay Kartu Gembok Bersih */}
          <div className="mt-4 pt-4 border-t border-slate-200 bg-white space-y-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Khazanah Doa Khusus &amp; Tasbih Digital · Rp {barokahAmount.toLocaleString('id-ID')}</span>
            </div>
            <h4 className="font-serif text-xl text-slate-900">
              {copy.barokahPaywallTitle}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {copy.barokahPaywallDescription} Buka penuh <strong>3 Bagian Panduan Amalan, Lafaz Arab-Latin, Wirid Pegangan &amp; Tasbih Digital</strong> di{' '}
              <strong className="font-semibold text-slate-900">{formatMakamHeading(site.title)}</strong> dengan infaq{' '}
              <strong className="font-semibold text-emerald-800">Rp {barokahAmount.toLocaleString('id-ID')}</strong>.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setTransactionType('barokah_doa')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4" strokeWidth={1.75} />
                <span>{copy.barokahPaywallButtonText} (Rp {barokahAmount.toLocaleString('id-ID')})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Catatan Transparansi Ilmiah / Epistemologis di bawah Karomah & Doa */}
      <div className="p-4 rounded-xl bg-stone-100/90 border border-stone-200/90 text-xs text-stone-600 leading-relaxed font-serif italic">
        Catatan Epistemologis: Riwayat sejarah disarikan dari literatur historiografi dan arsip cagar budaya ({getSourceClassificationLabel(site.historySourceType)}), sedangkan kisah karomah dan fadhilah tawassul merupakan rekaman tradisi ({getSourceClassificationLabel(site.karomahSourceType)}) yang disajikan sebagai keteladanan spiritual. Status kurasi: {site.verifiedBy}.
      </div>
    </section>
  );

  const historyParagraphs = splitIntoReadableParagraphs(site.history || site.description);
  const bodyParagraphClass =
    readingFontSize === 'xl'
      ? 'text-xl text-slate-800 leading-[2.0] mb-5'
      : readingFontSize === 'lg'
        ? 'text-lg text-slate-800 leading-[1.95] mb-5'
        : 'text-base text-slate-800 leading-[1.9] mb-5';

  const leadParagraphClass =
    readingFontSize === 'xl'
      ? 'font-serif text-2xl text-slate-900 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-emerald-900 first-letter:float-left first-letter:mr-3 first-letter:leading-none'
      : readingFontSize === 'lg'
        ? 'font-serif text-xl sm:text-2xl text-slate-900 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-emerald-900 first-letter:float-left first-letter:mr-3 first-letter:leading-none'
        : 'font-serif text-lg sm:text-xl text-slate-900 leading-relaxed mb-5 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-emerald-900 first-letter:float-left first-letter:mr-3 first-letter:leading-none';

  const modalContent = (
    <>
      <AnimatePresence>
        {site && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-0 sm:p-4 md:p-6 bg-slate-950/60 backdrop-blur-xs pointer-events-auto">
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
              className="relative z-10 w-full h-full sm:h-auto sm:max-w-3xl sm:max-h-[90vh] sm:rounded-3xl bg-slate-50 shadow-2xl overflow-hidden flex flex-col border border-slate-200 pointer-events-auto"
            >
              {/* Compact Editorial Cover Header */}
              <div className="relative shrink-0 h-36 sm:h-44 bg-slate-900">
                <img
                  src={optimizeSiteImageUrl(site.imageUrl, 720, 78)}
                  onError={(e) => handleOptimizedImageError(e, site.imageUrl)}
                  alt={site.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none" />

                <div className="absolute top-3 right-3 z-20 flex items-center gap-2 pointer-events-auto">
                  {onToggleSave && (
                    <motion.button
                      type="button"
                      whileTap={{ scale: 1.2 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 15 }}
                      onClick={onToggleSave}
                      className="w-10 h-10 flex items-center justify-center bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-md rounded-xl text-white transition-colors border border-white/20 shadow-sm cursor-pointer"
                      title={isSaved ? 'Hapus dari Rencana' : 'Simpan ke Rencana'}
                      aria-label={isSaved ? 'Hapus dari Rencana' : 'Simpan ke Rencana'}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-white'}`} strokeWidth={1.75} />
                    </motion.button>
                  )}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.92 }}
                    onClick={onClose}
                    className="w-10 h-10 flex items-center justify-center bg-slate-900/75 hover:bg-slate-900/95 backdrop-blur-md rounded-xl text-white transition-colors border border-white/25 shadow-sm cursor-pointer"
                    title="Tutup lembar bacaan"
                    aria-label="Tutup lembar bacaan"
                  >
                    <X className="w-5 h-5" strokeWidth={2} />
                  </motion.button>
                </div>

                <div className="absolute bottom-3.5 left-4 right-4 sm:left-6 sm:right-6 z-10 text-white flex items-end justify-between gap-3 pointer-events-none">
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium uppercase tracking-widest text-emerald-200 mb-1 truncate">
                      {site.category} · {site.location.city}, {site.location.province}
                      {site.openingHours ? ` · ${site.openingHours}` : ''}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-normal text-white leading-tight tracking-tight line-clamp-1">
                      {site.title}
                    </h2>
                  </div>
                  <a
                    href={getSiteGoogleMapsNavigationUrl(site)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700/95 hover:bg-emerald-600 text-white text-[11px] font-semibold border border-emerald-400/30 shadow-sm transition-colors"
                  >
                    <Navigation className="w-3 h-3" strokeWidth={1.75} />
                    <span>Rute Google Maps</span>
                  </a>
                </div>
              </div>

              {/* 3 Internal Reader Tabs (Grid 3 Kolom Presisi di Layar HP 360px) */}
              <div className="relative z-20 grid grid-cols-3 gap-1 px-3 sm:px-8 py-2 bg-slate-50 border-b border-slate-200 shrink-0 pointer-events-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('kisah_utama')}
                  className={`text-xs sm:text-sm font-semibold text-center py-2.5 px-1.5 rounded-xl transition-all inline-flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'kisah_utama'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  <ScrollText className="w-3.5 h-3.5 hidden sm:inline shrink-0" strokeWidth={1.75} />
                  <span className="truncate">Kisah &amp; Karomah</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('barokah_doa')}
                  className={`text-xs sm:text-sm font-semibold text-center py-2.5 px-1.5 rounded-xl transition-all inline-flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'barokah_doa'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  <Lock className={`w-3.5 h-3.5 hidden sm:inline shrink-0 ${activeTab === 'barokah_doa' ? 'text-white' : 'text-emerald-700'}`} strokeWidth={1.75} />
                  <span className="truncate">Barokah &amp; Doa</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('panduan_doa')}
                  className={`text-xs sm:text-sm font-semibold text-center py-2.5 px-1.5 rounded-xl transition-all inline-flex items-center justify-center gap-1 cursor-pointer ${
                    activeTab === 'panduan_doa'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200/80'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 hidden sm:inline shrink-0" strokeWidth={1.75} />
                  <span className="truncate">Panduan &amp; Adab</span>
                </button>
              </div>

              {/* Bar Pintasan Cepat ke 2 Produk Utama + Kontrol Ukuran Huruf (A- / A+ Ukuran Teks Nyaman) */}
              <div className="px-3 sm:px-8 py-2 bg-white border-b border-slate-200 flex items-center justify-between gap-2 shrink-0">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar min-w-0">
                  {hasKaromah && (
                    <button
                      type="button"
                      onClick={() => jumpToSectionInModal('seksi-karomah-makam')}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 text-[11px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                    >
                      Kesaksian Karomah ↓
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => jumpToSectionInModal('seksi-barokah-doa-makam')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  >
                    Barokah &amp; Doa ↓
                  </button>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-auto">
                  <span className="text-[11px] text-slate-500 mr-1 hidden md:inline">
                    Ukuran Teks:
                  </span>
                  <button
                    type="button"
                    onClick={cycleFontSizeDown}
                    disabled={readingFontSize === 'base'}
                    className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                    title="Perkecil Ukuran Huruf (A-)"
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    onClick={cycleFontSizeUp}
                    disabled={readingFontSize === 'xl'}
                    className={`px-2.5 py-1 rounded-lg border text-xs font-bold inline-flex items-center gap-1 cursor-pointer ${
                      readingFontSize !== 'base'
                        ? 'bg-emerald-700 text-white border-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-emerald-800 hover:bg-emerald-50'
                    } disabled:opacity-40`}
                    title="Perbesar Ukuran Huruf (A+)"
                  >
                    <Type className="w-3 h-3" strokeWidth={1.75} />
                    <span>A+</span>
                  </button>
                </div>
              </div>

              {/* Main Reader Scroll Area */}
              <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth px-6 sm:px-10 md:px-12 py-7 sm:py-9 bg-slate-50">
                {activeTab === 'kisah_utama' && (
                  <motion.article
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[65ch] mx-auto"
                  >
                    {/* Babak I — Jejak Kehidupan & Perjuangan */}
                    <header className="mb-6 pb-5 border-b border-slate-200">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-medium uppercase tracking-widest text-emerald-800">
                          {site.era || 'Khazanah Sejarah Waliyullah'}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setReadingFontSize((prev) =>
                              prev === 'base' ? 'lg' : prev === 'lg' ? 'xl' : 'base'
                            )
                          }
                          className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
                        >
                          {readingFontSize === 'base'
                            ? 'Perbesar Huruf (A+)'
                            : readingFontSize === 'lg'
                              ? 'Ukuran Teks: Besar (A+)'
                              : 'Ukuran Teks: Sangat Besar (Reset)'}
                        </button>
                      </div>
                      <h1 className="font-serif text-2xl sm:text-3xl text-slate-900 leading-snug">
                        {safeSiteName}
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1">
                        Babak I — Jejak Kehidupan, Dakwah &amp; Perjuangan Beliau
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium">
                          Klasifikasi Sumber: {getSourceClassificationLabel(site.historySourceType, 'catatan_sejarah')}
                        </span>
                        <span className="text-[11px] text-slate-500 italic">
                          Disusun dari rujukan sejarah &amp; hikmah tradisi tutur pesantren Nusantara
                        </span>
                      </div>
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
                      <blockquote className="my-8 py-4 border-y border-slate-200 font-serif italic text-xl text-slate-900 leading-snug text-center">
                        &ldquo;{pullQuoteText}&rdquo;
                      </blockquote>
                    )}

                    {/* Babak II — Kesaksian Karomah & Keajaiban Batin */}
                    {hasKaromah && (
                      <section id="seksi-karomah-makam" className="mt-8 pt-2 scroll-mt-6">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="text-[11px] font-medium uppercase tracking-widest text-emerald-800">
                            Keteladanan Spiritual
                          </div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-medium">
                            Klasifikasi Sumber: {getSourceClassificationLabel(site.karomahSourceType, 'tradisi_lisan')}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl text-slate-900 mt-1 mb-4">
                          {copy.karomahSectionTitle}
                        </h3>

                        <div className="space-y-8">
                          {site.karomah!.map((item, idx) => {
                            const kId = `${site.id}-karomah-${idx}`;
                            const isSavedKaromah = savedDoas.includes(kId);
                            // Strict lock on ALL karomah items (including idx === 0) until Rp 10.000 donation is verified
                            const isItemUnlocked = isSiteUnlocked;
                            const cliffhanger = getShortLockedSplit(item, 120);
                            const waShareUrl = buildWhatsAppCliffhangerUrl(site, item, copy.whatsappSharePrefix);

                            return (
                              <div key={idx} className="border-b border-slate-200 pb-7 last:border-b-0">
                                <div className="flex items-center justify-between mb-3">
                                  <h4 className="font-serif text-lg sm:text-xl text-slate-900">
                                    Kesaksian Karomah Ke-{idx + 1}
                                  </h4>
                                  {onToggleSaveDoa && isItemUnlocked && (
                                    <button
                                      type="button"
                                      onClick={() => onToggleSaveDoa(kId)}
                                      title="Simpan ke Koleksi"
                                      className={`p-1.5 transition-colors rounded-lg cursor-pointer ${
                                        isSavedKaromah ? 'text-emerald-800 bg-emerald-50' : 'text-slate-400 hover:text-slate-800'
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
                                        className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4"
                                      >
                                        Bagikan cuplikan kisah ini via WhatsApp
                                      </a>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-4">
                                    <div>
                                      <p className={bodyParagraphClass}>
                                        {cliffhanger.preview}
                                      </p>
                                      <p className="blur-[5px] select-none pointer-events-none opacity-60 text-slate-600 leading-relaxed">
                                        {cliffhanger.remainder}
                                      </p>
                                    </div>

                                    {idx === site.karomah!.length - 1 && !hasUntold && (
                                      <div className="p-6 rounded-2xl bg-white border border-slate-200">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold uppercase tracking-wider">
                                          <Lock className="w-3.5 h-3.5" strokeWidth={1.75} />
                                          <span>{copy.paywallBadge}</span>
                                        </div>
                                        <h4 className="font-serif text-xl text-slate-900 mt-2">
                                          {copy.paywallTitle}
                                        </h4>
                                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                          {copy.paywallDescription}
                                        </p>
                                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                          <button
                                            type="button"
                                            onClick={() => setTransactionType('untold')}
                                            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium transition-colors cursor-pointer"
                                          >
                                            {copy.paywallButtonText} (Rp {rubrikAmount.toLocaleString('id-ID')})
                                          </button>
                                          <a
                                            href={waShareUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4 text-center sm:text-left"
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

                    {/* Seksi Mengalir Tepat Setelah Karomah: Barokah Hajat & Doa Khusus (Rp 5.000) */}
                    {renderBarokahDoaSection('seksi-barokah-doa-makam')}

                    {/* Babak III — Wasiat Rahasia & Naskah Khusus */}
                    {hasUntold && (
                      <section className="mt-8 pt-6 border-t border-slate-200">
                        <div className="text-[11px] font-medium uppercase tracking-widest text-emerald-800">
                          Arsip Sejarah &amp; Manuskrip
                        </div>
                        <h3 className="font-serif text-2xl text-slate-900 mt-1 mb-4">
                          Babak III — Wasiat Rahasia &amp; Naskah Khusus
                        </h3>

                        {(() => {
                          const untoldCliffhanger = getShortLockedSplit(site.untoldStory || '', 120);
                          const untoldWaUrl = buildWhatsAppCliffhangerUrl(
                            site,
                            site.untoldStory || site.history,
                            copy.whatsappSharePrefix
                          );

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
                                  className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4"
                                >
                                  Bagikan cuplikan via WhatsApp
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-5">
                              <div>
                                <p className={bodyParagraphClass}>
                                  {untoldCliffhanger.preview}
                                </p>
                                <div className="blur-[6px] select-none pointer-events-none opacity-50 space-y-3 text-slate-600 leading-relaxed" aria-hidden="true">
                                  {splitIntoReadableParagraphs(untoldCliffhanger.remainder).map((para, pIdx) => (
                                    <p key={pIdx}>
                                      {para}
                                    </p>
                                  ))}
                                </div>
                              </div>

                              {/* Kartu Pembuka Khazanah (In-Place Unlock) */}
                              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                                <p className="font-serif italic text-sm sm:text-base text-slate-700 mb-3 leading-relaxed border-l-2 border-emerald-700 pl-3">
                                  &ldquo;Di balik kabut sejarah ini, tersimpan satu kisah karomah dan pesan wasiat batin yang jarang diketahui orang awam—sebuah cermin bagi siapa pun yang hari ini sedang memikul beban hidup yang berat...&rdquo;
                                </p>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold uppercase tracking-wider">
                                  <Lock className="w-3.5 h-3.5" strokeWidth={1.75} />
                                  <span>{copy.paywallBadge}</span>
                                </div>
                                <h4 className="font-serif text-xl text-slate-900 mt-2">
                                  {copy.paywallTitle}
                                </h4>
                                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                  {copy.paywallDescription}
                                </p>
                                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                                  <button
                                    type="button"
                                    onClick={() => setTransactionType('untold')}
                                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                                  >
                                    <Lock className="w-4 h-4" strokeWidth={1.75} />
                                    <span>{copy.paywallButtonText} (Rp {rubrikAmount.toLocaleString('id-ID')})</span>
                                  </button>
                                  <a
                                    href={untoldWaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-slate-600 hover:text-slate-900 underline underline-offset-4 text-center sm:text-left"
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
                              Infaq Operasional &amp; Pemeliharaan Digital
                            </span>
                            <span className="text-xs text-stone-600">
                              Salurkan infaq operasional &amp; titipkan doa munajat (Dilindungi UU PDP · Opsi tampil sebagai &ldquo;Hamba Allah&rdquo; di ticker publik)
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

                {activeTab === 'barokah_doa' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[65ch] mx-auto space-y-6"
                  >
                    {renderBarokahDoaSection()}
                  </motion.div>
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
                            {estimateHaulGregorian2026(logistics.haulSchedule, site.id) && (
                              <span className="inline-block mt-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-medium">
                                {estimateHaulGregorian2026(logistics.haulSchedule, site.id)}
                              </span>
                            )}
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

                    {/* Doa & Tawasul Khusus (Menghormati Gembok Barokah Rp 5.000) */}
                    {renderBarokahDoaSection()}

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
                            onClick={() => {
                              onClose();
                              onContribute();
                            }}
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

                      {allStories.length === 0 ? (
                        <div className="p-5 rounded-2xl bg-slate-100/70 border border-slate-200 text-center">
                          <p className="text-xs sm:text-sm text-slate-600 font-serif italic">
                            Belum ada catatan peziarah yang dipublikasikan untuk makam ini. Jadilah peziarah pertama yang membagikan pengalaman ziarah atau informasi kondisi rute.
                          </p>
                        </div>
                      ) : (
                        <div className="divide-y divide-stone-200/70">
                          {allStories.map((story) => {
                            const canDelete =
                              !story.isDefault && (isCurrentUserAdmin || (currentUser && story.authorUid === currentUser.uid));
                            const storyWaUrl = buildWhatsAppCliffhangerUrl(site, story.text, copy.whatsappSharePrefix);
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
                      )}
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
                  href={getSiteGoogleMapsNavigationUrl(site)}
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

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
});
