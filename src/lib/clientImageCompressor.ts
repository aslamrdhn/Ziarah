/**
 * Client-side Image Compressor (Buffer-First Android `content://` Safe)
 * Immediately copies local camera or gallery photo bytes into an in-memory Blob
 * in RAM, decodes via a 3-stage fallback pipeline (ObjectURL -> createImageBitmap -> FileReader),
 * resizes to maxDimension, and compresses on an offscreen HTML5 Canvas (< 250 KB default).
 */

import { materializeFileBlob } from './transferProof';

export { materializeFileBlob };

export interface CompressImageOptions {
  maxDimension?: number;
  maxBytes?: number;
  quality?: number;
}

export interface CompressedImageResult {
  dataUrl: string;
  sizeKb: number;
  width: number;
  height: number;
}

const MAX_INPUT_FILE_BYTES = 15 * 1024 * 1024; // 15 MB

function readBlobAsDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string' && reader.result.startsWith('data:')) {
        resolve(reader.result);
      } else {
        reject(new Error('Gagal membaca file gambar.'));
      }
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar dari perangkat.'));
    reader.readAsDataURL(blob);
  });
}

function loadImageFromSrc(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Format gambar tidak dapat diproses oleh browser.'));
    img.src = src;
  });
}

async function decodeBlobResilient(
  safeBlob: Blob
): Promise<{
  source: CanvasImageSource;
  width: number;
  height: number;
  fallbackDataUrl?: string;
  cleanup?: () => void;
}> {
  const errors: string[] = [];

  // Path 1: URL.createObjectURL(safeBlob) + new Image()
  if (
    typeof URL !== 'undefined' &&
    typeof URL.createObjectURL === 'function' &&
    typeof Image !== 'undefined'
  ) {
    let objectUrl = '';
    try {
      objectUrl = URL.createObjectURL(safeBlob);
      const img = await loadImageFromSrc(objectUrl);
      const width = img.naturalWidth || img.width || 800;
      const height = img.naturalHeight || img.height || 800;
      return {
        source: img,
        width,
        height,
        cleanup: () => {
          try {
            if (objectUrl) URL.revokeObjectURL(objectUrl);
          } catch {
            // Ignore revoke error
          }
        },
      };
    } catch (err: any) {
      errors.push(`ObjectURL: ${err?.message || 'error'}`);
      try {
        if (objectUrl) URL.revokeObjectURL(objectUrl);
      } catch {
        // Ignore revoke error
      }
    }
  }

  // Path 2: createImageBitmap(safeBlob)
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
              // Ignore cleanup error
            }
          },
        };
      }
    } catch (err: any) {
      errors.push(`createImageBitmap: ${err?.message || 'error'}`);
    }
  }

  // Path 3: FileReader.readAsDataURL(safeBlob) + new Image()
  try {
    const rawDataUrl = await readBlobAsDataUrl(safeBlob);
    const img = await loadImageFromSrc(rawDataUrl);
    return {
      source: img,
      width: img.naturalWidth || img.width || 800,
      height: img.naturalHeight || img.height || 800,
      fallbackDataUrl: rawDataUrl,
    };
  } catch (err: any) {
    errors.push(`FileReader: ${err?.message || 'error'}`);
    console.error('[clientImageCompressor] All 3 image decode paths failed:', errors);
    throw new Error(
      'Format gambar tidak dapat diproses oleh browser. Silakan pilih foto JPG, PNG, atau WEBP.'
    );
  }
}

export async function compressLocalImageFile(
  file: File,
  options?: CompressImageOptions
): Promise<CompressedImageResult> {
  if (!file) {
    throw new Error('Tidak ada file gambar yang dipilih.');
  }

  const lowerType = String(file.type || '').toLowerCase().trim();
  const lowerName = String(file.name || '').toLowerCase().trim();
  const isImageMime =
    !lowerType ||
    lowerType.startsWith('image/') ||
    /\.(jpe?g|png|webp|heic|heif|bmp|gif)$/i.test(lowerName);

  if (!isImageMime) {
    throw new Error('Format file harus berupa gambar (JPG, PNG, atau WEBP).');
  }

  if (file.size > MAX_INPUT_FILE_BYTES) {
    throw new Error('Ukuran file terlalu besar (maksimal 15 MB).');
  }

  const maxDimension = options?.maxDimension ?? 1000;
  const maxBytes = options?.maxBytes ?? 250 * 1024;
  const initialQuality = options?.quality ?? 0.82;

  // Step 1: Copy bytes into RAM immediately so Android content:// handles cannot expire
  const safeBlob = await materializeFileBlob(file);

  // Safe fallback for Node / unit test environments without DOM
  if (typeof document === 'undefined') {
    const rawDataUrl = await readBlobAsDataUrl(safeBlob);
    return {
      dataUrl: rawDataUrl,
      sizeKb: Math.max(1, Math.round(safeBlob.size / 1024)),
      width: maxDimension,
      height: maxDimension,
    };
  }

  const decoded = await decodeBlobResilient(safeBlob);

  try {
    let width = decoded.width;
    let height = decoded.height;

    if (width > maxDimension || height > maxDimension) {
      if (width >= height) {
        height = Math.round((height * maxDimension) / width);
        width = maxDimension;
      } else {
        width = Math.round((width * maxDimension) / height);
        height = maxDimension;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, width);
    canvas.height = Math.max(1, height);

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      const fallbackUrl = decoded.fallbackDataUrl || (await readBlobAsDataUrl(safeBlob));
      return {
        dataUrl: fallbackUrl,
        sizeKb: Math.max(1, Math.round(safeBlob.size / 1024)),
        width,
        height,
      };
    }

    // Paint white background for transparent PNGs
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(decoded.source, 0, 0, canvas.width, canvas.height);

    let quality = initialQuality;
    let dataUrl = canvas.toDataURL('image/jpeg', quality);
    let estimatedBytes = Math.round((dataUrl.length * 3) / 4);

    while (estimatedBytes > maxBytes && quality > 0.35) {
      quality -= 0.1;
      dataUrl = canvas.toDataURL('image/jpeg', Math.max(0.3, quality));
      estimatedBytes = Math.round((dataUrl.length * 3) / 4);
    }

    // Second pass downscale if still larger than maxBytes
    if (estimatedBytes > maxBytes && (width > 640 || height > 640)) {
      const scale = 0.75;
      width = Math.max(320, Math.round(width * scale));
      height = Math.max(320, Math.round(height * scale));
      canvas.width = width;
      canvas.height = height;
      const ctx2 = canvas.getContext('2d');
      if (ctx2) {
        ctx2.fillStyle = '#FFFFFF';
        ctx2.fillRect(0, 0, width, height);
        ctx2.drawImage(decoded.source, 0, 0, width, height);
        dataUrl = canvas.toDataURL('image/jpeg', 0.68);
        estimatedBytes = Math.round((dataUrl.length * 3) / 4);
      }
    }

    return {
      dataUrl,
      sizeKb: Math.max(1, Math.round(estimatedBytes / 1024)),
      width,
      height,
    };
  } finally {
    decoded.cleanup?.();
  }
}
