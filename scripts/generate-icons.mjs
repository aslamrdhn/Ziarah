import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

// CRC32 implementation for binary PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c >>> 0;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcInput = Buffer.concat([typeBuf, data]);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcInput), 0);
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function encodePNG(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const rowStart = y * (stride + 1);
    raw[rowStart] = 0; // filter type None
    rgba.copy(raw, rowStart + 1, y * stride, (y + 1) * stride);
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    signature,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

function encodeICOFromPNG(pngBuffer, width, height) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(1, 4); // 1 image

  const dir = Buffer.alloc(16);
  dir[0] = width >= 256 ? 0 : width;
  dir[1] = height >= 256 ? 0 : height;
  dir[2] = 0; // palette
  dir[3] = 0; // reserved
  dir.writeUInt16LE(1, 4); // color planes
  dir.writeUInt16LE(32, 6); // bpp
  dir.writeUInt32LE(pngBuffer.length, 8);
  dir.writeUInt32LE(22, 12); // offset (6 + 16)

  return Buffer.concat([header, dir, pngBuffer]);
}

// Signed distance helper for rounded box in 512x512 virtual canvas
function sdRoundBox(px, py, cx, cy, halfW, halfH, r) {
  const dx = Math.abs(px - cx) - halfW + r;
  const dy = Math.abs(py - cy) - halfH + r;
  const outside = Math.hypot(Math.max(dx, 0), Math.max(dy, 0));
  const inside = Math.min(Math.max(dx, dy), 0);
  return outside + inside - r;
}

// Distance from point P to segment AB
function distToSegment(px, py, ax, ay, bx, by) {
  const vx = bx - ax;
  const vy = by - ay;
  const wx = px - ax;
  const wy = py - ay;
  const c1 = vx * wx + vy * wy;
  if (c1 <= 0) return Math.hypot(px - ax, py - ay);
  const c2 = vx * vx + vy * vy;
  if (c2 <= c1) return Math.hypot(px - bx, py - by);
  const b = c1 / c2;
  const pbx = ax + b * vx;
  const pby = ay + b * vy;
  return Math.hypot(px - pbx, py - pby);
}

// Evaluate pixel color at virtual coordinate (vx, vy) in [0, 512]
function sampleVirtualIcon(vx, vy, maskable = false) {
  // Background rounded shield (or full bleed if maskable)
  const bgDist = maskable
    ? -100
    : sdRoundBox(vx, vy, 256, 256, 256, 256, 108);

  if (bgDist > 0) {
    return [0, 0, 0, 0];
  }

  // Rich Emerald gradient background (#134E42 -> #07241E)
  const tBg = Math.min(1, Math.max(0, (vx + vy) / 1024));
  let r = Math.round(19 * (1 - tBg) + 7 * tBg);
  let g = Math.round(78 * (1 - tBg) + 36 * tBg);
  let b = Math.round(66 * (1 - tBg) + 30 * tBg);

  // Gold gradient color at (vx, vy)
  const tGold = Math.min(1, Math.max(0, (vy - 68) / 390));
  const goldR = Math.round(251 * (1 - tGold) + 196 * tGold);
  const goldG = Math.round(238 * (1 - tGold) + 152 * tGold);
  const goldB = Math.round(178 * (1 - tGold) + 46 * tGold);

  let isGold = false;

  // Outer Gold Border Ring
  const borderDist = Math.abs(sdRoundBox(vx, vy, 256, 256, 232, 232, 92));
  if (borderDist <= 5.5) {
    isGold = true;
  }

  // Finial (Pinnacle Crescent/Orbs above Dome)
  if (Math.hypot(vx - 256, vy - 74) <= 10.5) isGold = true;
  if (Math.abs(vx - 256) <= 4.5 && vy >= 78 && vy <= 112) isGold = true;
  if (Math.hypot(vx - 256, vy - 108) <= 7.5) isGold = true;

  // Classic Onion/Pointed Nusantara Dome (Kubah Emas)
  // Dome spans y in [114, 302]
  if (vy >= 114 && vy <= 302) {
    const ny = (vy - 114) / (302 - 114); // 0 at top, 1 at base
    const halfWidth = 112 * Math.sin(ny * Math.PI * 0.58);
    if (Math.abs(vx - 256) <= halfWidth) {
      isGold = true;
    }

    // Inner Mihrab Cutout
    if (vy >= 156 && vy <= 302) {
      const nyInner = (vy - 156) / (302 - 156);
      const innerHalfW = 76 * Math.sin(nyInner * Math.PI * 0.56);
      if (Math.abs(vx - 256) <= innerHalfW) {
        isGold = false;
        // Darker emerald inside arch
        r = 10;
        g = 46;
        b = 39;
      }
    }
  }

  // Stars Arc inside Mihrab Cutout
  const stars = [
    [204, 224, 5.2],
    [218, 207, 5.6],
    [236, 195, 6.2],
    [256, 189, 7.8],
    [276, 195, 6.2],
    [294, 207, 5.6],
    [308, 224, 5.2],
  ];
  for (const [sx, sy, sr] of stars) {
    if (Math.hypot(vx - sx, vy - sy) <= sr) {
      isGold = true;
    }
  }

  // Horizontal Dome Base Beam
  if (sdRoundBox(vx, vy, 256, 310, 126, 9, 8) <= 0) {
    isGold = true;
  }

  // Monogram "Z" (left side: x 146..242, y 340..436)
  const strokeHalf = 11.5;
  // Top bar of Z
  if (vx >= 146 && vx <= 244 && vy >= 338 && vy <= 360) isGold = true;
  // Bottom bar of Z
  if (vx >= 146 && vx <= 244 && vy >= 414 && vy <= 436) isGold = true;
  // Diagonal of Z from (234, 349) to (156, 425)
  if (distToSegment(vx, vy, 232, 349, 158, 425) <= strokeHalf) isGold = true;

  // Monogram "N" (right side: x 268..366, y 338..436)
  // Left vertical of N
  if (vx >= 268 && vx <= 291 && vy >= 338 && vy <= 436) isGold = true;
  // Right vertical of N
  if (vx >= 343 && vx <= 366 && vy >= 338 && vy <= 436) isGold = true;
  // Diagonal of N from (280, 349) to (354, 425)
  if (distToSegment(vx, vy, 280, 349, 354, 425) <= strokeHalf) isGold = true;

  // Bottom ornamental line
  if (sdRoundBox(vx, vy, 256, 456, 92, 3.5, 3) <= 0) {
    isGold = true;
  }

  if (isGold) {
    return [goldR, goldG, goldB, 255];
  }
  return [r, g, b, 255];
}

