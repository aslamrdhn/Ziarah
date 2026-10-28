import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export const RUBRIK_DONATION_ID_KEY = 'zn_verified_rubrik_donation_id';
export const SITE_DONATION_MAP_KEY = 'zn_verified_site_donation_map';

export interface CompressedReceiptResult {
  dataUrl: string;
  width: number;
  height: number;
  fileName: string;
  sizeKb: number;
  referenceCode: string;
}

export function generateReceiptReferenceCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ZN-${suffix}`;
}

export async function validateAndCompressReceipt(file: File): Promise<CompressedReceiptResult> {
  if (!file) {
    throw new Error('Silakan pilih berkas gambar bukti transfer terlebih dahulu.');
  }

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type.toLowerCase())) {
    throw new Error('Format berkas tidak didukung. Gunakan foto/screenshot JPG, PNG, atau WEBP.');
  }

  if (file.size < 1500) {
    throw new Error('Ukuran berkas terlalu kecil atau tidak valid sebagai bukti transfer.');
  }

  if (file.size > 15 * 1024 * 1024) {
    throw new Error('Ukuran berkas maksimal 15 MB. Silakan gunakan screenshot bukti transfer.');
  }

  const rawDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Gagal membaca berkas gambar.'));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Berkas bukan gambar yang valid.'));
    image.src = rawDataUrl;
  });

  if (img.width < 120 || img.height < 120) {
    throw new Error('Resolusi gambar terlalu kecil (minimal 120x120 piksel). Unggah screenshot struk asli.');
  }

  const maxDim = 720;
  let targetWidth = img.width;
  let targetHeight = img.height;

  if (targetWidth > maxDim || targetHeight > maxDim) {
    if (targetWidth > targetHeight) {
      targetHeight = Math.round((targetHeight * maxDim) / targetWidth);
      targetWidth = maxDim;
    } else {
      targetWidth = Math.round((targetWidth * maxDim) / targetHeight);
      targetHeight = maxDim;
    }
  }

  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Gagal memproses gambar bukti transfer.');
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  const sampleData = ctx.getImageData(0, 0, targetWidth, targetHeight).data;
  let minLum = 255;
  let maxLum = 0;
  const step = Math.max(4, Math.floor(sampleData.length / 4000) * 4);
  for (let i = 0; i < sampleData.length; i += step) {
    const r = sampleData[i];
    const g = sampleData[i + 1];
    const b = sampleData[i + 2];
    const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
    if (lum < minLum) minLum = lum;
    if (lum > maxLum) maxLum = lum;
  }

  if (maxLum - minLum < 15) {
    throw new Error('Gambar terdeteksi kosong atau satu warna polos. Mohon unggah screenshot bukti transfer asli.');
  }

  let quality = 0.7;
  let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
  while (compressedDataUrl.length > 110000 && quality > 0.35) {
    quality -= 0.1;
    compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
  }

  const sizeKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);

  return {
    dataUrl: compressedDataUrl,
    width: targetWidth,
    height: targetHeight,
    fileName: file.name,
    sizeKb,
    referenceCode: generateReceiptReferenceCode(),
  };
}

export function saveVerifiedDonationRecord(donationId: string, siteId?: string): void {
  try {
    localStorage.removeItem('hasDonatedRubrik');
    localStorage.removeItem('unlockedUntold');
    localStorage.setItem(RUBRIK_DONATION_ID_KEY, donationId);

    if (siteId) {
      const existingRaw = localStorage.getItem(SITE_DONATION_MAP_KEY);
      const map: Record<string, string> = existingRaw ? JSON.parse(existingRaw) : {};
      map[siteId] = donationId;
      localStorage.setItem(SITE_DONATION_MAP_KEY, JSON.stringify(map));
    }
    window.dispatchEvent(new CustomEvent('zn-donation-proof-updated'));
  } catch (e) {
    console.error('Error saving donation proof ID:', e);
  }
}

export interface DonationUnlockStatus {
  isUnlocked: boolean;
  isPendingAdmin: boolean;
  isVerifying: boolean;
  donationId: string | null;
  referenceCode: string | null;
  status: string | null;
}

export function useVerifiedDonationUnlock(
  siteId?: string,
  requireManualAdminVerification: boolean = false
): DonationUnlockStatus {
  const [donationId, setDonationId] = useState<string | null>(() => {
    try {
      localStorage.removeItem('hasDonatedRubrik');
      localStorage.removeItem('unlockedUntold');

      if (siteId) {
        const rawMap = localStorage.getItem(SITE_DONATION_MAP_KEY);
        if (rawMap) {
          const parsed = JSON.parse(rawMap);
          if (parsed && typeof parsed[siteId] === 'string' && parsed[siteId]) {
            return parsed[siteId];
          }
        }
      }
      return localStorage.getItem(RUBRIK_DONATION_ID_KEY);
    } catch {
      return null;
    }
  });

  const [unlockState, setUnlockState] = useState<{
    isUnlocked: boolean;
    isPendingAdmin: boolean;
    isVerifying: boolean;
    referenceCode: string | null;
    status: string | null;
  }>({
    isUnlocked: false,
    isPendingAdmin: false,
    isVerifying: Boolean(donationId),
    referenceCode: null,
    status: null,
  });

  useEffect(() => {
    const syncFromStorage = () => {
      try {
        localStorage.removeItem('hasDonatedRubrik');
        localStorage.removeItem('unlockedUntold');
        if (siteId) {
          const rawMap = localStorage.getItem(SITE_DONATION_MAP_KEY);
          if (rawMap) {
            const parsed = JSON.parse(rawMap);
            if (parsed && typeof parsed[siteId] === 'string' && parsed[siteId]) {
              setDonationId(parsed[siteId]);
              return;
            }
          }
        }
        setDonationId(localStorage.getItem(RUBRIK_DONATION_ID_KEY));
      } catch {
        setDonationId(null);
      }
    };

    window.addEventListener('zn-donation-proof-updated', syncFromStorage);
    window.addEventListener('storage', syncFromStorage);
    return () => {
      window.removeEventListener('zn-donation-proof-updated', syncFromStorage);
      window.removeEventListener('storage', syncFromStorage);
    };
  }, [siteId]);

  useEffect(() => {
    if (!donationId) {
      setUnlockState({
        isUnlocked: false,
        isPendingAdmin: false,
        isVerifying: false,
        referenceCode: null,
        status: null,
      });
      return;
    }

    setUnlockState((prev) => ({ ...prev, isVerifying: true }));

    const unsub = onSnapshot(
      doc(db, 'donations', donationId),
      (snap) => {
        if (!snap.exists()) {
          try {
            if (localStorage.getItem(RUBRIK_DONATION_ID_KEY) === donationId) {
              localStorage.removeItem(RUBRIK_DONATION_ID_KEY);
            }
          } catch {}
          setUnlockState({
            isUnlocked: false,
            isPendingAdmin: false,
            isVerifying: false,
            referenceCode: null,
            status: null,
          });
          return;
        }

        const data = snap.data();
        const hasValidProofImage =
          typeof data.proofImageUrl === 'string' &&
          data.proofImageUrl.startsWith('data:image/') &&
          data.proofImageUrl.length > 500;
        const docStatus = String(data.status || 'confirmed');
        const refCode = typeof data.referenceCode === 'string' ? data.referenceCode : snap.id.slice(0, 8).toUpperCase();

        if (!hasValidProofImage || docStatus === 'rejected') {
          setUnlockState({
            isUnlocked: false,
            isPendingAdmin: false,
            isVerifying: false,
            referenceCode: refCode,
            status: docStatus,
          });
          return;
        }

        if (requireManualAdminVerification && docStatus !== 'verified') {
          setUnlockState({
            isUnlocked: false,
            isPendingAdmin: true,
            isVerifying: false,
            referenceCode: refCode,
            status: docStatus,
          });
          return;
        }

        setUnlockState({
          isUnlocked: docStatus === 'confirmed' || docStatus === 'verified',
          isPendingAdmin: false,
          isVerifying: false,
          referenceCode: refCode,
          status: docStatus,
        });
      },
      () => {
        setUnlockState((prev) => ({
          ...prev,
          isVerifying: false,
        }));
      }
    );

    return () => unsub();
  }, [donationId, requireManualAdminVerification]);

  return {
    ...unlockState,
    donationId,
  };
}
