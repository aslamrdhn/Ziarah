import React, { useState, useEffect, useMemo, useRef, useDeferredValue, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  Compass,
  Filter,
  ArrowDown,
  BookOpen,
  Map as MapIcon,
  Film,
} from 'lucide-react';
import type { ZiarahSite } from '../data/sites';
import { ALL_PROVINCES, TOTAL_SITE_COUNT, TOTAL_PROVINCES_COUNT } from '../data/initialSites';
import { useSites } from '../context/SiteContext';
import { Link } from 'react-router-dom';
import { optimizeSiteImageUrl, getSiteImageSrcSet, handleOptimizedImageError } from '../lib/imageOptimizer';
import {
  useAuthenticSiteImage,
  getRegionalArchitecturalPhoto,
  getSiteGoogleMapsPhotosUrl,
  isFirst12OwnerSite,
  hasVerifiedSitePhoto,
} from '../lib/authenticSiteImages';
import { getSitePath, getSiteSlug, formatMakamHeading, getSiteDisplayHeading } from '../lib/siteSlugs';
import { extractShortEra, getSiteBarokahHajat, getEffectiveSiteDoaKhusus } from '../lib/siteLogistics';
import { useSiteCopy, formatDynamicHeroSubtitle } from '../lib/siteCopy';
import { TasbihRingWidget } from '../components/TasbihRingWidget';
import { stripMarkdownAsterisks } from '../lib/formatText';

const ZiarahStoryReel = lazy(() =>
  import('../components/ZiarahStoryReel').then((m) => ({ default: m.ZiarahStoryReel }))
);

const SiteCardThumbnail: React.FC<{
  site: ZiarahSite;
  altText: string;
  badgeLabel: string;
  isLcpCandidate: boolean;
}> = React.memo(({ site, altText, badgeLabel, isLcpCandidate }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState<boolean>(
    () => isLcpCandidate || isFirst12OwnerSite(site)
  );

  useEffect(() => {
    if (isNearViewport) return;
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isNearViewport]);

  const resolvedImageUrl = useAuthenticSiteImage(site, isNearViewport);
  const optimizedThumb = optimizeSiteImageUrl(resolvedImageUrl, 480, 68);
  const thumbSrcSet = getSiteImageSrcSet(resolvedImageUrl, 68);
  const fallbackThumb = getRegionalArchitecturalPhoto(site);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8E8ED]"
    >
      <img
        src={optimizedThumb}
        srcSet={thumbSrcSet}
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 360px"
        onError={(e) => handleOptimizedImageError(e, resolvedImageUrl, fallbackThumb)}
        alt={altText}
        width={400}
        height={250}
        loading={isLcpCandidate ? 'eager' : 'lazy'}
        fetchPriority={isLcpCandidate ? 'high' : 'auto'}
        decoding={isLcpCandidate ? 'sync' : 'async'}
        referrerPolicy="no-referrer"
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
      />
      <span className="absolute top-3 left-3 text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/75 text-white backdrop-blur-md">
        {badgeLabel}
      </span>
    </div>
  );
});

const SiteDetails = lazy(() =>
  import('../components/SiteDetails').then((m) => ({ default: m.SiteDetails }))
);

const HeroCinemaShowcase = lazy(() =>
  import('../components/HeroCinemaShowcase').then((m) => ({ default: m.HeroCinemaShowcase }))
);

const InteractiveHeritageCanvas = lazy(() =>
  import('../components/InteractiveHeritageCanvas').then((m) => ({ default: m.InteractiveHeritageCanvas }))
);

interface DaftarMakamProps {
  onSelectSite: (site: ZiarahSite) => void;
  savedSiteIds?: string[];
  handleToggleSave?: (id: string) => void;
  savedDoas?: string[];
  onToggleSaveDoa?: (id: string) => void;
  onOpenKontribusi?: () => void;
}

export type EmotionalIntentId =
  | 'all'
  | 'keteduhan'
  | 'ikhtiar'
  | 'syifa'
  | 'keteguhan'
  | 'ilmu'
  | 'keluarga';

const EMOTIONAL_INTENTS: Array<{
  id: EmotionalIntentId;
  label: string;
  shortLabel: string;
  empathyTitle?: string;
  empathyMessage?: string;
  practicalAnchor?: string;
}> = [
  { id: 'all', label: 'Semua Riwayat', shortLabel: 'Semua' },
  {
    id: 'keteduhan',
    label: 'Hati Gelisah & Mencari Ketenangan Batin',
    shortLabel: 'Hati Gelisah',
    empathyTitle: 'Cermin Pintu Ruhani — Saat Hati Terasa Penuh & Sulit Tenang',
    empathyMessage:
      'Ketika pikiran terus berisik dan dada terasa sempit, para ulama mengajarkan untuk melambatkan langkah: melepaskan sejenak hal-hal di luar kendali kita, lalu menenangkan batin lewat dzikir dan meneladani kesabaran para wali.',
    practicalAnchor:
      'Mulai dari 1 langkah kecil: tarik napas pelan, ucapkan istighfar 3 kali, lalu pilih salah satu makam di bawah ini.',
  },
  {
    id: 'ikhtiar',
    label: 'Ikhtiar Rezeki, Usaha & Bebas Lilitan Hutang',
    shortLabel: 'Ikhtiar Rezeki',
    empathyTitle: 'Cermin Pintu Ruhani — Ketika Ikhtiar Lahir Terasa Sempit',
    empathyMessage:
      'Saat hitungan usaha terasa buntu dan rasa takut akan hari esok menekan pikiran, para ulama mengingatkan agar hati tidak ikut menyempit: rapikan niat, mohonkan ridha orang tua, jaga kejujuran usaha, dan tetap sisihkan kebaikan sekecil apa pun.',
    practicalAnchor:
      'Di bawah ini terhimpun makam para ulama pelopor kemandirian dan kedermawanan yang dahulu menuntun umat melewati masa sulit.',
  },
  {
    id: 'syifa',
    label: "Ikhtiar Kesembuhan & Syifa' Penyakit",
    shortLabel: 'Kesembuhan',
    empathyTitle: 'Cermin Pintu Ruhani — Menguatkan Hati Mendampingi Ikhtiar Medis',
    empathyMessage:
      'Menghadapi ujian sakit—baik untuk diri sendiri maupun orang tercinta—menguras tenaga lahir dan batin. Di samping terus berobat secara medis, memohon langsung kepada Allah Yang Maha Menyembuhkan membantu menjaga hati tetap lapang dan sabar.',
    practicalAnchor:
      'Baca doa-doa kesembuhan sesuai sunnah (lengkap tulisan Latin & artinya) serta kisah ketabahan para ulama di bawah ini.',
  },
  {
    id: 'ilmu',
    label: 'Memohon Ilmu Berkah & Keshalihan Keturunan',
    shortLabel: 'Ilmu & Kebijaksanaan',
    empathyTitle: 'Cermin Pintu Ruhani — Merawat Cahaya Ilmu & Doa untuk Anak Cucu',
    empathyMessage:
      'Tradisi pesantren mengajarkan bahwa doa tulus orang tua yang istiqamah dan kecintaan pada majelis ilmu adalah benteng terbaik bagi masa depan keturunan.',
    practicalAnchor:
      'Telusuri jejak para mahaguru pesantren di bawah ini untuk mengambil hikmah pendidikan dan mendoakan keluarga Anda.',
  },
  {
    id: 'keteguhan',
    label: 'Keteguhan Iman, Wibawa & Amanah Kepemimpinan',
    shortLabel: 'Keteguhan & Amanah',
    empathyTitle: 'Cermin Pintu Ruhani — Menjaga Prinsip di Tengah Ujian Berat',
    empathyMessage:
      'Memikul amanah besar atau mencoba memperbaiki diri dari kesalahan masa lalu membutuhkan keteguhan hati. Para ulama dan pemimpin adil Nusantara dahulu pun melewati keterasingan dan tekanan sebelum menemukan jalan keluarnya.',
    practicalAnchor:
      'Resapi laku batin dan keteguhan para tokoh di bawah ini sebagai penguat langkah Anda.',
  },
  {
    id: 'keluarga',
    label: 'Keluarga Sakinah & Melembutkan Hati',
    shortLabel: 'Keluarga & Jodoh',
    empathyTitle: 'Cermin Pintu Ruhani — Melembutkan Hati & Menjaga Keutuhan Rumah Tangga',
    empathyMessage:
      'Banyak keretakan lahir bukan karena kurangnya cinta, melainkan karena hati yang sama-sama lelah dan keras. Meneladani kelembutan dakwah para ulama membantu kita kembali melihat keluarga dengan kasih sayang dan kesabaran.',
    practicalAnchor:
      'Pilih salah satu makam di bawah ini atau susun Lembar Munajat Pribadi untuk keluarga Anda.',
  },
];

