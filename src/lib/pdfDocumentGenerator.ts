/**
 * Real Multi-Page PDF Generator with Native Browser RTL Arabic Canvas Shaping
 *
 * IMPORTANT ARCHITECTURAL GUARANTEE:
 * 1. `jspdf` is loaded strictly via dynamic `await import('jspdf')` when the user taps
 *    "Unduh File PDF (.PDF)", ensuring 0 bytes of `jspdf` enter the homepage bundle.
 * 2. We NEVER invoke jsPDF's built-in text API for Arabic because its Latin fonts
 *    cannot shape connected Arabic letters (causing disconnected/reversed mojibake).
 *    Instead, every PDF page is rendered onto a high-DPI HTML5 `<canvas>` using the
 *    browser's native HarfBuzz/CoreText shaping engine (`ctx.direction = 'rtl'`) and
 *    embedded into jsPDF via `pdf.addImage(..., 'JPEG', ...)`.
 */

import { PRAYER_SECTIONS } from '../data/bacaanZiarahData';
import { SURAH_YASIN_VERSES, isCompleteVerifiedYasin } from '../data/surahYasin';
import { MUNAJAT_EMOTION_LABELS, type MunajatNightItem } from '../data/munajat7Malam';

type PageFormat = 'a5' | 'a4';

interface PageGeometry {
  width: number;
  height: number;
  marginX: number;
  marginTop: number;
  marginBottom: number;
  pdfWidthMm: number;
  pdfHeightMm: number;
}

const PAGE_GEOMETRIES: Record<PageFormat, PageGeometry> = {
  a5: {
    width: 1050,
    height: 1485,
    marginX: 82,
    marginTop: 90,
    marginBottom: 96,
    pdfWidthMm: 148,
    pdfHeightMm: 210,
  },
  a4: {
    width: 1240,
    height: 1754,
    marginX: 96,
    marginTop: 100,
    marginBottom: 106,
    pdfWidthMm: 210,
    pdfHeightMm: 297,
  },
};

const ARABIC_FONT_STACK = "'Amiri', 'Noto Naskh Arabic', 'Traditional Arabic', 'Geeza Pro', serif";
const SERIF_FONT_STACK = "'Cormorant Garamond', 'Georgia', 'Times New Roman', serif";
const SANS_FONT_STACK = "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif";

class MultiPageCanvasBook {
  private readonly geom: PageGeometry;
  private readonly pages: HTMLCanvasElement[] = [];
  private ctx!: CanvasRenderingContext2D;
  private cursorY = 0;
  private readonly accentColor: string;
  private readonly headerTitle: string;

  constructor(format: PageFormat, headerTitle: string, accentColor = '#0D3B32') {
    this.geom = PAGE_GEOMETRIES[format];
    this.headerTitle = headerTitle;
    this.accentColor = accentColor;
    this.addNewPage(true);
  }

  public get geometry(): PageGeometry {
    return this.geom;
  }

  public get currentY(): number {
    return this.cursorY;
  }

  public set currentY(y: number) {
    this.cursorY = y;
  }

  public get context(): CanvasRenderingContext2D {
    return this.ctx;
  }

  public addNewPage(isCover = false): void {
    const canvas = document.createElement('canvas');
    canvas.width = this.geom.width;
    canvas.height = this.geom.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas 2D context tidak tersedia pada perangkat ini.');
    }

    this.ctx = ctx;
    this.pages.push(canvas);

    // Warm ivory archival paper background
    ctx.fillStyle = '#FAF8F5';
    ctx.fillRect(0, 0, this.geom.width, this.geom.height);

    // Subtle double frame
    ctx.strokeStyle = '#E2DDD5';
    ctx.lineWidth = 2;
    ctx.strokeRect(36, 36, this.geom.width - 72, this.geom.height - 72);

