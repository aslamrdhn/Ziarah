import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  CheckCircle2,
  ScrollText,
  HeartHandshake,
  Loader2,
  Copy,
  MessageSquareHeart,
  Lock,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { ZiarahSite } from '../data/sites';
import { TOTAL_SITES_COUNT } from '../data/initialSites';
import { Link } from 'react-router-dom';
import {
  auth,
  db,
  handleFirestoreError,
  OperationType,
  checkAndRecordSubmissionCooldown,
} from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { QrisPaymentCard } from './QrisPaymentCard';
import { MIN_DONATION_AMOUNT, OFFICIAL_QRIS_STATIC_PAYLOAD } from '../lib/qris';
import { TransferProofUploadField } from './TransferProofUploadField';
import {
  CompressedReceiptResult,
  saveVerifiedDonationRecord,
  submitDonationWithPrivateProof,
} from '../lib/transferProof';
import { sanitizePlainText, sanitizeDonationAmount } from '../lib/sanitize';
import { useSiteCopy } from '../lib/siteCopy';
import {
  DEFAULT_DONATION_TIERS,
  DEFAULT_WHATSAPP_TEMPLATE,
  type DonationTier,
  normalizeDonationTiers,
  normalizeWhatsappNumber,
  buildWhatsappConfirmUrl,
} from '../lib/infaqConfig';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  site: ZiarahSite;
  type: 'infaq' | 'untold' | 'barokah_doa';
  onSuccess?: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  site,
  type,
  onSuccess,
}) => {
  const { copy } = useSiteCopy();
  const barokahMinAmount = Math.max(MIN_DONATION_AMOUNT, copy.barokahLockAmount || MIN_DONATION_AMOUNT);
  const rubrikMinAmount = Math.max(MIN_DONATION_AMOUNT, copy.rubrikLockAmount || 10000);
  const minRequiredAmount =
    type === 'barokah_doa'
      ? barokahMinAmount
      : type === 'untold'
        ? rubrikMinAmount
        : MIN_DONATION_AMOUNT;

  const [selectedNominal, setSelectedNominal] = useState(
    type === 'barokah_doa'
      ? barokahMinAmount
      : type === 'untold'
        ? rubrikMinAmount
        : DEFAULT_DONATION_TIERS[0].amount
  );
  const [isCustomBankMode, setIsCustomBankMode] = useState(false);
  const [customNominalText, setCustomNominalText] = useState('');
  const [minAmountWarning, setMinAmountWarning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank'>('QRIS');
  const [senderAccount, setSenderAccount] = useState('');
  const [receipt, setReceipt] = useState<CompressedReceiptResult | null>(null);
  const [agreedToAkad, setAgreedToAkad] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [bankSettings, setBankSettings] = useState({
    bankName: 'Bank BCA',
    accountNumber: '5470-0856-08',
    accountHolder: 'ARIF NURACHMAN HAKIM',
    qrisImageUrl: '',
    qrisPayload: OFFICIAL_QRIS_STATIC_PAYLOAD,
    donationTiers: DEFAULT_DONATION_TIERS as DonationTier[],
    whatsappConfirmNumber: '',
    whatsappMessageTemplate: DEFAULT_WHATSAPP_TEMPLATE,
  });

  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setReceipt(null);
      setAgreedToAkad(false);
      setIsAnonymous(false);
      setSubmitError(null);
      setIsCustomBankMode(false);
      setCustomNominalText('');
      setMinAmountWarning(false);
      setPaymentMethod('QRIS');

      const initialNominal =
        type === 'barokah_doa'
          ? barokahMinAmount
          : type === 'untold'
            ? rubrikMinAmount
            : DEFAULT_DONATION_TIERS[0].amount;
      setSelectedNominal(initialNominal);

      if (auth.currentUser?.displayName && !senderAccount) {
        setSenderAccount(auth.currentUser.displayName);
      }
      getDoc(doc(db, 'settings', 'infaq'))
        .then((snap) => {
          if (snap.exists()) {
            const d = snap.data();
            const loadedTiers = normalizeDonationTiers(d.donationTiers);
            const loadedWaNumber = normalizeWhatsappNumber(d.whatsappConfirmNumber);
            const loadedWaTemplate =
              typeof d.whatsappMessageTemplate === 'string' && d.whatsappMessageTemplate.trim()
                ? d.whatsappMessageTemplate.trim()
                : DEFAULT_WHATSAPP_TEMPLATE;

            setBankSettings({
              bankName: d.bankName || 'Bank BCA',
              accountNumber: d.accountNumber || '5470-0856-08',
              accountHolder: d.accountHolder || 'ARIF NURACHMAN HAKIM',
              qrisImageUrl: d.qrisImageUrl || '',
              qrisPayload: d.qrisPayload || OFFICIAL_QRIS_STATIC_PAYLOAD,
              donationTiers: loadedTiers,
              whatsappConfirmNumber: loadedWaNumber,
              whatsappMessageTemplate: loadedWaTemplate,
            });

            const validForMode =
              type === 'infaq'
                ? loadedTiers
                : loadedTiers.filter((t) => t.amount >= minRequiredAmount);
            if (validForMode.length > 0) {
              setSelectedNominal((prev) =>
                validForMode.some((t) => t.amount === prev) ? prev : validForMode[0].amount
              );
            } else {
              setSelectedNominal(minRequiredAmount);
            }
          }
        })
        .catch(() => {});
    }
  }, [isOpen, type, barokahMinAmount, rubrikMinAmount, minRequiredAmount]);

  if (!isOpen) return null;

  const availableTiers: DonationTier[] =
    type === 'infaq'
      ? bankSettings.donationTiers
      : (() => {
          const filtered = bankSettings.donationTiers.filter(
            (t) => t.amount >= minRequiredAmount
          );
          return filtered.length > 0
            ? filtered
            : [{ amount: minRequiredAmount, label: 'Infaq Operasional' }];
        })();

  const selectedTier =
    availableTiers.find((t) => t.amount === selectedNominal) || availableTiers[0];

  const parsedCustomBankAmount = customNominalText
    ? sanitizeDonationAmount(customNominalText, minRequiredAmount, 1000000000)
    : null;

  const amount = isCustomBankMode
    ? Math.max(
        minRequiredAmount,
        parsedCustomBankAmount || selectedTier?.amount || minRequiredAmount
      )
    : Math.max(minRequiredAmount, selectedTier?.amount || minRequiredAmount);

  const cleanSender = sanitizePlainText(senderAccount, 80);
  const effectiveSender =
    cleanSender.length >= 2
      ? cleanSender
      : sanitizePlainText(auth.currentUser?.displayName, 80) || 'Hamba Allah';
  const donorName = isAnonymous
    ? 'Hamba Allah'
    : cleanSender || sanitizePlainText(auth.currentUser?.displayName, 100) || 'Hamba Allah';
  const isProofComplete = Boolean(receipt && receipt.dataUrl && agreedToAkad);

  const handleManualNominalChange = (rawVal: string) => {
    const digitsOnly = rawVal.replace(/[^0-9]/g, '');
    if (!digitsOnly) {
      setCustomNominalText('');
      setMinAmountWarning(false);
      return;
    }
    const parsed = parseInt(digitsOnly, 10);
    if (parsed < minRequiredAmount) {
      setMinAmountWarning(true);
      setCustomNominalText(String(minRequiredAmount));
    } else {
      setMinAmountWarning(false);
      const clamped = Math.min(parsed, 1000000000);
      setCustomNominalText(String(clamped));
    }
  };

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

  const waConfirmUrl = buildWhatsappConfirmUrl({
    whatsappNumber: bankSettings.whatsappConfirmNumber,
    donorName,
    amount: isCustomBankMode ? parsedCustomBankAmount || undefined : amount,
    programTitle,
    siteName: site.name,
    bankName: bankSettings.bankName,
    accountNumber: bankSettings.accountNumber,
    template: bankSettings.whatsappMessageTemplate,
  });

  const waSuccessUrl = bankSettings.whatsappConfirmNumber
    ? buildWhatsappConfirmUrl({
        whatsappNumber: bankSettings.whatsappConfirmNumber,
        donorName: `${donorName} (Ref #${receipt?.referenceCode || '-'})`,
        amount,
        programTitle,
        siteName: site.name,
        bankName: bankSettings.bankName,
        accountNumber: bankSettings.accountNumber,
        template: bankSettings.whatsappMessageTemplate,
      })
    : null;

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(
      bankSettings.accountNumber.replace(/[^0-9]/g, '') || bankSettings.accountNumber
    );
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleConfirmPayment = async () => {
    if (isSaving) return;
    setSubmitError(null);

    if (amount < MIN_DONATION_AMOUNT) {
      setMinAmountWarning(true);
      setSubmitError(
        'Nominal infaq terkunci minimal Rp 2.000 untuk menghindari transaksi tidak valid (Rp 1).'
      );
      return;
    }

    if (!receipt || !receipt.dataUrl) {
      setSubmitError('Wajib mengunggah screenshot / foto bukti transfer terlebih dahulu.');
      return;
    }
    if (!agreedToAkad) {
      setSubmitError(
        'Mohon centang persetujuan akad Infaq Operasional & kebijakan privasi (UU PDP).'
      );
      return;
    }

    const cooldown = checkAndRecordSubmissionCooldown('donation', 15);
    if (!cooldown.allowed) {
      setSubmitError(
        `Mohon tunggu ${cooldown.remainingSeconds} detik sebelum mengirim konfirmasi berikutnya.`
      );
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
        senderAccount: effectiveSender,
        receipt,
        isAnonymous,
        showPublicly: !isAnonymous,
        consentAkad: true,
        consentVersion: '2026-11-23',
        consentAt: new Date().toISOString(),
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
      setSubmitError(
        'Gagal mengunggah bukti transfer ke server. Periksa koneksi internet Anda dan coba kembali.'
      );
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
      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs cursor-pointer"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
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
                  <span>
                    {copy.barokahSectionTitle} · Min. Rp{' '}
                    {barokahMinAmount.toLocaleString('id-ID')}
                  </span>
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
        <div className="p-5 sm:p-6 pb-24 sm:pb-6 overflow-y-auto">
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
                    <p className="font-semibold text-stone-900 truncate">
                      {donorName} ({paymentMethod})
                    </p>
                    <p className="text-emerald-800 font-medium">
                      Rp {amount.toLocaleString('id-ID')}
                    </p>
                    <p className="text-[10px] text-stone-400">
                      Tersimpan di Sistem Verifikasi Kurator
                    </p>
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
                {waSuccessUrl && (
                  <a
                    href={waSuccessUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#FAF8F5] hover:bg-stone-100 text-stone-700 border border-stone-200/90 rounded-xl font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquareHeart className="w-4 h-4 text-emerald-800" />
                    <span>Teruskan Bukti ke WhatsApp Admin</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {type === 'barokah_doa' && (
                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-left">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 mb-0.5">
                    Wasilah Tawassul &amp; Doa Khusus Makam
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Infaq terkunci minimal{' '}
                    <strong className="font-semibold text-slate-900">
                      Rp {barokahMinAmount.toLocaleString('id-ID')}
                    </strong>{' '}
                    untuk membuka penuh lafaz Arab, Latin, terjemahan, dan tata cara amalan hajat khusus di{' '}
                    <strong>{site.title}</strong>.
                  </p>
                </div>
              )}

              {type === 'untold' && (
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80 text-left">
                  <div className="text-[11px] font-semibold uppercase tracking-widest text-emerald-800 mb-1">
                    Pembuka Seluruh Khazanah Nusantara
                  </div>
                  <h4 className="font-serif font-semibold text-stone-900 text-sm sm:text-base mb-1">
                    Akses Penuh {TOTAL_SITES_COUNT}+ Makam &amp; Wasiat Rahasia
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Buka akses penuh ke seluruh catatan manuskrip, karomah lanjutan, dan wasiat rahasia melalui Infaq Operasional &amp; Pemeliharaan Digital minimal{' '}
                    <strong className="font-semibold text-stone-900">
                      Rp {rubrikMinAmount.toLocaleString('id-ID')}
                    </strong>{' '}
                    serta mengunggah bukti transfer.
                  </p>
                </div>
              )}

              {/* Tier Selection Grid */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-stone-800">
                  {type === 'barokah_doa'
                    ? 'Pilih Nominal Pasti Infaq Barokah & Doa:'
                    : type === 'untold'
                      ? `Pilih Nominal Pasti Infaq Operasional (Min. Rp ${rubrikMinAmount.toLocaleString('id-ID')}):`
                      : 'Pilih Nominal Pasti Infaq:'}
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableTiers.map((tier, idx) => {
                    const isSelected = !isCustomBankMode && selectedTier.amount === tier.amount;
                    return (
                      <button
                        key={`${tier.amount}-${idx}`}
                        type="button"
                        onClick={() => {
                          setSelectedNominal(tier.amount);
                          setIsCustomBankMode(false);
                          setCustomNominalText('');
                          setMinAmountWarning(false);
                          setPaymentMethod('QRIS');
                        }}
                        className={`py-2.5 px-2.5 text-left rounded-xl border transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-900 border-emerald-900 text-white'
                            : 'bg-[#FAF8F5] border-stone-200/80 text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div className="text-xs font-semibold tabular-nums">
                          Rp {tier.amount.toLocaleString('id-ID')}
                        </div>
                        <div
                          className={`text-[10px] mt-0.5 truncate ${
                            isSelected ? 'text-emerald-100' : 'text-stone-500'
                          }`}
                        >
                          {tier.label}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {type === 'infaq' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomBankMode(true);
                      setPaymentMethod('Transfer Bank');
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-left border transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                      isCustomBankMode
                        ? 'bg-stone-900 border-stone-900 text-white'
                        : 'bg-[#FAF8F5] border-stone-200/80 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold">
                        Nominal Lainnya (Transfer Bank + Konfirmasi WA)
                      </div>
                      <div
                        className={`text-[10px] mt-0.5 ${
                          isCustomBankMode ? 'text-stone-300' : 'text-stone-500'
                        }`}
                      >
                        Transfer langsung ke rekening resmi &amp; konfirmasi via WhatsApp
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="pt-0.5 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomBankMode((prev) => {
                          const next = !prev;
                          setPaymentMethod(next ? 'Transfer Bank' : 'QRIS');
                          return next;
                        });
                      }}
                      className="text-[11px] font-medium text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
                    >
                      {isCustomBankMode
                        ? '← Kembali gunakan QRIS Nominal Pasti'
                        : 'Ingin infaq nominal lain? Transfer ke rekening bank di bawah & konfirmasi via WA'}
                    </button>
                  </div>
                )}

                {isCustomBankMode && (
                  <div className="pt-2 space-y-1.5">
                    <label className="block text-[11px] font-medium text-stone-600">
                      Nominal Rencana Transfer Bank (Opsional · Min. Rp{' '}
                      {minRequiredAmount.toLocaleString('id-ID')}):
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                        Rp
                      </span>
                      <input
                        type="number"
                        min={minRequiredAmount}
                        step={1000}
                        inputMode="numeric"
                        value={customNominalText}
                        onChange={(e) => handleManualNominalChange(e.target.value)}
                        placeholder={`Minimal ${minRequiredAmount}`}
                        className="w-full pl-9 pr-3.5 py-2 text-xs font-semibold rounded-xl bg-[#FAF8F5] border border-stone-200/90 focus:outline-none focus:border-emerald-700 text-stone-900"
                      />
                    </div>
                    {minAmountWarning && (
                      <p className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-2.5 py-1.5">
                        Nominal infaq terkunci minimal Rp {minRequiredAmount.toLocaleString('id-ID')}.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {!isCustomBankMode ? (
                <QrisPaymentCard
                  qrisPayload={bankSettings.qrisPayload}
                  qrisImageUrl={bankSettings.qrisImageUrl}
                  selectedAmount={selectedTier.amount}
                  tierLabel={selectedTier.label}
                  customTierQrisPayload={selectedTier.customQrisPayload}
                  customTierQrisImageUrl={selectedTier.customQrisImageUrl}
                  compact
                />
              ) : (
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 text-xs text-stone-800 leading-relaxed">
                  Untuk nominal di luar pilihan QRIS pasti, silakan transfer langsung ke rekening resmi di bawah ini lalu konfirmasi via WhatsApp agar tercatat oleh tim kurator.
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl border ${
                  isCustomBankMode
                    ? 'bg-emerald-50/75 border-emerald-400 ring-2 ring-emerald-500/15'
                    : 'bg-[#FAF8F5] border-stone-200/80'
                }`}
              >
                <p className="text-[11px] font-semibold text-stone-700 mb-2">
                  {isCustomBankMode
                    ? 'Rekening Resmi Transfer Infaq:'
                    : 'Alternatif Transfer Rekening Bank:'}
                </p>
                <div className="bg-white p-3 rounded-xl border border-stone-200/80 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-stone-900 text-xs">
                      {bankSettings.bankName}
                    </p>
                    <p className="text-stone-700 font-mono text-xs font-semibold">
                      {bankSettings.accountNumber}
                    </p>
                    <p className="text-[10px] text-stone-500">
                      a.n. {bankSettings.accountHolder}
                    </p>
                    <p className="text-[10px] text-stone-500 mt-0.5">
                      (Rekening Bendahara Resmi Pengelola Arsip Ziarah Nusantara)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyAccount}
                    className="px-2.5 py-1.5 bg-[#FAF8F5] hover:bg-stone-100 border border-stone-200 rounded-lg text-[11px] font-medium text-stone-700 flex items-center gap-1 cursor-pointer"
                  >
                    {copiedBank ? (
                      <span className="text-emerald-700 font-semibold">Tersalin!</span>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>

                {isCustomBankMode && (
                  <div className="mt-2.5">
                    {waConfirmUrl ? (
                      <a
                        href={waConfirmUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquareHeart className="w-4 h-4" />
                        <span>Konfirmasi Transfer via WhatsApp</span>
                      </a>
                    ) : (
                      <p className="text-[11px] text-stone-600 leading-relaxed mt-1">
                        Silakan transfer ke rekening resmi di atas, lalu unggah bukti transfer pada formulir di bawah ini.
                      </p>
                    )}
                  </div>
                )}
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
