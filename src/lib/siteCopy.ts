import React, { useState, useEffect, useCallback } from 'react';

export interface QuickNominalPackage {
  amount: number;
  label: string;
  tag: string;
  desc: string;
  badge?: string;
}

export interface SiteCopyConfig {
  // 1. Identitas & Beranda (DaftarMakam.tsx)
  heroTitle: string;
  heroSubtitle: string;
  jumatBannerTitle: string;
  jumatBannerSubtitle: string;
  searchPlaceholder: string;
  tabLabelAll: string;
  tabLabelWaliSongo: string;
  tabLabelUlama: string;
  tabLabelRaja: string;
  cardPrimaryCta: string;
  cardSecondaryMapCta: string;
  // 2. Ruang Baca & Gembok Cerita (SiteDetails.tsx & RubrikKisah.tsx)
  readerTabMainStory: string;
  readerTabPrayerGuide: string;
  paywallBadge: string;
  paywallTitle: string;
  paywallSubtitle: string;
  paywallPrimaryButton: string;
  rubrikHeaderSubtitle: string;
  // 3. Halaman Infaq & Dinding Munajat (InfaqDigital.tsx, RubrikKisah.tsx & TransactionModal.tsx)
  infaqHeadline: string;
  infaqSubheadline: string;
  infaqTransparencyNote: string;
  munajatHeaderTitle: string;
  munajatHeaderSubtitle: string;
  doaHajatPlaceholder: string;
  unlockSuccessMessage: string;
  quickNominalPackages: QuickNominalPackage[];
  // 4. Halaman Amalan, Yasin & Doa (BacaanZiarah.tsx & KumpulanDoa.tsx)
  bacaanTitle: string;
  yasinHeaderSubtitle: string;
  tawassulTitle: string;
  tawassulPlaceholder: string;
  postPrayerTitle: string;
  doaKhususTitle: string;
  doaHeaderSubtitle: string;
  updatedAt?: unknown;
}

export const SITE_COPY_CACHE_KEY = 'zn_site_copy_cache_v1';
const SITE_COPY_EVENT = 'zn_site_copy_updated';

