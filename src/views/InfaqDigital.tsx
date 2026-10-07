import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartHandshake, 
  QrCode, 
  Building2, 
  Droplets, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Copy
} from 'lucide-react';
import { ziarahSites } from '../data/sites';

export const InfaqDigital: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState<string>('pemeliharaan');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('all');
  const [nominal, setNominal] = useState<number>(50000);
  const [customNominal, setCustomNominal] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [isAnonim, setIsAnonim] = useState<boolean>(false);
  const [doaHajat, setDoaHajat] = useState<string>('');
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const programs = [
    {
      id: 'pemeliharaan',
      title: 'Pemeliharaan & Revitalisasi Makam',
      desc: 'Perbaikan sarana, atap kubah, penerangan makam, dan pelestarian arsitektur bersejarah.',
      icon: Building2,
      color: 'from-emerald-500 to-teal-700',
      tag: 'Prioritas'
    },
    {
      id: 'kebersihan',
      title: 'Fasilitas Wudhu & Kebersihan',
      desc: 'Penyediaan air bersih, pemeliharaan tempat wudhu, karpet sholat, dan sanitasi jamaah.',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-700',
      tag: 'Operasional'
    },
    {
      id: 'dhuafa',
      title: 'Santunan Musafir & Dhuafa',
      desc: 'Bantuan makanan berbuka/sahur, santunan yatim dan peziarah dhuafa di sekitar makam.',
      icon: Users,
      color: 'from-amber-500 to-orange-700',
      tag: 'Sosial'
    },
    {
      id: 'kitab',
      title: 'Wakaf Al-Qur\'an & Kitab Doa',
      desc: 'Pengadaan mushaf Al-Qur\'an, buku panduan ziarah, dan kitab tahlil untuk para peziarah.',
      icon: BookOpen,
      color: 'from-purple-500 to-indigo-700',
      tag: 'Jariyah'
    }
  ];

  const quickNominals = [10000, 25000, 50000, 100000, 250000, 500000];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const currentAmount = customNominal ? parseInt(customNominal, 10) || 0 : nominal;
  const targetSiteName = selectedSiteId === 'all' 
    ? 'Kompleks Makam Seluruh Nusantara' 
    : ziarahSites.find(s => s.id === selectedSiteId)?.name || 'Makam Aulia';

  const handleBayar = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAmount < 5000) return;
    setIsSuccessModal(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-24">
      {/* Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-950 via-brand-900 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-lg mb-8 relative overflow-hidden border border-emerald-900/40"
      >
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-gold-300 text-xs font-semibold mb-4">
            <HeartHandshake className="w-4 h-4" />
            <span>Sedekah Jariyah & Amal Kebaikan</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-white tracking-tight mb-3">
            Infaq Digital Makam Aulia Nusantara
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed">
            Salurkan sedekah dan infaq secara langsung, transparan, dan terpercaya untuk pemeliharaan makam, fasilitas jamaah, dan santunan sosial di berbagai situs ziarah Nusantara.
          </p>
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
              {programs.map((p) => {
                const Icon = p.icon;
                const isSelected = selectedProgram === p.id;
                return (
                  <motion.button
                    key={p.id}
                    type="button"
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onClick={() => setSelectedProgram(p.id)}
                    className={`text-left p-4 rounded-2xl border transition-colors relative flex flex-col justify-between cursor-pointer ${
                      isSelected 
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20 shadow-xs' 
                        : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center shadow-xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600">
                          {p.tag}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{p.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{p.desc}</p>
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
              <option value="all">🌐 Umum (Disalurkan ke Makam yang Membutuhkan Revitalisasi)</option>
              {ziarahSites.map((site) => (
                <option key={site.id} value={site.id}>
                  📍 {site.name} ({site.location.city}, {site.location.province})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400 mt-2">
              Infaq akan disalurkan melalui yayasan / pengurus resmi kompleks makam terkait.
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
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Doa atau Hajat Khusus</label>
              <textarea
                rows={2}
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
                  {programs.find(p => p.id === selectedProgram)?.title}
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
                  {isAnonim ? 'Hamba Allah' : (donorName || 'Hamba Allah')}
                </span>
              </div>
            </div>

            <div className="py-4 flex items-baseline justify-between">
              <span className="text-slate-600 font-medium text-xs sm:text-sm">Total Nominal</span>
              <span className="text-2xl font-black font-serif text-emerald-900">
                Rp {currentAmount.toLocaleString('id-ID')}
              </span>
            </div>

            {/* Metode QRIS */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-5 text-center">
              <div className="flex items-center justify-center space-x-2 text-xs font-bold text-slate-700 mb-3">
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>QRIS Nasional (Bebas Biaya Admin)</span>
              </div>
              
              {/* QR Code Container with Animated Scanner Beam */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 inline-block shadow-2xs mb-2 relative overflow-hidden group">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=INFAQ-ZIARAH-${selectedProgram}-${currentAmount}`} 
                  alt="QRIS Infaq Ziarah"
                  className="w-36 h-36 mx-auto rounded-lg"
                />
                {/* Laser scan line animation */}
                <motion.div 
                  animate={{ y: [0, 134, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-3 right-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.9)] pointer-events-none"
                />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Pindai menggunakan aplikasi Mobile Banking apa saja (BCA, Mandiri, BRI, BSI) atau e-Wallet (GoPay, OVO, ShopeePay, DANA).
              </p>
            </div>

            {/* Tombol Konfirmasi Bayar */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onClick={handleBayar}
              disabled={currentAmount < 5000}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-700 via-emerald-800 to-brand-900 hover:from-emerald-800 hover:to-brand-950 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-950/10 border border-emerald-600/30 flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Konfirmasi & Selesaikan Infaq
            </motion.button>

            {/* Rekening Alternatif */}
            <div className="mt-5 pt-4 border-t border-slate-100 text-xs">
              <p className="font-semibold text-slate-700 mb-2">Transfer Manual Bank Syariah:</p>
              <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-200">
                <div>
                  <p className="font-bold text-slate-900">Bank Syariah Indonesia (BSI)</p>
                  <p className="text-slate-500 text-[11px]">7123-4567-8901 (a.n. Yayasan Makam Aulia)</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('712345678901', 'bsi')}
                  className="p-1.5 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 text-slate-600 transition-colors cursor-pointer"
                  title="Salin Rekening"
                >
                  {copiedAccount === 'bsi' ? (
                    <span className="text-emerald-600 text-[10px] font-bold">Tersalin!</span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
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
                Infaq Berhasil Dicatat
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
                  <span className="font-semibold text-slate-900">{programs.find(p => p.id === selectedProgram)?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pewakif</span>
                  <span className="font-semibold text-slate-900">{isAnonim ? 'Hamba Allah' : (donorName || 'Hamba Allah')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tujuan</span>
                  <span className="font-semibold text-emerald-800 truncate max-w-[180px]">{targetSiteName}</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 mb-6 text-left">
                <p className="text-xs text-emerald-950 font-serif italic text-center">
                  "مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ"
                </p>
                <p className="text-[11px] text-emerald-800 text-center mt-1">
                  "Harta tidak akan pernah berkurang karena sedekah." (HR. Muslim)
                </p>
              </div>

              <button
                onClick={() => setIsSuccessModal(false)}
                className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-2xl text-xs sm:text-sm transition-colors shadow-sm"
              >
                Tutup & Kembali
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
