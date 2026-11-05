import React, { useState, useMemo } from 'react';
import { UploadCloud, Plus, Edit3, Trash2, Search, Lock, BookOpen } from 'lucide-react';
import { ZiarahSite } from '../../data/sites';

interface SiteDirectoryAdminSectionProps {
  sites: ZiarahSite[];
  localSitesCount: number;
  isSeededInCloud: boolean;
  cloudSiteCount: number;
  isSeeding: boolean;
  seedMessage: string;
  isSiteFormOpen: boolean;
  editingSite: Partial<ZiarahSite>;
  isSavingSite: boolean;
  siteStatusMsg: string;
  onSeedDatabase: () => void;
  onToggleNewSiteForm: () => void;
  onChangeEditingSite: (site: Partial<ZiarahSite>) => void;
  onSaveSite: (e: React.FormEvent) => void;
  onCancelSiteForm: () => void;
  onSelectEditSite: (site: ZiarahSite) => void;
  onDeleteSite: (siteId: string) => void;
}

function getMoreSplitInfo(text: string): { hasMarker: boolean; freeChars: number; lockedChars: number } {
  const raw = text || '';
  if (raw.includes('<!--more-->')) {
    const [before, ...afterParts] = raw.split('<!--more-->');
    return {
      hasMarker: true,
      freeChars: before.trim().length,
      lockedChars: afterParts.join(' ').trim().length,
    };
  }
  const trimmed = raw.trim();
  const autoSplit = Math.min(200, Math.floor(trimmed.length * 0.45));
  return {
    hasMarker: false,
    freeChars: autoSplit,
    lockedChars: Math.max(0, trimmed.length - autoSplit),
  };
}

