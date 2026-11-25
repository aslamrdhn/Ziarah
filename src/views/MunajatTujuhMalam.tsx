import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Check,
  ShieldCheck,
  Printer,
  Lock,
  ArrowRight,
  MessageCircle,
  Heart,
  FileText,
  Download,
  Share2,
  Loader2,
} from 'lucide-react';
import {
  MUNAJAT_7_MALAM,
  MUNAJAT_EMOTION_LABELS,
  type MunajatEmotionTag,
  type MunajatNightItem,
} from '../data/munajat7Malam';
import { useSites } from '../context/SiteContext';
import { QrisPaymentCard } from '../components/QrisPaymentCard';
import { TransferProofUploadField } from '../components/TransferProofUploadField';
import {
  CompressedReceiptResult,
  submitDonationWithPrivateProof,
  saveVerifiedDonationRecord,
} from '../lib/transferProof';
import {
  DonationTier,
  buildWhatsappConfirmUrl,
  getCachedOrDefaultInfaqConfig,
  parseFirestoreInfaqConfig,
} from '../lib/infaqConfig';
import { getSitePath } from '../lib/siteSlugs';
import {
  downloadBlobFile,
  shareOrDownloadFile,
  isRestrictedWebViewOrIframe,
} from '../lib/directDownload';
import { generateMunajat7MalamPdfBlob } from '../lib/pdfDocumentGenerator';

const STORAGE_UNLOCK_KEY = 'zn_munajat_7_malam_unlocked_v1';
const STORAGE_PROGRESS_KEY = 'zn_munajat_7_malam_progress_v1';
const STORAGE_PERSONAL_KEY = 'zn_munajat_7_malam_personal_v1';

interface PersonalMunajatPrefs {
  personalName: string;
  emotionFocus: MunajatEmotionTag;
  personalReflectionNote: string;
}

