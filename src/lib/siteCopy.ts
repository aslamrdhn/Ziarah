import { useState, useEffect, useCallback } from 'react';
import { sanitizePlainText, sanitizeMultilineText, sanitizeDonationAmount } from './sanitize';

export interface QuickNominalPackage {
  amount: number;
  label: string;
  tag: string;
  desc: string;
}

export interface StoryReelSlide {
  id: string;
  stepLabel: string;
  shortTabTitle: string;
  title: string;
  narrative: string;
  arabicQuote?: string;
  arabicSource?: string;
  ctaLabel: string;
  ctaTarget: string;
}

export interface SiteIntentLabels {
  all: string;
  keteduhan: string;
  ikhtiar: string;
  keteguhan: string;
  ilmu: string;
}

export interface SiteCopyConfig {
  // 0. Identitas & Navbar
  brandName: string;
  brandSubtitle: string;
  navHomeLabel: string;
  navRubrikLabel: string;
  navMapLabel: string;
  navPrayerLabel: string;
  navDonateCtaLabel: string;

  // 1. Beranda & Filter
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  jumatBannerTitle: string;
  jumatBannerSubtitle: string;
  searchPlaceholder: string;
  tabLabelAll: string;
  tabLabelWaliSongo: string;
  tabLabelUlama: string;
  tabLabelRaja: string;
  intentLabels: SiteIntentLabels;
  cardCtaLabel: string;
  cardPrimaryCta: string;
  cardSecondaryMapCta: string;
  faqSectionTitle: string;
  faqSectionSubtitle: string;

  // 1B. Story Reel & Audio-Visual Carousel (5 Slide Hikmah Ziarah)
  storyReelSectionTitle: string;
  storyReelSectionSubtitle: string;
  storyReelSlides: StoryReelSlide[];

  // 2. Ruang Baca, Modal Detail Makam & Harga Gembok
  barokahLockAmount: number;
  rubrikLockAmount: number;
  readerTabMainStory: string;
  readerTabPrayerGuide: string;
  karomahSectionTitle: string;
  barokahSectionTitle: string;
  barokahHookPrefix: string;
  barokahPaywallTitle: string;
  barokahPaywallDescription: string;
  barokahPaywallButtonText: string;
  paywallBadge: string;
  paywallTitle: string;
  paywallDescription: string;
  paywallSubtitle: string;
  paywallButtonText: string;
  paywallPrimaryButton: string;
  whatsappSharePrefix: string;
  rubrikTitle: string;
  rubrikSubtitle: string;
  rubrikHeaderSubtitle: string;

  // 3. Infaq, Paket Nominal & Munajat
  infaqTitle: string;
  infaqHeadline: string;
  infaqSubtitle: string;
  infaqSubheadline: string;
  infaqTransparencyNote: string;
  munajatTitle: string;
  munajatHeaderTitle: string;
  munajatSubtitle: string;
  munajatHeaderSubtitle: string;
  doaHajatPlaceholder: string;
  unlockSuccessMessage: string;
  quickNominalPackages: QuickNominalPackage[];

  // 4. Halaman Yasin & Doa
  bacaanTitle: string;
  bacaanSubtitle: string;
  yasinHeaderSubtitle: string;
  tawassulTitle: string;
  tawassulPlaceholder: string;
  postPrayerTitle: string;
  postPrayerDescription: string;
  doaKhususTitle: string;
  doaKhususSubtitle: string;
  doaHeaderSubtitle: string;

  // 5. Footer
  footerAboutText: string;
  footerCopyrightText: string;

  updatedAt?: unknown;
}

