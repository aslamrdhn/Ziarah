export type MunajatCardPaletteId = 'deep-pine' | 'midnight' | 'warm-stone';

export interface PersonalMunajatCardParams {
  recipientName: string;
  prayerText: string;
  themeLabel: string;
  createdDateLabel: string;
  cardPalette?: MunajatCardPaletteId;
}

export function sanitizeMunajatCardInput(params: Partial<PersonalMunajatCardParams>): PersonalMunajatCardParams {
  const cleanRecipient = String(params.recipientName || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 80);

  const cleanPrayer = String(params.prayerText || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 220);

  const cleanTheme = String(params.themeLabel || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60);

  const cleanDate = String(params.createdDateLabel || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 50);

  const rawPalette = params.cardPalette;
  const cardPalette: MunajatCardPaletteId =
    rawPalette === 'midnight' || rawPalette === 'warm-stone' || rawPalette === 'deep-pine'
      ? rawPalette
      : 'deep-pine';

  return {
    recipientName: cleanRecipient || 'Hamba Allah & Keluarga',
    prayerText:
      cleanPrayer ||
      'Ya Allah, ampunilah khilaf orang tua dan keluarga kami, lapangkanlah hati kami dalam ketaatan, dan mudahkanlah setiap ikhtiar yang halal dan berkah.',
    themeLabel: cleanTheme || 'Hadiah Al-Fatihah Orang Tua',
    createdDateLabel:
      cleanDate ||
      new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    cardPalette,
  };
}

/**
 * Pure text line-splitter that estimates or uses canvas measureText to wrap text
 * safely within maxWidth and caps at maxLines with an ellipsis if truncated.
 */