function extractCoreWasilahHajat(rawHajat: string): string {
  const cleaned = (rawHajat || '').replace(/<!--more-->/g, ' ').replace(/\s+/g, ' ').trim();
  const withoutPrefix = cleaned
    .replace(
      /^(?:Biasanya peziarah yang datang ke makam|Para peziarah dan santri yang berziarah ke pusara|Banyak jamaah dan peziarah datang ke makam)\s+[^,]+?(?:bertawassul mengharapkan wasilah|lazim bertawassul memohon wasilah|dengan hajat memohon wasilah)\s+/i,
      ''
    )
    .trim();
  if (!withoutPrefix) return cleaned;
  return withoutPrefix.charAt(0).toUpperCase() + withoutPrefix.slice(1);
}

export function matchesEmotionalIntent(site: ZiarahSite, intent: EmotionalIntentId): boolean {
  if (intent === 'all') return true;

  const primaryCorpus = [
    site.id,
    site.legacyId || '',
    site.title,
    site.name,
    site.category,
    site.era || '',
    (site.description || '').replace(/<!--more-->/g, ' '),
    (site.history || '').replace(/<!--more-->/g, ' '),
    site.barokahHajat || '',
    Array.isArray(site.karomah) ? site.karomah.join(' ') : site.karomah || '',
  ]
    .join(' ')
    .toLowerCase();

  switch (intent) {
    case 'keteduhan': {
      const keywords = [
        'kelembutan',
        'wayang',
        'gamelan',
        'tembang',
        'suluk',
        'ketenangan',
        'keteduhan',
        'mahabbah',
        'sholawat',
        'kalijaga',
        'bonang',
        'muria',
        'sekumpul',
        'sholeh tanggul',
        'hamid pasuruan',
        'abu bakar',
        'al-haddad',
        'al-aydrus',
      ];
      const effId = site.legacyId || site.id;
      return (
        keywords.some((kw) => primaryCorpus.includes(kw)) ||
        site.category === 'Habaib' ||
        effId === 'wali-4' ||
        effId === 'wali-8' ||
        effId === 'wali-9'
      );
    }
    case 'ikhtiar': {
      const keywords = [
        'rezeki',
        'dagang',
        'perniagaan',
        'niaga',
        'pelabuhan',
        'saudagar',
        'dermawan',
        'kedermawanan',
        'pertanian',
        'nelayan',
        'kemakmuran',
        'drajat',
        'malik ibrahim',
        'kuncung',
        'luar batang',
        'kwitang',
        'empang bogor',
      ];
      const effId = site.legacyId || site.id;
      return (
        keywords.some((kw) => primaryCorpus.includes(kw)) ||
        effId === 'wali-1' ||
        effId === 'wali-2' ||
        effId === 'wali-6' ||
        effId === 'wali-9'
      );
    }
    case 'syifa': {
      const syifaKeywords = [
        'sembuh',
        'kesembuhan',
        'penyakit',
        'sakit',
        'syifa',
        'tabib',
        'pengobatan',
        'obat',
        'sumur',
        'mata air',
        'kesehatan',
        'afiat',
      ];
      const syifaSiteMatchers = [
        'sunan-gresik',
        'sunan gresik',
        'malik ibrahim',
        'sunan-muria',
        'sunan muria',
        'sunan-drajat',
        'sunan drajat',
        'syekh-abdul-muhyi',
        'abdul muhyi',
        'habib-husein-luar-batang',
        'luar batang',
        'mbah-priok',
        'mbah priok',
        'habib-kuncung',
        'habib kuncung',
        'habib-abdullah-empang',
        'empang bogor',
        'syekh-jangkung',
        'syekh jangkung',
        'kh-dalhar',
        'mbah dalhar',
        'kh-abdul-hamid-pasuruan',
        'hamid pasuruan',
        'guru-sekumpul',
        'guru sekumpul',
        'tuan-guru-babussalam',
        'babussalam',
      ];
      const effId = site.legacyId || site.id;
      const slug = getSiteSlug(site);
      return (
        syifaKeywords.some((kw) => primaryCorpus.includes(kw)) ||
        syifaSiteMatchers.some((m) => primaryCorpus.includes(m) || slug.includes(m)) ||
        effId === 'wali-1' ||
        effId === 'wali-6' ||
        effId === 'wali-8'
      );
    }
    case 'keteguhan': {
      const keywords = [
        'pahlawan',
        'perlawanan',
        'benteng',
        'pengasingan',
        'diasingkan',
        'laskar',
        'jihad',
        'diponegoro',
        'fatahillah',
        'faletehan',
        'sultan agung',
        'hasanuddin',
        'imam bonjol',
        'cik di tiro',
        'antasari',
        'yusuf al-makassari',
        'abdul jalil',
      ];
      const effId = site.legacyId || site.id;
      return (
        keywords.some((kw) => primaryCorpus.includes(kw)) ||
        effId === 'wali-3' ||
        effId === 'wali-5' ||
        effId === 'wali-7'
      );
    }
    case 'ilmu': {
      const keywords = [
        'kitab',
        'pengarang',
        'mahaguru',
        'fikih',
        'hadits',
        'tafsir',
        'nahwu',
        'pesantren',
        'madrasah',
        'kholil',
        'hasyim',
        'wahab',
        'bisri',
        'nawawi',
        'arsyad',
        'mahfudz',
        'sholeh darat',
        'abdurrauf',
        'hamzah fansuri',
        'as\'ad',
      ];
      return keywords.some((kw) => primaryCorpus.includes(kw));
    }
    case 'keluarga': {
      const keywords = [
        'keluarga',
        'sakinah',
        'rukun',
        'kerukunan',
        'mahabbah',
        'kasih sayang',
        'keturunan',
        'dzurriyah',
        'ibu',
        'istri',
        'muria',
        'kalijaga',
        'ampel',
        'kwitang',
        'empang',
        'sekumpul',
        'tanggul',
      ];
      return keywords.some((kw) => primaryCorpus.includes(kw)) || site.category === 'Habaib';
    }
    default:
      return false;
  }
}

