import React, { useState, useEffect } from 'react';
import {
  Search,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle2,
  Type,
  BookOpen,
  Wallet,
  Compass,
  Lock,
  Film,
} from 'lucide-react';
import {
  SiteCopyConfig,
  DEFAULT_SITE_COPY,
  getCachedSiteCopy,
  fetchSiteCopyFromCloud,
  saveSiteCopyToCloud,
  QuickNominalPackage,
  StoryReelSlide,
  SiteIntentLabels,
} from '../../lib/siteCopy';

interface SiteCopyAdminSectionProps {
  showBanner: (type: 'success' | 'error', text: string) => void;
  externalSiteCopy?: SiteCopyConfig | null;
}

type EditableStringCopyKey = Exclude<
  keyof SiteCopyConfig,
  | 'quickNominalPackages'
  | 'storyReelSlides'
  | 'intentLabels'
  | 'barokahLockAmount'
  | 'rubrikLockAmount'
  | 'updatedAt'
>;

type CopySubSectionId =
  | 'harga_gembok'
  | 'identitas_nav_footer'
  | 'beranda_filter'
  | 'story_reel'
  | 'ruang_baca_paywall'
  | 'halaman_panduan_doa_rubrik_infaq';

interface CopyFieldDef {
  key: EditableStringCopyKey;
  label: string;
  description: string;
  multiline?: boolean;
  section: CopySubSectionId;
}