export const DEFAULT_SITE_COPY: SiteCopyConfig = {
  // 0. Identitas & Navbar
  brandName: 'Ziarah Nusantara',
  brandSubtitle: 'Ensiklopedia Digital & Panduan Makam Wali',
  navHomeLabel: 'Direktori Makam',
  navRubrikLabel: 'Kisah & Karomah',
  navMapLabel: 'Peta Rute',
  navPrayerLabel: 'Yasin & Doa',
  navDonateCtaLabel: 'Infaq & Munajat',

  // 1. Beranda & Filter
  heroBadge: 'Arsip Resmi Waliyullah & Ulama Nusantara',
  heroTitle: 'Jejak Langkah Para Kekasih Allah di Bumi Nusantara.',
  heroSubtitle:
    'Sebuah ruang hening untuk membaca kembali keteguhan iman, kelembutan dakwah, dan wasiat batin para Waliyullah serta Ulama penjaga negeri.',
  jumatBannerTitle: 'Malam & Hari Jumat Penuh Keberkahan',
  jumatBannerSubtitle:
    'Mari hadiahkan Al-Fatihah dan selami kembali kisah para kekasih Allah yang meneduhkan batin.',
  searchPlaceholder:
    'Cari nama Waliyullah, kota, atau kisah batin (misal: Sunan Kalijaga, sabar, rezeki)...',
  tabLabelAll: 'Semua Tokoh',
  tabLabelWaliSongo: 'Wali Songo',
  tabLabelUlama: 'Ulama & Auliya',
  tabLabelRaja: 'Sultan & Raja Islam',
  intentLabels: {
    all: 'Semua Riwayat',
    keteduhan: 'Penawar Hati',
    ikhtiar: 'Ikhtiar & Rezeki',
    keteguhan: 'Keteguhan Uji',
    ilmu: 'Sanad Keilmuan',
  },
  cardCtaLabel: 'Karomah & Doa Khusus →',
  cardPrimaryCta: 'Karomah & Doa Khusus →',
  cardSecondaryMapCta: 'Lihat di Peta',
  faqSectionTitle: 'Panduan Pengertian, Hukum, Adab, dan Urutan Doa Ziarah Kubur Sesuai Sunnah',
  faqSectionSubtitle: 'Ensiklopedia & Tuntunan Resmi Peziarah Indonesia',

  // 1B. Story Reel & Audio-Visual Carousel (5 Slide Hikmah Ziarah)
  storyReelSectionTitle: 'Mengapa Kita Berziarah?',
  storyReelSectionSubtitle: 'Reel Kisah · Hikmah & Sanad',
  storyReelSlides: [
    {
      id: 'keheningan-batin',
      stepLabel: '01 · Mengapa Kita Berziarah?',
      shortTabTitle: 'Menyepi dari Bisingnya Dunia',
      title: 'Ketika Hati Penat oleh Hiruk-Pikuk Dunia',
      narrative:
        'Di tengah kesibukan mencari penghidupan dan beratnya beban pikiran, langkah kaki menuju pusara para kekasih Allah menghadirkan keheningan yang meneduhkan jiwa.',
      ctaLabel: 'Pilih Makam Penyejuk Hati',
      ctaTarget: '#katalog-direktori',
    },
    {
      id: 'tauhid-adab',
      stepLabel: '02 · Luruskan Niat & Adab Ahlussunnah',
      shortTabTitle: 'Murni Memohon kepada Allah SWT',
      title: 'Ziarah Bukan Meminta kepada Kuburan',
      narrative:
        'Peziarah sejati datang dengan aqidah yang lurus: kita mendoakan ahli kubur, mengenang perjuangan dakwah para Waliyullah, dan memohon segala hajat murni hanya kepada Allah SWT melalui wasilah amal shalih serta kecintaan kepada orang-orang yang dicintai-Nya.',
      ctaLabel: 'Pelajari Adab & Urutan Doa',
      ctaTarget: '/panduan',
    },
    {
      id: 'pelembut-hati',
      stepLabel: '03 · Pelembut Hati & Pengingat Akhirat',
      shortTabTitle: 'Sabda Nabi tentang Ziarah Kubur',
      title: 'Melembutkan Hati & Mengingatkan Akhirat',
      narrative:
        'Rasulullah SAW menganjurkan umatnya berziarah kubur karena di sanalah keangkuhan manusia luruh, air mata taubat mengalir, dan batin kembali ingat pada kampung halaman abadi.',
      arabicQuote: 'كُنْتُ نَهَيْتُكُمْ عَنْ زِيَارَةِ الْقُبُورِ أَلَا فَزُورُوهَا، فَإِنَّهَا تُرِقُّ الْقَلْبَ، وَتُدْمِعُ الْعَيْنَ، وَتُذَكِّرُ الْآخِرَةَ',
      arabicSource:
        'Artinya: "Dahulu aku melarang kalian berziarah kubur, maka sekarang berziarahlah. Sesungguhnya ziarah kubur itu melembutkan hati, menitikkan air mata, dan mengingatkan kepada akhirat." (HR. Hakim & Muslim)',
      ctaLabel: 'Buka Bacaan Yasin & Tahlil',
      ctaTarget: '/panduan',
    },
    {
      id: 'teladan-wali',
      stepLabel: '04 · Meneladani Keteguhan Para Wali',
      shortTabTitle: 'Belajar Sabar dari Jejak Auliya',
      title: 'Bagaimana Para Wali Menghadapi Ujian Zaman?',
      narrative:
        'Menatap pusara Wali Songo dan Ulama Nusantara mengingatkan kita bahwa dakwah di negeri ini dibangun dengan air mata riyadhoh, kesabaran menghadapi fitnah, kedermawanan tanpa batas, serta kasih sayang kepada sesama.',
      ctaLabel: 'Baca Kisah & Karomah Wali',
      ctaTarget: '/rubrik',
    },
    {
      id: 'bekal-peziarah',
      stepLabel: '05 · Bekal Lengkap di Genggaman Anda',
      shortTabTitle: 'Siap Berangkat Ziarah Hari Ini',
      title: 'Satu Panduan untuk Seluruh Perjalanan Batin',
      narrative:
        'Dari titik koordinat 96 makam di 18 provinsi, jadwal haul tahunan, teks Yasin & Tahlil lengkap dengan khususan nama almarhum, hingga dinding munajat doa bersama—semuanya siap menemani langkah ziarah Anda.',
      ctaLabel: 'Mulai Jelajahi 96 Makam',
      ctaTarget: '#katalog-direktori',
    },
  ],

  // 2. Ruang Baca, Modal Detail Makam & Harga Gembok
  barokahLockAmount: 5000,
  rubrikLockAmount: 10000,
  readerTabMainStory: 'Kisah Hidup & Karomah',
  readerTabPrayerGuide: 'Tuntunan Ziarah & Doa Khusus',
  karomahSectionTitle: 'Babak II — Kesaksian Karomah & Keajaiban Batin',
  barokahSectionTitle: 'Barokah Hajat & Doa Khusus Peziarah',
  barokahHookPrefix: 'Harapan & Wasilah Hajat Jamaah',
  barokahPaywallTitle: 'Amalan & Doa Khusus Hajat Terkunci',
  barokahPaywallDescription:
    'Buka penuh 3 Bagian Panduan Amalan (Tata Cara & Waktu Mustajab, Lafaz Arab Naskh, Transliterasi Latin, Terjemahan Hajat, serta Wirid Penutup) dengan infaq jariyah.',
  barokahPaywallButtonText: 'Buka Barokah & Doa Khusus',
  paywallBadge: 'Arsip Khazanah & Wasiat Terkunci',
  paywallTitle: 'Teruskan Membaca Wasiat & Kesaksian Batin Beliau',
  paywallDescription:
    'Bagian lanjutan naskah ini disimpan dalam Khazanah Khusus. Dengan niat infaq jariyah satu kali, Anda ikut menjaga kelangsungan arsip sejarah ulama Nusantara sekaligus membuka seluruh 96+ kisah rahasia di perangkat ini.',
  paywallSubtitle:
    'Bagian lanjutan naskah ini disimpan dalam Khazanah Khusus. Dengan niat infaq jariyah satu kali, Anda ikut menjaga kelangsungan arsip sejarah ulama Nusantara sekaligus membuka seluruh 96+ kisah rahasia di perangkat ini.',
  paywallButtonText: 'Buka Seluruh Kisah & Wasiat',
  paywallPrimaryButton: 'Buka Seluruh Kisah & Wasiat',
  whatsappSharePrefix: 'Merinding membaca cuplikan kisah & karomah',
  rubrikTitle: 'Rubrik Ziarah Nusantara.',
  rubrikSubtitle:
    'Lembaran catatan sejarah, kesaksian karomah, dan wasiat keteladanan para Auliya yang dikurasi dari babad serta penuturan lisan.',
  rubrikHeaderSubtitle:
    'Lembaran catatan sejarah, kesaksian karomah, dan wasiat keteladanan para Auliya yang dikurasi dari babad serta penuturan lisan.',

  // 3. Infaq, Paket Nominal & Munajat
  infaqTitle: 'Jariyah Penjaga Jejak & Riwayat Para Kekasih Allah',
  infaqHeadline: 'Jariyah Penjaga Jejak & Riwayat Para Kekasih Allah',
  infaqSubtitle:
    'Setiap rupiah infaq Anda menjadi amal jariyah untuk perawatan server arsip digital, riset naskah sejarah pesantren, dan penyebaran tuntunan adab ziarah ke seluruh penjuru Nusantara.',
  infaqSubheadline:
    'Setiap rupiah infaq Anda menjadi amal jariyah untuk perawatan server arsip digital, riset naskah sejarah pesantren, dan penyebaran tuntunan adab ziarah ke seluruh penjuru Nusantara.',
  infaqTransparencyNote:
    '100% dikelola secara amanah untuk pelestarian literasi sejarah Islam Nusantara, pemeliharaan sistem direktori bebas iklan, dan dokumentasi lapangan.',
  munajatTitle: 'Dinding Munajat & Doa Bersama Peziarah',
  munajatHeaderTitle: 'Dinding Munajat & Doa Bersama Peziarah',
  munajatSubtitle:
    'Titipkan doa terbaik Anda bersama infaq jariyah, dan mari saling mengaminkan hajat sesama peziarah.',
  munajatHeaderSubtitle:
    'Titipkan doa terbaik Anda bersama infaq jariyah, dan mari saling mengaminkan hajat sesama peziarah.',
  doaHajatPlaceholder:
    'Contoh: Semoga almarhum ayahanda diampuni segala khilafnya dan keluarga kami diberi ketenangan batin serta kelapangan rezeki yang berkah...',
  unlockSuccessMessage:
    'Alhamdulillah, terima kasih atas infaq jariyah Anda. Seluruh 96+ kisah rahasia, catatan karomah, dan manuskrip kini telah terbuka penuh di perangkat Anda.',
  quickNominalPackages: [
    {
      amount: 10000,
      label: 'Rp 10rb',
      tag: 'Pembuka Khazanah',
      desc: 'Membuka seluruh arsip kisah & wasiat di perangkat ini',
    },
    {
      amount: 25000,
      label: 'Rp 25rb',
      tag: 'Paling Banyak Dipilih',
      desc: 'Wasilah penjaga sanad & perawatan arsip harian',
    },
    {
      amount: 50000,
      label: 'Rp 50rb',
      tag: 'Jariyah Utama',
      desc: 'Dukungan riset naskah kuno & dokumentasi makam',
    },
    {
      amount: 100000,
      label: 'Rp 100rb',
      tag: 'Wakaf Literasi',
      desc: 'Kontribusi utama pelestarian ensiklopedia Nusantara',
    },
  ],

  // 4. Halaman Yasin & Doa
  bacaanTitle: 'Bacaan Yasin, Tahlil & Tasbih Peziarah',
  bacaanSubtitle:
    'Susunan lengkap bacaan tawassul Al-Fatihah, Surah Yasin 83 ayat, tahlil, dan doa arwah yang nyaman dibaca langsung di sisi pusara.',
  yasinHeaderSubtitle:
    'Susunan lengkap bacaan tawassul Al-Fatihah, Surah Yasin 83 ayat, tahlil, dan doa arwah yang nyaman dibaca langsung di sisi pusara.',
  tawassulTitle: 'Untuk Siapa Bacaan Al-Fatihah & Doa Ini Dihadiahkan?',
  tawassulPlaceholder:
    'Ketik nama Almarhum / Almarhumah atau hajat batin Anda (tersimpan di HP ini)...',
  postPrayerTitle:
    'Alhamdulillah. Setelah hati tenang usai berdoa, mari resapi kisah keteladanan beliau semasa hidup.',
  postPrayerDescription:
    'Semoga setiap huruf Al-Fatihah, Yasin, Tahlil, dan doa yang terlantun menjadi cahaya kelapangan bagi ahli kubur serta keberkahan bagi keluarga kita.',
  doaKhususTitle: 'Wirid & Doa Khusus Para Wali Nusantara',
  doaKhususSubtitle:
    'Himpunan salam peziarah, qasidah tawassul, dan wirid warisan ulama Nusantara lengkap dengan teks Arab, Latin, serta terjemahannya.',
  doaHeaderSubtitle:
    'Himpunan salam peziarah, qasidah tawassul, dan wirid warisan ulama Nusantara lengkap dengan teks Arab, Latin, serta terjemahannya.',

  // 5. Footer
  footerAboutText: 'Ziarah Nusantara — Panduan Ziarah Kubur & Direktori Makam Wali Nusantara',
  footerCopyrightText: 'Dikelola secara resmi oleh Tim Kurator Arsip Ziarah Nusantara',
};