export function wrapCanvasText(
  ctx: { measureText?: (text: string) => { width: number } } | null | undefined,
  text: string,
  maxWidth: number,
  maxLines: number
): string[] {
  const normalized = String(text || '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!normalized || maxLines <= 0) return [];

  const measure = (str: string): number => {
    if (ctx && typeof ctx.measureText === 'function') {
      try {
        return ctx.measureText(str).width;
      } catch {
        // fallback to character width estimation
      }
    }
    return str.length * 14;
  };

  const words = normalized.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (measure(candidate) <= maxWidth || !currentLine) {
      currentLine = candidate;
    } else {
      lines.push(currentLine);
      currentLine = word;
      if (lines.length === maxLines - 1) {
        const remainingWords = [currentLine, ...words.slice(i + 1)].join(' ');
        let lastLine = remainingWords;
        while (lastLine.length > 3 && measure(`${lastLine}…`) > maxWidth) {
          lastLine = lastLine.slice(0, -1).trim();
        }
        lines.push(lastLine.length < remainingWords.length ? `${lastLine}…` : lastLine);
        return lines;
      }
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  return lines.slice(0, maxLines);
}

const FALLBACK_1X1_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export async function renderPersonalMunajatCard(
  rawParams: PersonalMunajatCardParams
): Promise<string> {
  const params = sanitizeMunajatCardInput(rawParams);

  try {
    if (typeof document === 'undefined') {
      return FALLBACK_1X1_PNG;
    }

    const canvas = document.createElement('canvas');
    const WIDTH = 1080;
    const HEIGHT = 1350;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return FALLBACK_1X1_PNG;
    }

    // 1. Background frame based on Apple Swatch Dots selection
    const outerFrameColor =
      params.cardPalette === 'midnight'
        ? '#16181A'
        : params.cardPalette === 'warm-stone'
          ? '#EDEBE6'
          : '#163326';
    const innerPaperColor = params.cardPalette === 'warm-stone' ? '#FFFFFF' : '#FAF8F5';
    ctx.fillStyle = outerFrameColor;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // Outer gold border (#C5A059)
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 3;
    ctx.strokeRect(42, 42, WIDTH - 84, HEIGHT - 84);

    // Warm archival cream paper panel
    ctx.fillStyle = innerPaperColor;
    ctx.fillRect(62, 62, WIDTH - 124, HEIGHT - 124);

    // Inner double gold border (#C5A059)
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 2;
    ctx.strokeRect(82, 82, WIDTH - 164, HEIGHT - 164);

    ctx.strokeStyle = 'rgba(197, 160, 89, 0.45)';
    ctx.lineWidth = 1;
    ctx.strokeRect(94, 94, WIDTH - 188, HEIGHT - 188);

    const centerX = WIDTH / 2;

    // 2. Thin Dome Silhouette at Top
    ctx.save();
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(centerX - 70, 175);
    ctx.quadraticCurveTo(centerX - 65, 130, centerX, 114);
    ctx.quadraticCurveTo(centerX + 65, 130, centerX + 70, 175);
    ctx.closePath();
    ctx.stroke();

    // Finial atop dome
    ctx.beginPath();
    ctx.moveTo(centerX, 102);
    ctx.lineTo(centerX, 114);
    ctx.stroke();
    ctx.restore();

    // 3. Small Gold Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8C6D2E';
    ctx.font = 'bold 21px system-ui, -apple-system, sans-serif';
    ctx.fillText('ZIARAH NUSANTARA · LEMBAR MUNAJAT PRIBADI', centerX, 224);

    // Theme Tag Pill
    ctx.fillStyle = '#064E3B';
    ctx.font = '600 20px system-ui, -apple-system, sans-serif';
    ctx.fillText(`Tema Munajat: ${params.themeLabel}`, centerX, 260);

    // 4. Main Serif Title
    ctx.fillStyle = '#071A15';
    ctx.font = 'bold 50px Georgia, "Times New Roman", serif';
    ctx.fillText('Hadiah Al-Fatihah & Doa Munajat', centerX, 326);

    // Ornamental divider line
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 180, 354);
    ctx.lineTo(centerX + 180, 354);
    ctx.stroke();

    // 5. Personal Recipient Block
    ctx.fillStyle = '#F3EFE6';
    ctx.strokeStyle = '#D8C7A0';
    ctx.lineWidth = 1.5;
    const recBoxX = 135;
    const recBoxY = 384;
    const recBoxW = WIDTH - 270;
    const recBoxH = 148;
    ctx.fillRect(recBoxX, recBoxY, recBoxW, recBoxH);
    ctx.strokeRect(recBoxX, recBoxY, recBoxW, recBoxH);

    ctx.fillStyle = '#57534E';
    ctx.font = '600 21px system-ui, -apple-system, sans-serif';
    ctx.fillText('Teruntuk / Atas Nama:', centerX, recBoxY + 42);

    ctx.fillStyle = '#064E3B';
    ctx.font = 'bold 34px Georgia, "Times New Roman", serif';
    const recipientLines = wrapCanvasText(ctx, params.recipientName, recBoxW - 60, 2);
    recipientLines.forEach((line, idx) => {
      ctx.fillText(line, centerX, recBoxY + 88 + idx * 38);
    });

    // 6. Authentic Short Prayer Block (Latin & Translation safe on all mobile devices)
    const latinPrayer =
      '"Rabbighfir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa — Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa \'adzaaban-naar."';
    const translationPrayer =
      'Artinya: "Ya Tuhanku, ampunilah aku dan kedua orang tuaku, sayangilah keduanya sebagaimana mereka menyayangiku di waktu kecil. Ya Tuhan kami, karuniakanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, serta peliharalah kami dari siksa neraka." (QS. Al-Isra: 24 & QS. Al-Baqarah: 201)';

    ctx.fillStyle = '#1C1917';
    ctx.font = 'italic 24px Georgia, "Times New Roman", serif';
    const latinLines = wrapCanvasText(ctx, latinPrayer, WIDTH - 290, 3);
    let cursorY = 588;
    latinLines.forEach((line) => {
      ctx.fillText(line, centerX, cursorY);
      cursorY += 35;
    });

    cursorY += 10;
    ctx.fillStyle = '#57534E';
    ctx.font = '20px system-ui, -apple-system, sans-serif';
    const transLines = wrapCanvasText(ctx, translationPrayer, WIDTH - 290, 4);
    transLines.forEach((line) => {
      ctx.fillText(line, centerX, cursorY);
      cursorY += 30;
    });

    // 7. Personal Prayer / Hajat Block (max 5 lines)
    const prayerBoxX = 135;
    const prayerBoxY = 825;
    const prayerBoxW = WIDTH - 270;
    const prayerBoxH = 310;

    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#C5A059';
    ctx.lineWidth = 1.8;
    ctx.fillRect(prayerBoxX, prayerBoxY, prayerBoxW, prayerBoxH);
    ctx.strokeRect(prayerBoxX, prayerBoxY, prayerBoxW, prayerBoxH);

    ctx.fillStyle = '#8C6D2E';
    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
    ctx.fillText('MUNAJAT & HARAPAN PRIBADI', centerX, prayerBoxY + 42);

    ctx.fillStyle = '#0F172A';
    ctx.font = 'italic 29px Georgia, "Times New Roman", serif';
    const personalPrayerLines = wrapCanvasText(
      ctx,
      `"${params.prayerText}"`,
      prayerBoxW - 80,
      5
    );
    const startPrayerY = prayerBoxY + 95;
    personalPrayerLines.forEach((line, idx) => {
      ctx.fillText(line, centerX, startPrayerY + idx * 41);
    });

    // 8. Footer
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(centerX - 240, 1172);
    ctx.lineTo(centerX + 240, 1172);
    ctx.stroke();

    ctx.fillStyle = '#064E3B';
    ctx.font = 'italic 22px Georgia, "Times New Roman", serif';
    ctx.fillText(
      '"Semoga Allah SWT melapangkan hati dan mengijabah doa kita."',
      centerX,
      1208
    );

    ctx.fillStyle = '#57534E';
    ctx.font = '600 19px system-ui, -apple-system, sans-serif';
    ctx.fillText(
      `Disusun melalui ziarahnusantara.my.id · ${params.createdDateLabel}`,
      centerX,
      1242
    );

    return canvas.toDataURL('image/png');
  } catch {
    return FALLBACK_1X1_PNG;
  }
}

export async function renderPersonalMunajatCardBlob(
  rawParams: PersonalMunajatCardParams
): Promise<Blob> {
  const dataUrl = await renderPersonalMunajatCard(rawParams);
  if (!dataUrl || dataUrl === FALLBACK_1X1_PNG) {
    throw new Error('Gagal merender Kartu Munajat pada perangkat ini.');
  }
  const { dataUrlToBlob } = await import('./directDownload');
  return dataUrlToBlob(dataUrl);
}