const COPY_FIELDS: CopyFieldDef[] = [
  // b) Identitas Brand, Navbar & Footer
  {
    key: 'brandName',
    label: 'Nama Brand Situs (Navbar & Header)',
    description: 'Nama utama situs di pojok kiri atas Navbar.',
    section: 'identitas_nav_footer',
  },
  {
    key: 'brandSubtitle',
    label: 'Subjudul Brand Situs',
    description: 'Tagline identitas di bawah nama brand.',
    section: 'identitas_nav_footer',
  },
  {
    key: 'navHomeLabel',
    label: 'Label Menu Navbar 1: Direktori Makam',
    description: 'Teks menu navigasi pertama menuju halaman utama (/).',
    section: 'identitas_nav_footer',
  },
  {
    key: 'navRubrikLabel',
    label: 'Label Menu Navbar 2: Kisah & Karomah',
    description: 'Teks menu navigasi kedua menuju halaman /rubrik.',
    section: 'identitas_nav_footer',
  },
  {
    key: 'navMapLabel',
    label: 'Label Menu Navbar 3: Peta Rute',
    description: 'Teks menu navigasi ketiga menuju halaman /peta.',
    section: 'identitas_nav_footer',
  },
  {
    key: 'navPrayerLabel',
    label: 'Label Menu Navbar 4: Yasin & Doa',
    description: 'Teks menu navigasi keempat menuju halaman /panduan & /doa.',
    section: 'identitas_nav_footer',
  },
  {
    key: 'navDonateCtaLabel',
    label: 'Label Tombol CTA Navbar: Infaq & Munajat',
    description: 'Teks tombol aksi utama di sebelah kanan Navbar menuju /infaq.',
    section: 'identitas_nav_footer',
  },
  {
    key: 'footerAboutText',
    label: 'Teks Utama Footer Situs',
    description: 'Kalimat identitas utama pada bagian bawah (Footer) seluruh halaman.',
    section: 'identitas_nav_footer',
  },
  {
    key: 'footerCopyrightText',
    label: 'Teks Hak Cipta / Pengelola Footer',
    description: 'Keterangan tim kurator pengelola resmi di bagian bawah situs.',
    section: 'identitas_nav_footer',
  },
  {
    key: 'adminWhatsappNumber',
    label: 'Nomor WhatsApp Resmi Admin Kurator',
    description:
      'Format angka internasional tanpa tanda + (contoh: 6285717605655). Digunakan otomatis untuk konfirmasi bukti transfer di Modal Pembayaran, Infaq Digital, dan Rubrik Kisah.',
    section: 'identitas_nav_footer',
  },

  // c) Halaman Beranda & Filter
  {
    key: 'heroBadge',
    label: 'Label Kecil Atas Beranda (Hero Badge)',
    description: 'Teks pengantar kecil di atas judul utama Beranda.',
    section: 'beranda_filter',
  },
  {
    key: 'heroTitle',
    label: 'Judul Utama Beranda (Hero Title)',
    description: 'Judul besar paling atas di halaman Beranda Direktori Makam.',
    section: 'beranda_filter',
  },
  {
    key: 'heroSubtitle',
    label: 'Teks Pengantar Beranda (Subjudul Hero)',
    description: 'Kalimat pembuka di bawah judul utama beranda direktori makam.',
    multiline: true,
    section: 'beranda_filter',
  },
  {
    key: 'searchPlaceholder',
    label: 'Placeholder Kolom Pencarian Makam',
    description: 'Teks petunjuk di dalam kotak pencarian utama di Beranda.',
    section: 'beranda_filter',
  },
  {
    key: 'jumatBannerTitle',
    label: 'Judul Sapaan Malam / Hari Jumat',
    description: 'Sapaan pembuka pada baris pengantar Kamis malam & hari Jumat.',
    section: 'beranda_filter',
  },
  {
    key: 'jumatBannerSubtitle',
    label: 'Kalimat Renungan Malam / Hari Jumat',
    description: 'Kalimat renungan singkat pada baris pengantar Jumat di Beranda.',
    multiline: true,
    section: 'beranda_filter',
  },
  {
    key: 'tabLabelAll',
    label: 'Label Tab Kategori: Semua Tokoh',
    description: 'Teks tombol filter kategori pertama.',
    section: 'beranda_filter',
  },
  {
    key: 'tabLabelWaliSongo',
    label: 'Label Tab Kategori: Wali Songo',
    description: 'Teks tombol filter kategori Wali Songo.',
    section: 'beranda_filter',
  },
  {
    key: 'tabLabelUlama',
    label: 'Label Tab Kategori: Ulama & Auliya',
    description: 'Teks tombol filter kategori Ulama Nusantara.',
    section: 'beranda_filter',
  },
  {
    key: 'tabLabelRaja',
    label: 'Label Tab Kategori: Sultan & Raja',
    description: 'Teks tombol filter kategori Tokoh Kerajaan/Bangsa.',
    section: 'beranda_filter',
  },
  {
    key: 'cardCtaLabel',
    label: 'Label Tombol Utama Kartu Makam',
    description: 'Teks tombol aksi utama pada setiap kartu makam di Beranda.',
    section: 'beranda_filter',
  },
  {
    key: 'cardSecondaryMapCta',
    label: 'Label Tautan Peta Rute Kartu Makam',
    description: 'Teks tautan sekunder menuju Peta Rute pada setiap kartu makam.',
    section: 'beranda_filter',
  },
  {
    key: 'faqSectionSubtitle',
    label: 'Label Kecil Seksi Panduan & FAQ Beranda',
    description: 'Label di atas judul panduan adab & hukum ziarah kubur di bagian bawah Beranda.',
    section: 'beranda_filter',
  },
  {
    key: 'faqSectionTitle',
    label: 'Judul Seksi Panduan & FAQ Beranda',
    description: 'Judul utama panduan pengertian, hukum, adab, dan urutan doa ziarah di Beranda.',
    section: 'beranda_filter',
  },

  // d) Story Reel Section Headers
  {
    key: 'storyReelSectionTitle',
    label: 'Judul Utama Panggung Story Reel (5 Slide Hikmah Ziarah)',
    description: 'Judul seksi karusel vertikal 5 slide edukasi hikmah ziarah kubur di Beranda.',
    section: 'story_reel',
  },
  {
    key: 'storyReelSectionSubtitle',
    label: 'Subjudul Label Kiri Story Reel',
    description: 'Label kecil di pojok kiri atas panggung Story Reel (mis. Reel Kisah · Hikmah & Sanad).',
    section: 'story_reel',
  },

  // e) Ruang Baca Makam & Kartu Gembok (SiteDetails)
  {
    key: 'readerTabMainStory',
    label: 'Judul Tab 1 di Ruang Baca Makam',
    description: 'Label tab pertama pada modal/drawer cerita makam.',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'readerTabPrayerGuide',
    label: 'Judul Tab Panduan Ziarah di Ruang Baca Makam',
    description: 'Label tab panduan ziarah & adab pada ruang baca makam.',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'karomahSectionTitle',
    label: 'Judul Seksi Babak II (Karomah Makam)',
    description: 'Judul bagian kesaksian karomah di dalam modal detail setiap makam.',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'barokahSectionTitle',
    label: 'Judul Seksi Barokah & Doa Khusus Makam',
    description: 'Judul pengantar seksi Barokah Hajat & Doa Khusus di dalam detail makam.',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'barokahHookPrefix',
    label: 'Sub-Label Kotak Harapan & Wasilah Hajat',
    description: 'Label kecil di atas pengantar hajat peziarah pada setiap makam.',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'barokahPaywallTitle',
    label: 'Judul Kartu Gembok Barokah & Doa Khusus (Rp 5.000)',
    description: 'Judul kartu pengunci 3 bagian panduan amalan & doa khusus di detail makam.',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'barokahPaywallDescription',
    label: 'Deskripsi Kartu Gembok Barokah & Doa Khusus',
    description: 'Penjelasan manfaat membuka 3 bagian panduan amalan & doa khusus makam.',
    multiline: true,
    section: 'ruang_baca_paywall',
  },
  {
    key: 'barokahPaywallButtonText',
    label: 'Teks Tombol Pembuka Barokah & Doa Khusus',
    description: 'Teks tombol CTA pembuka gembok Barokah & Doa Khusus.',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'paywallBadge',
    label: 'Label Kecil Gembok Khazanah & Wasiat (Rp 10.000)',
    description: 'Label status di atas judul gembok cerita (mis. Arsip Khazanah & Wasiat Terkunci).',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'paywallTitle',
    label: 'Judul Kotak Gembok Wasiat / Karomah (Rp 10.000)',
    description: 'Judul kartu pengunci lanjutan kisah karomah atau wasiat di detail makam.',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'paywallDescription',
    label: 'Deskripsi Kotak Gembok Kisah / Wasiat (Rp 10.000)',
    description: 'Subjudul penjelas di bawah judul gembok cerita makam.',
    multiline: true,
    section: 'ruang_baca_paywall',
  },
  {
    key: 'paywallButtonText',
    label: 'Teks Tombol Utama Pembuka Gembok Khazanah',
    description: 'Teks tombol CTA pada kartu pengunci cerita karomah & wasiat makam.',
    section: 'ruang_baca_paywall',
  },
  {
    key: 'whatsappSharePrefix',
    label: 'Kalimat Pembuka Pesan Bagikan WhatsApp',
    description: 'Kalimat pengantar saat pengunjung membagikan cuplikan kisah makam ke WhatsApp.',
    section: 'ruang_baca_paywall',
  },

  // f) Halaman Panduan Yasin (/panduan), Doa (/doa), Rubrik (/rubrik), & Infaq (/donasi)
  {
    key: 'bacaanTitle',
    label: 'Judul Utama Halaman Yasin, Tahlil & Tasbih (/panduan)',
    description: 'Judul besar pada halaman Panduan Ibadah Lapangan (/panduan).',
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'bacaanSubtitle',
    label: 'Subjudul Halaman Bacaan Yasin & Tahlil (/panduan)',
    description: 'Kalimat pengantar di bagian atas halaman Amalan Peziarah (Yasin & Tahlil).',
    multiline: true,
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'tawassulTitle',
    label: 'Judul Kolom Niat & Khususan Al-Fatihah (/panduan)',
    description: 'Label pertanyaan pengantar niat Al-Fatihah di halaman Yasin.',
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'tawassulPlaceholder',
    label: 'Placeholder Kolom Nama Almarhum / Hajat (/panduan)',
    description: 'Teks contoh pada kolom ketik nama almarhum/almarhumah di halaman Yasin.',
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'postPrayerTitle',
    label: 'Judul Kartu Penutup Bacaan Yasin (/panduan)',
    description: 'Kalimat reflektif di bagian bawah setelah selesai membaca doa ziarah.',
    multiline: true,
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'postPrayerDescription',
    label: 'Deskripsi Kartu Penutup Bacaan Yasin (/panduan)',
    description: 'Sub-kalimat doa harapan setelah selesai membaca Yasin & Tahlil.',
    multiline: true,
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'doaKhususTitle',
    label: 'Judul Utama Halaman Wirid & Doa Khusus Wali (/doa)',
    description: 'Judul besar pada halaman Kumpulan Doa Khusus (/doa).',
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'doaKhususSubtitle',
    label: 'Subjudul Kumpulan Doa Ziarah (/doa)',
    description: 'Kalimat pengantar pada tab/halaman Kumpulan Doa & Adab Ziarah.',
    multiline: true,
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'rubrikTitle',
    label: 'Judul Utama Halaman Rubrik (/rubrik)',
    description: 'Headline utama di halaman Rubrik Kisah & Manuskrip.',
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'rubrikSubtitle',
    label: 'Subjudul Halaman Rubrik & Kisah (/rubrik)',
    description: 'Kalimat deskripsi di bagian atas halaman Rubrik Kisah Keteladanan.',
    multiline: true,
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'infaqTitle',
    label: 'Judul Utama Halaman Infaq & Jariyah (/donasi)',
    description: 'Headline utama pada halaman Infaq Digital.',
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'infaqSubtitle',
    label: 'Subjudul Halaman Infaq & Jariyah (/donasi)',
    description: 'Deskripsi singkat di bawah judul halaman Infaq Digital.',
    multiline: true,
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'infaqTransparencyNote',
    label: 'Catatan Transparansi & Manfaat Infaq (/donasi)',
    description: 'Penjelasan alokasi dana infaq (operasional server, riset naskah, dll.).',
    multiline: true,
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'munajatTitle',
    label: 'Judul Dinding Munajat & Doa Peziarah',
    description: 'Judul bagian daftar doa dan hajat para donatur/peziarah.',
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'munajatSubtitle',
    label: 'Subjudul Dinding Munajat & Doa',
    description: 'Kalimat pengantar di bawah judul Dinding Munajat.',
    multiline: true,
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'doaHajatPlaceholder',
    label: 'Placeholder Kolom Titip Doa & Hajat',
    description: 'Teks contoh di dalam kotak input doa/hajat peziarah.',
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
  {
    key: 'unlockSuccessMessage',
    label: 'Pesan Sukses Setelah Konfirmasi Infaq',
    description: 'Pesan syukur saat seluruh arsip cerita terbuka di perangkat peziarah.',
    multiline: true,
    section: 'halaman_panduan_doa_rubrik_infaq',
  },
];

export const SiteCopyAdminSection: React.FC<SiteCopyAdminSectionProps> = ({
  showBanner,
  externalSiteCopy,
}) => {
  const [formCopy, setFormCopy] = useState<SiteCopyConfig>(() => getCachedSiteCopy());
  const [copySearchQuery, setCopySearchQuery] = useState('');
  const [isSavingCopy, setIsSavingCopy] = useState(false);
  const [saveNotice, setSaveNotice] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchSiteCopyFromCloud().then((cloudCopy) => {
      if (mounted) {
        setFormCopy(cloudCopy);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (externalSiteCopy) {
      setFormCopy(externalSiteCopy);
    }
  }, [externalSiteCopy]);

  const handleFieldChange = (key: EditableStringCopyKey, value: string) => {
    setFormCopy((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleIntentLabelChange = (key: keyof SiteIntentLabels, value: string) => {
    setFormCopy((prev) => ({
      ...prev,
      intentLabels: {
        ...(prev.intentLabels || DEFAULT_SITE_COPY.intentLabels),
        [key]: value,
      },
    }));
  };

  const handleLockAmountChange = (key: 'barokahLockAmount' | 'rubrikLockAmount', value: string) => {
    const num = Number(value) || 0;
    setFormCopy((prev) => ({
      ...prev,
      [key]: num,
    }));
  };

  const handlePackageChange = (
    index: number,
    field: keyof QuickNominalPackage,
    value: string | number
  ) => {
    setFormCopy((prev) => {
      const nextPackages = [...prev.quickNominalPackages];
      nextPackages[index] = {
        ...nextPackages[index],
        [field]: field === 'amount' ? Number(value) || 0 : value,
      };
      return {
        ...prev,
        quickNominalPackages: nextPackages,
      };
    });
  };

  const handleAddPackage = () => {
    setFormCopy((prev) => ({
      ...prev,
      quickNominalPackages: [
        ...prev.quickNominalPackages,
        {
          amount: 75000,
          label: 'Rp 75rb',
          tag: 'Paket Baru',
          desc: 'Deskripsi manfaat paket infaq',
        },
      ],
    }));
  };

  const handleRemovePackage = (index: number) => {
    setFormCopy((prev) => ({
      ...prev,
      quickNominalPackages: prev.quickNominalPackages.filter((_, i) => i !== index),
    }));
  };

  const handleStorySlideChange = (
    index: number,
    field: keyof StoryReelSlide,
    value: string
  ) => {
    setFormCopy((prev) => {
      const baseSlides =
        Array.isArray(prev.storyReelSlides) && prev.storyReelSlides.length > 0
          ? [...prev.storyReelSlides]
          : [...DEFAULT_SITE_COPY.storyReelSlides];
      baseSlides[index] = {
        ...baseSlides[index],
        [field]: value,
      };
      return {
        ...prev,
        storyReelSlides: baseSlides,
      };
    });
  };

  const handleSaveAllCopy = async () => {
    setIsSavingCopy(true);
    setSaveNotice(null);
    try {
      const saved = await saveSiteCopyToCloud(formCopy);
      setFormCopy(saved);
      const msg =
        'Perubahan Teks, Harga Gembok & Pengaturan UI berhasil disimpan ke Firestore (settings/site_copy) dan langsung tampil di seluruh halaman publik!';
      setSaveNotice(msg);
      showBanner('success', msg);
    } catch (error) {
      console.error('Failed to save site_copy:', error);
      showBanner('error', 'Gagal menyimpan teks ke Cloud. Pastikan koneksi stabil.');
    } finally {
      setIsSavingCopy(false);
    }
  };

  const handleResetToDefault = async () => {
    setIsSavingCopy(true);
    setSaveNotice(null);
    try {
      const resetCopy = await saveSiteCopyToCloud(DEFAULT_SITE_COPY);
      setFormCopy(resetCopy);
      const msg = 'Seluruh teks berhasil dikembalikan ke Teks Standar Editorial.';
      setSaveNotice(msg);
      showBanner('success', msg);
    } catch (error) {
      console.error('Failed to reset site_copy:', error);
      showBanner('error', 'Gagal mereset teks ke standar.');
    } finally {
      setIsSavingCopy(false);
    }
  };

  const normalizedQuery = copySearchQuery.trim().toLowerCase();

  const filterFieldsBySection = (section: CopySubSectionId) =>
    COPY_FIELDS.filter((field) => {
      if (field.section !== section) return false;
      if (!normalizedQuery) return true;
      const currentValue = String(formCopy[field.key] || '').toLowerCase();
      return (
        field.label.toLowerCase().includes(normalizedQuery) ||
        field.description.toLowerCase().includes(normalizedQuery) ||
        field.key.toLowerCase().includes(normalizedQuery) ||
        currentValue.includes(normalizedQuery)
      );
    });

  const sections: {
    id: CopySubSectionId;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'harga_gembok',
      title: 'a) Pengaturan Harga Gembok Utama',
      subtitle: 'Atur nominal pembuka gembok Barokah & Doa Khusus (Default: Rp 5.000) serta Kisah Karomah & Khazanah (Default: Rp 10.000).',
      icon: <Lock className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'identitas_nav_footer',
      title: 'b) Identitas Brand, Navbar & Footer',
      subtitle: 'Nama brand, subjudul, label ke-4 menu navigasi, tombol CTA donasi, dan teks footer di seluruh halaman.',
      icon: <Compass className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'beranda_filter',
      title: 'c) Halaman Beranda & Filter',
      subtitle: 'Judul Hero, Subjudul Hero, Placeholder Pencarian, Banner Jumat, Label 5 Filter Suasana Hati, Label Tombol Kartu Makam, dan Judul Seksi FAQ.',
      icon: <Type className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'story_reel',
      title: 'd) Editor 5 Slide Story Reel (storyReelSlides)',
      subtitle: 'Ubah judul seksi serta stepLabel, shortTabTitle, title, narrative, arabicQuote, dan arabicSource untuk ke-5 slide di halaman depan.',
      icon: <Film className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'ruang_baca_paywall',
      title: 'e) Ruang Baca Makam & Kartu Gembok (SiteDetails)',
      subtitle: 'Judul seksi Karomah, Judul & Deskripsi Gembok Barokah Doa (Rp 5.000), Judul & Deskripsi Gembok Kisah/Wasiat (Rp 10.000), serta teks tombolnya.',
      icon: <BookOpen className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'halaman_panduan_doa_rubrik_infaq',
      title: 'f) Halaman Panduan Yasin (/panduan), Doa (/doa), Rubrik (/rubrik) & Infaq (/donasi)',
      subtitle: 'Seluruh judul halaman, subjudul, teks pengantar Niat Almarhum, kartu penutup bacaan, Dinding Munajat, serta editor daftar paket nominal.',
      icon: <Wallet className="w-5 h-5 text-emerald-700" />,
    },
  ];

  const showLockPricesInSearch =
    !normalizedQuery ||
    'harga gembok nominal barokahlockamount rubriklockamount 5000 10000 doa kisah'.includes(
      normalizedQuery
    );

  const showIntentLabelsInSearch =
    !normalizedQuery ||
    'filter suasana hati niat intentlabels keteduhan ikhtiar keteguhan ilmu'.includes(
      normalizedQuery
    ) ||
    Object.values(formCopy.intentLabels || DEFAULT_SITE_COPY.intentLabels).some((v) =>
      String(v).toLowerCase().includes(normalizedQuery)
    );

  const showPackagesInSearch =
    !normalizedQuery ||
    'paket nominal cepat infaq qris rupiah quicknominalpackages'.includes(normalizedQuery) ||
    formCopy.quickNominalPackages.some(
      (pkg) =>
        pkg.label.toLowerCase().includes(normalizedQuery) ||
        pkg.tag.toLowerCase().includes(normalizedQuery) ||
        pkg.desc.toLowerCase().includes(normalizedQuery) ||
        String(pkg.amount).includes(normalizedQuery)
    );

  const showStorySlidesInSearch =
    !normalizedQuery ||
    'story reel hikmah ziarah slide hadits muslim hakim storyreelslides'.includes(
      normalizedQuery
    ) ||
    (formCopy.storyReelSlides || DEFAULT_SITE_COPY.storyReelSlides).some(
      (s) =>
        s.title.toLowerCase().includes(normalizedQuery) ||
        s.shortTabTitle.toLowerCase().includes(normalizedQuery) ||
        s.narrative.toLowerCase().includes(normalizedQuery) ||
        (s.arabicQuote || '').toLowerCase().includes(normalizedQuery) ||
        (s.arabicSource || '').toLowerCase().includes(normalizedQuery)
    );

  return (
    <div className="space-y-6">
      {/* Top Action & Search Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Pusat Kendali 1 · Teks &amp; Pengaturan UI
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-900">
              Editor Penuh Teks, Harga Gembok &amp; Copywriting Situs
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Seluruh perubahan yang disimpan di sini langsung tersimpan ke <code className="bg-stone-100 px-1.5 py-0.5 rounded text-xs">settings/site_copy</code> dan diperbarui secara real-time di halaman publik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleResetToDefault}
              disabled={isSavingCopy}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reset ke Teks Standar
            </button>
            <button
              type="button"
              onClick={handleSaveAllCopy}
              disabled={isSavingCopy}
              className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isSavingCopy ? 'Menyimpan...' : 'Simpan Perubahan Teks & UI'}
            </button>
          </div>
        </div>

        {saveNotice && (
          <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-3 text-xs font-bold text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{saveNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setSaveNotice(null)}
              className="text-emerald-700 hover:underline shrink-0 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* Search Filter */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={copySearchQuery}
            onChange={(e) => setCopySearchQuery(e.target.value)}
            placeholder="Cari Pengaturan/Teks (misal: Harga Gembok, Navbar, Hero, Story Reel, Barokah, Yasin, Infaq)..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
          {copySearchQuery && (
            <button
              type="button"
              onClick={() => setCopySearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Sections a) to f) */}
      {sections.map((sec) => {
        const fields = filterFieldsBySection(sec.id);
        const includeLockPrices = sec.id === 'harga_gembok' && showLockPricesInSearch;
        const includeIntentLabels = sec.id === 'beranda_filter' && showIntentLabelsInSearch;
        const includeStorySlides = sec.id === 'story_reel' && showStorySlidesInSearch;
        const includePackages =
          sec.id === 'halaman_panduan_doa_rubrik_infaq' && showPackagesInSearch;

        if (
          fields.length === 0 &&
          !includeLockPrices &&
          !includeIntentLabels &&
          !includeStorySlides &&
          !includePackages
        ) {
          return null;
        }

        return (
          <div
            key={sec.id}
            className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm space-y-6"
          >
            <div className="flex items-start gap-3 pb-4 border-b border-stone-100">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                {sec.icon}
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">{sec.title}</h3>
                <p className="text-xs text-stone-500 mt-0.5">{sec.subtitle}</p>
              </div>
            </div>

            {/* a) Pengaturan Harga Gembok Utama */}
            {includeLockPrices && (
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    Nominal Gembok Barokah &amp; Doa Khusus (barokahLockAmount — Default: Rp 5.000)
                  </label>
                  <p className="text-[11px] text-stone-600 mb-2">
                    Nominal infaq pembuka amalan &amp; doa khusus di setiap detail makam serta halaman /doa.
                  </p>
                  <input
                    type="number"
                    step={1000}
                    min={1000}
                    value={formCopy.barokahLockAmount || 5000}
                    onChange={(e) => handleLockAmountChange('barokahLockAmount', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl text-sm font-mono font-bold text-emerald-950 tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-900 mb-1">
                    Nominal Gembok Kisah Karomah &amp; Khazanah (rubrikLockAmount — Default: Rp 10.000)
                  </label>
                  <p className="text-[11px] text-stone-600 mb-2">
                    Nominal infaq pembuka lanjutan kisah karomah, wasiat rahasia, dan artikel di halaman /rubrik.
                  </p>
                  <input
                    type="number"
                    step={1000}
                    min={1000}
                    value={formCopy.rubrikLockAmount || 10000}
                    onChange={(e) => handleLockAmountChange('rubrikLockAmount', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-emerald-300 rounded-xl text-sm font-mono font-bold text-emerald-950 tabular-nums"
                  />
                </div>
              </div>
            )}

            {/* c) Label 5 Filter Suasana Hati */}
            {includeIntentLabels && (
              <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    Label 5 Filter Suasana Hati / Niat Ziarah (intentLabels)
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Label 5 tombol filter niat peziarah di Beranda Direktori Makam.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                  {(
                    [
                      ['all', 'Semua Riwayat'],
                      ['keteduhan', 'Penawar Hati'],
                      ['ikhtiar', 'Ikhtiar & Rezeki'],
                      ['keteguhan', 'Keteguhan Uji'],
                      ['ilmu', 'Sanad Keilmuan'],
                    ] as Array<[keyof SiteIntentLabels, string]>
                  ).map(([k, label]) => (
                    <div key={k}>
                      <label className="block text-[11px] font-bold text-stone-600 mb-1">
                        {label} ({k})
                      </label>
                      <input
                        type="text"
                        value={
                          (formCopy.intentLabels && formCopy.intentLabels[k]) ||
                          DEFAULT_SITE_COPY.intentLabels[k]
                        }
                        onChange={(e) => handleIntentLabelChange(k, e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Standard String Fields */}
            {fields.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {fields.map((field) => {
                  const val = formCopy[field.key] || '';
                  return (
                    <div
                      key={field.key}
                      className={field.multiline ? 'md:col-span-2' : 'col-span-1'}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <label className="block text-xs font-bold text-stone-800">
                          {field.label}
                        </label>
                        <span className="text-[11px] font-mono text-stone-400">{field.key}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mb-2">{field.description}</p>
                      {field.multiline ? (
                        <textarea
                          rows={2}
                          value={val}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                        />
                      ) : (
                        <input
                          type="text"
                          value={val}
                          onChange={(e) => handleFieldChange(field.key, e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* d) Dynamic 5-Slide Story Reel Editor */}
            {includeStorySlides && (
              <div className="pt-4 border-t border-stone-200/80 space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Daftar 5 Slide &ldquo;Story Reel Hikmah Ziarah&rdquo; (storyReelSlides)
                  </h4>
                  <p className="text-xs text-stone-500">
                    Edit stepLabel, shortTabTitle, title, narrative, arabicQuote, dan arabicSource untuk masing-masing dari 5 slide di halaman depan.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {(formCopy.storyReelSlides || DEFAULT_SITE_COPY.storyReelSlides).map(
                    (slide, idx) => (
                      <div
                        key={slide.id || idx}
                        className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
                      >
                        <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
                          <span className="text-xs font-bold text-emerald-900">
                            Slide #{idx + 1} — {slide.shortTabTitle}
                          </span>
                          <span className="text-[11px] font-mono text-stone-400">
                            id: {slide.id}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Label Tahapan Atas (stepLabel)
                            </label>
                            <input
                              type="text"
                              value={slide.stepLabel}
                              onChange={(e) =>
                                handleStorySlideChange(idx, 'stepLabel', e.target.value)
                              }
                              className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Judul Kartu Samping / Tab (shortTabTitle)
                            </label>
                            <input
                              type="text"
                              value={slide.shortTabTitle}
                              onChange={(e) =>
                                handleStorySlideChange(idx, 'shortTabTitle', e.target.value)
                              }
                              className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Judul Utama Slide (title)
                            </label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) =>
                                handleStorySlideChange(idx, 'title', e.target.value)
                              }
                              className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-900"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Narasi Utama Slide (narrative)
                            </label>
                            <textarea
                              rows={2}
                              value={slide.narrative}
                              onChange={(e) =>
                                handleStorySlideChange(idx, 'narrative', e.target.value)
                              }
                              className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Teks Kaligrafi Hadits Arab (arabicQuote — Opsional)
                            </label>
                            <input
                              type="text"
                              dir="rtl"
                              value={slide.arabicQuote || ''}
                              onChange={(e) =>
                                handleStorySlideChange(idx, 'arabicQuote', e.target.value)
                              }
                              placeholder="Kosongkan jika tidak ada kutipan Arab"
                              className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-sm font-arabic text-stone-900"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-stone-600 mb-1">
                              Terjemahan &amp; Perawi Hadits (arabicSource — Opsional)
                            </label>
                            <input
                              type="text"
                              value={slide.arabicSource || ''}
                              onChange={(e) =>
                                handleStorySlideChange(idx, 'arabicSource', e.target.value)
                              }
                              placeholder="Contoh: Artinya: ... (HR. Muslim)"
                              className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* f) Dynamic Quick Nominal Packages Editor */}
            {includePackages && (
              <div className="pt-4 border-t border-stone-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      Daftar Paket Pilihan Nominal Cepat Infaq (quickNominalPackages)
                    </h4>
                    <p className="text-xs text-stone-500">
                      Atur nominal angka Rupiah, teks label singkat, tag kategori, dan deskripsi manfaat pada halaman Infaq Digital (/donasi).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddPackage}
                    className="px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors flex items-center gap-1.5 self-start cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Tambah Paket Nominal
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formCopy.quickNominalPackages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-700">
                          Paket Nominal #{idx + 1}
                        </span>
                        {formCopy.quickNominalPackages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePackage(idx)}
                            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Hapus
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 mb-1">
                            Nominal Angka (Rp)
                          </label>
                          <input
                            type="number"
                            step={1000}
                            value={pkg.amount}
                            onChange={(e) => handlePackageChange(idx, 'amount', e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-mono font-bold text-stone-900 tabular-nums"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 mb-1">
                            Label Tombol (mis. Rp 50rb)
                          </label>
                          <input
                            type="text"
                            value={pkg.label}
                            onChange={(e) => handlePackageChange(idx, 'label', e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 mb-1">
                            Tag Kategori (mis. Jariyah Utama)
                          </label>
                          <input
                            type="text"
                            value={pkg.tag}
                            onChange={(e) => handlePackageChange(idx, 'tag', e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-600 mb-1">
                            Deskripsi Singkat
                          </label>
                          <input
                            type="text"
                            value={pkg.desc}
                            onChange={(e) => handlePackageChange(idx, 'desc', e.target.value)}
                            className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs text-stone-800"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom Save Bar */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSaveAllCopy}
          disabled={isSavingCopy}
          className="px-6 py-3.5 rounded-2xl bg-emerald-800 text-white text-sm font-bold hover:bg-emerald-900 transition-colors flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {isSavingCopy ? 'Menyimpan ke Cloud...' : 'Simpan Perubahan Teks & UI'}
        </button>
      </div>
    </div>
  );
};