const SITE_COPY_CACHE_KEY = 'zn_site_copy_cache_v1';
const SITE_COPY_EVENT = 'zn-site-copy-updated';
const SITE_COPY_LEGACY_EVENT = 'zn_site_copy_updated';
const ADMIN_DIRTY_TS_KEY = 'zn_admin_dirty_ts';

function sanitizePackages(raw: unknown): QuickNominalPackage[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return DEFAULT_SITE_COPY.quickNominalPackages;
  }
  const cleaned = raw
    .map((item) => {
      if (!item || typeof item !== 'object') return null;
      const rec = item as Record<string, unknown>;
      const amount = sanitizeDonationAmount(rec.amount, 5000, 100000000);
      if (amount < 5000) return null;
      const label =
        sanitizePlainText(rec.label, 40) || `Rp ${(amount / 1000).toLocaleString('id-ID')}rb`;
      const tag = sanitizePlainText(rec.tag, 60) || 'Infaq Jariyah';
      const desc = sanitizePlainText(rec.desc, 160) || 'Dukungan pelestarian arsip digital';
      return { amount, label, tag, desc };
    })
    .filter((x): x is QuickNominalPackage => x !== null)
    .slice(0, 8);

  return cleaned.length > 0 ? cleaned : DEFAULT_SITE_COPY.quickNominalPackages;
}

