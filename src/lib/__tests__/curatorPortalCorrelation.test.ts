import { describe, it, expect } from 'vitest';
import { ziarahSites, type ZiarahSite } from '../../data/sites';
import { mergeLocalAndCloudSites } from '../../context/SiteContext';
import {
  getInitialAuthenticSiteImage,
  getSitePhotoAttribution,
  getVerifiedStaticSitePhoto,
  isCuratorEditedPhotoUrlValid,
} from '../authenticSiteImages';
import { getHaulDisplay, UNVERIFIED_HAUL_DISPLAY_TEXT } from '../../data/haulVerification';
import {
  getSiteLogistics,
  getSiteBarokahHajat,
  getEffectiveSiteDoaKhusus,
  getSiteCompleteBarokahGuide,
} from '../siteLogistics';
import { mergeWithDefaultSiteCopy, DEFAULT_SITE_COPY } from '../siteCopy';
import { extractCoordinatesFromMapsUrl } from '../../views/AdminKurator';

describe('Portal Kurator & Cross-Module Correlation Suite', () => {
  it('merges curator-edited site fields from Firestore over local static sites when editedByCurator === true', () => {
    const baseSite = ziarahSites.find((s) => s.id === 'sunan-kalijaga')!;
    expect(baseSite).toBeDefined();

    const cloudEditedDoc: ZiarahSite & { editedByCurator?: boolean } = {
      ...baseSite,
      id: 'sunan-kalijaga',
      name: 'Raden Mas Said (Sunan Kalijaga — Edisi Kurator)',
      title: 'Makam Sunan Kalijaga Kadilangu Demak',
      category: 'Walisongo',
      era: 'Abad ke-15 – 16 M (Kurasi Terbaru)',
      history: 'Paragraf sejarah hasil suntingan langsung Dewan Kurator di Portal Kurator.',
      description: 'Ringkasan suntingan Dewan Kurator.',
      untoldStory: 'Wasiat rahasia hasil suntingan Dewan Kurator.',
      haulSchedule: '10 Dzulhijjah (Penetapan Resmi Yayasan Sunan Kalijaga Kadilangu)',
      localAdab: 'Menjaga ketenangan di serambi cungkup\nTidak melangkahi pusara\nBerpakaian sopan',
      barokahHajat: 'Memohon kelapangan hati dalam dakwah\nMemohon keteguhan iman keluarga',
      karomah: [
        'Karomah 1 hasil suntingan kurator.',
        'Karomah 2 hasil suntingan kurator.',
      ],
      doaKhusus: [
        {
          title: 'Doa Tawassul Khusus Kadilangu',
          text: 'إِلَى حَضْرَةِ النَّبِيِّ الْمُصْطَفَى مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ الفاتحة',
          latin: 'Ila hadhratin Nabiyyil Mushthafa Muhammadin shallallahu alaihi wasallam, Al-Fatihah.',
          translation: 'Ke hadirat Nabi Muhammad SAW, Al-Fatihah.',
          kaifiyah: 'Dibaca 3 kali dengan khusyuk.',
        },
      ],
      references: ['Babad Demak Pupuh Sinom', 'Arsip Yayasan Kadilangu 2026'],
      facilities: ['Masjid Agung Kadilangu', 'Area Parkir Peziarah', 'Tempat Wudhu'],
      haulVerified: true,
      haulSourceUrl: 'https://visitjawatengah.jatengprov.go.id/id/regency/demak',
      haulSourceLabel: 'Kurasi Dewan Kurator Ziarah Nusantara',
      editedByCurator: true,
    };

    const mergedList = mergeLocalAndCloudSites(ziarahSites, [cloudEditedDoc]);
    const updated = mergedList.find((s) => s.id === 'sunan-kalijaga')!;

    expect(updated.name).toBe('Raden Mas Said (Sunan Kalijaga — Edisi Kurator)');
    expect(updated.title).toBe('Makam Sunan Kalijaga Kadilangu Demak');
    expect(updated.history).toBe('Paragraf sejarah hasil suntingan langsung Dewan Kurator di Portal Kurator.');
    expect(updated.untoldStory).toBe('Wasiat rahasia hasil suntingan Dewan Kurator.');
    expect(updated.references).toEqual(['Babad Demak Pupuh Sinom', 'Arsip Yayasan Kadilangu 2026']);

    // Verify correlation with haulVerification.ts when haulVerified + https:// haulSourceUrl are provided
    const haulDisplay = getHaulDisplay(updated);
    expect(haulDisplay.verified).toBe(true);
    expect(haulDisplay.text).toBe('10 Dzulhijjah (Penetapan Resmi Yayasan Sunan Kalijaga Kadilangu)');
    if (haulDisplay.verified) {
      expect(haulDisplay.sourceName).toBe('Kurasi Dewan Kurator Ziarah Nusantara');
      expect(haulDisplay.sourceUrl).toBe('https://visitjawatengah.jatengprov.go.id/id/regency/demak');
    }

    // Without haulVerified: true & https:// haulSourceUrl, editedByCurator alone MUST NOT mark haul verified
    const unverifiedEdit = getHaulDisplay({
      ...updated,
      haulVerified: false,
      haulSourceUrl: '',
    });
    expect(unverifiedEdit.verified).toBe(false);
    expect(unverifiedEdit.text).toBe(UNVERIFIED_HAUL_DISPLAY_TEXT);

    // Verify correlation with siteLogistics.ts
    const logistics = getSiteLogistics(updated);
    expect(logistics.localAdab).toContain('Menjaga ketenangan di serambi cungkup');
    expect(logistics.localAdab).toContain('Tidak melangkahi pusara');
    expect(logistics.barokahHajat).toHaveLength(2);

    const hajatSummary = getSiteBarokahHajat(updated);
    expect(hajatSummary).toBe(
      'Memohon kelapangan hati dalam dakwah • Memohon keteguhan iman keluarga'
    );

    const doas = getEffectiveSiteDoaKhusus(updated);
    expect(doas.length).toBeGreaterThanOrEqual(2);
    expect(doas[0].title).toContain('Doa Tawassul Khusus Kadilangu');

    const guide = getSiteCompleteBarokahGuide(updated);
    expect(guide.isCuratedSpecific).toBe(true);
  });

  it('ignores unedited cloud seed documents so static source of truth is protected unless editedByCurator === true', () => {
    const baseAmpel = ziarahSites.find((s) => s.id === 'sunan-ampel')!;
    const staleCloudSeed: ZiarahSite & { editedByCurator?: boolean } = {
      ...baseAmpel,
      id: 'sunan-ampel',
      name: 'Nama Lama Tanpa Flag Kurator',
      haulSchedule: 'Jadwal tidak terverifikasi',
    };
    const mergedList = mergeLocalAndCloudSites(ziarahSites, [staleCloudSeed]);
    const ampel = mergedList.find((s) => s.id === 'sunan-ampel')!;
    expect(ampel.name).not.toBe('Nama Lama Tanpa Flag Kurator');
    const haul = getHaulDisplay(ampel);
    expect(haul.verified).toBe(true);
    if (haul.verified) {
      expect(haul.sourceName).toBe('Detik Jatim');
    }
  });

  it('supports adding a new site and soft-deleting an existing site via Portal Kurator', () => {
    const baseBonang = ziarahSites.find((s) => s.id === 'sunan-bonang')!;
    const newSiteDoc: ZiarahSite & { editedByCurator?: boolean } = {
      ...baseBonang,
      id: 'makam-ulama-baru-2026',
      name: 'KH. Ahmad Syahid',
      title: 'Makam KH. Ahmad Syahid',
      category: 'Ulama Nusantara',
      description: 'Ulama kharismatik pendiri pesantren.',
      history: 'Riwayat perjuangan dakwah dan pendidikan pesantren.',
      location: {
        lat: -6.9175,
        lng: 107.6191,
        address: 'Jl. Pesantren No. 1, Bandung',
        city: 'Bandung',
        province: 'Jawa Barat',
      },
      editedByCurator: true,
    };

    const deletedSiteDoc: ZiarahSite & { isDeleted?: boolean; editedByCurator?: boolean } = {
      ...baseBonang,
      id: 'sunan-bonang',
      isDeleted: true,
      editedByCurator: true,
    };

    const mergedList = mergeLocalAndCloudSites(ziarahSites, [newSiteDoc, deletedSiteDoc]);
    expect(mergedList.some((s) => s.id === 'makam-ulama-baru-2026')).toBe(true);
    expect(mergedList.some((s) => s.id === 'sunan-bonang')).toBe(false);
    expect(mergedList.length).toBe(ziarahSites.length);
  });

  it('propagates curator-edited imageUrl and imageSource to authenticSiteImages and getSitePhotoAttribution', () => {
    const baseSite = ziarahSites.find((s) => s.id === 'mbah-priok')!;
    // Before curator edit, mbah-priok (wali-12.webp) is unverified and falls back to SVG
    const initialBeforeEdit = getInitialAuthenticSiteImage(baseSite);
    expect(initialBeforeEdit.startsWith('data:image/svg+xml')).toBe(true);

    // Curator provides a verified photo URL & credit in Portal Kurator
    const curatorEditedSite = {
      ...baseSite,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Kubah_Maqbarah_Tanjung_Priok.jpg',
      imageSource: 'Dokumentasi Dewan Kurator Ziarah Nusantara (CC BY-SA 4.0)',
      editedByCurator: true,
    };

    expect(isCuratorEditedPhotoUrlValid(curatorEditedSite.imageUrl)).toBe(true);
    expect(getVerifiedStaticSitePhoto(curatorEditedSite)).toBe(curatorEditedSite.imageUrl);
    expect(getInitialAuthenticSiteImage(curatorEditedSite)).toBe(curatorEditedSite.imageUrl);

    const attribution = getSitePhotoAttribution(curatorEditedSite, curatorEditedSite.imageUrl);
    expect(attribution.isDomeSvg).toBe(false);
    expect(attribution.author).toContain('Dokumentasi Dewan Kurator Ziarah Nusantara');
  });

  it('keeps unedited static sites without verified haul on UNVERIFIED_HAUL_DISPLAY_TEXT', () => {
    const unverifiedSite = ziarahSites.find((s) => s.id === 'sunan-bonang')!;
    const haul = getHaulDisplay(unverifiedSite);
    expect(haul.verified).toBe(false);
    expect(haul.text).toBe(UNVERIFIED_HAUL_DISPLAY_TEXT);
  });

  it('extracts coordinates accurately from all Google Maps URL formats in Portal Kurator', () => {
    expect(
      extractCoordinatesFromMapsUrl('https://www.google.com/maps/place/Makam/@-6.8945,110.6374,17z')
    ).toEqual({ lat: -6.8945, lng: 110.6374 });

    expect(
      extractCoordinatesFromMapsUrl('https://www.google.com/maps/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d-7.2301!4d112.7428')
    ).toEqual({ lat: -7.2301, lng: 112.7428 });

    expect(
      extractCoordinatesFromMapsUrl('https://maps.google.com/?q=-6.7063,108.5570')
    ).toEqual({ lat: -6.7063, lng: 108.557 });

    expect(extractCoordinatesFromMapsUrl('-6.8048, 110.8405')).toEqual({
      lat: -6.8048,
      lng: 110.8405,
    });
  });

  it('merges curator edits to SiteCopySettings (teks UI, nominal gembok, paket infaq, slide story reel) cleanly', () => {
    const merged = mergeWithDefaultSiteCopy({
      heroTitle: 'Judul Hero Baru Kurator',
      barokahLockAmount: 5000,
      rubrikLockAmount: 15000,
      intentLabels: {
        ...DEFAULT_SITE_COPY.intentLabels,
        keteduhan: 'Ketenangan Hati & Dzikir',
      },
    });

    expect(merged.heroTitle).toBe('Judul Hero Baru Kurator');
    expect(merged.barokahLockAmount).toBe(5000);
    expect(merged.rubrikLockAmount).toBe(15000);
    expect(merged.intentLabels.keteduhan).toBe('Ketenangan Hati & Dzikir');
    // Unedited fields remain equal to DEFAULT_SITE_COPY
    expect(merged.intentLabels.syifa).toBe(DEFAULT_SITE_COPY.intentLabels.syifa);
    expect(merged.storyReelSlides.length).toBe(DEFAULT_SITE_COPY.storyReelSlides.length);
  });
});
