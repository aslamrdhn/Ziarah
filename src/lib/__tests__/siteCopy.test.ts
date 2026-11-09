import { describe, it, expect } from 'vitest';
import { DEFAULT_SITE_COPY, mergeWithDefaultSiteCopy } from '../siteCopy';
import { getEmotionalCliffhanger } from '../../components/SiteDetails';

describe('siteCopy & cliffhanger utilities', () => {
  it('returns DEFAULT_SITE_COPY when input is null or undefined', () => {
    expect(mergeWithDefaultSiteCopy(null)).toEqual(DEFAULT_SITE_COPY);
    expect(mergeWithDefaultSiteCopy(undefined)).toEqual(DEFAULT_SITE_COPY);
  });

  it('merges custom fields and maps legacy alias keys cleanly', () => {
    const merged = mergeWithDefaultSiteCopy({
      heroTitle: 'Judul Baru Nusantara',
      paywallDescription: 'Subjudul Gembok Baru',
      infaqTitle: 'Headline Infaq Baru',
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
});