function sanitizeStoryReelSlides(raw: unknown): StoryReelSlide[] {
  if (!Array.isArray(raw) || raw.length === 0) {
    return DEFAULT_SITE_COPY.storyReelSlides;
  }
  const cleaned = raw
    .map((item, idx) => {
      if (!item || typeof item !== 'object') return null;
      const rec = item as Record<string, unknown>;
      const fallback =
        DEFAULT_SITE_COPY.storyReelSlides[idx] || DEFAULT_SITE_COPY.storyReelSlides[0];
      const id = sanitizePlainText(rec.id, 60) || fallback.id;
      const stepLabel = sanitizePlainText(rec.stepLabel, 80) || fallback.stepLabel;
      const shortTabTitle = sanitizePlainText(rec.shortTabTitle, 80) || fallback.shortTabTitle;
      const title = sanitizePlainText(rec.title, 140) || fallback.title;
      const narrative = sanitizeMultilineText(rec.narrative, 600) || fallback.narrative;
      const arabicQuote =
        typeof rec.arabicQuote === 'string'
          ? sanitizeMultilineText(rec.arabicQuote, 600)
          : fallback.arabicQuote || '';
      const arabicSource =
        typeof rec.arabicSource === 'string'
          ? sanitizeMultilineText(rec.arabicSource, 400)
          : fallback.arabicSource || '';
      const ctaLabel = sanitizePlainText(rec.ctaLabel, 60) || fallback.ctaLabel;
      const ctaTarget = sanitizePlainText(rec.ctaTarget, 120) || fallback.ctaTarget;
      return {
        id,
        stepLabel,
        shortTabTitle,
        title,
        narrative,
        ...(arabicQuote ? { arabicQuote } : {}),
        ...(arabicSource ? { arabicSource } : {}),
        ctaLabel,
        ctaTarget,
      };
    })
    .filter((x): x is StoryReelSlide => x !== null)
    .slice(0, 8);

  return cleaned.length > 0 ? cleaned : DEFAULT_SITE_COPY.storyReelSlides;
}

