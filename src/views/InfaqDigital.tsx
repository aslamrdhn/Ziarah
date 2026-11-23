import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartHandshake, 
  Building2, 
  Droplets, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Copy,
  Loader2,
  MessageSquareHeart,
  Database,
  Lock,
  AlertCircle,
  Heart,
  Download
} from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType, checkAndRecordSubmissionCooldown } from '../lib/firebase';
import { collection, doc, onSnapshot, query, where, limit } from 'firebase/firestore';
import { QrisPaymentCard } from '../components/QrisPaymentCard';
import { MIN_DONATION_AMOUNT, OFFICIAL_QRIS_STATIC_PAYLOAD } from '../lib/qris';
import { TransferProofUploadField } from '../components/TransferProofUploadField';
import {
  CompressedReceiptResult,
  CuratedMunajatItem,
  GENERAL_MUNAJAT_PRAYERS,
  getStoredAamiinMap,
  incrementStoredAamiin,
  saveVerifiedDonationRecord,
  submitDonationWithPrivateProof,
} from '../lib/transferProof';
import { sanitizePlainText, sanitizeDonationAmount } from '../lib/sanitize';
import { useSiteCopy } from '../lib/siteCopy';
import { renderPersonalMunajatCard, type MunajatCardPaletteId } from '../lib/munajatCardCanvas';
import {
  DEFAULT_DONATION_TIERS,
  DEFAULT_WHATSAPP_TEMPLATE,
  type DonationTier,
  normalizeDonationTiers,
  normalizeWhatsappNumber,
  buildWhatsappConfirmUrl,
} from '../lib/infaqConfig';

interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  programTitle: string;
  siteName: string;
  doaHajat: string;
  dateLabel: string;
  createdAtMs: number;
  baseAamiinCount?: number;
}

export interface InfaqProgramItem {
  id: string;
  title: string;
  desc: string;
  tag: string;
  iconName: 'Database' | 'Building2' | 'Droplets' | 'Users' | 'BookOpen' | 'HeartHandshake';
  color: string;
}

export const DEFAULT_INFAQ_PROGRAMS: InfaqProgramItem[] = [
  {
    id: 'riset-web',
    title: 'Infaq Operasional & Pemeliharaan Digital Arsip Auliya Nusantara',
    desc: 'Infaq Operasional & Pemeliharaan Digital untuk perawatan server ensiklopedia sejarah, domain, penyimpanan foto cagar budaya, verifikasi sanad keilmuan, serta penyebaran riwayat para Wali dan Ulama Nusantara.',
    iconName: 'Database',
    color: 'from-emerald-600 to-brand-900',
    tag: 'Infaq Operasional Utama',
  },
  {
    id: 'dokumentasi-sanad',
    title: 'Dokumentasi Sejarah, Sanad & Literatur Pesantren',
    desc: 'Mendukung digitalisasi referensi kitab manaqib, babad pesantren, verifikasi jadwal haul tahunan, serta dokumentasi fotografi maqbarah di 34 provinsi.',
    iconName: 'BookOpen',
    color: 'from-emerald-700 to-teal-900',
    tag: 'Literasi & Sanad',
  },
  {
    id: 'peta-panduan-doa',
    title: 'Pengembangan Peta Interaktif & Panduan Doa Ziarah',
    desc: 'Pemeliharaan fitur peta navigasi ziarah seluruh Nusantara, kurasi lafaz tawassul Arab-Latin yang sahih, serta akses panduan Yasin, Tahlil, dan Tasbih Digital gratis bagi jamaah.',
    iconName: 'HeartHandshake',
    color: 'from-teal-700 to-emerald-950',
    tag: 'Layanan Jamaah',
  },
];

export function sanitizeInfaqPrograms(rawPrograms?: InfaqProgramItem[] | null): InfaqProgramItem[] {
  if (!Array.isArray(rawPrograms) || rawPrograms.length === 0) {
    return DEFAULT_INFAQ_PROGRAMS;
  }
  const removedIds = new Set(['pemeliharaan', 'kebersihan', 'dhuafa', 'kitab']);
  const cleaned = rawPrograms
    .filter((p) => {
      if (!p || !p.id || removedIds.has(p.id)) return false;
      const titleLower = String(p.title || '').toLowerCase();
      const descLower = String(p.desc || '').toLowerCase();
      if (titleLower.includes('program kebaikan baru')) return false;
      if (descLower.includes('tuliskan deskripsi program')) return false;
      return true;
    })
    .map((p) => {
      if (p.id === 'riset-web') {
        return DEFAULT_INFAQ_PROGRAMS[0];
      }
      return {
        ...p,
        title: String(p.title || '').replace(/wakaf/gi, 'Infaq'),
        desc: String(p.desc || '').replace(/wakaf/gi, 'infaq'),
        tag: String(p.tag || 'Program Infaq').replace(/wakaf/gi, 'Infaq'),
      };
    });

  if (cleaned.length === 0) {
    return DEFAULT_INFAQ_PROGRAMS;
  }
  // Ensure the 3 core curated programs are present if only riset-web was stored in legacy Firestore doc
  if (cleaned.length === 1 && cleaned[0].id === 'riset-web') {
    return DEFAULT_INFAQ_PROGRAMS;
  }
  return cleaned;
}

interface InfaqSettings {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisImageUrl: string;
  qrisPayload: string;
  programs: InfaqProgramItem[];
  donationTiers: DonationTier[];
  whatsappConfirmNumber: string;
  whatsappMessageTemplate: string;
}

const DEFAULT_INFAQ_SETTINGS: InfaqSettings = {
  bankName: 'Bank BCA',
  accountNumber: '5470-0856-08',
  accountHolder: 'ARIF NURACHMAN HAKIM',
  qrisImageUrl: '',
  qrisPayload: OFFICIAL_QRIS_STATIC_PAYLOAD,
  programs: DEFAULT_INFAQ_PROGRAMS,
  donationTiers: DEFAULT_DONATION_TIERS,
  whatsappConfirmNumber: '',
  whatsappMessageTemplate: DEFAULT_WHATSAPP_TEMPLATE,
};