    if (!isCover) {
      // Running header
      ctx.save();
      ctx.direction = 'ltr';
      ctx.textAlign = 'left';
      ctx.font = `600 17px ${SANS_FONT_STACK}`;
      ctx.fillStyle = '#64748B';
      ctx.fillText(this.headerTitle.slice(0, 72), this.geom.marginX, 66);

      ctx.strokeStyle = '#E2E8F0';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(this.geom.marginX, 78);
      ctx.lineTo(this.geom.width - this.geom.marginX, 78);
      ctx.stroke();
      ctx.restore();
      this.cursorY = this.geom.marginTop + 18;
    } else {
      this.cursorY = this.geom.marginTop;
    }
  }

  public ensureSpace(requiredHeight: number): void {
    const maxContentY = this.geom.height - this.geom.marginBottom;
    if (this.cursorY + requiredHeight > maxContentY) {
      this.addNewPage(false);
    }
  }

  public addVerticalGap(px: number): void {
    this.cursorY += px;
  }

  public drawDivider(): void {
    this.ensureSpace(28);
    this.ctx.save();
    this.ctx.strokeStyle = '#CBD5E1';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(this.geom.marginX, this.cursorY + 10);
    this.ctx.lineTo(this.geom.width - this.geom.marginX, this.cursorY + 10);
    this.ctx.stroke();
    this.ctx.restore();
    this.cursorY += 26;
  }

  public drawSectionBadge(label: string): void {
    this.ensureSpace(50);
    const ctx = this.ctx;
    ctx.save();
    ctx.direction = 'ltr';
    ctx.textAlign = 'left';
    ctx.font = `700 18px ${SANS_FONT_STACK}`;
    ctx.fillStyle = this.accentColor;
    ctx.fillText(label.toUpperCase(), this.geom.marginX, this.cursorY + 20);
    ctx.restore();
    this.cursorY += 32;
  }

  public drawHeading(text: string, fontSize = 30, color = '#0F172A'): void {
    const lines = this.wrapText(text, `700 ${fontSize}px ${SERIF_FONT_STACK}`, this.contentWidth);
    const lineHeight = Math.round(fontSize * 1.32);
    this.ensureSpace(lines.length * lineHeight + 12);

    const ctx = this.ctx;
    ctx.save();
    ctx.direction = 'ltr';
    ctx.textAlign = 'left';
    ctx.font = `700 ${fontSize}px ${SERIF_FONT_STACK}`;
    ctx.fillStyle = color;
    for (const line of lines) {
      this.ensureSpace(lineHeight);
      ctx.fillText(line, this.geom.marginX, this.cursorY + fontSize);
      this.cursorY += lineHeight;
    }
    ctx.restore();
    this.cursorY += 8;
  }

  public drawParagraph(
    text: string,
    options?: {
      fontSize?: number;
      fontStyle?: 'normal' | 'italic' | 'bold';
      color?: string;
      align?: 'left' | 'center';
      indentPx?: number;
    }
  ): void {
    if (!text || !text.trim()) return;
    const fontSize = options?.fontSize ?? 21;
    const fontStyle = options?.fontStyle ?? 'normal';
    const color = options?.color ?? '#334155';
    const align = options?.align ?? 'left';
    const indentPx = options?.indentPx ?? 0;

    const fontWeight = fontStyle === 'bold' ? '700' : '400';
    const italicPrefix = fontStyle === 'italic' ? 'italic ' : '';
    const fontSpec = `${italicPrefix}${fontWeight} ${fontSize}px ${SANS_FONT_STACK}`;
    const maxWidth = this.contentWidth - indentPx;
    const lineHeight = Math.round(fontSize * 1.48);

    const paragraphs = text.split(/\n+/);
    const ctx = this.ctx;

    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (!trimmed) continue;
      const lines = this.wrapText(trimmed, fontSpec, maxWidth);
      for (const line of lines) {
        this.ensureSpace(lineHeight);
        ctx.save();
        ctx.direction = 'ltr';
        ctx.font = fontSpec;
        ctx.fillStyle = color;
        if (align === 'center') {
          ctx.textAlign = 'center';
          ctx.fillText(line, this.geom.width / 2, this.cursorY + fontSize);
        } else {
          ctx.textAlign = 'left';
          ctx.fillText(line, this.geom.marginX + indentPx, this.cursorY + fontSize);
        }
        ctx.restore();
        this.cursorY += lineHeight;
      }
      this.cursorY += 8;
    }
  }

  /**
   * Renders RTL Arabic text using the browser's native shaping engine (`ctx.direction = 'rtl'`)
   * so all Arabic letters connect authentically and display diacritics clearly.
   */
  public drawArabicBlock(arabicText: string, fontSize = 36): void {
    if (!arabicText || !arabicText.trim()) return;
    const fontSpec = `400 ${fontSize}px ${ARABIC_FONT_STACK}`;
    const lineHeight = Math.round(fontSize * 1.85);
    const innerPadX = 28;
    const maxWidth = this.contentWidth - innerPadX * 2;

    const rawLines = arabicText
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);

    const wrappedLines: string[] = [];
    for (const rawLine of rawLines) {
      const subLines = this.wrapText(rawLine, fontSpec, maxWidth);
      wrappedLines.push(...subLines);
    }

    const ctx = this.ctx;
    const rightEdgeX = this.geom.width - this.geom.marginX - innerPadX;

    this.cursorY += 6;
    for (const line of wrappedLines) {
      this.ensureSpace(lineHeight + 12);

      // Soft warm cream highlight behind each Arabic line
      ctx.save();
      ctx.fillStyle = '#F3EFE6';
      ctx.fillRect(
        this.geom.marginX,
        this.cursorY,
        this.contentWidth,
        lineHeight + 4
      );

      // Emerald right border bar for RTL block
      ctx.fillStyle = this.accentColor;
      ctx.fillRect(
        this.geom.width - this.geom.marginX - 5,
        this.cursorY,
        5,
        lineHeight + 4
      );

      ctx.direction = 'rtl';
      ctx.textAlign = 'right';
      ctx.font = fontSpec;
      ctx.fillStyle = '#0F172A';
      ctx.fillText(line, rightEdgeX, this.cursorY + Math.round(fontSize * 1.18));
      ctx.restore();

      this.cursorY += lineHeight + 4;
    }
    this.cursorY += 10;
  }

  public finalizePagesWithFooters(): HTMLCanvasElement[] {
    const total = this.pages.length;
    this.pages.forEach((canvas, idx) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.save();
      ctx.direction = 'ltr';
      ctx.font = `500 16px ${SANS_FONT_STACK}`;
      ctx.fillStyle = '#64748B';

      ctx.textAlign = 'left';
      ctx.fillText(
        'Ziarah Nusantara · ziarahnusantara.my.id',
        this.geom.marginX,
        this.geom.height - 54
      );

      ctx.textAlign = 'right';
      ctx.fillText(
        `Halaman ${idx + 1} dari ${total}`,
        this.geom.width - this.geom.marginX,
        this.geom.height - 54
      );
      ctx.restore();
    });
    return this.pages;
  }

  private get contentWidth(): number {
    return this.geom.width - this.geom.marginX * 2;
  }

  private wrapText(text: string, fontSpec: string, maxWidth: number): string[] {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];

    const ctx = this.ctx;
    ctx.save();
    ctx.font = fontSpec;

    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const candidate = `${currentLine} ${words[i]}`;
      const measured = ctx.measureText ? ctx.measureText(candidate).width : candidate.length * 11;
      if (measured <= maxWidth) {
        currentLine = candidate;
      } else {
        lines.push(currentLine);
        currentLine = words[i];
      }
    }
    lines.push(currentLine);
    ctx.restore();
    return lines;
  }
}

