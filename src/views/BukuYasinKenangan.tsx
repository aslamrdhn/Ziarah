import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Printer,
  Upload,
  Trash2,
  ShieldCheck,
  MessageCircle,
  Heart,
  FileText,
  AlertCircle,
  Download,
  Share2,
  Loader2,
} from 'lucide-react';
import { PRAYER_SECTIONS } from '../data/bacaanZiarahData';
import {
  SURAH_YASIN_VERSES,
  isCompleteVerifiedYasin,
} from '../data/surahYasin';
import {
  sanitizeYasinMemorialInput,
  validateLocalMemorialPhoto,
  buildYasinPhysicalPrintWaUrl,
  DEFAULT_FAMILY_GREETING,
  type LineageRelation,
  type YasinCoverTheme,
  type CommemorationEventPreset,
} from '../lib/yasinBookBuilder';
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
import { compressLocalImageFile } from '../lib/clientImageCompressor';
import {
  downloadBlobFile,
  shareOrDownloadFile,
  isRestrictedWebViewOrIframe,
} from '../lib/directDownload';
import { generateBukuYasinPdfBlob } from '../lib/pdfDocumentGenerator';

const EVENT_PRESETS: CommemorationEventPreset[] = [
  'Mengenang 7 Hari',
  'Mengenang 40 Hari',
  'Mengenang 100 Hari',
  'Mengenang 1000 Hari',
  'Haul',
  'Custom',
];

const THEME_OPTIONS: {
  id: YasinCoverTheme;
  label: string;
  previewBg: string;
  previewText: string;
  previewBorder: string;
  accentHex: string;
}[] = [
  {
    id: 'emerald-classic',
    label: 'Hijau Zamrud Klasik',
    previewBg: 'bg-[#064E3B]',
    previewText: 'text-white',
    previewBorder: 'border-emerald-950',
    accentHex: '#064E3B',
  },
  {
    id: 'ivory-gold',
    label: 'Krem Gading Teduh',
    previewBg: 'bg-[#FAF8F5]',
    previewText: 'text-stone-900',
    previewBorder: 'border-stone-400',
    accentHex: '#78350F',
  },
  {
    id: 'midnight-calm',
    label: 'Malam Khusyuk',
    previewBg: 'bg-slate-900',
    previewText: 'text-stone-100',
    previewBorder: 'border-slate-700',
    accentHex: '#0F172A',
  },
];

