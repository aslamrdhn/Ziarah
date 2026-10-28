import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ScrollText, HeartHandshake, Loader2, Copy, MessageSquareHeart, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ZiarahSite } from '../data/sites';
import { Link } from 'react-router-dom';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { QrisPaymentCard } from './QrisPaymentCard';
import { OFFICIAL_QRIS_STATIC_PAYLOAD } from '../lib/qris';
import { TransferProofUploadField } from './TransferProofUploadField';
import { CompressedReceiptResult, saveVerifiedDonationRecord } from '../lib/transferProof';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: ZiarahSite;
  type: 'infaq' | 'untold';
  onSuccess?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, site, type, onSuccess }) => {
  const [selectedNominal, setSelectedNominal] = useState(25000);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank'>('QRIS');
  const [senderAccount, setSenderAccount] = useState('');
  const [receipt, setReceipt] = useState<CompressedReceiptResult | null>(null);
  const [agreedToAkad, setAgreedToAkad] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [bankSettings, setBankSettings] = useState({
    bankName: 'Bank BCA',
    accountNumber: '5470-0856-08',
    accountHolder: 'ARIF NURACHMAN HAKIM',
    qrisImageUrl: '',
    qrisPayload: OFFICIAL_QRIS_STATIC_PAYLOAD,
  });

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setReceipt(null);
      setAgreedToAkad(false);
      setSubmitError(null);
      if (auth.currentUser?.displayName && !senderAccount) {
        setSenderAccount(auth.currentUser.displayName);
      }
      getDoc(doc(db, 'settings', 'infaq'))
        .then((snap) => {
          if (snap.exists()) {
            const d = snap.data();
            setBankSettings({
              bankName: d.bankName || 'Bank BCA',
              accountNumber: d.accountNumber || '5470-0856-08',
              accountHolder: d.accountHolder || 'ARIF NURACHMAN HAKIM',
              qrisImageUrl: d.qrisImageUrl || '',
              qrisPayload: d.qrisPayload || OFFICIAL_QRIS_STATIC_PAYLOAD,
            });
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const amount = type === 'infaq' ? selectedNominal : 15000;
  const donorName = (senderAccount.trim() || auth.currentUser?.displayName || 'Hamba Allah').slice(0, 100);
  const isProofComplete = Boolean(receipt && senderAccount.trim().length >= 3);

  const waMessage = `Assalamu'alaikum Admin Ziarah Nusantara, saya telah mengunggah Bukti Transfer ${type === 'infaq' ? 'Infaq Pemeliharaan Makam' : 'Infaq Literasi Pembuka Rubrik'} di sistem:\n\n` +
    `• *Kode Referensi:* ${receipt?.referenceCode || '-'}\n` +
    `• *Nama Pengirim:* ${donorName}\n` +
    `• *Metode Pembayaran:* ${paymentMethod}\n` +
    `• *Tujuan Makam:* ${site.name}\n` +
    `• *Nominal:* Rp ${amount.toLocaleString('id-ID')}\n\n` +
    `Bukti screenshot transfer telah terlampir di sistem Admin Kurator. Terima kasih.`;
  const waConfirmUrl = `https://wa.me/6285717378885?text=${encodeURIComponent(waMessage)}`;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankSettings.accountNumber.replace(/[^0-9]/g, '') || bankSettings.accountNumber);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleConfirmPayment = async () => {
    if (isSaving) return;
    setSubmitError(null);

    if (!receipt || !receipt.dataUrl) {
      setSubmitError('Wajib mengunggah screenshot / foto bukti transfer terlebih dahulu.');
      return;
    }
    if (senderAccount.trim().length < 3) {
      setSubmitError('Wajib mengisi nama pengirim sesuai akun E-Wallet atau rekening bank (minimal 3 karakter).');
      return;
    }

    setIsSaving(true);
    const donationRef = doc(collection(db, 'donations'));

    try {
      await setDoc(donationRef, {
        id: donationRef.id,
        programId: type === 'infaq' ? 'pemeliharaan' : 'rubrik-manuskrip',
        programTitle: type === 'infaq' ? 'Pemeliharaan & Revitalisasi Makam' : 'Apresiasi Literasi & Manuskrip Rubrik',
        siteId: site.id,
        siteName: site.name,
        amount,
        donorName,
        paymentMethod,
        senderAccount: senderAccount.trim().slice(0, 80),
        proofImageUrl: receipt.dataUrl,
        referenceCode: receipt.referenceCode,
        doaHajat: type === 'infaq' ? `Infaq pemeliharaan untuk ${site.name}` : `Apresiasi pembukaan manuskrip ${site.name}`,
        authorUid: auth.currentUser?.uid || 'guest',
        status: 'confirmed',
        createdAt: serverTimestamp(),
      });

      saveVerifiedDonationRecord(donationRef.id, site.id);
      setIsSaving(false);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error recording transaction in Firestore:', error);
      setSubmitError('Gagal mengunggah bukti transfer ke server. Periksa koneksi internet Anda dan coba kembali.');
      try {
        handleFirestoreError(error, OperationType.CREATE, `donations/${donationRef.id}`);
      } catch {
        // Logged structured error
      }
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 pointer-events-auto">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs cursor-pointer" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.93, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 320 }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200/90 pointer-events-auto"
      >
        {/* Header */}
        <div className={`p-5 sm:p-6 text-white relative overflow-hidden shrink-0 ${type === 'infaq' ? 'bg-gradient-to-r from-emerald-800 via-emerald-900 to-brand-950' : 'bg-gradient-to-r from-purple-800 via-purple-900 to-indigo-950'}`}>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <button type="button" onClick={onClose} className="absolute top-4 right-4 z-20 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
          
          <div className="relative z-10">
            <span className="bg-white/20 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2 inline-flex items-center space-x-1.5 backdrop-blur-md">
              {type === 'infaq' ? (
                <>
                  <HeartHandshake className="w-3.5 h-3.5 mr-1" />
                  <span>Infaq Digital Makam</span>
                </>
              ) : (
                <>
                  <ScrollText className="w-3.5 h-3.5 mr-1" />
                  <span>Rubrik Khusus & Manuskrip</span>
                </>
              )}
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-black mb-1 drop-shadow-xs">{site.name}</h2>
            <p className="text-white/80 text-xs">
              {type === 'infaq' 
                ? 'Sedekah jariyah langsung untuk pemeliharaan makam & fasilitas jamaah.' 
                : 'Buka akses naskah sejarah dan karomah khusus setelah donasi & unggah bukti transfer.'}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-3">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-100 shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="inline-block text-[10px] font-bold font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200 mb-2">
                Kode Referensi Bukti: #{receipt?.referenceCode}
              </span>
              <h3 className="font-bold text-slate-900 text-lg mb-1">
                {type === 'infaq' ? 'Bukti Infaq Berhasil Terkirim!' : 'Bukti Terverifikasi — Akses Rubrik Terbuka!'}
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {type === 'infaq' 
                  ? 'Jazakumullahu khairan katsiran. Bukti transfer Anda telah tersimpan di database Admin Kurator.' 
                  : 'Terima kasih atas infaq riset Anda. Naskah manuskrip dan kisah karomah khusus kini telah terbuka untuk Anda.'}
              </p>

              {receipt && (
                <div className="mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3 text-left">
                  <img
                    src={receipt.dataUrl}
                    alt="Bukti Transfer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="text-xs min-w-0">
                    <p className="font-bold text-slate-900 truncate">{donorName} ({paymentMethod})</p>
                    <p className="text-emerald-700 font-semibold">Rp {amount.toLocaleString('id-ID')}</p>
                    <p className="text-[10px] text-slate-400">Tersimpan di Sistem Verifikasi Kurator</p>
                  </div>
                </div>
              )}

              <div className="space-y-2.5">
                <a
                  href={waConfirmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquareHeart className="w-4 h-4" />
                  <span>Teruskan Bukti ke WhatsApp Admin</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Selesai & Baca Sekarang
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {type === 'infaq' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">Pilih Nominal Infaq:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[10000, 25000, 50000, 100000, 250000, 500000].map((nominal) => (
                      <motion.button
                        key={nominal}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 450, damping: 25 }}
                        onClick={() => setSelectedNominal(nominal)}
                        className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          selectedNominal === nominal 
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500/20 shadow-xs' 
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        Rp {nominal.toLocaleString('id-ID')}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center">
                  <ScrollText className="w-7 h-7 text-purple-600 mx-auto mb-1.5" />
                  <h4 className="font-bold text-purple-900 text-sm mb-1">Akses Rubrik Kisah Khusus</h4>
                  <p className="text-xs text-purple-700 leading-relaxed">
                    Buka akses penuh ke catatan manuskrip, karomah lanjutan, dan sejarah tak terungkap dengan infaq literasi <strong className="font-bold">Rp 15.000</strong> serta mengunggah bukti transfer.
                  </p>
                </div>
              )}

              <QrisPaymentCard
                qrisPayload={bankSettings.qrisPayload}
                qrisImageUrl={bankSettings.qrisImageUrl}
                selectedAmount={amount}
                compact
              />

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <p className="text-[11px] font-bold text-slate-600 mb-2">Alternatif Transfer Rekening Bank:</p>
                <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{bankSettings.bankName}</p>
                    <p className="text-slate-700 font-mono text-xs font-bold">{bankSettings.accountNumber}</p>
                    <p className="text-[10px] text-slate-500">a.n. {bankSettings.accountHolder}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="px-2.5 py-1.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedBank ? <span className="text-emerald-600">Tersalin!</span> : <><Copy className="w-3 h-3" /><span>Salin</span></>}
                  </button>
                </div>
              </div>

              {/* Mandatory Transfer Proof Upload */}
              <TransferProofUploadField
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                senderAccount={senderAccount}
                onSenderAccountChange={setSenderAccount}
                receipt={receipt}
                onReceiptChange={setReceipt}
                agreedToAkad={agreedToAkad}
                onAgreedToAkadChange={setAgreedToAkad}
                accentColor={type === 'untold' ? 'purple' : 'emerald'}
                requiredForUnlock
              />

              {submitError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <motion.button 
                whileHover={isProofComplete ? { scale: 1.01 } : {}}
                whileTap={isProofComplete ? { scale: 0.97 } : {}}
                onClick={handleConfirmPayment}
                disabled={isSaving || !isProofComplete}
                className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 ${
                  !isProofComplete
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : type === 'untold'
                      ? 'bg-purple-700 hover:bg-purple-800 text-white cursor-pointer'
                      : 'bg-gradient-to-r from-emerald-800 to-brand-900 hover:from-emerald-900 hover:to-brand-950 text-white cursor-pointer'
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirim & Memverifikasi Bukti Transfer...</span>
                  </>
                ) : !isProofComplete ? (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Unggah Bukti Transfer untuk Membuka</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {type === 'infaq'
                        ? `Kirim Bukti & Konfirmasi Infaq (Rp ${amount.toLocaleString('id-ID')})`
                        : 'Kirim Bukti Transfer & Buka Akses Rubrik'}
                    </span>
                  </>
                )}
              </motion.button>

              {type === 'infaq' && (
                <div className="text-center pt-1">
                  <Link 
                    to="/infaq" 
                    onClick={onClose}
                    className="text-xs text-emerald-700 hover:text-emerald-900 hover:underline font-semibold"
                  >
                    Buka Halaman Lengkap Infaq Digital →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
