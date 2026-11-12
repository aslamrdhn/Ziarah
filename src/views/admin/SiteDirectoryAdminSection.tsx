import React, { useState, useRef } from 'react';
import {
  MapPin,
  Search,
  Plus,
  Edit3,
  Trash2,
  XCircle,
  Loader2,
  CheckCircle2,
  BookOpen,
  ScrollText,
  Download,
  ShieldCheck,
  Database,
} from 'lucide-react';
import type { ZiarahSite } from '../../data/sites';
import { ALL_PROVINCES } from '../../data/initialSites';
import { optimizeSiteImageUrl, handleOptimizedImageError } from '../../lib/imageOptimizer';
import { extractCoordinatesFromMapsUrl } from '../AdminKurator';

export interface SiteDirectoryAdminSectionProps {
  sites: ZiarahSite[];
  localSitesCount?: number;
  isSeededInCloud?: boolean;
  cloudSiteCount?: number;
  isSeeding?: boolean;
  seedMessage?: string;
  isSiteFormOpen?: boolean;
  editingSite: Partial<ZiarahSite> | null;
  isSavingSite?: boolean;
  siteStatusMsg?: string;
  onSeedDatabase?: () => void;
  onToggleNewSiteForm?: () => void;
  onChangeEditingSite: (site: Partial<ZiarahSite>) => void;
  onSaveSite: (e: React.FormEvent) => void;
  onCancelSiteForm?: () => void;
  onSelectEditSite?: (site: ZiarahSite) => void;
  onDeleteSite: (siteId: string, siteTitle?: string) => void;
}

