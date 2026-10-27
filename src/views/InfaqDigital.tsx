import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartHandshake, 
  QrCode, 
  Building2, 
  Droplets, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Copy,
  Loader2,
  Sparkles,
  MessageSquareHeart,
  Database
} from 'lucide-react';
import { useSites } from '../context/SiteContext';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, doc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';

interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  programTitle: string;
  siteName: string;
  doaHajat: string;
  dateLabel: string;
  createdAtMs: number;
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
    title: 'Riset Sejarah, Perluasan Database & Operasional Web (Domain/VPS)',
    desc: 'Prioritas utama untuk riset lapangan & verifikasi sanad, memperbanyak database makam ulama Nusantara di situs ini, serta biaya langganan domain, server VPS, dan pemeliharaan web.',
    iconName: 'Database',
    color: 'from-emerald-600 to-brand-900',
    tag: 'Prioritas Utama'
  },
  {
    id: 'pemeliharaan',
    title: 'Pemeliharaan & Revitalisasi Makam',
    desc: 'Perbaikan sarana, atap kubah, penerangan makam, dan pelestarian arsitektur bersejarah.',
    iconName: 'Building2',
    color: 'from-emerald-500 to-teal-700',
    tag: 'Prioritas'
  },
  {
    id: 'kebersihan',
    title: 'Fasilitas Wudhu & Kebersihan',
    desc: 'Penyediaan air bersih, pemeliharaan tempat wudhu, karpet sholat, dan sanitasi jamaah.',
    iconName: 'Droplets',
    color: 'from-blue-500 to-cyan-700',
    tag: 'Operasional'
  },
  {
    id: 'dhuafa',
    title: 'Santunan Musafir & Dhuafa',
    desc: 'Bantuan makanan berbuka/sahur, santunan yatim dan peziarah dhuafa di sekitar makam.',
    iconName: 'Users',
    color: 'from-amber-500 to-orange-700',
    tag: 'Sosial'
  },
  {
    id: 'kitab',
    title: 'Wakaf Al-Qur\'an & Kitab Doa',
    desc: 'Pengadaan mushaf Al-Qur\'an, buku panduan ziarah, dan kitab tahlil untuk para peziarah.',
    iconName: 'BookOpen',
    color: 'from-purple-500 to-indigo-700',
    tag: 'Jariyah'
  }
];

interface InfaqSettings {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  qrisImageUrl: string;
  programs: InfaqProgramItem[];
}

