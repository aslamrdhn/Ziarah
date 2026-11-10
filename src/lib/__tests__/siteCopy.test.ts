import { describe, it, expect } from 'vitest';
import { DEFAULT_SITE_COPY, mergeWithDefaultSiteCopy } from '../siteCopy';
import { getEmotionalCliffhanger } from '../../components/SiteDetails';
import { mergeLocalAndCloudSites } from '../../context/SiteContext';
import { ZiarahSite } from '../../data/sites';

describe('siteCopy & cliffhanger utilities', () => {
  it('returns DEFAULT_SITE_COPY when input is null or undefined', () => {
    expect(mergeWithDefaultSiteCopy(null)).toEqual(DEFAULT_SITE_COPY);
    expect(mergeWithDefaultSiteCopy(undefined)).toEqual(DEFAULT_SITE_COPY);
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