export const SiteDirectoryAdminSection: React.FC<SiteDirectoryAdminSectionProps> = ({
  sites,
  localSitesCount,
  isSeededInCloud,
  cloudSiteCount,
  isSeeding,
  seedMessage,
  isSiteFormOpen = false,
  editingSite,
  isSavingSite = false,
  siteStatusMsg,
  onSeedDatabase,
  onToggleNewSiteForm,
  onChangeEditingSite,
  onSaveSite,
  onCancelSiteForm,
  onSelectEditSite,
  onDeleteSite,
}) => {
  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState('Semua');
  const [adminProvinceFilter, setAdminProvinceFilter] = useState('Semua Provinsi');
  const siteEditFormRef = useRef<HTMLDivElement | null>(null);

  const filteredAdminSites = sites.filter((site) => {
    const q = adminSearchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      (site.title || '').toLowerCase().includes(q) ||
      (site.name || '').toLowerCase().includes(q) ||
      (site.id || '').toLowerCase().includes(q) ||
      (site.location?.city || '').toLowerCase().includes(q) ||
      (site.location?.province || '').toLowerCase().includes(q);
    const matchesCat = adminCategoryFilter === 'Semua' || site.category === adminCategoryFilter;
    const siteProvince = site.province || site.location?.province || '';
    const matchesProv =
      !adminProvinceFilter ||
      adminProvinceFilter === 'Semua Provinsi' ||
      adminProvinceFilter === 'Semua' ||
      siteProvince.toLowerCase() === adminProvinceFilter.toLowerCase();
    return matchesSearch && matchesCat && matchesProv;
  });

  const handleExportCatalogJson = () => {
    const blob = new Blob([JSON.stringify(sites, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ziarah-nusantara-katalog-lengkap-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const setEditing = (next: Partial<ZiarahSite>) => {
    onChangeEditingSite(next);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden mb-8">
      <div className="p-6 border-b border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-serif font-bold text-stone-800 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-emerald-700" />
            <span>Kelola &amp; Edit Katalog Makam ({sites.length} Lokasi Terdaftar)</span>
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            CMS Penuh: Tambah makam baru atau edit seluruh field sejarah, karomah, wasiat rahasia, wasilah hajat, dan doa khusus di 34 provinsi. Perubahan langsung tersimpan ke Cloud Firestore (<code>sites/&#123;id&#125;</code>).
            {typeof cloudSiteCount === 'number' && typeof localSitesCount === 'number' && (
              <span className="ml-1 font-semibold text-emerald-800">
                (Cloud: {cloudSiteCount} dokumen • Statis: {localSitesCount} makam)
              </span>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {onSeedDatabase && (
            <button
              type="button"
              onClick={onSeedDatabase}
              disabled={isSeeding}
              className="px-3.5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl font-bold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              {isSeeding ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
              ) : (
                <Database className="w-4 h-4 text-emerald-700" />
              )}
              <span>{isSeededInCloud ? 'Sinkronkan Ulang Katalog Statis ke Cloud' : 'Seed Katalog ke Cloud'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleExportCatalogJson}
            className="px-4 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl font-bold text-xs transition-colors flex items-center space-x-2 shadow-2xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-emerald-700" />
            <span>Unduh JSON Katalog Lengkap</span>
          </button>
          <button
            type="button"
            onClick={() => {
              if (onToggleNewSiteForm) {
                onToggleNewSiteForm();
              } else {
                setEditing({
                  id: '',
                  name: '',
                  title: '',
                  description: '',
                  summary: '',
                  category: 'Ulama Nusantara',
                  era: 'Abad ke-19 M',
                  sanad: '',
                  address: '',
                  district: '',
                  city: '',
                  province: 'Jawa Timur',
                  location: { lat: -7.25, lng: 112.75, address: '', district: '', city: '', province: 'Jawa Timur' },
                  googleMapsUrl: '',
                  imageUrl: '',
                  imageSource: 'Dokumentasi Peziarah / Wikimedia Commons',
                  history: '',
                  karomah: [''],
                  untoldStory: '',
                  barokahHajat: '',
                  doaKhusus: [{ title: '', text: '', arab: '', latin: '', translation: '', terjemahan: '', kaifiyah: '' }],
                  karya: [],
                  facilities: ['Masjid / Musholla', 'Tempat Wudhu', 'Area Parkir'],
                  openingHours: 'Buka 24 Jam',
                  haulSchedule: '',
                  localAdab: '',
                  references: ['Catatan Sejarah & Tradisi Lisan Masyarakat Setempat'],
                  verifiedBy: 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara',
                  lastVerified: new Date().toISOString().slice(0, 10),
                });
              }
              setTimeout(() => {
                siteEditFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 80);
            }}
            className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center space-x-2 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Makam Baru</span>
          </button>
        </div>
      </div>

      {(siteStatusMsg || seedMessage) && (
        <div className="px-6 py-3 bg-emerald-50 border-b border-emerald-200 text-xs font-bold text-emerald-900 flex items-center justify-between">
          <span>{siteStatusMsg || seedMessage}</span>
        </div>
      )}

      {/* Form Edit / Tambah Situs Lengkap (Full-CMS) */}
      {isSiteFormOpen && editingSite && (
        <div ref={siteEditFormRef} className="p-6 bg-stone-50 border-b border-stone-200 scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-stone-800 text-base flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-emerald-700" />
              <span>
                {!editingSite.id
                  ? 'Tambah Lokasi Makam Baru ke Cloud'
                  : `Edit Katalog Lengkap Makam: ${editingSite.title || editingSite.name}`}
              </span>
            </h3>
            {onCancelSiteForm && (
              <button
                type="button"
                onClick={onCancelSiteForm}
                className="text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>

          <form onSubmit={onSaveSite} className="space-y-6">
            {/* SEKSI 1: IDENTITAS & LOKASI */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>1. Identitas Tokoh, Alamat &amp; Koordinat Peta</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ID / Slug Makam (`id`)
                  </label>
                  <input
                    type="text"
                    value={editingSite.id || ''}
                    onChange={(e) => setEditing({ ...editingSite, id: e.target.value })}
                    placeholder="Contoh: sunan-ampel"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Nama Lengkap Tokoh (`name`) *</label>
                  <input
                    type="text"
                    required
                    value={editingSite.name || ''}
                    onChange={(e) => setEditing({ ...editingSite, name: e.target.value })}
                    placeholder="Contoh: Raden Umar Said (Sunan Muria)"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Gelar / Sebutan Populer (`title`) *</label>
                  <input
                    type="text"
                    required
                    value={editingSite.title || ''}
                    onChange={(e) => setEditing({ ...editingSite, title: e.target.value })}
                    placeholder="Contoh: Sunan Muria"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Kategori Tokoh (`category`) *</label>
                  <select
                    value={editingSite.category || 'Ulama Nusantara'}
                    onChange={(e) => setEditing({ ...editingSite, category: e.target.value as ZiarahSite['category'] })}
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  >
                    <option value="Walisongo">Walisongo</option>
                    <option value="Ulama Nusantara">Ulama Nusantara</option>
                    <option value="Habaib">Habaib</option>
                    <option value="Auliya Nusantara">Auliya Nusantara</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Provinsi (`province`) *</label>
                  <input
                    type="text"
                    required
                    value={editingSite.province || editingSite.location?.province || ''}
                    onChange={(e) =>
                      setEditing({
                        ...editingSite,
                        province: e.target.value,
                        location: {
                          ...(editingSite.location || { lat: -6.95, lng: 110.42, address: '', city: '', province: '' }),
                          province: e.target.value,
                        },
                      })
                    }
                    placeholder="Contoh: Jawa Tengah"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Kota / Kabupaten (`city`) *</label>
                  <input
                    type="text"
                    required
                    value={editingSite.city || editingSite.location?.city || ''}
                    onChange={(e) =>
                      setEditing({
                        ...editingSite,
                        city: e.target.value,
                        location: {
                          ...(editingSite.location || { lat: -6.95, lng: 110.42, address: '', city: '', province: '' }),
                          city: e.target.value,
                        },
                      })
                    }
                    placeholder="Contoh: Kudus"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Kecamatan (`district`)</label>
                  <input
                    type="text"
                    value={editingSite.district || editingSite.location?.district || ''}
                    onChange={(e) =>
                      setEditing({
                        ...editingSite,
                        district: e.target.value,
                        location: {
                          ...(editingSite.location || { lat: -6.95, lng: 110.42, address: '', city: '', province: '' }),
                          district: e.target.value,
                        },
                      })
                    }
                    placeholder="Contoh: Kec. Dawe"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Era Sejarah (`era`)</label>
                  <input
                    type="text"
                    value={editingSite.era || ''}
                    onChange={(e) => setEditing({ ...editingSite, era: e.target.value })}
                    placeholder="Contoh: Abad ke-16 M"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-stone-700 mb-1">Alamat Lengkap (`address`) *</label>
                  <input
                    type="text"
                    required
                    value={editingSite.address || editingSite.location?.address || ''}
                    onChange={(e) =>
                      setEditing({
                        ...editingSite,
                        address: e.target.value,
                        location: {
                          ...(editingSite.location || { lat: -6.95, lng: 110.42, address: '', city: '', province: '' }),
                          address: e.target.value,
                        },
                      })
                    }
                    placeholder="Jl. Menara No. 1, Desa Colo, Kec. Dawe"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Latitude (`location.lat`)</label>
                  <input
                    type="number"
                    step="any"
                    value={editingSite.location?.lat ?? -6.95}
                    onChange={(e) =>
                      setEditing({
                        ...editingSite,
                        location: {
                          ...(editingSite.location || { lat: -6.95, lng: 110.42, address: '', city: '', province: '' }),
                          lat: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Longitude (`location.lng`)</label>
                  <input
                    type="number"
                    step="any"
                    value={editingSite.location?.lng ?? 110.42}
                    onChange={(e) =>
                      setEditing({
                        ...editingSite,
                        location: {
                          ...(editingSite.location || { lat: -6.95, lng: 110.42, address: '', city: '', province: '' }),
                          lng: parseFloat(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tautan Google Maps (`googleMapsUrl` - Otomatis Ekstrak Lat/Lng)
                  </label>
                  <input
                    type="text"
                    value={editingSite.googleMapsUrl || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const extracted = extractCoordinatesFromMapsUrl(val);
                      setEditing({
                        ...editingSite,
                        googleMapsUrl: val,
                        ...(extracted
                          ? {
                              location: {
                                ...(editingSite.location || {
                                  lat: extracted.lat,
                                  lng: extracted.lng,
                                  address: '',
                                  city: '',
                                  province: '',
                                }),
                                lat: extracted.lat,
                                lng: extracted.lng,
                              },
                            }
                          : {}),
                      });
                    }}
                    placeholder="https://www.google.com/maps/@-6.6663,110.9012,17z"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">URL Foto Makam (`imageUrl`)</label>
                  <input
                    type="text"
                    value={editingSite.imageUrl || ''}
                    onChange={(e) => setEditing({ ...editingSite, imageUrl: e.target.value })}
                    placeholder="https://upload.wikimedia.org/..."
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Kredit Sumber Foto (`imageSource`)
                  </label>
                  <input
                    type="text"
                    value={editingSite.imageSource || ''}
                    onChange={(e) => setEditing({ ...editingSite, imageSource: e.target.value })}
                    placeholder="Wikimedia Commons / Dokumentasi Ziarah Nusantara"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
              </div>
            </div>

            {/* SEKSI 2: RINGKASAN, SEJARAH, SANAD & LOGISTIK ZIARAH */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/80 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>2. Ringkasan (`summary`/`description`), Biografi Sejarah (`history`), Jadwal Haul &amp; Adab Lokal</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Ringkasan Singkat (`summary` / `description` - Tampil di Kartu Direktori) *
                </label>
                <input
                  type="text"
                  required
                  value={editingSite.description ?? editingSite.summary ?? ''}
                  onChange={(e) =>
                    setEditing({
                      ...editingSite,
                      description: e.target.value,
                      summary: e.target.value,
                    })
                  }
                  placeholder="Satu kalimat ringkas tentang ketokohan dan lokasi makam..."
                  className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Riwayat Sejarah &amp; Perjuangan Dakwah Lengkap (`history` - Minimal 3 Paragraf) *
                </label>
                <textarea
                  rows={5}
                  required
                  value={editingSite.history || ''}
                  onChange={(e) => setEditing({ ...editingSite, history: e.target.value })}
                  placeholder="Tuliskan biografi sejarah, masa dakwah, dan perjalanan keilmuan beliau..."
                  className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Jaringan Sanad Guru &amp; Murid (`sanad`)
                  </label>
                  <input
                    type="text"
                    value={editingSite.sanad || ''}
                    onChange={(e) => setEditing({ ...editingSite, sanad: e.target.value })}
                    placeholder="Contoh: Murid Sunan Ampel; Guru dari Sunan Kalijaga"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Jadwal Haul Tahunan (`haulSchedule`)
                  </label>
                  <input
                    type="text"
                    value={editingSite.haulSchedule || ''}
                    onChange={(e) => setEditing({ ...editingSite, haulSchedule: e.target.value })}
                    placeholder="Contoh: Setiap 15 Muharram di Kompleks Masjid Colo Kudus"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Adab Khusus Peziarah di Lokasi Ini (`localAdab`)
                  </label>
                  <textarea
                    rows={3}
                    value={
                      Array.isArray(editingSite.localAdab)
                        ? editingSite.localAdab.join('\n')
                        : editingSite.localAdab || ''
                    }
                    onChange={(e) =>
                      setEditing({
                        ...editingSite,
                        localAdab: e.target.value,
                      })
                    }
                    placeholder={
                      'Melepas alas kaki sebelum menaiki serambi cungkup\nMenjaga ketenangan dzikir dan tidak melangkahi jamaah'
                    }
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Referensi Sejarah &amp; Literatur (`references` - Satu sumber per baris)
                  </label>
                  <textarea
                    rows={3}
                    value={(editingSite.references || []).join('\n')}
                    onChange={(e) =>
                      setEditing({
                        ...editingSite,
                        references: e.target.value
                          .split('\n')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder={'Babad Tanah Jawi\nAtlas Wali Songo karya Agus Sunyoto'}
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Jam Operasional (`openingHours`)</label>
                  <input
                    type="text"
                    value={editingSite.openingHours || 'Buka 24 Jam'}
                    onChange={(e) => setEditing({ ...editingSite, openingHours: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Fasilitas Kompleks (`facilities` - Pisahkan koma)
                  </label>
                  <input
                    type="text"
                    value={(editingSite.facilities || []).join(', ')}
                    onChange={(e) =>
                      setEditing({
                        ...editingSite,
                        facilities: e.target.value
                          .split(',')
                          .map((s) => s.trim())
                          .filter(Boolean),
                      })
                    }
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Diverifikasi Oleh (`verifiedBy`)</label>
                  <input
                    type="text"
                    value={editingSite.verifiedBy || 'Kurasi Literatur Sejarah & Tradisi Lisan Ziarah Nusantara'}
                    onChange={(e) => setEditing({ ...editingSite, verifiedBy: e.target.value })}
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Tanggal Verifikasi (`lastVerified`)
                  </label>
                  <input
                    type="text"
                    value={editingSite.lastVerified || '2026-11-11'}
                    onChange={(e) => setEditing({ ...editingSite, lastVerified: e.target.value })}
                    placeholder="YYYY-MM-DD"
                    className="w-full px-3.5 py-2 bg-white border border-stone-300 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* SEKSI 3: KISAH KAROMAH & WASIAT RAHASIA / UNTOLD STORY (DENGAN TOMBOL <!--more-->) */}
            <div className="bg-stone-100/80 p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-1.5">
                    <ScrollText className="w-4 h-4 text-emerald-700" />
                    <span>3. Kisah Karomah &amp; Untold Story (Terhubung ke /rubrik &amp; Paywall Rp 10.000)</span>
                  </h4>
                  <p className="text-[11px] text-stone-600 mt-0.5">
                    Gunakan penanda <code>&lt;!--more--&gt;</code> untuk memisahkan paragraf pembuka gratis (teaser) dan kelanjutan kisah yang terkunci Infaq.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-800">
                    Kisah Karomah Nyata (`karomah`)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const current = Array.isArray(editingSite.karomah)
                        ? editingSite.karomah.join('\n\n')
                        : String(editingSite.karomah || '');
                      if (!current.includes('<!--more-->')) {
                        setEditing({
                          ...editingSite,
                          karomah: [`${current.trim()}<!--more-->\n\nLanjutkan paragraf setelah batas pratinjau di sini...`],
                        });
                      }
                    }}
                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg text-[11px] font-bold border border-emerald-200 cursor-pointer"
                  >
                    + Sisipkan &lt;!--more--&gt; di Karomah
                  </button>
                </div>
                <textarea
                  rows={5}
                  value={
                    Array.isArray(editingSite.karomah)
                      ? editingSite.karomah.join('\n\n')
                      : String(editingSite.karomah || '')
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editingSite,
                      karomah: [e.target.value],
                    })
                  }
                  placeholder="Paragraf pembuka karomah...<!--more-->&#10;&#10;Paragraf lanjutan setelah dibuka..."
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm leading-relaxed"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-stone-800">
                    Kisah Rahasia &amp; Wasiat Batin (`untoldStory` - Tampil di Rubrik &amp; Detail Makam)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const current = editingSite.untoldStory || '';
                      if (!current.includes('<!--more-->')) {
                        setEditing({
                          ...editingSite,
                          untoldStory: `${current.trim()}<!--more-->\n\nParagraf kelanjutan kisah rahasia...`,
                        });
                      }
                    }}
                    className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg text-[11px] font-bold border border-emerald-200 cursor-pointer"
                  >
                    + Sisipkan &lt;!--more--&gt; di Untold Story
                  </button>
                </div>
                <textarea
                  rows={5}
                  value={editingSite.untoldStory || ''}
                  onChange={(e) => setEditing({ ...editingSite, untoldStory: e.target.value })}
                  placeholder="Paragraf pembuka (Teaser Gratis)...<!--more-->&#10;&#10;Paragraf isi rahasia & hikmah (Terkunci Infaq)..."
                  className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl text-sm leading-relaxed"
                />
              </div>
            </div>

            {/* SEKSI 4: BAROKAH HAJAT & DOA KHUSUS MAKAM (TERHUBUNG KE /doa & PAYWALL Rp 5.000) */}
            <div className="bg-emerald-50/60 p-4 sm:p-5 rounded-2xl border border-emerald-200 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center space-x-1.5">
                    <ScrollText className="w-4 h-4 text-emerald-700" />
                    <span>4. Wasilah Barokah Hajat &amp; Doa Khusus Makam (Terhubung ke /doa &amp; Detail Makam)</span>
                  </h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Kalimat hajat tampil sebagai pengantar terbuka, sedangkan Lafaz Arab, Latin, Terjemahan &amp; Kaifiyah terkunci di balik Infaq Rp 5.000.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditing({
                      ...editingSite,
                      doaKhusus: [
                        ...(editingSite.doaKhusus || []),
                        { title: '', text: '', arab: '', latin: '', translation: '', terjemahan: '', kaifiyah: '' },
                      ],
                    })
                  }
                  className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1 self-start sm:self-auto cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Doa Khusus</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Fadhilah Wasilah &amp; Hajat Ziarah (`barokahHajat`)
                </label>
                <textarea
                  rows={3}
                  value={
                    Array.isArray(editingSite.barokahHajat)
                      ? editingSite.barokahHajat.join('\n')
                      : editingSite.barokahHajat || ''
                  }
                  onChange={(e) =>
                    setEditing({
                      ...editingSite,
                      barokahHajat: e.target.value,
                    })
                  }
                  placeholder="Peziarah yang datang ke maqbarah ini umumnya bertawassul memohon kepada Allah SWT..."
                  className="w-full px-3.5 py-2 bg-white border border-emerald-300 rounded-xl text-sm"
                />
              </div>

              <div className="space-y-3">
                {(editingSite.doaKhusus || []).map((doa, idx) => (
                  <div key={idx} className="p-3.5 bg-white rounded-xl border border-emerald-200 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-900">Doa Khusus #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => {
                          const next = [...(editingSite.doaKhusus || [])];
                          next.splice(idx, 1);
                          setEditing({ ...editingSite, doaKhusus: next });
                        }}
                        className="text-red-600 hover:text-red-800 text-xs font-bold flex items-center space-x-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    </div>
                    <input
                      type="text"
                      value={doa.title || ''}
                      onChange={(e) => {
                        const next = [...(editingSite.doaKhusus || [])];
                        next[idx] = { ...next[idx], title: e.target.value };
                        setEditing({ ...editingSite, doaKhusus: next });
                      }}
                      placeholder={`Judul Doa (Contoh: Doa Tawassul & Munajat di Maqbarah ${editingSite.name || 'Waliyullah'})`}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-bold"
                    />
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={doa.text || doa.arab || ''}
                      onChange={(e) => {
                        const next = [...(editingSite.doaKhusus || [])];
                        next[idx] = { ...next[idx], text: e.target.value, arab: e.target.value };
                        setEditing({ ...editingSite, doaKhusus: next });
                      }}
                      placeholder="Teks Arab (`arab` / `text`)..."
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm font-arabic"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <textarea
                        rows={2}
                        value={doa.latin || ''}
                        onChange={(e) => {
                          const next = [...(editingSite.doaKhusus || [])];
                          next[idx] = { ...next[idx], latin: e.target.value };
                          setEditing({ ...editingSite, doaKhusus: next });
                        }}
                        placeholder="Transliterasi Latin (`latin`)..."
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs italic"
                      />
                      <textarea
                        rows={2}
                        value={doa.translation || doa.terjemahan || ''}
                        onChange={(e) => {
                          const next = [...(editingSite.doaKhusus || [])];
                          next[idx] = {
                            ...next[idx],
                            translation: e.target.value,
                            terjemahan: e.target.value,
                          };
                          setEditing({ ...editingSite, doaKhusus: next });
                        }}
                        placeholder="Terjemahan Bahasa Indonesia (`terjemahan` / `translation`)..."
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                    <textarea
                      rows={2}
                      value={doa.kaifiyah || ''}
                      onChange={(e) => {
                        const next = [...(editingSite.doaKhusus || [])];
                        next[idx] = { ...next[idx], kaifiyah: e.target.value };
                        setEditing({ ...editingSite, doaKhusus: next });
                      }}
                      placeholder="Tata Cara Pengamalan (`kaifiyah` - Opsional, contoh: 1) Hadiahkan Al-Fatihah... 2) Baca Yasin...)"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              {onCancelSiteForm && (
                <button
                  type="button"
                  onClick={onCancelSiteForm}
                  className="px-4 py-2.5 bg-white border border-stone-300 text-stone-700 rounded-xl text-xs font-bold hover:bg-stone-50 cursor-pointer"
                >
                  Batal
                </button>
              )}
              <button
                type="submit"
                disabled={isSavingSite}
                className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSavingSite ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>Simpan &amp; Publikasikan ke Cloud Firestore</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter & Search Bar (Nama Makam, Provinsi 34 Wilayah, dan Kategori) */}
      <div className="p-4 bg-white border-b border-stone-100 flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2.5 flex-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={adminSearchQuery}
              onChange={(e) => setAdminSearchQuery(e.target.value)}
              placeholder="Cari nama tokoh, gelar makam, ID, atau kota..."
              className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <select
            aria-label="Filter Provinsi Katalog Admin"
            value={adminProvinceFilter}
            onChange={(e) => setAdminProvinceFilter(e.target.value)}
            className="px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold text-stone-700"
          >
            {ALL_PROVINCES.map((prov) => (
              <option key={prov} value={prov}>
                {prov === 'Semua Provinsi' ? 'Semua 34 Provinsi' : `Provinsi ${prov}`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0">
          {['Semua', 'Walisongo', 'Ulama Nusantara', 'Habaib', 'Auliya Nusantara'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setAdminCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                adminCategoryFilter === cat
                  ? 'bg-emerald-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Daftar Situs */}
      <div className="divide-y divide-stone-100 max-h-[600px] overflow-y-auto">
        {filteredAdminSites.map((site) => (
          <div
            key={site.id}
            className="p-4 hover:bg-stone-50/80 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start space-x-3.5">
              <img
                src={optimizeSiteImageUrl(site.imageUrl, 120, 70)}
                alt={site.title}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0 bg-stone-100"
                onError={(e) => handleOptimizedImageError(e, site.imageUrl)}
              />
              <div>
                <div className="flex items-center flex-wrap gap-2">
                  <h4 className="font-serif font-bold text-stone-800 text-sm">{site.title}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {site.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                    {site.id}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-medium">{site.name}</p>
                <p className="text-[11px] text-stone-400 mt-0.5 flex items-center flex-wrap gap-1.5">
                  <span>
                    {site.district ? `${site.district}, ` : ''}
                    {site.location.city}, {site.location.province} • ({site.location.lat.toFixed(4)},{' '}
                    {site.location.lng.toFixed(4)})
                  </span>
                  {site.verifiedBy && (
                    <span className="inline-flex items-center gap-0.5 text-emerald-700 font-medium">
                      <ShieldCheck className="w-3 h-3" /> Terverifikasi
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => {
                  if (onSelectEditSite) {
                    onSelectEditSite(site);
                  } else {
                    setEditing({
                      ...site,
                      summary: site.summary || site.description,
                    });
                  }
                  setTimeout(() => {
                    siteEditFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 80);
                }}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Katalog</span>
              </button>
              <button
                type="button"
                onClick={() => onDeleteSite(site.id, site.title)}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
