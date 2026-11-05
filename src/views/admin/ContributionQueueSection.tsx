import React from 'react';
import { Inbox, MapPin, CheckCircle2, XCircle, Trash2, MessageSquareHeart } from 'lucide-react';
import { isSafeExternalUrl } from '../../lib/sanitize';
import { ContributionItem, VisitorStoryAdminItem } from './AdminTypes';

interface ContributionQueueSectionProps {
  contributions: ContributionItem[];
  visitorStories?: VisitorStoryAdminItem[];
  processingId: string | null;
  onApprove: (item: ContributionItem) => void;
  onReject: (item: ContributionItem) => void;
  onDelete: (id: string) => void;
  onApproveStory?: (story: VisitorStoryAdminItem) => void;
  onDeleteStory?: (id: string) => void;
}

export const ContributionQueueSection: React.FC<ContributionQueueSectionProps> = ({
  contributions,
  visitorStories = [],
  processingId,
  onApprove,
  onReject,
  onDelete,
  onApproveStory,
  onDeleteStory,
}) => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Antrean Usulan &amp; Kontribusi Peziarah</h2>
            <p className="text-xs text-slate-500">
              Setujui usulan makam baru, naskah rubrik karomah, atau doa khusus dari pengguna. Kontak pengusul disimpan di sub-koleksi privat khusus Admin.
            </p>
          </div>
          <span className="text-xs font-bold font-mono tabular-nums text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Total: {contributions.length} Usulan
          </span>
        </div>

        {contributions.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-10 text-center">
            <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">Belum Ada Usulan Masuk</p>
            <p className="text-xs text-slate-500 mt-1">
              Setiap usulan yang dikirim pengguna melalui tombol &ldquo;Kontribusi&rdquo; akan tampil secara real-time di sini.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {contributions.map((item) => (
              <div key={item.id} className="bg-slate-50/70 border border-slate-200 rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-lg border ${
                        item.type === 'baru'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : item.type === 'karomah'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-sky-50 text-sky-800 border-sky-200'
                      }`}
                    >
                      {item.type === 'baru'
                        ? 'Lokasi Makam Baru'
                        : item.type === 'karomah'
                          ? 'Rubrik & Karomah'
                          : 'Doa Khusus'}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-lg border ${
                        item.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : item.status === 'rejected'
                            ? 'bg-rose-100 text-rose-900 border-rose-300'
                            : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}
                    >
                      {item.status === 'approved'
                        ? 'Disetujui'
                        : item.status === 'rejected'
                          ? 'Ditolak'
                          : 'Menunggu Kurasi'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Pengusul: <strong className="text-slate-800">{item.contributorName}</strong>{' '}
                    {item.contributorContact ? `(🔒 ${item.contributorContact})` : ''}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">{item.targetName}</h3>
                  {(item.city || item.province) && (
                    <p className="text-xs text-emerald-700 font-medium flex items-center mt-0.5">
                      <MapPin className="w-3.5 h-3.5 mr-1" /> {item.city}
                      {item.province ? `, ${item.province}` : ''} ({item.category})
                    </p>
                  )}
                  {item.mapsUrl && (
                    <p className="text-xs text-slate-500 mt-0.5 truncate">
                      Maps/Alamat:{' '}
                      {isSafeExternalUrl(item.mapsUrl) ? (
                        <a
                          href={item.mapsUrl.trim()}
                          target="_blank"
                          rel="noreferrer"
                          className="text-emerald-700 hover:underline font-semibold"
                        >
                          {item.mapsUrl.trim()} ↗
                        </a>
                      ) : (
                        item.mapsUrl
                      )}
                    </p>
                  )}
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {item.content}
                  {item.translation && (
                    <p className="mt-2 pt-2 border-t border-slate-100 text-xs text-slate-500 italic">
                      Arti / Fadhilah: {item.translation}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                  {item.status !== 'approved' && (
                    <button
                      onClick={() => onApprove(item)}
                      disabled={processingId === item.id}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                      Setujui &amp; Publikasikan
                    </button>
                  )}
                  {item.status !== 'rejected' && (
                    <button
                      onClick={() => onReject(item)}
                      disabled={processingId === item.id}
                      className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-xl flex items-center transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1.5" />
                      Tolak
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(item.id)}
                    disabled={processingId === item.id}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                    title="Hapus permanen"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Moderasi Cerita & Kesan Peziarah (/stories) */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquareHeart className="w-4 h-4 text-emerald-700" />
              <span>Moderasi Kesan &amp; Cerita Peziarah di Halaman Makam</span>
            </h2>
            <p className="text-xs text-slate-500">
              Setiap cerita peziarah baru berstatus <strong>pending</strong> hingga disetujui Kurator agar terbebas dari spam.
            </p>
          </div>
          <span className="text-xs font-bold font-mono tabular-nums text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Total: {visitorStories.length} Cerita
          </span>
        </div>

        {visitorStories.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center">
            <p className="text-xs font-bold text-slate-600">Belum ada kiriman kesan peziarah di database.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {visitorStories.map((st) => {
              const isApproved = st.status === 'approved' || st.status === 'published';
              return (
                <div
                  key={st.id}
                  className="bg-slate-50/70 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{st.authorName}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                        Makam ID: {st.siteId}
                      </span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : 'bg-amber-100 text-amber-900 border-amber-300'
                        }`}
                      >
                        {isApproved ? 'Tampil Publik' : 'Menunggu Moderasi'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{st.text}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {!isApproved && onApproveStory && (
                      <button
                        type="button"
                        onClick={() => onApproveStory(st)}
                        disabled={processingId === st.id}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Setujui</span>
                      </button>
                    )}
                    {onDeleteStory && (
                      <button
                        type="button"
                        onClick={() => onDeleteStory(st.id)}
                        disabled={processingId === st.id}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="Hapus cerita"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