async function loadImageElementSafe(src?: string | null): Promise<HTMLImageElement | null> {
  if (!src) return null;
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

async function ensureFontsReady(): Promise<void> {
  if (typeof document !== 'undefined' && 'fonts' in document && document.fonts?.ready) {
    try {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 1200)),
      ]);
    } catch {
      // Proceed with fallback system fonts if font readiness check fails
    }
  }
}

/**
 * Dynamically imports `jspdf` ONLY at click time and packs rendered HTML5 `<canvas>`
 * pages into an authentic multi-page `application/pdf` Blob.
 */
async function renderPagesToPdfBlob(
  pages: HTMLCanvasElement[],
  format: PageFormat
): Promise<Blob> {
  const { jsPDF } = await import('jspdf');
  const geom = PAGE_GEOMETRIES[format];

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format,
    compress: true,
  });

  pages.forEach((canvas, index) => {
    if (index > 0) {
      pdf.addPage(format, 'portrait');
    }
    const pageDataUrl = canvas.toDataURL('image/jpeg', 0.88);
    pdf.addImage(
      pageDataUrl,
      'JPEG',
      0,
      0,
      geom.pdfWidthMm,
      geom.pdfHeightMm,
      undefined,
      'FAST'
    );
  });

  return pdf.output('blob');
}