export const BukuYasinKenangan: React.FC = () => {
  const [deceasedName, setDeceasedName] = useState('');
  const [lineageRelation, setLineageRelation] = useState<LineageRelation>('bin');
  const [parentName, setParentName] = useState('');
  const [birthDateText, setBirthDateText] = useState('');
  const [deathDateText, setDeathDateText] = useState('');
  const [eventPreset, setEventPreset] =
    useState<CommemorationEventPreset>('Mengenang 40 Hari');
  const [customEventLabel, setCustomEventLabel] = useState('');
  const [familyGreeting, setFamilyGreeting] = useState(DEFAULT_FAMILY_GREETING);
  const [familyNamesFooter, setFamilyNamesFooter] = useState('');
  const [theme, setTheme] = useState<YasinCoverTheme>('emerald-classic');

  // Local-only memorial photo (100% browser memory, compressed <250KB, never uploaded to server)
  const [localPhotoDataUrl, setLocalPhotoDataUrl] = useState<string | null>(null);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  // Economic Path A (Self-Print A5 PDF after Rp 30.000 infaq)
  const [isPdfUnlocked, setIsPdfUnlocked] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfStatusNotice, setPdfStatusNotice] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'QRIS' | 'Transfer Bank'>(
    'QRIS'
  );
  const [senderAccount, setSenderAccount] = useState('');
  const [receipt, setReceipt] = useState<CompressedReceiptResult | null>(null);
  const [agreedToAkad, setAgreedToAkad] = useState(false);

  // Economic Path B (Physical Print Consultation via WhatsApp)
  const [copiesCount, setCopiesCount] = useState<number>(50);
  const [deliveryCity, setDeliveryCity] = useState<string>('');

  const isRestrictedEnv = useMemo(() => isRestrictedWebViewOrIframe(), []);

  // Infaq settings synced with AdminKurator settings/infaq & local cache
  const initialInfaqConfig = useMemo(() => getCachedOrDefaultInfaqConfig(), []);
  const [donationTiers, setDonationTiers] = useState<DonationTier[]>(
    initialInfaqConfig.donationTiers
  );
  const [bankInfo, setBankInfo] = useState({
    bankName: initialInfaqConfig.bankName,
    accountNumber: initialInfaqConfig.accountNumber,
    accountHolder: initialInfaqConfig.accountHolder,
    qrisPayload: initialInfaqConfig.qrisPayload,
    whatsappConfirmNumber: initialInfaqConfig.whatsappConfirmNumber,
    whatsappMessageTemplate: initialInfaqConfig.whatsappMessageTemplate,
  });

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
      } catch {}
    };
    loadSettings();
    return () => {
      active = false;
    };
  }, []);

  const memorial = useMemo(() => {
    return sanitizeYasinMemorialInput({
      deceasedName,
      lineageRelation,
      parentName,
      birthDateText,
      deathDateText,
      eventPreset,
      customEventLabel,
      familyGreeting,
      familyNamesFooter,
      theme,
    });
  }, [
    deceasedName,
    lineageRelation,
    parentName,
    birthDateText,
    deathDateText,
    eventPreset,
    customEventLabel,
    familyGreeting,
    familyNamesFooter,
    theme,
  ]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    const validation = validateLocalMemorialPhoto(file);
    if (!validation.valid) {
      setPhotoError(validation.error || 'Berkas foto tidak valid.');
      return;
    }

    setPhotoError(null);
    setIsProcessingPhoto(true);
    try {
      const compressed = await compressLocalImageFile(file, {
        maxDimension: 900,
        maxBytes: 250 * 1024,
      });
      setLocalPhotoDataUrl(compressed.dataUrl);
    } catch (err: any) {
      setPhotoError(err?.message || 'Gagal memproses berkas foto di peramban Anda.');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const tier30k = useMemo(() => {
    return (
      donationTiers.find((t) => t.amount === 30000) || {
        amount: 30000,
        label: 'Sahabat Ziarah',
      }
    );
  }, [donationTiers]);

  const memorialSections = useMemo(() => {
    return PRAYER_SECTIONS.filter(
      (s) => s.id === 'TAWASSUL' || s.id === 'TAHLIL' || s.id === 'DOA'
    );
  }, []);

  const hasVerifiedYasin83 = useMemo(() => {
    return isCompleteVerifiedYasin(SURAH_YASIN_VERSES);
  }, []);

  const physicalPrintWaUrl = useMemo(() => {
    return buildYasinPhysicalPrintWaUrl({
      whatsappConfirmNumber: bankInfo.whatsappConfirmNumber,
      memorial,
      copiesCount,
      deliveryCity,
    });
  }, [bankInfo.whatsappConfirmNumber, memorial, copiesCount, deliveryCity]);

  const pdfConfirmWaUrl = useMemo(() => {
    return buildWhatsappConfirmUrl({
      whatsappNumber: bankInfo.whatsappConfirmNumber,
      donorName: senderAccount || memorial.familyNamesFooter || 'Keluarga',
      amount: 30000,
      programTitle: `Buku Tahlil & Doa Arwah Kenangan A5 (${memorial.fullLineageLabel})`,
      siteName: memorial.eventLabel,
      bankName: bankInfo.bankName,
      accountNumber: bankInfo.accountNumber,
      template: bankInfo.whatsappMessageTemplate,
    });
  }, [bankInfo, senderAccount, memorial]);

  const activeThemeStyle =
    THEME_OPTIONS.find((t) => t.id === memorial.theme) || THEME_OPTIONS[0];

  const recordBukuYasinDonation = async () => {
    if (receipt && receipt.dataUrl) {
      try {
        const cleanDonor =
          senderAccount.trim() ||
          memorial.familyNamesFooter ||
          'Keluarga Peziarah';
        const donationId = await submitDonationWithPrivateProof({
          programId: 'buku-yasin-a5',
          programTitle: 'Buku Tahlil & Doa Arwah Kenangan A5',
          siteId: 'buku-yasin',
          siteName: `${memorial.eventLabel} — ${memorial.fullLineageLabel}`.slice(
            0,
            150
          ),
          amount: tier30k.amount,
          donorName: cleanDonor,
          paymentMethod,
          senderAccount: senderAccount.trim() || cleanDonor,
          receipt,
          isAnonymous: false,
          showPublicly: true,
          consentAkad: true,
          consentVersion: '2026-11-25',
          consentAt: new Date().toISOString(),
          doaHajat: `Al-Fatihah & Doa Arwah untuk ${memorial.fullLineageLabel}`,
        });
        saveVerifiedDonationRecord({
          donationId,
          siteId: 'buku-yasin',
          programId: 'buku-yasin-a5',
          amount: tier30k.amount,
        });
      } catch {
        // Keep unlocked locally even if offline
      }
    }
  };

  const buildCurrentBukuYasinPdfBlob = async (): Promise<{
    blob: Blob;
    filename: string;
  }> => {
    const prefix = memorial.lineageRelation === 'binti' ? 'Almarhumah' : 'Almarhum';
    const blob = await generateBukuYasinPdfBlob({
      almarhumPrefix: prefix,
      almarhumName: memorial.deceasedName,
      nasabLabel: memorial.lineageRelation,
      parentName: memorial.parentName,
      birthYear: memorial.birthDateText,
      passingDate: memorial.deathDateText,
      eventLabel: memorial.eventLabel,
      familyNames: memorial.familyNamesFooter,
      customPrayerNote: memorial.familyGreeting,
      localPhotoDataUrl,
      includeFullYasin83: hasVerifiedYasin83,
      themeAccentColor: activeThemeStyle.accentHex,
    });
    const slugName = (memorial.deceasedName || 'almarhum')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return {
      blob,
      filename: `buku-tahlil-doa-a5-${slugName || 'kenangan'}.pdf`,
    };
  };

  const handleDownloadPdf = async () => {
    setIsPdfUnlocked(true);
    setIsGeneratingPdf(true);
    setPdfStatusNotice(null);
    try {
      const { blob, filename } = await buildCurrentBukuYasinPdfBlob();
      await downloadBlobFile(blob, filename);
      setPdfStatusNotice(`Berkas ${filename} berhasil diunduh ke perangkat Anda.`);
      void recordBukuYasinDonation();
    } catch (err: any) {
      setPdfStatusNotice(err?.message || 'Gagal menyiapkan berkas PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleSharePdf = async () => {
    setIsPdfUnlocked(true);
    setIsGeneratingPdf(true);
    setPdfStatusNotice(null);
    try {
      const { blob, filename } = await buildCurrentBukuYasinPdfBlob();
      await shareOrDownloadFile(
        blob,
        filename,
        `Buku Tahlil & Doa Arwah A5 — ${memorial.fullLineageLabel}`
      );
      setPdfStatusNotice(`Berkas ${filename} siap disimpan atau dibagikan.`);
      void recordBukuYasinDonation();
    } catch (err: any) {
      setPdfStatusNotice(err?.message || 'Gagal membagikan berkas PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDirectPrint = () => {
    setIsPdfUnlocked(true);
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
    void recordBukuYasinDonation();
  };

  return (
    <section className="min-h-screen bg-[#FAF8F5] text-stone-900 pb-32 sm:pb-16">
      <style>{`
        @media print {
          @page {
            size: A5 portrait;
            margin: 12mm;
          }
          body {
            background: #ffffff !important;
            color: #111827 !important;
          }
          nav, footer, .no-print {
            display: none !important;
          }
          .a5-print-container {
            box-shadow: none !important;
            border: none !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .a5-page-break {
            page-break-after: always;
            break-after: page;
          }
        }
      `}</style>

      {/* Header Editorial (No-Print) */}
      <div className="no-print max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        <header className="rounded-3xl bg-[#064E3B] text-white p-6 sm:p-10 shadow-sm border border-emerald-950 mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-100 mb-2">
            <BookOpen className="w-4 h-4" />
            <span>PENYUSUN BUKU TAHLIL &amp; DOA ARWAH KENANGAN KELUARGA (UKURAN A5)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
            Abadikan Doa &amp; Kenangan Almarhum/Almarhumah Secara Terhormat
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-emerald-50/90 max-w-3xl leading-relaxed">
            Susun buku saku ukuran A5 berisi Sampul Kenangan Keluarga, Kata Pengantar, Susunan
            Tawassul Al-Fatihah, Dzikir Tahlil Lengkap, dan Doa Arwah untuk peringatan 7 hari, 40
            hari, 100 hari, 1000 hari, atau Haul.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-950/60 border border-emerald-700/60 px-3.5 py-2 text-xs text-emerald-100">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-300" />
            <span>
              <strong>Privasi Lokal UU PDP:</strong> Foto dan data almarhum/almarhumah diproses 100%
              di memori peramban Anda dan tidak pernah diunggah ke server.
            </span>
          </div>
        </header>
      </div>

      {/* Main Split Layout: Left Form (No-Print) + Right Live A5 Preview (Printed in A5) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* PANEL KIRI: FORM KENANGAN KELUARGA & 2 JALUR EKONOMI */}
        <div className="no-print lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-white border border-stone-200/90 p-6 space-y-4 shadow-xs">
            <h2 className="font-serif text-xl font-bold text-stone-900 border-b border-stone-200 pb-3">
              1. Data Kenangan Almarhum / Almarhumah
            </h2>

            <div>
              <label
                htmlFor="yasin-deceased-name"
                className="block text-xs font-semibold text-stone-700 mb-1"
              >
                Nama Lengkap Almarhum / Almarhumah
              </label>
              <input
                id="yasin-deceased-name"
                type="text"
                maxLength={90}
                value={deceasedName}
                onChange={(e) => setDeceasedName(e.target.value)}
                placeholder="Contoh: H. Abdul Karim"
                className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5">
                <label
                  htmlFor="yasin-lineage-rel"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Nasab
                </label>
                <select
                  id="yasin-lineage-rel"
                  value={lineageRelation}
                  onChange={(e) =>
                    setLineageRelation(
                      e.target.value === 'binti' ? 'binti' : 'bin'
                    )
                  }
                  className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                >
                  <option value="bin">bin (Laki-laki)</option>
                  <option value="binti">binti (Perempuan)</option>
                </select>
              </div>
              <div className="sm:col-span-7">
                <label
                  htmlFor="yasin-parent-name"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Nama Ayahanda
                </label>
                <input
                  id="yasin-parent-name"
                  type="text"
                  maxLength={90}
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Contoh: H. Muhammad Saleh"
                  className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="yasin-birth-date"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Tempat / Tanggal Lahir
                </label>
                <input
                  id="yasin-birth-date"
                  type="text"
                  maxLength={50}
                  value={birthDateText}
                  onChange={(e) => setBirthDateText(e.target.value)}
                  placeholder="Contoh: 12 Mei 1948"
                  className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                />
              </div>
              <div>
                <label
                  htmlFor="yasin-death-date"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Tanggal Wafat
                </label>
                <input
                  id="yasin-death-date"
                  type="text"
                  maxLength={50}
                  value={deathDateText}
                  onChange={(e) => setDeathDateText(e.target.value)}
                  placeholder="Contoh: 18 Oktober 2026"
                  className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="yasin-event-preset"
                className="block text-xs font-semibold text-stone-700 mb-1"
              >
                Peringatan Acara
              </label>
              <select
                id="yasin-event-preset"
                value={eventPreset}
                onChange={(e) =>
                  setEventPreset(e.target.value as CommemorationEventPreset)
                }
                className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
              >
                {EVENT_PRESETS.map((preset) => (
                  <option key={preset} value={preset}>
                    {preset === 'Custom' ? 'Tulis Judul Peringatan Sendiri...' : preset}
                  </option>
                ))}
              </select>
              {eventPreset === 'Custom' && (
                <input
                  type="text"
                  maxLength={70}
                  value={customEventLabel}
                  onChange={(e) => setCustomEventLabel(e.target.value)}
                  placeholder="Contoh: Mengenang Haul ke-3"
                  className="mt-2 w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
                />
              )}
            </div>

            {/* Unggah Foto Lokal (Memori Browser) */}
            <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800">
                  Foto Kenangan (Opsional • Otomatis Dikompresi)
                </span>
                {localPhotoDataUrl && (
                  <button
                    type="button"
                    onClick={() => setLocalPhotoDataUrl(null)}
                    className="min-h-[36px] px-2 inline-flex items-center gap-1 text-xs font-medium text-rose-700 hover:text-rose-900 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus Foto</span>
                  </button>
                )}
              </div>
              <label
                className={`w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:border-emerald-800 text-xs font-semibold text-stone-800 transition-colors cursor-pointer ${
                  isProcessingPhoto ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  disabled={isProcessingPhoto}
                  onChange={handlePhotoUpload}
                  className="sr-only"
                />
                {isProcessingPhoto ? (
                  <>
                    <Loader2 className="w-4 h-4 text-emerald-800 animate-spin" />
                    <span>Memproses &amp; mengompresi foto...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-emerald-800" />
                    <span>
                      {localPhotoDataUrl
                        ? 'Ganti Foto Kenangan'
                        : 'Pilih Foto dari Perangkat (JPG/PNG/WebP)'}
                    </span>
                  </>
                )}
              </label>
              <p className="text-[11px] text-stone-600 leading-relaxed">
                Foto hanya dirender di memori peramban Anda untuk pratinjau &amp; unduhan PDF, tidak
                dikirim ke server mana pun.
              </p>
              {photoError && (
                <p className="text-xs font-medium text-rose-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{photoError}</span>
                </p>
              )}
            </div>

            {/* Tema Sampul */}
            <div>
              <span className="block text-xs font-semibold text-stone-700 mb-1.5">
                Tema Sampul Buku A5
              </span>
              <div className="grid grid-cols-3 gap-2">
                {THEME_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTheme(opt.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                      theme === opt.id
                        ? 'bg-emerald-950 text-white border-emerald-950'
                        : 'bg-[#FAF8F5] text-stone-800 border-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Kata Pengantar Keluarga */}
            <div>
              <label
                htmlFor="yasin-family-greeting"
                className="block text-xs font-semibold text-stone-700 mb-1"
              >
                Kata Pengantar Keluarga
              </label>
              <textarea
                id="yasin-family-greeting"
                rows={4}
                maxLength={900}
                value={familyGreeting}
                onChange={(e) => setFamilyGreeting(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] p-3 text-xs sm:text-sm text-stone-900 focus:outline-none focus:border-emerald-800 leading-relaxed"
              />
            </div>

            <div>
              <label
                htmlFor="yasin-family-footer"
                className="block text-xs font-semibold text-stone-700 mb-1"
              >
                Tertanda Keluarga (Di Bawah Kata Pengantar)
              </label>
              <input
                id="yasin-family-footer"
                type="text"
                maxLength={120}
                value={familyNamesFooter}
                onChange={(e) => setFamilyNamesFooter(e.target.value)}
                placeholder="Contoh: Keluarga Besar Ibu Hj. Aminah beserta Putra-Putri"
                className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
              />
            </div>
          </div>

          {/* JALUR EKONOMI A: UNDUH PDF SIAP CETAK A5 MANDIRI (INFAQ RP 30.000) */}
          <div className="rounded-2xl bg-white border-2 border-emerald-900/30 p-6 space-y-5 shadow-xs">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
                <Heart className="w-3.5 h-3.5" />
                <span>Jalur A — Unduh &amp; Cetak PDF A5 Mandiri</span>
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mt-1">
                Buka &amp; Unduh File PDF A5 Asli (Infaq Rp 30.000)
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Pratinjau di sebelah kanan dapat Anda periksa secara gratis. Untuk mengunduh file
                dokumen <strong>.PDF ukuran A5</strong> siap cetak maupun dibagikan ke WhatsApp
                keluarga, tunaikan infaq operasional sebesar Rp 30.000.
              </p>
            </div>

            {paymentMethod === 'QRIS' ? (
              <QrisPaymentCard
                qrisPayload={bankInfo.qrisPayload}
                selectedAmount={tier30k.amount}
                tierLabel={tier30k.label}
                customTierQrisPayload={tier30k.customQrisPayload}
                customTierQrisImageUrl={tier30k.customQrisImageUrl}
                compact
              />
            ) : (
              <div className="rounded-xl border border-stone-200 bg-[#FAF8F5] p-4 space-y-1">
                <p className="text-xs text-stone-500">{bankInfo.bankName}</p>
                <p className="text-base font-mono font-bold text-stone-900">
                  {bankInfo.accountNumber}
                </p>
                <p className="text-xs text-stone-700">
                  a.n. {bankInfo.accountHolder} • Nominal: Rp 30.000
                </p>
              </div>
            )}

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

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf || (!agreedToAkad && !receipt && !isPdfUnlocked)}
                className={`w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                  agreedToAkad || receipt || isPdfUnlocked
                    ? 'bg-[#064E3B] hover:bg-emerald-950 text-white'
                    : 'bg-stone-200 text-stone-500 cursor-not-allowed'
                } disabled:opacity-60`}
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menyiapkan PDF...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>
                      {isPdfUnlocked
                        ? 'Unduh File PDF (.PDF) Ukuran A5'
                        : 'Unduh File PDF (.PDF) A5 (Infaq Rp 30.000)'}
                    </span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleSharePdf}
                  disabled={isGeneratingPdf || (!agreedToAkad && !receipt && !isPdfUnlocked)}
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-950 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Bagikan / Simpan ke HP</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectPrint}
                  disabled={!agreedToAkad && !receipt && !isPdfUnlocked}
                  className="min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak Langsung (Printer)</span>
                </button>
              </div>

              {pdfStatusNotice && (
                <p className="text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
                  {pdfStatusNotice}
                </p>
              )}

              {isRestrictedEnv && (
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Jika unduhan tertahan oleh browser in-app, ketuk tombol{' '}
                  <strong>Bagikan / Simpan ke HP</strong> atau buka di Chrome/Safari.
                </p>
              )}

              {pdfConfirmWaUrl && (
                <a
                  href={pdfConfirmWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-800 text-emerald-900 hover:bg-emerald-50 text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konfirmasi Infaq PDF via WhatsApp</span>
                </a>
              )}
            </div>
          </div>

          {/* JALUR EKONOMI B: PESAN CETAK FISIK VIA MITRA PERCETAKAN (WHATSAPP) */}
          <div className="rounded-2xl bg-white border border-stone-200/90 p-6 space-y-4 shadow-xs">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Jalur B — Cetak Buku Fisik Siap Bagi
              </span>
              <h3 className="font-serif text-lg font-bold text-stone-900 mt-1">
                Pesan Cetak Fisik via Mitra Percetakan (WhatsApp)
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                Ingin terima jadi dalam bentuk buku cetak rapi? Masukkan jumlah eksemplar dan kota
                tujuan pengiriman untuk berkonsultasi langsung.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="yasin-copies-count"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Jumlah Eksemplar
                </label>
                <input
                  id="yasin-copies-count"
                  type="number"
                  min={10}
                  max={5000}
                  value={copiesCount}
                  onChange={(e) =>
                    setCopiesCount(Math.max(10, Number(e.target.value) || 50))
                  }
                  className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3 py-2 text-sm text-stone-900"
                />
              </div>
              <div>
                <label
                  htmlFor="yasin-delivery-city"
                  className="block text-xs font-semibold text-stone-700 mb-1"
                >
                  Kota Pengiriman
                </label>
                <input
                  id="yasin-delivery-city"
                  type="text"
                  maxLength={60}
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  placeholder="Contoh: Sidoarjo"
                  className="w-full rounded-xl border border-stone-300 bg-[#FAF8F5] px-3 py-2 text-sm text-stone-900"
                />
              </div>
            </div>

            {physicalPrintWaUrl ? (
              <a
                href={physicalPrintWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi &amp; Pesan Cetak Fisik via WhatsApp</span>
              </a>
            ) : (
              <div className="rounded-xl bg-[#FAF8F5] border border-stone-200 p-3.5 text-xs text-stone-600 leading-relaxed">
                Nomor WhatsApp Mitra Percetakan / Kurator belum diaktifkan pada pengaturan portal.
                Anda tetap dapat menggunakan <strong>Jalur A (Simpan PDF A5 Mandiri)</strong> di
                atas untuk mencetak langsung di percetakan terdekat.
              </div>
            )}
          </div>
        </div>

        {/* PANEL KANAN: PRATINJAU BUKU A5 LIVE & DOKUMEN CETAK */}
        <div className="lg:col-span-7">
          <div className="a5-print-container rounded-3xl bg-white border border-stone-300 shadow-sm p-6 sm:p-10 space-y-10">
            {/* HALAMAN 1: SAMPUL KENANGAN A5 */}
            <div
              className={`a5-page-break rounded-2xl border-2 p-8 sm:p-12 text-center flex flex-col items-center justify-between min-h-[540px] ${activeThemeStyle.previewBg} ${activeThemeStyle.previewText} ${activeThemeStyle.previewBorder}`}
            >
              <div className="space-y-2">
                <p className="font-arabic text-xl sm:text-2xl">
                  إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ
                </p>
                <p className="text-xs uppercase tracking-widest opacity-85 font-semibold">
                  {memorial.eventLabel}
                </p>
              </div>

              <div className="my-6 flex flex-col items-center space-y-4">
                {localPhotoDataUrl ? (
                  <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-2xl overflow-hidden border-2 border-white/60 shadow-md bg-stone-200">
                    <img
                      src={localPhotoDataUrl}
                      alt={memorial.fullLineageLabel}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full border border-current/30 flex items-center justify-center opacity-75">
                    <BookOpen className="w-8 h-8" />
                  </div>
                )}

                <div className="space-y-1.5 max-w-md">
                  <p className="text-xs uppercase tracking-wider opacity-75">
                    Dalam Kenangan &amp; Doa Bersama
                  </p>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug">
                    {memorial.fullLineageLabel}
                  </h2>
                  {memorial.lifeSpanLabel && (
                    <p className="text-xs sm:text-sm opacity-85 pt-1">
                      {memorial.lifeSpanLabel}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-current/20 w-full max-w-sm">
                <p className="text-xs font-medium opacity-90">
                  Buku Panduan Bacaan Tawassul, Tahlil Lengkap &amp; Doa Arwah
                </p>
              </div>
            </div>

            {/* HALAMAN 2: KATA PENGANTAR KELUARGA */}
            <div className="a5-page-break rounded-2xl border border-stone-200 p-6 sm:p-10 space-y-6">
              <div className="text-center border-b border-stone-200 pb-4">
                <p className="font-arabic text-xl text-stone-900">
                  بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ
                </p>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-2">
                  Kata Pengantar Keluarga
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {memorial.eventLabel} • {memorial.fullLineageLabel}
                </p>
              </div>

              <p className="text-sm sm:text-base text-stone-800 leading-relaxed whitespace-pre-line">
                {memorial.familyGreeting}
              </p>

              <div className="pt-6 border-t border-stone-200 text-right">
                <p className="text-xs text-stone-500">Hormat kami yang berduka,</p>
                <p className="font-serif text-base font-bold text-stone-900 mt-1">
                  {memorial.familyNamesFooter}
                </p>
              </div>
            </div>

            {/* PEMBERITAHUAN JUJUR STATUS MUSHAF SURAH YASIN 83 AYAT */}
            {hasVerifiedYasin83 ? (
              <div className="a5-page-break space-y-4">
                <h3 className="font-serif text-xl font-bold text-stone-900 text-center">
                  Surah Yasin (83 Ayat Lengkap)
                </h3>
                {SURAH_YASIN_VERSES.map((v) => (
                  <div key={v.number} className="py-3 border-b border-stone-200/70">
                    <p
                      dir="rtl"
                      className="font-arabic text-2xl leading-[2.3] text-stone-950 text-right"
                    >
                      {v.arabic} ﴿{v.number}﴾
                    </p>
                    <p className="text-xs text-emerald-950 mt-1">{v.latin}</p>
                    <p className="text-xs italic text-stone-600 mt-0.5">
                      {v.translation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-print rounded-2xl bg-[#FAF8F5] border border-stone-300 p-4 text-xs text-stone-700 flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-emerald-900 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-stone-900">
                    Kejujuran Mushaf Terverifikasi:
                  </strong>{' '}
                  Edisi cetak saat ini menampilkan paket lengkap{' '}
                  <strong>Tawassul Al-Fatihah, Dzikir Tahlil Lengkap, dan Doa Arwah</strong> yang
                  telah terverifikasi 100%. Lampiran Surah Yasin 83 Ayat akan otomatis tersisip
                  setelah berkas mushaf resmi terverifikasi diaktifkan.
                </div>
              </div>
            )}

            {/* HALAMAN 3+: TAWASSUL, TAHLIL LENGKAP & DOA ARWAH */}
            <div className="space-y-8">
              {memorialSections.map((sec) => (
                <article
                  key={sec.id}
                  className="rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-5 break-inside-avoid"
                >
                  <div className="border-b border-stone-200 pb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                      {sec.stepLabel}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 mt-0.5">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">{sec.subtitle}</p>
                    {sec.id === 'TAWASSUL' && (
                      <p className="mt-2 text-xs font-semibold text-emerald-950 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5">
                        Khushushan ilaa ruuhi:{' '}
                        <strong>{memorial.fullLineageLabel}</strong> — Al-Fatihah.
                      </p>
                    )}
                  </div>

                  <div className="space-y-4" dir="rtl">
                    {sec.arabicLines.map((line, idx) => (
                      <p
                        key={idx}
                        className="font-arabic text-2xl leading-[2.4] text-stone-950 text-right border-b border-stone-200/50 pb-3 last:border-b-0"
                      >
                        {line}
                      </p>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-stone-200 space-y-2">
                    <p className="text-xs sm:text-sm font-medium text-emerald-950 leading-relaxed whitespace-pre-line">
                      &ldquo;{sec.latinText}&rdquo;
                    </p>
                    <p className="text-xs italic text-stone-600 leading-relaxed">
                      Artinya: &ldquo;{sec.translationText}&rdquo;
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
