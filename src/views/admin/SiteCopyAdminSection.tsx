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
} from 'lucide-react';
import {
  SiteCopyConfig,
  DEFAULT_SITE_COPY,
  getCachedSiteCopy,
  fetchSiteCopyFromCloud,
  saveSiteCopyToCloud,
  QuickNominalPackage,
} from '../../lib/siteCopy';

interface SiteCopyAdminSectionProps {
  showBanner: (type: 'success' | 'error', text: string) => void;
  externalSiteCopy?: SiteCopyConfig | null;
}

type EditableStringCopyKey = Exclude<
  keyof SiteCopyConfig,
  'quickNominalPackages' | 'updatedAt'
>;

interface CopyFieldDef {
  key: EditableStringCopyKey;
  label: string;
  description: string;
  multiline?: boolean;
  section: 'beranda' | 'ruang_baca' | 'infaq' | 'doa';
}

const COPY_FIELDS: CopyFieldDef[] = [
  // 1. Beranda & Filter
  {
    key: 'heroTitle',
    label: 'Judul Utama Beranda (Hero Title)',
    description: 'Judul besar paling atas di halaman Beranda Direktori Makam.',
    section: 'beranda',
  },
  {
    key: 'heroSubtitle',
    label: 'Teks Pengantar Beranda (Subjudul Hero)',
    description: 'Kalimat pembuka di bawah judul utama beranda direktori makam.',
    multiline: true,
    section: 'beranda',
  },
  {
    key: 'jumatBannerTitle',
    label: 'Judul Sapaan Malam / Hari Jumat',
    description: 'Sapaan pembuka pada baris pengantar Kamis malam & hari Jumat.',
    section: 'beranda',
  },
  {
    key: 'jumatBannerSubtitle',
    label: 'Kalimat Renungan Malam / Hari Jumat',
    description: 'Kalimat renungan singkat pada baris pengantar Jumat di Beranda.',
    multiline: true,
    section: 'beranda',
  },
  {
    key: 'searchPlaceholder',
    label: 'Placeholder Kolom Pencarian Makam',
    description: 'Teks petunjuk di dalam kotak pencarian utama di Beranda.',
    section: 'beranda',
  },
  {
    key: 'tabLabelAll',
    label: 'Label Tab Filter: Semua',
    description: 'Teks tombol filter pertama di Beranda.',
    section: 'beranda',
  },
  {
    key: 'tabLabelWaliSongo',
    label: 'Label Tab Filter: Wali Songo',
    description: 'Teks tombol filter kategori Wali Songo.',
    section: 'beranda',
  },
  {
    key: 'tabLabelUlama',
    label: 'Label Tab Filter: Ulama & Auliya',
    description: 'Teks tombol filter kategori Ulama Nusantara.',
    section: 'beranda',
  },
  {
    key: 'tabLabelRaja',
    label: 'Label Tab Filter: Sultan & Raja',
    description: 'Teks tombol filter kategori Tokoh Kerajaan/Bangsa.',
    section: 'beranda',
  },
  {
    key: 'cardPrimaryCta',
    label: 'Teks Tombol Utama Kartu Makam',
    description: 'Teks tombol aksi utama pada setiap kartu makam di Beranda.',
    section: 'beranda',
  },
  {
    key: 'cardSecondaryMapCta',
    label: 'Teks Tautan Peta Rute Kartu Makam',
    description: 'Teks tautan sekunder menuju Peta Rute pada setiap kartu makam.',
    section: 'beranda',
  },

  // 2. Ruang Baca & Gembok Cerita
  {
    key: 'readerTabMainStory',
    label: 'Judul Tab 1 di Ruang Baca Makam',
    description: 'Label tab pertama pada modal/drawer cerita makam.',
    section: 'ruang_baca',
  },
  {
    key: 'readerTabPrayerGuide',
    label: 'Judul Tab 2 di Ruang Baca Makam',
    description: 'Label tab kedua (Panduan Ziarah & Doa) pada ruang baca makam.',
    section: 'ruang_baca',
  },
  {
    key: 'paywallBadge',
    label: 'Label Kecil Gembok Khazanah',
    description: 'Label status di atas judul gembok cerita (mis. Arsip Khazanah Terkunci).',
    section: 'ruang_baca',
  },
  {
    key: 'paywallTitle',
    label: 'Judul Kotak Gembok Wasiat / Karomah',
    description: 'Judul kartu pengunci lanjutan kisah karomah atau wasiat di detail makam.',
    section: 'ruang_baca',
  },
  {
    key: 'paywallSubtitle',
    label: 'Kalimat Ajakan Kotak Gembok Cerita',
    description: 'Subjudul penjelas di bawah judul gembok cerita makam.',
    multiline: true,
    section: 'ruang_baca',
  },
  {
    key: 'paywallPrimaryButton',
    label: 'Teks Tombol Utama Pembuka Gembok',
    description: 'Teks tombol CTA pada kartu pengunci cerita makam.',
    section: 'ruang_baca',
  },
  {
    key: 'rubrikHeaderSubtitle',
    label: 'Subjudul Halaman Rubrik & Kisah',
    description: 'Kalimat deskripsi di bagian atas halaman Rubrik Kisah Keteladanan.',
    multiline: true,
    section: 'ruang_baca',
  },

  // 3. Infaq, Paket Nominal & Munajat
  {
    key: 'infaqHeadline',
    label: 'Judul Utama Halaman Infaq & Jariyah',
    description: 'Headline utama pada halaman Infaq Digital.',
    section: 'infaq',
  },
  {
    key: 'infaqSubheadline',
    label: 'Subjudul Halaman Infaq & Jariyah',
    description: 'Deskripsi singkat di bawah judul halaman Infaq Digital.',
    multiline: true,
    section: 'infaq',
  },
  {
    key: 'infaqTransparencyNote',
    label: 'Catatan Transparansi & Manfaat Infaq',
    description: 'Penjelasan alokasi dana infaq (operasional server, riset naskah, dll.).',
    multiline: true,
    section: 'infaq',
  },
  {
    key: 'munajatHeaderTitle',
    label: 'Judul Dinding Munajat & Doa Peziarah',
    description: 'Judul bagian daftar doa dan hajat para donatur/peziarah.',
    section: 'infaq',
  },
  {
    key: 'munajatHeaderSubtitle',
    label: 'Subjudul Dinding Munajat & Doa',
    description: 'Kalimat pengantar di bawah judul Dinding Munajat.',
    multiline: true,
    section: 'infaq',
  },
  {
    key: 'doaHajatPlaceholder',
    label: 'Placeholder Kolom Titip Doa & Hajat',
    description: 'Teks contoh di dalam kotak input doa/hajat peziarah.',
    section: 'infaq',
  },
  {
    key: 'unlockSuccessMessage',
    label: 'Pesan Sukses Setelah Konfirmasi Infaq',
    description: 'Pesan syukur saat seluruh arsip cerita terbuka di perangkat peziarah.',
    multiline: true,
    section: 'infaq',
  },

  // 4. Halaman Yasin & Doa
  {
    key: 'bacaanTitle',
    label: 'Judul Utama Halaman Yasin, Tahlil & Tasbih',
    description: 'Judul besar pada halaman Panduan Ibadah Lapangan (/panduan).',
    section: 'doa',
  },
  {
    key: 'yasinHeaderSubtitle',
    label: 'Subjudul Halaman Bacaan Yasin & Tahlil',
    description: 'Kalimat pengantar di bagian atas halaman Amalan Peziarah (Yasin & Tahlil).',
    multiline: true,
    section: 'doa',
  },
  {
    key: 'tawassulTitle',
    label: 'Judul Kolom Niat & Khususan Al-Fatihah',
    description: 'Label pertanyaan pengantar niat Al-Fatihah di halaman Yasin.',
    section: 'doa',
  },
  {
    key: 'tawassulPlaceholder',
    label: 'Placeholder Kolom Nama Almarhum / Hajat',
    description: 'Teks contoh pada kolom ketik nama almarhum/almarhumah di halaman Yasin.',
    section: 'doa',
  },
  {
    key: 'postPrayerTitle',
    label: 'Kalimat Renungan Penutup Halaman Yasin',
    description: 'Kalimat reflektif di bagian bawah setelah selesai membaca doa ziarah.',
    multiline: true,
    section: 'doa',
  },
  {
    key: 'doaKhususTitle',
    label: 'Judul Utama Halaman Wirid & Doa Khusus Wali',
    description: 'Judul besar pada halaman Kumpulan Doa Khusus (/doa).',
    section: 'doa',
  },
  {
    key: 'doaHeaderSubtitle',
    label: 'Subjudul Kumpulan Doa Ziarah',
    description: 'Kalimat pengantar pada tab/halaman Kumpulan Doa & Adab Ziarah.',
    multiline: true,
    section: 'doa',
  },
];

