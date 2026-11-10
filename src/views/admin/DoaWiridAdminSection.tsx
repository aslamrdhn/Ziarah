import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Plus,
  Edit3,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  Search,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { ZiarahSite } from '../../data/sites';
import { CuratedDoaItem } from '../KumpulanDoa';
import { ContributionItem } from './AdminTypes';
import { getSiteBarokahHajat, getEffectiveSiteDoaKhusus } from '../../lib/siteLogistics';
import { sanitizePlainText, sanitizeMultilineText } from '../../lib/sanitize';

interface DoaWiridAdminSectionProps {
  sites: ZiarahSite[];
  curatedDoas: CuratedDoaItem[];
  deletedDoaIds: string[];
  contributions: ContributionItem[];
  processingId: string | null;
  isSavingSettings: boolean;
  onChangeCuratedDoas: (next: CuratedDoaItem[]) => void;
  onChangeDeletedDoaIds: (next: string[]) => void;
  onSaveDoaSettings: (
    nextCuratedDoas?: CuratedDoaItem[],
    nextDeletedDoaIds?: string[]
  ) => Promise<void>;
  onApproveContribution: (item: ContributionItem) => void;
  onRejectContribution: (item: ContributionItem) => void;
  onDeleteContribution: (id: string) => void;
}

