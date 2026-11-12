import { describe, it, expect, beforeEach } from 'vitest';
import { ziarahSites } from '../../data/sites';
import {
  getSiteBarokahHajat,
  getEffectiveSiteDoaKhusus,
  getSiteCompleteBarokahGuide,
} from '../siteLogistics';
import {
  saveVerifiedDonationRecord,
  BAROKAH_DONATION_ID_KEY,
  BAROKAH_SITE_MAP_KEY,
  RUBRIK_DONATION_ID_KEY,
  SITE_DONATION_MAP_KEY,
} from '../transferProof';

describe('Barokah & Doa Khusus (Rp 5.000) & Pemisahan Kunci Donasi', () => {
  beforeEach(() => {
    const store: Record<string, string> = {};
    const mockStorage = {
      getItem: (key: string) => (key in store ? store[key] : null),
      setItem: (key: string, val: string) => {
        store[key] = String(val);
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        for (const k of Object.keys(store)) delete store[k];
      },
    };
    Object.defineProperty(globalThis, 'localStorage', {
      value: mockStorage,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(globalThis, 'CustomEvent', {
      value: class CustomEvent {
        type: string;
        constructor(type: string) {
          this.type = type;
        }
      },
      configurable: true,
      writable: true,
    });
    Object.defineProperty(globalThis, 'window', {
      value: {
        localStorage: mockStorage,
        dispatchEvent: () => true,
        addEventListener: () => {},
        removeEventListener: () => {},
      },
      configurable: true,
      writable: true,
    });
  });

  it('menghasilkan deskripsi barokahHajat dan doaKhusus yang valid untuk seluruh situs ziarah', () => {
    expect(ziarahSites.length).toBeGreaterThanOrEqual(96);
    for (const site of ziarahSites) {
      const hajat = getSiteBarokahHajat(site);
      expect(hajat.length).toBeGreaterThan(40);

      const doaList = getEffectiveSiteDoaKhusus(site);
      expect(doaList.length).toBeGreaterThanOrEqual(1);
      expect(doaList[0].title.length).toBeGreaterThan(5);
      expect(doaList[0].text.length).toBeGreaterThan(10);
      expect((doaList[0].translation || '').length).toBeGreaterThan(10);
    }
  });

  it('mengutamakan nilai barokahHajat kustom dari Kurator jika sudah diisi', () => {
    const sample = {
      ...ziarahSites[0],
      barokahHajat: 'Biasanya peziarah bertawassul memohon kelancaran jodoh dan ketenangan keluarga.',
    };
    expect(getSiteBarokahHajat(sample)).toBe(
      'Biasanya peziarah bertawassul memohon kelancaran jodoh dan ketenangan keluarga.'
    );
  });

  it('menyediakan data eksplisit unik pada 24+ makam utama dan label status kurasi yang jujur', () => {
    const explicitSites = ziarahSites.filter(
      (s) => getSiteCompleteBarokahGuide(s).isCuratedSpecific
    );
    expect(explicitSites.length).toBeGreaterThanOrEqual(24);

    const sunanAmpel = ziarahSites.find((s) => s.id === 'sunan-ampel' || s.id === 'wali-2')!;
    const ampelGuide = getSiteCompleteBarokahGuide(sunanAmpel);
    expect(ampelGuide.isCuratedSpecific).toBe(true);
    expect(ampelGuide.curationStatusLabel).toBe(
      'Khazanah Doa & Wasilah Terkurasi Khusus Makam Ini'
    );
    expect(ampelGuide.doaItems.length).toBeGreaterThanOrEqual(2);
    expect(ampelGuide.doaItems[1].latin).toContain("ta'shimanaa wa dzurriyyaatinaa");

    const fallbackSite = {
      ...sunanAmpel,
      barokahHajat: undefined,
      doaKhusus: undefined,
    };
    const fallbackGuide = getSiteCompleteBarokahGuide(fallbackSite);
    expect(fallbackGuide.isCuratedSpecific).toBe(false);
    expect(fallbackGuide.curationStatusLabel).toContain('Menunggu Kurasi Spesifik Makam');
  });

  it('memisahkan kunci localStorage antara Barokah & Doa Khusus (Rp 5.000) dan Rubrik & Khazanah (Rp 10.000)', () => {
    expect(BAROKAH_DONATION_ID_KEY).not.toBe(RUBRIK_DONATION_ID_KEY);
    expect(BAROKAH_SITE_MAP_KEY).not.toBe(SITE_DONATION_MAP_KEY);

    // Simpan donasi Rp 5.000 untuk barokah-doa
    saveVerifiedDonationRecord({
      donationId: 'donasi-barokah-5k',
      siteId: 'sunan-ampel',
      programId: 'barokah-doa',
      amount: 5000,
    });

    expect(localStorage.getItem(BAROKAH_DONATION_ID_KEY)).toBe('donasi-barokah-5k');
    expect(JSON.parse(localStorage.getItem(BAROKAH_SITE_MAP_KEY) || '{}')['sunan-ampel']).toBe(
      'donasi-barokah-5k'
    );
    // Kunci Rubrik Rp 10.000 TIDAK boleh ikut terbuka oleh donasi Rp 5.000
    expect(localStorage.getItem(RUBRIK_DONATION_ID_KEY)).toBeNull();
    expect(localStorage.getItem(SITE_DONATION_MAP_KEY)).toBeNull();

    // Simpan donasi Rp 10.000 untuk rubrik-manuskrip
    saveVerifiedDonationRecord({
      donationId: 'donasi-rubrik-10k',
      siteId: 'sunan-ampel',
      programId: 'rubrik-manuskrip',
      amount: 10000,
    });

    expect(localStorage.getItem(RUBRIK_DONATION_ID_KEY)).toBe('donasi-rubrik-10k');
    expect(JSON.parse(localStorage.getItem(SITE_DONATION_MAP_KEY) || '{}')['sunan-ampel']).toBe(
      'donasi-rubrik-10k'
    );
    expect(localStorage.getItem(BAROKAH_DONATION_ID_KEY)).toBe('donasi-barokah-5k');
  });
});
