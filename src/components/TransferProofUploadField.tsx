import React, { useState } from 'react';
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
  isAnonymous?: boolean;
  onIsAnonymousChange?: (isAnonymous: boolean) => void;
  onProcessingChange?: (isProcessing: boolean) => void;
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
  agreedToAkad,
  onAgreedToAkadChange,
  isAnonymous = false,
  onIsAnonymousChange,
  onProcessingChange,
  requiredForUnlock = true,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset input value immediately so selecting the same photo again triggers onChange
    e.target.value = '';
    if (!file) return;

    setIsProcessing(true);
    onProcessingChange?.(true);
    setErrorMsg(null);
    try {
      const result = await validateAndCompressReceipt(file);
      onReceiptChange(result);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Gagal memproses gambar bukti transfer. Silakan pilih screenshot JPG/PNG.');
    } finally {
      setIsProcessing(false);
      onProcessingChange?.(false);
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
          2. Nama Pengirim di Struk / E-Wallet / Rekening{' '}
          <span className="text-stone-500 font-normal">(Opsional jika Hamba Allah)</span>
        </label>
        <input
          type="text"
          maxLength={80}
          placeholder={
            isAnonymous
              ? 'Otomatis tercatat sebagai Hamba Allah'
              : 'Nama Anda (opsional)'
          }
          value={senderAccount}
          onChange={(e) => onSenderAccountChange(e.target.value)}
          className="w-full px-3.5 py-2 bg-white border border-stone-200/80 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
        />
        {onIsAnonymousChange && (
          <label className="mt-2 flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => onIsAnonymousChange(e.target.checked)}
              className="mt-0.5 rounded border-stone-300 text-emerald-800 focus:ring-emerald-700 cursor-pointer"
            />
            <span className="text-[11px] text-stone-600 leading-snug">
              Tampilkan nama saya sebagai <strong className="font-semibold text-stone-900">&quot;Hamba Allah&quot;</strong> pada ticker publik &amp; Dinding Munajat (nama asli hanya disimpan terenkripsi untuk verifikasi kurator).
            </span>
          </label>
        )}
      </div>

      <div>
        <span className="block text-[11px] font-semibold text-stone-700 mb-1">
          3. Unggah Screenshot / Foto Bukti Transfer <span className="text-rose-600">*</span>
        </span>

        {!receipt ? (
          <label
            className={`w-full min-h-[44px] py-4 px-4 bg-white hover:bg-stone-50 border border-dashed border-stone-300 hover:border-stone-500 rounded-2xl transition-colors flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
              isProcessing ? 'opacity-50 pointer-events-none' : ''
            }`}
          >
            <input
              type="file"
              accept="image/*"
              disabled={isProcessing}
              onChange={handleFileSelect}
              className="sr-only"
            />
            {isProcessing ? (
              <>
                <Loader2 className="w-6 h-6 text-emerald-800 animate-spin" />
                <span className="text-xs font-semibold text-stone-700">
                  Memproses &amp; mengompresi bukti transfer...
                </span>
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
                  Format JPG, PNG, WEBP · Otomatis dikompresi ringan (&lt; 250 KB) untuk 1x kirim
                </span>
              </>
            )}
          </label>
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
                  <span className="truncate">{receipt.sizeKb} KB • Siap dikirim</span>
                </div>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">
                  Ref: <strong className="font-mono text-slate-800">{receipt.referenceCode}</strong> • {receipt.width}x{receipt.height}px
                </p>
                <label
                  className={`min-h-[44px] px-3.5 py-2 text-xs font-semibold rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 mt-1.5 inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
                    isProcessing ? 'opacity-50 pointer-events-none' : ''
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    disabled={isProcessing}
                    onChange={handleFileSelect}
                    className="sr-only"
                  />
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'Memproses & mengompresi bukti transfer...' : 'Ganti Foto'}</span>
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onReceiptChange(null)}
              title="Hapus bukti transfer"
              className="min-h-[44px] min-w-[44px] p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0 flex items-center justify-center"
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

      <div className="pt-1 border-t border-stone-200/80">
        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreedToAkad}
            onChange={(e) => onAgreedToAkadChange(e.target.checked)}
            className="mt-0.5 rounded border-stone-300 text-emerald-800 focus:ring-emerald-700 cursor-pointer"
          />
          <span className="text-[11px] text-stone-600 leading-relaxed">
            <strong className="font-semibold text-stone-800">Persetujuan &amp; Akad Infaq:</strong> Saya menyetujui bahwa dana ini adalah infaq operasional dan pemeliharaan digital secara sukarela — bukan penghimpunan dana pokok wakaf (UU No. 41 Tahun 2004) — serta menyetujui pemrosesan data nama, nominal, bukti transfer, dan pesan/doa sesuai prinsip UU Perlindungan Data Pribadi (UU PDP) untuk keperluan verifikasi kurator. Nama dan doa hanya ditampilkan publik setelah dikonfirmasi kurator, kecuali saya memilih tampil anonim sebagai <strong>&quot;Hamba Allah&quot;</strong>.
          </span>
        </label>
      </div>
    </div>
  );
};
