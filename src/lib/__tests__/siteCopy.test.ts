import { describe, it, expect } from 'vitest';
import { DEFAULT_SITE_COPY, MIN_DONATION_AMOUNT, mergeWithDefaultSiteCopy } from '../siteCopy';
import { getEmotionalCliffhanger } from '../../components/SiteDetails';
import { mergeLocalAndCloudSites } from '../../context/SiteContext';
import { ziarahSites, ZiarahSite } from '../../data/sites';
import { matchesEmotionalIntent } from '../../views/DaftarMakam';
import { sanitizeMunajatCardInput, wrapCanvasText, renderPersonalMunajatCard } from '../munajatCardCanvas';

describe('siteCopy & cliffhanger utilities', () => {
  it('returns DEFAULT_SITE_COPY when input is null or undefined and enforces MIN_DONATION_AMOUNT >= 2000', () => {
    expect(mergeWithDefaultSiteCopy(null)).toEqual(DEFAULT_SITE_COPY);
    expect(mergeWithDefaultSiteCopy(undefined)).toEqual(DEFAULT_SITE_COPY);
    expect(MIN_DONATION_AMOUNT).toBe(2000);
    expect(DEFAULT_SITE_COPY.barokahLockAmount).toBeGreaterThanOrEqual(2000);
    expect(DEFAULT_SITE_COPY.heroTitle).toBe(
      'Merawat Sanad Ulama, Menemukan Ketenangan Batin.'
    );
    expect(DEFAULT_SITE_COPY.heroSubtitle).toBe(
      'Menghimpun riwayat 183 maqbarah di 34 provinsi agar setiap langkah ziarah menjadi pengingat akhirat, penguat iman, dan bakti doa bagi ahli kubur.'
    );
    const pkg100k = DEFAULT_SITE_COPY.quickNominalPackages.find((p) => p.amount === 100000);
    expect(pkg100k?.tag).toBe('Infaq Literasi Utama');
  });

  it('matches syifa emotional intent for healing/syifa sites like Sunan Muria, Sunan Gresik, and Sunan Drajat', () => {
    expect(DEFAULT_SITE_COPY.intentLabels.syifa).toBe("Ikhtiar Kesembuhan & Syifa' Penyakit");
    const syifaSites = ziarahSites.filter((s) => matchesEmotionalIntent(s, 'syifa'));
    expect(syifaSites.length).toBeGreaterThanOrEqual(5);
    const muria = ziarahSites.find((s) => s.title.toLowerCase().includes('sunan muria'));
    const gresik = ziarahSites.find((s) => s.title.toLowerCase().includes('sunan gresik'));
    expect(muria && matchesEmotionalIntent(muria, 'syifa')).toBe(true);
    expect(gresik && matchesEmotionalIntent(gresik, 'syifa')).toBe(true);
  });

  it('merges custom fields, lock amounts, and maps legacy alias keys cleanly', () => {
    const merged = mergeWithDefaultSiteCopy({
      heroTitle: 'Judul Baru Nusantara',
      paywallDescription: 'Subjudul Gembok Baru',
      infaqTitle: 'Headline Infaq Baru',
      barokahLockAmount: 7500,
      rubrikLockAmount: 15000,
      quickNominalPackages: [
        {
          amount: 35000,
          label: 'Rp 35rb',
          tag: 'Infaq Berkah',
          desc: 'Paket khusus peziarah',
        },
      ],
    });

    expect(merged.heroTitle).toBe('Judul Baru Nusantara');
    expect(merged.paywallSubtitle).toBe('Subjudul Gembok Baru');
    expect(merged.infaqHeadline).toBe('Headline Infaq Baru');
    expect(merged.barokahLockAmount).toBe(7500);
    expect(merged.rubrikLockAmount).toBe(15000);
    expect(merged.quickNominalPackages).toHaveLength(1);
    expect(merged.quickNominalPackages[0].amount).toBe(35000);
    expect(merged.tabLabelAll).toBe(DEFAULT_SITE_COPY.tabLabelAll);
    expect(merged.adminWhatsappNumber).toBe(DEFAULT_SITE_COPY.adminWhatsappNumber);

    const customWa = mergeWithDefaultSiteCopy({
      adminWhatsappNumber: '+62 812-3456-7890',
    });
    expect(customWa.adminWhatsappNumber).toBe('6281234567890');
    expect(DEFAULT_SITE_COPY.adminWhatsappNumber.length).toBeGreaterThanOrEqual(10);
    expect(DEFAULT_SITE_COPY.heroBadge).toBe('Panduan Ziarah & Khazanah Ulama Nusantara');
    expect(DEFAULT_SITE_COPY.barokahPaywallTitle).toBe(
      'Buka Lembar Amalan & Doa Khusus Makam Ini'
    );
    expect(DEFAULT_SITE_COPY.paywallBadge).toBe('Lanjutan Laku Batin & Wasiat Makam');
    expect(DEFAULT_SITE_COPY.paywallTitle).toBe(
      'Lanjutkan Membaca Catatan Laku Batin & Wasiat Beliau'
    );
    expect(DEFAULT_SITE_COPY.paywallButtonText).toBe('Dukung & Buka Seluruh Laku Batin');
    expect(DEFAULT_SITE_COPY.whatsappSharePrefix).toBe(
      'Hati ikut tenang membaca kisah keteladanan'
    );
    expect(DEFAULT_SITE_COPY.infaqTitle).toBe(
      'Dukung Kelangsungan Ziarah Nusantara & Titipkan Doa Anda'
    );
    expect(DEFAULT_SITE_COPY.munajatTitle).toBe(
      'Dinding Doa Bersama (Munajat) Peziarah'
    );
    expect(DEFAULT_SITE_COPY.infaqTransparencyNote).toContain(
      'Infaq Operasional & Pemeliharaan Digital'
    );
    expect(DEFAULT_SITE_COPY.footerCopyrightText).toBe(
      'Dirawat bersama oleh Tim Kurator Ziarah Nusantara'
    );
    for (const pkg of DEFAULT_SITE_COPY.quickNominalPackages) {
      expect(pkg.tag.toLowerCase()).not.toContain('wakaf');
      expect(pkg.desc.toLowerCase()).not.toContain('wakaf');
    }
  });

  it('sanitizes and wraps Personal Munajat Card text safely without throwing', async () => {
    const sanitized = sanitizeMunajatCardInput({
      recipientName: '  Alm. Bapak H. Ahmad   \n bin Fulan  ',
      prayerText: '  Semoga Allah melapangkan kubur beliau dan memudahkan urusan keluarga kami. ',
      themeLabel: 'Hadiah Al-Fatihah Orang Tua',
      createdDateLabel: '20 November 2026',
    });
    expect(sanitized.recipientName).toBe('Alm. Bapak H. Ahmad bin Fulan');
    expect(sanitized.prayerText).toContain('Semoga Allah melapangkan kubur beliau');

    const longName = 'A'.repeat(120);
    expect(sanitizeMunajatCardInput({ recipientName: longName }).recipientName).toHaveLength(80);

    const wrapped = wrapCanvasText(
      { measureText: (str: string) => ({ width: str.length * 10 }) },
      'Ya Allah ampunilah segala khilaf orang tua kami dan karuniakanlah ketenangan hati serta rezeki halal yang berkah bagi keluarga kami semua',
      350,
      3
    );
    expect(wrapped.length).toBeGreaterThanOrEqual(2);
    expect(wrapped.length).toBeLessThanOrEqual(3);

    const dataUrl = await renderPersonalMunajatCard(sanitized);
    expect(dataUrl.startsWith('data:image/png;base64,')).toBe(true);
  });

  it('splits story text cleanly at explicit <!--more--> marker in getEmotionalCliffhanger', () => {
    const story =
      'Malam itu angin berembus pelan di serambi masjid<!--more-->Beliau kemudian membisikkan wasiat rahasia kepada sang murid.';
    const result = getEmotionalCliffhanger(story);
    expect(result.preview).toBe('Malam itu angin berembus pelan di serambi masjid... ');
    expect(result.remainder).toBe(
      'Beliau kemudian membisikkan wasiat rahasia kepada sang murid.'
    );
  });

  it('preserves 5 default storyReelSlides and merges custom slide overrides safely', () => {
    expect(DEFAULT_SITE_COPY.storyReelSlides).toHaveLength(5);
    expect(DEFAULT_SITE_COPY.storyReelSlides[2].arabicQuote).toContain('كُنْتُ نَهَيْتُكُمْ');

    const customSlides = DEFAULT_SITE_COPY.storyReelSlides.map((s, idx) =>
      idx === 0 ? { ...s, title: 'Judul Slide 1 Kustom Admin' } : s
    );
    const merged = mergeWithDefaultSiteCopy({
      storyReelSectionTitle: 'Hikmah Ziarah Kustom',
      storyReelSlides: customSlides,
    });
    expect(merged.storyReelSectionTitle).toBe('Hikmah Ziarah Kustom');
    expect(merged.storyReelSlides).toHaveLength(5);
    expect(merged.storyReelSlides[0].title).toBe('Judul Slide 1 Kustom Admin');
  });

  it('merges local and cloud sites by canonical ID or slug and handles soft deletes', () => {
    const localSites: ZiarahSite[] = [
      {
        id: 'wali-2',
        name: 'Raden Rahmat',
        title: 'Sunan Ampel',
        location: {
          lat: -7.23,
          lng: 112.74,
          address: 'Jl. Ampel Masjid, Surabaya',
          city: 'Surabaya',
          province: 'Jawa Timur',
        },
        description: 'Deskripsi lama lokal',
        history: 'Sejarah lama lokal',
        karomah: ['Karomah lama'],
        untoldStory: 'Kisah lama lokal',
        doaKhusus: [{ title: 'Doa Lama', text: 'Arab lama', translation: 'Arti lama' }],
        barokahHajat: 'Hajat lama',
        imageUrl: '/images/sites/1.jpg',
        category: 'Walisongo',
        era: 'Abad ke-15',
        facilities: ['Masjid'],
        openingHours: '24 Jam',
      },
      {
        id: 'wali-3',
        name: 'Raden Makhdum Ibrahim',
        title: 'Sunan Bonang',
        location: {
          lat: -6.89,
          lng: 112.06,
          address: 'Kutorejo, Tuban',
          city: 'Tuban',
          province: 'Jawa Timur',
        },
        description: 'Deskripsi Bonang',
        history: 'Sejarah Bonang',
        karomah: ['Karomah Bonang'],
        untoldStory: 'Kisah Bonang',
        doaKhusus: [{ title: 'Doa Bonang', text: 'Arab Bonang' }],
        imageUrl: '/images/sites/2.jpg',
        category: 'Walisongo',
        era: 'Abad ke-15',
        facilities: ['Masjid'],
        openingHours: '24 Jam',
      },
    ];

    // Cloud update using slug ("sunan-ampel-surabaya") as id for site 1, and soft-deleting site 2
    const cloudSites: Array<ZiarahSite & { isDeleted?: boolean }> = [
      {
        ...localSites[0],
        id: 'sunan-ampel-surabaya',
        name: 'Raden Rahmat (Diperbarui Admin)',
        description: 'Deskripsi baru dari Admin Kurator',
        barokahHajat: 'Hajat baru dari Admin Kurator',
        karomah: ['Karomah 1 baru', 'Karomah 2 baru'],
        untoldStory: 'Kisah baru dari Admin Kurator',
        doaKhusus: [{ title: 'Doa Baru Admin', text: 'Arab baru', translation: 'Arti baru' }],
      },
      {
        ...localSites[1],
        id: 'wali-3',
        isDeleted: true,
      },
    ];

    const merged = mergeLocalAndCloudSites(localSites, cloudSites);
    expect(merged).toHaveLength(1);
    expect(merged[0].id).toBe('wali-2'); // Canonical ID preserved
    expect(merged[0].name).toBe('Raden Rahmat (Diperbarui Admin)');
    expect(merged[0].description).toBe('Deskripsi baru dari Admin Kurator');
    expect(merged[0].barokahHajat).toBe('Hajat baru dari Admin Kurator');
    expect(merged[0].karomah).toEqual(['Karomah 1 baru', 'Karomah 2 baru']);
    expect(merged[0].untoldStory).toBe('Kisah baru dari Admin Kurator');
    expect(merged[0].doaKhusus).toEqual([
      { title: 'Doa Baru Admin', text: 'Arab baru', translation: 'Arti baru' },
    ]);
  });
});