function sanitizeIntentLabels(raw: unknown): SiteIntentLabels {
  const def = DEFAULT_SITE_COPY.intentLabels;
  if (!raw || typeof raw !== 'object') return def;
  const rec = raw as Record<string, unknown>;
  return {
    all: sanitizePlainText(rec.all, 50) || def.all,
    keteduhan: sanitizePlainText(rec.keteduhan, 50) || def.keteduhan,
    ikhtiar: sanitizePlainText(rec.ikhtiar, 50) || def.ikhtiar,
    keteguhan: sanitizePlainText(rec.keteguhan, 50) || def.keteguhan,
    ilmu: sanitizePlainText(rec.ilmu, 50) || def.ilmu,
  };
}

export function mergeWithDefaultSiteCopy(raw?: Partial<SiteCopyConfig> | null): SiteCopyConfig {
  if (!raw || typeof raw !== 'object') {
    return { ...DEFAULT_SITE_COPY };
  }

  const pickStr = (val: unknown, fallback: string, maxLen = 400, multiline = false): string => {
    if (typeof val !== 'string') return fallback;
    const cleaned = multiline
      ? sanitizeMultilineText(val, maxLen)
      : sanitizePlainText(val, maxLen);
    return cleaned.trim().length > 0 ? cleaned : fallback;
  };

  const pickPair = (
    primaryVal: unknown,
    legacyVal: unknown,
    fallback: string,
    maxLen = 400,
    multiline = false
  ): string => {
    if (typeof primaryVal === 'string' && primaryVal.trim().length > 0) {
      return pickStr(primaryVal, fallback, maxLen, multiline);
    }
    if (typeof legacyVal === 'string' && legacyVal.trim().length > 0) {
      return pickStr(legacyVal, fallback, maxLen, multiline);
    }
    return fallback;
  };

  const cardCtaResolved = pickPair(
    raw.cardCtaLabel,
    raw.cardPrimaryCta,
    DEFAULT_SITE_COPY.cardCtaLabel,
    80
  );
  const paywallDescResolved = pickPair(
    raw.paywallDescription,
    raw.paywallSubtitle,
    DEFAULT_SITE_COPY.paywallDescription,
    600,
    true
  );
  const paywallBtnResolved = pickPair(
    raw.paywallButtonText,
    raw.paywallPrimaryButton,
    DEFAULT_SITE_COPY.paywallButtonText,
    120
  );
  const rubrikSubResolved = pickPair(
    raw.rubrikSubtitle,
    raw.rubrikHeaderSubtitle,
    DEFAULT_SITE_COPY.rubrikSubtitle,
    500,
    true
  );
  const infaqTitleResolved = pickPair(
    raw.infaqTitle,
    raw.infaqHeadline,
    DEFAULT_SITE_COPY.infaqTitle,
    200
  );
  const infaqSubResolved = pickPair(
    raw.infaqSubtitle,
    raw.infaqSubheadline,
    DEFAULT_SITE_COPY.infaqSubtitle,
    600,
    true
  );
  const munajatTitleResolved = pickPair(
    raw.munajatTitle,
    raw.munajatHeaderTitle,
    DEFAULT_SITE_COPY.munajatTitle,
    200
  );
  const munajatSubResolved = pickPair(
    raw.munajatSubtitle,
    raw.munajatHeaderSubtitle,
    DEFAULT_SITE_COPY.munajatSubtitle,
    500,
    true
  );
  const bacaanSubResolved = pickPair(
    raw.bacaanSubtitle,
    raw.yasinHeaderSubtitle,
    DEFAULT_SITE_COPY.bacaanSubtitle,
    500,
    true
  );
  const doaSubResolved = pickPair(
    raw.doaKhususSubtitle,
    raw.doaHeaderSubtitle,
    DEFAULT_SITE_COPY.doaKhususSubtitle,
    500,
    true
  );

  const barokahLockAmount =
    sanitizeDonationAmount(raw.barokahLockAmount, 1000, 10000000) ||
    DEFAULT_SITE_COPY.barokahLockAmount;
  const rubrikLockAmount =
    sanitizeDonationAmount(raw.rubrikLockAmount, 1000, 10000000) ||
    DEFAULT_SITE_COPY.rubrikLockAmount;

  return {
    brandName: pickStr(raw.brandName, DEFAULT_SITE_COPY.brandName, 100),
    brandSubtitle: pickStr(raw.brandSubtitle, DEFAULT_SITE_COPY.brandSubtitle, 160),
    navHomeLabel: pickStr(raw.navHomeLabel, DEFAULT_SITE_COPY.navHomeLabel, 60),
    navRubrikLabel: pickStr(raw.navRubrikLabel, DEFAULT_SITE_COPY.navRubrikLabel, 60),
    navMapLabel: pickStr(raw.navMapLabel, DEFAULT_SITE_COPY.navMapLabel, 60),
    navPrayerLabel: pickStr(raw.navPrayerLabel, DEFAULT_SITE_COPY.navPrayerLabel, 60),
    navDonateCtaLabel: pickStr(raw.navDonateCtaLabel, DEFAULT_SITE_COPY.navDonateCtaLabel, 60),

    heroBadge: pickStr(raw.heroBadge, DEFAULT_SITE_COPY.heroBadge, 140),
    heroTitle: pickStr(raw.heroTitle, DEFAULT_SITE_COPY.heroTitle, 200),
    heroSubtitle: pickStr(raw.heroSubtitle, DEFAULT_SITE_COPY.heroSubtitle, 500, true),
    jumatBannerTitle: pickStr(raw.jumatBannerTitle, DEFAULT_SITE_COPY.jumatBannerTitle, 160),
    jumatBannerSubtitle: pickStr(
      raw.jumatBannerSubtitle,
      DEFAULT_SITE_COPY.jumatBannerSubtitle,
      400,
      true
    ),
    searchPlaceholder: pickStr(raw.searchPlaceholder, DEFAULT_SITE_COPY.searchPlaceholder, 200),
    tabLabelAll: pickStr(raw.tabLabelAll, DEFAULT_SITE_COPY.tabLabelAll, 60),
    tabLabelWaliSongo: pickStr(raw.tabLabelWaliSongo, DEFAULT_SITE_COPY.tabLabelWaliSongo, 60),
    tabLabelUlama: pickStr(raw.tabLabelUlama, DEFAULT_SITE_COPY.tabLabelUlama, 60),
    tabLabelRaja: pickStr(raw.tabLabelRaja, DEFAULT_SITE_COPY.tabLabelRaja, 60),
    intentLabels: sanitizeIntentLabels(raw.intentLabels),
    cardCtaLabel: cardCtaResolved,
    cardPrimaryCta: cardCtaResolved,
    cardSecondaryMapCta: pickStr(
      raw.cardSecondaryMapCta,
      DEFAULT_SITE_COPY.cardSecondaryMapCta,
      60
    ),
    faqSectionTitle: pickStr(raw.faqSectionTitle, DEFAULT_SITE_COPY.faqSectionTitle, 240),
    faqSectionSubtitle: pickStr(raw.faqSectionSubtitle, DEFAULT_SITE_COPY.faqSectionSubtitle, 180),
    storyReelSectionTitle: pickStr(
      raw.storyReelSectionTitle,
      DEFAULT_SITE_COPY.storyReelSectionTitle,
      140
    ),
    storyReelSectionSubtitle: pickStr(
      raw.storyReelSectionSubtitle,
      DEFAULT_SITE_COPY.storyReelSectionSubtitle,
      120
    ),
    storyReelSlides: sanitizeStoryReelSlides(raw.storyReelSlides),

    barokahLockAmount,
    rubrikLockAmount,
    readerTabMainStory: pickStr(
      raw.readerTabMainStory,
      DEFAULT_SITE_COPY.readerTabMainStory,
      80
    ),
    readerTabPrayerGuide: pickStr(
      raw.readerTabPrayerGuide,
      DEFAULT_SITE_COPY.readerTabPrayerGuide,
      80
    ),
    karomahSectionTitle: pickStr(
      raw.karomahSectionTitle,
      DEFAULT_SITE_COPY.karomahSectionTitle,
      160
    ),
    barokahSectionTitle: pickStr(
      raw.barokahSectionTitle,
      DEFAULT_SITE_COPY.barokahSectionTitle,
      160
    ),
    barokahHookPrefix: pickStr(raw.barokahHookPrefix, DEFAULT_SITE_COPY.barokahHookPrefix, 140),
    barokahPaywallTitle: pickStr(
      raw.barokahPaywallTitle,
      DEFAULT_SITE_COPY.barokahPaywallTitle,
      180
    ),
    barokahPaywallDescription: pickStr(
      raw.barokahPaywallDescription,
      DEFAULT_SITE_COPY.barokahPaywallDescription,
      600,
      true
    ),
    barokahPaywallButtonText: pickStr(
      raw.barokahPaywallButtonText,
      DEFAULT_SITE_COPY.barokahPaywallButtonText,
      120
    ),
    paywallBadge: pickStr(raw.paywallBadge, DEFAULT_SITE_COPY.paywallBadge, 100),
    paywallTitle: pickStr(raw.paywallTitle, DEFAULT_SITE_COPY.paywallTitle, 200),
    paywallDescription: paywallDescResolved,
    paywallSubtitle: paywallDescResolved,
    paywallButtonText: paywallBtnResolved,
    paywallPrimaryButton: paywallBtnResolved,
    whatsappSharePrefix: pickStr(
      raw.whatsappSharePrefix,
      DEFAULT_SITE_COPY.whatsappSharePrefix,
      200
    ),
    rubrikTitle: pickStr(raw.rubrikTitle, DEFAULT_SITE_COPY.rubrikTitle, 160),
    rubrikSubtitle: rubrikSubResolved,
    rubrikHeaderSubtitle: rubrikSubResolved,

    infaqTitle: infaqTitleResolved,
    infaqHeadline: infaqTitleResolved,
    infaqSubtitle: infaqSubResolved,
    infaqSubheadline: infaqSubResolved,
    infaqTransparencyNote: pickStr(
      raw.infaqTransparencyNote,
      DEFAULT_SITE_COPY.infaqTransparencyNote,
      500,
      true
    ),
    munajatTitle: munajatTitleResolved,
    munajatHeaderTitle: munajatTitleResolved,
    munajatSubtitle: munajatSubResolved,
    munajatHeaderSubtitle: munajatSubResolved,
    doaHajatPlaceholder: pickStr(
      raw.doaHajatPlaceholder,
      DEFAULT_SITE_COPY.doaHajatPlaceholder,
      300
    ),
    unlockSuccessMessage: pickStr(
      raw.unlockSuccessMessage,
      DEFAULT_SITE_COPY.unlockSuccessMessage,
      500,
      true
    ),
    quickNominalPackages: sanitizePackages(raw.quickNominalPackages),

    bacaanTitle: pickStr(raw.bacaanTitle, DEFAULT_SITE_COPY.bacaanTitle, 160),
    bacaanSubtitle: bacaanSubResolved,
    yasinHeaderSubtitle: bacaanSubResolved,
    tawassulTitle: pickStr(raw.tawassulTitle, DEFAULT_SITE_COPY.tawassulTitle, 180),
    tawassulPlaceholder: pickStr(
      raw.tawassulPlaceholder,
      DEFAULT_SITE_COPY.tawassulPlaceholder,
      240
    ),
    postPrayerTitle: pickStr(raw.postPrayerTitle, DEFAULT_SITE_COPY.postPrayerTitle, 300, true),
    postPrayerDescription: pickStr(
      raw.postPrayerDescription,
      DEFAULT_SITE_COPY.postPrayerDescription,
      500,
      true
    ),
    doaKhususTitle: pickStr(raw.doaKhususTitle, DEFAULT_SITE_COPY.doaKhususTitle, 160),
    doaKhususSubtitle: doaSubResolved,
    doaHeaderSubtitle: doaSubResolved,

    footerAboutText: pickStr(raw.footerAboutText, DEFAULT_SITE_COPY.footerAboutText, 240),
    footerCopyrightText: pickStr(
      raw.footerCopyrightText,
      DEFAULT_SITE_COPY.footerCopyrightText,
      240
    ),
  };
}

