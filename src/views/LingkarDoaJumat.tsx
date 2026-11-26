import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Heart,
  Check,
  Clock,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';
import { PRAYER_SECTIONS } from '../data/bacaanZiarahData';
import {
  getFridayNightWindowInfo,
  formatHonestParticipantLabel,
  maskParticipantInitials,
  buildLingkarDoaPublicPayload,
} from '../lib/lingkarDoa';

const STORAGE_JOINED_WEEK_KEY = 'zn_lingkar_doa_joined_week_v1';
const STORAGE_LOCAL_NOTE_KEY = 'zn_lingkar_doa_local_note_v1';

interface LingkarDoaRecentEntry {
  id: string;
  displayName: string;
}

export const LingkarDoaJumat: React.FC = () => {
  const windowInfo = useMemo(() => getFridayNightWindowInfo(), []);

  const [participantCount, setParticipantCount] = useState<number>(0);
  const [recentEntries, setRecentEntries] = useState<LingkarDoaRecentEntry[]>([]);
  const [isLoadingCount, setIsLoadingCount] = useState<boolean>(true);

  const [displayName, setDisplayName] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  const [hasJoinedThisWeek, setHasJoinedThisWeek] = useState<boolean>(() => {
    try {
      return (
        localStorage.getItem(STORAGE_JOINED_WEEK_KEY) === windowInfo.weekKey
      );
    } catch {
      return false;
    }
  });

  // Tasbih 33x Istighfar counter
  const [istighfarCount, setIstighfarCount] = useState<number>(0);

  useEffect(() => {
    let active = true;
    const fetchRealWeekEntries = async () => {
      try {
        const [{ db }, { collection, query, where, getDocs, limit }] =
          await Promise.all([
            import('../lib/firebase'),
            import('firebase/firestore'),
          ]);
        const q = query(
          collection(db, 'lingkar_doa_entries'),
          where('weekKey', '==', windowInfo.weekKey),
          limit(200)
        );
        const snap = await getDocs(q);
        if (!active) return;

        setParticipantCount(snap.size);
        const items: LingkarDoaRecentEntry[] = [];
        snap.forEach((docSnap) => {
          const d = docSnap.data();
          if (typeof d.displayName === 'string') {
            items.push({
              id: docSnap.id,
              displayName: maskParticipantInitials(d.displayName),
            });
          }
        });
        setRecentEntries(items.slice(0, 12));
      } catch {
        // Keep honest 0 fallback if offline
      } finally {
        if (active) setIsLoadingCount(false);
      }
    };

    fetchRealWeekEntries();
    return () => {
      active = false;
    };
  }, [windowInfo.weekKey]);

  const handleJoinCircle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasJoinedThisWeek || isSubmitting) return;

    const cleanName =
      displayName.replace(/\s+/g, ' ').trim().slice(0, 60) || 'Hamba Allah';
    const cleanNote = note.replace(/\s+/g, ' ').trim().slice(0, 160);

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      if (cleanNote.length > 0) {
        try {
          localStorage.setItem(STORAGE_LOCAL_NOTE_KEY, cleanNote);
        } catch {}
      }

      const [{ db }, { collection, doc, setDoc, serverTimestamp }] =
        await Promise.all([
          import('../lib/firebase'),
          import('firebase/firestore'),
        ]);
      const newRef = doc(collection(db, 'lingkar_doa_entries'));
      const payload = buildLingkarDoaPublicPayload({
        weekKey: windowInfo.weekKey,
        displayName: cleanName,
        createdAt: serverTimestamp(),
      });

      await setDoc(newRef, payload);

      try {
        localStorage.setItem(STORAGE_JOINED_WEEK_KEY, windowInfo.weekKey);
      } catch {}

      setHasJoinedThisWeek(true);
      setParticipantCount((prev) => prev + 1);
      setRecentEntries((prev) => [
        {
          id: newRef.id,
          displayName: maskParticipantInitials(cleanName),
        },
        ...prev.slice(0, 11),
      ]);
      setSubmitMessage(
        'Alhamdulillah, kehadiran doa Anda pada sesi pekan ini telah tercatat.'
      );
    } catch {
      // Offline / fallback local record
      try {
        localStorage.setItem(STORAGE_JOINED_WEEK_KEY, windowInfo.weekKey);
      } catch {}
      setHasJoinedThisWeek(true);
      setParticipantCount((prev) => prev + 1);
      setSubmitMessage(
        'Alhamdulillah, kehadiran bacaan Anda telah dicatat di perangkat Anda.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const circleSections = useMemo(() => {
    return PRAYER_SECTIONS.filter(
      (s) => s.id === 'TAWASSUL' || s.id === 'TAHLIL' || s.id === 'DOA'
    );
  }, []);

  return (
    <section className="min-h-screen bg-[#FAF8F5] text-stone-900 pb-32 sm:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8">
        {/* Header Lingkar Doa Jumat Malam */}
        <header className="rounded-3xl bg-[#064E3B] text-white p-6 sm:p-10 shadow-sm border border-emerald-950 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-100">
              <Users className="w-4 h-4" />
              <span>LINGKAR DOA JUMAT MALAM • SESI {windowInfo.weekKey}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-emerald-950/70 border border-emerald-700/60 px-3 py-1 rounded-lg text-emerald-100">
              <Clock className="w-3.5 h-3.5" />
              <span>{windowInfo.nextFridayNightLabel}</span>
            </span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight leading-snug">
            Melantunkan Tawassul, Tahlil &amp; Doa Arwah Bersama dari Rumah Masing-Masing
          </h1>
          <p className="text-sm sm:text-base text-emerald-50/90 leading-relaxed max-w-3xl">
            Tradisi mengirim doa bagi orang tua yang telah wafat, para guru, dan Auliya Nusantara
            setiap malam Jumat. Berjalan jujur dan khusyuk tanpa angka rekayasa.
          </p>

          {/* Indikator Partisipan 100% Jujur */}
          <div className="rounded-2xl bg-emerald-950/60 border border-emerald-700/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-200 font-semibold">
                Status Kehadiran Sesi Pekan Ini ({windowInfo.weekKey})
              </p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                {isLoadingCount
                  ? 'Memuat catatan kehadiran jamaah pekan ini...'
                  : formatHonestParticipantLabel(participantCount)}
              </p>
            </div>
            <span className="text-xs text-emerald-100 bg-emerald-900/80 border border-emerald-700 px-3 py-1.5 rounded-xl self-start sm:self-center">
              {windowInfo.windowStatusLabel}
            </span>
          </div>
        </header>

        {/* Tasbih Ringkas Istighfar 33x */}
        <div className="rounded-2xl bg-white border border-stone-200/90 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Pembuka Majelis • Istighfar 33 Kali
            </span>
            <p className="font-arabic text-2xl text-stone-950">
              أَسْتَغْفِرُ اللهَ الْعَظِيمَ
            </p>
            <p className="text-xs text-stone-600">
              &ldquo;Astaghfirullahal-&lsquo;azhim&rdquo; — Ketuk tombol di samping untuk menghitung
              33x istighfar sebelum memulai Tawassul.
            </p>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-center">
            <button
              type="button"
              onClick={() => setIstighfarCount((c) => (c < 33 ? c + 1 : 33))}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#064E3B] hover:bg-emerald-950 text-white text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Hitungan: {istighfarCount} / 33</span>
            </button>
            <button
              type="button"
              onClick={() => setIstighfarCount(0)}
              aria-label="Reset hitungan tasbih"
              className="p-3 rounded-xl border border-stone-300 bg-[#FAF8F5] hover:border-stone-400 text-stone-700 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Rangkaian Bacaan Bersama (Tawassul, Tahlil, Doa Penutup) */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-900" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Urutan Bacaan Lingkar Doa Malam Jumat
            </h2>
          </div>

          {circleSections.map((sec) => (
            <article
              key={sec.id}
              className="rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-5"
            >
              <div className="border-b border-stone-200 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                  {sec.stepLabel}
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                  {sec.title}
                </h3>
                <p className="text-xs text-stone-600 mt-0.5">{sec.subtitle}</p>
              </div>

              <div className="space-y-4" dir="rtl">
                {sec.arabicLines.map((line, idx) => (
                  <p
                    key={idx}
                    className="font-arabic text-2xl sm:text-3xl leading-[2.4] text-stone-950 text-right border-b border-stone-200/60 pb-3 last:border-b-0"
                  >
                    {line}
                  </p>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-200 space-y-2">
                <p className="text-sm font-medium text-emerald-950 leading-relaxed whitespace-pre-line">
                  &ldquo;{sec.latinText}&rdquo;
                </p>
                <p className="text-xs sm:text-sm italic text-stone-600 leading-relaxed">
                  Artinya: &ldquo;{sec.translationText}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Form Pencatatan Kehadiran Nyata ("Saya Ikut Membaca Malam Ini") */}
        <div className="rounded-3xl bg-white border border-stone-300 p-6 sm:p-8 shadow-xs space-y-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
              Presensi Jamaah Jujur • Sesi {windowInfo.weekKey}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Catat Kehadiran Bacaan Anda Malam Ini
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Kehadiran dicatat satu kali per perangkat pada setiap sesi mingguan agar jumlah jamaah
              tetap akurat dan apa adanya.
            </p>
          </div>

          <form onSubmit={handleJoinCircle} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lingkar-display-name"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Nama Anda / Hamba Allah (Opsional)
                </label>
                <input
                  id="lingkar-display-name"
                  type="text"
                  maxLength={60}
                  disabled={hasJoinedThisWeek}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Hamba Allah"
                  className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-stone-900 disabled:opacity-60"
                />
              </div>
              <div>
                <label
                  htmlFor="lingkar-short-note"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Khushushan Pribadi (Opsional • Tersimpan Lokal di Perangkat)
                </label>
                <input
                  id="lingkar-short-note"
                  type="text"
                  maxLength={160}
                  disabled={hasJoinedThisWeek}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: Al-Fatihah untuk Almarhum Ayahanda..."
                  className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-stone-900 disabled:opacity-60"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={hasJoinedThisWeek || isSubmitting}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                hasJoinedThisWeek
                  ? 'bg-emerald-900/15 text-emerald-950 border border-emerald-900/30 cursor-default'
                  : 'bg-[#064E3B] hover:bg-emerald-950 text-white'
              }`}
            >
              <Check className="w-4 h-4" />
              <span>
                {hasJoinedThisWeek
                  ? 'Anda Telah Tercatat Mengikuti Lingkar Doa Pekan Ini'
                  : isSubmitting
                  ? 'Mencatat Kehadiran...'
                  : 'Saya Ikut Membaca Malam Ini'}
              </span>
            </button>

            {submitMessage && (
              <p className="text-xs sm:text-sm font-medium text-emerald-900">
                {submitMessage}
              </p>
            )}
          </form>

          {recentEntries.length > 0 && (
            <div className="pt-4 border-t border-stone-200 space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Inisial Jamaah yang Telah Bergabung Pekan Ini
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {recentEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl bg-[#FAF8F5] border border-stone-200/80 p-3 text-xs flex items-center justify-between"
                  >
                    <p className="font-bold text-stone-900">
                      {maskParticipantInitials(entry.displayName)}
                    </p>
                    <span className="text-[11px] text-emerald-800 font-medium">
                      Hadir Membaca
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SAHABAT ZIARAH (DUKUNGAN SUKARELA TRANSPARAN) */}
        <div className="rounded-3xl bg-white border-2 border-emerald-900/25 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
            <Heart className="w-4 h-4" />
            <span>Sahabat Ziarah • Dukungan Sukarela Transparan</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            Rawat Keberlanjutan Riset 183 Maqbarah &amp; Panduan Doa Gratis
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
            Seluruh bacaan di Lingkar Doa Jumat Malam dapat diakses 100% gratis oleh siapa pun.
            Apabila Anda merasakan manfaat dari khazanah ini, Anda dapat menjadi{' '}
            <strong>Sahabat Ziarah</strong> untuk mendukung biaya server, verifikasi sanad sejarah
            183 makam ulama Nusantara, serta perawatan buku panduan doa agar tetap bebas iklan.
          </p>
          <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-3.5 text-xs text-stone-600 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-900 shrink-0 mt-0.5" />
            <span>
              <strong>Adab Kejujuran:</strong> Infaq bersifat sukarela untuk pemeliharaan
              infrastruktur ilmu dan arsip digital, bukan syarat sah doa dan tidak pernah diklaim
              membuat doa lebih mustajab.
            </span>
          </div>
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <Link
              to="/donasi"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#064E3B] hover:bg-emerald-950 text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <span>Dukung lewat Infaq Operasional (Mulai Rp 2.000)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/buku-yasin"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-stone-300 bg-[#FAF8F5] hover:border-emerald-800 text-stone-800 text-xs sm:text-sm font-semibold transition-colors"
            >
              <span>Susun Buku Tahlil &amp; Doa Arwah Kenangan (A5)</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