const ICON_MAP = {
  Database,
  Building2,
  Droplets,
  Users,
  BookOpen,
  HeartHandshake,
};

const LOCAL_MUNAJAT_STORAGE_KEY = 'zn_local_munajat_items';

export const InfaqDigital: React.FC = () => {
  const { copy } = useSiteCopy();
  const location = useLocation();
  const [selectedProgram, setSelectedProgram] = useState<string>('riset-web');

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      (location.hash === '#lembar-munajat' || location.hash === '#lembar-munajat-pribadi')
    ) {
      const scrollTimer = window.setTimeout(() => {
        document
          .getElementById('lembar-munajat')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
      return () => window.clearTimeout(scrollTimer);
    }
  }, [location.hash]);
  const [selectedSiteId, setSelectedSiteId] = useState<string>('web-riset');
  const [nominal, setNominal] = useState<number>(DEFAULT_DONATION_TIERS[0].amount);
  const [isCustomBankMode, setIsCustomBankMode] = useState<boolean>(false);
  const [customNominal, setCustomNominal] = useState<string>('');
  const [minAmountWarning, setMinAmountWarning] = useState<boolean>(false);
  const [donorName, setDonorName] = useState<string>('');

  const [isAnonim, setIsAnonim] = useState<boolean>(false);
  const [doaHajat, setDoaHajat] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank'>('QRIS');
  const [senderAccount, setSenderAccount] = useState<string>('');
  const [receipt, setReceipt] = useState<CompressedReceiptResult | null>(null);
  const [agreedToAkad, setAgreedToAkad] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmittedReceipt, setLastSubmittedReceipt] = useState<CompressedReceiptResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const [infaqSettings, setInfaqSettings] = useState<InfaqSettings>(DEFAULT_INFAQ_SETTINGS);
  const [recentDonations, setRecentDonations] = useState<DonationRecord[]>([]);
  const [aamiinMap, setAamiinMap] = useState<Record<string, number>>(() => getStoredAamiinMap());
  const [recentAamiinId, setRecentAamiinId] = useState<string | null>(null);

  // Personal Munajat Card Generator State
  const MUNAJAT_THEMES = [
    { id: 'orang-tua', chip: 'Orang Tua / Ahli Kubur', label: 'Hadiah Al-Fatihah Orang Tua' },
    { id: 'ketenangan', chip: 'Ketenangan Hati', label: 'Ketenangan Batin' },
    { id: 'usaha', chip: 'Kelapangan Usaha', label: 'Kelapangan Rezeki' },
    { id: 'kesembuhan', chip: 'Kesembuhan', label: "Kesembuhan (Syifa')" },
  ] as const;

  const MUNAJAT_SWATCHES: Array<{
    id: MunajatCardPaletteId;
    label: string;
    hex: string;
    frameClass: string;
    paperClass: string;
  }> = [
    { id: 'midnight', label: 'Midnight', hex: '#16181A', frameClass: 'bg-[#16181A]', paperClass: 'bg-[#FAF8F5]' },
    { id: 'deep-pine', label: 'Deep Pine', hex: '#163326', frameClass: 'bg-[#163326]', paperClass: 'bg-[#FAF8F5]' },
    { id: 'warm-stone', label: 'Warm Stone', hex: '#EDEBE6', frameClass: 'bg-[#EDEBE6]', paperClass: 'bg-white' },
  ];

  const [personalRecipientName, setPersonalRecipientName] = useState<string>('');
  const [personalThemeId, setPersonalThemeId] = useState<string>('orang-tua');
  const [personalCardPalette, setPersonalCardPalette] = useState<MunajatCardPaletteId>('deep-pine');
  const [personalPrayerText, setPersonalPrayerText] = useState<string>('');
  const [syncWithInfaqDoa, setSyncWithInfaqDoa] = useState<boolean>(true);
  const [isGeneratingCard, setIsGeneratingCard] = useState<boolean>(false);

  // Direct Dinding Munajat form state (allows visitors to post a prayer/hajat directly)
  const [munajatWallName, setMunajatWallName] = useState<string>('');
  const [munajatWallSite, setMunajatWallSite] = useState<string>('Wasilah Auliya Nusantara');
  const [munajatWallText, setMunajatWallText] = useState<string>('');
  const [munajatWallSubmitted, setMunajatWallSubmitted] = useState<boolean>(false);
  const [localMunajatList, setLocalMunajatList] = useState<CuratedMunajatItem[]>(() => {
    try {
      const raw = localStorage.getItem(LOCAL_MUNAJAT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const activeMunajatTheme =
    MUNAJAT_THEMES.find((t) => t.id === personalThemeId) || MUNAJAT_THEMES[0];
  const activeSwatch =
    MUNAJAT_SWATCHES.find((s) => s.id === personalCardPalette) || MUNAJAT_SWATCHES[1];

  const todayIndonesianLabel = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePersonalPrayerChange = (val: string) => {
    const clean = val.slice(0, 220);
    setPersonalPrayerText(clean);
    if (syncWithInfaqDoa) {
      setDoaHajat(clean.slice(0, 200));
    }
  };

  const handleDownloadMunajatCard = async () => {
    if (isGeneratingCard) return;
    setIsGeneratingCard(true);
    try {
      const dataUrl = await renderPersonalMunajatCard({
        recipientName: personalRecipientName.trim() || 'Hamba Allah & Keluarga',
        prayerText:
          personalPrayerText.trim() ||
          'Ya Allah, ampunilah khilaf orang tua dan keluarga kami, lapangkanlah hati kami dalam ketaatan, dan mudahkanlah setiap ikhtiar yang halal dan berkah.',
        themeLabel: activeMunajatTheme.label,
        createdDateLabel: todayIndonesianLabel,
        cardPalette: personalCardPalette,
      });
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'lembar-munajat-ziarah-nusantara.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setIsGeneratingCard(false);
    }
  };

  const handleForwardToMunajatWallAndInfaq = () => {
    const cleanPrayer = sanitizePlainText(
      personalPrayerText.trim() ||
        'Ya Allah, ampunilah khilaf orang tua dan keluarga kami, lapangkanlah hati kami dalam ketaatan, dan mudahkanlah setiap ikhtiar yang halal dan berkah.',
      200
    );
    setDoaHajat(cleanPrayer);
    setMunajatWallText(cleanPrayer);
    if (!personalRecipientName.trim()) {
      setIsAnonim(true);
    } else if (!munajatWallName.trim()) {
      setMunajatWallName(personalRecipientName.trim().slice(0, 80));
    }
    const infaqPanel = document.getElementById('panel-infaq-dukungan');
    if (infaqPanel) {
      infaqPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAamiinClick = (itemId: string) => {
    setAamiinMap(incrementStoredAamiin(itemId));
    setRecentAamiinId(itemId);
  };

  const handleDirectMunajatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanText = sanitizePlainText(munajatWallText, 240);
    if (cleanText.length < 5) return;
    const cleanName = sanitizePlainText(munajatWallName, 80) || 'Hamba Allah';
    const newEntry: CuratedMunajatItem = {
      id: `local-munajat-${Date.now()}`,
      donorName: cleanName,
      amount: 0,
      programTitle: 'Munajat & Doa Bersama Peziarah',
      siteName: sanitizePlainText(munajatWallSite, 120) || 'Wasilah Auliya Nusantara',
      doaHajat: cleanText,
      dateLabel: 'Baru saja',
      createdAtMs: Date.now(),
      baseAamiinCount: 1,
    };
    const updated = [newEntry, ...localMunajatList].slice(0, 20);
    setLocalMunajatList(updated);
    try {
      localStorage.setItem(LOCAL_MUNAJAT_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
    setMunajatWallText('');
    setMunajatWallSubmitted(true);
    setTimeout(() => setMunajatWallSubmitted(false), 4000);
  };

  // Pre-fill donor name if logged in
  useEffect(() => {
    if (auth.currentUser?.displayName) {
      if (!donorName) setDonorName(auth.currentUser.displayName);
      if (!senderAccount) setSenderAccount(auth.currentUser.displayName);
    }
  }, []);

  // Load configurable Bank, QRIS & Programs settings from Firestore (/settings/infaq)
  useEffect(() => {
    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'infaq'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const loadedPrograms = sanitizeInfaqPrograms(data.programs);
          const loadedTiers = normalizeDonationTiers(data.donationTiers);
          const loadedWaNumber = normalizeWhatsappNumber(data.whatsappConfirmNumber);
          const loadedWaTemplate =
            typeof data.whatsappMessageTemplate === 'string' && data.whatsappMessageTemplate.trim()
              ? data.whatsappMessageTemplate.trim()
              : DEFAULT_WHATSAPP_TEMPLATE;

          setInfaqSettings({
            bankName: data.bankName || DEFAULT_INFAQ_SETTINGS.bankName,
            accountNumber: data.accountNumber || DEFAULT_INFAQ_SETTINGS.accountNumber,
            accountHolder: data.accountHolder || DEFAULT_INFAQ_SETTINGS.accountHolder,
            qrisImageUrl: data.qrisImageUrl || '',
            qrisPayload: data.qrisPayload || OFFICIAL_QRIS_STATIC_PAYLOAD,
            programs: loadedPrograms,
            donationTiers: loadedTiers,
            whatsappConfirmNumber: loadedWaNumber,
            whatsappMessageTemplate: loadedWaTemplate,
          });
          setNominal((prev) => {
            if (loadedTiers.some((t) => t.amount === prev)) return prev;
            return loadedTiers[0].amount;
          });
          setSelectedProgram((prev) =>
            loadedPrograms.some((p: InfaqProgramItem) => p.id === prev)
              ? prev
              : loadedPrograms[0].id
          );
        }
      },
      () => {}
    );

    const unsubDonations = onSnapshot(
      query(collection(db, 'donations'), where('status', 'in', ['confirmed', 'verified']), limit(50)),
      (snapshot) => {
        const list: DonationRecord[] = snapshot.docs
          .filter((docSnap) => {
            const d = docSnap.data();
            return d.status === 'verified' || d.status === 'confirmed';
          })
          .map((docSnap, idx) => {
            const d = docSnap.data();
            const ts = d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now() - idx * 60000;
            const dateLabel = d.createdAt?.toDate
              ? d.createdAt.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'Baru saja';
            return {
              id: docSnap.id,
              donorName: d.isAnonymous ? 'Hamba Allah' : (d.donorName || 'Hamba Allah'),
              amount: Number(d.amount) || 0,
              programTitle: d.programTitle || 'Infaq Operasional & Pemeliharaan Digital Arsip Auliya Nusantara',
              siteName: d.siteName || 'Khazanah Auliya Nusantara',
              doaHajat: d.doaHajat || 'Semoga menjadi amal kebaikan dan wasilah keberkahan keluarga.',
              dateLabel,
              createdAtMs: ts,
              baseAamiinCount: Number(d.aamiinCount) || 0,
            };
          });
        list.sort((a, b) => b.createdAtMs - a.createdAtMs);
        setRecentDonations(list);
      },
      (err) => {
        handleFirestoreError(err, OperationType.GET, 'donations');
      }
    );

    return () => {
      unsubSettings();
      unsubDonations();
    };
  }, []);

  const programs = infaqSettings.programs;
  const donationTiers = infaqSettings.donationTiers;
  const selectedTier =
    donationTiers.find((t) => t.amount === nominal) ||
    donationTiers[0] ||
    DEFAULT_DONATION_TIERS[0];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/[^0-9]/g, '') || text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const parsedCustomBankAmount = customNominal
    ? sanitizeDonationAmount(customNominal, MIN_DONATION_AMOUNT, 1000000000)
    : null;

  const currentAmount = isCustomBankMode
    ? Math.max(MIN_DONATION_AMOUNT, parsedCustomBankAmount || selectedTier.amount)
    : selectedTier.amount;

  const handleCustomNominalChange = (rawVal: string) => {
    const digits = rawVal.replace(/[^0-9]/g, '');
    if (!digits) {
      setCustomNominal('');
      setMinAmountWarning(false);
      return;
    }
    const parsed = parseInt(digits, 10);
    if (parsed < MIN_DONATION_AMOUNT) {
      setMinAmountWarning(true);
      setCustomNominal(String(MIN_DONATION_AMOUNT));
    } else {
      setMinAmountWarning(false);
      setCustomNominal(String(Math.min(parsed, 1000000000)));
    }
  };

  const targetSiteName = selectedSiteId === 'web-riset'
    ? 'Infaq Operasional & Pemeliharaan Digital Arsip Auliya Nusantara'
    : 'Umum (Disalurkan untuk Operasional & Dokumentasi Makam)';
  const activeProgramTitle =
    programs.find(p => p.id === selectedProgram)?.title ||
    programs[0]?.title ||
    'Infaq Operasional & Pemeliharaan Digital Arsip Auliya Nusantara';

  const cleanSender = sanitizePlainText(senderAccount, 80);
  const cleanDonor = sanitizePlainText(donorName, 100);
  const effectiveSender =
    cleanSender.length >= 2
      ? cleanSender
      : cleanDonor.length >= 2
        ? cleanDonor
        : 'Hamba Allah';
  const isProofComplete = Boolean(receipt && receipt.dataUrl && agreedToAkad);

  const handleBayar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount < MIN_DONATION_AMOUNT || isSubmitting) return;
    setSubmitError(null);

    if (!receipt || !receipt.dataUrl) {
      setSubmitError('Wajib mengunggah screenshot / foto bukti transfer terlebih dahulu.');
      return;
    }
    if (!agreedToAkad) {
      setSubmitError('Mohon centang persetujuan akad Infaq Operasional & kebijakan privasi (UU PDP).');
      return;
    }

    const cooldown = checkAndRecordSubmissionCooldown('donation', 15);
    if (!cooldown.allowed) {
      setSubmitError(`Mohon tunggu ${cooldown.remainingSeconds} detik sebelum mengirim konfirmasi donasi berikutnya.`);
      return;
    }

    setIsSubmitting(true);

    const finalDonorName = isAnonim
      ? 'Hamba Allah'
      : cleanDonor || cleanSender || 'Hamba Allah';
    const cleanDoaHajat = sanitizePlainText(doaHajat, 200);

    try {
      const donationId = await submitDonationWithPrivateProof({
        programId: sanitizePlainText(selectedProgram, 100),
        programTitle: sanitizePlainText(activeProgramTitle, 150),
        siteId: sanitizePlainText(selectedSiteId, 128),
        siteName: sanitizePlainText(targetSiteName, 150),
        amount: currentAmount,
        donorName: finalDonorName,
        paymentMethod,
        senderAccount: effectiveSender,
        receipt,
        doaHajat: cleanDoaHajat,
        isAnonymous: isAnonim,
        showPublicly: !isAnonim,
        consentAkad: true,
        consentVersion: '2026-11-23',
        consentAt: new Date().toISOString(),
      });
      saveVerifiedDonationRecord(donationId, selectedSiteId);
      setLastSubmittedReceipt(receipt);
      setIsSuccessModal(true);
      setDoaHajat('');
      setReceipt(null);
      setAgreedToAkad(false);
    } catch (error) {
      console.error('Error recording infaq in Firestore:', error);
      setSubmitError('Gagal mengunggah bukti transfer ke database. Periksa koneksi internet Anda dan coba kembali.');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'donations');
      } catch {
        // Structured log emitted
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedMunajatList: CuratedMunajatItem[] = [
    ...localMunajatList,
    ...recentDonations.map((d) => ({
      ...d,
      baseAamiinCount: d.baseAamiinCount ?? 0,
    })),
  ];

  const totalTerkumpul = recentDonations.reduce((acc, item) => acc + item.amount, 0);

  const finalDonorDisplay = isAnonim ? 'Hamba Allah' : (donorName.trim() || senderAccount.trim() || 'Hamba Allah');
  const activeRefCode = lastSubmittedReceipt?.referenceCode || receipt?.referenceCode || '-';
  const waConfirmUrl = buildWhatsappConfirmUrl({
    whatsappNumber: infaqSettings.whatsappConfirmNumber,
    donorName: finalDonorDisplay,
    amount: isCustomBankMode
      ? parsedCustomBankAmount || undefined
      : currentAmount,
    programTitle: activeProgramTitle,
    siteName: targetSiteName,
    bankName: infaqSettings.bankName,
    accountNumber: infaqSettings.accountNumber,
    template: infaqSettings.whatsappMessageTemplate,
  });

  const waSuccessModalUrl = infaqSettings.whatsappConfirmNumber
    ? buildWhatsappConfirmUrl({
        whatsappNumber: infaqSettings.whatsappConfirmNumber,
        donorName: `${finalDonorDisplay} (Ref #${activeRefCode})`,
        amount: currentAmount,
        programTitle: activeProgramTitle,
        siteName: targetSiteName,
        bankName: infaqSettings.bankName,
        accountNumber: infaqSettings.accountNumber,
        template: infaqSettings.whatsappMessageTemplate,
      })
    : null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-28">
      {/* Header Banner — Solid Dark Apple Contrast */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ backgroundColor: '#111214', color: '#F5F5F7' }}
        className="rounded-[28px] p-7 sm:p-11 border border-white/10 shadow-xl mb-8 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full text-[#6EE7B7] text-xs font-semibold mb-4">
              <HeartHandshake className="w-4 h-4" />
              <span>Infaq Operasional &amp; Pemeliharaan Digital</span>
            </div>
            <h1
              style={{ color: '#F5F5F7' }}
              className="apple-headline text-2xl sm:text-4xl font-semibold tracking-tight mb-3"
            >
              {copy.infaqTitle}
            </h1>
            <p
              style={{ color: '#D2D2D7' }}
              className="text-xs sm:text-sm md:text-base leading-relaxed"
            >
              {copy.infaqSubtitle}
            </p>
          </div>
          {recentDonations.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shrink-0 min-w-[200px]">
              <p className="text-[11px] uppercase tracking-wider text-[#6EE7B7] font-bold mb-1">Total Infaq (50 Konfirmasi Terakhir)</p>
              <p style={{ color: '#F5F5F7' }} className="text-xl sm:text-2xl font-serif font-black">Rp {totalTerkumpul.toLocaleString('id-ID')}</p>
              <p style={{ color: '#D2D2D7' }} className="text-[11px] mt-0.5">Dari {recentDonations.length} konfirmasi munfiq / peziarah</p>
            </div>
          )}
        </div>
      </motion.div>

      <div id="panel-infaq-dukungan" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 scroll-mt-24">
        {/* Kolom Kiri: Form Pilihan */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* 1. Pilih Program Infaq */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5 flex items-center">
              <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center mr-2.5">1</span>
              Pilih Program Infaq Operasional &amp; Pemeliharaan Digital
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {programs.map((p, idx) => {
                const Icon = ICON_MAP[p.iconName as keyof typeof ICON_MAP] || HeartHandshake;
                const isSelected = selectedProgram === p.id;
                const isPrimaryTop = idx === 0;
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    whileHover={{ y: -3, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onClick={() => {
                      setSelectedProgram(p.id);
                      if (p.id === 'riset-web') {
                        setSelectedSiteId('web-riset');
                      } else if (selectedSiteId === 'web-riset') {
                        setSelectedSiteId('all');
                      }
                    }}
                    className={`text-left p-4 sm:p-5 rounded-2xl border transition-colors relative flex flex-col justify-between cursor-pointer ${
                      isPrimaryTop ? 'sm:col-span-2' : ''
                    } ${
                      isSelected 
                        ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20 shadow-xs' 
                        : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${p.color || 'from-emerald-600 to-teal-800'} text-white flex items-center justify-center shadow-xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                          isPrimaryTop
                            ? 'bg-emerald-800 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.tag}
                        </span>
                      </div>
                      <h3 className={`font-bold text-slate-900 mb-1 ${isPrimaryTop ? 'text-sm sm:text-base' : 'text-sm'}`}>
                        {p.title}
                      </h3>
                      <p className={`text-xs text-slate-600 leading-relaxed ${isPrimaryTop ? '' : 'line-clamp-2'}`}>
                        {p.desc}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* 2. Pilih Destinasi Makam */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/70 shadow-2xs">
            <h2 className="text-sm sm:text-base font-serif text-stone-900 mb-3 flex items-center">
              <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center mr-2.5">2</span>
              Tujuan Alokasi Infaq Operasional &amp; Pemeliharaan Digital
            </h2>
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-xl text-stone-800 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="web-riset">Infaq Operasional &amp; Pemeliharaan Digital Arsip Auliya Nusantara</option>
              <option value="all">Umum (Disalurkan untuk Operasional &amp; Dokumentasi Makam)</option>
            </select>
            <p className="text-[11px] text-stone-500 mt-2">
              {copy.infaqTransparencyNote}
            </p>
          </div>

          {/* 3. Pilih Nominal */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/70 shadow-2xs">
            <h2 className="text-sm sm:text-base font-serif text-stone-900 mb-3.5 flex items-center">
              <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center mr-2.5">3</span>
              Pilih Nominal Pasti Infaq QRIS
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
              {donationTiers.map((tier, idx) => {
                const isSelected = !isCustomBankMode && selectedTier.amount === tier.amount;
                return (
                  <button
                    key={`${tier.amount}-${idx}`}
                    type="button"
                    onClick={() => {
                      setNominal(tier.amount);
                      setIsCustomBankMode(false);
                      setCustomNominal('');
                      setMinAmountWarning(false);
                      setPaymentMethod('QRIS');
                    }}
                    className={`py-3 px-3 rounded-xl text-left transition-colors border cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-2xs' 
                        : 'bg-[#FAF8F5] text-stone-800 border-stone-200/80 hover:border-stone-400'
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm tabular-nums">
                      Rp {tier.amount.toLocaleString('id-ID')}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                      {tier.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pilihan tersendiri: Nominal Lainnya (Transfer Rekening Bank + Konfirmasi WA) */}
            <button
              type="button"
              onClick={() => {
                setIsCustomBankMode(true);
                setPaymentMethod('Transfer Bank');
              }}
              className={`w-full py-3 px-4 rounded-xl text-left transition-colors border cursor-pointer flex items-center justify-between gap-3 ${
                isCustomBankMode
                  ? 'bg-stone-900 text-white border-stone-900 shadow-2xs'
                  : 'bg-[#FAF8F5] text-stone-800 border-stone-200/80 hover:border-stone-400'
              }`}
            >
              <div>
                <div className="font-semibold text-xs sm:text-sm">
                  Nominal Lainnya (Transfer Rekening Bank + Konfirmasi WA)
                </div>
                <div className={`text-[11px] mt-0.5 ${isCustomBankMode ? 'text-stone-300' : 'text-stone-500'}`}>
                  Untuk nominal bebas di luar 6 pilihan QRIS pasti di atas (transfer langsung ke rekening resmi)
                </div>
              </div>
              <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-lg shrink-0 ${
                isCustomBankMode
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-200/80 text-stone-700'
              }`}>
                Transfer Bank
              </span>
            </button>

            {isCustomBankMode && (
              <div className="mt-3 pt-3 border-t border-stone-200/70 space-y-2">
                <label className="block text-xs font-semibold text-stone-700">
                  Nominal Rencana Transfer Bank (Opsional · Minimal Rp 2.000):
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-stone-400">Rp</span>
                  <input
                    type="number"
                    min={2000}
                    step={1000}
                    inputMode="numeric"
                    placeholder="Contoh: 50000 (untuk memudahkan ringkasan & isi pesan WA)"
                    value={customNominal}
                    onChange={(e) => handleCustomNominalChange(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-700"
                  />
                </div>
                {minAmountWarning && (
                  <p className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-1.5">
                    Nominal infaq terkunci minimal Rp 2.000 untuk menghindari transaksi tidak valid (Rp 1).
                  </p>
                )}
              </div>
            )}
          </div>


          {/* 4. Data Peziarah / Titip Doa & Hajat */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center mr-2.5">4</span>
              Titip Doa / Hajat Anda (Opsional)
            </h2>
            
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nama Munfiq / Peziarah</label>
              <input
                type="text"
                maxLength={100}
                disabled={isAnonim}
                placeholder={isAnonim ? "Hamba Allah" : "Masukkan nama lengkap atau keluarga"}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 disabled:opacity-50"
              />
              <label className="inline-flex items-center mt-2 cursor-pointer text-xs text-slate-600 select-none">
                <input
                  type="checkbox"
                  checked={isAnonim}
                  onChange={(e) => setIsAnonim(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mr-2"
                />
                Tampilkan sebagai &quot;Hamba Allah&quot; pada ticker publik &amp; Dinding Munajat
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Titip Doa / Hajat Anda <span className="text-slate-400 font-normal">(Maks. 200 karakter — tampil di Dinding Munajat Peziarah)</span>
              </label>
              <textarea
                rows={2}
                maxLength={200}
                placeholder={copy.doaHajatPlaceholder}
                value={doaHajat}
                onChange={(e) => setDoaHajat(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Rincian & Metode Pembayaran */}
        <div className="lg:col-span-5 space-y-6">
          {/* Ringkasan Infaq */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs sticky top-24">
            <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center justify-between">
              <span>Ringkasan Infaq Operasional</span>
              <span className="text-[11px] px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-xl border border-emerald-200/60">Akad Infaq</span>
            </h3>

            {/* Kutipan Hikmah di atas form konfirmasi infaq */}
            <div className="mb-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <p className="font-serif italic text-slate-800 leading-relaxed">
                "Siapa yang membantu menghidupkan kisah dan jejak orang-orang shalih, semoga Allah memudahkan segala hajat dunia dan akhiratnya."
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm pb-4 border-b border-slate-100">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 shrink-0">Program</span>
                <span className="font-semibold text-slate-900 text-right">
                  {activeProgramTitle}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 shrink-0">Alokasi Wasilah</span>
                <span className="font-semibold text-emerald-800 text-right max-w-[210px] truncate">
                  {targetSiteName}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 shrink-0">Nama Munfiq / Peziarah</span>
                <span className="font-semibold text-slate-900">
                  {finalDonorDisplay}
                </span>
              </div>
            </div>

            <div className="py-4 flex items-baseline justify-between">
              <span className="text-slate-600 font-medium text-xs sm:text-sm">Total Nominal</span>
              <span className="text-2xl font-black font-serif text-emerald-900">
                Rp {currentAmount.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Metode QRIS Resmi Ziarah Nusantara atau Mode Transfer Rekening Bank */}
            {!isCustomBankMode ? (
              <div className="mb-5">
                <QrisPaymentCard
                  qrisPayload={infaqSettings.qrisPayload}
                  qrisImageUrl={infaqSettings.qrisImageUrl}
                  selectedAmount={selectedTier.amount}
                  tierLabel={selectedTier.label}
                  customTierQrisPayload={selectedTier.customQrisPayload}
                  customTierQrisImageUrl={selectedTier.customQrisImageUrl}
                />
              </div>
            ) : (
              <div className="mb-4 p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 text-xs text-stone-800 leading-relaxed">
                Untuk nominal di luar pilihan QRIS pasti, silakan transfer langsung ke rekening resmi di bawah ini lalu konfirmasi via WhatsApp agar tercatat oleh tim kurator.
              </div>
            )}

            {/* Transfer Manual Rekening Bank */}
            <div className="mb-5 text-xs">
              <p className="font-semibold text-slate-700 mb-2">
                {isCustomBankMode ? 'Rekening Resmi Transfer Infaq:' : 'Transfer Manual Rekening Bank:'}
              </p>
              <div
                className={`p-3.5 rounded-2xl flex items-center justify-between border ${
                  isCustomBankMode
                    ? 'bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-500/15'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div>
                  <p className="font-bold text-slate-900 text-sm">{infaqSettings.bankName}</p>
                  <p className="text-slate-600 text-xs font-mono font-semibold mt-0.5">{infaqSettings.accountNumber}</p>
                  <p className="text-slate-500 text-[11px]">a.n. {infaqSettings.accountHolder}</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">
                    (Rekening Bendahara Resmi Pengelola Arsip Ziarah Nusantara)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(infaqSettings.accountNumber, 'bank')}
                  className="px-3 py-2 bg-white hover:bg-emerald-50 rounded-xl border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1.5 font-bold text-[11px]"
                  title="Salin Nomor Rekening"
                >
                  {copiedAccount === 'bank' ? (
                    <span className="text-emerald-600 font-bold">Tersalin!</span>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {isCustomBankMode && (
                <div className="mt-3">
                  {waConfirmUrl ? (
                    <a
                      href={waConfirmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-xs sm:text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageSquareHeart className="w-4 h-4" />
                      <span>Konfirmasi Transfer via WhatsApp</span>
                    </a>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
                      Silakan kirim transfer ke rekening resmi di atas, lalu unggah bukti transfer Anda pada formulir di bawah ini untuk verifikasi tim kurator.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wajib Unggah Bukti Transfer */}
            <div className="mb-4">
              <TransferProofUploadField
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                senderAccount={senderAccount}
                onSenderAccountChange={setSenderAccount}
                receipt={receipt}
                onReceiptChange={setReceipt}
                agreedToAkad={agreedToAkad}
                onAgreedToAkadChange={setAgreedToAkad}
                isAnonymous={isAnonim}
                onIsAnonymousChange={setIsAnonim}
                accentColor="emerald"
                requiredForUnlock
              />
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Tombol Catat Doa & Infaq di Website */}
            <motion.button
              whileHover={isProofComplete ? { scale: 1.015 } : {}}
              whileTap={isProofComplete ? { scale: 0.97 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={handleBayar}
              disabled={currentAmount < MIN_DONATION_AMOUNT || isSubmitting || !isProofComplete}
              className={`w-full py-3.5 font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                currentAmount < MIN_DONATION_AMOUNT || !isProofComplete
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-700 via-emerald-800 to-brand-900 hover:from-emerald-800 hover:to-brand-950 text-white shadow-emerald-950/10 border border-emerald-600/30 cursor-pointer'
              }`}
            >

              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengunggah &amp; Mencatat Munajat...</span>
                </>
              ) : !isProofComplete ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Unggah Bukti Transfer Terlebih Dahulu</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Kirim Bukti Infaq &amp; Buka Seluruh Khazanah</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Generator Lembar Munajat & Hadiah Al-Fatihah Pribadi (100% Gratis & Tanpa Paksaan) */}
      <div
        id="lembar-munajat"
        className="mt-10 bg-white rounded-3xl p-5 sm:p-7 border border-stone-200/90 shadow-2xs space-y-5 scroll-mt-20"
      >
        <div id="lembar-munajat-pribadi" className="sr-only" aria-hidden="true" />
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200/70 pb-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-800 block">
              Layanan Pegangan Doa Peziarah · 100% Gratis
            </span>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 mt-0.5">
              Susun Lembar Munajat &amp; Hadiah Al-Fatihah Pribadi
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Buat lembar pengingat hadiah Al-Fatihah untuk almarhum orang tua atau doa hajat keluarga yang dapat disimpan di HP Anda tanpa biaya.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Input Ringan */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                1. Nama Almarhum Orang Tua / Nama yang Didoakan
              </label>
              <input
                type="text"
                maxLength={80}
                placeholder="Contoh: Alm. Bapak ... / Ibu ... atau Nama Anda"
                value={personalRecipientName}
                onChange={(e) => setPersonalRecipientName(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                2. Pilihan Tema Doa
              </label>
              <div className="flex flex-wrap gap-2">
                {MUNAJAT_THEMES.map((theme) => {
                  const isActive = personalThemeId === theme.id;
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setPersonalThemeId(theme.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors border cursor-pointer ${
                        isActive
                          ? 'bg-emerald-900 text-white border-emerald-900'
                          : 'bg-[#FAF8F5] text-stone-700 border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {theme.chip}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  3. Tulis 1 Doa Pribadi Anda <span className="text-stone-400 font-normal">(Maks. 220 karakter)</span>
                </label>
                <label className="inline-flex items-center text-[11px] text-stone-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={syncWithInfaqDoa}
                    onChange={(e) => {
                      const next = e.target.checked;
                      setSyncWithInfaqDoa(next);
                      if (next && personalPrayerText.trim()) {
                        setDoaHajat(personalPrayerText.slice(0, 200));
                      }
                    }}
                    className="rounded border-stone-300 text-emerald-700 focus:ring-emerald-600 mr-1.5"
                  />
                  Sinkronkan ke kolom doa infaq
                </label>
              </div>
              <textarea
                rows={3}
                maxLength={220}
                placeholder="Contoh: Ya Allah, terangilah kubur ayah dan ibu kami, ampunilah khilaf beliau, serta karuniakanlah ketenangan batin dan kelapangan rezeki yang halal bagi keluarga kami..."
                value={personalPrayerText}
                onChange={(e) => handlePersonalPrayerChange(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-emerald-700 resize-none"
              />
            </div>

            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadMunajatCard}
                disabled={isGeneratingCard}
                className="px-5 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" strokeWidth={1.75} />
                <span>
                  {isGeneratingCard ? 'Menyiapkan Gambar...' : 'Unduh Lembar Munajat (.PNG)'}
                </span>
              </button>
              <button
                type="button"
                onClick={handleForwardToMunajatWallAndInfaq}
                className="px-4 py-3 rounded-xl bg-[#FAF8F5] hover:bg-emerald-50 text-emerald-950 border border-stone-300 hover:border-emerald-300 text-xs sm:text-sm font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-800" strokeWidth={1.75} />
                <span>Titipkan Doa Ini di Dinding Doa Bersama</span>
              </button>
            </div>
          </div>

          {/* Kartu Preview Lembar Munajat Pribadi (Rasio 4:5) + Apple Swatch Dots */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-xs font-medium text-[#6E6E73]">
                Warna Bingkai Kartu ({activeSwatch.label})
              </span>
              <div className="flex items-center gap-2" role="radiogroup" aria-label="Pilih warna bingkai Lembar Munajat">
                {MUNAJAT_SWATCHES.map((swatch) => {
                  const isSelected = personalCardPalette === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      aria-label={`Warna ${swatch.label}`}
                      title={swatch.label}
                      onClick={() => setPersonalCardPalette(swatch.id)}
                      className={`w-6 h-6 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                        isSelected
                          ? 'ring-2 ring-[#1D1D1F] ring-offset-2 scale-105'
                          : 'ring-1 ring-black/15 hover:scale-105'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full ${swatch.frameClass} border border-black/10`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className={`rounded-2xl ${activeSwatch.frameClass} p-3.5 border border-[#C5A059]/60 shadow-sm transition-colors`}>
              <div className={`rounded-xl ${activeSwatch.paperClass} border-2 border-[#C5A059] p-5 text-center space-y-3 transition-colors`}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8C6D2E]">
                  Ziarah Nusantara · Lembar Munajat Pribadi
                </div>
                <div className="text-[11px] font-semibold text-emerald-900">
                  Tema: {activeMunajatTheme.label}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#071A15]">
                  Hadiah Al-Fatihah &amp; Doa Munajat
                </h3>
                <div className="p-3 rounded-xl bg-[#F3EFE6] border border-[#D8C7A0]">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                    Teruntuk / Atas Nama:
                  </div>
                  <div className="font-serif text-sm sm:text-base font-bold text-emerald-950 mt-0.5 break-words">
                    {personalRecipientName.trim() || 'Hamba Allah & Keluarga'}
                  </div>
                </div>
                <p className="text-[11px] font-serif italic text-stone-800 leading-relaxed">
                  &ldquo;Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa — Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa &apos;adzaaban-naar.&rdquo;
                </p>
                <div className="p-3.5 rounded-xl bg-white border border-[#C5A059]/70">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D2E] mb-1">
                    Munajat &amp; Harapan Pribadi
                  </div>
                  <p className="font-serif italic text-xs sm:text-sm text-stone-900 leading-relaxed break-words">
                    &ldquo;
                    {personalPrayerText.trim() ||
                      'Ya Allah, ampunilah khilaf orang tua dan keluarga kami, lapangkanlah hati kami dalam ketaatan, dan mudahkanlah setiap ikhtiar yang halal dan berkah.'}
                    &rdquo;
                  </p>
                </div>
                <div className="pt-1 text-[10px] text-stone-500">
                  ziarahnusantara.my.id · {todayIndonesianLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dinding Munajat & Infaq Peziarah Terkini (Real-time Firestore + Fallback Santun) */}
      <div id="dinding-munajat" className="mt-12 pt-8 border-t border-stone-200/80 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-800">
              Dinding Doa Bersama (Munajat) Peziarah
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 mt-0.5">
              {copy.munajatTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {copy.munajatSubtitle}
            </p>
          </div>
          <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
            {displayedMunajatList.length} Munajat Tercatat
          </span>
        </div>

        {/* Form Titip Doa Munajat Langsung */}
        <form
          onSubmit={handleDirectMunajatSubmit}
          className="mb-6 bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs space-y-3.5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-serif font-semibold text-stone-900">
                Catat Munajat &amp; Hajat Pribadi di Perangkat Ini
              </h3>
              <p className="text-xs text-stone-500">
                Catat doa atau hajat keluarga Anda sebagai pengingat munajat pribadi di perangkat ini (tersimpan lokal di browser Anda, tidak dikirim ke server).
              </p>
            </div>
            {munajatWallSubmitted && (
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                Alhamdulillah, munajat Anda telah ditampilkan di bawah
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              maxLength={80}
              placeholder="Nama Anda / Keluarga (Kosongkan untuk Hamba Allah)"
              value={munajatWallName}
              onChange={(e) => setMunajatWallName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700"
            />
            <input
              type="text"
              maxLength={120}
              placeholder="Wasilah / Lokasi Makam (misal: Makam Sunan Ampel)"
              value={munajatWallSite}
              onChange={(e) => setMunajatWallSite(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              maxLength={240}
              required
              placeholder="Tuliskan doa hajat Anda (misal: Mohon doa kesembuhan orang tua & kelapangan rezeki keluarga)..."
              value={munajatWallText}
              onChange={(e) => setMunajatWallText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-700"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shrink-0"
            >
              Titipkan Doa Munajat
            </button>
          </div>
          <p className="pt-0.5 text-[11px] text-stone-500 leading-relaxed">
            Doa ini hanya tersimpan di perangkat Anda dan tidak dikirim ke server.
          </p>
        </form>

        {displayedMunajatList.length === 0 && (
          <div className="mb-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.08] px-4 py-3.5 space-y-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6B47]">
              Contoh Format Doa Peziarah — Jadilah yang pertama menitipkan doa hari ini
            </div>
            <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
              Belum ada munajat publik yang tercatat hari ini. Tiga kartu di bawah ini adalah contoh format doa bersama — silakan kirimkan doa Anda pada formulir di atas untuk menampilkannya di Dinding Doa.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(displayedMunajatList.length > 0 ? displayedMunajatList.slice(0, 9) : GENERAL_MUNAJAT_PRAYERS).map((item) => {
            const totalAamiin = (item.baseAamiinCount || 0) + (aamiinMap[item.id] || 0);
            const hasClickedAamiin = Boolean(aamiinMap[item.id]);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-5 border border-stone-200/70 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium text-stone-900">{item.donorName}</p>
                      <p className="text-[11px] text-stone-400">{item.dateLabel}</p>
                    </div>
                    {item.amount > 0 ? (
                      <span className="text-xs font-semibold text-emerald-800 tabular-nums">
                        Rp {item.amount.toLocaleString('id-ID')}
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                        Doa Munajat Bersama
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500 mb-2 truncate">
                    {item.siteName}
                  </p>
                  {item.doaHajat && (
                    <p className="text-sm text-stone-700 font-serif italic leading-relaxed">
                      &ldquo;{item.doaHajat}&rdquo;
                    </p>
                  )}
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-[11px] text-stone-400">
                    <span className="truncate max-w-[130px]">{item.programTitle}</span>
                    <button
                      type="button"
                      onClick={() => handleAamiinClick(item.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border shrink-0 ${
                        hasClickedAamiin
                          ? 'bg-emerald-900 text-white border-emerald-900'
                          : 'bg-[#FAF8F5] hover:bg-emerald-50 text-emerald-900 border-emerald-200/80'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${hasClickedAamiin ? 'fill-white text-white' : 'text-emerald-800'}`} strokeWidth={1.75} />
                      <span>Aamiin ({totalAamiin})</span>
                    </button>
                  </div>
                  {(hasClickedAamiin || recentAamiinId === item.id) && (
                    <p className="text-[11px] font-serif italic text-emerald-800 leading-snug">
                      Aamiin… semoga doa ini dan hajat Anda juga diijabah Allah SWT.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Konfirmasi Sukses */}
      <AnimatePresence>
        {isSuccessModal && (
          <div className="fixed inset-0 z-[3000] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                Tersimpan di Arsip &amp; Seluruh Khazanah Terbuka
              </span>
              <h3 className="text-xl font-serif font-black text-slate-900 mb-2">
                Alhamdulillah, Jazakumullahu Khairan
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {copy.unlockSuccessMessage}
              </p>
              
              <div className="my-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nominal Infaq</span>
                  <span className="font-bold text-slate-900">Rp {currentAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500 shrink-0">Program</span>
                  <span className="font-semibold text-slate-900 text-right">{activeProgramTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Munfiq / Peziarah</span>
                  <span className="font-semibold text-slate-900">{finalDonorDisplay}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tujuan</span>
                  <span className="font-semibold text-emerald-800 truncate max-w-[180px]">{targetSiteName}</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 mb-5 text-left">
                <p className="text-xs text-emerald-950 font-serif italic text-center">
                  "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ"
                </p>
                <p className="text-[11px] text-emerald-800 text-center mt-1">
                  "Harta tidak akan pernah berkurang karena sedekah." (HR. Muslim)
                </p>
              </div>

              <div className="space-y-2.5">
                {waSuccessModalUrl && (
                  <a
                    href={waSuccessModalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquareHeart className="w-4 h-4" />
                    <span>Kirim Bukti Transfer ke WhatsApp</span>
                  </a>
                )}
                <button
                  onClick={() => setIsSuccessModal(false)}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Tutup &amp; Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
