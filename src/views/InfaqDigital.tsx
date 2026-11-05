import React, { useState, useEffect } from 'react';
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
  Heart
} from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType, checkAndRecordSubmissionCooldown } from '../lib/firebase';
import { collection, doc, onSnapshot, query, limit } from 'firebase/firestore';
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
} from '../lib/transferProof';
import { sanitizePlainText, sanitizeDonationAmount } from '../lib/sanitize';
import { useSiteCopy } from '../lib/siteCopy';

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
    title: 'Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara',
    desc: 'Wasilah jariyah untuk pelestarian manuskrip sejarah, verifikasi sanad keilmuan, dokumentasi karomah, serta penyebaran riwayat para Wali dan Ulama Nusantara ke seluruh penjuru.',
    iconName: 'Database',
    color: 'from-emerald-600 to-brand-900',
    tag: 'Wasilah Jariyah Utama'
  }
];

interface InfaqSettings {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisImageUrl: string;
  qrisPayload: string;
  programs: InfaqProgramItem[];
}

const DEFAULT_INFAQ_SETTINGS: InfaqSettings = {
  bankName: 'Bank BCA',
  accountNumber: '5470-0856-08',
  accountHolder: 'ARIF NURACHMAN HAKIM',
  qrisImageUrl: '',
  qrisPayload: OFFICIAL_QRIS_STATIC_PAYLOAD,
  programs: DEFAULT_INFAQ_PROGRAMS,
};

const ICON_MAP = {
  Database,
  Building2,
  Droplets,
  Users,
  BookOpen,
  HeartHandshake,
};

