import React, { useState, useMemo, useEffect } from 'react';
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
  Compass,
  PlusCircle,
  Lock,
  Sparkles,
  HeartHandshake,
  Copy,
  CheckCircle2,
  MessageSquareHeart,
  Loader2,
  BookOpenCheck,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { useSites } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { auth, db, handleFirestoreError, OperationType, isUserAdmin, checkAndRecordSubmissionCooldown } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { QrisPaymentCard } from '../components/QrisPaymentCard';
import { OFFICIAL_QRIS_STATIC_PAYLOAD } from '../lib/qris';
import { TransferProofUploadField } from '../components/TransferProofUploadField';
import {
  CompressedReceiptResult,
  CuratedMunajatItem,
  FALLBACK_MUNAJAT_ITEMS,
  getStoredAamiinMap,
  incrementStoredAamiin,
  saveVerifiedDonationRecord,
  submitDonationWithPrivateProof,
  useVerifiedDonationUnlock,
} from '../lib/transferProof';
import { sanitizePlainText, sanitizeDonationAmount } from '../lib/sanitize';

export interface RubrikItem {
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

export interface RubrikGateSettings {
  lockEnabled: boolean;
  freeSampleCount: number;
  minDonationAmount: number;
  bannerTitle: string;
  bannerDescription: string;
  pinnedFreeArticleIds: string[];
  customArticles: RubrikItem[];
  requireManualVerification?: boolean;
}

export const DEFAULT_RUBRIK_GATE_SETTINGS: RubrikGateSettings = {
  lockEnabled: true,
  freeSampleCount: 2,
  minDonationAmount: 10000,
  bannerTitle: 'Khazanah Kisah Rahasia, Manuskrip & Hikmah Karomah',
  bannerDescription:
    'Sebagai contoh kurasi sejarah & sanad, 2 tulisan pilihan dibuka secara gratis untuk Anda baca penuh. Seluruh naskah lainnya dikunci dalam Khazanah Khusus dan dapat dibuka dengan niat infaq jariyah untuk Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara.',
  pinnedFreeArticleIds: [
    'rubrik-ulama-3-untold',
    'rubrik-sekumpul-adab',
    'rubrik-wali-songo-strategy',
  ],
  customArticles: [],
  requireManualVerification: false,
};

const RUBRIK_DECOY_PACKAGES = [
  {
    amount: 10000,
    title: 'Infaq Pembuka Khazanah',
    badge: '',
    description: 'Membuka akses bacaan kisah ini & membantu dokumentasi jejak ulama',
  },
  {
    amount: 25000,
    title: 'Infaq Penjaga Sanad',
    badge: 'Paling Banyak Dipilih',
    description: 'Membuka SELURUH kisah rahasia, karomah & manuskrip di semua 96+ makam pada perangkat ini',
  },
  {
    amount: 50000,
    title: 'Infaq Jariyah Utama',
    badge: 'Keberkahan Utama',
    description: 'Membuka seluruh khazanah selamanya di perangkat ini + menitipkan hajat di Dinding Munajat Peziarah',
  },
] as const;

interface RubrikKisahProps {
  savedArticles?: string[];
  onToggleSaveArticle?: (id: string) => void;
  onOpenKontribusi?: () => void;
}

export const RubrikKisah: React.FC<RubrikKisahProps> = ({
  savedArticles: propSavedArticles,
  onToggleSaveArticle,
  onOpenKontribusi
}) => {
  const { sites } = useSites();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [localSaved, setLocalSaved] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('savedRubrik') || '[]');
    } catch {
      return [];
    }
  });
  const [approvedCommunityRubrik, setApprovedCommunityRubrik] = useState<RubrikItem[]>([]);
  const [activeStoryModal, setActiveStoryModal] = useState<RubrikItem | null>(null);
  const [unlockModalArticle, setUnlockModalArticle] = useState<RubrikItem | null>(null);

  // Gate & Donation state
  const [gateSettings, setGateSettings] = useState<RubrikGateSettings>(DEFAULT_RUBRIK_GATE_SETTINGS);
  const [bankDetails, setBankDetails] = useState({
    bankName: 'Bank BCA',
    accountNumber: '5470-0856-08',
    accountHolder: 'ARIF NURACHMAN HAKIM',
    qrisImageUrl: '',
    qrisPayload: OFFICIAL_QRIS_STATIC_PAYLOAD,
  });

  const {
    isUnlocked: hasDonated,
    isPendingAdmin,
    referenceCode: verifiedRefCode,
  } = useVerifiedDonationUnlock(undefined, Boolean(gateSettings.requireManualVerification));

  // Unlock modal form state
  const [selectedNominal, setSelectedNominal] = useState<number>(25000);
  const [customNominalInput, setCustomNominalInput] = useState<string>('');
  const [prayerIntent, setPrayerIntent] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank'>('QRIS');
  const [senderAccount, setSenderAccount] = useState<string>('');
  const [receipt, setReceipt] = useState<CompressedReceiptResult | null>(null);
  const [agreedToAkad, setAgreedToAkad] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [unlockSuccessState, setUnlockSuccessState] = useState<boolean>(false);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const [isSubmittingDonation, setIsSubmittingDonation] = useState<boolean>(false);

  // Recent Munajat & Aamiin ticker state
  const [recentMunajat, setRecentMunajat] = useState<CuratedMunajatItem[]>(FALLBACK_MUNAJAT_ITEMS);
  const [aamiinMap, setAamiinMap] = useState<Record<string, number>>(() => getStoredAamiinMap());

  const savedArticles = propSavedArticles ?? localSaved;
  const isAdmin = isUserAdmin(auth.currentUser);

  const handleAamiinClick = (itemId: string) => {
    setAamiinMap(incrementStoredAamiin(itemId));
  };

  const toggleSaveArticle = (id: string) => {
    if (onToggleSaveArticle) {
      onToggleSaveArticle(id);
    } else {
      setLocalSaved(prev => {
        const next = prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
        localStorage.setItem('savedRubrik', JSON.stringify(next));
        return next;
      });
    }
  };

  // Subscribe to /settings/infaq for dynamic Rubrik gate & bank configuration + recent donations for Munajat ticker
  useEffect(() => {
    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'infaq'),
      (snap) => {
        if (snap.exists()) {
          const d = snap.data();
          setBankDetails({
            bankName: d.bankName || 'Bank BCA',
            accountNumber: d.accountNumber || '5470-0856-08',
            accountHolder: d.accountHolder || 'ARIF NURACHMAN HAKIM',
            qrisImageUrl: d.qrisImageUrl || '',
            qrisPayload: d.qrisPayload || OFFICIAL_QRIS_STATIC_PAYLOAD,
          });
          if (d.rubrikGate) {
            const rg = d.rubrikGate;
            const minAmt = typeof rg.minDonationAmount === 'number' && rg.minDonationAmount >= 10000
              ? rg.minDonationAmount
              : DEFAULT_RUBRIK_GATE_SETTINGS.minDonationAmount;
            setGateSettings({
              lockEnabled: rg.lockEnabled !== undefined ? Boolean(rg.lockEnabled) : DEFAULT_RUBRIK_GATE_SETTINGS.lockEnabled,
              freeSampleCount: typeof rg.freeSampleCount === 'number' ? rg.freeSampleCount : DEFAULT_RUBRIK_GATE_SETTINGS.freeSampleCount,
              minDonationAmount: minAmt,
              bannerTitle: rg.bannerTitle || DEFAULT_RUBRIK_GATE_SETTINGS.bannerTitle,
              bannerDescription: rg.bannerDescription || DEFAULT_RUBRIK_GATE_SETTINGS.bannerDescription,
              pinnedFreeArticleIds: Array.isArray(rg.pinnedFreeArticleIds) ? rg.pinnedFreeArticleIds : DEFAULT_RUBRIK_GATE_SETTINGS.pinnedFreeArticleIds,
              customArticles: Array.isArray(rg.customArticles) ? rg.customArticles : [],
              requireManualVerification: Boolean(rg.requireManualVerification),
            });
          }
        }
      },
      () => {}
    );

    const unsubDonations = onSnapshot(
      collection(db, 'donations'),
      (snapshot) => {
        const fetched: CuratedMunajatItem[] = snapshot.docs
          .map((docSnap, idx) => {
            const d = docSnap.data();
            const ts = d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now() - idx * 60000;
            const dateLabel = d.createdAt?.toDate
              ? d.createdAt.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'Baru saja';
            return {
              id: docSnap.id,
              donorName: d.donorName || 'Hamba Allah',
              amount: Number(d.amount) || 25000,
              programTitle: d.programTitle || 'Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara',
              siteName: d.siteName || 'Khazanah Auliya Nusantara',
              doaHajat: d.doaHajat || 'Semoga menjadi amal jariyah dan wasilah keberkahan keluarga.',
              dateLabel,
              createdAtMs: ts,
              baseAamiinCount: 12 + (idx % 19),
            };
          })
          .sort((a, b) => b.createdAtMs - a.createdAtMs);

        setRecentMunajat(fetched.length > 0 ? fetched : FALLBACK_MUNAJAT_ITEMS);
      },
      () => {
        setRecentMunajat(FALLBACK_MUNAJAT_ITEMS);
      }
    );

    return () => {
      unsubSettings();
      unsubDonations();
    };
  }, []);

  // Load approved community rubrik/karomah contributions from Firestore
  useEffect(() => {
    const q = query(collection(db, 'contributions'), where('status', '==', 'approved'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: RubrikItem[] = [];
        snapshot.docs.forEach(docSnap => {
          const d = docSnap.data();
          if (d.type === 'karomah') {
            items.push({
              id: `rubrik-contrib-${docSnap.id}`,
              siteId: d.siteId || 'sunan-kalijaga',
              siteName: d.targetName || 'Tokoh Aulia Nusantara',
              location: d.city && d.province ? `${d.city}, ${d.province}` : 'Nusantara',
              category: 'Hikmah & Karomah',
              title: `Catatan Kontributor: ${d.targetName}`,
              content: d.content,
              source: `Kontribusi Peziarah (${d.contributorName || 'Hamba Allah'}) — Terverifikasi Kurator`,
              readTime: '3 mnt'
            });
          }
        });
        setApprovedCommunityRubrik(items);
      },
      () => {}
    );
    return () => unsubscribe();
  }, []);

  // Compile articles from curator custom articles, live sites data, and approved community contributions
  const articles: RubrikItem[] = useMemo(() => {
    const list: RubrikItem[] = [
      ...(gateSettings.customArticles || []),
      ...approvedCommunityRubrik
    ];

    // Add highlighted historical editorial entries near the top so they serve as compelling samples
    list.push({
      id: 'rubrik-wali-songo-strategy',
      siteId: 'wali-7',
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
      siteId: 'ulama-3',
      siteName: 'KH. Muhammad Zaini Abdul Ghani (Abah Guru Sekumpul)',
      location: 'Martapura, Kalimantan Selatan',
      category: 'Hikmah & Karomah',
      title: 'Adab Menghadiri Majelis Maulid & Keberkahan Jamuan Musafir',
      content: 'Abah Guru Sekumpul sangat memuliakan tamu dan penuntut ilmu. Selama haul dan majelis mingguan, ribuan dapur umum warga di Martapura menyajikan makanan gratis bagi siapa saja tanpa memandang status sosial. Tradisi luhur ini terus berlanjut hingga kini, membuktikan buah tarbiyah akhlak yang meresap ke dalam sanubari masyarakat Banjar.',
      source: 'Manuskrip Biografi & Kesaksian Para Habaib Martapura',
      readTime: '3 mnt'
    });

    sites.forEach(site => {
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

    return list;
  }, [sites, approvedCommunityRubrik, gateSettings.customArticles]);

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

  // Determine which articles are free samples vs locked
  // By default: the first `freeSampleCount` (e.g., 2) articles in the filtered view OR any article in `pinnedFreeArticleIds` are unlocked!
  const isAllUnlocked = !gateSettings.lockEnabled || hasDonated || isAdmin;

  const checkIsArticleUnlocked = (article: RubrikItem, indexInList: number): boolean => {
    if (isAllUnlocked) return true;
    if (gateSettings.pinnedFreeArticleIds.includes(article.id)) return true;
    if (indexInList < gateSettings.freeSampleCount) return true;
    return false;
  };

  const openUnlockModalFor = (article: RubrikItem | null) => {
    setSubmitError(null);
    setUnlockSuccessState(false);
    setReceipt(null);
    setAgreedToAkad(false);
    if (auth.currentUser?.displayName && !senderAccount) {
      setSenderAccount(auth.currentUser.displayName);
    }
    setUnlockModalArticle(article);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankDetails.accountNumber.replace(/[^0-9]/g, '') || bankDetails.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const isProofComplete = Boolean(receipt && senderAccount.trim().length >= 3);

  const activeEffectiveNominal = useMemo(() => {
    if (customNominalInput.trim()) {
      const parsed = Number(customNominalInput.replace(/[^0-9]/g, ''));
      if (Number.isFinite(parsed) && parsed >= 10000) {
        return Math.min(parsed, 1000000000);
      }
    }
    return selectedNominal;
  }, [customNominalInput, selectedNominal]);

  const handleConfirmUnlockDonation = async () => {
    if (isSubmittingDonation) return;
    setSubmitError(null);

    if (!receipt || !receipt.dataUrl) {
      setSubmitError('Wajib mengunggah foto/screenshot bukti transfer terlebih dahulu.');
      return;
    }
    if (senderAccount.trim().length < 3) {
      setSubmitError('Wajib mengisi nama pengirim sesuai bukti transfer (minimal 3 karakter).');
      return;
    }

    const cooldown = checkAndRecordSubmissionCooldown('donation', 15);
    if (!cooldown.allowed) {
      setSubmitError(`Mohon tunggu ${cooldown.remainingSeconds} detik sebelum mengirim konfirmasi berikutnya.`);
      return;
    }

    setIsSubmittingDonation(true);
    const cleanSender = sanitizePlainText(senderAccount, 80);
    const finalDonor = cleanSender || sanitizePlainText(auth.currentUser?.displayName, 100) || 'Hamba Allah';
    const cleanAmount = sanitizeDonationAmount(activeEffectiveNominal, 1000, 1000000000) || 25000;
    const cleanPrayerIntent = sanitizePlainText(prayerIntent, 200);
    const finalDoaHajat =
      cleanPrayerIntent ||
      sanitizePlainText(
        `Infaq Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara (${unlockModalArticle?.title || 'Khazanah Nusantara'})`,
        200
      );

    try {
      const donationId = await submitDonationWithPrivateProof({
        programId: 'riset-web',
        programTitle: 'Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara',
        siteId: sanitizePlainText(unlockModalArticle?.siteId, 80) || 'web-riset',
        siteName: sanitizePlainText(unlockModalArticle?.siteName, 160) || 'Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara',
        amount: cleanAmount,
        donorName: finalDonor,
        paymentMethod,
        senderAccount: cleanSender || finalDonor,
        receipt,
        doaHajat: finalDoaHajat,
      });

      saveVerifiedDonationRecord(donationId, unlockModalArticle?.siteId);
      setIsSubmittingDonation(false);
      setUnlockSuccessState(true);
    } catch (error) {
      setSubmitError('Gagal mengunggah bukti transfer ke database. Periksa koneksi internet Anda dan coba kembali.');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'donations');
      } catch {}
      setIsSubmittingDonation(false);
    }
  };

  const categories = ['Semua', 'Kisah Rahasia', 'Manuskrip', 'Hikmah & Karomah', 'Tersimpan'];
  const finalDonorForWa = (senderAccount.trim() || auth.currentUser?.displayName || 'Hamba Allah').slice(0, 100);
  const waUnlockMessage = `Assalamu'alaikum Admin Ziarah Nusantara, saya telah mengunggah Bukti Transfer Infaq Jariyah & Pembukaan Akses Khazanah:\n\n` +
    `• *Kode Referensi Bukti:* ${receipt?.referenceCode || verifiedRefCode || '-'}\n` +
    `• *Nama Pengirim:* ${finalDonorForWa}\n` +
    `• *Metode Pembayaran:* ${paymentMethod}\n` +
    `• *Nominal Infaq:* Rp ${activeEffectiveNominal.toLocaleString('id-ID')}\n` +
    `• *Program:* Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara` +
    (prayerIntent.trim() ? `\n• *Titip Doa / Hajat:* "${sanitizePlainText(prayerIntent, 200)}"` : '') +
    `\n\nScreenshot bukti transfer telah terunggah di sistem Admin Kurator. Terima kasih.`;
  const waUnlockUrl = `https://wa.me/6285717378885?text=${encodeURIComponent(waUnlockMessage)}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-24">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-950 via-brand-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-lg mb-6 relative overflow-hidden border border-emerald-900/40"
      >
        <div className="absolute right-0 top-0 -mr-10 -mt-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-gold-300 text-xs font-semibold mb-4">
              <ScrollText className="w-4 h-4" />
              <span>Rubrik Khazanah Sejarah & Manuskrip</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight mb-3">
              Rubrik Ziarah Nusantara
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
              Menghadirkan naskah manuskrip, kisah rahasia (*untold stories*), hikmah karomah, dan khazanah sejarah keilmuan para Aulia dan Ulama Nusantara.
            </p>
          </div>
          {onOpenKontribusi && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenKontribusi}
              className="self-start md:self-auto shrink-0 inline-flex items-center px-4 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded-2xl transition-all cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-4 h-4 mr-2 text-emerald-300" />
              Kirim Naskah / Karomah
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Banner Informasi Akses Donasi & 2 Tulisan Contoh Gratis */}
      {isPendingAdmin && !isAllUnlocked && (
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-300 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950">
              <p className="font-bold">Bukti Transfer Terkirim (Ref: #{verifiedRefCode}) — Menunggu Verifikasi Admin Kurator</p>
              <p className="text-amber-800 mt-0.5">
                Bukti transfer Anda sedang diperiksa oleh Admin Kurator. Halaman ini akan otomatis terbuka begitu Admin memverifikasi bukti Anda.
              </p>
            </div>
          </div>
          <a
            href={waUnlockUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold rounded-xl shrink-0 inline-flex items-center gap-1.5"
          >
            <MessageSquareHeart className="w-3.5 h-3.5" />
            Percepat via WhatsApp
          </a>
        </div>
      )}

      {gateSettings.lockEnabled && !isAllUnlocked ? (
        <div className="bg-gradient-to-br from-amber-50/90 via-white to-emerald-50/70 rounded-3xl p-5 sm:p-6 border border-amber-200/80 shadow-xs mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300/60 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>{gateSettings.freeSampleCount} Tulisan Pilihan Terbuka Gratis Sebagai Contoh</span>
            </div>
            <h2 className="text-sm sm:text-base font-serif font-black text-slate-900">
              {gateSettings.bannerTitle}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {gateSettings.bannerDescription}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0 w-full md:w-auto">
            <button
              type="button"
              onClick={() => openUnlockModalFor(filteredArticles[gateSettings.freeSampleCount] || filteredArticles[0] || null)}
              className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-2xl transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-emerald-300" />
              <span>Buka Seluruh Kisah Rahasia &amp; Niatkan Infaq</span>
            </button>
            <Link
              to="/infaq"
              className="px-4 py-2 bg-white hover:bg-slate-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold rounded-xl transition-colors text-center"
            >
              Ke Halaman Infaq &amp; Dinding Munajat →
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50/80 rounded-2xl px-4 py-3 border border-emerald-200/80 mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-emerald-900 font-semibold">
            <BookOpenCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {isAdmin
                ? 'Mode Kurator Aktif: Seluruh arsip Kisah Rahasia, Manuskrip & Karomah terbuka penuh.'
                : 'Alhamdulillah, bukti infaq Anda terverifikasi. Seluruh arsip Kisah Rahasia, Manuskrip & Karomah telah terbuka.'}
            </span>
          </div>
          {hasDonated && !isAdmin && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white text-emerald-800 border border-emerald-200 shrink-0">
              Bukti Terverifikasi {verifiedRefCode ? `(#${verifiedRefCode})` : ''}
            </span>
          )}
        </div>
      )}

      {/* Ticker Ringkas: Munajat & Infaq Peziarah Terkini */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-xs mb-6 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <MessageSquareHeart className="w-4 h-4 text-emerald-700 shrink-0" />
            <h3 className="text-xs sm:text-sm font-serif font-bold text-slate-900">
              Munajat &amp; Infaq Peziarah Terkini
            </h3>
          </div>
          <Link to="/infaq" className="text-[11px] font-semibold text-emerald-800 hover:underline">
            Lihat Dinding Munajat →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recentMunajat.slice(0, 3).map((item) => {
            const totalAamiin = (item.baseAamiinCount || 12) + (aamiinMap[item.id] || 0);
            const hasClickedAamiin = Boolean(aamiinMap[item.id]);
            return (
              <div
                key={item.id}
                className="bg-stone-50/80 rounded-2xl p-3.5 border border-stone-200/80 flex flex-col justify-between gap-2.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900 truncate">{item.donorName}</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70 shrink-0">
                      Rp {item.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 italic line-clamp-2 leading-relaxed">
                    "{item.doaHajat}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
                  <span className="text-[10px] text-stone-400 truncate max-w-[120px]">{item.dateLabel}</span>
                  <button
                    type="button"
                    onClick={() => handleAamiinClick(item.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer border ${
                      hasClickedAamiin
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    <span>Aamiin 🤲</span>
                    <span className="text-[10px] opacity-90">({totalAamiin})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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
          {filteredArticles.map((article, idx) => {
            const isSaved = savedArticles.includes(article.id);
            const isUnlocked = checkIsArticleUnlocked(article, idx);
            const hookLead = article.content.slice(0, 150);

            return (
              <article
                key={article.id}
                onClick={() => {
                  if (!isUnlocked) {
                    openUnlockModalFor(article);
                  }
                }}
                className={`bg-white rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between group relative overflow-hidden ${
                  isUnlocked
                    ? 'border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-emerald-300'
                    : 'border-amber-200/80 shadow-xs hover:shadow-md hover:border-amber-400 cursor-pointer'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-xl font-bold uppercase tracking-wider text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                        {article.category}
                      </span>
                      {isUnlocked && gateSettings.lockEnabled && !isAllUnlocked && (
                        <span className="px-2.5 py-1 rounded-xl font-bold uppercase tracking-wider text-[10px] bg-emerald-800 text-white shadow-2xs">
                          Contoh Bacaan Gratis
                        </span>
                      )}
                      {!isUnlocked && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl font-bold uppercase tracking-wider text-[10px] bg-amber-50 text-amber-900 border border-amber-200">
                          <Lock className="w-3 h-3 text-amber-700" />
                          Khazanah Khusus
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-slate-400 space-x-2 shrink-0">
                      <span className="flex items-center text-[11px] text-slate-500 font-medium">
                        <Clock className="w-3 h-3 mr-1" /> {article.readTime}
                      </span>
                      <motion.button
                        whileTap={{ scale: 1.35 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveArticle(article.id);
                        }}
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

                  {isUnlocked ? (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {article.content}
                    </p>
                  ) : (
                    <div className="relative mb-4 rounded-2xl bg-slate-50/70 p-3 border border-slate-100 overflow-hidden">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span>{hookLead}... </span>
                        <span className="blur-[4px] select-none opacity-65">
                          Kisah di balik layar, riyadhoh malam, dan pesan wasiat beliau pada bagian ini disimpan dalam Khazanah Khusus.
                        </span>
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-bold text-amber-900">
                        <span className="inline-flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-amber-700" />
                          Lembaran Rahasia &amp; Wasiat Batin Terkunci
                        </span>
                        <span className="text-emerald-800 underline">Buka Akses</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-2">
                  <span className="text-[11px] text-slate-400 italic truncate max-w-[190px]">
                    Sumber: {article.source}
                  </span>
                  {isUnlocked ? (
                    <motion.button
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStoryModal(article);
                      }}
                      className="inline-flex items-center text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
                    >
                      Baca Selengkapnya
                      <ChevronRight className="w-4 h-4 ml-0.5" />
                    </motion.button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openUnlockModalFor(article);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <Lock className="w-3 h-3 text-amber-700" />
                      <span>Buka Khazanah</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Modal Buka Akses Rubrik (3 Paket Infaq Psikologis + Titip Doa + Bukti Transfer) */}
      <AnimatePresence>
        {unlockModalArticle && (
          <div className="fixed inset-0 z-[3000] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 via-brand-900 to-teal-950 text-white relative shrink-0">
                <button
                  onClick={() => setUnlockModalArticle(null)}
                  className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                >
                  ✕
                </button>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-gold-300 text-[11px] font-bold mb-2">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Penjagaan Arsip Digital &amp; Penyebaran Riwayat Auliya Nusantara</span>
                </div>
                <h3 className="text-lg font-serif font-black leading-snug">
                  {unlockModalArticle.title}
                </h3>
                <p className="text-xs text-slate-200 mt-1">
                  {unlockModalArticle.siteName} • {unlockModalArticle.location}
                </p>
              </div>

              <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
                {unlockSuccessState ? (
                  <div className="text-center py-3">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-100 shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="inline-block text-[10px] font-bold font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 mb-2">
                      Kode Referensi Bukti: #{receipt?.referenceCode}
                    </span>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">
                      {gateSettings.requireManualVerification
                        ? 'Bukti Infaq Terkirim ke Kurator!'
                        : 'Alhamdulillah — Seluruh Khazanah Kini Terbuka!'}
                    </h4>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      {gateSettings.requireManualVerification
                        ? 'Bukti transfer Anda telah masuk ke antrean Admin Kurator. Silakan klik tombol WhatsApp di bawah untuk mempercepat pembukaan akses.'
                        : 'Jazakumullahu khairan. Infaq dan munajat Anda telah tercatat, dan seluruh naskah Kisah Rahasia, Karomah & Manuskrip kini terbuka penuh di perangkat ini.'}
                    </p>

                    {receipt && (
                      <div className="mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3 text-left">
                        <img
                          src={receipt.dataUrl}
                          alt="Bukti Transfer"
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="text-xs min-w-0">
                          <p className="font-bold text-slate-900 truncate">{finalDonorForWa} ({paymentMethod})</p>
                          <p className="text-emerald-700 font-semibold">Rp {activeEffectiveNominal.toLocaleString('id-ID')}</p>
                          <p className="text-[10px] text-slate-400">Tersimpan di Arsip Digital &amp; Dinding Munajat</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          const targetToRead = unlockModalArticle;
                          setUnlockModalArticle(null);
                          if (!gateSettings.requireManualVerification && targetToRead) {
                            setActiveStoryModal(targetToRead);
                          }
                        }}
                        className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
                      >
                        {gateSettings.requireManualVerification ? 'Selesai & Tutup' : 'Baca Naskah Lengkap Sekarang →'}
                      </button>
                      <a
                        href={waUnlockUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquareHeart className="w-4 h-4" />
                        <span>Teruskan Bukti ke WhatsApp Admin (+62 857-1737-8885)</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Kutipan Hikmah di atas form konfirmasi infaq */}
                    <div className="p-3.5 bg-gradient-to-br from-emerald-50/90 via-amber-50/60 to-white border border-emerald-200/80 rounded-2xl text-xs text-emerald-950 leading-relaxed">
                      <p className="font-serif italic text-slate-800 leading-relaxed">
                        "Siapa yang membantu menghidupkan kisah dan jejak orang-orang shalih, semoga Allah memudahkan segala hajat dunia dan akhiratnya."
                      </p>
                      <p className="text-[11px] text-emerald-800 font-semibold mt-1.5">
                        ✦ Amal Jariyah: Penjagaan Arsip Digital &amp; Penyebaran Riwayat Auliya Nusantara
                      </p>
                    </div>

                    {/* 3 Paket Pilihan Infaq Psikologis (Decoy Pricing) */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-2">
                        Pilih Paket Infaq Jariyah Pembuka Khazanah:
                      </label>
                      <div className="space-y-2.5">
                        {RUBRIK_DECOY_PACKAGES.map((pkg) => {
                          const isSelected = !customNominalInput.trim() && selectedNominal === pkg.amount;
                          const isPopular = pkg.amount === 25000;
                          return (
                            <button
                              key={pkg.amount}
                              type="button"
                              onClick={() => {
                                setSelectedNominal(pkg.amount);
                                setCustomNominalInput('');
                              }}
                              className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                                isSelected
                                  ? 'bg-emerald-50/90 border-emerald-700 ring-2 ring-emerald-600/20 shadow-xs'
                                  : isPopular
                                    ? 'bg-amber-50/40 border-amber-300/90 hover:border-emerald-600'
                                    : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/60'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs sm:text-sm font-serif font-black text-slate-900">
                                    Rp {pkg.amount.toLocaleString('id-ID')} — "{pkg.title}"
                                  </span>
                                  {pkg.badge && (
                                    <span
                                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                        isPopular
                                          ? 'bg-amber-500 text-white shadow-2xs'
                                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                      }`}
                                    >
                                      {pkg.badge}
                                    </span>
                                  )}
                                </div>
                                <span
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                    isSelected ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed">{pkg.description}</p>
                            </button>
                          );
                        })}
                      </div>

                      {/* Input Nominal Sendiri (>= Rp 10.000) */}
                      <div className="relative mt-2.5">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                          Rp
                        </span>
                        <input
                          type="number"
                          min={10000}
                          placeholder="Atau ketik nominal infaq lainnya (minimal Rp 10.000)..."
                          value={customNominalInput}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCustomNominalInput(val);
                            const num = Number(val);
                            if (Number.isFinite(num) && num >= 10000) {
                              setSelectedNominal(num);
                            }
                          }}
                          className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                        />
                      </div>
                    </div>

                    {/* Barcode QRIS Resmi Ziarah Nusantara (Dinamis mengikuti paket/nominal) */}
                    <QrisPaymentCard
                      qrisPayload={bankDetails.qrisPayload}
                      qrisImageUrl={bankDetails.qrisImageUrl}
                      selectedAmount={activeEffectiveNominal}
                      compact
                    />

                    {/* Rekening Bank BCA */}
                    <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                      <p className="text-[11px] font-bold text-slate-600 mb-2">Alternatif Transfer Rekening Bank:</p>
                      <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{bankDetails.bankName}</p>
                          <p className="text-slate-800 font-mono text-xs font-bold mt-0.5">{bankDetails.accountNumber}</p>
                          <p className="text-[10px] text-slate-500">a.n. {bankDetails.accountHolder}</p>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyAccount}
                          className="px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedBank ? (
                            <span className="text-emerald-600">Tersalin!</span>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Kolom Opsional Titip Doa / Hajat Anda */}
                    <div className="bg-stone-50/90 p-3.5 rounded-2xl border border-stone-200/90 space-y-1.5">
                      <label className="block text-xs font-bold text-stone-800">
                        Titip Doa / Hajat Anda <span className="text-stone-400 font-normal">(Opsional, maks. 200 karakter)</span>
                      </label>
                      <textarea
                        rows={2}
                        maxLength={200}
                        placeholder="Contoh: Mohon doa untuk kesembuhan orang tua & kelancaran rezeki keluarga..."
                        value={prayerIntent}
                        onChange={(e) => setPrayerIntent(e.target.value)}
                        className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 resize-none"
                      />
                    </div>

                    {/* Wajib Unggah Bukti Transfer */}
                    <TransferProofUploadField
                      paymentMethod={paymentMethod}
                      onPaymentMethodChange={setPaymentMethod}
                      senderAccount={senderAccount}
                      onSenderAccountChange={setSenderAccount}
                      receipt={receipt}
                      onReceiptChange={setReceipt}
                      agreedToAkad={agreedToAkad}
                      onAgreedToAkadChange={setAgreedToAkad}
                      accentColor="emerald"
                      requiredForUnlock
                    />

                    {submitError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-800 text-xs">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="space-y-2.5 pt-1">
                      <button
                        type="button"
                        onClick={handleConfirmUnlockDonation}
                        disabled={isSubmittingDonation || !isProofComplete}
                        className={`w-full py-3.5 font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
                          !isProofComplete
                            ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-700 via-emerald-800 to-brand-900 hover:from-emerald-800 hover:to-brand-950 text-white cursor-pointer'
                        }`}
                      >
                        {isSubmittingDonation ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Mengunggah &amp; Membuka Seluruh Khazanah...</span>
                          </>
                        ) : !isProofComplete ? (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>Unggah Bukti Transfer untuk Membuka Naskah</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Kirim Bukti Infaq &amp; Buka Seluruh Kisah Rahasia</span>
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors shrink-0 cursor-pointer"
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
                  to={`/situs/${activeStoryModal.siteId}`}
                  onClick={() => setActiveStoryModal(null)}
                  className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center"
                >
                  Buka Profil Lengkap Makam
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </Link>
                <button
                  onClick={() => setActiveStoryModal(null)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
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
