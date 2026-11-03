import React, { useEffect, useState } from 'react';
import { CheckCircle2, Trash2, Loader2, ShieldAlert } from 'lucide-react';
import { fetchDonationPrivateProof, PrivateProofData } from '../../lib/transferProof';
import { DonationAdminItem } from './AdminTypes';

interface DonationVerificationModalProps {
  donation: DonationAdminItem | null;
  onClose: () => void;
  onVerify: (id: string) => void;
  onDelete: (id: string) => void;
}

export const DonationVerificationModal: React.FC<DonationVerificationModalProps> = ({
  donation,
  onClose,
  onVerify,
  onDelete,
}) => {
  const [proofData, setProofData] = useState<PrivateProofData | null>(null);
  const [isLoadingProof, setIsLoadingProof] = useState(false);

  useEffect(() => {
    if (!donation) {
      setProofData(null);
      return;
    }
    let cancelled = false;
    setIsLoadingProof(true);
    fetchDonationPrivateProof(donation).then((res) => {
      if (!cancelled) {
        setProofData(res);
        setIsLoadingProof(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [donation]);

  if (!donation) return null;

  const senderDisplay =
    proofData?.senderAccount || donation.senderAccount || donation.donorName || 'Hamba Allah';

  return (
    <div
      className="fixed inset-0 z-[3000] bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-800 text-emerald-200">
              Ref: #{donation.referenceCode || donation.id?.slice(0, 8)}
            </span>
            <h4 className="text-sm sm:text-base font-bold mt-1">
              Bukti Transfer Privat — {donation.donorName}
            </h4>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-full cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 flex items-center justify-center min-h-[200px] max-h-[52vh] overflow-auto">
            {isLoadingProof ? (
              <div className="flex flex-col items-center gap-2 text-xs text-slate-500 py-8">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-700" />
                <span>Mengambil resi dari sub-koleksi privat Firestore...</span>
              </div>
            ) : proofData?.proofImageUrl ? (
              <img
                src={proofData.proofImageUrl}
                alt="Screenshot Bukti Transfer"
                className="max-w-full max-h-[48vh] object-contain rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-xs text-amber-800 py-6 text-center px-4">
                <ShieldAlert className="w-6 h-6 text-amber-600" />
                <span>Dokumen gambar bukti transfer tidak ditemukan pada sub-koleksi privat.</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Nominal Donasi</span>
              <span className="font-black font-mono tabular-nums text-emerald-800 text-sm">
                Rp {Number(donation.amount || 0).toLocaleString('id-ID')}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Metode &amp; Pengirim</span>
              <span className="font-bold text-slate-900">
                {donation.paymentMethod || 'QRIS'} — {senderDisplay}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Program &amp; Tujuan</span>
              <span className="font-semibold text-slate-700">
                {donation.programTitle} ({donation.siteName})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => onDelete(donation.id)}
              className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Tolak &amp; Cabut Akses</span>
            </button>
            <div className="flex items-center gap-2">
              {donation.status !== 'verified' && (
                <button
                  type="button"
                  onClick={() => onVerify(donation.id)}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verifikasi Sah</span>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
