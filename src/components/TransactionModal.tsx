import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2, ScrollText, HeartHandshake, Loader2, Copy, MessageSquareHeart, Lock, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { ZiarahSite, SITES } from '../data/sites';
import { Link } from 'react-router-dom';
import { auth, db, handleFirestoreError, OperationType, checkAndRecordSubmissionCooldown } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { QrisPaymentCard } from './QrisPaymentCard';
import { OFFICIAL_QRIS_STATIC_PAYLOAD } from '../lib/qris';
import { TransferProofUploadField } from './TransferProofUploadField';
import { CompressedReceiptResult, saveVerifiedDonationRecord, submitDonationWithPrivateProof } from '../lib/transferProof';
import { sanitizePlainText, sanitizeDonationAmount } from '../lib/sanitize';
import { useSiteCopy, ADMIN_WHATSAPP_NUMBER } from '../lib/siteCopy';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: ZiarahSite;
  type: 'infaq' | 'untold' | 'barokah_doa';
  onSuccess?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, site, type, onSuccess }) => {
  const { copy } = useSiteCopy();
  const barokahMinAmount = copy.barokahLockAmount || 5000;
  const rubrikMinAmount = copy.rubrikLockAmount || 10000;
  const [selectedNominal, setSelectedNominal] = useState(
    type === 'barokah_doa' ? barokahMinAmount : type === 'untold' ? rubrikMinAmount : 25000
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank'>('QRIS');
  const [senderAccount, setSenderAccount] = useState('');
  const [receipt, setReceipt] = useState<CompressedReceiptResult | null>(null);
  const [agreedToAkad, setAgreedToAkad] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
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
      setAgreedToAkad(true);
      setIsAnonymous(false);
      setSubmitError(null);
      setSelectedNominal(type === 'barokah_doa' ? barokahMinAmount : type === 'untold' ? rubrikMinAmount : 25000);
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
  }, [isOpen, type, barokahMinAmount, rubrikMinAmount]);

  if (!isOpen) return null;

  const minAmount = type === 'barokah_doa' ? barokahMinAmount : rubrikMinAmount;
  const amount =
    sanitizeDonationAmount(selectedNominal, minAmount, 1000000000) || minAmount;
  const cleanSender = sanitizePlainText(senderAccount, 80);
  const donorName = isAnonymous
    ? 'Hamba Allah'
    : cleanSender || sanitizePlainText(auth.currentUser?.displayName, 100) || 'Hamba Allah';
  const isProofComplete = Boolean(receipt && cleanSender.length >= 3 && agreedToAkad);

  const programId =
    type === 'barokah_doa'
      ? 'barokah-doa'
      : type === 'untold'
        ? 'rubrik-manuskrip'
        : 'pemeliharaan';

  const programTitle =
    type === 'barokah_doa'
      ? `Barokah & Doa Khusus: ${site.name}`.slice(0, 150)
      : type === 'untold'
        ? `Rubrik & Khazanah: ${site.name}`.slice(0, 150)
        : 'Infaq Operasional & Pemeliharaan Digital';

  const waMessage = `Assalamu'alaikum Admin Ziarah Nusantara, saya telah mengunggah Bukti Transfer ${
    type === 'barokah_doa'
      ? 'Infaq Operasional Pembuka Barokah & Doa Khusus (Rp 5.000)'
      : type === 'infaq'
        ? 'Infaq Operasional & Pemeliharaan Digital'
        : 'Infaq Operasional Pembuka Rubrik & Khazanah'
  } di sistem:\n\n` +
    `• *Kode Referensi:* ${receipt?.referenceCode || '-'}\n` +
    `• *Nama Pengirim:* ${donorName}\n` +
    `• *Metode Pembayaran:* ${paymentMethod}\n` +
    `• *Tujuan Makam:* ${site.name}\n` +
    `• *Nominal:* Rp ${amount.toLocaleString('id-ID')}\n\n` +
    `Bukti screenshot transfer telah terlampir di sistem Admin Kurator. Terima kasih.`;
  const cleanAdminWa = (copy.adminWhatsappNumber || ADMIN_WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
  const waConfirmUrl = `https://wa.me/${cleanAdminWa}?text=${encodeURIComponent(waMessage)}`;

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
    if (cleanSender.length < 3) {
      setSubmitError('Wajib mengisi nama pengirim sesuai akun E-Wallet atau rekening bank (minimal 3 karakter).');
      return;
    }
    if (!agreedToAkad) {
      setSubmitError('Mohon centang persetujuan akad Infaq Operasional & kebijakan privasi (UU PDP).');
      return;
    }

    const cooldown = checkAndRecordSubmissionCooldown('donation', 15);
    if (!cooldown.allowed) {
      setSubmitError(`Mohon tunggu ${cooldown.remainingSeconds} detik sebelum mengirim konfirmasi berikutnya.`);
      return;
    }

    setIsSaving(true);

    try {
      const donationId = await submitDonationWithPrivateProof({
        programId,
        programTitle,
        siteId: sanitizePlainText(site.id, 128),
        siteName: sanitizePlainText(site.name, 150),
        amount,
        donorName,
        paymentMethod,
        senderAccount: cleanSender,
        receipt,
        doaHajat: sanitizePlainText(
          type === 'barokah_doa'
            ? `Ikhtiar Barokah & Doa Khusus di ${site.name}`
            : type === 'infaq'
              ? `Donasi pemeliharaan untuk ${site.name}`
              : `Apresiasi pembukaan manuskrip ${site.name}`,
          200
        ),
      });

      saveVerifiedDonationRecord({
        donationId,
        siteId: site.id,
        programId,
        amount,
      });
      setIsSaving(false);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error recording transaction in Firestore:', error);
      setSubmitError('Gagal mengunggah bukti transfer ke server. Periksa koneksi internet Anda dan coba kembali.');
      try {
        handleFirestoreError(error, OperationType.CREATE, 'donations');
      } catch {
        // Logged structured error
      }
      setIsSaving(false);
    }
  };

  const modalNode = (
    <div className="fixed inset-0 z-[3500] flex items-center justify-center p-3 sm:p-4 pointer-events-auto">
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs cursor-pointer" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: "spring", damping: 26, stiffness: 320 }}
        className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl max-h-[90dvh] overflow-y-auto flex flex-col border border-stone-200/90 pointer-events-auto"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#FAF8F5] border-b border-stone-200/80 text-stone-900 relative shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal donasi"
            className="absolute top-3.5 right-3.5 z-20 w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="relative z-10 pr-8">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-800 mb-1 inline-flex items-center gap-1.5">
              {type === 'barokah_doa' ? (
                <>
                  <ScrollText className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>{copy.barokahSectionTitle} · Rp {barokahMinAmount.toLocaleString('id-ID')}</span>
                </>
              ) : type === 'infaq' ? (
                <>
                  <HeartHandshake className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>Infaq Jariyah Makam</span>
                </>
              ) : (
                <>
                  <ScrollText className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>{copy.paywallBadge}</span>
                </>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-semibold text-stone-900 mb-1 leading-snug">
              {type === 'barokah_doa'
                ? `${copy.barokahPaywallButtonText} — ${site.name}`
                : site.name}
            </h2>
            <p className="text-stone-600 text-xs leading-relaxed">
              {type === 'barokah_doa'
                ? copy.barokahPaywallDescription
                : type === 'infaq' 
                  ? copy.infaqSubtitle
                  : copy.paywallDescription}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 pb-6 sm:pb-6 overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-3">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-emerald-200/80">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="inline-block text-[10px] font-semibold font-mono uppercase tracking-wider bg-[#FAF8F5] text-stone-700 px-2.5 py-1 rounded-lg border border-stone-200 mb-2">
                Kode Referensi Bukti: #{receipt?.referenceCode}
              </span>
              <h3 className="font-serif text-stone-900 text-lg mb-1.5">
                {type === 'barokah_doa'
                  ? 'Alhamdulillah, Barokah & Doa Khusus Telah Terbuka'
                  : 'Alhamdulillah, Lembaran Khazanah Telah Terbuka'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mb-4 leading-relaxed">
                {type === 'barokah_doa'
                  ? `Terima kasih atas infaq jariyah Anda. Seluruh bacaan tawassul, wirid, dan doa khusus di ${site.title} kini telah terbuka penuh di perangkat Anda.`
                  : copy.unlockSuccessMessage}
              </p>

              {receipt && (
                <div className="mb-4 p-3 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 flex items-center gap-3 text-left">
                  <img
                    src={receipt.dataUrl}
                    alt="Bukti Transfer"
                    className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                  <div className="text-xs min-w-0">
                    <p className="font-semibold text-stone-900 truncate">{donorName} ({paymentMethod})</p>
                    <p className="text-emerald-800 font-medium">Rp {amount.toLocaleString('id-ID')}</p>
                    <p className="text-[10px] text-stone-400">Tersimpan di Sistem Verifikasi Kurator</p>
                  </div>
                </div>
              )}

              <div className="space-y-2.5">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-stone-900 hover:bg-emerald-900 text-white rounded-xl font-medium text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  Selesai &amp; Baca Sekarang →
                </button>
                <a
                  href={waConfirmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#FAF8F5] hover:bg-stone-100 text-stone-700 border border-stone-200/90 rounded-xl font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquareHeart className="w-4 h-4 text-emerald-800" />
                  <span>Teruskan Bukti ke WhatsApp Admin</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {type === 'barokah_doa' ? (
                <div className="space-y-3">
                  <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-left">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 mb-0.5">
                      Wasilah Tawassul &amp; Doa Khusus Makam
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Infaq mulai <strong className="font-semibold text-slate-900">Rp {barokahMinAmount.toLocaleString('id-ID')}</strong> untuk membuka penuh lafaz Arab, Latin, terjemahan, dan tata cara amalan hajat khusus di <strong>{site.title}</strong>.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-2">
                      Pilih Nominal Infaq Barokah &amp; Doa:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[barokahMinAmount, Math.max(10000, barokahMinAmount * 2), Math.max(25000, barokahMinAmount * 5)].map((nominal) => (
                        <button
                          key={nominal}
                          type="button"
                          onClick={() => setSelectedNominal(nominal)}
                          className={`py-2.5 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                            selectedNominal === nominal
                              ? 'bg-emerald-900 border-emerald-900 text-white'
                              : 'bg-[#FAF8F5] border-stone-200/80 text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          Rp {nominal.toLocaleString('id-ID')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : type === 'infaq' ? (
                <div>
                  <label className="block text-xs font-semibold text-stone-800 mb-2">Pilih Nominal Infaq:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[10000, 25000, 50000, 100000, 250000, 500000].map((nominal) => (
                      <button
                        key={nominal}
                        type="button"
                        onClick={() => setSelectedNominal(nominal)}
                        className={`py-2.5 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                          selectedNominal === nominal 
                            ? 'bg-stone-900 border-stone-900 text-white' 
                            : 'bg-[#FAF8F5] border-stone-200/80 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        Rp {nominal.toLocaleString('id-ID')}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80 text-left">
                    <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-800 mb-1">
                      Pembuka Seluruh Khazanah Nusantara
                    </div>
                    <h4 className="font-serif font-semibold text-stone-900 text-sm sm:text-base mb-1">
                      Akses Penuh {SITES.length}+ Makam &amp; Wasiat Rahasia
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Buka akses penuh ke seluruh catatan manuskrip, karomah lanjutan, dan wasiat rahasia melalui Infaq Operasional &amp; Pemeliharaan Digital minimal <strong className="font-semibold text-stone-900">Rp {rubrikMinAmount.toLocaleString('id-ID')}</strong> serta mengunggah bukti transfer.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-800 mb-2">
                      Pilih Nominal Infaq Operasional (Min. Rp {rubrikMinAmount.toLocaleString('id-ID')}):
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[rubrikMinAmount, Math.max(15000, rubrikMinAmount + 5000), Math.max(25000, rubrikMinAmount + 15000)].map((nominal) => (
                        <button
                          key={nominal}
                          type="button"
                          onClick={() => setSelectedNominal(nominal)}
                          className={`py-2.5 px-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                            selectedNominal === nominal
                              ? 'bg-stone-900 border-stone-900 text-white'
                              : 'bg-[#FAF8F5] border-stone-200/80 text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          Rp {nominal.toLocaleString('id-ID')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <QrisPaymentCard
                qrisPayload={bankSettings.qrisPayload}
                qrisImageUrl={bankSettings.qrisImageUrl}
                selectedAmount={amount}
                compact
              />

              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-stone-200/80">
                <p className="text-[11px] font-semibold text-stone-600 mb-2">Alternatif Transfer Rekening Bank:</p>
                <div className="bg-white p-3 rounded-xl border border-stone-200/80 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-stone-900 text-xs">{bankSettings.bankName}</p>
                    <p className="text-stone-700 font-mono text-xs font-semibold">{bankSettings.accountNumber}</p>
                    <p className="text-[10px] text-stone-500">a.n. {bankSettings.accountHolder}</p>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      (Rekening Bendahara Resmi Pengelola Arsip Ziarah Nusantara)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="px-2.5 py-1.5 bg-[#FAF8F5] hover:bg-stone-100 border border-stone-200 rounded-lg text-[11px] font-medium text-stone-700 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedBank ? <span className="text-emerald-700 font-semibold">Tersalin!</span> : <><Copy className="w-3 h-3" /><span>Salin</span></>}
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
                isAnonymous={isAnonymous}
                onIsAnonymousChange={setIsAnonymous}
                accentColor="emerald"
                requiredForUnlock
              />

              {submitError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-800 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <button 
                type="button"
                onClick={handleConfirmPayment}
                disabled={isSaving || !isProofComplete}
                className={`w-full py-3.5 rounded-xl font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 ${
                  !isProofComplete
                    ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                    : 'bg-stone-900 hover:bg-emerald-900 text-white cursor-pointer'
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Mengirim &amp; Memverifikasi Bukti Transfer...</span>
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
                      {type === 'barokah_doa'
                        ? `Buka Barokah & Doa Khusus (Rp ${amount.toLocaleString('id-ID')})`
                        : type === 'infaq'
                          ? `Kirim Bukti & Konfirmasi Infaq (Rp ${amount.toLocaleString('id-ID')})`
                          : `Kirim Bukti Transfer & Buka Seluruh Khazanah (Rp ${amount.toLocaleString('id-ID')})`}
                    </span>
                  </>
                )}
              </button>

              {type === 'infaq' && (
                <div className="text-center pt-1 pb-2">
                  <Link 
                    to="/infaq" 
                    onClick={onClose}
                    className="text-xs text-stone-600 hover:text-stone-900 underline underline-offset-4 font-medium"
                  >
                    Buka Halaman Lengkap Infaq &amp; Munajat →
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalNode, document.body) : modalNode;
};
