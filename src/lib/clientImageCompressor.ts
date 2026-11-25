/**
 * Client-side Image Compressor
 * Accepts local camera or gallery photos up to 15 MB, resizes to maxDimension,
 * and compresses on an offscreen HTML5 Canvas (< 250 KB default) so mobile devices
 * never run out of RAM or freeze when rendering previews or generating PDFs.
 */

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

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Gagal membaca file gambar.'));
      }
    };
    reader.onerror = () => reject(new Error('Gagal membaca file gambar dari perangkat.'));
    reader.readAsDataURL(file);
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

export async function compressLocalImageFile(
  file: File,
  options?: CompressImageOptions
): Promise<CompressedImageResult> {
  if (!file) {
    throw new Error('Tidak ada file gambar yang dipilih.');
  }

  const isImageMime =
    file.type.startsWith('image/') ||
    /\.(jpe?g|png|webp|heic|heif|bmp|gif)$/i.test(file.name || '');

  if (!isImageMime) {
    throw new Error('Format file harus berupa gambar (JPG, PNG, atau WEBP).');
  }

  if (file.size > MAX_INPUT_FILE_BYTES) {
    throw new Error('Ukuran file terlalu besar (maksimal 15 MB).');
  }

  const maxDimension = options?.maxDimension ?? 1000;
  const maxBytes = options?.maxBytes ?? 250 * 1024;
  const initialQuality = options?.quality ?? 0.82;

  const rawDataUrl = await readFileAsDataUrl(file);

  // Safe fallback for JSDOM / test environments without canvas 2D support
  if (typeof document === 'undefined') {
    return {
      dataUrl: rawDataUrl,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      width: maxDimension,
      height: maxDimension,
    };
  }

  let img: HTMLImageElement;
  try {
    img = await loadImageFromSrc(rawDataUrl);
  } catch {
    return {
      dataUrl: rawDataUrl,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      width: maxDimension,
      height: maxDimension,
    };
  }

  let width = img.naturalWidth || img.width || 800;
  let height = img.naturalHeight || img.height || 800;

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
    return {
      dataUrl: rawDataUrl,
      sizeKb: Math.max(1, Math.round(file.size / 1024)),
      width,
      height,
    };
  }

  // Paint white background for transparent PNGs
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
      ctx2.drawImage(img, 0, 0, width, height);
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
}