const DEFAULT_INFAQ_SETTINGS: InfaqSettings = {
  bankName: 'Bank BCA',
  accountNumber: '5470-0856-08',
  accountHolder: 'ARIF NURACHMAN HAKIM',
  qrisImageUrl: '',
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
  const { sites } = useSites();
  const [selectedProgram, setSelectedProgram] = useState<string>('riset-web');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('web-riset');
  const [nominal, setNominal] = useState<number>(50000);
  const [customNominal, setCustomNominal] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [isAnonim, setIsAnonim] = useState<boolean>(false);
  const [doaHajat, setDoaHajat] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const [infaqSettings, setInfaqSettings] = useState<InfaqSettings>(DEFAULT_INFAQ_SETTINGS);
  const [recentDonations, setRecentDonations] = useState<DonationRecord[]>([]);

  // Pre-fill donor name if logged in
  useEffect(() => {
    if (auth.currentUser?.displayName && !donorName) {
      setDonorName(auth.currentUser.displayName);
    }
  }, []);

  // Load configurable Bank, QRIS & Programs settings from Firestore (/settings/infaq)
  useEffect(() => {
    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'infaq'),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          const loadedPrograms = Array.isArray(data.programs) && data.programs.length > 0
            ? data.programs
            : DEFAULT_INFAQ_PROGRAMS;
          setInfaqSettings({
            bankName: data.bankName || DEFAULT_INFAQ_SETTINGS.bankName,
            accountNumber: data.accountNumber || DEFAULT_INFAQ_SETTINGS.accountNumber,
            accountHolder: data.accountHolder || DEFAULT_INFAQ_SETTINGS.accountHolder,
            qrisImageUrl: data.qrisImageUrl || '',
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
      collection(db, 'donations'),
      (snapshot) => {
        const list: DonationRecord[] = snapshot.docs.map(docSnap => {
          const d = docSnap.data();
          const ts = d.createdAt?.toMillis ? d.createdAt.toMillis() : Date.now();
          const dateLabel = d.createdAt?.toDate
            ? d.createdAt.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
            : 'Baru saja';
          return {
            id: docSnap.id,
            donorName: d.donorName || 'Hamba Allah',
            amount: Number(d.amount) || 0,
            programTitle: d.programTitle || 'Infaq Pemeliharaan',
            siteName: d.siteName || 'Kompleks Makam Nusantara',
            doaHajat: d.doaHajat || '',
            dateLabel,
            createdAtMs: ts,
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

  const quickNominals = [10000, 25000, 50000, 100000, 250000, 500000];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text.replace(/[^0-9]/g, '') || text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const currentAmount = customNominal ? parseInt(customNominal, 10) || 0 : nominal;
  const targetSiteName = selectedSiteId === 'web-riset'
    ? 'Riset Database & Operasional Web (Domain & VPS)'
    : selectedSiteId === 'all' 
      ? 'Kompleks Makam Seluruh Nusantara' 
      : sites.find(s => s.id === selectedSiteId)?.name || 'Makam Aulia';
  const activeProgramTitle = programs.find(p => p.id === selectedProgram)?.title || programs[0]?.title || 'Riset & Operasional Web';

  const handleBayar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount < 5000 || isSubmitting) return;
    setIsSubmitting(true);

    const finalDonorName = (isAnonim ? 'Hamba Allah' : (donorName.trim() || 'Hamba Allah')).slice(0, 100);
    const donationRef = doc(collection(db, 'donations'));

    try {
      await setDoc(donationRef, {
        id: donationRef.id,
        programId: selectedProgram,
        programTitle: activeProgramTitle,
        siteId: selectedSiteId,
        siteName: targetSiteName,
        amount: currentAmount,
        donorName: finalDonorName,
        doaHajat: doaHajat.trim().slice(0, 1000),
        authorUid: auth.currentUser?.uid || 'guest',
        status: 'confirmed',
        createdAt: serverTimestamp(),
      });
      try {
        localStorage.setItem('hasDonatedRubrik', 'true');
      } catch {}
      setIsSuccessModal(true);
      setDoaHajat('');
    } catch (error) {
      console.error('Error recording infaq in Firestore:', error);
      try {
        handleFirestoreError(error, OperationType.CREATE, `donations/${donationRef.id}`);
      } catch {
        // Structured log emitted
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalTerkumpul = recentDonations.reduce((acc, item) => acc + item.amount, 0);
  const hasCustomQr = Boolean(infaqSettings.qrisImageUrl && infaqSettings.qrisImageUrl.trim() !== '');

  const finalDonorDisplay = isAnonim ? 'Hamba Allah' : (donorName.trim() || 'Hamba Allah');
  const waMessage = `Assalamu'alaikum Admin Ziarah Nusantara, saya ingin konfirmasi Infaq secara manual:\n\n` +
    `• *Nama Pewakif:* ${finalDonorDisplay}\n` +
    `• *Program:* ${activeProgramTitle}\n` +
    `• *Tujuan Alokasi:* ${targetSiteName}\n` +
    `• *Nominal Infaq:* Rp ${currentAmount.toLocaleString('id-ID')}\n` +
    `• *Tujuan Transfer:* ${infaqSettings.bankName} (${infaqSettings.accountNumber} a.n. ${infaqSettings.accountHolder})` +
    (doaHajat.trim() ? `\n• *Doa / Hajat:* "${doaHajat.trim()}"` : '') +
    `\n\nBerikut saya lampirkan bukti transfernya. Terima kasih.`;
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
              <span>Sedekah Jariyah & Amal Kebaikan</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight mb-3">
              Infaq Digital Makam Aulia Nusantara
            </h1>
            <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
              Salurkan sedekah dan infaq secara langsung, transparan, dan tercatat untuk pemeliharaan makam, fasilitas jamaah, dan santunan sosial di berbagai situs ziarah Nusantara.
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
              Pilih Program Kebaikan
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
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5 flex items-center">
              <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center mr-2.5">2</span>
              Tujuan Alokasi Infaq
            </h2>
            <select
              value={selectedSiteId}
              onChange={(e) => setSelectedSiteId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 cursor-pointer shadow-inner"
            >
              <option value="web-riset">💻 Riset Sejarah, Perluasan Database Makam & Operasional Web (Domain & VPS)</option>
              <option value="all">🌐 Umum (Disalurkan ke Makam yang Membutuhkan Revitalisasi)</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  📍 {site.name} ({site.location.city}, {site.location.province})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-2">
              Infaq akan disalurkan sesuai akad pilihan program (tim riset database & server web atau pengurus kompleks makam terkait).
            </p>
          </div>

          {/* 3. Pilih Nominal */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5 flex items-center">
              <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center mr-2.5">3</span>
              Pilih Nominal Infaq
            </h2>
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              {quickNominals.map((val) => {
                const isSelected = !customNominal && nominal === val;
                return (
                  <motion.button
                    key={val}
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                    onClick={() => {
                      setNominal(val);
                      setCustomNominal('');
                    }}
                    className={`py-3 px-2 rounded-2xl text-center font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs shadow-emerald-950/10' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50/50 hover:text-emerald-800'
                    }`}
                  >
                    Rp {val.toLocaleString('id-ID')}
                  </motion.button>
                );
              })}
            </div>

            <div className="relative mt-3">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-slate-400">Rp</span>
              <input
                type="number"
                placeholder="Nominal lainnya (minimal Rp 5.000)"
                value={customNominal}
                onChange={(e) => setCustomNominal(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 shadow-inner"
              />
            </div>
          </div>

          {/* 4. Data Peziarah / Doa Hajat */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-1 flex items-center">
              <span className="w-6 h-6 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center mr-2.5">4</span>
              Doa & Hajat (Opsional)
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
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Doa atau Hajat Khusus (Akan tampil di daftar doa jamaah)</label>
              <textarea
                rows={2}
                maxLength={1000}
                placeholder="Tuliskan doa/hajat untuk Anda, keluarga, atau almarhum/almarhumah..."
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
            <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center justify-between">
              <span>Ringkasan Infaq</span>
              <span className="text-[11px] px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-xl border border-emerald-200/60">Akad Jariyah</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm pb-4 border-b border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Program</span>
                <span className="font-semibold text-slate-900 text-right">
                  {activeProgramTitle}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Alokasi Makam</span>
                <span className="font-semibold text-emerald-800 text-right max-w-[200px] truncate">
                  {targetSiteName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nama Pewakif</span>
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

            {/* Metode QRIS (Dikosongkan jika belum ada QRIS resmi) */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-5 text-center">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-700 mb-3">
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>QRIS Nasional (Bebas Biaya Admin)</span>
              </div>
              
              {hasCustomQr ? (
                <>
                  <div className="bg-white p-3.5 rounded-2xl border border-slate-200 inline-block shadow-2xs mb-2 relative overflow-hidden group">
                    <img 
                      src={infaqSettings.qrisImageUrl} 
                      alt="QRIS Infaq Ziarah"
                      className="w-36 h-36 mx-auto rounded-lg object-contain"
                    />
                    <motion.div 
                      animate={{ y: [0, 134, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.9)] pointer-events-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Pindai menggunakan aplikasi Mobile Banking apa saja (BCA, Mandiri, BRI, BSI) atau e-Wallet (GoPay, OVO, ShopeePay, DANA).
                  </p>
                </>
              ) : (
                <div className="bg-white p-5 rounded-2xl border border-dashed border-slate-300 inline-flex flex-col items-center justify-center w-full max-w-[230px] min-h-[150px] mb-2">
                  <QrCode className="w-9 h-9 text-slate-300 mb-2" />
                  <p className="text-xs font-bold text-slate-600">Kode QR Belum Tersedia</p>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Silakan salurkan infaq melalui Transfer Rekening Bank di bawah ini.
                  </p>
                </div>
              )}
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

            {/* Tombol Catat Doa & Infaq di Website */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={handleBayar}
              disabled={currentAmount < 5000 || isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-700 via-emerald-800 to-brand-900 hover:from-emerald-800 hover:to-brand-950 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-950/10 border border-emerald-600/30 flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan ke Database...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Catat Doa & Konfirmasi Infaq
                </>
              )}
            </motion.button>

            {/* Tombol Konfirmasi Manual via WhatsApp */}
            <div className="mt-3">
              <a
                href={waConfirmUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-emerald-900 border border-[#25D366]/40 font-bold rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquareHeart className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Konfirmasi Manual via WhatsApp (+62 857-1737-8885)</span>
              </a>
              <p className="text-[11px] text-slate-400 text-center mt-1.5">
                Kirim bukti transfer langsung ke WhatsApp pengurus setelah melakukan infaq.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Doa & Riwayat Infaq Pewakif (Real-time Firestore) */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <MessageSquareHeart className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-black text-slate-900">Doa & Riwayat Pewakif Terbaru</h2>
              <p className="text-xs text-slate-500">Tersimpan secara real-time di database. Mari aminkan doa saudara kita.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {recentDonations.length} Infaq Tercatat
          </span>
        </div>

        {recentDonations.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200/90 shadow-xs">
            <Sparkles className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-60" />
            <p className="text-xs sm:text-sm font-semibold text-slate-700">Belum ada catatan infaq hari ini</p>
            <p className="text-xs text-slate-500 mt-1">Jadilah pewakif pertama yang mencatatkan doa dan amal jariyah.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentDonations.slice(0, 9).map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center justify-center">
                        {item.donorName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{item.donorName}</p>
                        <p className="text-[10px] text-slate-400">{item.dateLabel}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                      Rp {item.amount.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-700 mb-1.5 truncate">
                    📍 {item.siteName}
                  </p>
                  {item.doaHajat && (
                    <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                      "{item.doaHajat}"
                    </p>
                  )}
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="truncate max-w-[180px]">{item.programTitle}</span>
                  <span className="text-emerald-700 font-bold">آمين يا رب العالمين</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
                Tersimpan di Database
              </span>
              <h3 className="text-xl font-serif font-black text-slate-900 mb-2">
                Alhamdulillah, Jazakumullahu Khairan
              </h3>
              
              <div className="my-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Nominal Infaq</span>
                  <span className="font-bold text-slate-900">Rp {currentAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Program</span>
                  <span className="font-semibold text-slate-900">{activeProgramTitle}</span>
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
                  Tutup & Kembali
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
