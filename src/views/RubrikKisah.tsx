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
import { auth, db, handleFirestoreError, OperationType, isUserAdmin } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { QrisPaymentCard } from '../components/QrisPaymentCard';
import { OFFICIAL_QRIS_STATIC_PAYLOAD } from '../lib/qris';
import { TransferProofUploadField } from '../components/TransferProofUploadField';
import { CompressedReceiptResult, saveVerifiedDonationRecord, useVerifiedDonationUnlock } from '../lib/transferProof';

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
  minDonationAmount: 25000,
  bannerTitle: 'Khazanah Kisah Rahasia, Manuskrip & Hikmah Karomah',
  bannerDescription:
    'Sebagai contoh kurasi sejarah & sanad, 2 tulisan pilihan dibuka secara gratis untuk Anda baca penuh. Seluruh naskah lainnya dikunci dan hanya dapat dibuka setelah Anda berinfaq serta mengunggah bukti transfer yang sah.',
  pinnedFreeArticleIds: [
    'rubrik-guru-sekumpul-untold',
    'rubrik-wali-songo-strategy',
  ],
  customArticles: [],
  requireManualVerification: false,
};

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
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank'>('QRIS');
  const [senderAccount, setSenderAccount] = useState<string>('');
  const [receipt, setReceipt] = useState<CompressedReceiptResult | null>(null);
  const [agreedToAkad, setAgreedToAkad] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [unlockSuccessState, setUnlockSuccessState] = useState<boolean>(false);
  const [copiedBank, setCopiedBank] = useState<boolean>(false);
  const [isSubmittingDonation, setIsSubmittingDonation] = useState<boolean>(false);

  const savedArticles = propSavedArticles ?? localSaved;
  const isAdmin = isUserAdmin(auth.currentUser);

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

  // Subscribe to /settings/infaq for dynamic Rubrik gate & bank configuration
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
            const minAmt = typeof rg.minDonationAmount === 'number' ? rg.minDonationAmount : DEFAULT_RUBRIK_GATE_SETTINGS.minDonationAmount;
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
            setSelectedNominal(minAmt);
          }
        }
      },
      () => {}
    );
    return () => unsubSettings();
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

    setIsSubmittingDonation(true);
    const finalDonor = (senderAccount.trim() || auth.currentUser?.displayName || 'Hamba Allah').slice(0, 100);
    const donationRef = doc(collection(db, 'donations'));

    try {
      await setDoc(donationRef, {
        id: donationRef.id,
        programId: 'riset-web',
        programTitle: 'Riset Sejarah, Perluasan Database & Operasional Web (Pembuka Rubrik)',
        siteId: unlockModalArticle?.siteId || 'web-riset',
        siteName: unlockModalArticle?.siteName || 'Riset Database & Operasional Web',
        amount: selectedNominal,
        donorName: finalDonor,
        paymentMethod,
        senderAccount: senderAccount.trim().slice(0, 80),
        proofImageUrl: receipt.dataUrl,
        referenceCode: receipt.referenceCode,
        doaHajat: `Infaq Riset & Pembukaan Arsip Rubrik (${unlockModalArticle?.title || 'Khazanah Nusantara'})`,
        authorUid: auth.currentUser?.uid || 'guest',
        status: 'confirmed',
        createdAt: serverTimestamp(),
      });

      saveVerifiedDonationRecord(donationRef.id, unlockModalArticle?.siteId);
      setIsSubmittingDonation(false);
      setUnlockSuccessState(true);
    } catch (error) {
      setSubmitError('Gagal mengunggah bukti transfer ke database. Periksa koneksi internet Anda dan coba kembali.');
      try {
        handleFirestoreError(error, OperationType.CREATE, `donations/${donationRef.id}`);
      } catch {}
      setIsSubmittingDonation(false);
    }
  };

  const categories = ['Semua', 'Kisah Rahasia', 'Manuskrip', 'Hikmah & Karomah', 'Tersimpan'];
  const finalDonorForWa = (senderAccount.trim() || auth.currentUser?.displayName || 'Hamba Allah').slice(0, 100);
  const waUnlockMessage = `Assalamu'alaikum Admin Ziarah Nusantara, saya telah mengunggah Bukti Transfer Infaq Riset & Pembukaan Akses Rubrik:\n\n` +
    `• *Kode Referensi Bukti:* ${receipt?.referenceCode || verifiedRefCode || '-'}\n` +
    `• *Nama Pengirim:* ${finalDonorForWa}\n` +
    `• *Metode Pembayaran:* ${paymentMethod}\n` +
    `• *Nominal Infaq:* Rp ${selectedNominal.toLocaleString('id-ID')}\n` +
    `• *Program:* Riset Sejarah, Perluasan Database & Operasional Web\n\n` +
    `Screenshot bukti transfer telah terunggah di sistem Admin Kurator. Terima kasih.`;
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
              <span>Donasi & Unggah Bukti Transfer</span>
            </button>
            <Link
              to="/infaq"
              className="px-4 py-2 bg-white hover:bg-slate-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold rounded-xl transition-colors text-center"
            >
              Ke Halaman Infaq Riset →
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
                : 'Alhamdulillah, bukti transfer Anda terverifikasi. Seluruh arsip Kisah Rahasia, Manuskrip & Karomah telah terbuka.'}
            </span>
          </div>
          {hasDonated && !isAdmin && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white text-emerald-800 border border-emerald-200 shrink-0">
              Bukti Terverifikasi {verifiedRefCode ? `(#${verifiedRefCode})` : ''}
            </span>
          )}
        </div>
      )}

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
            const hookLead = article.content.slice(0, 68);

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
                          Khusus Donatur
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
                        title={isSaved ? "Hapus dari simpanan" : "Simpan rubrik (Sinkron Akun)"}
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
                          Isi lengkap naskah sejarah, sanad, dan hikmah karomah ini terkunci oleh sistem verifikasi donasi. Selesaikan infaq riset dan unggah bukti transfer untuk membuka seluruh arsip.
                        </span>
                      </p>
                      <div className="mt-2.5 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-bold text-amber-900">
                        <span className="inline-flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-amber-700" />
                          Terkunci — Wajib Donasi & Bukti Transfer
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
                      <span>Infaq & Bukti Transfer</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Modal Buka Akses Rubrik (Donasi / Infaq Riset + Bukti Transfer Wajib) */}
      <AnimatePresence>
        {unlockModalArticle && (
          <div className="fixed inset-0 z-[3000] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-md w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-900 via-brand-900 to-teal-950 text-white relative shrink-0">
                <button
                  onClick={() => setUnlockModalArticle(null)}
                  className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/15 rounded-full transition-colors cursor-pointer"
                >
                  ✕
                </button>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-gold-300 text-[11px] font-bold mb-2">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Verifikasi Infaq & Bukti Transfer</span>
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
                        ? 'Bukti Transfer Terkirim ke Kurator!'
                        : 'Bukti Transfer Terverifikasi — Naskah Terbuka!'}
                    </h4>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      {gateSettings.requireManualVerification
                        ? 'Bukti transfer Anda telah masuk ke antrean Admin Kurator. Silakan klik tombol WhatsApp di bawah untuk mempercepat pembukaan akses.'
                        : 'Jazakumullahu khairan. Bukti transfer Anda telah tersimpan di database Kurator dan seluruh naskah Rubrik kini dapat Anda baca penuh.'}
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
                          <p className="text-emerald-700 font-semibold">Rp {selectedNominal.toLocaleString('id-ID')}</p>
                          <p className="text-[10px] text-slate-400">Bukti tersimpan di Database Admin</p>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2.5">
                      <a
                        href={waUnlockUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageSquareHeart className="w-4 h-4" />
                        <span>Teruskan Bukti ke WhatsApp Admin (+62 857-1737-8885)</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          const targetToRead = unlockModalArticle;
                          setUnlockModalArticle(null);
                          if (!gateSettings.requireManualVerification && targetToRead) {
                            setActiveStoryModal(targetToRead);
                          }
                        }}
                        className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all cursor-pointer"
                      >
                        {gateSettings.requireManualVerification ? 'Selesai & Tutup' : 'Baca Naskah Lengkap Sekarang →'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-xs text-amber-950 leading-relaxed">
                      <p className="font-bold mb-1">Ketentuan Membuka Naskah Terkunci:</p>
                      <p>
                        Naskah ini tidak dapat dibuka sebelum Anda melakukan <strong>Infaq Riset</strong> (via QRIS atau Transfer Bank) dan <strong>mengunggah screenshot bukti transfer yang sah</strong> pada formulir di bawah ini.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Pilih Nominal Infaq Pembuka Seluruh Arsip:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[15000, 25000, 50000, 100000].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setSelectedNominal(amt)}
                            className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              selectedNominal === amt
                                ? 'bg-emerald-800 text-white border-emerald-800 shadow-2xs'
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                            }`}
                          >
                            Rp {amt.toLocaleString('id-ID')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Barcode QRIS Resmi Ziarah Nusantara */}
                    <QrisPaymentCard
                      qrisPayload={bankDetails.qrisPayload}
                      qrisImageUrl={bankDetails.qrisImageUrl}
                      selectedAmount={selectedNominal}
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
                            <span>Mengunggah & Memverifikasi Bukti Transfer...</span>
                          </>
                        ) : !isProofComplete ? (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>Unggah Bukti Transfer untuk Membuka Naskah</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Kirim Bukti Transfer & Buka Seluruh Naskah</span>
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
                  to={`/makam/${activeStoryModal.siteId}`}
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