export const DEFAULT_SITE_COPY: SiteCopyConfig = {
  // 1. Identitas & Beranda
  heroTitle: 'Jejak Auliya & Khazanah Ziarah Nusantara.',
  heroSubtitle:
    'Peta interaktif, tuntunan tahlil lapangan, dan arsip riwayat batin para Wali di kepulauan Indonesia.',
  jumatBannerTitle: 'Malam & Hari Jumat Mubarak',
  jumatBannerSubtitle:
    'Ada rindu yang hanya sampai lewat Fatihah, dan ada beban hati yang luruh saat mengingat kisah para kekasih-Nya.',
  searchPlaceholder: 'Cari nama tokoh, makam, atau kota...',
  tabLabelAll: 'Semua',
  tabLabelWaliSongo: 'Wali Songo',
  tabLabelUlama: 'Ulama Nusantara',
  tabLabelRaja: 'Auliya Nusantara',
  cardPrimaryCta: 'Baca Kisah',
  cardSecondaryMapCta: 'Lihat di Peta Rute',
  // 2. Ruang Baca & Gembok Cerita
  readerTabMainStory: 'Kisah, Karomah & Wasiat Beliau',
  readerTabPrayerGuide: 'Panduan Ziarah, Doa Khusus & Catatan',
  paywallBadge: 'Arsip Khazanah Terkunci',
  paywallTitle: 'Lanjutkan Membaca Wasiat & Riwayat Batin Beliau',
  paywallSubtitle:
    'Buka seluruh arsip kisah rahasia di 96+ makam Nusantara dan Rubrik Kisah sekaligus berinfaq jariyah sekali saja dari perangkat Anda.',
  paywallPrimaryButton: 'Buka Seluruh Arsip Kisah',
  rubrikHeaderSubtitle:
    'Menghadirkan naskah manuskrip, kisah rahasia, hikmah karomah, dan khazanah sejarah keilmuan para Aulia dan Ulama Nusantara.',
  // 3. Halaman Infaq & Dinding Munajat
  infaqHeadline: 'Infaq Jariyah & Dinding Munajat Peziarah',
  infaqSubheadline:
    'Salurkan infaq jariyah untuk Penjagaan Arsip Digital & Penyebaran Riwayat Auliya Nusantara, sekaligus membuka seluruh naskah Kisah Rahasia & Karomah di perangkat Anda.',
  infaqTransparencyNote:
    'Infaq akan disalurkan secara amanah sesuai akad pilihan program untuk pelestarian khazanah sejarah & penyebaran riwayat para Auliya.',
  munajatHeaderTitle: 'Munajat & Infaq Peziarah Terkini',
  munajatHeaderSubtitle:
    'Mari aminkan doa dan hajat saudara seiman kita agar malaikat turut mengaminkan doa yang sama untuk kita.',
  doaHajatPlaceholder: 'Contoh: Mohon doa untuk kesembuhan orang tua & kelancaran rezeki keluarga...',
  unlockSuccessMessage:
    'Alhamdulillah, terima kasih atas infaq jariyah Anda. Seluruh lembaran Khazanah & Wasiat Rahasia kini telah terbuka penuh di perangkat Anda.',
  quickNominalPackages: [
    {
      amount: 10000,
      label: 'Rp 10rb',
      tag: 'Infaq Pembuka',
      desc: 'Ikut menjaga server & akses bacaan doa lapangan tetap terbuka.',
    },
    {
      amount: 25000,
      label: 'Rp 25rb',
      tag: 'Penjaga Sanad',
      desc: 'Membantu digitalisasi naskah sejarah, verifikasi sanad & pembukaan seluruh arsip kisah.',
      badge: 'Pilihan Utama Peziarah',
    },
    {
      amount: 50000,
      label: 'Rp 50rb',
      tag: 'Jariyah Utama',
      desc: 'Dukungan penuh riset lapangan, pemetaan rute 96+ makam & pelestarian manuskrip.',
      badge: 'Amal Jariyah Terbaik',
    },
    {
      amount: 100000,
      label: 'Rp 100rb',
      tag: 'Wakaf Khazanah',
      desc: 'Kontribusi jariyah pengembangan ensiklopedia sejarah Auliya lintas generasi.',
    },
    {
      amount: 250000,
      label: 'Rp 250rb',
      tag: 'Wakaf Utama',
      desc: 'Wasilah jariyah pelestarian khazanah Islam Nusantara berkelanjutan.',
    },
    {
      amount: 500000,
      label: 'Rp 500rb',
      tag: 'Wakaf Kehormatan',
      desc: 'Dukungan utama ekspedisi dokumentasi & pemeliharaan arsip sejarah.',
    },
  ],
  // 4. Halaman Amalan, Yasin & Doa
  bacaanTitle: 'Tuntunan Yasin, Tahlil & Tasbih Digital.',
  yasinHeaderSubtitle:
    'Dirancang khusus untuk keterbacaan di area maqbarah: layar tetap menyala otomatis, mode kontras matahari, dan tasbih digital dengan umpan balik getar haptik.',
  tawassulTitle: 'Untuk siapa Al-Fatihah, Yasin & doa Anda hari ini?',
  tawassulPlaceholder: 'Ketik nama almarhum/almarhumah orang tua atau hajat terdalam Anda...',
  postPrayerTitle:
    'Setiap huruf doa yang baru saja Anda lantunkan adalah bukti cinta yang tak terputus oleh kematian.',
  doaKhususTitle: 'Wirid & Doa Khusus Para Wali.',
  doaHeaderSubtitle:
    'Koleksi bacaan tawasul, wirid, karomah, dan amalan yang dinisbatkan kepada para wali di Nusantara.',
};

interface LegacySiteCopyAliases {
  paywallDescription?: string;
  paywallButtonText?: string;
  infaqTitle?: string;
  infaqSubtitle?: string;
  munajatTitle?: string;
  munajatSubtitle?: string;
  bacaanSubtitle?: string;
  doaKhususSubtitle?: string;
}

