import { useState, useEffect } from 'react';
import { collection, doc, getDoc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { auth, db } from './firebase';
import { MIN_DONATION_AMOUNT } from './sanitize';

export { MIN_DONATION_AMOUNT };

export const RUBRIK_DONATION_ID_KEY = 'zn_verified_rubrik_donation_id_v3';

export const SITE_DONATION_MAP_KEY = 'zn_verified_site_donation_map_v3';
export const BAROKAH_DONATION_ID_KEY = 'zn_verified_barokah_donation_id_v3';
export const BAROKAH_SITE_MAP_KEY = 'zn_verified_barokah_site_map_v3';

const LEGACY_UNLOCK_KEYS = [
  'hasDonatedRubrik',
  'unlockedUntold',
  'ziarah_barokah_unlocked',
  'zn_verified_rubrik_donation_id',
  'zn_verified_site_donation_map',
  'zn_verified_rubrik_donation_id_v2',
  'zn_verified_site_donation_map_v2',
  'zn_verified_barokah_donation_id_v1',
  'zn_verified_barokah_site_map_v1',
];

function purgeLegacyUnlockStorage(): void {
  try {
    for (const key of LEGACY_UNLOCK_KEYS) {
      localStorage.removeItem(key);
    }
  } catch {
    // Ignore storage errors
  }
}

export interface CompressedReceiptResult {
  dataUrl: string;
  width: number;
  height: number;
  fileName: string;
  sizeKb: number;
  referenceCode: string;
}

export interface SubmitDonationPayload {
  programId: string;
  programTitle: string;
  siteId: string;
  siteName: string;
  amount: number;
  donorName: string;
  paymentMethod: 'QRIS' | 'Transfer Bank' | string;
  senderAccount: string;
  receipt: CompressedReceiptResult;
  doaHajat: string;
  isAnonymous?: boolean;
  showPublicly?: boolean;
  agreedToAkad?: boolean;
  consentAkad?: boolean;
  consentVersion?: string;
  consentAt?: string;
}

export interface PrivateProofData {
  donationId: string;
  senderAccount: string;
  realDonorName?: string;
  proofImageUrl: string;
  referenceCode: string;
  fileName?: string;
  sizeKb?: number;
}

export function generateReceiptReferenceCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let suffix = '';
  for (let i = 0; i < 6; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `ZN-${suffix}`;
}

/**
 * Immediately copies all file bytes into an in-memory Blob in RAM so Android
 * `content://` Photo Picker streams never disconnect mid-decode or if the file
 * input element resets.
 */
export async function materializeFileBlob(file: File): Promise<Blob> {
  if (typeof file.arrayBuffer === 'function') {
    try {
      const buffer = await file.arrayBuffer();
      if (buffer && buffer.byteLength > 0) {
        return new Blob([buffer], { type: file.type || 'image/jpeg' });
      }
    } catch {
      // Fallback to original File/Blob reference if arrayBuffer fails
    }
  }
  return file;
}

async function decodeImageForCompression(
  file: File
): Promise<{ source: CanvasImageSource; width: number; height: number; cleanup?: () => void }> {
  const safeBlob = await materializeFileBlob(file);
  const errors: string[] = [];

  // Path 1: URL.createObjectURL(safeBlob) + HTMLImageElement (most reliable on Android Chrome & Samsung Internet)
  if (
    typeof URL !== 'undefined' &&
    typeof URL.createObjectURL === 'function' &&
    typeof Image !== 'undefined'
  ) {
    let objectUrl = '';
    try {
      objectUrl = URL.createObjectURL(safeBlob);
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('ObjectURL Image decode failed'));
        image.src = objectUrl;
      });
      const width = img.naturalWidth || img.width || 600;
      const height = img.naturalHeight || img.height || 800;
      if (width > 0 && height > 0) {
        return {
          source: img,
          width,
          height,
          cleanup: () => {
            try {
              if (objectUrl) URL.revokeObjectURL(objectUrl);
            } catch {
              // Ignore revoke errors
            }
          },
        };
      }
    } catch (err: any) {
      errors.push(`ObjectURL: ${err?.message || 'error'}`);
      try {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      } catch {
        // Ignore revoke errors
      }
    }
  }

  // Path 2: createImageBitmap(safeBlob) fallback
  if (typeof window !== 'undefined' && typeof window.createImageBitmap === 'function') {
    try {
      const bitmap = await window.createImageBitmap(safeBlob);
      if (bitmap && bitmap.width > 0 && bitmap.height > 0) {
        return {
          source: bitmap,
          width: bitmap.width,
          height: bitmap.height,
          cleanup: () => {
            try {
              bitmap.close();
            } catch {
              // Ignore cleanup errors
            }
          },
        };
      }
    } catch (err: any) {
      errors.push(`createImageBitmap: ${err?.message || 'error'}`);
    }
  }

  // Path 3: FileReader.readAsDataURL(safeBlob) + HTMLImageElement final fallback
  try {
    const rawDataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const res = String(reader.result || '');
        if (res.startsWith('data:')) {
          resolve(res);
        } else {
          reject(new Error('Empty DataURL from FileReader'));
        }
      };
      reader.onerror = () => reject(new Error('FileReader readAsDataURL error'));
      reader.readAsDataURL(safeBlob);
    });

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('DataURL Image decode failed'));
      image.src = rawDataUrl;
    });

    return {
      source: img,
      width: img.naturalWidth || img.width || 600,
      height: img.naturalHeight || img.height || 800,
    };
  } catch (err: any) {
    errors.push(`FileReader: ${err?.message || 'error'}`);
    console.error('[transferProof] All 3 image decode paths failed:', {
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      errors,
    });
    throw new Error(
      'Format berkas gambar tidak dapat diproses oleh browser. Silakan unggah screenshot atau foto berformat JPG, PNG, atau WEBP.'
    );
  }
}

