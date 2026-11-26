import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import {
  PAGE_GEOMETRIES,
  computeSectionHeaderKeepWithNext,
} from '../pdfDocumentGenerator';

describe('PDF Multi-Page Canvas Pagination, Keep-With-Next & Anti-Collision (F4 & F5)', () => {
  it('enforces safe contentTopY (>= headerBottomY + 36) and contentBottomY (<= height - 80) on both A5 and A4 pages', () => {
    for (const fmt of ['a5', 'a4'] as const) {
      const geom = PAGE_GEOMETRIES[fmt];
      expect(geom.contentTopY).toBeGreaterThanOrEqual(geom.headerBottomY + 36);
      expect(geom.contentBottomY).toBeLessThanOrEqual(geom.height - 80);
    }
  });

  it('prevents orphan section titles near contentBottomY by breaking to a new page before drawing the header (Keep-With-Next)', () => {
    const a5 = PAGE_GEOMETRIES.a5;
    // Simulate cursorY near bottom of page 6 (e.g. 1250px when contentBottomY = 1389px)
    const result = computeSectionHeaderKeepWithNext({
      cursorY: 1250,
      contentTopY: a5.contentTopY,
      contentBottomY: a5.contentBottomY,
      titleLinesCount: 2,
      titleLineHeight: 36,
      spacingAfterTitle: 14,
      minFirstBlockHeight: 110,
    });

    // titleHeight = 2 * 36 + 8 = 80; 80 + 14 + 110 = 204px required; 1250 + 204 = 1454 > 1389 -> must break page!
    expect(result.shouldBreakBeforeHeader).toBe(true);
    expect(result.headerStartY).toBe(a5.contentTopY);
    expect(result.actualTitleHeight).toBe(80);
    expect(result.cursorYAfterHeader).toBe(a5.contentTopY + 80 + 14);
  });

  it('advances cursorY by the full multi-line title height + spacingAfterTitle so following paragraphs never collide with wrapped headings', () => {
    const a5 = PAGE_GEOMETRIES.a5;
    const result3Lines = computeSectionHeaderKeepWithNext({
      cursorY: a5.contentTopY,
      contentTopY: a5.contentTopY,
      contentBottomY: a5.contentBottomY,
      titleLinesCount: 3,
      titleLineHeight: 36,
      spacingAfterTitle: 14,
      minFirstBlockHeight: 110,
    });

    expect(result3Lines.shouldBreakBeforeHeader).toBe(false);
    expect(result3Lines.headerStartY).toBe(a5.contentTopY);
    expect(result3Lines.actualTitleHeight).toBe(116);
    expect(result3Lines.cursorYAfterHeader).toBe(a5.contentTopY + 116 + 14);
    expect(result3Lines.cursorYAfterHeader - result3Lines.headerStartY).toBeGreaterThanOrEqual(
      result3Lines.actualTitleHeight + 14
    );
  });

  it('never caches a stale canvas 2D context before calling ensureSpace() inside drawParagraph or drawArabicBlock loops', () => {
    const pdfGenPath = path.resolve(
      process.cwd(),
      'src/lib/pdfDocumentGenerator.ts'
    );
    const src = fs.readFileSync(pdfGenPath, 'utf-8');

    // Extract drawParagraph and drawArabicBlock bodies
    const drawParagraphMatch = src.match(
      /drawParagraph\s*\([\s\S]*?\n  \}/
    );
    const drawArabicMatch = src.match(
      /drawArabicBlock\s*\([\s\S]*?\n  \}/
    );

    expect(drawParagraphMatch).not.toBeNull();
    expect(drawArabicMatch).not.toBeNull();

    // Neither method may cache `const ctx = this.ctx` before the line loop
    expect(drawParagraphMatch![0]).not.toContain('const ctx = this.ctx');
    expect(drawArabicMatch![0]).not.toContain('const ctx = this.ctx');
    expect(drawParagraphMatch![0]).toContain('this.ensureSpace(lineHeight');
    expect(drawParagraphMatch![0]).toContain('const activeCtx = this.ctx;');
    expect(
      drawParagraphMatch![0].lastIndexOf('this.ensureSpace(lineHeight')
    ).toBeLessThan(drawParagraphMatch![0].indexOf('const activeCtx = this.ctx;'));
    expect(drawArabicMatch![0]).toContain('this.ensureSpace(lineHeight');
    expect(drawArabicMatch![0]).toContain('const activeCtx = this.ctx;');
    expect(
      drawArabicMatch![0].lastIndexOf('this.ensureSpace(lineHeight')
    ).toBeLessThan(drawArabicMatch![0].indexOf('const activeCtx = this.ctx;'));
  });
});
