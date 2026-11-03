import { describe, it, expect } from 'vitest';
import {
  sanitizePlainText,
  sanitizeMultilineText,
  sanitizeHttpUrl,
  isSafeExternalUrl,
  sanitizeDonationAmount,
} from '../sanitize';

describe('Input Sanitization & Anti-XSS Utilities', () => {
  it('strips raw HTML tags and ASCII control characters in sanitizePlainText', () => {
    const dirty = '  <script>alert("xss")</script>Makam\u0000 Sunan\u0007 Ampel <b>Surabaya</b>  ';
    expect(sanitizePlainText(dirty, 100)).toBe('alert("xss")Makam Sunan Ampel Surabaya');
  });

  it('normalizes CRLF newlines and strips HTML tags in sanitizeMultilineText', () => {
    const dirty = 'Paragraf 1\r\n<img src=x onerror=alert(1)>Paragraf 2';
    expect(sanitizeMultilineText(dirty, 500)).toBe('Paragraf 1\nParagraf 2');
  });

  it('blocks javascript: and data: URIs while allowing http/https and relative paths', () => {
    expect(sanitizeHttpUrl('javascript:alert(1)')).toBe('');
    expect(sanitizeHttpUrl('data:text/html;base64,PHNjcmlwdD4=')).toBe('');
    expect(sanitizeHttpUrl('/pwa-192x192.png')).toBe('/pwa-192x192.png');
    expect(sanitizeHttpUrl('https://ziarahnusantara.my.id/peta')).toBe('https://ziarahnusantara.my.id/peta');
    expect(isSafeExternalUrl('javascript:void(0)')).toBe(false);
    expect(isSafeExternalUrl('https://maps.app.goo.gl/abc')).toBe(true);
  });

  it('clamps donation amounts and rejects values below minimum threshold', () => {
    expect(sanitizeDonationAmount('Rp 50.000', 5000, 1000000000)).toBe(50000);
    expect(sanitizeDonationAmount(2000, 5000, 1000000000)).toBe(0);
    expect(sanitizeDonationAmount(999999999999, 5000, 1000000000)).toBe(1000000000);
  });
});