export function getCachedSiteCopy(): SiteCopyConfig {
  if (typeof window === 'undefined') return { ...DEFAULT_SITE_COPY };
  try {
    const cached = localStorage.getItem(SITE_COPY_CACHE_KEY);
    if (!cached) return { ...DEFAULT_SITE_COPY };
    return mergeWithDefaultSiteCopy(JSON.parse(cached));
  } catch {
    return { ...DEFAULT_SITE_COPY };
  }
}

export function setCachedSiteCopy(copy: SiteCopyConfig, markAdminDirty = false): void {
  if (typeof window === 'undefined') return;
  try {
    const merged = mergeWithDefaultSiteCopy(copy);
    localStorage.setItem(SITE_COPY_CACHE_KEY, JSON.stringify(merged));
    if (markAdminDirty) {
      localStorage.setItem(ADMIN_DIRTY_TS_KEY, String(Date.now()));
    }
    window.dispatchEvent(new CustomEvent(SITE_COPY_EVENT, { detail: merged }));
    window.dispatchEvent(new CustomEvent(SITE_COPY_LEGACY_EVENT, { detail: merged }));
  } catch {
    // Ignore storage quota errors
  }
}

let cloudFetchPromise: Promise<SiteCopyConfig> | null = null;

export async function fetchSiteCopyFromCloud(force = false): Promise<SiteCopyConfig> {
  if (!force && cloudFetchPromise) {
    return cloudFetchPromise;
  }

  cloudFetchPromise = (async () => {
    try {
      const [{ db }, { doc, getDoc }] = await Promise.all([
        import('./firebase'),
        import('firebase/firestore'),
      ]);
      const snap = await getDoc(doc(db, 'settings', 'site_copy'));
      if (snap.exists()) {
        const merged = mergeWithDefaultSiteCopy(snap.data() as Partial<SiteCopyConfig>);
        setCachedSiteCopy(merged, false);
        return merged;
      }
    } catch {
      // Fallback silently to cached or default copy when offline
    }
    return getCachedSiteCopy();
  })();

  return cloudFetchPromise;
}

