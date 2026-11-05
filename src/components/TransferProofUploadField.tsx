import React, { useRef, useState } from 'react';
import { Upload, CheckCircle2, AlertCircle, Image as ImageIcon, Trash2, Loader2, ShieldCheck } from 'lucide-react';
import { CompressedReceiptResult, validateAndCompressReceipt } from '../lib/transferProof';

interface TransferProofUploadFieldProps {
  paymentMethod: 'QRIS' | 'Transfer Bank';
  onPaymentMethodChange: (method: 'QRIS' | 'Transfer Bank') => void;
  senderAccount: string;
  onSenderAccountChange: (value: string) => void;
  receipt: CompressedReceiptResult | null;
  onReceiptChange: (receipt: CompressedReceiptResult | null) => void;
  agreedToAkad: boolean;
  onAgreedToAkadChange: (agreed: boolean) => void;
  accentColor?: 'emerald' | 'purple';
  requiredForUnlock?: boolean;
}

export const TransferProofUploadField: React.FC<TransferProofUploadFieldProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  senderAccount,
  onSenderAccountChange,
  receipt,
  onReceiptChange,
  requiredForUnlock = true,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setErrorMsg(null);
    try {
      const result = await validateAndCompressReceipt(file);
      onReceiptChange(result);
    } catch (err: any) {
      onReceiptChange(null);
      setErrorMsg(err?.message || 'Gagal memvalidasi gambar bukti transfer.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="rounded-2xl p-4 border border-stone-200/80 bg-[#FAF8F5] space-y-3.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-800" strokeWidth={1.75} />
          <span className="text-xs font-semibold text-stone-900">
            Verifikasi &amp; Unggah Bukti Transfer {requiredForUnlock ? '(Wajib)' : ''}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-stone-700 mb-1.5">
          1. Metode Pembayaran yang Digunakan <span className="text-rose-600">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onPaymentMethodChange('QRIS')}
            className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              paymentMethod === 'QRIS'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-200/80 hover:border-stone-400'
            }`}
          >
            QRIS Resmi (E-Wallet / M-Banking)
          </button>
          <button
            type="button"
            onClick={() => onPaymentMethodChange('Transfer Bank')}
            className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
              paymentMethod === 'Transfer Bank'
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-200/80 hover:border-stone-400'
            }`}
          >
            Transfer Rekening Bank BCA
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
          2. Nama Pengirim di Struk / E-Wallet / Rekening <span className="text-rose-600">*</span>
        </label>
        <input
          type="text"
          maxLength={80}
          placeholder="Contoh: Ahmad Fauzi (DANA / BCA / Mandiri)"
          value={senderAccount}
          onChange={(e) => onSenderAccountChange(e.target.value)}
          className="w-full px-3.5 py-2 bg-white border border-stone-200/80 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
        />
        {senderAccount.trim().length > 0 && senderAccount.trim().length < 3 && (
          <p className="text-[10px] text-rose-600 mt-1 font-medium">
            Masukkan minimal 3 karakter nama pengirim sesuai bukti transfer.
          </p>
        )}
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-stone-700 mb-1">
          3. Unggah Screenshot / Foto Bukti Transfer <span className="text-rose-600">*</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        {!receipt ? (
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-4 px-4 bg-white hover:bg-stone-50 border border-dashed border-stone-300 hover:border-stone-500 rounded-2xl transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-6 h-6 text-emerald-800 animate-spin" />
                <span className="text-xs font-semibold text-stone-700">Memvalidasi Bukti Transfer...</span>
              </>
            ) : (
              <>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-stone-100 text-stone-700">
                  <Upload className="w-4 h-4" strokeWidth={1.75} />
                </div>
                <span className="text-xs font-semibold text-stone-800">
                  Klik untuk Pilih Screenshot / Foto Struk Transfer
                </span>
                <span className="text-[10px] text-stone-500">
                  Format JPG, PNG, WEBP · Otomatis terkompresi aman ke Database Kurator
                </span>
              </>
            )}
          </button>
        ) : (
          <div className="bg-white p-3 rounded-2xl border border-emerald-300 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                <img
                  src={receipt.dataUrl}
                  alt="Preview Bukti Transfer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1 text-emerald-800 text-xs font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                  <span className="truncate">Bukti Transfer Terlampir</span>
                </div>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                  Ref: <strong className="font-mono text-slate-800">{receipt.referenceCode}</strong> • {receipt.width}x{receipt.height}px ({receipt.sizeKb} KB)
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] font-bold text-emerald-700 hover:underline mt-0.5 inline-flex items-center gap-1 cursor-pointer"
                >
                  <ImageIcon className="w-3 h-3" />
                  Ganti Gambar Bukti
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onReceiptChange(null)}
              title="Hapus bukti transfer"
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {errorMsg && (
          <div className="mt-2 p-2.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-rose-800 text-[11px]">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};
