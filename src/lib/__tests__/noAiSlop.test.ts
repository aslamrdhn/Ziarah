import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

function collectTsFiles(dirPath: string): string[] {
  const results: string[] = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '__tests__' || entry.name === 'node_modules') {
      continue;
    }
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectTsFiles(fullPath));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

describe('Anti-AI-Slop Enforcement (Zero Sparkles, Zero Emojis, Clean Palette & Strict Locks)', () => {
  const srcDir = path.resolve(process.cwd(), 'src');
  const files = collectTsFiles(srcDir);

  const FORBIDDEN_EMOJIS = [
    '✨',
    '⭐',
    '🌟',
    '🤲',
    '🔒',
    '🔓',
    '🕌',
    '📜',
    '📖',
    '💡',
    '💳',
    '🎁',
    '📍',
    '✅',
  ];

  const TEN_CORE_FILES = [
    'src/lib/siteCopy.ts',
    'src/components/Navbar.tsx',
    'src/components/ZiarahStoryReel.tsx',
    'src/views/DaftarMakam.tsx',
    'src/components/SiteDetails.tsx',
    'src/components/TransactionModal.tsx',
    'src/views/RubrikKisah.tsx',
    'src/views/KumpulanDoa.tsx',
    'src/views/BacaanZiarah.tsx',
    'src/views/InfaqDigital.tsx',
  ];

  it('memastikan tidak ada satu pun file di src/ yang mengimpor atau menggunakan ikon Sparkles', () => {
    const violations: string[] = [];
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      if (/\bSparkles\b/.test(content)) {
        const rel = path.relative(process.cwd(), file);
        violations.push(rel);
      }
    }
    expect(
      violations,
      `Ditemukan penggunaan Sparkles pada file: ${violations.join(', ')}`
    ).toEqual([]);
  });

  it('memastikan tidak ada satu pun file di src/ yang mengandung emoji dekoratif terlarang', () => {
    const violations: string[] = [];
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const found = FORBIDDEN_EMOJIS.filter((emoji) => content.includes(emoji));
      if (found.length > 0) {
        const rel = path.relative(process.cwd(), file);
        violations.push(`${rel} (${found.join(' ')})`);
      }
    }
    expect(
      violations,
      `Ditemukan emoji dekoratif pada file: ${violations.join(', ')}`
    ).toEqual([]);
  });

  it('memastikan 10 file utama bersih dari warna tabrakan (purple, indigo, yellow, orange, amber)', () => {
    const violations: string[] = [];
    const colorRegex = /\b(purple|indigo|yellow|orange|amber)-\d{2,3}\b/;
    for (const relPath of TEN_CORE_FILES) {
      const fullPath = path.resolve(process.cwd(), relPath);
      const content = fs.readFileSync(fullPath, 'utf-8');
      const match = content.match(colorRegex);
      if (match) {
        violations.push(`${relPath} (${match[0]})`);
      }
    }
    expect(
      violations,
      `Ditemukan warna tabrakan pada file utama: ${violations.join(', ')}`
    ).toEqual([]);
  });

  it('memastikan SiteDetails.tsx tidak memiliki bypass isCurrentUserAdmin atau idx === 0 pada gembok konten berbayar', () => {
    const siteDetailsPath = path.resolve(process.cwd(), 'src/components/SiteDetails.tsx');
    const content = fs.readFileSync(siteDetailsPath, 'utf-8');

    expect(content).not.toMatch(/isSiteUnlocked\s*=\s*isCurrentUserAdmin/);
    expect(content).not.toMatch(/isBarokahUnlocked\s*=\s*isCurrentUserAdmin/);
    expect(content).not.toMatch(/isItemUnlocked\s*=\s*isSiteUnlocked\s*\|\|\s*idx\s*===\s*0/);
  });
});