export async function saveSiteCopyToCloud(newCopy: SiteCopyConfig): Promise<SiteCopyConfig> {
  const merged = mergeWithDefaultSiteCopy(newCopy);
  setCachedSiteCopy(merged, true);
  const [{ db, handleFirestoreError, OperationType }, { doc, setDoc, serverTimestamp }] =
    await Promise.all([import('./firebase'), import('firebase/firestore')]);
  try {
    await setDoc(doc(db, 'settings', 'site_copy'), {
      ...merged,
      updatedAt: serverTimestamp(),
    });
    cloudFetchPromise = Promise.resolve(merged);
    return merged;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'settings/site_copy');
    throw error;
  }
}

export const saveSiteCopyConfig = saveSiteCopyToCloud;

export async function resetSiteCopyConfig(): Promise<SiteCopyConfig> {
  return saveSiteCopyToCloud(DEFAULT_SITE_COPY);
}

export type UseSiteCopyReturn = SiteCopyConfig & {
  copy: SiteCopyConfig;
  siteCopy: SiteCopyConfig;
  setSiteCopy: React.Dispatch<React.SetStateAction<SiteCopyConfig>>;
  refreshSiteCopy: () => Promise<SiteCopyConfig>;
};

export function useSiteCopy(): UseSiteCopyReturn {
  const [siteCopy, setSiteCopy] = useState<SiteCopyConfig>(() => getCachedSiteCopy());

  useEffect(() => {
    let mounted = true;
    let fetchedOnce = false;

    const fetchLatestSiteCopy = async (force = false) => {
      if (!force && fetchedOnce) return;
      fetchedOnce = true;
      try {
        const latest = await fetchSiteCopyFromCloud(force);
        if (mounted) {
          setSiteCopy(latest);
        }
      } catch {
        // Fallback silently to cached/default copy if offline
      }
    };

    const isAdminRoute =
      typeof window !== 'undefined' &&
      (window.location.pathname.startsWith('/admin') ||
        window.location.pathname.startsWith('/kurator'));
    let hasAdminDirtyFlag = false;
    try {
      hasAdminDirtyFlag = Boolean(localStorage.getItem(ADMIN_DIRTY_TS_KEY));
    } catch {}

    const interactionEvents = ['pointerdown', 'scroll', 'keydown', 'touchstart'] as const;

    const handleFirstInteraction = () => {
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, handleFirstInteraction)
      );
      void fetchLatestSiteCopy(false);
    };

    if (isAdminRoute || hasAdminDirtyFlag) {
      void fetchLatestSiteCopy(true);
    } else if (typeof window !== 'undefined') {
      interactionEvents.forEach((evt) =>
        window.addEventListener(evt, handleFirstInteraction, { once: true, passive: true })
      );
    }

    const handleCustomUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<SiteCopyConfig>;
      if (customEvt.detail && mounted) {
        setSiteCopy(customEvt.detail);
      } else if (mounted) {
        setSiteCopy(getCachedSiteCopy());
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (!mounted) return;
      if (e.key === SITE_COPY_CACHE_KEY) {
        setSiteCopy(getCachedSiteCopy());
      } else if (e.key === ADMIN_DIRTY_TS_KEY) {
        void fetchLatestSiteCopy(true);
      }
    };

    const handleFocus = () => {
      if (!mounted) return;
      try {
        if (localStorage.getItem(ADMIN_DIRTY_TS_KEY)) {
          void fetchLatestSiteCopy(true);
        }
      } catch {}
    };

    window.addEventListener(SITE_COPY_EVENT, handleCustomUpdate);
    window.addEventListener(SITE_COPY_LEGACY_EVENT, handleCustomUpdate);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleFocus);
    return () => {
      mounted = false;
      interactionEvents.forEach((evt) =>
        window.removeEventListener(evt, handleFirstInteraction)
      );
      window.removeEventListener(SITE_COPY_EVENT, handleCustomUpdate);
      window.removeEventListener(SITE_COPY_LEGACY_EVENT, handleCustomUpdate);
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const refreshSiteCopy = useCallback(async () => {
    const latest = await fetchSiteCopyFromCloud(true);
    setSiteCopy(latest);
    return latest;
  }, []);

  return {
    ...siteCopy,
    copy: siteCopy,
    siteCopy,
    setSiteCopy,
    refreshSiteCopy,
  };
}