const INITIAL_VISIBLE_COUNT = 12;
const INITIAL_VISIBLE_SITES = INITIAL_VISIBLE_COUNT;
const PROGRESSIVE_BATCH_SIZE = 18;

const FULL_CATALOG_INTENT_COUNTS: Record<EmotionalIntentId, number> = {
  all: TOTAL_SITE_COUNT,
  keteduhan: 59,
  ikhtiar: 77,
  syifa: 65,
  keteguhan: 63,
  ilmu: 74,
  keluarga: 77,
};

export const DaftarMakam: React.FC<DaftarMakamProps> = React.memo(({
  onSelectSite,
  savedSiteIds = [],
  handleToggleSave,
  savedDoas = [],
  onToggleSaveDoa,
  onOpenKontribusi,
}) => {
  const { sites: ziarahSites, isLoading, ensureFullSitesLoaded } = useSites();
  const { copy } = useSiteCopy();

  useEffect(() => {
    if (typeof window === 'undefined') {
      ensureFullSitesLoaded();
      return;
    }
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let idleId: number | null = null;
    const timerId = window.setTimeout(() => {
      if ( typeof win.requestIdleCallback === 'function') {
        idleId = win.requestIdleCallback(() => {
          ensureFullSitesLoaded();
        }, { timeout: 3000 });
      } else {
        ensureFullSitesLoaded();
      }
    }, 1600);
    return () => {
      window.clearTimeout(timerId);
      if (idleId !== null && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId);
      }
    };
  }, [ensureFullSitesLoaded]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedProvince, setSelectedProvince] = useState('Semua Provinsi');
  const [emotionalFilter, setEmotionalFilter] = useState<EmotionalIntentId>('all');
  const [showVisualShowcase, setShowVisualShowcase] = useState(false);
  const [showEditorialFaq, setShowEditorialFaq] = useState(false);
  const [heroMediaMode, setHeroMediaMode] = useState<'video' | 'constellation'>('video');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [activeSiteModal, setActiveSiteModal] = useState<ZiarahSite | null>(null);
  const [originPathBeforeModal, setOriginPathBeforeModal] = useState<string>('/');
  const heroImgRef = useRef<HTMLImageElement | null>(null);
  const loadMoreSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const img = heroImgRef.current;
        if (!img) return;
        const y = window.scrollY;
        if (y <= 0) {
          img.style.transform = 'translate3d(0, 0px, 0) scale(1)';
          return;
        }
        const clamped = Math.min(y, 480);
        img.style.transform = `translate3d(0, ${clamped * 0.04}px, 0) scale(${1 + clamped * 0.00014})`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleOpenReaderModal = React.useCallback(
    (site: ZiarahSite, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
      }
      ensureFullSitesLoaded();
      if (typeof window !== 'undefined') {
        const current = window.location.pathname.startsWith('/direktori') ? '/direktori' : '/';
        setOriginPathBeforeModal(current);
        window.history.pushState({ inPlaceReaderSiteId: site.id }, '', getSitePath(site));
      }
      setActiveSiteModal(site);
    },
    [ensureFullSitesLoaded]
  );

  const handleCloseReaderModal = React.useCallback(() => {
    setActiveSiteModal(null);
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/situs/') || window.location.pathname.startsWith('/makam/'))) {
      window.history.pushState(null, '', originPathBeforeModal || '/');
    }
  }, [originPathBeforeModal]);

  useEffect(() => {
    const onPopState = () => {
      if (activeSiteModal) {
        setActiveSiteModal(null);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [activeSiteModal]);

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const sites = ziarahSites;
  const currentModalSite = useMemo(
    () => (activeSiteModal ? ziarahSites.find((s) => s.id === activeSiteModal.id) || activeSiteModal : null),
    [activeSiteModal, ziarahSites]
  );
  const isJumatMomentum = [4, 5].includes(new Date().getDay());
  const featuredHaulSite =
    sites.find((s) => Boolean(s.haulSchedule && (s.untoldStory || s.karomah))) || sites[0];

  const categories = useMemo(
    () => [
      { id: 'Semua', label: copy.tabLabelAll },
      { id: 'Walisongo', label: copy.tabLabelWaliSongo },
      { id: 'Ulama Nusantara', label: copy.tabLabelUlama },
      { id: 'Habaib', label: 'Habaib' },
      { id: 'Auliya Nusantara', label: copy.tabLabelRaja },
    ],
    [copy.tabLabelAll, copy.tabLabelWaliSongo, copy.tabLabelUlama, copy.tabLabelRaja]
  );

  const dynamicEmotionalIntents = useMemo(
    () =>
      EMOTIONAL_INTENTS.map((item) => ({
        id: item.id,
        label: item.label,
        shortLabel: item.shortLabel,
        empathyTitle: item.empathyTitle,
        empathyMessage: item.empathyMessage,
        practicalAnchor: item.practicalAnchor,
      })),
    []
  );

  const provinces = useMemo(() => {
    const merged = new Set<string>(ALL_PROVINCES);
    for (const s of ziarahSites) {
      if (s.location?.province) merged.add(s.location.province);
    }
    const list = Array.from(merged).filter((p) => p !== 'Semua Provinsi').sort();
    return ['Semua Provinsi', ...list];
  }, [ziarahSites]);

  const totalCatalogCount = Math.max(TOTAL_SITE_COUNT, ziarahSites.length);

  // Precompute search corpus and emotional intent flags once per site array change
  const siteSearchIndexMap = useMemo(() => {
    const map = new Map<
      string,
      {
        searchCorpus: string;
        intents: Record<Exclude<EmotionalIntentId, 'all'>, boolean>;
      }
    >();
    for (const site of ziarahSites) {
      const searchCorpus = [
        site.name,
        site.title,
        site.location.city,
        site.location.province,
        (site.description || '').replace(/<!--more-->/g, ' '),
        (site.history || '').replace(/<!--more-->/g, ' '),
        site.sanad || '',
        site.era || '',
      ]
        .join(' ')
        .toLowerCase();

      map.set(site.id, {
        searchCorpus,
        intents: {
          keteduhan: matchesEmotionalIntent(site, 'keteduhan'),
          ikhtiar: matchesEmotionalIntent(site, 'ikhtiar'),
          syifa: matchesEmotionalIntent(site, 'syifa'),
          keteguhan: matchesEmotionalIntent(site, 'keteguhan'),
          ilmu: matchesEmotionalIntent(site, 'ilmu'),
          keluarga: matchesEmotionalIntent(site, 'keluarga'),
        },
      });
    }
    return map;
  }, [ziarahSites]);

  const baseFilteredSites = useMemo(() => {
    const q = deferredSearchQuery.toLowerCase().trim();
    return ziarahSites.filter((site: ZiarahSite) => {
      const indexed = siteSearchIndexMap.get(site.id);
      const matchesSearch = !q || (indexed ? indexed.searchCorpus.includes(q) : true);
      const matchesCategory = selectedCategory === 'Semua' || site.category === selectedCategory;
      const matchesProvince =
        selectedProvince === 'Semua Provinsi' ||
        site.location.province === selectedProvince ||
        (selectedProvince === 'Papua' &&
          (site.location.province === 'Papua Barat' || site.location.province === 'Papua Barat Daya'));

      return matchesSearch && matchesCategory && matchesProvince;
    });
  }, [deferredSearchQuery, selectedCategory, selectedProvince, ziarahSites, siteSearchIndexMap]);

  const intentCountMap = useMemo(() => {
    const isUnfilteredInitial =
      ziarahSites.length < TOTAL_SITE_COUNT &&
      !deferredSearchQuery.trim() &&
      selectedCategory === 'Semua' &&
      selectedProvince === 'Semua Provinsi';

    if (isUnfilteredInitial) {
      return FULL_CATALOG_INTENT_COUNTS;
    }

    const counts: Record<EmotionalIntentId, number> = {
      all: baseFilteredSites.length,
      keteduhan: 0,
      ikhtiar: 0,
      syifa: 0,
      keteguhan: 0,
      ilmu: 0,
      keluarga: 0,
    };
    for (const site of baseFilteredSites) {
      const indexed = siteSearchIndexMap.get(site.id);
      if (indexed ? indexed.intents.keteduhan : matchesEmotionalIntent(site, 'keteduhan')) counts.keteduhan++;
      if (indexed ? indexed.intents.ikhtiar : matchesEmotionalIntent(site, 'ikhtiar')) counts.ikhtiar++;
      if (indexed ? indexed.intents.syifa : matchesEmotionalIntent(site, 'syifa')) counts.syifa++;
      if (indexed ? indexed.intents.keteguhan : matchesEmotionalIntent(site, 'keteguhan')) counts.keteguhan++;
      if (indexed ? indexed.intents.ilmu : matchesEmotionalIntent(site, 'ilmu')) counts.ilmu++;
      if (indexed ? indexed.intents.keluarga : matchesEmotionalIntent(site, 'keluarga')) counts.keluarga++;
    }
    return counts;
  }, [baseFilteredSites, siteSearchIndexMap, ziarahSites.length, deferredSearchQuery, selectedCategory, selectedProvince]);

  const filteredSites = useMemo(() => {
    if (emotionalFilter === 'all') {
      return baseFilteredSites;
    }

    const intentMatches = baseFilteredSites.filter((site) => {
      const indexed = siteSearchIndexMap.get(site.id);
      return indexed ? indexed.intents[emotionalFilter] : matchesEmotionalIntent(site, emotionalFilter);
    });
    return intentMatches;
  }, [baseFilteredSites, emotionalFilter, siteSearchIndexMap]);

  const isFiltered =
    Boolean(searchQuery.trim()) ||
    selectedCategory !== 'Semua' ||
    selectedProvince !== 'Semua Provinsi' ||
    emotionalFilter !== 'all';

  const displayedSites = useMemo(() => {
    if (isFiltered) return filteredSites;
    return filteredSites.slice(0, visibleCount);
  }, [filteredSites, isFiltered, visibleCount]);

  useEffect(() => {
    if (isFiltered || visibleCount >= totalCatalogCount) return;
    const node = loadMoreSentinelRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          ensureFullSitesLoaded().then((all) => {
            setVisibleCount((prev) =>
              Math.min(Math.max(all.length, filteredSites.length, totalCatalogCount), prev + PROGRESSIVE_BATCH_SIZE)
            );
          });
        }
      },
      { rootMargin: '360px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [isFiltered, visibleCount, totalCatalogCount, filteredSites.length, ensureFullSitesLoaded]);

  const dynamicSiteCount = ziarahSites.length >= TOTAL_SITE_COUNT ? ziarahSites.length : TOTAL_SITE_COUNT;
  const dynamicProvinceCount = useMemo(() => {
    const uniqueCount = new Set(ziarahSites.map((s) => s.location?.province).filter(Boolean)).size;
    return uniqueCount >= TOTAL_PROVINCES_COUNT ? uniqueCount : TOTAL_PROVINCES_COUNT;
  }, [ziarahSites]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-stone-600">
        <div className="w-8 h-8 border-2 border-stone-200 border-t-emerald-700 rounded-full animate-spin mb-4" />
        <p className="text-sm font-serif italic">Memuat arsip &amp; direktori makam Nusantara...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFFFFF] text-[#1D1D1F] pb-28 sm:pb-16 relative z-10">
      {/* =====================================================================
          1. HERO GELAP SINEMATIK (Cinematic Dark Hero `#000000` bergaya Apple)
          ===================================================================== */}
      <div className="bg-[#000000] text-[#F5F5F7]">
        <header className="max-w-[980px] mx-auto px-5 pt-14 sm:pt-20 pb-4 text-center space-y-4 sm:space-y-5">
          <span className="inline-block text-xs font-medium tracking-widest uppercase text-[#A1A1A6]">
            {copy.heroBadge}
          </span>

          <h1 className="apple-headline text-4xl sm:text-6xl font-semibold text-[#F5F5F7] max-w-4xl mx-auto">
            {copy.heroTitle}
          </h1>

          <p className="text-base sm:text-xl text-[#D2D2D7] max-w-2xl mx-auto leading-relaxed">
            {formatDynamicHeroSubtitle(copy.heroSubtitle, dynamicSiteCount, dynamicProvinceCount)}
          </p>

          {/* 2 Tombol Pill CTA Bergaya Apple */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() =>
                document.getElementById('katalog-direktori')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="bg-[#1E6B47] hover:bg-[#175639] text-white rounded-full px-6 py-2.5 text-sm font-medium transition-colors cursor-pointer"
            >
              Jelajahi Makam
            </button>

            <Link
              to="/panduan"
              className="border border-white/50 text-[#F5F5F7] hover:bg-white hover:text-[#1D1D1F] rounded-full px-6 py-2.5 text-sm font-medium transition-colors"
            >
              Panduan Doa Gratis
            </Link>
          </div>

          {/* Tautan fitur sekunder di bawah CTA sebagai baris tautan teks bersih */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-[#A1A1A6]">
            <Link to="/peta" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
              <MapIcon className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>Peta &amp; Jalur Wali Songo</span>
            </Link>
            <span className="text-white/20" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setShowVisualShowcase(!showVisualShowcase)}
              className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Film className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>{showVisualShowcase ? 'Tutup Eksplorasi Visual' : 'Eksplorasi Visual Nusantara'}</span>
            </button>
            <span className="text-white/20" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() =>
                document.getElementById('hikmah-ziarah-reel')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>Hikmah Ziarah · 5 Slide</span>
            </button>
          </div>
        </header>

        {/* Visual Arsitektur 21:9 + Parallax Halus Bergaya Apple Flagship */}
        <div className="relative max-w-[1160px] mx-auto px-0 sm:px-6 pt-6 pb-0">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden sm:rounded-t-[28px] bg-[#0A0B0D]">
            <img
              ref={heroImgRef}
              src="/hero-fajar.webp"
              srcSet="/hero-fajar-mobile.webp 720w, /hero-fajar.webp 1200w"
              sizes="(max-width: 768px) 100vw, 1160px"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.srcset) {
                  img.srcset = '';
                  img.src = '/hero-fajar.webp';
                  return;
                }
                if (!img.dataset.fallbackStage) {
                  img.dataset.fallbackStage = 'jpg';
                  img.src = '/hero-fajar.jpg';
                } else if (img.dataset.fallbackStage === 'jpg') {
                  img.dataset.fallbackStage = 'thumb';
                  img.src = '/thumbs/wali-9.webp';
                }
              }}
              alt="Suasana pagi di pelataran masjid dan cagar budaya Nusantara"
              width={1200}
              height={675}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/75 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Pemisah Putih 12px khas Apple */}
      <div className="h-3 bg-white" />

      {/* =====================================================================
          2. PITA CERMIN PINTU RUHANI `#F5F5F7` YANG LAPANG & PILLS PENDEK
          ===================================================================== */}
      <div className="bg-[#F5F5F7] border-b border-black/[0.06] py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Optional Collapsible Documentary / Constellation Showcase */}
          {showVisualShowcase && (
            <div className="mb-8 bg-white rounded-[24px] p-4 sm:p-6 border border-black/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#6E6E73] tracking-tight">
                  Eksplorasi Visual Jaringan Dakwah Nusantara
                </span>
                <div className="flex items-center gap-1 p-1 bg-[#F5F5F7] rounded-full border border-black/10">
                  <button
                    type="button"
                    onClick={() => setHeroMediaMode('video')}
                    className={`px-3.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer ${
                      heroMediaMode === 'video' ? 'bg-[#1D1D1F] text-white' : 'text-[#515154] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                    <span>Dokumenter</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroMediaMode('constellation')}
                    className={`px-3.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 transition cursor-pointer ${
                      heroMediaMode === 'constellation' ? 'bg-[#1D1D1F] text-white' : 'text-[#515154] hover:text-[#1D1D1F]'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
                    <span>Konstelasi</span>
                  </button>
                </div>
              </div>

              <Suspense
                fallback={
                  <div className="h-[340px] rounded-2xl bg-[#1D1D1F] flex items-center justify-center text-[#F5F5F7] text-xs">
                    Memuat Visualisasi...
                  </div>
                }
              >
                {heroMediaMode === 'video' ? (
                  <HeroCinemaShowcase
                    onSelectCategory={(cat) => {
                      ensureFullSitesLoaded();
                      setSelectedCategory(cat);
                    }}
                  />
                ) : (
                  <InteractiveHeritageCanvas
                    activeCategory={selectedCategory}
                    onSelectCategory={(cat) => {
                      ensureFullSitesLoaded();
                      setSelectedCategory(cat);
                    }}
                  />
                )}
              </Suspense>
            </div>
          )}

          {/* Header Rata Tengah Cermin Pintu Ruhani */}
          <div className="text-center max-w-2xl mx-auto">
            <span className="block text-xs font-semibold uppercase tracking-widest text-[#1E6B47]">
              Cermin Pintu Ruhani
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#1D1D1F]">
              Apa yang sedang Anda bawa hari ini?
            </h2>
          </div>

          {/* Apple-style Segmented Pill Control */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-3xl sm:rounded-full bg-white border border-black/10 shadow-xs max-w-full">
              {dynamicEmotionalIntents.map((intent) => {
                const isSelected = emotionalFilter === intent.id;
                const count = intentCountMap[intent.id];
                return (
                  <button
                    key={intent.id}
                    type="button"
                    aria-pressed={isSelected}
                    title={intent.label}
                    onClick={() => {
                      ensureFullSitesLoaded();
                      setEmotionalFilter(intent.id);
                    }}
                    className={`px-3.5 py-1.5 min-h-[34px] rounded-full text-xs whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#1D1D1F] text-white shadow-xs font-medium'
                        : 'text-[#515154] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {intent.shortLabel} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kartu Refleksi Cermin Pintu Ruhani (`max-w-4xl mx-auto mt-6 bg-white rounded-[28px]`) */}
          <AnimatePresence mode="wait">
            {emotionalFilter !== 'all' && (() => {
              const activeIntentObj = dynamicEmotionalIntents.find((i) => i.id === emotionalFilter);
              if (!activeIntentObj?.empathyMessage) return null;
              return (
                <motion.div
                  key={activeIntentObj.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="max-w-4xl mx-auto mt-6 bg-white rounded-[28px] p-6 sm:p-8 border border-black/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-start justify-between gap-4"
                >
                  <div className="space-y-2 max-w-3xl">
                    <div className="text-sm sm:text-base font-semibold text-[#1D1D1F]">
                      {activeIntentObj.empathyTitle}
                    </div>
                    <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
                      {activeIntentObj.empathyMessage}
                    </p>
                    {activeIntentObj.practicalAnchor && (
                      <p className="text-xs sm:text-sm font-medium text-[#1E6B47] leading-relaxed">
                        {activeIntentObj.practicalAnchor}
                      </p>
                    )}
                    <div className="pt-1.5 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1E6B47]">
                      <Link to="/panduan" className="hover:text-[#175639] underline underline-offset-4">
                        Baca Panduan Doa Gratis →
                      </Link>
                      <Link to="/donasi" className="hover:text-[#175639] underline underline-offset-4">
                        Susun Lembar Munajat Pribadi →
                      </Link>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmotionalFilter('all')}
                    className="text-xs font-semibold text-[#1E6B47] hover:underline shrink-0 cursor-pointer"
                  >
                    Tampilkan Semua
                  </button>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Pita Tipis Minimalis Pengingat Jumat / Haul di Bawah Segmented Control */}
          {isJumatMomentum ? (
            <div className="max-w-4xl mx-auto mt-6 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6E6E73]">
              <p className="leading-relaxed">
                <strong className="font-semibold text-[#1D1D1F]">{copy.jumatBannerTitle}</strong> — {copy.jumatBannerSubtitle}
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  to="/rubrik"
                  className="py-1 min-h-[28px] inline-flex items-center text-xs font-medium text-[#1E6B47] hover:text-[#175639] underline underline-offset-4"
                >
                  Buka kisah pengobat hati
                </Link>
                <Link
                  to="/infaq#dinding-munajat"
                  className="py-1 min-h-[28px] inline-flex items-center text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] underline underline-offset-4"
                >
                  Titip doa
                </Link>
              </div>
            </div>
          ) : featuredHaulSite ? (
            <div className="max-w-4xl mx-auto mt-6 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#6E6E73]">
              <p className="leading-relaxed">
                <strong className="font-semibold text-[#1D1D1F]">
                  Jejak Haul &amp; Wasiat {formatMakamHeading(featuredHaulSite.title)}
                </strong>{' '}
                ({featuredHaulSite.haulSchedule || 'Waliyullah Nusantara'}) — Menyelami rahasia keteguhan batin beliau saat menghadapi ujian zaman.
              </p>
              <div className="flex items-center gap-4 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handleOpenReaderModal(featuredHaulSite, e)}
                  className="py-1 min-h-[28px] inline-flex items-center text-xs font-medium text-[#1E6B47] hover:text-[#175639] underline underline-offset-4 cursor-pointer"
                >
                  Baca wasiat beliau
                </button>
                <Link
                  to="/infaq#dinding-munajat"
                  className="py-1 min-h-[28px] inline-flex items-center text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] underline underline-offset-4"
                >
                  Dinding munajat
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* =====================================================================
          3. BLOK 2-KOLOM HIGHLIGHT: FILTER PENCARIAN CEPAT (KIRI) & TASBIH RING (KANAN)
          ===================================================================== */}
      <div
        id="katalog-direktori"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-3"
      >
        {/* Kolom Kiri (lg:col-span-7): Kartu Terang #F5F5F7 — Bilah Pencarian + Provinsi + Tab Kategori */}
        <div className="lg:col-span-7 bg-[#F5F5F7] rounded-[28px] p-5 sm:p-7 border border-black/[0.06] flex flex-col justify-between gap-5">
          <div className="space-y-1">
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-[#1E6B47]">
              Direktori &amp; Pencarian Cepat
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1D1D1F]">
              Telusuri {totalCatalogCount} Maqbarah di {TOTAL_PROVINCES_COUNT} Provinsi
            </h3>
            <p className="text-xs sm:text-sm text-[#6E6E73]">
              Cari berdasarkan nama ulama, gelar, kota, provinsi, atau kelompok kategori.
            </p>
          </div>

          <div className="space-y-4">
            {/* Bilah Pencarian Bersih Bergaya Apple (`rounded-full`) + Filter Provinsi */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative flex-1 bg-white rounded-full border border-black/10 px-4 py-2.5 shadow-2xs flex items-center">
                <label htmlFor="site-search-input" className="sr-only">
                  Cari nama tokoh, makam, atau kota
                </label>
                <Search
                  className="w-4 h-4 text-[#86868B] shrink-0 mr-2.5 pointer-events-none"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <input
                  id="site-search-input"
                  type="search"
                  placeholder={copy.searchPlaceholder}
                  value={searchQuery}
                  onFocus={() => {
                    ensureFullSitesLoaded();
                  }}
                  onChange={(e) => {
                    ensureFullSitesLoaded();
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full bg-transparent text-sm text-[#1D1D1F] placeholder-[#86868B] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Hapus pencarian"
                    className="ml-2 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer"
                  >
                    <X className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="relative sm:w-52 shrink-0 bg-white rounded-full border border-black/10 px-4 py-2.5 shadow-2xs">
                <label htmlFor="province-filter-select" className="sr-only">
                  Filter berdasarkan provinsi
                </label>
                <select
                  id="province-filter-select"
                  aria-label="Filter berdasarkan provinsi"
                  value={selectedProvince}
                  onFocus={() => {
                    ensureFullSitesLoaded();
                  }}
                  onChange={(e) => {
                    ensureFullSitesLoaded();
                    setSelectedProvince(e.target.value);
                  }}
                  className="w-full appearance-none pr-6 bg-transparent text-xs sm:text-sm font-medium text-[#1D1D1F] cursor-pointer focus:outline-none"
                >
                  {provinces.map((prov) => (
                    <option key={prov} value={prov} className="bg-white text-[#1D1D1F]">
                      {prov}
                    </option>
                  ))}
                </select>
                <Filter
                  className="w-3.5 h-3.5 text-[#86868B] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Tab Kategori */}
            <div className="flex items-center gap-5 overflow-x-auto no-scrollbar border-t border-black/[0.06] pt-3">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => {
                      ensureFullSitesLoaded();
                      setSelectedCategory(cat.id);
                    }}
                    className={`py-1 text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                      isSelected
                        ? 'border-[#1D1D1F] text-[#1D1D1F] font-semibold'
                        : 'border-transparent text-[#6E6E73] hover:text-[#1D1D1F] font-medium'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Kolom Kanan (lg:col-span-5): TasbihRingWidget Gelap #0A0B0D */}
        <div className="lg:col-span-5 flex">
          <div className="w-full">
            <TasbihRingWidget />
          </div>
        </div>
      </div>

      {/* =====================================================================
          4. MAIN CONTENT CONTAINER: STATUS & KARTU PROMO TILE APPLE
          ===================================================================== */}
      <div className="max-w-6xl mx-auto px-4 pt-2 sm:pt-4 md:px-6 space-y-6">
        {/* Subtle Results Status Row */}
        <div className="flex items-center justify-between text-xs text-[#6E6E73] px-0.5">
          <p>
            Menampilkan <strong className="font-semibold text-[#1D1D1F]">{displayedSites.length}</strong> dari{' '}
            <strong className="font-semibold text-[#1D1D1F]">
              {isFiltered ? filteredSites.length : totalCatalogCount}
            </strong>{' '}
            makam di {TOTAL_PROVINCES_COUNT} provinsi
            {selectedCategory !== 'Semua' && <span> · {selectedCategory}</span>}
            {selectedProvince !== 'Semua Provinsi' && <span> · {selectedProvince}</span>}
            {emotionalFilter !== 'all' && (
              <span> · {dynamicEmotionalIntents.find((i) => i.id === emotionalFilter)?.label}</span>
            )}
          </p>
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('Semua');
                setSelectedProvince('Semua Provinsi');
                setEmotionalFilter('all');
                setVisibleCount(INITIAL_VISIBLE_SITES);
              }}
              className="text-xs font-medium text-[#1E6B47] hover:text-[#175639] underline underline-offset-4 cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* =====================================================================
            3A. APPLE PROMO TILE SITE CARD GRID (`rounded-[24px]`)
            ===================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedSites.map((site, index) => {
            const siteUrl = getSitePath(site);
            const shortEra = extractShortEra(site.era);
            const badgeLabel = site.category === 'Walisongo' ? 'Wali Songo' : site.category;
            const isLcpCandidate = index < 3;
            const snippetText = stripMarkdownAsterisks(
              String(site.untoldStory || site.description || '')
                .split('<!--more-->')[0]
                .trim()
            );
            const coreHajatText = stripMarkdownAsterisks(extractCoreWasilahHajat(getSiteBarokahHajat(site)));
            const karomahCount = Array.isArray(site.karomah) && site.karomah.length > 0 ? site.karomah.length : 1;
            const doaCount = getEffectiveSiteDoaKhusus(site).length;
            const practicalInfo = site.haulSchedule
              ? `Haul: ${site.haulSchedule}`
              : site.openingHours
                ? `Buka: ${site.openingHours}`
                : 'Buka Setiap Hari';
            const { heading: cardHeading, subtitle: cardSubtitle } = getSiteDisplayHeading(site);

            return (
              <article
                key={site.id}
                className={`${
                  index >= 3 ? 'group content-auto' : 'group'
                } bg-[#F5F5F7] hover:bg-white border border-black/[0.06] rounded-[24px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] flex flex-col justify-between`}
              >
                <a
                  href={siteUrl}
                  onClick={(e) => handleOpenReaderModal(site, e)}
                  aria-label={`Baca kisah, karomah, dan panduan ${cardHeading} (${cardSubtitle}) di ${site.location.city}, ${site.location.province}`}
                  className="block cursor-pointer focus:outline-none flex-1"
                >
                  {/* 1. Foto aspect-[16/10] dengan zoom mikro halus saat hover */}
                  <SiteCardThumbnail
                    site={site}
                    altText={`${cardHeading} (${cardSubtitle}) — ${site.location.city}, ${site.location.province}`}
                    badgeLabel={badgeLabel}
                    isLcpCandidate={isLcpCandidate}
                  />

                  {/* 2. Konten di Bawah Foto: Lokasi, Judul Apple-style, Haul, Kotak DOA & HARAPAN PEZIARAH */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2 text-xs text-[#6E6E73] font-medium">
                      <span className="truncate">
                        {site.location.city}, {site.location.province}
                      </span>
                      <span className="shrink-0 text-[11px] text-[#6E6E73] font-semibold truncate max-w-[140px]">
                        {shortEra || practicalInfo}
                      </span>
                    </div>

                    <h2 className="text-xl text-[#1D1D1F] font-semibold tracking-tight group-hover:text-[#1E6B47] transition-colors line-clamp-2 leading-snug">
                      {cardHeading}
                    </h2>

                    {cardSubtitle && cardSubtitle !== cardHeading && (
                      <p className="text-xs text-[#6E6E73] font-medium line-clamp-1">
                        {cardSubtitle}
                      </p>
                    )}

                    <div className="text-[11px] text-[#6E6E73] font-medium whitespace-normal break-words leading-snug line-clamp-2">
                      {practicalInfo}
                    </div>

                    {/* Kotak Ringkas Doa & Harapan Peziarah */}
                    <div className="bg-white border border-black/[0.06] text-[#1E6B47] rounded-2xl px-3.5 py-2.5 my-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E6B47]">
                          DOA &amp; HARAPAN PEZIARAH
                        </span>
                        <span className="text-[10px] font-medium text-[#1E6B47]">
                          {karomahCount} Karomah · {doaCount} Doa
                        </span>
                      </div>
                      <p className="text-xs text-[#1D1D1F] font-medium line-clamp-2 mt-1 leading-relaxed">
                        {coreHajatText}
                      </p>
                    </div>

                    <p className="text-xs text-[#6E6E73] line-clamp-2 leading-relaxed">
                      {snippetText}
                    </p>
                  </div>
                </a>

                {/* 3. Footer Aksi Terpisah */}
                <div className="px-5 py-3 border-t border-black/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E6E73]">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectSite(site)}
                      className="py-1.5 pr-2 min-h-[34px] inline-flex items-center hover:text-[#1D1D1F] underline underline-offset-4 cursor-pointer"
                    >
                      {copy.cardSecondaryMapCta}
                    </button>
                    {!hasVerifiedSitePhoto(site) && (
                      <a
                        href={getSiteGoogleMapsPhotosUrl(site)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 min-h-[34px] inline-flex items-center text-[11px] font-medium text-[#1E6B47] hover:text-[#175639] underline underline-offset-4"
                      >
                        📷 Cek Foto Asli di Google Maps
                      </a>
                    )}
                  </div>
                  <a
                    href={siteUrl}
                    onClick={(e) => handleOpenReaderModal(site, e)}
                    className="py-1.5 pl-2 min-h-[34px] inline-flex items-center font-semibold text-[#1E6B47] group-hover:text-[#175639] group-hover:translate-x-0.5 transition-transform"
                  >
                    {copy.cardCtaLabel}
                  </a>
                </div>
              </article>
            );
          })}

          {filteredSites.length === 0 && (
            <div className="col-span-full bg-[#F5F5F7] rounded-[24px] p-8 sm:p-12 text-center border border-black/[0.06] my-4">
              <div className="inline-flex p-3.5 bg-white text-[#6E6E73] rounded-2xl mb-3 border border-black/[0.06]">
                <Compass className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D1D1F] mb-1">Situs Tidak Ditemukan</h3>
              <p className="text-xs sm:text-sm text-[#6E6E73] max-w-sm mx-auto mb-5">
                Silakan gunakan kata kunci lain, atau sesuaikan filter kategori dan provinsi di atas.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Semua');
                  setSelectedProvince('Semua Provinsi');
                  setEmotionalFilter('all');
                  setVisibleCount(INITIAL_VISIBLE_SITES);
                }}
                className="px-5 py-2.5 bg-[#1D1D1F] hover:bg-[#1E6B47] text-white rounded-full text-xs font-medium transition cursor-pointer"
              >
                Tampilkan Semua Situs
              </button>
            </div>
          )}
        </div>

        {/* Progressive Load More Controls + IntersectionObserver Sentinel */}
        {!isFiltered && visibleCount < totalCatalogCount && (
          <div
            ref={loadMoreSentinelRef}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              type="button"
              onClick={async () => {
                const all = await ensureFullSitesLoaded();
                setVisibleCount((prev) =>
                  Math.min(Math.max(all.length, filteredSites.length), prev + PROGRESSIVE_BATCH_SIZE)
                );
              }}
              className="px-6 py-3 bg-[#1D1D1F] hover:bg-[#1E6B47] text-white rounded-full text-xs font-medium tracking-tight inline-flex items-center gap-2 transition cursor-pointer shadow-2xs"
            >
              <span>
                Tampilkan Lebih Banyak (+
                {Math.min(PROGRESSIVE_BATCH_SIZE, Math.max(totalCatalogCount, filteredSites.length) - visibleCount)} Situs)
              </span>
              <ArrowDown className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={async () => {
                const all = await ensureFullSitesLoaded();
                setVisibleCount(Math.max(all.length, filteredSites.length, totalCatalogCount));
              }}
              className="px-6 py-3 bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[#1D1D1F] border border-black/[0.08] rounded-full text-xs font-medium tracking-tight transition cursor-pointer"
            >
              Tampilkan Semua ({Math.max(totalCatalogCount, filteredSites.length)})
            </button>
          </div>
        )}

      </div>

      {/* =====================================================================
          3.8. STORY REEL & AUDIO-VISUAL CAROUSEL (OPSI 2: 5 SLIDE HIKMAH ZIARAH)
          ===================================================================== */}
      <div id="hikmah-ziarah-reel" className="max-w-6xl mx-auto mt-12 mb-6">
        <Suspense fallback={null}>
          <ZiarahStoryReel />
        </Suspense>
      </div>

      {/* =====================================================================
          4. VISIBLE INDONESIAN EDITORIAL GUIDE & FAQ (100% Crawlable by Google WRS & CLD3)
          ===================================================================== */}
      <article
        lang="id"
        aria-label="Panduan Lengkap Pengertian, Hukum, Adab, dan Urutan Bacaan Doa Ziarah Kubur dalam Islam"
        className="max-w-6xl mx-auto mt-10 pt-8 border-t border-stone-200/80 text-stone-800"
      >
        <div className="bg-white rounded-2xl p-4 sm:px-6 sm:py-5 border border-stone-200/80 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <img
                src="/favicon.svg"
                alt=""
                aria-hidden="true"
                width={44}
                height={44}
                loading="lazy"
                decoding="async"
                className="w-11 h-11 rounded-xl border border-stone-200/80 shrink-0 object-cover"
              />
              <div className="space-y-0.5 min-w-0">
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-emerald-800">
                  {copy.faqSectionSubtitle}
                </span>
                <h2 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  {copy.faqSectionTitle}
                </h2>
              </div>
            </div>

            <button
              type="button"
              aria-expanded={showEditorialFaq}
              onClick={() => setShowEditorialFaq((prev) => !prev)}
              className="px-4 py-2 min-h-[36px] rounded-xl border border-stone-200/80 bg-stone-50 hover:bg-stone-100 text-xs font-medium text-stone-700 hover:text-stone-950 inline-flex items-center gap-1.5 shrink-0 transition cursor-pointer"
            >
              <span>{showEditorialFaq ? 'Sembunyikan Panduan' : 'Tampilkan Panduan'}</span>
              <ArrowDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${showEditorialFaq ? 'rotate-180' : ''}`}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </button>
          </div>

          <div
            className={
              showEditorialFaq
                ? 'grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-stone-100 text-sm leading-relaxed text-stone-700'
                : 'hidden'
            }
          >
            <div className="space-y-2">
              <h3 className="font-serif font-semibold text-base text-stone-900">
                Apa Tujuan dan Hukum Ziarah Kubur dalam Islam?
              </h3>
              <p>
                Secara bahasa, kata <strong>ziarah</strong> berarti berkunjung atau menengok. Dalam syariat Islam, hukum melaksanakan ziarah kubur adalah sunnah sebagaimana sabda Rasulullah SAW dalam Hadits Riwayat Muslim: <em>&ldquo;Dahulu aku pernah melarang kalian berziarah kubur, maka sekarang berziarahlah, karena sesungguhnya ziarah kubur itu dapat melembutkan hati, menitikkan air mata, dan mengingatkan kalian kepada kehidupan akhirat.&rdquo;</em>
              </p>
              <p>
                Tujuan utama berziarah adalah melembutkan hati yang sedang penat oleh kesibukan dunia, mengingatkan diri akan kematian dan hari akhirat, mendoakan ampunan bagi orang tua serta kaum muslimin yang telah wafat, dan meneladani perjuangan dakwah para Waliyullah.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-semibold text-base text-stone-900">
                Bagaimana Urutan Bacaan Doa Ziarah Kubur Singkat dan Lengkap?
              </h3>
              <p>
                Urutan tata cara dan bacaan doa ziarah kubur sesuai tuntunan ulama Ahlussunnah wal Jamaah meliputi enam tahapan utama yang mudah diamalkan oleh setiap peziarah:
              </p>
              <ol className="list-decimal pl-4 space-y-1 text-xs sm:text-sm text-stone-700">
                <li>Berwudhu dan meluruskan niat ziarah semata-mata mengharap ridha Allah SWT.</li>
                <li>Mengucapkan salam penghormatan kepada ahli kubur ketika memasuki gerbang pemakaman.</li>
                <li>Membaca istighfar tiga kali dan menghadiahkan bacaan Surah Al-Fatihah (tawassul) kepada Rasulullah SAW, para Waliyullah, orang tua, dan ahli kubur.</li>
                <li>Membaca Surah Yasin, Surah Al-Ikhlas tiga kali, Surah Al-Falaq, Surah An-Nas, dan Ayat Kursi.</li>
                <li>Melantunkan kalimat dzikir tahlil serta shalawat Nabi dengan khusyuk dan tenang.</li>
                <li>Menutup rangkaian ziarah dengan doa permohonan ampunan dan rahmat bagi ahli kubur.</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-semibold text-base text-stone-900">
                Di Mana Saja Lokasi {totalCatalogCount} Makam Wali Songo dan Ulama di Ziarah Nusantara?
              </h3>
              <p>
                <strong>Ziarah Nusantara</strong> mendokumentasikan {totalCatalogCount} lokasi makam Waliyullah di {TOTAL_PROVINCES_COUNT} provinsi Indonesia lengkap dengan titik koordinat peta rute perjalanan, jadwal haul, kisah karomah, dan sanad keilmuan.
              </p>
              <p>
                Direktori ini mencakup sembilan makam <strong>Wali Songo</strong> di Jawa Timur, Jawa Tengah, dan Jawa Barat (Sunan Gresik, Sunan Ampel, Sunan Bonang, Sunan Drajat, Sunan Giri, Sunan Kalijaga, Sunan Kudus, Sunan Muria, dan Sunan Gunung Jati) hingga makam ulama besar, raja kesultanan Islam, dan habaib di Aceh, Sumatera, Banten, DKI Jakarta, Yogyakarta, Kalimantan, Sulawesi, Bali, Nusa Tenggara Barat, dan Maluku Utara.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/panduan"
                  className="py-1.5 min-h-[32px] inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <span>Baca Teks Lengkap Doa Ziarah Kubur</span>
                </Link>
                <span className="text-stone-300" aria-hidden="true">•</span>
                <Link
                  to="/doa"
                  className="py-1.5 min-h-[32px] inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <span>Buka Susunan Tahlil &amp; Tawassul</span>
                </Link>
                <span className="text-stone-300" aria-hidden="true">•</span>
                <Link
                  to="/artikel"
                  className="py-1.5 min-h-[32px] inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
                >
                  <span>Artikel Panduan &amp; Rute Ziarah</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* In-Place Reader Modal over DaftarMakam (No Map Redirect, Preserves Scroll Position) */}
      {currentModalSite && (
        <Suspense fallback={null}>
          <SiteDetails
            site={currentModalSite}
            onClose={handleCloseReaderModal}
            isSaved={savedSiteIds.includes(currentModalSite.id)}
            onToggleSave={handleToggleSave ? () => handleToggleSave(currentModalSite.id) : undefined}
            savedDoas={savedDoas}
            onToggleSaveDoa={onToggleSaveDoa}
            onContribute={onOpenKontribusi}
            onViewOnMap={(targetSite) => {
              setActiveSiteModal(null);
              onSelectSite(targetSite);
            }}
          />
        </Suspense>
      )}
    </section>
  );
});
