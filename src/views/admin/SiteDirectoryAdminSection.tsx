import React from 'react';
import { UploadCloud, Plus, Edit3, Trash2 } from 'lucide-react';
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
  return (
    <div className="space-y-6">
      {/* Sinkronisasi Cloud */}
      <div className="border rounded-2xl p-5 bg-emerald-50/50 border-emerald-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <UploadCloud className="w-24 h-24 text-emerald-950" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white text-emerald-800 border border-emerald-200 mb-2">
              Status Cloud:{' '}
              {isSeededInCloud
                ? `Tersinkronisasi (${cloudSiteCount} Makam di Firestore)`
                : 'Menggunakan Fallback Lokal (Belum Di-seed)'}
            </span>
            <h3 className="font-bold text-slate-900 text-base">Sinkronisasi Data Bawaan ke Firestore</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Salin seluruh {localSitesCount} data makam utama ke koleksi{' '}
              <code className="bg-white px-1 rounded">sites</code> di Cloud Firestore Anda.
            </p>
          </div>
          <button
            onClick={onSeedDatabase}
            disabled={isSeeding}
            className="py-2.5 px-5 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-300 text-white font-bold rounded-xl text-xs transition-all shrink-0 cursor-pointer shadow-xs"
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Kelola Daftar Makam ({sites.length})</h3>
          <p className="text-xs text-slate-500">Tambah makam baru atau perbarui informasi makam yang sudah ada.</p>
        </div>
        <button
          onClick={onToggleNewSiteForm}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center cursor-pointer transition-colors"
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

      {/* Form Tambah / Edit Makam */}
      {isSiteFormOpen && (
        <form onSubmit={onSaveSite} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
          <h4 className="font-bold text-slate-900 text-sm">Formulir Data Makam</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nama Tokoh / Wali *</label>
              <input
                required
                type="text"
                value={editingSite.name || ''}
                onChange={(e) => onChangeEditingSite({ ...editingSite, name: e.target.value })}
                placeholder="Contoh: Syekh Nawawi Al-Bantani"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Lengkap Makam *</label>
              <input
                required
                type="text"
                value={editingSite.title || ''}
                onChange={(e) => onChangeEditingSite({ ...editingSite, title: e.target.value })}
                placeholder="Contoh: Makam Syekh Nawawi Al-Bantani"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kategori</label>
              <select
                value={editingSite.category || 'Ulama Nusantara'}
                onChange={(e) => onChangeEditingSite({ ...editingSite, category: e.target.value as any })}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              >
                <option value="Walisongo">Walisongo</option>
                <option value="Ulama Nusantara">Ulama Nusantara</option>
                <option value="Habaib">Habaib</option>
                <option value="Auliya Nusantara">Auliya Nusantara</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">URL Foto Makam</label>
              <input
                type="text"
                value={editingSite.imageUrl || ''}
                onChange={(e) => onChangeEditingSite({ ...editingSite, imageUrl: e.target.value })}
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Kota / Kabupaten *</label>
              <input
                required
                type="text"
                value={editingSite.location?.city || ''}
                onChange={(e) =>
                  onChangeEditingSite({
                    ...editingSite,
                    location: { ...editingSite.location!, city: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Provinsi *</label>
              <input
                required
                type="text"
                value={editingSite.location?.province || ''}
                onChange={(e) =>
                  onChangeEditingSite({
                    ...editingSite,
                    location: { ...editingSite.location!, province: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Latitude (Koordinat)</label>
              <input
                type="number"
                step="any"
                value={editingSite.location?.lat ?? -6.9}
                onChange={(e) =>
                  onChangeEditingSite({
                    ...editingSite,
                    location: { ...editingSite.location!, lat: parseFloat(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono tabular-nums"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Longitude (Koordinat)</label>
              <input
                type="number"
                step="any"
                value={editingSite.location?.lng ?? 110.4}
                onChange={(e) =>
                  onChangeEditingSite({
                    ...editingSite,
                    location: { ...editingSite.location!, lng: parseFloat(e.target.value) },
                  })
                }
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono tabular-nums"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap</label>
            <input
              type="text"
              value={editingSite.location?.address || ''}
              onChange={(e) =>
                onChangeEditingSite({
                  ...editingSite,
                  location: { ...editingSite.location!, address: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jadwal Haul Tahunan (Logistik Rombongan)
              </label>
              <input
                type="text"
                value={editingSite.haulSchedule || ''}
                onChange={(e) => onChangeEditingSite({ ...editingSite, haulSchedule: e.target.value })}
                placeholder="Contoh: 12 Rabiul Awal / Pertengahan Sya'ban"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Ketentuan Adab Lokal Juru Kunci</label>
              <input
                type="text"
                value={editingSite.localAdab || ''}
                onChange={(e) => onChangeEditingSite({ ...editingSite, localAdab: e.target.value })}
                placeholder="Contoh: Berpakaian sopan, melepas alas kaki di gapura kedua..."
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Singkat *</label>
            <textarea
              required
              rows={2}
              value={editingSite.description || ''}
              onChange={(e) => onChangeEditingSite({ ...editingSite, description: e.target.value })}
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Sejarah Lengkap</label>
            <textarea
              rows={3}
              value={editingSite.history || ''}
              onChange={(e) => onChangeEditingSite({ ...editingSite, history: e.target.value })}
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kisah Rahasia / Untold Story (Tampil di Rubrik)
            </label>
            <textarea
              rows={3}
              placeholder="Tuliskan kisah rahasia atau manuskrip khusus tokoh ini..."
              value={editingSite.untoldStory || ''}
              onChange={(e) => onChangeEditingSite({ ...editingSite, untoldStory: e.target.value })}
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Daftar Hikmah &amp; Karomah (Pisahkan setiap karomah dengan baris baru / Enter)
            </label>
            <textarea
              rows={3}
              placeholder="Satu baris untuk satu kisah karomah..."
              value={(editingSite.karomah || []).join('\n')}
              onChange={(e) =>
                onChangeEditingSite({
                  ...editingSite,
                  karomah: e.target.value
                    .split('\n')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancelSiteForm}
              className="px-4 py-2 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSavingSite}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              {isSavingSite ? 'Menyimpan...' : 'Simpan ke Firestore'}
            </button>
          </div>
        </form>
      )}

      {/* Daftar Ringkas Makam */}
      <div className="max-h-96 overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100">
        {sites.map((s) => (
          <div key={s.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50">
            <div className="min-w-0 pr-3">
              <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">{s.name}</p>
              <p className="text-[11px] text-slate-500">
                {s.location.city}, {s.location.province} • {s.category}
              </p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => onSelectEditSite(s)}
                className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                title="Edit Makam, Kisah Rahasia & Karomah"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              {isSeededInCloud && (
                <button
                  onClick={() => onDeleteSite(s.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Hapus dari Firestore"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