// ============================================================================
// 1. BUKU TAHLIL & DOA ARWAH A5 (`generateBukuYasinPdfBlob`)
// ============================================================================

export interface BukuYasinPdfOptions {
  almarhumPrefix: string;
  almarhumName: string;
  nasabLabel: 'bin' | 'binti';
  parentName: string;
  birthYear: string;
  passingDate: string;
  eventLabel: string;
  familyNames: string;
  customPrayerNote: string;
  localPhotoDataUrl: string | null;
  includeFullYasin83?: boolean;
  themeAccentColor?: string;
}

export async function generateBukuYasinPdfBlob(
  options: BukuYasinPdfOptions
): Promise<Blob> {
  await ensureFontsReady();

  const accent = options.themeAccentColor || '#0D3B32';
  const displayName = options.almarhumName.trim() || 'Fulan / Fulanah';
  const fullLineage = options.parentName.trim()
    ? `${options.almarhumPrefix} ${displayName} ${options.nasabLabel} ${options.parentName.trim()}`
    : `${options.almarhumPrefix} ${displayName}`;
  const lifeSpan =
    options.birthYear.trim() || options.passingDate.trim()
      ? `${options.birthYear.trim() || '...'} — ${options.passingDate.trim() || '...'}`
      : 'Rahimahullah / Rahimahallah';

  const book = new MultiPageCanvasBook(
    'a5',
    `Buku Tahlil & Doa Arwah — ${fullLineage}`,
    accent
  );

  // --- PAGE 1: COVER PAGE ---
  const ctx = book.context;
  const geom = book.geometry;

  // Decorative inner border on cover
  ctx.save();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.strokeRect(58, 58, geom.width - 116, geom.height - 116);
  ctx.strokeStyle = '#C2A878';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(70, 70, geom.width - 140, geom.height - 140);

  // Event label badge at top
  ctx.direction = 'ltr';
  ctx.textAlign = 'center';
  ctx.font = `700 20px ${SANS_FONT_STACK}`;
  ctx.fillStyle = accent;
  ctx.fillText(
    (options.eventLabel || 'Mengenang & Kirim Doa').toUpperCase(),
    geom.width / 2,
    150
  );

  // Arabic Istirja
  ctx.direction = 'rtl';
  ctx.textAlign = 'center';
  ctx.font = `400 44px ${ARABIC_FONT_STACK}`;
  ctx.fillStyle = '#0F172A';
  ctx.fillText('إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ', geom.width / 2, 235);

  ctx.direction = 'ltr';
  ctx.font = `italic 400 24px ${SERIF_FONT_STACK}`;
  ctx.fillStyle = '#475569';
  ctx.fillText('Mengenang & Mendoakan', geom.width / 2, 290);
  ctx.restore();

  let nextCoverY = 340;

  // Optional Memorial Photo (Centered oval/rounded frame)
  const photoImg = await loadImageElementSafe(options.localPhotoDataUrl);
  if (photoImg) {
    const photoSize = 260;
    const centerX = geom.width / 2;
    const centerY = nextCoverY + photoSize / 2;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, photoSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const imgW = photoImg.naturalWidth || photoImg.width || photoSize;
    const imgH = photoImg.naturalHeight || photoImg.height || photoSize;
    const scale = Math.max(photoSize / imgW, photoSize / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    ctx.drawImage(
      photoImg,
      centerX - drawW / 2,
      centerY - drawH / 2,
      drawW,
      drawH
    );
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = '#C2A878';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, photoSize / 2 + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    nextCoverY += photoSize + 60;
  } else {
    nextCoverY += 70;
  }

  book.currentY = nextCoverY;
  book.drawParagraph(fullLineage, {
    fontSize: 38,
    fontStyle: 'bold',
    color: '#0F172A',
    align: 'center',
  });
  book.addVerticalGap(8);
  book.drawParagraph(lifeSpan, {
    fontSize: 23,
    color: '#475569',
    align: 'center',
  });

  book.currentY = Math.max(book.currentY + 60, 1080);
  book.drawDivider();
  book.drawParagraph('BUKU SAKU TAWASSUL, TAHLIL & DOA ARWAH', {
    fontSize: 22,
    fontStyle: 'bold',
    color: accent,
    align: 'center',
  });
  if (options.familyNames.trim()) {
    book.drawParagraph(`Keluarga Besar:\n${options.familyNames.trim()}`, {
      fontSize: 20,
      color: '#334155',
      align: 'center',
    });
  }

  // --- PAGE 2: MUQADDIMAH & SAMBUTAN KELUARGA ---
  book.addNewPage(false);
  book.drawSectionBadge('Sambutan & Muqaddimah Keluarga');
  book.drawHeading('Untaian Doa & Permohonan Maaf');
  book.drawArabicBlock('بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ', 38);
  book.drawParagraph(
    `Assalamu’alaikum Warahmatullahi Wabarakatuh.\n\nSegala puji bagi Allah SWT yang telah menghidupkan dan mematikan setiap makhluk-Nya. Shalawat serta salam semoga senantiasa tercurah kepada junjungan kita Nabi Muhammad SAW, beserta keluarga, sahabat, dan para pengikutnya hingga akhir zaman.\n\nDengan penuh kerendahan hati, kami memohon keikhlasan Bapak/Ibu/Saudara/i jamaah sekalian untuk bersama-sama menghadiahkan bacaan Surah Al-Fatihah, kalimat thayyibah Tahlil, Tasbih, Tahmid, serta Doa Arwah yang pahalanya kita hadiahkan khusus untuk ruh ${fullLineage}.`
  );
  if (options.customPrayerNote.trim()) {
    book.addVerticalGap(12);
    book.drawParagraph(`"${options.customPrayerNote.trim()}"`, {
      fontSize: 22,
      fontStyle: 'italic',
      color: '#0F172A',
    });
  }
  book.addVerticalGap(16);
  book.drawParagraph(
    'Semoga Allah SWT menerima seluruh amal ibadah beliau, mengampuni segala kekhilafannya, melapangkan kuburnya sejauh mata memandang, serta menempatkannya di sisi terbaik bersama para kekasih-Nya. Aamiin Ya Rabbal Alamin.'
  );
  if (options.familyNames.trim()) {
    book.addVerticalGap(24);
    book.drawParagraph('Kami yang berduka cita & memohon doa:', {
      fontSize: 19,
      color: '#64748B',
    });
    book.drawParagraph(options.familyNames.trim(), {
      fontSize: 23,
      fontStyle: 'bold',
      color: '#0F172A',
    });
  }

  // --- PAGE 3+: TAWASSUL, YASIN (OR RINGKASAN), TAHLIL & DOA ARWAH ---
  book.addNewPage(false);

  const includeFull83 =
    Boolean(options.includeFullYasin83) && isCompleteVerifiedYasin(SURAH_YASIN_VERSES);

  const sectionsToRender = PRAYER_SECTIONS.filter((s) =>
    includeFull83
      ? s.id === 'TAWASSUL' || s.id === 'TAHLIL' || s.id === 'DOA'
      : s.id === 'TAWASSUL' || s.id === 'YASIN' || s.id === 'TAHLIL' || s.id === 'DOA'
  );

  for (const section of sectionsToRender) {
    book.drawSectionBadge(section.stepLabel);
    book.drawHeading(section.title, 28);
    book.drawParagraph(section.subtitle, {
      fontSize: 18,
      fontStyle: 'italic',
      color: '#64748B',
    });
    book.addVerticalGap(6);

    for (const arabicLine of section.arabicLines) {
      book.drawArabicBlock(arabicLine, 35);
    }

    if (section.id === 'TAWASSUL') {
      book.drawParagraph(
        `Khushushan ilaa ruuhi ${fullLineage} — Allahummaghfir lahu/lahaa warhamhu/warhamhaa wa 'aafihi/wa 'aafihaa wa'fu 'anhu/'anhaa... Al-Fatihah.`,
        {
          fontSize: 21,
          fontStyle: 'bold',
          color: accent,
        }
      );
    }

    book.drawParagraph(section.latinText, {
      fontSize: 19,
      fontStyle: 'italic',
      color: '#334155',
    });
    book.drawParagraph(`Artinya: "${section.translationText}"`, {
      fontSize: 19,
      color: '#475569',
    });
    book.drawDivider();

    // Inject full 83-verse Surah Yasin right after Tawassul when complete & requested
    if (section.id === 'TAWASSUL' && includeFull83) {
      book.drawSectionBadge('Surah Yasin Lengkap (83 Ayat)');
      book.drawHeading('Surah Yasin — QS. Yasin: 1–83', 28);
      book.drawArabicBlock('بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ', 36);
      for (const ayah of SURAH_YASIN_VERSES) {
        book.drawArabicBlock(`${ayah.arabic} ﴿${ayah.number}﴾`, 34);
        book.drawParagraph(`${ayah.number}. ${ayah.latin}`, {
          fontSize: 18,
          fontStyle: 'italic',
          color: '#334155',
        });
        book.drawParagraph(`"${ayah.translation}"`, {
          fontSize: 18,
          color: '#475569',
        });
      }
      book.drawDivider();
    }
  }

  return renderPagesToPdfBlob(book.finalizePagesWithFooters(), 'a5');
}

// ============================================================================
// 2. BUKU SAKU MUNAJAT 7 MALAM A5 (`generateMunajat7MalamPdfBlob`)
// ============================================================================

export interface Munajat7MalamPdfOptions {
  peziarahName: string;
  personalHajat: string;
  nights: readonly MunajatNightItem[];
  mode: 'day1' | 'all7';
}

export async function generateMunajat7MalamPdfBlob(
  options: Munajat7MalamPdfOptions
): Promise<Blob> {
  await ensureFontsReady();

  const displayName = options.peziarahName.trim() || 'Hamba Allah';
  const selectedNights =
    options.mode === 'day1' ? options.nights.slice(0, 1) : options.nights;
  const subtitleLabel =
    options.mode === 'day1'
      ? 'Edisi Malam ke-1 (Melepas Lelah & Istighfar)'
      : 'Edisi Lengkap Malam ke-1 s/d Malam ke-7';

  const book = new MultiPageCanvasBook(
    'a5',
    `Buku Saku Munajat 7 Malam — ${displayName}`,
    '#0D3B32'
  );

  // Cover header on Page 1
  book.drawSectionBadge('Program Riyadlah & Muhasabah Hati');
  book.drawHeading('Buku Saku Munajat 7 Malam Para Waliyullah', 36);
  book.drawParagraph(subtitleLabel, {
    fontSize: 22,
    fontStyle: 'bold',
    color: '#0D3B32',
  });
  book.addVerticalGap(12);
  book.drawParagraph(`Disusun Khusus Untuk:\n${displayName}`, {
    fontSize: 24,
    fontStyle: 'bold',
    color: '#0F172A',
  });
  if (options.personalHajat.trim()) {
    book.addVerticalGap(8);
    book.drawParagraph(`Niat & Hajat Munajat:\n"${options.personalHajat.trim()}"`, {
      fontSize: 21,
      fontStyle: 'italic',
      color: '#334155',
    });
  }
  book.drawDivider();

  for (const night of selectedNights) {
    const emotionInfo = MUNAJAT_EMOTION_LABELS[night.emotionTag];
    book.drawSectionBadge(
      `Malam ke-${night.day} · ${emotionInfo ? emotionInfo.label : night.emotionTag}`
    );
    book.drawHeading(night.title, 30);
    book.drawParagraph(
      `Teladan: ${night.relatedUlamaName} — ${night.relatedWisdomTitle}`,
      {
        fontSize: 19,
        fontStyle: 'bold',
        color: '#0D3B32',
      }
    );
    book.addVerticalGap(6);

    book.drawArabicBlock(night.arabic, 36);

    book.drawParagraph(night.latin, {
      fontSize: 20,
      fontStyle: 'italic',
      color: '#334155',
    });
    book.drawParagraph(`Artinya: "${night.translation}"`, {
      fontSize: 20,
      color: '#0F172A',
    });
    book.drawParagraph(`Sumber Rujukan Sahih: ${night.sourceRef}`, {
      fontSize: 18,
      fontStyle: 'bold',
      color: '#475569',
    });
    book.addVerticalGap(6);
    book.drawParagraph(`Tadabbur & Nasihat:\n${night.reflection}`, {
      fontSize: 19,
      color: '#334155',
    });
    book.drawParagraph(`Langkah Ikhtiar Nyata Esok Hari:\n${night.actionStep}`, {
      fontSize: 19,
      fontStyle: 'bold',
      color: '#0D3B32',
    });
    book.drawDivider();
  }

  return renderPagesToPdfBlob(book.finalizePagesWithFooters(), 'a5');
}

// ============================================================================
// 3. BUKU SAKU RUTE ROMBONGAN A4 (`generatePanduanRutePdfBlob`)
// ============================================================================

export interface PanduanRuteStopItem {
  id: string;
  name: string;
  title?: string;
  city: string;
  province: string;
  description: string;
  historySummary?: string;
  doaKhusus?: Array<{
    title: string;
    text: string;
    latin?: string;
    translation?: string;
  }>;
  references?: string[];
}

export interface PanduanRuteAdabItem {
  step: string;
  title: string;
  desc: string;
}

export interface PanduanRutePdfOptions {
  groupName: string;
  coordinatorName: string;
  departureDate: string;
  routeTitle: string;
  routeRegion: string;
  routeDurationLabel: string;
  stops: PanduanRuteStopItem[];
  adabChecklist: PanduanRuteAdabItem[];
}

export async function generatePanduanRutePdfBlob(
  options: PanduanRutePdfOptions
): Promise<Blob> {
  await ensureFontsReady();

  const groupLabel = options.groupName.trim() || 'Jamaah Peziarah Nusantara';
  const book = new MultiPageCanvasBook(
    'a4',
    `Buku Saku Rute Ziarah — ${groupLabel}`,
    '#0D3B32'
  );

  book.drawSectionBadge(`Panduan Rute & Adab Rombongan · ${options.routeRegion}`);
  book.drawHeading(options.routeTitle, 38);
  book.drawParagraph(
    `Rombongan: ${groupLabel}${
      options.coordinatorName.trim() ? ` · Koordinator: ${options.coordinatorName.trim()}` : ''
    }${options.departureDate.trim() ? ` · Jadwal: ${options.departureDate.trim()}` : ''} · Estimasi: ${
      options.routeDurationLabel
    }`,
    {
      fontSize: 22,
      fontStyle: 'bold',
      color: '#0D3B32',
    }
  );
  book.drawDivider();

  // Adab checklist
  book.drawSectionBadge('6 Adab Ziarah Kubur Sesuai Sunnah & Tradisi Pesantren');
  for (const adab of options.adabChecklist) {
    book.drawParagraph(`${adab.step}. ${adab.title}: ${adab.desc}`, {
      fontSize: 20,
      color: '#1E293B',
    });
  }
  book.drawDivider();

  // Ordered stops
  options.stops.forEach((stop, index) => {
    book.drawSectionBadge(
      `Titik Ziarah #${index + 1} · ${stop.city}, ${stop.province}`
    );
    book.drawHeading(stop.title ? `${stop.title} (${stop.name})` : stop.name, 31);
    book.drawParagraph(stop.description, {
      fontSize: 20,
      color: '#334155',
    });

    if (stop.historySummary) {
      book.drawParagraph(`Ringkasan Sejarah & Keteladanan:\n${stop.historySummary}`, {
        fontSize: 19,
        color: '#475569',
      });
    }

    if (stop.doaKhusus && stop.doaKhusus.length > 0) {
      for (const doa of stop.doaKhusus.slice(0, 2)) {
        book.drawParagraph(`Amalan & Doa di Maqbarah: ${doa.title}`, {
          fontSize: 20,
          fontStyle: 'bold',
          color: '#0D3B32',
        });
        book.drawArabicBlock(doa.text, 34);
        if (doa.latin) {
          book.drawParagraph(doa.latin, {
            fontSize: 18,
            fontStyle: 'italic',
            color: '#334155',
          });
        }
        if (doa.translation) {
          book.drawParagraph(`Artinya: "${doa.translation}"`, {
            fontSize: 18,
            color: '#475569',
          });
        }
      }
    }

    if (stop.references && stop.references.length > 0) {
      book.drawParagraph(
        `Referensi Terverifikasi: ${stop.references.slice(0, 2).join(' · ')}`,
        {
          fontSize: 17,
          color: '#64748B',
        }
      );
    }

    book.drawDivider();
  });

  return renderPagesToPdfBlob(book.finalizePagesWithFooters(), 'a4');
}

// ============================================================================
// 4. LEMBAR AMALAN MAQBARAH A5 (`generateSiteBarokahPdfBlob`)
// ============================================================================

export interface SiteBarokahPdfOptions {
  siteName: string;
  siteTitle: string;
  city: string;
  province: string;
  personalHajat?: string;
  tawassulNodes: Array<{
    order: number;
    label: string;
    arabic: string;
    latin: string;
    translation: string;
  }>;
  doaKhususItems: Array<{
    title: string;
    text: string;
    latin?: string;
    translation?: string;
  }>;
  canonicalPrayers: Array<{
    title: string;
    sourceCitation: string;
    targetCount: number;
    arabic: string;
    latin: string;
    translation: string;
  }>;
  slug: string;
}

export async function generateSiteBarokahPdfBlob(
  options: SiteBarokahPdfOptions
): Promise<Blob> {
  await ensureFontsReady();

  const book = new MultiPageCanvasBook(
    'a5',
    `Kitab Amalan Maqbarah — ${options.siteName}`,
    '#0D3B32'
  );

  book.drawSectionBadge(`Lembar Amalan & Tawassul Maqbarah · ${options.city}, ${options.province}`);
  book.drawHeading(`${options.siteTitle} (${options.siteName})`, 32);

  if (options.personalHajat && options.personalHajat.trim()) {
    book.drawParagraph(
      `Niat & Hajat Munajat Pribadi:\n"${options.personalHajat.trim()}"`,
      {
        fontSize: 21,
        fontStyle: 'italic',
        color: '#0D3B32',
      }
    );
  }
  book.drawDivider();

  book.drawSectionBadge('Bagian I — Silsilah Hadiah Al-Fatihah (4 Simpul Tawassul)');
  for (const node of options.tawassulNodes) {
    book.drawParagraph(`${node.order}. ${node.label}`, {
      fontSize: 21,
      fontStyle: 'bold',
      color: '#0F172A',
    });
    book.drawArabicBlock(node.arabic, 34);
    book.drawParagraph(node.latin, {
      fontSize: 18,
      fontStyle: 'italic',
      color: '#334155',
    });
    book.drawParagraph(`Artinya: "${node.translation}"`, {
      fontSize: 18,
      color: '#475569',
    });
    book.addVerticalGap(8);
  }
  book.drawDivider();

  if (options.doaKhususItems.length > 0) {
    book.drawSectionBadge('Bagian II — Wirid & Doa Warisan Maqbarah');
    for (const doa of options.doaKhususItems) {
      book.drawParagraph(doa.title, {
        fontSize: 22,
        fontStyle: 'bold',
        color: '#0D3B32',
      });
      book.drawArabicBlock(doa.text, 35);
      if (doa.latin) {
        book.drawParagraph(doa.latin, {
          fontSize: 18,
          fontStyle: 'italic',
          color: '#334155',
        });
      }
      if (doa.translation) {
        book.drawParagraph(`Artinya: "${doa.translation}"`, {
          fontSize: 18,
          color: '#475569',
        });
      }
      book.addVerticalGap(10);
    }
    book.drawDivider();
  }

  book.drawSectionBadge("Bagian III — Rangkaian Ayat Al-Qur'an & Doa Nabawi Sahih");
  for (const prayer of options.canonicalPrayers) {
    book.drawParagraph(
      `${prayer.title} (${prayer.sourceCitation} · Dibaca ${prayer.targetCount}x)`,
      {
        fontSize: 21,
        fontStyle: 'bold',
        color: '#0F172A',
      }
    );
    book.drawArabicBlock(prayer.arabic, 34);
    book.drawParagraph(prayer.latin, {
      fontSize: 18,
      fontStyle: 'italic',
      color: '#334155',
    });
    book.drawParagraph(`Artinya: "${prayer.translation}"`, {
      fontSize: 18,
      color: '#475569',
    });
    book.addVerticalGap(10);
  }

  return renderPagesToPdfBlob(book.finalizePagesWithFooters(), 'a5');
}
