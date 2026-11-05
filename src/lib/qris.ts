export const OFFICIAL_QRIS_STATIC_PAYLOAD =
  '00020101021126570011ID.DANA.WWW011893600915303643613302090364361330303UMI51440014ID.CO.QRIS.WWW0215ID10266259717610303UMI5204839853033605802ID5925Ziarah Nusantara, Organis6015Jakarta Selatan61051261063040F4A';

const LEGACY_QRIS_PAYLOADS = new Set([
  '00020101021226570011ID.DANA.WWW011893600915003643613302090364361330303UMI51440014ID.CO.QRIS.WWW0215ID10266259717610303UMI520483985303360540420005802ID5925Ziarah Nusantara, Organis6006Bekasi610517415621960150011ID.DANA.WWW63048587',
]);

export function resolveOfficialQrisPayload(rawPayload?: string): string {
  const trimmed = (rawPayload || '').trim();
  if (!trimmed || !trimmed.startsWith('000201') || LEGACY_QRIS_PAYLOADS.has(trimmed)) {
    return OFFICIAL_QRIS_STATIC_PAYLOAD;
  }
  const crcTagIndex = trimmed.lastIndexOf('6304');
  if (trimmed.length < 24 || crcTagIndex === -1 || crcTagIndex !== trimmed.length - 8) {
    return OFFICIAL_QRIS_STATIC_PAYLOAD;
  }
  const payloadWithoutCrcValue = trimmed.slice(0, -4);
  const providedCrc = trimmed.slice(-4).toUpperCase();
  if (computeQrisCrc16(payloadWithoutCrcValue) !== providedCrc) {
    return OFFICIAL_QRIS_STATIC_PAYLOAD;
  }
  return trimmed;
}

export interface QrisMerchantInfo {
  merchantName: string;
  merchantCity: string;
  postalCode: string;
  nmid: string;
  acquirer: string;
  mpan: string;
  mcc: string;
  defaultAmount?: number;
  crc: string;
  isValidCrc: boolean;
}

/**
 * Computes EMVCo CRC-16/CCITT-FALSE checksum (polynomial 0x1021, initial value 0xFFFF).
 */
export function computeQrisCrc16(payloadWith6304Prefix: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payloadWith6304Prefix.length; i++) {
    crc ^= payloadWith6304Prefix.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

/**
 * Parses top-level EMVCo TLV tags from a QRIS payload string.
 */
export function parseEmvTags(payload: string): Map<string, string> {
  const map = new Map<string, string>();
  let idx = 0;
  while (idx + 4 <= payload.length) {
    const tag = payload.slice(idx, idx + 2);
    const len = parseInt(payload.slice(idx + 2, idx + 4), 10);
    if (isNaN(len) || idx + 4 + len > payload.length) break;
    const value = payload.slice(idx + 4, idx + 4 + len);
    map.set(tag, value);
    idx += 4 + len;
  }
  return map;
}

/**
 * Extracts human-readable merchant metadata and validates the CRC-16 checksum.
 */
export function parseQrisMerchantInfo(rawPayload: string = OFFICIAL_QRIS_STATIC_PAYLOAD): QrisMerchantInfo {
  const clean = resolveOfficialQrisPayload(rawPayload);
  const tags = parseEmvTags(clean);
  const tag26 = parseEmvTags(tags.get('26') || '');
  const tag51 = parseEmvTags(tags.get('51') || '');

  const crcIndex = clean.lastIndexOf('6304');
  const providedCrc = crcIndex !== -1 ? clean.slice(crcIndex + 4, crcIndex + 8).toUpperCase() : '';
  const expectedCrc = crcIndex !== -1 ? computeQrisCrc16(clean.slice(0, crcIndex + 4)) : '';

  const rawAmt = tags.get('54');
  const parsedAmt = rawAmt ? parseInt(rawAmt, 10) : undefined;

  return {
    merchantName: tags.get('59') || 'Ziarah Nusantara, Organis',
    merchantCity: tags.get('60') || 'Jakarta Selatan',
    postalCode: tags.get('61') || '12610',
    nmid: tag51.get('02') || 'ID1026625971761',
    acquirer: tag26.get('00') || 'ID.DANA.WWW',
    mpan: tag26.get('01') || '936009153036436133',
    mcc: tags.get('52') || '8398',
    defaultAmount: parsedAmt && !isNaN(parsedAmt) ? parsedAmt : undefined,
    crc: providedCrc || '0F4A',
    isValidCrc: Boolean(providedCrc && providedCrc === expectedCrc),
  };
}

/**
 * Builds either the exact static QRIS string or a dynamic-amount QRIS string with a recalculated CRC-16.
 */
export function buildQrisPayload(
  basePayload: string = OFFICIAL_QRIS_STATIC_PAYLOAD,
  options: { useSelectedAmount?: boolean; amount?: number } = {}
): string {
  const clean = resolveOfficialQrisPayload(basePayload);
  if (!options.useSelectedAmount || !options.amount || options.amount <= 0) {
    return clean;
  }

  // Parse TLV tags except 63 (CRC), replace or insert Tag 54 (Transaction Amount), and recompute CRC16
  const entries: Array<{ tag: string; value: string }> = [];
  let idx = 0;
  let inserted54 = false;
  const amountStr = String(Math.round(options.amount));

  while (idx + 4 <= clean.length) {
    const tag = clean.slice(idx, idx + 2);
    const len = parseInt(clean.slice(idx + 2, idx + 4), 10);
    if (isNaN(len) || idx + 4 + len > clean.length) break;
    const value = clean.slice(idx + 4, idx + 4 + len);
    idx += 4 + len;

    if (tag === '63') continue;
    if (tag === '01') {
      entries.push({ tag: '01', value: '12' });
      continue;
    }
    if (tag === '54') {
      entries.push({ tag: '54', value: amountStr });
      inserted54 = true;
      continue;
    }
    if (!inserted54 && parseInt(tag, 10) > 54) {
      entries.push({ tag: '54', value: amountStr });
      inserted54 = true;
    }
    entries.push({ tag, value });
  }

  if (!inserted54) {
    entries.push({ tag: '54', value: amountStr });
  }

  const body =
    entries
      .map((e) => `${e.tag}${String(e.value.length).padStart(2, '0')}${e.value}`)
      .join('') + '6304';

  const crc = computeQrisCrc16(body);
  return `${body}${crc}`;
}