export const SiteCopyAdminSection: React.FC<SiteCopyAdminSectionProps> = ({
  showBanner,
  externalSiteCopy,
}) => {
  const [formCopy, setFormCopy] = useState<SiteCopyConfig>(() => getCachedSiteCopy());
  const [copySearchQuery, setCopySearchQuery] = useState('');
  const [isSavingCopy, setIsSavingCopy] = useState(false);

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

  const handleFieldChange = (
    key: EditableStringCopyKey,
    value: string
  ) => {
    setFormCopy((prev) => ({
      ...prev,
      [key]: value,
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

  const handleSaveAllCopy = async () => {
    setIsSavingCopy(true);
    try {
      const saved = await saveSiteCopyToCloud(formCopy);
      setFormCopy(saved);
      showBanner(
        'success',
        'Seluruh teks & copywriting situs berhasil disimpan ke Cloud dan langsung aktif di semua perangkat!'
      );
    } catch (error) {
      console.error('Failed to save site_copy:', error);
      showBanner('error', 'Gagal menyimpan teks ke Cloud. Pastikan koneksi stabil.');
    } finally {
      setIsSavingCopy(false);
    }
  };

  const handleResetToDefault = async () => {
    setIsSavingCopy(true);
    try {
      const resetCopy = await saveSiteCopyToCloud(DEFAULT_SITE_COPY);
      setFormCopy(resetCopy);
      showBanner('success', 'Seluruh teks berhasil dikembalikan ke Teks Standar Editorial.');
    } catch (error) {
      console.error('Failed to reset site_copy:', error);
      showBanner('error', 'Gagal mereset teks ke standar.');
    } finally {
      setIsSavingCopy(false);
    }
  };

  const normalizedQuery = copySearchQuery.trim().toLowerCase();

  const filterFieldsBySection = (section: CopyFieldDef['section']) =>
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
    id: CopyFieldDef['section'];
    title: string;
    subtitle: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'beranda',
      title: '1. Beranda & Filter Direktori',
      subtitle: 'Teks sambutan beranda, placeholder pencarian, tab kategori, dan tombol kartu makam.',
      icon: <Compass className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'ruang_baca',
      title: '2. Ruang Baca & Gembok Cerita',
      subtitle: 'Label tab modal makam, judul/subjudul gembok karomah & wasiat, dan halaman Rubrik.',
      icon: <BookOpen className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'infaq',
      title: '3. Infaq, Paket Nominal & Munajat',
      subtitle: 'Headline infaq jariyah, catatan transparansi, dinding munajat, dan tombol nominal cepat.',
      icon: <Wallet className="w-5 h-5 text-emerald-700" />,
    },
    {
      id: 'doa',
      title: '4. Halaman Yasin, Tahlil & Doa',
      subtitle: 'Teks pengantar pada halaman Amalan Peziarah (Yasin, Tahlil & Kumpulan Doa).',
      icon: <Type className="w-5 h-5 text-emerald-700" />,
    },
  ];

  const showPackagesInSearch =
    !normalizedQuery ||
    'paket nominal cepat infaq qris rupiah'.includes(normalizedQuery) ||
    formCopy.quickNominalPackages.some(
      (pkg) =>
        pkg.label.toLowerCase().includes(normalizedQuery) ||
        pkg.tag.toLowerCase().includes(normalizedQuery) ||
        pkg.desc.toLowerCase().includes(normalizedQuery) ||
        String(pkg.amount).includes(normalizedQuery)
    );

  return (
    <div className="space-y-6">
      {/* Top Action & Search Header */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" /> Headless UI Copywriting CMS
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-stone-900">
              Pusat Kendali Teks & Copywriting Situs
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Ubah kalimat pengantar, label tombol, pesan gembok cerita, hingga pilihan paket nominal infaq secara langsung tanpa menyentuh kode.
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
              {isSavingCopy ? 'Menyimpan...' : 'Simpan Seluruh Teks ke Cloud'}
            </button>
          </div>
        </div>

        {/* Search Filter */}
        <div className="mt-5 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={copySearchQuery}
            onChange={(e) => setCopySearchQuery(e.target.value)}
            placeholder="Cari Teks / Label (misal: Beranda, Gembok, Wali Songo, Infaq, Yasin)..."
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white"
          />
          {copySearchQuery && (
            <button
              type="button"
              onClick={() => setCopySearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Sections */}
      {sections.map((sec) => {
        const fields = filterFieldsBySection(sec.id);
        const includePackages = sec.id === 'infaq' && showPackagesInSearch;
        if (fields.length === 0 && !includePackages) return null;

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

            {/* Dynamic Quick Nominal Packages Editor inside Section 3 ('infaq') */}
            {includePackages && (
              <div className="pt-4 border-t border-stone-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      Daftar Paket Pilihan Nominal Cepat Infaq (quickNominalPackages)
                    </h4>
                    <p className="text-xs text-stone-500">
                      Atur nominal angka Rupiah, teks label singkat, tag badge, dan deskripsi manfaat pada halaman Infaq Digital.
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
                            className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-bold text-stone-900"
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

      {/* Bottom Sticky Save Bar */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSaveAllCopy}
          disabled={isSavingCopy}
          className="px-6 py-3.5 rounded-2xl bg-emerald-800 text-white text-sm font-bold hover:bg-emerald-900 transition-colors flex items-center gap-2 shadow-md disabled:opacity-50 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {isSavingCopy ? 'Menyimpan ke Cloud...' : 'Simpan Seluruh Teks ke Cloud'}
        </button>
      </div>
    </div>
  );
};