export function mergeWithDefaultSiteCopy(
  raw?: Partial<SiteCopyConfig & LegacySiteCopyAliases> | null
): SiteCopyConfig {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_SITE_COPY;
  }

  const rawPackages = Array.isArray(raw.quickNominalPackages) ? raw.quickNominalPackages : [];
  const validPackages: QuickNominalPackage[] =
    rawPackages.length > 0
      ? rawPackages
          .map((pkg: Partial<QuickNominalPackage> & { sublabel?: string }) => {
            const amount = Number(pkg?.amount) >= 1000 ? Number(pkg.amount) : 25000;
            const label =
              typeof pkg?.label === 'string' && pkg.label.trim()
                ? pkg.label.trim()
                : `Rp ${(amount / 1000).toFixed(0)}rb`;
            const tag =
              typeof pkg?.tag === 'string' && pkg.tag.trim()
                ? pkg.tag.trim()
                : label;
            const desc =
              typeof pkg?.desc === 'string' && pkg.desc.trim()
                ? pkg.desc.trim()
                : typeof pkg?.sublabel === 'string'
                  ? pkg.sublabel.trim()
                  : '';
            return {
              amount,
              label,
              tag,
              desc,
              ...(pkg?.badge ? { badge: String(pkg.badge).trim() } : {}),
            };
          })
          .filter((p) => p.amount >= 1000)
      : DEFAULT_SITE_COPY.quickNominalPackages;

  const str = (val: unknown, fallback: string): string =>
    typeof val === 'string' && val.trim().length > 0 ? val.trim() : fallback;

  return {
    heroTitle: str(raw.heroTitle, DEFAULT_SITE_COPY.heroTitle),
    heroSubtitle: str(raw.heroSubtitle, DEFAULT_SITE_COPY.heroSubtitle),
    jumatBannerTitle: str(raw.jumatBannerTitle, DEFAULT_SITE_COPY.jumatBannerTitle),
    jumatBannerSubtitle: str(raw.jumatBannerSubtitle, DEFAULT_SITE_COPY.jumatBannerSubtitle),
    searchPlaceholder: str(raw.searchPlaceholder, DEFAULT_SITE_COPY.searchPlaceholder),
    tabLabelAll: str(raw.tabLabelAll, DEFAULT_SITE_COPY.tabLabelAll),
    tabLabelWaliSongo: str(raw.tabLabelWaliSongo, DEFAULT_SITE_COPY.tabLabelWaliSongo),
    tabLabelUlama: str(raw.tabLabelUlama, DEFAULT_SITE_COPY.tabLabelUlama),
    tabLabelRaja: str(raw.tabLabelRaja, DEFAULT_SITE_COPY.tabLabelRaja),
    cardPrimaryCta: str(raw.cardPrimaryCta, DEFAULT_SITE_COPY.cardPrimaryCta),
    cardSecondaryMapCta: str(raw.cardSecondaryMapCta, DEFAULT_SITE_COPY.cardSecondaryMapCta),
    readerTabMainStory: str(raw.readerTabMainStory, DEFAULT_SITE_COPY.readerTabMainStory),
    readerTabPrayerGuide: str(raw.readerTabPrayerGuide, DEFAULT_SITE_COPY.readerTabPrayerGuide),
    paywallBadge: str(raw.paywallBadge, DEFAULT_SITE_COPY.paywallBadge),
    paywallTitle: str(raw.paywallTitle, DEFAULT_SITE_COPY.paywallTitle),
    paywallSubtitle: str(
      raw.paywallSubtitle ?? raw.paywallDescription,
      DEFAULT_SITE_COPY.paywallSubtitle
    ),
    paywallPrimaryButton: str(
      raw.paywallPrimaryButton ?? raw.paywallButtonText,
      DEFAULT_SITE_COPY.paywallPrimaryButton
    ),
    rubrikHeaderSubtitle: str(raw.rubrikHeaderSubtitle, DEFAULT_SITE_COPY.rubrikHeaderSubtitle),
    infaqHeadline: str(raw.infaqHeadline ?? raw.infaqTitle, DEFAULT_SITE_COPY.infaqHeadline),
    infaqSubheadline: str(
      raw.infaqSubheadline ?? raw.infaqSubtitle,
      DEFAULT_SITE_COPY.infaqSubheadline
    ),
    infaqTransparencyNote: str(raw.infaqTransparencyNote, DEFAULT_SITE_COPY.infaqTransparencyNote),
    munajatHeaderTitle: str(
      raw.munajatHeaderTitle ?? raw.munajatTitle,
      DEFAULT_SITE_COPY.munajatHeaderTitle
    ),
    munajatHeaderSubtitle: str(
      raw.munajatHeaderSubtitle ?? raw.munajatSubtitle,
      DEFAULT_SITE_COPY.munajatHeaderSubtitle
    ),
    doaHajatPlaceholder: str(raw.doaHajatPlaceholder, DEFAULT_SITE_COPY.doaHajatPlaceholder),
    unlockSuccessMessage: str(raw.unlockSuccessMessage, DEFAULT_SITE_COPY.unlockSuccessMessage),
    quickNominalPackages: validPackages,
    bacaanTitle: str(raw.bacaanTitle, DEFAULT_SITE_COPY.bacaanTitle),
    yasinHeaderSubtitle: str(
      raw.yasinHeaderSubtitle ?? raw.bacaanSubtitle,
      DEFAULT_SITE_COPY.yasinHeaderSubtitle
    ),
    tawassulTitle: str(raw.tawassulTitle, DEFAULT_SITE_COPY.tawassulTitle),
    tawassulPlaceholder: str(raw.tawassulPlaceholder, DEFAULT_SITE_COPY.tawassulPlaceholder),
    postPrayerTitle: str(raw.postPrayerTitle, DEFAULT_SITE_COPY.postPrayerTitle),
    doaKhususTitle: str(raw.doaKhususTitle, DEFAULT_SITE_COPY.doaKhususTitle),
    doaHeaderSubtitle: str(
      raw.doaHeaderSubtitle ?? raw.doaKhususSubtitle,
      DEFAULT_SITE_COPY.doaHeaderSubtitle
    ),
  };
}

