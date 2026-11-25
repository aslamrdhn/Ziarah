import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Printer,
  Share2,
  ExternalLink,
  Heart,
  MessageCircle,
  ShieldCheck,
  Navigation,
  Download,
  Loader2,
} from 'lucide-react';
import {
  ZIARAH_CORRIDORS,
  SUNNAH_ZIARAH_ADAB_STEPS,
  resolveCorridorSites,
  type ZiarahCorridor,
} from '../data/ziarahCorridors';
import { useSites } from '../context/SiteContext';
import { getEffectiveSiteDoaKhusus } from '../lib/siteLogistics';
import { renderFormattedText, stripMarkdownAsterisks } from '../lib/formatText';
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
import { generatePanduanRutePdfBlob } from '../lib/pdfDocumentGenerator';

const STORAGE_CORRIDOR_UNLOCK_KEY = 'zn_panduan_rute_unlocked_v1';

export const PanduanRuteZiarah: React.FC = () => {
  const { sites: ziarahSites } = useSites();
  const [selectedSlug, setSelectedSlug] = useState<string>(
    ZIARAH_CORRIDORS[0].slug
  );
  const [groupName, setGroupName] = useState<string>('');
  const [departureDateLabel, setDepartureDateLabel] = useState<string>('');

  const [isBookUnlocked, setIsBookUnlocked] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_CORRIDOR_UNLOCK_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfNotice, setPdfNotice] = useState<string | null>(null);
  const isRestrictedEnv = useMemo(() => isRestrictedWebViewOrIframe(), []);

  const initialInfaqConfig = useMemo(() => getCachedOrDefaultInfaqConfig(), []);
  const [donationTiers, setDonationTiers] = useState<DonationTier[]>(
    initialInfaqConfig.donationTiers
  );
  const [selectedDonationAmount, setSelectedDonationAmount] = useState<
    20000 | 30000
  >(30000);
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

  const activeCorridor: ZiarahCorridor = useMemo(() => {
    return (
      ZIARAH_CORRIDORS.find((c) => c.slug === selectedSlug) ||
      ZIARAH_CORRIDORS[0]
    );
  }, [selectedSlug]);

  useEffect(() => {
    setSelectedDonationAmount(activeCorridor.recommendedDonationAmount);
  }, [activeCorridor]);

  const resolvedStops = useMemo(() => {
    return resolveCorridorSites(activeCorridor, ziarahSites);
  }, [activeCorridor, ziarahSites]);

  const activeTier = useMemo(() => {
    return (
      donationTiers.find((t) => t.amount === selectedDonationAmount) || {
        amount: selectedDonationAmount,
        label:
          selectedDonationAmount === 30000
            ? 'Sahabat Ziarah'
            : 'Server & Peta',
      }
    );
  }, [donationTiers, selectedDonationAmount]);

  const shareSummaryWaUrl = useMemo(() => {
    const cleanGroup = groupName.trim() || 'Rombongan / Keluarga';
    const stopsList = resolvedStops
      .map(
        (item) =>
          `${item.orderNumber}. ${item.site.name} (${item.site.location.city}, ${item.site.location.province})\n   Peta: ${item.googleMapsUrl}`
      )
      .join('\n');

    const lines = [
      `Assalamu'alaikum jamaah *${cleanGroup}*,`,
      '',
      `Berikut ringkasan rencana rute ziarah kita:`,
      `*${activeCorridor.title}*`,
      `Estimasi Durasi: ${activeCorridor.recommendedDaysLabel}`,
      departureDateLabel.trim()
        ? `Jadwal Keberangkatan: ${departureDateLabel.trim()}`
        : null,
      '',
      '*Urutan Titik Maqbarah:*',
      stopsList,
      '',
      'Disusun melalui Direktori Ilmiah Ziarah Nusantara (https://ziarahnusantara.my.id/panduan-rute)',
    ].filter(Boolean);

    return `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`;
  }, [activeCorridor, resolvedStops, groupName, departureDateLabel]);

  const confirmDonationWaUrl = useMemo(() => {
    return buildWhatsappConfirmUrl({
      whatsappNumber: bankInfo.whatsappConfirmNumber,
      donorName: groupName || senderAccount || 'Rombongan Peziarah',
      amount: selectedDonationAmount,
      programTitle: `Buku Saku Rute Ziarah (${activeCorridor.title})`,
      siteName: activeCorridor.regionSummary,
      bankName: bankInfo.bankName,
      accountNumber: bankInfo.accountNumber,
      template: bankInfo.whatsappMessageTemplate,
    });
  }, [bankInfo, groupName, senderAccount, selectedDonationAmount, activeCorridor]);

  const recordRouteBookDonation = async () => {
    if (receipt && receipt.dataUrl) {
      try {
        const cleanDonor =
          groupName.trim() || senderAccount.trim() || 'Rombongan Peziarah';
        const donationId = await submitDonationWithPrivateProof({
          programId: 'panduan-rute-ziarah',
          programTitle: `Buku Saku Rute Ziarah: ${activeCorridor.title}`.slice(
            0,
            150
          ),
          siteId: activeCorridor.slug,
          siteName: activeCorridor.title,
          amount: selectedDonationAmount,
          donorName: cleanDonor,
          paymentMethod,
          senderAccount: senderAccount.trim() || cleanDonor,
          receipt,
          isAnonymous: !groupName.trim(),
          showPublicly: Boolean(groupName.trim()),
          consentAkad: true,
          consentVersion: '2026-11-25',
          consentAt: new Date().toISOString(),
          doaHajat: `Ikhtiar perjalanan ziarah rombongan (${activeCorridor.title})`,
        });
        saveVerifiedDonationRecord({
          donationId,
          siteId: activeCorridor.slug,
          programId: 'panduan-rute-ziarah',
          amount: selectedDonationAmount,
        });
      } catch {
        // Keep unlocked locally even if offline
      }
    }
  };

  const buildCurrentRoutePdfBlob = async (): Promise<{
    blob: Blob;
    filename: string;
  }> => {
    const stopsPayload = resolvedStops.map((item) => {
      const doaList = getEffectiveSiteDoaKhusus(item.site);
      return {
        id: item.site.id,
        name: item.site.name,
        title: item.site.title,
        city: item.site.location.city,
        province: item.site.location.province,
        description: stripMarkdownAsterisks(item.site.description),
        historySummary: stripMarkdownAsterisks(item.site.history).slice(0, 750),
        doaKhusus: doaList.map((d) => ({
          title: d.title,
          text: d.text || d.arab || '',
          latin: d.latin,
          translation: d.translation,
        })),
        references: Array.isArray(item.site.references)
          ? item.site.references.filter(Boolean)
          : [],
      };
    });

    const blob = await generatePanduanRutePdfBlob({
      groupName,
      coordinatorName: senderAccount,
      departureDate: departureDateLabel,
      routeTitle: activeCorridor.title,
      routeRegion: activeCorridor.regionSummary,
      routeDurationLabel: activeCorridor.recommendedDaysLabel,
      stops: stopsPayload,
      adabChecklist: SUNNAH_ZIARAH_ADAB_STEPS.map((s) => ({
        step: String(s.step),
        title: s.title,
        desc: s.description,
      })),
    });

    return {
      blob,
      filename: `buku-saku-rute-${activeCorridor.slug}.pdf`,
    };
  };

  const handleDownloadRoutePdf = async () => {
    setIsBookUnlocked(true);
    try {
      localStorage.setItem(STORAGE_CORRIDOR_UNLOCK_KEY, 'true');
    } catch {}
    setIsGeneratingPdf(true);
    setPdfNotice(null);
    try {
      const { blob, filename } = await buildCurrentRoutePdfBlob();
      await downloadBlobFile(blob, filename);
      setPdfNotice(`Berkas ${filename} berhasil diunduh ke perangkat Anda.`);
      void recordRouteBookDonation();
    } catch (err: any) {
      setPdfNotice(err?.message || 'Gagal menyiapkan berkas PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleShareRoutePdf = async () => {
    setIsBookUnlocked(true);
    try {
      localStorage.setItem(STORAGE_CORRIDOR_UNLOCK_KEY, 'true');
    } catch {}
    setIsGeneratingPdf(true);
    setPdfNotice(null);
    try {
      const { blob, filename } = await buildCurrentRoutePdfBlob();
      await shareOrDownloadFile(
        blob,
        filename,
        `Buku Saku Rute Ziarah — ${activeCorridor.title}`
      );
      setPdfNotice(`Berkas ${filename} siap disimpan atau dibagikan.`);
      void recordRouteBookDonation();
    } catch (err: any) {
      setPdfNotice(err?.message || 'Gagal membagikan berkas PDF.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDirectPrint = () => {
    setIsBookUnlocked(true);
    try {
      localStorage.setItem(STORAGE_CORRIDOR_UNLOCK_KEY, 'true');
    } catch {}
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
    void recordRouteBookDonation();
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
          .page-break-after {
            page-break-after: always;
            break-after: page;
          }
        }
      `}</style>

      {/* =====================================================================
          TAMPILAN PUBLIK & KONFIGURASI BUKU SAKU ROMBONGAN (NO-PRINT)
          ===================================================================== */}
      <div className="no-print max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8">
        <header className="rounded-3xl bg-[#064E3B] text-white p-6 sm:p-10 shadow-sm border border-emerald-950">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-emerald-100 mb-2">
            <Navigation className="w-4 h-4" />
            <span>BUKU SAKU RUTE ZIARAH KELUARGA &amp; ROMBONGAN</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
            3 Koridor Ziarah Terverifikasi untuk Pegangan di Perjalanan &amp; Bus Rombongan
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-emerald-50/90 max-w-3xl leading-relaxed">
            Pilih koridor perjalanan, bagikan urutan titik Google Maps secara gratis ke grup
            WhatsApp jamaah, atau cetak Buku Saku PDF lengkap berisi sejarah sahih, wirid khusus
            tiap maqbarah, dan referensi literatur resmi.
          </p>
        </header>

        {/* Pilihan 3 Koridor Terverifikasi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ZIARAH_CORRIDORS.map((corridor) => {
            const isSelected = corridor.slug === activeCorridor.slug;
            return (
              <button
                key={corridor.slug}
                type="button"
                onClick={() => setSelectedSlug(corridor.slug)}
                className={`text-left rounded-2xl p-5 border transition-colors cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-emerald-950 text-white border-emerald-950 shadow-sm'
                    : 'bg-white text-stone-900 border-stone-200/90 hover:border-emerald-800'
                }`}
              >
                <div>
                  <span
                    className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${
                      isSelected
                        ? 'bg-emerald-800 text-emerald-100'
                        : 'bg-[#FAF8F5] text-emerald-900 border border-stone-200'
                    }`}
                  >
                    {corridor.siteIds.length} Titik Maqbarah
                  </span>
                  <h2 className="font-serif text-lg font-bold mt-2 leading-snug">
                    {corridor.title}
                  </h2>
                  <p
                    className={`text-xs mt-1.5 leading-relaxed ${
                      isSelected ? 'text-emerald-100' : 'text-stone-600'
                    }`}
                  >
                    {corridor.subtitle}
                  </p>
                </div>
                <div
                  className={`pt-3 border-t text-xs font-medium ${
                    isSelected
                      ? 'border-emerald-800 text-emerald-200'
                      : 'border-stone-200 text-stone-500'
                  }`}
                >
                  {corridor.recommendedDaysLabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Koridor Aktif & Daftar Urutan Makam (Gratis) */}
        <div className="rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                {activeCorridor.recommendedDaysLabel}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                {activeCorridor.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
                {activeCorridor.editorialIntro}
              </p>
            </div>

            <a
              href={shareSummaryWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#064E3B] hover:bg-emerald-950 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0"
            >
              <Share2 className="w-4 h-4" />
              <span>Bagikan Ringkasan Rute ke WhatsApp Rombongan</span>
            </a>
          </div>

          {/* Personalisasi Nama Rombongan (100% Lokal di Browser) */}
          <div className="rounded-2xl bg-[#FAF8F5] border border-stone-200/90 p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="corridor-group-name"
                className="block text-xs font-semibold text-stone-700 mb-1"
              >
                Nama Rombongan / Majelis Taklim / Keluarga (Sampul PDF)
              </label>
              <input
                id="corridor-group-name"
                type="text"
                maxLength={90}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Contoh: Majelis Taklim Al-Hidayah / Keluarga Besar Bani Hasan"
                className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
              />
            </div>
            <div>
              <label
                htmlFor="corridor-departure-date"
                className="block text-xs font-semibold text-stone-700 mb-1"
              >
                Tanggal / Bulan Keberangkatan (Opsional)
              </label>
              <input
                id="corridor-departure-date"
                type="text"
                maxLength={60}
                value={departureDateLabel}
                onChange={(e) => setDepartureDateLabel(e.target.value)}
                placeholder="Contoh: 14–16 Rajab 1448 H / Desember 2026"
                className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-sm text-stone-900 focus:outline-none focus:border-emerald-800"
              />
            </div>
          </div>

          {/* Daftar Titik Maqbarah Terverifikasi */}
          <div className="space-y-3">
            {resolvedStops.map((item) => {
              const doaList = getEffectiveSiteDoaKhusus(item.site);
              return (
                <div
                  key={item.site.id}
                  className="rounded-2xl border border-stone-200/90 bg-[#FAF8F5] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="w-8 h-8 rounded-xl bg-[#064E3B] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {item.orderNumber}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={getSitePath(item.site)}
                          className="font-serif text-lg font-bold text-stone-900 hover:text-emerald-900 underline-offset-4 hover:underline"
                        >
                          {item.site.name}
                        </Link>
                        <span className="text-xs font-medium text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded-md">
                          {item.site.location.city}, {item.site.location.province}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {stripMarkdownAsterisks(item.site.description)}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-stone-600">
                        <span>Jadwal Haul: {item.haulDisplay}</span>
                        <span>•</span>
                        <span>{doaList.length} Bacaan Doa/Wirid Khusus</span>
                        <span>•</span>
                        <span>{item.referencesCount} Referensi Terverifikasi</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <a
                      href={item.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-stone-300 hover:border-emerald-800 text-xs font-semibold text-stone-800 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                      <span>Google Maps</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BUKU SAKU CETAK PDF UNTUK ROMBONGAN (INFAQ QRIS RP 20.000 / RP 30.000) */}
        <div className="rounded-3xl bg-white border-2 border-emerald-900/30 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-900">
                <Heart className="w-3.5 h-3.5" />
                <span>Pegangan Ketua Rombongan &amp; Jamaah Bus</span>
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Cetak Buku Saku Rute Ziarah Lengkap (PDF)
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                Mencetak dokumen Buku Saku lengkap berisi Sampul Rombongan, 6 Adab Ziarah Sunnah,
                Sejarah &amp; Hikmah Keteladanan untuk dibacakan di dalam bus, Doa/Wirid Khusus
                Arab–Latin tiap maqbarah, serta daftar pustaka terverifikasi.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shrink-0">
              <ShieldCheck className="w-4 h-4" />
              <span>Privasi Nama Rombongan 100% Lokal</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {([20000, 30000] as const).map((amt) => {
              const tierObj = donationTiers.find((t) => t.amount === amt);
              const isSelected = selectedDonationAmount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setSelectedDonationAmount(amt)}
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
                        (amt === 30000 ? 'Sahabat Ziarah' : 'Server & Peta')}
                    </span>
                  </div>
                  <p
                    className={`text-xs mt-1 ${
                      isSelected ? 'text-emerald-100' : 'text-stone-600'
                    }`}
                  >
                    {amt === 20000
                      ? 'Infaq Buku Saku Rute Koridor Regional & Pemeliharaan Peta'
                      : 'Infaq Buku Saku Rute + Dukungan Penuh Riset Sanad 183 Maqbarah'}
                  </p>
                </button>
              );
            })}
          </div>

          {paymentMethod === 'QRIS' ? (
            <QrisPaymentCard
              qrisPayload={bankInfo.qrisPayload}
              selectedAmount={activeTier.amount}
              tierLabel={activeTier.label}
              customTierQrisPayload={activeTier.customQrisPayload}
              customTierQrisImageUrl={activeTier.customQrisImageUrl}
            />
          ) : (
            <div className="rounded-2xl border border-stone-200 bg-[#FAF8F5] p-5 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Transfer Rekening Resmi
              </p>
              <p className="text-lg font-mono font-bold text-stone-900">
                {bankInfo.bankName} • {bankInfo.accountNumber}
              </p>
              <p className="text-xs text-stone-700">
                a.n. {bankInfo.accountHolder} • Nominal: Rp{' '}
                {selectedDonationAmount.toLocaleString('id-ID')}
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

          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleDownloadRoutePdf}
                disabled={isGeneratingPdf || (!agreedToAkad && !receipt && !isBookUnlocked)}
                className={`flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                  agreedToAkad || receipt || isBookUnlocked
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
                      {isBookUnlocked
                        ? `Unduh File PDF (.PDF) — ${activeCorridor.title}`
                        : `Unduh File PDF (.PDF) Rute (Infaq Rp ${selectedDonationAmount.toLocaleString('id-ID')})`}
                    </span>
                  </>
                )}
              </button>

              {confirmDonationWaUrl && (
                <a
                  href={confirmDonationWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-emerald-800 text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Konfirmasi via WhatsApp</span>
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleShareRoutePdf}
                disabled={isGeneratingPdf || (!agreedToAkad && !receipt && !isBookUnlocked)}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-emerald-800 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-950 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan / Simpan ke HP</span>
              </button>

              <button
                type="button"
                onClick={handleDirectPrint}
                disabled={!agreedToAkad && !receipt && !isBookUnlocked}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Langsung (Printer)</span>
              </button>
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
          </div>
        </div>
      </div>

      {/* =====================================================================
          DOKUMEN CETAK BUKU SAKU ROMBONGAN (PRINT-ONLY)
          ===================================================================== */}
      <div className="hidden print-only max-w-4xl mx-auto p-6 space-y-8">
        {/* Sampul Buku Saku Rombongan */}
        <div className="page-break-after border-2 border-stone-800 rounded-2xl p-10 text-center space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-stone-600">
            BUKU SAKU PANDUAN RUTE &amp; MANAQIB ZIARAH NUSANTARA
          </p>
          <h1 className="font-serif text-3xl font-bold text-stone-950">
            {activeCorridor.title}
          </h1>
          <p className="text-sm text-stone-700">{activeCorridor.subtitle}</p>
          <div className="my-6 py-4 border-y border-stone-300">
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Disusun Untuk Pegangan Jamaah:
            </p>
            <p className="font-serif text-2xl font-bold text-stone-900 mt-1">
              {groupName.trim() || 'Rombongan Peziarah & Keluarga'}
            </p>
            {departureDateLabel.trim() && (
              <p className="text-xs text-stone-600 mt-1">
                Jadwal Perjalanan: {departureDateLabel.trim()}
              </p>
            )}
          </div>
          <p className="text-xs text-stone-600 leading-relaxed max-w-xl mx-auto">
            {activeCorridor.editorialIntro}
          </p>
        </div>

        {/* 6 Adab Ziarah Sunnah */}
        <div className="page-break-after border border-stone-300 rounded-2xl p-8 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-stone-950 border-b border-stone-300 pb-3">
            6 Adab Ziarah Kubur Sesuai Sunnah &amp; Keteladanan Ulama
          </h2>
          <div className="space-y-3">
            {SUNNAH_ZIARAH_ADAB_STEPS.map((item) => (
              <div key={item.step} className="pb-2 border-b border-stone-200 last:border-b-0">
                <p className="text-sm font-bold text-stone-900">
                  {item.step}. {item.title}
                </p>
                <p className="text-xs text-stone-700 leading-relaxed mt-0.5">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Urutan Maqbarah Beserta Sejarah, Untold Story, Doa Khusus & Referensi */}
        {resolvedStops.map((item) => {
          const doaList = getEffectiveSiteDoaKhusus(item.site);
          const refs = Array.isArray(item.site.references)
            ? item.site.references.filter(Boolean)
            : [];
          return (
            <article
              key={item.site.id}
              className="page-break-after border border-stone-300 rounded-2xl p-8 space-y-5"
            >
              <div className="border-b border-stone-300 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                   Pemberhentian Ke-{item.orderNumber} • {item.site.location.city},{' '}
                  {item.site.location.province}
                </span>
                <h2 className="font-serif text-2xl font-bold text-stone-950 mt-1">
                  {item.site.name} ({item.site.title})
                </h2>
                <p className="text-xs text-stone-600 mt-1">
                  Jadwal Haul Terverifikasi: <strong>{item.haulDisplay}</strong> • Koordinat Peta:{' '}
                  {item.site.location.lat}, {item.site.location.lng}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
                  Sejarah &amp; Sanad Perjuangan (Untuk Dibacakan di Perjalanan)
                </h3>
                <div className="text-xs text-stone-800 leading-relaxed space-y-2">
                  {renderFormattedText(item.site.history)}
                </div>
              </div>

              {item.site.untoldStory && (
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
                    Fakta Sejarah, Ajaran Inti &amp; Manaqib Keteladanan
                  </h3>
                  <div className="text-xs text-stone-800 leading-relaxed space-y-2">
                    {renderFormattedText(item.site.untoldStory)}
                  </div>
                </div>
              )}

              {doaList.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-stone-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-800">
                    Amalan Doa &amp; Wirid Khusus di Maqbarah
                  </h3>
                  {doaList.map((d, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-stone-300 p-4 space-y-1.5"
                    >
                      <p className="text-xs font-bold text-stone-900">{d.title}</p>
                      <p
                        dir="rtl"
                        className="font-arabic text-xl leading-[2.2] text-stone-950 text-right"
                      >
                        {d.arab}
                      </p>
                      <p className="text-xs font-medium text-stone-800">
                        &ldquo;{d.latin}&rdquo;
                      </p>
                      <p className="text-xs italic text-stone-600">
                        Artinya: &ldquo;{d.translation}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {refs.length > 0 && (
                <div className="pt-2 border-t border-stone-200">
                  <p className="text-[11px] font-bold text-stone-700">
                    Sumber Referensi Terverifikasi ({refs.length}):
                  </p>
                  <ul className="list-disc list-inside text-[10px] text-stone-600 space-y-0.5 mt-1">
                    {refs.map((refUrl: string, rIdx: number) => (
                      <li key={rIdx} className="break-all">
                        {refUrl}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