export const MunajatTujuhMalam: React.FC = () => {
  const { sites: ziarahSites } = useSites();

  const [personalPrefs, setPersonalPrefs] = useState<PersonalMunajatPrefs>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_PERSONAL_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersonalMunajatPrefs>;
        return {
          personalName: typeof parsed.personalName === 'string' ? parsed.personalName : '',
          emotionFocus:
            parsed.emotionFocus === 'hati_gelisah' ||
            parsed.emotionFocus === 'ikhtiar_rezeki' ||
            parsed.emotionFocus === 'keluarga' ||
            parsed.emotionFocus === 'keteguhan'
              ? parsed.emotionFocus
              : 'hati_gelisah',
          personalReflectionNote:
            typeof parsed.personalReflectionNote === 'string'
              ? parsed.personalReflectionNote
              : '',
        };
      }
    } catch {}
    return {
      personalName: '',
      emotionFocus: 'hati_gelisah',
      personalReflectionNote: '',
    };
  });

  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          return arr.filter((d) => typeof d === 'number' && d >= 1 && d <= 7);
        }
      }
    } catch {}
    return [];
  });

  const [isFullUnlocked, setIsFullUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_UNLOCK_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [printMode, setPrintMode] = useState<'day1' | 'all7'>('all7');
  const [isGeneratingPdfMode, setIsGeneratingPdfMode] = useState<'day1' | 'all7' | null>(
    null
  );
  const [pdfNotice, setPdfNotice] = useState<string | null>(null);
  const isRestrictedEnv = useMemo(() => isRestrictedWebViewOrIframe(), []);

  // Infaq / Unlock configuration state synced with AdminKurator settings/infaq
  const initialInfaqConfig = useMemo(() => getCachedOrDefaultInfaqConfig(), []);
  const [donationTiers, setDonationTiers] = useState<DonationTier[]>(
    initialInfaqConfig.donationTiers
  );
  const [selectedUnlockAmount, setSelectedUnlockAmount] = useState<15000 | 30000>(
    15000
  );
  const [bankInfo, setBankInfo] = useState({
    bankName: initialInfaqConfig.bankName,
    accountNumber: initialInfaqConfig.accountNumber,
    accountHolder: initialInfaqConfig.accountHolder,
    qrisPayload: initialInfaqConfig.qrisPayload,
    whatsappConfirmNumber: initialInfaqConfig.whatsappConfirmNumber,
    whatsappMessageTemplate: initialInfaqConfig.whatsappMessageTemplate,
  });

  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank'>(
    'QRIS'
  );
  const [senderAccount, setSenderAccount] = useState('');
  const [receipt, setReceipt] = useState<CompressedReceiptResult | null>(null);
  const [agreedToAkad, setAgreedToAkad] = useState(false);
  const [unlockNotice, setUnlockNotice] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadSettings = async () => {
      try {
        const [{ db }, { doc, getDoc }] = await Promise.all([
          import('../lib/firebase'),
          import('firebase/firestore'),
        ]);
        const snap = await getDoc(doc(db, 'settings', 'infaq'));
        if (!active || !snap.exists()) return;
        const parsed = parseFirestoreInfaqConfig(snap.data());
        setDonationTiers(parsed.donationTiers);
        setBankInfo({
          bankName: parsed.bankName,
          accountNumber: parsed.accountNumber,
          accountHolder: parsed.accountHolder,
          qrisPayload: parsed.qrisPayload,
          whatsappConfirmNumber: parsed.whatsappConfirmNumber,
          whatsappMessageTemplate: parsed.whatsappMessageTemplate,
        });
      } catch {
        // Fallback to local cached/default settings gracefully
      }
    };
    loadSettings();
    return () => {
      active = false;
    };
  }, []);

  const updatePersonalPrefs = (patch: Partial<PersonalMunajatPrefs>) => {
    setPersonalPrefs((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_PERSONAL_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const toggleDayCompleted = (day: number) => {
    setCompletedDays((prev) => {
      const exists = prev.includes(day);
      const next = exists ? prev.filter((d) => d !== day) : [...prev, day];
      try {
        localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const activeTier = useMemo(() => {
    return (
      donationTiers.find((t) => t.amount === selectedUnlockAmount) || {
        amount: selectedUnlockAmount,
        label:
          selectedUnlockAmount === 30000
            ? 'Sahabat Ziarah'
            : 'Riset Sanad',
      }
    );
  }, [donationTiers, selectedUnlockAmount]);

  const sitePathById = useMemo(() => {
    const map = new Map<string, string>();
    for (const s of ziarahSites) {
      if (s && s.id) {
        map.set(s.id, getSitePath(s));
      }
    }
    return map;
  }, [ziarahSites]);

  const handleUnlockComplete = async () => {
    setIsFullUnlocked(true);
    try {
      localStorage.setItem(STORAGE_UNLOCK_KEY, 'true');
    } catch {}
    setUnlockNotice(
      receipt
        ? `Alhamdulillah, Buku Saku Panduan Munajat 7 Malam telah terbuka penuh dan bukti transfer Anda (#${receipt.referenceCode}) sedang dicatat ke sistem verifikasi Dewan Kurator.`
        : 'Alhamdulillah, Buku Saku Panduan Munajat 7 Malam (Malam ke-1 s/d ke-7) telah terbuka sepenuhnya di perangkat Anda.'
    );

    if (receipt && receipt.dataUrl) {
      try {
        const cleanDonor =
          personalPrefs.personalName.trim() ||
          senderAccount.trim() ||
          'Hamba Allah';
        const donationId = await submitDonationWithPrivateProof({
          programId: 'buku-saku-munajat-7-malam',
          programTitle: 'Buku Saku Panduan Munajat 7 Malam',
          siteId: 'munajat-7-malam',
          siteName: 'Panduan Munajat & Muhasabah 7 Malam',
          amount: selectedUnlockAmount,
          donorName: cleanDonor,
          paymentMethod,
          senderAccount: senderAccount.trim() || cleanDonor,
          receipt,
          isAnonymous: !personalPrefs.personalName.trim(),
          showPublicly: Boolean(personalPrefs.personalName.trim()),
          consentAkad: true,
          consentVersion: '2026-11-25',
          consentAt: new Date().toISOString(),
          doaHajat:
            personalPrefs.personalReflectionNote.trim() ||
            'Ikhtiar batin & munajat 7 malam keluarga.',
        });
        saveVerifiedDonationRecord({
          donationId,
          siteId: 'munajat-7-malam',
          programId: 'buku-saku-munajat-7-malam',
          amount: selectedUnlockAmount,
        });
      } catch {
        // Keep unlocked locally even if offline
      }
    }
  };

  const handleDownloadMunajatPdf = async (mode: 'day1' | 'all7') => {
    setIsGeneratingPdfMode(mode);
    setPdfNotice(null);
    try {
      const blob = await generateMunajat7MalamPdfBlob({
        peziarahName: personalPrefs.personalName,
        personalHajat: personalPrefs.personalReflectionNote,
        nights: MUNAJAT_7_MALAM,
        mode,
      });
      const filename =
        mode === 'day1'
          ? 'munajat-malam-1-ziarah-nusantara.pdf'
          : 'buku-saku-munajat-7-malam-ziarah-nusantara.pdf';
      await downloadBlobFile(blob, filename);
      setPdfNotice(`Berkas ${filename} berhasil diunduh ke perangkat Anda.`);
    } catch (err: any) {
      setPdfNotice(err?.message || 'Gagal menyiapkan berkas PDF.');
    } finally {
      setIsGeneratingPdfMode(null);
    }
  };

  const handleShareMunajatPdf = async (mode: 'day1' | 'all7') => {
    setIsGeneratingPdfMode(mode);
    setPdfNotice(null);
    try {
      const blob = await generateMunajat7MalamPdfBlob({
        peziarahName: personalPrefs.personalName,
        personalHajat: personalPrefs.personalReflectionNote,
        nights: MUNAJAT_7_MALAM,
        mode,
      });
      const filename =
        mode === 'day1'
          ? 'munajat-malam-1-ziarah-nusantara.pdf'
          : 'buku-saku-munajat-7-malam-ziarah-nusantara.pdf';
      await shareOrDownloadFile(
        blob,
        filename,
        mode === 'day1'
          ? 'Lembar Munajat Malam ke-1 — Ziarah Nusantara'
          : 'Buku Saku Munajat 7 Malam — Ziarah Nusantara'
      );
      setPdfNotice(`Berkas ${filename} siap disimpan atau dibagikan.`);
    } catch (err: any) {
      setPdfNotice(err?.message || 'Gagal membagikan berkas PDF.');
    } finally {
      setIsGeneratingPdfMode(null);
    }
  };

  const handleDirectPrint = (mode: 'day1' | 'all7') => {
    setPrintMode(mode);
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
  };

  const whatsappConfirmUrl = useMemo(() => {
    return buildWhatsappConfirmUrl({
      whatsappNumber: bankInfo.whatsappConfirmNumber,
      donorName: personalPrefs.personalName || senderAccount || 'Hamba Allah',
      amount: selectedUnlockAmount,
      programTitle: 'Buku Saku Panduan Munajat 7 Malam',
      siteName: 'Khazanah Wirid & Hikmah Ulama Nusantara',
      bankName: bankInfo.bankName,
      accountNumber: bankInfo.accountNumber,
      template: bankInfo.whatsappMessageTemplate,
    });
  }, [
    bankInfo,
    personalPrefs.personalName,
    senderAccount,
    selectedUnlockAmount,
  ]);

  const night1 = MUNAJAT_7_MALAM[0];
  const nights2To7 = MUNAJAT_7_MALAM.slice(1);

  const renderNightCard = (item: MunajatNightItem, isPrintView = false) => {
    const isDone = completedDays.includes(item.day);
    const sitePath =
      sitePathById.get(item.relatedSiteId) || `/situs/${item.relatedSiteId}`;
    const isHighlightedByFocus = item.emotionTag === personalPrefs.emotionFocus;

    return (
      <article
        key={`${item.day}-${isPrintView ? 'print' : 'screen'}`}
        className={`rounded-2xl border p-6 sm:p-8 transition-colors ${
          isPrintView
            ? 'bg-white border-stone-300 break-inside-avoid mb-6'
            : isHighlightedByFocus
            ? 'bg-white border-emerald-800/40 shadow-sm'
            : 'bg-white border-stone-200/90 shadow-xs'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200/80">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-[#064E3B] text-white">
                Malam ke-{item.day}
              </span>
              <span className="text-xs font-medium text-stone-600">
                Sumber Sahih: {item.sourceRef}
              </span>
              {isHighlightedByFocus && !isPrintView && (
                <span className="text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                  Sesuai Fokus Batin Anda
                </span>
              )}
            </div>
            <h3 className="mt-2 font-serif text-xl sm:text-2xl font-bold text-stone-900">
              {item.title}
            </h3>
          </div>

          {!isPrintView && (
            <button
              type="button"
              onClick={() => toggleDayCompleted(item.day)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isDone
                  ? 'bg-emerald-900 text-white border-emerald-900'
                  : 'bg-[#FAF8F5] text-stone-700 border-stone-300 hover:border-emerald-800'
              }`}
            >
              <Check className="w-3.5 h-3.5" strokeWidth={2} />
              <span>{isDone ? 'Selesai Diamalkan' : 'Tandai Selesai Malam Ini'}</span>
            </button>
          )}
        </div>

        {/* Kalimat Thayyibah / Ayat Al-Qur'an / Doa Nabawi */}
        <div className="my-6 rounded-xl bg-[#FAF8F5] border border-stone-200/80 p-5 sm:p-6">
          <p
            dir="rtl"
            className="font-arabic text-2xl sm:text-3xl leading-[2.4] text-stone-950 text-right sm:text-center"
          >
            {item.arabic}
          </p>
          <p className="mt-4 text-sm sm:text-base font-medium text-emerald-950 leading-relaxed sm:text-center">
            &ldquo;{item.latin}&rdquo;
          </p>
          <p className="mt-2 text-xs sm:text-sm italic text-stone-700 leading-relaxed sm:text-center max-w-2xl mx-auto">
            Artinya: &ldquo;{item.translation}&rdquo; ({item.sourceRef})
          </p>
        </div>

        {/* Refleksi Keteladanan Ulama Nusantara */}
        <div className="space-y-4">
          <div className="rounded-xl border border-stone-200/80 bg-white p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-900">
                Keteladanan Ulama: {item.relatedUlamaName}
              </span>
              {!isPrintView && (
                <Link
                  to={sitePath}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
                >
                  <span>Lihat Maqbarah &amp; Sanad Sejarah</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
            <p className="text-xs font-semibold text-stone-700 mb-1.5">
              {item.relatedWisdomTitle}
            </p>
            <p className="text-sm text-stone-700 leading-relaxed">
              {item.reflection}
            </p>
          </div>

          {/* Langkah Ikhtiar Nyata Esok Pagi */}
          <div className="rounded-xl bg-emerald-950/5 border border-emerald-900/20 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-950 mb-1">
              Langkah Ikhtiar Nyata Esok Hari
            </p>
            <p className="text-sm text-stone-800 leading-relaxed">
              {item.actionStep}
            </p>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section className="min-h-screen bg-[#FAF8F5] text-stone-900 pb-32 sm:pb-16">
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #111827 !important;
          }
          nav, footer, .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
        }
      `}</style>

      {/* =====================================================================
          SCREEN VIEW (NO-PRINT WHEN PRINTING FULL BOOK)
          ===================================================================== */}
      <div className="no-print max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8">
        {/* Header Teduh & Etika Tauhid */}
        <header className="rounded-3xl bg-[#064E3B] text-white p-6 sm:p-10 shadow-sm border border-emerald-950">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-100 mb-3">
            <BookOpen className="w-4 h-4" />
            <span>PANDUAN MUNAJAT &amp; MUHASABAH 7 MALAM</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight leading-snug">
            Ruang Jeda Batin Berbasis Ayat Al-Qur’an, Doa Nabawi &amp; Hikmah Ulama Nusantara
          </h1>
          <p className="mt-3 text-sm sm:text-base text-emerald-50/90 leading-relaxed max-w-3xl">
            Disusun bagi peziarah dan keluarga yang sedang membutuhkan ketenangan hati, keteguhan
            ikhtiar rezeki halal, serta keteduhan rumah tangga—tanpa janji klenik dan tanpa jalan pintas.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-emerald-950/60 border border-emerald-700/50 p-3.5 leading-relaxed text-emerald-50">
              <strong className="block font-semibold text-white mb-0.5">
                Prinsip Adab &amp; Tauhid Murni
              </strong>
              Ketenangan, kelapangan rezeki, dan pertolongan semata-mata milik Allah SWT. Wirid,
              doa, dan teladan ulama adalah ikhtiar batin untuk menguatkan langkah ikhtiar lahir
              Anda sehari-hari.
            </div>
            <div className="rounded-xl bg-emerald-950/60 border border-emerald-700/50 p-3.5 leading-relaxed text-emerald-50">
              <strong className="block font-semibold text-white mb-0.5">
                Privasi Lokal 100% (Kepatuhan UU PDP)
              </strong>
              Nama pribadi, fokus munajat, dan catatan muhasabah Anda hanya disimpan di memori
              peramban perangkat ini (localStorage) dan tidak pernah dikirim ke server.
            </div>
          </div>
        </header>

        {/* Form Personalisasi Ringan (100% Lokal di Browser) */}
        <div className="rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-4">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                Personalisasi Lembar Munajat Anda (Tersimpan di Perangkat)
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Nama yang Anda tulis akan tertera pada sampul lembar cetak PDF Buku Saku 7 Malam.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg self-start sm:self-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Privasi Perangkat Lokal</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="munajat-personal-name"
                className="block text-xs font-semibold text-stone-700 mb-1.5"
              >
                Nama Pribadi / Keluarga (Opsional)
              </label>
              <input
                id="munajat-personal-name"
                type="text"
                maxLength={80}
                value={personalPrefs.personalName}
                onChange={(e) =>
                  updatePersonalPrefs({ personalName: e.target.value })
                }
                placeholder="Contoh: Keluarga Bapak Ahmad / Hamba Allah"
                className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
              />
            </div>

            <div>
              <label
                htmlFor="munajat-reflection-note"
                className="block text-xs font-semibold text-stone-700 mb-1.5"
              >
                Catatan Niat &amp; Muhasabah Pribadi (Opsional)
              </label>
              <input
                id="munajat-reflection-note"
                type="text"
                maxLength={140}
                value={personalPrefs.personalReflectionNote}
                onChange={(e) =>
                  updatePersonalPrefs({
                    personalReflectionNote: e.target.value,
                  })
                }
                placeholder="Contoh: Memohon ketenangan hati & kelancaran ikhtiar keluarga"
                className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
              />
            </div>
          </div>

          <div>
            <span className="block text-xs font-semibold text-stone-700 mb-2">
              Pilih Fokus Kondisi Batin Malam Ini
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(
                Object.keys(MUNAJAT_EMOTION_LABELS) as MunajatEmotionTag[]
              ).map((tag) => {
                const info = MUNAJAT_EMOTION_LABELS[tag];
                const isSelected = personalPrefs.emotionFocus === tag;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => updatePersonalPrefs({ emotionFocus: tag })}
                    className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950 text-white border-emerald-950'
                        : 'bg-[#FAF8F5] text-stone-800 border-stone-200/90 hover:border-stone-400'
                    }`}
                  >
                    <p className="text-xs sm:text-sm font-bold">{info.label}</p>
                    <p
                      className={`text-xs mt-0.5 leading-relaxed ${
                        isSelected ? 'text-emerald-100' : 'text-stone-600'
                      }`}
                    >
                      {info.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* MALAM KE-1: 100% TERBUKA & GRATIS */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Akses Terbuka Gratis • Malam Pertama
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Mulai Amalan Malam ke-1 Sekarang
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleDownloadMunajatPdf('day1')}
                disabled={isGeneratingPdfMode !== null}
                className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#064E3B] hover:bg-emerald-950 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer disabled:opacity-60"
              >
                {isGeneratingPdfMode === 'day1' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyiapkan PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Unduh File PDF (.PDF) Malam ke-1</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => handleShareMunajatPdf('day1')}
                disabled={isGeneratingPdfMode !== null}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-800 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan / Simpan ke HP</span>
              </button>

              <button
                type="button"
                onClick={() => handleDirectPrint('day1')}
                className="min-h-[44px] inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white hover:border-emerald-800 text-xs font-semibold text-stone-800 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-800" />
                <span>Cetak Langsung (Printer)</span>
              </button>
            </div>
          </div>

          {pdfNotice && (
            <p className="text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2">
              {pdfNotice}
            </p>
          )}

          {isRestrictedEnv && (
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Jika unduhan tertahan oleh browser in-app, ketuk tombol{' '}
              <strong>Bagikan / Simpan ke HP</strong> atau buka di Chrome/Safari.
            </p>
          )}

          {renderNightCard(night1, false)}
        </div>

        {/* MALAM KE-2 S/D KE-7: TERKUNCI ATAU TERBUKA PENUH */}
        {isFullUnlocked ? (
          <div className="space-y-6 pt-4">
            <div className="rounded-2xl bg-emerald-900 text-white p-5 sm:p-6 flex flex-col gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">
                  Buku Saku 7 Malam Aktif
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold mt-0.5">
                  Seluruh Panduan Malam ke-1 hingga Malam ke-7 Telah Terbuka
                </h2>
                {unlockNotice && (
                  <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                    {unlockNotice}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleDownloadMunajatPdf('all7')}
                  disabled={isGeneratingPdfMode !== null}
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-emerald-950 hover:bg-stone-100 text-xs sm:text-sm font-bold transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isGeneratingPdfMode === 'all7' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyiapkan PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Unduh File PDF (.PDF) 7 Malam Lengkap</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => handleShareMunajatPdf('all7')}
                  disabled={isGeneratingPdfMode !== null}
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600 text-xs sm:text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan / Simpan ke HP</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDirectPrint('all7')}
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-950 text-emerald-100 border border-emerald-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Langsung (Printer)</span>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {nights2To7.map((item) => renderNightCard(item, false))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 pt-4">
            {/* Ringkasan Jujur Malam 2 s/d 7 */}
            <div className="rounded-2xl bg-white border border-stone-200/90 p-6 sm:p-8 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Pratinjau Kurikulum 6 Malam Berikutnya
                  </span>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                    Rangkaian Malam ke-2 hingga Malam ke-7
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Setiap malam dilengkapi teks Arab berharakat lengkap, transliterasi Latin,
                    sumber ayat/hadits sahih, refleksi keteladanan ulama Nusantara, dan langkah
                    ikhtiar nyata esok hari.
                  </p>
                </div>
                <Lock className="w-5 h-5 text-stone-400 shrink-0 mt-1" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nights2To7.map((item) => (
                  <div
                    key={item.day}
                    className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-emerald-900">
                          Malam ke-{item.day}
                        </span>
                        <span className="text-[11px] font-medium text-stone-600">
                          {item.sourceRef}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-stone-900 mt-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1">
                        Teladan: {item.relatedUlamaName} — {item.relatedWisdomTitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kartu Buka Paket Utuh 7 Malam + Cetak Buku Saku PDF */}
            <div className="rounded-3xl bg-white border-2 border-emerald-900/30 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-stone-200 pb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
                  <Heart className="w-3.5 h-3.5" />
                  <span>Infaq Perawatan Arsip &amp; Buku Saku PDF</span>
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  Buka Paket Utuh 7 Malam + Cetak Buku Saku PDF Ber-Nama Pribadi
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                  Seluruh infaq Anda disalurkan untuk biaya server, pemeliharaan direktori 183
                  maqbarah ulama Nusantara, dan riset literatur sanad agar panduan doa tetap bebas
                  iklan komersial.
                </p>
              </div>

              {/* Pilihan 2 Nominal Pasti Sesuai infaqConfig */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-2">
                  Pilih Nominal Infaq Buku Saku 7 Malam (QRIS Nominal Pasti Terkunci)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {([15000, 30000] as const).map((amt) => {
                    const tierObj = donationTiers.find((t) => t.amount === amt);
                    const isSelected = selectedUnlockAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedUnlockAmount(amt)}
                        className={`p-4 rounded-2xl border text-left transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950 text-white border-emerald-950'
                            : 'bg-[#FAF8F5] text-stone-900 border-stone-300 hover:border-emerald-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">
                            Rp {amt.toLocaleString('id-ID')}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                              isSelected
                                ? 'bg-emerald-800 text-emerald-100'
                                : 'bg-stone-200 text-stone-700'
                            }`}
                          >
                            {tierObj?.label ||
                              (amt === 30000 ? 'Sahabat Ziarah' : 'Riset Sanad')}
                          </span>
                        </div>
                        <p
                          className={`text-xs mt-1.5 ${
                            isSelected ? 'text-emerald-100' : 'text-stone-600'
                          }`}
                        >
                          {amt === 15000
                            ? 'Membuka Malam ke-2 s/d ke-7 & fitur cetak Buku Saku PDF'
                            : 'Membuka Buku Saku 7 Malam + dukungan penuh riset sanad & server'}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* QRIS Payment Card / Transfer Bank */}
              {paymentMethod === 'QRIS' ? (
                <QrisPaymentCard
                  qrisPayload={bankInfo.qrisPayload}
                  selectedAmount={activeTier.amount}
                  tierLabel={activeTier.label}
                  customTierQrisPayload={activeTier.customQrisPayload}
                  customTierQrisImageUrl={activeTier.customQrisImageUrl}
                />
              ) : (
                <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                    Transfer Rekening Resmi Pemeliharaan Digital
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-white p-4 rounded-xl border border-stone-200">
                    <div>
                      <p className="text-xs text-stone-500">{bankInfo.bankName}</p>
                      <p className="text-lg font-mono font-bold text-stone-900">
                        {bankInfo.accountNumber}
                      </p>
                      <p className="text-xs text-stone-700">
                        a.n. {bankInfo.accountHolder}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-stone-500">Nominal Infaq</p>
                      <p className="text-base font-bold text-emerald-900">
                        Rp {selectedUnlockAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Bukti / Honor System */}
              <TransferProofUploadField
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                senderAccount={senderAccount}
                onSenderAccountChange={setSenderAccount}
                receipt={receipt}
                onReceiptChange={setReceipt}
                agreedToAkad={agreedToAkad}
                onAgreedToAkadChange={setAgreedToAkad}
                requiredForUnlock={false}
              />

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleUnlockComplete}
                  disabled={!agreedToAkad && !receipt}
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                    agreedToAkad || receipt
                      ? 'bg-[#064E3B] hover:bg-emerald-950 text-white'
                      : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>
                    {receipt
                      ? 'Bukti Terlampir — Buka & Cetak Buku Saku 7 Malam'
                      : 'Centang Akad Infaq di Atas untuk Membuka Buku Saku 7 Malam'}
                  </span>
                </button>

                {whatsappConfirmUrl && (
                  <a
                    href={whatsappConfirmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-emerald-800 text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-semibold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Konfirmasi via WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          PRINT-ONLY LAYOUT (SAMPUL PRIBADI + 1 MALAM ATAU 7 MALAM PENUH)
          ===================================================================== */}
      <div className="hidden print-only max-w-3xl mx-auto p-6">
        <div className="border-2 border-stone-800 rounded-2xl p-8 mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-600">
            KHZANAH WIRID &amp; MUHASABAH ZIARAH NUSANTARA
          </p>
          <h1 className="font-serif text-3xl font-bold text-stone-950 mt-2">
            {printMode === 'day1'
              ? 'Lembar Munajat Malam ke-1 — Melepas Lelah & Istighfar'
              : 'Buku Saku Panduan Munajat & Muhasabah 7 Malam'}
          </h1>
          <p className="text-sm text-stone-700 mt-2">
            Disusun khusus untuk:{' '}
            <strong>
              {personalPrefs.personalName.trim() || 'Hamba Allah / Keluarga'}
            </strong>
          </p>
          {personalPrefs.personalReflectionNote.trim() && (
            <p className="text-xs italic text-stone-600 mt-1">
              Niat &amp; Catatan Batin: &ldquo;{personalPrefs.personalReflectionNote.trim()}&rdquo;
            </p>
          )}
          <div className="mt-4 pt-4 border-t border-stone-300 text-xs text-stone-600 leading-relaxed">
            Ketenangan, kelapangan rezeki, dan pertolongan semata-mata milik Allah SWT. Wirid dan
            doa di dalam buku saku ini adalah ikhtiar batin untuk menguatkan langkah ikhtiar lahir
            sehari-hari.
          </div>
        </div>

        {printMode === 'day1'
          ? renderNightCard(night1, true)
          : MUNAJAT_7_MALAM.map((item) => renderNightCard(item, true))}
      </div>
    </section>
  );
};