export const InfaqDigital: React.FC = () => {
  const siteCopy = useSiteCopy();
  const [selectedProgram, setSelectedProgram] = useState<string>('riset-web');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('web-riset');
  const [nominal, setNominal] = useState<number>(25000);
  const [customNominal, setCustomNominal] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [isAnonim, setIsAnonim] = useState<boolean>(false);
  const [doaHajat, setDoaHajat] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank'>('QRIS');
  const [senderAccount, setSenderAccount] = useState<string>('');
  const [receipt, setReceipt] = useState<CompressedReceiptResult | null>(null);
  const [agreedToAkad, setAgreedToAkad] = useState<boolean>(true);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [lastSubmittedReceipt, setLastSubmittedReceipt] = useState<CompressedReceiptResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const [infaqSettings, setInfaqSettings] = useState<InfaqSettings>(DEFAULT_INFAQ_SETTINGS);
  const [recentDonations, setRecentDonations] = useState<DonationRecord[]>([]);
  const [aamiinMap, setAamiinMap] = useState<Record<string, number>>(() => getStoredAamiinMap());

  const handleAamiinClick = (itemId: string) => {
    setAamiinMap(incrementStoredAamiin(itemId));
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
    const removedIds = new Set(['pemeliharaan', 'kebersihan', 'dhuafa', 'kitab']);
    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'infaq'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const rawPrograms = Array.isArray(data.programs)
            ? data.programs
                .filter((p: InfaqProgramItem) => !removedIds.has(p.id))
                .map((p: InfaqProgramItem) =>
                  p.id === 'riset-web'
                    ? {
                        ...p,
                        title: 'Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara',
                        desc: 'Wasilah jariyah untuk pelestarian manuskrip sejarah, verifikasi sanad keilmuan, dokumentasi karomah, serta penyebaran riwayat para Wali dan Ulama Nusantara ke seluruh penjuru.',
                      }
                    : p
                )
            : [];
          const loadedPrograms = rawPrograms.length > 0
            ? rawPrograms
            : DEFAULT_INFAQ_PROGRAMS;
          setInfaqSettings({
            bankName: data.bankName || DEFAULT_INFAQ_SETTINGS.bankName,
            accountNumber: data.accountNumber || DEFAULT_INFAQ_SETTINGS.accountNumber,
            accountHolder: data.accountHolder || DEFAULT_INFAQ_SETTINGS.accountHolder,
            qrisImageUrl: data.qrisImageUrl || '',
            qrisPayload: data.qrisPayload || OFFICIAL_QRIS_STATIC_PAYLOAD,
            programs: loadedPrograms,
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
      query(collection(db, 'donations'), limit(30)),
      (snapshot) => {
        let myId = '';
        try {
          myId = localStorage.getItem('zn_verified_rubrik_donation_id') || '';
        } catch {}
        const list: DonationRecord[] = snapshot.docs
          .filter((docSnap) => {
            const d = docSnap.data();
            return (
              d.status === 'verified' ||
              d.status === 'confirmed' ||
              (myId && docSnap.id === myId && d.status !== 'rejected')
            );
          })
          .map((docSnap, idx) => {
            const d = docSnap.data();
            const ts = d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now() - idx * 60000;
            const dateLabel = d.createdAt?.toDate
              ? d.createdAt.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
              : 'Baru saja';
            return {
              id: docSnap.id,
              donorName: d.donorName || 'Hamba Allah',
              amount: Number(d.amount) || 0,
              programTitle: d.programTitle || 'Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara',
              siteName: d.siteName || 'Khazanah Auliya Nusantara',
              doaHajat: d.doaHajat || 'Semoga menjadi amal jariyah dan wasilah keberkahan keluarga.',
              dateLabel,
              createdAtMs: ts,
              baseAamiinCount: 15 + (idx % 23),
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

  const quickNominalPackages = siteCopy.quickNominalPackages;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/[^0-9]/g, '') || text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const currentAmount = sanitizeDonationAmount(customNominal ? customNominal : nominal, 1000, 1000000000);
  const targetSiteName = selectedSiteId === 'web-riset'
    ? 'Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara'
    : 'Umum (Disalurkan ke Makam yang Membutuhkan Revitalisasi)';
  const activeProgramTitle =
    programs.find(p => p.id === selectedProgram)?.title ||
    programs[0]?.title ||
    'Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara';

  const cleanSender = sanitizePlainText(senderAccount, 80);
  const isProofComplete = Boolean(receipt && cleanSender.length >= 3);

  const handleBayar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount < 5000 || isSubmitting) return;
    setSubmitError(null);

    if (!receipt || !receipt.dataUrl) {
      setSubmitError('Wajib mengunggah screenshot / foto bukti transfer terlebih dahulu.');
      return;
    }
    if (cleanSender.length < 3) {
      setSubmitError('Wajib mengisi nama pengirim sesuai bukti transfer (minimal 3 karakter).');
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
      : sanitizePlainText(donorName, 100) || cleanSender || 'Hamba Allah';
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
        senderAccount: cleanSender,
        receipt,
        doaHajat: cleanDoaHajat,
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

  const displayedMunajatList: CuratedMunajatItem[] =
    recentDonations.length > 0
      ? recentDonations.map((d, idx) => ({
          ...d,
          baseAamiinCount: d.baseAamiinCount ?? 15 + (idx % 23),
        }))
      : FALLBACK_MUNAJAT_ITEMS;

  const totalTerkumpul = recentDonations.reduce((acc, item) => acc + item.amount, 0);

  const finalDonorDisplay = isAnonim ? 'Hamba Allah' : (donorName.trim() || senderAccount.trim() || 'Hamba Allah');
  const activeRefCode = lastSubmittedReceipt?.referenceCode || receipt?.referenceCode || '-';
  const waMessage = `Assalamu'alaikum Admin Ziarah Nusantara, saya telah mengunggah Bukti Transfer Infaq Jariyah di sistem:\n\n` +
    `• *Kode Referensi Bukti:* ${activeRefCode}\n` +
    `• *Nama Pewakif / Pengirim:* ${finalDonorDisplay} (${senderAccount.trim() || '-'})\n` +
    `• *Metode Pembayaran:* ${paymentMethod}\n` +
    `• *Program:* ${activeProgramTitle}\n` +
    `• *Tujuan Alokasi:* ${targetSiteName}\n` +
    `• *Nominal Infaq:* Rp ${currentAmount.toLocaleString('id-ID')}` +
    (doaHajat.trim() ? `\n• *Titip Doa / Hajat:* "${sanitizePlainText(doaHajat, 200)}"` : '') +
    `\n\nScreenshot bukti transfer telah terunggah di sistem Admin Kurator. Terima kasih.`;
  const waConfirmUrl = `https://wa.me/6285717378885?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-24">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-950 via-brand-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-lg mb-8 relative overflow-hidden border border-emerald-900/40"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-gold-300 text-xs font-semibold mb-4">
              <HeartHandshake className="w-4 h-4" />
              <span>Sedekah Jariyah &amp; Wasilah Kebaikan</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight mb-3">
              {siteCopy.infaqHeadline}
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
              {siteCopy.infaqSubheadline}
            </p>
          </div>
          {recentDonations.length > 0 && (
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 shrink-0 min-w-[200px]">
              <p className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold mb-1">Total Infaq Tercatat</p>
              <p className="text-xl sm:text-2xl font-serif font-black text-white">Rp {totalTerkumpul.toLocaleString('id-ID')}</p>
              <p className="text-[11px] text-slate-300 mt-0.5">Dari {recentDonations.length} konfirmasi pewakif</p>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Kolom Kiri: Form Pilihan */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* 1. Pilih Program Infaq */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5 flex items-center">
              <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center mr-2.5">1</span>
              Pilih Program Amal Jariyah
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
              Tujuan Alokasi Infaq Jariyah
            </h2>
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-xl text-stone-800 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-700 cursor-pointer"
            >
              <option value="web-riset">Penjagaan Arsip Digital &amp; Penyebaran Riwayat Auliya Nusantara</option>
              <option value="all">Umum (Disalurkan ke Makam yang Membutuhkan Revitalisasi)</option>
            </select>
            <p className="text-[11px] text-stone-500 mt-2">
              {siteCopy.infaqTransparencyNote}
            </p>
          </div>

          {/* 3. Pilih Nominal */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/70 shadow-2xs">
            <h2 className="text-sm sm:text-base font-serif text-stone-900 mb-3.5 flex items-center">
              <span className="w-6 h-6 rounded-lg bg-stone-100 text-stone-800 text-xs font-semibold flex items-center justify-center mr-2.5">3</span>
              Pilih Nominal Infaq
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-3">
              {quickNominalPackages.map((pkg, idx) => {
                const isSelected = !customNominal && nominal === pkg.amount;
                return (
                  <button
                    key={`${pkg.amount}-${idx}`}
                    type="button"
                    onClick={() => {
                      setNominal(pkg.amount);
                      setCustomNominal('');
                    }}
                    className={`py-3 px-3 rounded-xl text-left transition-colors border cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-900 text-white border-emerald-900 shadow-2xs' 
                        : 'bg-[#FAF8F5] text-stone-800 border-stone-200/80 hover:border-stone-400'
                    }`}
                  >
                    <div className="font-semibold text-xs sm:text-sm tabular-nums">
                      Rp {pkg.amount.toLocaleString('id-ID')}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                      {pkg.tag || pkg.label}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="relative mt-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-medium text-stone-400">Rp</span>
              <input
                type="number"
                placeholder="Nominal lainnya (minimal Rp 5.000)"
                value={customNominal}
                onChange={(e) => setCustomNominal(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#FAF8F5] border border-stone-200 rounded-xl text-stone-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-700"
              />
            </div>
          </div>

          {/* 4. Data Peziarah / Titip Doa & Hajat */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center mr-2.5">4</span>
              Titip Doa / Hajat Anda (Opsional)
            </h2>
            
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Nama Pewakif / Peziarah</label>
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
                Infaq sebagai Hamba Allah (Anonim)
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Titip Doa / Hajat Anda <span className="text-slate-400 font-normal">(Maks. 200 karakter — tampil di Dinding Munajat Peziarah)</span>
              </label>
              <textarea
                rows={2}
                maxLength={200}
                placeholder={siteCopy.doaHajatPlaceholder}
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
              <span>Ringkasan Infaq Jariyah</span>
              <span className="text-[11px] px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-xl border border-emerald-200/60">Akad Jariyah</span>
            </h3>

            {/* Kutipan Hikmah di atas form konfirmasi infaq */}
            <div className="mb-4 p-3.5 bg-gradient-to-br from-emerald-50/90 via-amber-50/50 to-white rounded-2xl border border-emerald-200/80 text-xs">
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
                <span className="text-slate-500 shrink-0">Nama Pewakif</span>
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

            {/* Metode QRIS Resmi Ziarah Nusantara */}
            <div className="mb-5">
              <QrisPaymentCard
                qrisPayload={infaqSettings.qrisPayload}
                qrisImageUrl={infaqSettings.qrisImageUrl}
                selectedAmount={currentAmount}
              />
            </div>

            {/* Transfer Manual Rekening Bank */}
            <div className="mb-5 text-xs">
              <p className="font-semibold text-slate-700 mb-2">Transfer Manual Rekening Bank:</p>
              <div className="p-3.5 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-200">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{infaqSettings.bankName}</p>
                  <p className="text-slate-600 text-xs font-mono font-semibold mt-0.5">{infaqSettings.accountNumber}</p>
                  <p className="text-slate-500 text-[11px]">a.n. {infaqSettings.accountHolder}</p>
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
              disabled={currentAmount < 5000 || isSubmitting || !isProofComplete}
              className={`w-full py-3.5 font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                currentAmount < 5000 || !isProofComplete
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

      {/* Dinding Munajat & Infaq Peziarah Terkini (Real-time Firestore + Fallback Santun) */}
      <div className="mt-12 pt-8 border-t border-stone-200/80">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-800">
              Dinding Munajat Peziarah
            </div>
            <h2 className="text-xl sm:text-2xl font-serif text-stone-900 mt-0.5">
              {siteCopy.munajatHeaderTitle}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {siteCopy.munajatHeaderSubtitle}
            </p>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {displayedMunajatList.length} Munajat Tercatat
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayedMunajatList.slice(0, 9).map((item) => {
            const totalAamiin = (item.baseAamiinCount || 15) + (aamiinMap[item.id] || 0);
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
                    <span className="text-xs font-semibold text-emerald-800 tabular-nums">
                      Rp {item.amount.toLocaleString('id-ID')}
                    </span>
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
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span className="truncate max-w-[155px]">{item.programTitle}</span>
                  <button
                    type="button"
                    onClick={() => handleAamiinClick(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer border ${
                      hasClickedAamiin
                        ? 'bg-emerald-900 text-white border-emerald-900'
                        : 'bg-[#FAF8F5] hover:bg-stone-100 text-stone-700 border-stone-200/80'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasClickedAamiin ? 'fill-white text-white' : 'text-emerald-800'}`} strokeWidth={1.75} />
                    <span>Aamiin · {totalAamiin}</span>
                  </button>
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
                {siteCopy.unlockSuccessMessage}
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
                  <span className="text-slate-500">Pewakif</span>
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
                <a
                  href={waConfirmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-2xl text-xs sm:text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquareHeart className="w-4 h-4" />
                  <span>Kirim Bukti Transfer ke WhatsApp</span>
                </a>
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