function renderIconRGBA(size, maskable = false) {
  const rgba = Buffer.alloc(size * size * 4);
  const samples = 2; // 2x2 supersampling for crisp edges
  const scale = 512 / size;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let rSum = 0;
      let gSum = 0;
      let bSum = 0;
      let aSum = 0;

      for (let sy = 0; sy < samples; sy++) {
        for (let sx = 0; sx < samples; sx++) {
          const vx = (x + (sx + 0.5) / samples) * scale;
          const vy = (y + (sy + 0.5) / samples) * scale;
          const [r, g, b, a] = sampleVirtualIcon(vx, vy, maskable);
          rSum += r * (a / 255);
          gSum += g * (a / 255);
          bSum += b * (a / 255);
          aSum += a;
        }
      }

      const count = samples * samples;
      const outA = Math.round(aSum / count);
      const idx = (y * size + x) * 4;
      if (outA === 0) {
        rgba[idx] = 0;
        rgba[idx + 1] = 0;
        rgba[idx + 2] = 0;
        rgba[idx + 3] = 0;
      } else {
        const alphaNorm = aSum / (255 * count);
        rgba[idx] = Math.min(255, Math.round(rSum / count / alphaNorm));
        rgba[idx + 1] = Math.min(255, Math.round(gSum / count / alphaNorm));
        rgba[idx + 2] = Math.min(255, Math.round(bSum / count / alphaNorm));
        rgba[idx + 3] = outA;
      }
    }
  }
  return rgba;
}

const publicDir = path.resolve(process.cwd(), 'public');

const targets = [
  { file: 'favicon-48x48.png', size: 48, maskable: false },
  { file: 'favicon-96x96.png', size: 96, maskable: false },
  { file: 'apple-touch-icon.png', size: 180, maskable: false },
  { file: 'pwa-192x192.png', size: 192, maskable: false },
  { file: 'pwa-512x512.png', size: 512, maskable: false },
  { file: 'pwa-maskable-512x512.png', size: 512, maskable: true },
];

let png48Buffer = null;

for (const t of targets) {
  const rgba = renderIconRGBA(t.size, t.maskable);
  const png = encodePNG(t.size, t.size, rgba);
  fs.writeFileSync(path.join(publicDir, t.file), png);
  if (t.size === 48) png48Buffer = png;
  console.log(`Generated binary PNG: public/${t.file} (${png.length} bytes)`);
}

if (png48Buffer) {
  const ico = encodeICOFromPNG(png48Buffer, 48, 48);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
  console.log(`Generated binary ICO: public/favicon.ico (${ico.length} bytes)`);
}