/**
 * Compresses and validates a transfer proof image on the client side.
 * Iteratively steps down resolution (960 -> 720 -> 540) and JPEG quality (0.72 -> 0.55 -> 0.40 -> 0.30)
 * until the resulting base64 dataUrl is <= 350,000 characters (~260 KB binary), guaranteeing
 * 1-try upload success within Firestore's 500,000-character security rule and 1 MB batch limit.
 */
export async function compressProofImage(file: File): Promise<CompressedReceiptResult> {
  if (!file) {
    throw new Error('Silakan pilih berkas gambar bukti transfer terlebih dahulu.');
  }

  const lowerType = String(file.type || '').toLowerCase().trim();
  const lowerName = String(file.name || '').toLowerCase().trim();
  const validMime = !lowerType || lowerType.startsWith('image/');
  const validExt = !lowerName || /\.(jpe?g|png|webp|heic|heif|bmp|gif)$/i.test(lowerName);

  if (!validMime && !validExt) {
    throw new Error('Format berkas tidak didukung. Gunakan foto atau screenshot JPG, PNG, atau WEBP.');
  }

  if (file.size < 500) {
    throw new Error('Ukuran berkas terlalu kecil atau tidak valid sebagai bukti transfer.');
  }

  if (file.size > 20 * 1024 * 1024) {
    throw new Error('Ukuran berkas maksimal 20 MB. Silakan gunakan screenshot bukti transfer.');
  }

  const decoded = await decodeImageForCompression(file);
  const srcWidth = decoded.width;
  const srcHeight = decoded.height;

  try {
    if (srcWidth < 100 || srcHeight < 100) {
      throw new Error(
        'Resolusi gambar terlalu kecil (minimal 100x100 piksel). Unggah screenshot struk asli.'
      );
    }

    const maxDimensions = [960, 720, 540, 420];
    const qualities = [0.72, 0.55, 0.40, 0.30];
    const MAX_DATA_URL_CHARS = 350_000;

    let compressedDataUrl = '';
    let finalWidth = srcWidth;
    let finalHeight = srcHeight;
    let checkedBlank = false;

    outerLoop: for (const maxDim of maxDimensions) {
      let targetWidth = srcWidth;
      let targetHeight = srcHeight;

      if (targetWidth > maxDim || targetHeight > maxDim) {
        if (targetWidth >= targetHeight) {
          targetHeight = Math.max(100, Math.round((targetHeight * maxDim) / targetWidth));
          targetWidth = maxDim;
        } else {
          targetWidth = Math.max(100, Math.round((targetWidth * maxDim) / targetHeight));
          targetHeight = maxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Gagal memproses gambar bukti transfer pada browser Anda.');
      }

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
      ctx.drawImage(decoded.source, 0, 0, targetWidth, targetHeight);

      if (!checkedBlank) {
        checkedBlank = true;
        try {
          const sampleData = ctx.getImageData(0, 0, targetWidth, targetHeight).data;
          let minLum = 255;
          let maxLum = 0;
          const step = Math.max(4, Math.floor(sampleData.length / 6000) * 4);
          for (let i = 0; i < sampleData.length; i += step) {
            const r = sampleData[i];
            const g = sampleData[i + 1];
            const b = sampleData[i + 2];
            const lum = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            if (lum < minLum) minLum = lum;
            if (lum > maxLum) maxLum = lum;
          }

          if (maxLum - minLum < 4) {
            throw new Error(
              'Gambar terdeteksi kosong atau satu warna polos. Mohon unggah screenshot bukti transfer asli.'
            );
          }
        } catch (err: any) {
          if (err?.message?.includes('satu warna polos')) {
            throw err;
          }
          // Ignore canvas readback restrictions on mobile webviews
        }
      }

      for (const quality of qualities) {
        const candidate = canvas.toDataURL('image/jpeg', quality);
        compressedDataUrl = candidate;
        finalWidth = targetWidth;
        finalHeight = targetHeight;
        if (candidate.length <= MAX_DATA_URL_CHARS) {
          break outerLoop;
        }
      }
    }

    if (!compressedDataUrl || compressedDataUrl.length < 500) {
      throw new Error('Gagal mengompresi foto bukti transfer. Silakan pilih ulang foto dari galeri.');
    }

    const sizeKb = Math.max(1, Math.round((compressedDataUrl.length * 3) / 4 / 1024));

    return {
      dataUrl: compressedDataUrl,
      width: finalWidth,
      height: finalHeight,
      fileName: file.name || 'bukti-transfer.jpg',
      sizeKb,
      referenceCode: generateReceiptReferenceCode(),
    };
  } finally {
    if (decoded.cleanup) {
      decoded.cleanup();
    }
  }
}

export const validateAndCompressReceipt = compressProofImage;

/**
 * Stores lightweight public donation metadata in `/donations/{id}` (~1 KB) with initial `status: 'pending'`
 * (masking `donorName` as `'Hamba Allah'` whenever `isAnonymous === true` or `showPublicly === false`)
 * and isolates the real sender identity + compressed Base64 receipt in `/donations/{id}/private/proof` atomically via `writeBatch`.
 */
export async function submitDonationWithPrivateProof(payload: SubmitDonationPayload): Promise<string> {
  if (payload.consentAkad !== true || payload.agreedToAkad === false) {
    throw new Error('Harap centang Persetujuan & Akad Infaq terlebih dahulu.');
  }

  const numericAmount = Number(payload.amount);
  if (!Number.isFinite(numericAmount) || numericAmount < MIN_DONATION_AMOUNT) {
    throw new Error('Nominal minimum infaq adalah Rp 2.000');
  }

  if (!payload.receipt || !payload.receipt.dataUrl || payload.receipt.dataUrl.length < 500) {
    throw new Error('Bukti transfer belum terlampir dengan lengkap. Silakan pilih foto struk transfer.');
  }

  const donationRef = doc(collection(db, 'donations'));
  const donationId = donationRef.id;
  const authorUid = auth.currentUser?.uid || 'guest';
  const isExplicitlyPublic = payload.showPublicly === true && payload.isAnonymous !== true;
  const hideIdentityPublicly = !isExplicitlyPublic;
  const rawDonor = (payload.donorName || payload.senderAccount || 'Hamba Allah').trim();
  const publicDonorName = hideIdentityPublicly
    ? 'Hamba Allah'
    : (rawDonor.length >= 1 ? rawDonor : 'Hamba Allah').slice(0, 100);

  const rawSender = (payload.senderAccount || payload.donorName || 'Hamba Allah').trim();
  const safeSenderAccount = (rawSender.length >= 2 ? rawSender : 'Hamba Allah').slice(0, 100);
  const safeProgramId = (String(payload.programId || 'riset-web').trim() || 'riset-web').slice(0, 100);
  const safeProgramTitle = (
    String(payload.programTitle || 'Infaq Operasional & Pemeliharaan Digital').trim() ||
    'Infaq Operasional & Pemeliharaan Digital'
  ).slice(0, 150);
  const safeSiteId = (String(payload.siteId || 'web-riset').trim() || 'web-riset').slice(0, 128);
  const safeSiteName = (
    String(payload.siteName || 'Khazanah Auliya Nusantara').trim() || 'Khazanah Auliya Nusantara'
  ).slice(0, 150);
  const safeReferenceCode = (
    String(payload.receipt.referenceCode || generateReceiptReferenceCode()).trim() || 'ZN-BUKTI'
  ).slice(0, 64);

  const proofRef = doc(db, 'donations', donationId, 'private', 'proof');
  const batch = writeBatch(db);
  const verifiedConsentAkad: boolean = payload.consentAkad;

  batch.set(donationRef, {
    id: donationId,
    programId: safeProgramId,
    programTitle: safeProgramTitle,
    siteId: safeSiteId,
    siteName: safeSiteName,
    amount: Math.min(1000000000, Math.max(MIN_DONATION_AMOUNT, Math.round(numericAmount))),
    donorName: publicDonorName,
    isAnonymous: hideIdentityPublicly,
    showPublicly: isExplicitlyPublic,
    paymentMethod: payload.paymentMethod || 'QRIS',
    hasProof: true,
    referenceCode: safeReferenceCode,
    doaHajat: String(payload.doaHajat || '').slice(0, 200),
    authorUid,
    status: 'pending',
    consentAkad: verifiedConsentAkad,
    consentVersion: String(payload.consentVersion || '2026-11-26').slice(0, 40),
    consentAt: String(payload.consentAt || new Date().toISOString()).slice(0, 64),
    createdAt: serverTimestamp(),
  });

  batch.set(proofRef, {
    donationId,
    senderAccount: safeSenderAccount,
    realDonorName: (rawDonor.length >= 1 ? rawDonor : 'Hamba Allah').slice(0, 100),
    proofImageUrl: payload.receipt.dataUrl,
    referenceCode: safeReferenceCode,
    fileName: String(payload.receipt.fileName || 'receipt.jpg').slice(0, 150),
    sizeKb: Math.max(1, Math.round(Number(payload.receipt.sizeKb) || 50)),
    authorUid,
    createdAt: serverTimestamp(),
  });

  await batch.commit();
  return donationId;
}

/**
 * Fetches the private receipt document `/donations/{id}/private/proof` on demand for Admin Curators,
 * with fallback to legacy parent document fields for older records.
 */
export async function fetchDonationPrivateProof(donationDoc: Record<string, any>): Promise<PrivateProofData | null> {
  if (!donationDoc || !donationDoc.id) return null;
  if (typeof donationDoc.proofImageUrl === 'string' && donationDoc.proofImageUrl.startsWith('data:image/')) {
    return {
      donationId: donationDoc.id,
      senderAccount: donationDoc.senderAccount || donationDoc.donorName || 'Hamba Allah',
      realDonorName: donationDoc.donorName || 'Hamba Allah',
      proofImageUrl: donationDoc.proofImageUrl,
      referenceCode: donationDoc.referenceCode || donationDoc.id.slice(0, 8).toUpperCase(),
    };
  }
  try {
    const snap = await getDoc(doc(db, 'donations', donationDoc.id, 'private', 'proof'));
    if (snap.exists()) {
      const data = snap.data();
      return {
        donationId: donationDoc.id,
        senderAccount: data.senderAccount || donationDoc.donorName || 'Hamba Allah',
        realDonorName: data.realDonorName || data.senderAccount || donationDoc.donorName || 'Hamba Allah',
        proofImageUrl: data.proofImageUrl || '',
        referenceCode: data.referenceCode || donationDoc.referenceCode || donationDoc.id.slice(0, 8).toUpperCase(),
        fileName: data.fileName,
        sizeKb: data.sizeKb,
      };
    }
  } catch (err) {
    console.warn('Failed to fetch private proof subcollection:', err);
  }
  return null;
}

export interface CuratedMunajatItem {
  id: string;
  donorName: string;
  amount: number;
  programTitle: string;
  siteName: string;
  doaHajat: string;
  dateLabel: string;
  createdAtMs: number;
  baseAamiinCount: number;
  aamiinCount?: number;
}

export const FALLBACK_MUNAJAT_ITEMS: CuratedMunajatItem[] = [];

export const GENERAL_MUNAJAT_PRAYERS: CuratedMunajatItem[] = [
  {
    id: 'doa-umum-orang-tua',
    donorName: 'Doa Munajat Bersama',
    amount: 0,
    programTitle: 'Doa Munajat Umum Ahlussunnah',
    siteName: 'Munajat Birrul Walidain & Ampunan Orang Tua',
    doaHajat:
      'Ya Allah, ampunilah dosa-dosa kami dan dosa kedua orang tua kami, sayangilah keduanya sebagaimana mereka menyayangi dan mendidik kami di waktu kecil, serta lapangkanlah alam kubur para leluhur kami.',
    dateLabel: 'Doa Munajat Bersama',
    createdAtMs: 0,
    baseAamiinCount: 0,
  },
  {
    id: 'doa-umum-syifa',
    donorName: 'Doa Munajat Bersama',
    amount: 0,
    programTitle: 'Doa Munajat Umum Ahlussunnah',
    siteName: 'Munajat Kesembuhan (Syifa) & Kesehatan Keluarga',
    doaHajat:
      'Ya Allah Tuhan manusia, hilangkanlah segala penyakit dan rasa sakit, sembuhkanlah dengan kesembuhan dari-Mu yang tidak menyisakan penyakit sedikit pun bagi keluarga serta saudara-saudara kami yang sedang diuji sakit.',
    dateLabel: 'Doa Munajat Bersama',
    createdAtMs: 0,
    baseAamiinCount: 0,
  },
  {
    id: 'doa-umum-ketenangan-hati',
    donorName: 'Doa Munajat Bersama',
    amount: 0,
    programTitle: 'Doa Munajat Umum Ahlussunnah',
    siteName: 'Munajat Ketenangan Hati & Keberkahan Rezeki Halal',
    doaHajat:
      'Ya Allah, teduhkanlah hati yang sedang gelisah, bukakanlah jalan keluar dari setiap kesulitan hidup, dan karuniakanlah rezeki yang halal, thayyib, lagi penuh keberkahan serta keteguhan iman hingga husnul khatimah.',
    dateLabel: 'Doa Munajat Bersama',
    createdAtMs: 0,
    baseAamiinCount: 0,
  },
];

const AAMIIN_STORAGE_KEY = 'zn_munajat_aamiin_map';

export function getStoredAamiinMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(AAMIIN_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function incrementStoredAamiin(itemId: string): Record<string, number> {
  try {
    const current = getStoredAamiinMap();
    const nextCount = (Number(current[itemId]) || 0) + 1;
    const next = { ...current, [itemId]: nextCount };
    localStorage.setItem(AAMIIN_STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return {};
  }
}

export interface VerifiedDonationRecordInput {
  donationId: string;
  siteId?: string;
  programId?: string;
  amount?: number;
}

export function saveVerifiedDonationRecord(
  donationIdOrRecord: string | VerifiedDonationRecordInput,
  siteIdArg?: string,
  programIdArg?: string,
  amountArg?: number
): void {
  try {
    purgeLegacyUnlockStorage();

    const record: VerifiedDonationRecordInput =
      typeof donationIdOrRecord === 'string'
        ? {
            donationId: donationIdOrRecord,
            siteId: siteIdArg,
            programId: programIdArg,
            amount: amountArg,
          }
        : donationIdOrRecord;

    const { donationId, siteId, programId = '', amount = 10000 } = record;
    if (!donationId) return;

    const isBarokahProgram =
      programId === 'barokah-doa' || programId.startsWith('barokah-doa');

    if (isBarokahProgram) {
      localStorage.setItem(BAROKAH_DONATION_ID_KEY, donationId);
      if (siteId) {
        const existingBarokahRaw = localStorage.getItem(BAROKAH_SITE_MAP_KEY);
        const barokahMap: Record<string, string> = existingBarokahRaw
          ? JSON.parse(existingBarokahRaw)
          : {};
        barokahMap[siteId] = donationId;
        localStorage.setItem(BAROKAH_SITE_MAP_KEY, JSON.stringify(barokahMap));
      }
      // Jangan simpan ke RUBRIK_DONATION_ID_KEY jika nominal < 10.000
      if (amount >= 10000 && programId === 'rubrik-manuskrip') {
        localStorage.setItem(RUBRIK_DONATION_ID_KEY, donationId);
      }
    } else if (programId === 'rubrik-manuskrip' || amount >= 10000) {
      localStorage.setItem(RUBRIK_DONATION_ID_KEY, donationId);
      if (siteId) {
        const existingRaw = localStorage.getItem(SITE_DONATION_MAP_KEY);
        const map: Record<string, string> = existingRaw ? JSON.parse(existingRaw) : {};
        map[siteId] = donationId;
        localStorage.setItem(SITE_DONATION_MAP_KEY, JSON.stringify(map));
      }
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

function readStoredDonationId(
  globalKey: string,
  siteMapKey: string,
  siteId?: string
): string | null {
  try {
    purgeLegacyUnlockStorage();
    if (siteId) {
      const rawMap = localStorage.getItem(siteMapKey);
      if (rawMap) {
        const parsed = JSON.parse(rawMap);
        if (parsed && typeof parsed[siteId] === 'string' && parsed[siteId]) {
          return parsed[siteId];
        }
      }
      if (siteId !== 'barokah') {
        return null;
      }
    }
    const globalId = localStorage.getItem(globalKey);
    if (globalId) return globalId;
    return null;
  } catch {
    return null;
  }
}

function useVerifiedScopedUnlock(
  globalKey: string,
  siteMapKey: string,
  siteId?: string,
  requireManualAdminVerification: boolean = false
): DonationUnlockStatus {
  const [donationId, setDonationId] = useState<string | null>(() =>
    readStoredDonationId(globalKey, siteMapKey, siteId)
  );

  const [unlockState, setUnlockState] = useState<{
    isUnlocked: boolean;
    isPendingAdmin: boolean;
    isVerifying: boolean;
    referenceCode: string | null;
    status: string | null;
  }>({
    isUnlocked: false,
    isPendingAdmin: Boolean(donationId),
    isVerifying: Boolean(donationId),
    referenceCode: null,
    status: donationId ? 'pending' : null,
  });

  useEffect(() => {
    const syncFromStorage = () => {
      setDonationId(readStoredDonationId(globalKey, siteMapKey, siteId));
    };

    syncFromStorage();
    window.addEventListener('zn-donation-proof-updated', syncFromStorage);
    window.addEventListener('storage', syncFromStorage);
    return () => {
      window.removeEventListener('zn-donation-proof-updated', syncFromStorage);
      window.removeEventListener('storage', syncFromStorage);
    };
  }, [globalKey, siteMapKey, siteId]);

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

    let cancelled = false;

    setUnlockState((prev) => ({
      ...prev,
      isUnlocked: false,
      isVerifying: true,
    }));

    const checkDonationStatus = async () => {
      try {
        const snap = await getDoc(doc(db, 'donations', donationId));
        if (cancelled) return;
        if (!snap.exists()) {
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
        const docStatus = String(data.status || 'pending');
        const hasValidProof = data.hasProof === true;
        const refCode =
          typeof data.referenceCode === 'string'
            ? data.referenceCode
            : snap.id.slice(0, 8).toUpperCase();

        if (docStatus === 'rejected' || !hasValidProof) {
          setUnlockState({
            isUnlocked: false,
            isPendingAdmin: false,
            isVerifying: false,
            referenceCode: refCode,
            status: docStatus,
          });
          return;
        }

        if (docStatus === 'verified' || docStatus === 'confirmed') {
          setUnlockState({
            isUnlocked: true,
            isPendingAdmin: false,
            isVerifying: false,
            referenceCode: refCode,
            status: docStatus,
          });
          return;
        }

        // docStatus === 'pending' with hasValidProof === true
        if (requireManualAdminVerification) {
          setUnlockState({
            isUnlocked: false,
            isPendingAdmin: true,
            isVerifying: false,
            referenceCode: refCode,
            status: docStatus,
          });
        } else {
          setUnlockState({
            isUnlocked: true,
            isPendingAdmin: true,
            isVerifying: false,
            referenceCode: refCode,
            status: docStatus,
          });
        }
      } catch {
        if (!cancelled) {
          // Strictly lock on any Firestore permission or network error
          setUnlockState({
            isUnlocked: false,
            isPendingAdmin: false,
            isVerifying: false,
            referenceCode: null,
            status: null,
          });
        }
      }
    };

    void checkDonationStatus();

    return () => {
      cancelled = true;
    };
  }, [donationId, requireManualAdminVerification]);

  return {
    ...unlockState,
    donationId,
  };
}

export function useVerifiedDonationUnlock(
  siteId?: string,
  requireManualAdminVerification: boolean = false
): DonationUnlockStatus {
  return useVerifiedScopedUnlock(
    RUBRIK_DONATION_ID_KEY,
    SITE_DONATION_MAP_KEY,
    siteId,
    requireManualAdminVerification
  );
}

export function useVerifiedBarokahUnlock(
  siteId?: string,
  requireManualAdminVerification: boolean = false
): DonationUnlockStatus {
  return useVerifiedScopedUnlock(
    BAROKAH_DONATION_ID_KEY,
    BAROKAH_SITE_MAP_KEY,
    siteId,
    requireManualAdminVerification
  );
}