export const SiteDirectoryAdminSection: React.FC<SiteDirectoryAdminSectionProps> = ({
  sites,
  localSitesCount,
  isSeededInCloud,
  cloudSiteCount,
  isSeeding,
  seedMessage,
  isSiteFormOpen,
  editingSite,
  isSavingSite,
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

  const filteredAdminSites = useMemo(() => {
    const q = adminSearchQuery.toLowerCase().trim();
    return sites.filter((s) => {
      const matchCat = adminCategoryFilter === 'Semua' || s.category === adminCategoryFilter;
      const matchQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.location.city.toLowerCase().includes(q) ||
        s.location.province.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [sites, adminSearchQuery, adminCategoryFilter]);

  const karomahList = Array.isArray(editingSite.karomah) && editingSite.karomah.length > 0
    ? editingSite.karomah
    : [''];

  const doaKhususList = Array.isArray(editingSite.doaKhusus) ? editingSite.doaKhusus : [];

  const handleUpdateKaromahItem = (idx: number, val: string) => {
    const next = [...karomahList];
    next[idx] = val;
    onChangeEditingSite({ ...editingSite, karomah: next });
  };

  const handleInsertMoreInKaromah = (idx: number) => {
    const current = karomahList[idx] || '';
    if (current.includes('<!--more-->')) return;
    const mid = Math.max(80, Math.floor(current.length * 0.5));
    const periodAfterMid = current.indexOf('. ', mid);
    const insertPos = periodAfterMid !== -1 ? periodAfterMid + 1 : current.length;
    const updated =
      current.length > 0
        ? `${current.slice(0, insertPos).trim()} <!--more-->\n\n${current.slice(insertPos).trim()}`
        : 'Paragraf pembuka gratis... <!--more-->\n\nParagraf lanjutan yang terkunci...';
    handleUpdateKaromahItem(idx, updated);
  };

  const handleAddKaromahItem = () => {
    onChangeEditingSite({
      ...editingSite,
      karomah: [...karomahList, ''],
    });
  };

  const handleRemoveKaromahItem = (idx: number) => {
    const next = karomahList.filter((_, i) => i !== idx);
    onChangeEditingSite({
      ...editingSite,
      karomah: next,
    });
  };

  const handleInsertMoreInUntold = () => {
    const current = editingSite.untoldStory || '';
    if (current.includes('<!--more-->')) return;
    const mid = Math.max(100, Math.floor(current.length * 0.5));
    const periodAfterMid = current.indexOf('. ', mid);
    const insertPos = periodAfterMid !== -1 ? periodAfterMid + 1 : current.length;
    const updated =
      current.length > 0
        ? `${current.slice(0, insertPos).trim()} <!--more-->\n\n${current.slice(insertPos).trim()}`
        : 'Paragraf pembuka gratis... <!--more-->\n\nParagraf wasiat rahasia yang terkunci...';
    onChangeEditingSite({ ...editingSite, untoldStory: updated });
  };

  const handleAddDoaKhusus = () => {
    onChangeEditingSite({
      ...editingSite,
      doaKhusus: [
        ...doaKhususList,
        { title: 'Amalan & Tawassul Khusus', text: '', translation: '' },
      ],
    });
  };

  const handleUpdateDoaKhusus = (
    idx: number,
    field: 'title' | 'text' | 'translation',
    value: string
  ) => {
    const next = doaKhususList.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    );
    onChangeEditingSite({ ...editingSite, doaKhusus: next });
  };

  const handleRemoveDoaKhusus = (idx: number) => {
    onChangeEditingSite({
      ...editingSite,
      doaKhusus: doaKhususList.filter((_, i) => i !== idx),
    });
  };

  const untoldSplitInfo = getMoreSplitInfo(editingSite.untoldStory || '');

  return (
    <div className="space-y-6">
      {/* Sinkronisasi Cloud */}
      <div className="border rounded-2xl p-5 bg-[#FAF8F5] border-stone-200/90 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <UploadCloud className="w-24 h-24 text-stone-900" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-white text-emerald-800 border border-stone-200 mb-2">
              Status Cloud:{' '}
              {isSeededInCloud
                ? `Tersinkronisasi (${cloudSiteCount} Makam di Firestore)`
                : 'Menggunakan Data Lokal (Siap Disinkronkan)'}
            </span>
            <h3 className="font-bold text-stone-900 text-base">Sinkronisasi Data Bawaan ke Firestore</h3>
            <p className="text-xs text-stone-600 mt-0.5">
              Salin seluruh {localSitesCount} data makam utama ke koleksi{' '}
              <code className="bg-white px-1 rounded border border-stone-200">sites</code> di Cloud Firestore Anda.
            </p>
          </div>
          <button
            type="button"
            onClick={onSeedDatabase}
            disabled={isSeeding}
            className="py-2.5 px-5 bg-stone-900 hover:bg-emerald-900 disabled:bg-stone-300 text-white font-semibold rounded-xl text-xs transition-colors shrink-0 cursor-pointer"
          >
            {isSeeding ? 'Memproses...' : `Sinkronkan ${localSitesCount} Makam Bawaan`}
          </button>
        </div>
        {seedMessage && (
          <p
            className={`mt-3 text-xs font-semibold relative z-10 ${
              seedMessage.includes('Gagal') ? 'text-rose-600' : 'text-emerald-800'
            }`}
          >
            {seedMessage}
          </p>
        )}
      </div>

      {/* Header & Tombol Tambah Makam */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-stone-900 text-base">
            Kelola Daftar Makam &amp; Cerita Lengkap ({sites.length} Situs)
          </h3>
          <p className="text-xs text-stone-500">
            Edit penuh riwayat sejarah, karomah, wasiat rahasia (`&lt;!--more--&gt;`), jadwal haul, adab lokal, hingga doa khusus.
          </p>
        </div>
        <button
          type="button"
          onClick={onToggleNewSiteForm}
          className="px-4 py-2.5 bg-stone-900 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl flex items-center cursor-pointer transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Tambah Makam Baru
        </button>
      </div>

      {siteStatusMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold rounded-xl">
          {siteStatusMsg}
        </div>
      )}

      {/* Form Tambah / Edit Makam Lengkap (Tahap CMS 1) */}
      {isSiteFormOpen && (
        <form onSubmit={onSaveSite} className="bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-stone-300 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                Editor Penuh Situs Makam (CMS)
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-base sm:text-lg">
                {editingSite.id ? `Edit Data: ${editingSite.title || editingSite.name}` : 'Tambah Situs Makam Baru'}
              </h4>
            </div>
            <button
              type="button"
              onClick={onCancelSiteForm}
              className="px-3 py-1.5 bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Tutup Editor
            </button>
          </div>

          {/* 1. Data Identitas & Lokasi */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              1. Identitas Tokoh, Koordinat &amp; Lokasi
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Nama Lengkap Tokoh / Wali *</label>
                <input
                  required
                  type="text"
                  value={editingSite.name || ''}
                  onChange={(e) => onChangeEditingSite({ ...editingSite, name: e.target.value })}
                  placeholder="Contoh: Syekh Maulana Malik Ibrahim"
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Gelar / Sebutan Populer *</label>
                <input
                  required
                  type="text"
                  value={editingSite.title || ''}
                  onChange={(e) => onChangeEditingSite({ ...editingSite, title: e.target.value })}
                  placeholder="Contoh: Sunan Gresik"
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Kategori</label>
                <select
                  value={editingSite.category || 'Ulama Nusantara'}
                  onChange={(e) => onChangeEditingSite({ ...editingSite, category: e.target.value as any })}
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                >
                  <option value="Walisongo">Walisongo</option>
                  <option value="Ulama Nusantara">Ulama Nusantara</option>
                  <option value="Habaib">Habaib</option>
                  <option value="Auliya Nusantara">Auliya Nusantara</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">URL Foto Makam</label>
                <input
                  type="text"
                  value={editingSite.imageUrl || ''}
                  onChange={(e) => onChangeEditingSite({ ...editingSite, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Kota / Kabupaten *</label>
                <input
                  required
                  type="text"
                  value={editingSite.location?.city || ''}
                  onChange={(e) =>
                    onChangeEditingSite({
                      ...editingSite,
                      location: { ...(editingSite.location || { lat: -6.9, lng: 110.4, address: '', province: '' }), city: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Provinsi *</label>
                <input
                  required
                  type="text"
                  value={editingSite.location?.province || ''}
                  onChange={(e) =>
                    onChangeEditingSite({
                      ...editingSite,
                      location: { ...(editingSite.location || { lat: -6.9, lng: 110.4, address: '', city: '' }), province: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Latitude (Koordinat)</label>
                <input
                  type="number"
                  step="any"
                  value={editingSite.location?.lat ?? -6.9}
                  onChange={(e) =>
                    onChangeEditingSite({
                      ...editingSite,
                      location: { ...(editingSite.location || { lng: 110.4, address: '', city: '', province: '' }), lat: parseFloat(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono tabular-nums"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Longitude (Koordinat)</label>
                <input
                  type="number"
                  step="any"
                  value={editingSite.location?.lng ?? 110.4}
                  onChange={(e) =>
                    onChangeEditingSite({
                      ...editingSite,
                      location: { ...(editingSite.location || { lat: -6.9, address: '', city: '', province: '' }), lng: parseFloat(e.target.value) },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs font-mono tabular-nums"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">Alamat Lengkap</label>
                <input
                  type="text"
                  value={editingSite.location?.address || ''}
                  onChange={(e) =>
                    onChangeEditingSite({
                      ...editingSite,
                      location: { ...(editingSite.location || { lat: -6.9, lng: 110.4, city: '', province: '' }), address: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Jam Operasional</label>
                <input
                  type="text"
                  value={editingSite.openingHours || 'Buka 24 Jam'}
                  onChange={(e) => onChangeEditingSite({ ...editingSite, openingHours: e.target.value })}
                  placeholder="Buka 24 Jam"
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                />
              </div>
            </div>
          </div>

          {/* 2. Era, Sanad, Haul & Adab Lokal */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              2. Era Sejarah, Sanad Keilmuan, Jadwal Haul &amp; Adab Lokal
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Era / Abad Kehidupan (`era`)</label>
                <input
                  type="text"
                  value={editingSite.era || ''}
                  onChange={(e) => onChangeEditingSite({ ...editingSite, era: e.target.value })}
                  placeholder="Contoh: Abad ke-15 – ke-16 M"
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Jadwal Haul Tahunan (`haulSchedule`)</label>
                <input
                  type="text"
                  value={editingSite.haulSchedule || ''}
                  onChange={(e) => onChangeEditingSite({ ...editingSite, haulSchedule: e.target.value })}
                  placeholder="Contoh: 10–12 Muharram / 12 Rabiul Awal"
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Jalur Sanad Keilmuan &amp; Silsilah (`sanad`)</label>
              <input
                type="text"
                value={editingSite.sanad || ''}
                onChange={(e) => onChangeEditingSite({ ...editingSite, sanad: e.target.value })}
                placeholder="Contoh: Putra Sunan Ampel; Murid Syekh Maulana Malik Ibrahim..."
                className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Adab &amp; Tata Krama Lokal (`localAdab`)
                </label>
                <textarea
                  rows={3}
                  value={editingSite.localAdab || ''}
                  onChange={(e) => onChangeEditingSite({ ...editingSite, localAdab: e.target.value })}
                  placeholder="Contoh: Berpakaian muslim sopan, melepas alas kaki di batas serambi, menjaga ketenangan dzikir..."
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs leading-relaxed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Fasilitas Makam (Pisahkan dengan koma)
                </label>
                <textarea
                  rows={3}
                  value={(editingSite.facilities || []).join(', ')}
                  onChange={(e) =>
                    onChangeEditingSite({
                      ...editingSite,
                      facilities: e.target.value
                        .split(',')
                        .map((f) => f.trim())
                        .filter(Boolean),
                    })
                  }
                  placeholder="Masjid Jami, Tempat Wudhu, Area Parkir Bus, Pusat Oleh-Oleh"
                  className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 3. Deskripsi & Sejarah Babak I */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              3. Ringkasan Katalog &amp; Babak I: Sejarah Lengkap
            </h5>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">Deskripsi Ringkas Katalog *</label>
              <textarea
                required
                rows={2}
                value={editingSite.description || ''}
                onChange={(e) => onChangeEditingSite({ ...editingSite, description: e.target.value })}
                className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs leading-relaxed"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Sejarah &amp; Perjuangan Dakwah (`history` — gunakan 2x Enter untuk paragraf baru)
              </label>
              <textarea
                rows={4}
                value={editingSite.history || ''}
                onChange={(e) => onChangeEditingSite({ ...editingSite, history: e.target.value })}
                className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs leading-relaxed"
              />
            </div>
          </div>

          {/* 4. Babak II: Editor Dinamis Kisah Karomah + Tombol Pintas <!--more--> */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  4. Babak II: Kisah Karomah &amp; Keteladanan (`karomah`)
                </h5>
                <p className="text-[11px] text-stone-500">
                  Karomah #1 tampil terbuka gratis. Karomah #2 dst. dapat diberi titik potong <code className="bg-white px-1 rounded border border-stone-200">&lt;!--more--&gt;</code> untuk efek gembok penasaran.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddKaromahItem}
                className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Kisah Karomah</span>
              </button>
            </div>

            <div className="space-y-3">
              {karomahList.map((item, idx) => {
                const splitInfo = getMoreSplitInfo(item);
                return (
                  <div key={idx} className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-stone-800">
                        Kisah Karomah #{idx + 1} {idx === 0 ? '(Terbuka Penuh)' : '(Terkunci Sebagian)'}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleInsertMoreInKaromah(idx)}
                          className="px-2.5 py-1 bg-[#FAF8F5] hover:bg-stone-100 text-emerald-900 border border-stone-200 rounded-lg text-[11px] font-semibold inline-flex items-center gap-1 cursor-pointer"
                          title="Sisipkan penanda batas bacaan gratis vs. terkunci"
                        >
                          <Lock className="w-3 h-3 text-emerald-800" />
                          <span>+ Sisipkan Titik Potong Gembok (&lt;!--more--&gt;)</span>
                        </button>
                        {karomahList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveKaromahItem(idx)}
                            className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg cursor-pointer"
                            title="Hapus Karomah ini"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                    <textarea
                      rows={3}
                      value={item}
                      onChange={(e) => handleUpdateKaromahItem(idx, e.target.value)}
                      placeholder="Tuliskan kisah karomah... Gunakan <!--more--> di tengah kalimat menegangkan untuk memotong ke gembok infaq."
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-stone-200 rounded-xl text-xs leading-relaxed"
                    />
                    {idx > 0 && item.trim().length > 0 && (
                      <div className="flex items-center justify-between text-[11px] text-stone-500">
                        <span>
                          {splitInfo.hasMarker ? '✓ Titik potong <!--more--> aktif' : 'Pemotongan otomatis (belum ada <!--more-->)'}
                        </span>
                        <span>
                          Terbuka gratis: <strong>{splitInfo.freeChars} kar.</strong> · Terkunci: <strong>{splitInfo.lockedChars} kar.</strong>
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Babak III: Wasiat Rahasia & Untold Story + Tombol Pintas <!--more--> */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  5. Babak III: Wasiat Rahasia &amp; Naskah Khusus (`untoldStory`)
                </h5>
                <p className="text-[11px] text-stone-500">
                  Gunakan tombol pintas di kanan untuk menyisipkan <code className="bg-white px-1 rounded border border-stone-200">&lt;!--more--&gt;</code> tepat pada puncak ketegangan cerita.
                </p>
              </div>
              <button
                type="button"
                onClick={handleInsertMoreInUntold}
                className="px-3 py-1.5 bg-white hover:bg-stone-100 text-emerald-900 border border-stone-300 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-800" />
                <span>+ Sisipkan Titik Potong Gembok (&lt;!--more--&gt;)</span>
              </button>
            </div>

            <textarea
              rows={6}
              placeholder="Tuliskan kisah batin mendalam, riyadhoh malam, dan wasiat rahasia tokoh ini..."
              value={editingSite.untoldStory || ''}
              onChange={(e) => onChangeEditingSite({ ...editingSite, untoldStory: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs leading-relaxed"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white border border-stone-200 text-[11px] text-stone-600">
              <span>
                Status Gembok:{' '}
                <strong className={untoldSplitInfo.hasMarker ? 'text-emerald-800' : 'text-amber-800'}>
                  {untoldSplitInfo.hasMarker
                    ? '✓ Titik Potong Manual (<!--more-->) Aktif'
                    : 'Pemotongan Otomatis (Klik tombol di atas untuk titik potong presisi)'}
                </strong>
              </span>
              <span>
                Pratinjau: Terbuka Gratis <strong>{untoldSplitInfo.freeChars} karakter</strong> · Terkunci di Balik Infaq{' '}
                <strong>{untoldSplitInfo.lockedChars} karakter</strong>
              </span>
            </div>
          </div>

          {/* 6. Doa & Tawassul Khusus Makam (doaKhusus) */}
          <div className="space-y-3 pt-4 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                  6. Doa, Wirid &amp; Tawassul Khusus Makam (`doaKhusus`)
                </h5>
                <p className="text-[11px] text-stone-500">
                  Tampil di Tab 2 (&ldquo;Panduan Ziarah &amp; Doa Khusus&rdquo;) serta halaman Kumpulan Doa Para Wali.
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddDoaKhusus}
                className="px-3 py-1.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
                <span>+ Tambah Doa Khusus</span>
              </button>
            </div>

            {doaKhususList.length === 0 ? (
              <p className="text-xs text-stone-500 italic bg-white p-3 rounded-xl border border-stone-200">
                Belum ada doa khusus untuk makam ini. Klik &ldquo;+ Tambah Doa Khusus&rdquo; untuk menambahkan tawassul atau amalan beliau.
              </p>
            ) : (
              <div className="space-y-3">
                {doaKhususList.map((doa, idx) => (
                  <div key={idx} className="p-3.5 bg-white rounded-xl border border-stone-200 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-stone-800">Doa / Amalan Khusus #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDoaKhusus(idx)}
                        className="text-xs text-rose-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Item</span>
                      </button>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Judul Doa / Amalan</label>
                      <input
                        type="text"
                        value={doa.title || ''}
                        onChange={(e) => handleUpdateDoaKhusus(idx, 'title', e.target.value)}
                        placeholder="Contoh: Tawassul Khusus Sunan Ampel"
                        className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Teks Arab / Bacaan Wirid</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={doa.text || ''}
                        onChange={(e) => handleUpdateDoaKhusus(idx, 'text', e.target.value)}
                        placeholder="Tuliskan teks Arab..."
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-stone-200 rounded-lg text-sm font-arabic"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600 mb-1">Terjemahan / Keterangan Amalan</label>
                      <textarea
                        rows={2}
                        value={doa.translation || ''}
                        onChange={(e) => handleUpdateDoaKhusus(idx, 'translation', e.target.value)}
                        placeholder="Tuliskan arti bahasa Indonesia atau tata cara pengamalannya..."
                        className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-stone-200 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onCancelSiteForm}
              className="px-4 py-2.5 bg-white border border-stone-300 text-stone-700 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSavingSite}
              className="px-5 py-2.5 bg-stone-900 hover:bg-emerald-900 text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors"
            >
              {isSavingSite ? 'Menyimpan ke Cloud...' : 'Simpan Seluruh Data Makam ke Firestore'}
            </button>
          </div>
        </form>
      )}

      {/* Kolom Pencarian & Filter Kategori Cepat di Daftar Makam Admin */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={adminSearchQuery}
            onChange={(e) => setAdminSearchQuery(e.target.value)}
            placeholder="Ketik nama wali, makam, kota, atau provinsi untuk mengedit cepat..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
          />
        </div>
        <select
          value={adminCategoryFilter}
          onChange={(e) => setAdminCategoryFilter(e.target.value)}
          className="px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 cursor-pointer"
        >
          <option value="Semua">Semua Kategori ({sites.length})</option>
          <option value="Walisongo">Walisongo</option>
          <option value="Ulama Nusantara">Ulama Nusantara</option>
          <option value="Habaib">Habaib</option>
          <option value="Auliya Nusantara">Auliya Nusantara</option>
        </select>
      </div>

      {/* Daftar Ringkas Makam */}
      <div className="max-h-[460px] overflow-y-auto border border-stone-200 rounded-2xl divide-y divide-stone-100 bg-white">
        {filteredAdminSites.map((s) => {
          const hasMoreInUntold = Boolean(s.untoldStory && s.untoldStory.includes('<!--more-->'));
          return (
            <div key={s.id} className="p-3.5 flex items-center justify-between hover:bg-stone-50">
              <div className="min-w-0 pr-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs sm:text-sm font-bold text-stone-900 truncate">{s.title}</p>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                    {s.category}
                  </span>
                  {hasMoreInUntold && (
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200/70">
                      Gembok &lt;!--more--&gt; Aktif
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 truncate mt-0.5">
                  {s.name} · {s.location.city}, {s.location.province}
                  {s.haulSchedule ? ` · Haul: ${s.haulSchedule}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onSelectEditSite(s)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-emerald-900 bg-[#FAF8F5] hover:bg-emerald-50 border border-stone-200 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  title="Edit Makam, Kisah Rahasia & Karomah"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                {isSeededInCloud && (
                  <button
                    type="button"
                    onClick={() => onDeleteSite(s.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Hapus dari Firestore"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filteredAdminSites.length === 0 && (
          <div className="p-8 text-center text-xs text-stone-500">
            Tidak ada makam yang cocok dengan kata kunci &ldquo;{adminSearchQuery}&rdquo;.
          </div>
        )}
      </div>
    </div>
  );
};