export function getCachedSiteCopy(): SiteCopyConfig {
  if (typeof window === 'undefined') return DEFAULT_SITE_COPY;
  try {
    const raw = localStorage.getItem(SITE_COPY_CACHE_KEY);
    if (!raw) return DEFAULT_SITE_COPY;
    return mergeWithDefaultSiteCopy(JSON.parse(raw));
  } catch {
    return DEFAULT_SITE_COPY;
  }
}

export function setCachedSiteCopy(copy: SiteCopyConfig): void {
  if (typeof window === 'undefined') return;
  try {
    const merged = mergeWithDefaultSiteCopy(copy);
    localStorage.setItem(SITE_COPY_CACHE_KEY, JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent(SITE_COPY_EVENT, { detail: merged }));
  } catch {}
}

let cloudFetchPromise: Promise<SiteCopyConfig> | null = null;

export async function fetchSiteCopyFromCloud(force = false): Promise<SiteCopyConfig> {
  if (!force && cloudFetchPromise) {
    return cloudFetchPromise;
  }
  cloudFetchPromise = (async () => {
    try {
      const [{ db }, { doc, getDoc }] = await Promise.all([
        import('./firebase'),
        import('firebase/firestore'),
      ]);
      const snap = await getDoc(doc(db, 'settings', 'site_copy'));
      if (snap.exists()) {
        const merged = mergeWithDefaultSiteCopy(
          snap.data() as Partial<SiteCopyConfig> & Record<string, unknown>
        );
        setCachedSiteCopy(merged);
        return merged;
      }
    } catch {
      // Fallback silently to cached/default copy
    }
    return getCachedSiteCopy();
  })();
  return cloudFetchPromise;
}

export async function saveSiteCopyToCloud(newCopy: SiteCopyConfig): Promise<SiteCopyConfig> {
  const merged = mergeWithDefaultSiteCopy(newCopy);
  setCachedSiteCopy(merged);
  const [{ db, handleFirestoreError, OperationType }, { doc, setDoc, serverTimestamp }] =
    await Promise.all([import('./firebase'), import('firebase/firestore')]);
  try {
    await setDoc(doc(db, 'settings', 'site_copy'), {
      ...merged,
      updatedAt: serverTimestamp(),
    });
    cloudFetchPromise = Promise.resolve(merged);
    return merged;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'settings/site_copy');
    throw error;
  }
}

export type UseSiteCopyReturn = SiteCopyConfig & {
  siteCopy: SiteCopyConfig;
  setSiteCopy: React.Dispatch<React.SetStateAction<SiteCopyConfig>>;
  refreshSiteCopy: () => Promise<SiteCopyConfig>;
};

export function useSiteCopy(): UseSiteCopyReturn {
  const [siteCopy, setSiteCopy] = useState<SiteCopyConfig>(() => getCachedSiteCopy());

  useEffect(() => {
    let mounted = true;
    let triggered = false;

    const triggerCloudSync = () => {
      if (triggered) return;
      triggered = true;
      fetchSiteCopyFromCloud(false).then((latest) => {
        if (mounted) {
          setSiteCopy(latest);
        }
      });
    };

    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;
    events.forEach((evt) => window.addEventListener(evt, triggerCloudSync, { once: true, passive: true }));
    const timer = window.setTimeout(triggerCloudSync, 3500);

    const handleCustomUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<SiteCopyConfig>;
      if (customEvt.detail && mounted) {
        setSiteCopy(customEvt.detail);
      } else if (mounted) {
        setSiteCopy(getCachedSiteCopy());
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === SITE_COPY_CACHE_KEY && mounted) {
        setSiteCopy(getCachedSiteCopy());
      }
    };

    window.addEventListener(SITE_COPY_EVENT, handleCustomUpdate);
    window.addEventListener('storage', handleStorage);
    return () => {
      mounted = false;
      window.clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, triggerCloudSync));
      window.removeEventListener(SITE_COPY_EVENT, handleCustomUpdate);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const refreshSiteCopy = useCallback(async () => {
    const latest = await fetchSiteCopyFromCloud(true);
    setSiteCopy(latest);
    return latest;
  }, []);

  return {
    ...siteCopy,
    siteCopy,
    setSiteCopy,
    refreshSiteCopy,
  };
}