export const DoaWiridAdminSection: React.FC<DoaWiridAdminSectionProps> = ({
  sites,
  curatedDoas,
  deletedDoaIds,
  contributions,
  processingId,
  isSavingSettings,
  onChangeCuratedDoas,
  onChangeDeletedDoaIds,
  onSaveDoaSettings,
  onApproveContribution,
  onRejectContribution,
  onDeleteContribution,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDoaId, setEditingDoaId] = useState<string | null>(null);
  const [formState, setFormState] = useState<CuratedDoaItem>({
    id: '',
    siteId: 'wali-2',
    siteName: 'Sunan Ampel (Raden Rahmat)',
    type: 'doa',
    title: '',
    barokahHook: '',
    text: '',
    latin: '',
    translation: '',
  });
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const builtInDoas = useMemo(() => {
    const items: CuratedDoaItem[] = [];
    sites.forEach((site) => {
      const hajatSentence = getSiteBarokahHajat(site);
      const effectiveDoas = getEffectiveSiteDoaKhusus(site);
      effectiveDoas.forEach((doa, idx) => {
        items.push({
          id: `${site.id}-doa-${idx}`,
          siteId: site.id,
          siteName: site.name,
          type: 'doa',
          title: doa.title,
          barokahHook: hajatSentence,
          text: doa.text,
          latin: doa.latin || '',
          translation: doa.translation || '',
        });
      });
    });
    return items;
  }, [sites]);

  const combinedDoaList = useMemo(() => {
    const customList = curatedDoas.map((d) => ({ ...d, isCustom: true }));
    const customIds = new Set(customList.map((d) => d.id));
    const remainingBuiltIns = builtInDoas
      .filter((b) => !customIds.has(b.id))
      .map((b) => ({ ...b, isCustom: false }));
    return [...customList, ...remainingBuiltIns];
  }, [curatedDoas, builtInDoas]);

  const filteredDoaList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return combinedDoaList;
    return combinedDoaList.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.siteName.toLowerCase().includes(q) ||
        item.barokahHook.toLowerCase().includes(q) ||
        (item.translation || '').toLowerCase().includes(q)
    );
  }, [combinedDoaList, searchQuery]);

  const doaContributions = useMemo(
    () => contributions.filter((c) => c.type === 'doa'),
    [contributions]
  );

  const handleOpenNewForm = () => {
    const defaultSite = sites[0];
    setEditingDoaId(null);
    setFormState({
      id: '',
      siteId: defaultSite?.id || 'wali-2',
      siteName: defaultSite?.name || 'Waliyullah Nusantara',
      type: 'doa',
      title: '',
      barokahHook: defaultSite ? getSiteBarokahHajat(defaultSite) : '',
      text: '',
      latin: '',
      translation: '',
    });
    setIsFormOpen(true);
  };

  const handleSelectEditDoa = (item: CuratedDoaItem) => {
    setEditingDoaId(item.id);
    setFormState({
      id: item.id,
      siteId: item.siteId || 'wali-2',
      siteName: item.siteName || 'Waliyullah Nusantara',
      type: item.type || 'doa',
      title: item.title || '',
      barokahHook: item.barokahHook || '',
      text: item.text || '',
      latin: item.latin || '',
      translation: item.translation || '',
    });
    setIsFormOpen(true);
  };

  const handleLoadBuiltInDoasToEditor = async () => {
    const existingIds = new Set(curatedDoas.map((d) => d.id));
    const clones = builtInDoas.filter((b) => !existingIds.has(b.id));
    const nextList = [...curatedDoas, ...clones];
    onChangeCuratedDoas(nextList);
    await onSaveDoaSettings(nextList, deletedDoaIds);
    setStatusMsg(
      `Berhasil memuat ${builtInDoas.length} Doa & Wirid bawaan ke daftar kurasi aktif dan menyimpannya ke Firestore!`
    );
  };

  const handleSubmitDoaForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.text.trim()) return;

    const targetId =
      editingDoaId || formState.id.trim() || `doa-custom-${Date.now()}`;
    const cleanedItem: CuratedDoaItem = {
      id: targetId,
      siteId: sanitizePlainText(formState.siteId, 80) || 'wali-2',
      siteName: sanitizePlainText(formState.siteName, 160) || 'Waliyullah Nusantara',
      type: 'doa',
      title: sanitizePlainText(formState.title, 200),
      barokahHook:
        sanitizeMultilineText(formState.barokahHook, 1200) ||
        'Amalan tawassul dan doa khusus peziarah untuk memohon ketenangan batin serta keberkahan hidup.',
      text: sanitizeMultilineText(formState.text, 3000),
      latin: sanitizeMultilineText(formState.latin || '', 2500),
      translation: sanitizeMultilineText(formState.translation || '', 2500),
    };

    const existsIdx = curatedDoas.findIndex((d) => d.id === targetId);
    let nextCurated: CuratedDoaItem[];
    if (existsIdx >= 0) {
      nextCurated = [...curatedDoas];
      nextCurated[existsIdx] = cleanedItem;
    } else {
      nextCurated = [cleanedItem, ...curatedDoas];
    }

    const nextDeleted = deletedDoaIds.filter((id) => id !== targetId);
    onChangeCuratedDoas(nextCurated);
    onChangeDeletedDoaIds(nextDeleted);
    setIsFormOpen(false);
    setEditingDoaId(null);

    await onSaveDoaSettings(nextCurated, nextDeleted);
    setStatusMsg(
      `Doa "${cleanedItem.title}" berhasil disimpan ke Firestore dan langsung tampil di halaman /doa!`
    );
  };

  const handleMoveCuratedDoa = async (id: string, direction: 'up' | 'down') => {
    let workingList = [...curatedDoas];
    // If item isn't in curatedDoas yet, seed curatedDoas from current combined visible list first
    if (!workingList.some((d) => d.id === id)) {
      workingList = combinedDoaList
        .filter((d) => !deletedDoaIds.includes(d.id))
        .slice(0, 40)
        .map(({ isCustom: _c, ...rest }) => rest);
    }
    const idx = workingList.findIndex((d) => d.id === id);
    if (idx < 0) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= workingList.length) return;

    const temp = workingList[idx];
    workingList[idx] = workingList[targetIdx];
    workingList[targetIdx] = temp;

    onChangeCuratedDoas(workingList);
    await onSaveDoaSettings(workingList, deletedDoaIds);
  };

  const handleDeleteOrToggleDoa = async (item: CuratedDoaItem & { isCustom?: boolean }) => {
    const isCurrentlyDeleted = deletedDoaIds.includes(item.id);
    if (isCurrentlyDeleted) {
      const nextDeleted = deletedDoaIds.filter((id) => id !== item.id);
      onChangeDeletedDoaIds(nextDeleted);
      await onSaveDoaSettings(curatedDoas, nextDeleted);
      setStatusMsg(`Doa "${item.title}" berhasil dipulihkan kembali ke halaman /doa.`);
      return;
    }

    const nextCurated = curatedDoas.filter((d) => d.id !== item.id);
    const isBuiltIn = builtInDoas.some((b) => b.id === item.id);
    const nextDeleted = isBuiltIn
      ? Array.from(new Set([...deletedDoaIds, item.id]))
      : deletedDoaIds;

    onChangeCuratedDoas(nextCurated);
    onChangeDeletedDoaIds(nextDeleted);
    await onSaveDoaSettings(nextCurated, nextDeleted);
    setStatusMsg(`Doa "${item.title}" telah dihapus/disembunyikan dari halaman /doa.`);
  };

  return (
    <div className="space-y-6">
      {statusMsg && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-2xl flex items-center justify-between gap-2">
          <span>{statusMsg}</span>
          <button
            type="button"
            onClick={() => setStatusMsg(null)}
            className="text-emerald-700 hover:underline shrink-0 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Header & Tombol Aksi Utama */}
      <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1.5">
              Pusat Kendali 4 · Halaman /doa
            </span>
            <h3 className="font-bold text-slate-900 text-base sm:text-lg">
              Pengelolaan Daftar Doa, Wirid &amp; Hizib Para Wali ({combinedDoaList.length - deletedDoaIds.length} Aktif)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tambah doa baru, edit teks Arab/Latin/Terjemahan, urutkan prioritas tampilan di halaman <code className="bg-white px-1 rounded border border-slate-200">/doa</code>, atau moderasi kiriman doa dari kontributor.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleLoadBuiltInDoasToEditor}
              disabled={isSavingSettings}
              className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Muat &amp; Edit Seluruh Doa Bawaan</span>
            </button>
            <button
              type="button"
              onClick={handleOpenNewForm}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Doa &amp; Wirid Baru</span>
            </button>
          </div>
        </div>

        {/* Form Tambah / Edit Doa & Wirid */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmitDoaForm}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 space-y-4 shadow-xs"
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-900">
                {editingDoaId
                  ? `Edit Doa & Wirid (ID: ${editingDoaId})`
                  : 'Tambah Doa & Wirid Baru ke Halaman /doa'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingDoaId(null);
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                Tutup Form
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Judul Doa / Wirid / Amalan *
                </label>
                <input
                  required
                  type="text"
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="Contoh: Wirid Pembuka Pintu Rezeki & Ketenangan Batin"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Pilih Situs Makam / Nama Wali Terkait *
                </label>
                <select
                  value={formState.siteId}
                  onChange={(e) => {
                    const selectedSite = sites.find((s) => s.id === e.target.value);
                    setFormState({
                      ...formState,
                      siteId: e.target.value,
                      siteName: selectedSite ? selectedSite.name : formState.siteName,
                      barokahHook:
                        formState.barokahHook ||
                        (selectedSite ? getSiteBarokahHajat(selectedSite) : ''),
                    });
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                >
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} — {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Nama Tokoh / Waliyullah yang Ditampilkan di Kartu Doa
              </label>
              <input
                type="text"
                value={formState.siteName}
                onChange={(e) => setFormState({ ...formState, siteName: e.target.value })}
                placeholder="Contoh: Sunan Ampel (Raden Rahmat)"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Kalimat Pengantar Barokah &amp; Hajat (Tampil Terbuka Sebelum Gembok Rp 5.000)
              </label>
              <textarea
                rows={2}
                value={formState.barokahHook}
                onChange={(e) => setFormState({ ...formState, barokahHook: e.target.value })}
                placeholder="Contoh: Banyak peziarah mengamalkan doa ini sebagai wasilah memohon ketenangan rumah tangga, kelancaran rezeki halal..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs leading-relaxed text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Lafaz Arab Naskh / Bacaan Wirid *
              </label>
              <textarea
                required
                rows={3}
                dir="rtl"
                value={formState.text}
                onChange={(e) => setFormState({ ...formState, text: e.target.value })}
                placeholder="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-arabic text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Transliterasi Latin (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={formState.latin || ''}
                  onChange={(e) => setFormState({ ...formState, latin: e.target.value })}
                  placeholder="Bismillaahirrahmaanirrahiim..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Terjemahan &amp; Tata Cara Pengamalan
                </label>
                <textarea
                  rows={2}
                  value={formState.translation || ''}
                  onChange={(e) => setFormState({ ...formState, translation: e.target.value })}
                  placeholder="Artinya: Ya Allah bukakanlah bagi kami pintu rahmat dan keberkahan..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingDoaId(null);
                }}
                className="px-3.5 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSavingSettings}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>
                  {editingDoaId ? 'Simpan Perubahan Doa' : 'Simpan & Tampilkan di /doa'}
                </span>
              </button>
            </div>
          </form>
        )}

        {/* Kolom Pencarian Doa */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul doa, nama wali, atau kata kunci hajat..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-emerald-700"
          />
        </div>

        {/* Daftar Doa & Wirid */}
        <div className="max-h-[460px] overflow-y-auto bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100">
          {filteredDoaList.map((item, idx) => {
            const isDeleted = deletedDoaIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 ${
                  isDeleted ? 'opacity-50 bg-rose-50/30' : ''
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      #{idx + 1}
                    </span>
                    {item.isCustom ? (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Kurasi Admin
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                        Doa Bawaan Situs
                      </span>
                    )}
                    {isDeleted && (
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                        Disembunyikan
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-900 truncate mt-1">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {item.siteName} · {item.barokahHook}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveCuratedDoa(item.id, 'up')}
                    disabled={idx === 0 || isSavingSettings}
                    className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                    title="Naikkan Urutan"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveCuratedDoa(item.id, 'down')}
                    disabled={idx === filteredDoaList.length - 1 || isSavingSettings}
                    className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-slate-100 rounded-lg disabled:opacity-30 cursor-pointer"
                    title="Turunkan Urutan"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectEditDoa(item)}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3 text-emerald-800" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteOrToggleDoa(item)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 cursor-pointer ${
                      isDeleted
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                    }`}
                  >
                    {isDeleted ? (
                      <>
                        <RotateCcw className="w-3 h-3" />
                        <span>Pulihkan</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="button"
            onClick={() => onSaveDoaSettings(curatedDoas, deletedDoaIds)}
            disabled={isSavingSettings}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>
              {isSavingSettings
                ? 'Menyimpan...'
                : 'Simpan Daftar Doa & Wirid ke Firestore'}
            </span>
          </button>
        </div>
      </div>

      {/* Moderasi Doa Kiriman Kontributor */}
      <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              Kiriman Doa &amp; Wirid dari Kontributor Komunitas ({doaContributions.length})
            </h4>
            <p className="text-xs text-slate-500">
              Setujui doa kiriman jamaah agar tampil di halaman <code className="bg-white px-1 rounded border border-slate-200">/doa</code>, atau salin ke editor utama di atas untuk dilengkapi teks Latin &amp; terjemahannya.
            </p>
          </div>
        </div>

        {doaContributions.length === 0 ? (
          <div className="p-6 bg-white rounded-xl border border-slate-200 text-center text-xs text-slate-500">
            <BookOpen className="w-6 h-6 text-slate-400 mx-auto mb-2" />
            Belum ada kiriman doa dari kontributor komunitas.
          </div>
        ) : (
          <div className="space-y-3">
            {doaContributions.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        item.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : item.status === 'rejected'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {item.status === 'approved'
                        ? 'Disetujui'
                        : item.status === 'rejected'
                        ? 'Ditolak'
                        : 'Menunggu Moderasi'}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {item.targetName}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      · Oleh: {item.contributorName}
                    </span>
                  </div>
                  <p className="text-xs font-arabic text-slate-900 line-clamp-2" dir="rtl">
                    {item.content}
                  </p>
                  {item.translation && (
                    <p className="text-[11px] text-slate-600 italic line-clamp-2">
                      &ldquo;{item.translation}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingDoaId(`doa-contrib-${item.id}`);
                      setFormState({
                        id: `doa-contrib-${item.id}`,
                        siteId: 'wali-2',
                        siteName: item.targetName || 'Waliyullah Nusantara',
                        type: 'doa',
                        title: `Amalan & Doa: ${item.targetName}`,
                        barokahHook:
                          'Amalan tawassul yang diamalkan para peziarah untuk memohon ketenangan batin, kelapangan rezeki halal, dan keberkahan keluarga.',
                        text: item.content || '',
                        latin: '',
                        translation: item.translation || '',
                      });
                      setIsFormOpen(true);
                    }}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3 text-emerald-800" />
                    <span>Edit di Kurasi</span>
                  </button>
                  {item.status !== 'approved' && (
                    <button
                      type="button"
                      disabled={processingId === item.id}
                      onClick={() => onApproveContribution(item)}
                      className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Setujui</span>
                    </button>
                  )}
                  {item.status !== 'rejected' && (
                    <button
                      type="button"
                      disabled={processingId === item.id}
                      onClick={() => onRejectContribution(item)}
                      className="px-2.5 py-1.5 rounded-xl text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      <XCircle className="w-3 h-3" />
                      <span>Tolak</span>
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={processingId === item.id}
                    onClick={() => onDeleteContribution(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg cursor-pointer"
                    title="Hapus Kiriman"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
