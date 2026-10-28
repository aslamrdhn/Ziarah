import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Copy, Check, Maximize2, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  OFFICIAL_QRIS_STATIC_PAYLOAD,
  parseQrisMerchantInfo,
  buildQrisPayload,
} from '../lib/qris';

interface QrisPaymentCardProps {
  qrisPayload?: string;
  qrisImageUrl?: string;
  selectedAmount?: number;
  compact?: boolean;
}

export const QrisPaymentCard: React.FC<QrisPaymentCardProps> = ({
  qrisPayload = OFFICIAL_QRIS_STATIC_PAYLOAD,
  qrisImageUrl,
  selectedAmount,
  compact = false,
}) => {
  const [qrMode, setQrMode] = useState<'static_exact' | 'dynamic_amount'>('static_exact');
  const [generatedQrDataUrl, setGeneratedQrDataUrl] = useState<string>('');
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const effectiveBasePayload =
    qrisPayload && qrisPayload.trim().startsWith('000201')
      ? qrisPayload.trim()
      : OFFICIAL_QRIS_STATIC_PAYLOAD;

  const activePayload = buildQrisPayload(effectiveBasePayload, {
    useSelectedAmount: qrMode === 'dynamic_amount',
    amount: selectedAmount,
  });

  const merchantInfo = parseQrisMerchantInfo(activePayload);

  useEffect(() => {
    let isMounted = true;
    QRCode.toDataURL(activePayload, {
      width: 640,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#0f172a',
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (isMounted) setGeneratedQrDataUrl(url);
      })
      .catch((err) => {
        console.error('Failed to render QRIS barcode:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [activePayload]);

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(activePayload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2200);
  };

  const handleDownloadQrCard = async () => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1040;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // White card background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Top red/emerald QRIS header accent
      ctx.fillStyle = '#064e3b';
      ctx.fillRect(0, 0, canvas.width, 130);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('QRIS STANDAR PEMBAYARAN NASIONAL', canvas.width / 2, 62);
      ctx.font = '18px sans-serif';
      ctx.fillStyle = '#a7f3d0';
      ctx.fillText('Satu QR Code untuk Semua Aplikasi Pembayaran', canvas.width / 2, 98);

      // Merchant details
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 32px serif';
      ctx.fillText(merchantInfo.merchantName.toUpperCase(), canvas.width / 2, 195);

      ctx.fillStyle = '#475569';
      ctx.font = 'bold 20px monospace';
      ctx.fillText(`NMID: ${merchantInfo.nmid}`, canvas.width / 2, 232);

      ctx.fillStyle = '#64748b';
      ctx.font = '18px sans-serif';
      ctx.fillText(
        `${merchantInfo.merchantCity} (${merchantInfo.postalCode}) • Acquirer: ${merchantInfo.acquirer}`,
        canvas.width / 2,
        262
      );

      // Draw QR image
      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        qrImg.onload = () => resolve();
        qrImg.onerror = reject;
        qrImg.src = generatedQrDataUrl;
      });

      const qrSize = 540;
      const qrX = (canvas.width - qrSize) / 2;
      const qrY = 290;

      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 3;
      ctx.strokeRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24);
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

      // Footer info
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 20px sans-serif';
      const modeText =
        qrMode === 'dynamic_amount' && selectedAmount
          ? `Nominal Terkunci: Rp ${selectedAmount.toLocaleString('id-ID')}`
          : 'QRIS Statis Resmi Ziarah Nusantara';
      ctx.fillText(modeText, canvas.width / 2, 895);

      ctx.fillStyle = '#64748b';
      ctx.font = '16px monospace';
      ctx.fillText(`CRC-16 Checksum: ${merchantInfo.crc} (Terverifikasi EMVCo)`, canvas.width / 2, 930);

      ctx.fillStyle = '#047857';
      ctx.font = 'bold 17px sans-serif';
      ctx.fillText(
        'Menerima: BCA • Mandiri • BRI • BNI • BSI • DANA • GoPay • OVO • ShopeePay',
        canvas.width / 2,
        980
      );

      const link = document.createElement('a');
      link.download = `QRIS-Ziarah-Nusantara-${merchantInfo.nmid}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Error downloading QRIS PNG:', err);
    }
  };

  const displayImageSrc =
    qrisImageUrl && qrisImageUrl.trim() !== '' && qrMode === 'static_exact'
      ? qrisImageUrl
      : generatedQrDataUrl;

  return (
    <>
      <div className="bg-gradient-to-b from-white to-slate-50 rounded-2xl border border-emerald-200/90 p-4 shadow-xs text-center relative overflow-hidden">
        {/* Top Official QRIS Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5 mb-3">
          <div className="flex items-center gap-1.5">
            <div className="px-2 py-0.5 bg-rose-600 text-white font-black text-[11px] tracking-wider rounded">
              QRIS
            </div>
            <span className="text-[11px] font-bold text-slate-800">
              Standar Pembayaran Nasional
            </span>
          </div>
        </div>

        {/* Merchant Identity */}
        <div className="mb-2.5">
          <p className="text-xs sm:text-sm font-serif font-black text-slate-900 uppercase tracking-tight">
            {merchantInfo.merchantName}
          </p>
          <p className="text-[11px] font-mono font-bold text-slate-600 mt-0.5">
            NMID: {merchantInfo.nmid}
          </p>
          <p className="text-[10px] text-slate-500">
            {merchantInfo.merchantCity} {merchantInfo.postalCode} • Acquirer: DANA (UMI)
          </p>
        </div>

        {/* Mode Toggle: Barcode Statis Asli vs Nominal Otomatis */}
        {selectedAmount && selectedAmount > 0 && (
          <div className="inline-flex p-0.5 bg-slate-200/80 rounded-xl mb-3 text-[10px] font-bold">
            <button
              type="button"
              onClick={() => setQrMode('static_exact')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                qrMode === 'static_exact'
                  ? 'bg-white text-emerald-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Barcode Statis Resmi
            </button>
            <button
              type="button"
              onClick={() => setQrMode('dynamic_amount')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                qrMode === 'dynamic_amount'
                  ? 'bg-white text-emerald-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Nominal Otomatis (Rp {selectedAmount.toLocaleString('id-ID')})
            </button>
          </div>
        )}

        {/* QR Code Frame */}
        <div className="relative inline-block bg-white p-3 rounded-2xl border-2 border-slate-200 shadow-xs mb-2.5 group">
          {displayImageSrc ? (
            <img
              src={displayImageSrc}
              alt={`QRIS ${merchantInfo.merchantName}`}
              onClick={() => setIsZoomOpen(true)}
              className={`${
                compact ? 'w-44 h-44' : 'w-52 h-52'
              } mx-auto object-contain cursor-zoom-in select-none`}
            />
          ) : (
            <div
              className={`${
                compact ? 'w-44 h-44' : 'w-52 h-52'
              } flex items-center justify-center bg-slate-50 rounded-xl`}
            >
              <QrCode className="w-8 h-8 text-slate-400 animate-pulse" />
            </div>
          )}

          {/* Laser Scan Animation */}
          <motion.div
            animate={{ y: [0, compact ? 168 : 200, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute left-3 right-3 top-3 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.9)] pointer-events-none"
          />

          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className="absolute bottom-2 right-2 p-1.5 bg-slate-900/75 hover:bg-slate-900 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity cursor-pointer"
            title="Perbesar Barcode QRIS"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Perbesar</span>
          </button>
        </div>

        {/* Action Buttons: Download QR Image & Copy Payload */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-2.5">
          <button
            type="button"
            onClick={handleDownloadQrCard}
            className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh QRIS (.PNG)</span>
          </button>
          <button
            type="button"
            onClick={handleCopyPayload}
            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-[11px] font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Salin String Barcode EMVCo QRIS"
          >
            {copiedPayload ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Kode QRIS Tersalin</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Kode Statis</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          Pindai atau <strong>Unduh QRIS</strong> lalu pilih <em>&ldquo;Unggah QR dari Galeri&rdquo;</em> di{' '}
          <strong>BCA, Mandiri, BRI, BNI, BSI, DANA, GoPay, OVO, atau ShopeePay</strong>.
        </p>
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomOpen && (
          <div
            className="fixed inset-0 z-[4000] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setIsZoomOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200 relative"
            >
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-600 text-white text-xs font-black rounded-lg mb-2">
                <span>QRIS GPN NASIONAL</span>
              </div>
              <h4 className="font-serif font-black text-base text-slate-900 uppercase">
                {merchantInfo.merchantName}
              </h4>
              <p className="text-xs font-mono font-bold text-slate-600 mb-3">
                NMID: {merchantInfo.nmid} • {merchantInfo.merchantCity} {merchantInfo.postalCode}
              </p>

              <div className="bg-white p-3 rounded-2xl border-2 border-slate-200 inline-block mb-4">
                {displayImageSrc && (
                  <img
                    src={displayImageSrc}
                    alt="QRIS Zoom"
                    className="w-64 h-64 sm:w-72 sm:h-72 object-contain mx-auto"
                  />
                )}
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadQrCard}
                  className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Simpan ke Galeri (.PNG)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsZoomOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
