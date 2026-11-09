import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { DaftarMakam } from './views/DaftarMakam';

const KontribusiModal = lazy(() =>
  import('./components/KontribusiModal').then((m) => ({ default: m.KontribusiModal }))
);
const PetaLokasi = lazy(() => import('./views/PetaLokasi').then((m) => ({ default: m.PetaLokasi })));
const BacaanZiarah = lazy(() => import('./views/BacaanZiarah').then((m) => ({ default: m.BacaanZiarah })));
const KebijakanKurasi = lazy(() => import('./views/KebijakanKurasi').then((m) => ({ default: m.KebijakanKurasi })));
const AdminKurator = lazy(() => import('./views/AdminKurator').then((m) => ({ default: m.AdminKurator })));
const KumpulanDoa = lazy(() => import('./views/KumpulanDoa').then((m) => ({ default: m.KumpulanDoa })));
const RubrikKisah = lazy(() => import('./views/RubrikKisah').then((m) => ({ default: m.RubrikKisah })));
const InfaqDigital = lazy(() => import('./views/InfaqDigital').then((m) => ({ default: m.InfaqDigital })));

import type { ZiarahSite } from './data/sites';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import type { User } from 'firebase/auth';
import { SiteProvider } from './context/SiteContext';
import { findSiteByParam, getSitePath } from './lib/siteSlugs';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSite, setSelectedSite] = useState<ZiarahSite | null>(null);
  const [isKontribusiOpen, setIsKontribusiOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // State for saved items (all synced to localStorage + Cloud Firestore)
  const [savedSiteIds, setSavedSiteIds] = useState<string[]>([]);
  const [savedDoas, setSavedDoas] = useState<string[]>([]);
  const [savedRubrik, setSavedRubrik] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [customDomainOrigin, setCustomDomainOrigin] = useState<string>('https://ziarahnusantara.my.id');

  // Load custom domain setting from local cache immediately, then defer Firestore fetch until user interaction
  useEffect(() => {
    try {
      const cached = localStorage.getItem('ziarah_local_settings_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.customDomain && typeof parsed.customDomain === 'string') {
          const raw = parsed.customDomain.trim().replace(/\/+$/, '');
          if (raw) {
            setCustomDomainOrigin(raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`);
          }
        }
      }
    } catch {}

    let fetched = false;
    const fetchSettings = async () => {
      if (fetched) return;
      fetched = true;
      cleanup();
      try {
        const [{ db }, { doc, getDoc }] = await Promise.all([
          import('./lib/firebase'),
          import('firebase/firestore'),
        ]);
        const snap = await getDoc(doc(db, 'settings', 'infaq'));
        if (snap.exists()) {
          const data = snap.data();
          if (data.customDomain && typeof data.customDomain === 'string') {
            const raw = data.customDomain.trim().replace(/\/+$/, '');
            if (raw) {
              const normalized = raw.startsWith('http://') || raw.startsWith('https://') ? raw : `https://${raw}`;
              setCustomDomainOrigin(normalized);
            }
          }
        }
      } catch {}
    };

    const handleInteraction = (e: Event) => {
      if (e.type === 'scroll' && window.scrollY < 48) return;
      cleanup();
      window.setTimeout(() => {
        fetchSettings();
      }, 1800);
    };

    const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'scroll'];
    const cleanup = () => {
      events.forEach((evt) => window.removeEventListener(evt, handleInteraction));
    };
    events.forEach((evt) => window.addEventListener(evt, handleInteraction, { passive: true }));

    return cleanup;
  }, []);

  // Dynamically sync canonical URL, OpenGraph URL/image, and Schema.org @graph on route/domain change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    const baseOrigin = customDomainOrigin || window.location.origin;
    const cleanPath = location.pathname === '/' ? '/' : location.pathname;
    const fullUrl = `${baseOrigin}${cleanPath}`;
    const fullImageUrl = `${baseOrigin}/pwa-512x512.png`;

    const routeSeoMap: Record<string, { title: string; desc: string }> = {
      '/': {
        title: 'Ziarah Nusantara: Panduan Ziarah Kubur, Doa Tahlil & Jejak Batin 96 Makam Wali',
        desc: 'Hati sedang rindu keteduhan atau hendak berziarah? Temukan urutan doa ziarah kubur lengkap (Arab, Latin, Artinya), Tahlil & Tawassul, serta peta rute & kisah karomah 96 makam Walisongo, Ulama & Habaib di 18 provinsi Indonesia.',
      },
      '/direktori': {
        title: 'Direktori 96 Makam Walisongo, Ulama & Habaib di 18 Provinsi — Ziarah Nusantara',
        desc: 'Jejak spiritual 96 lokasi makam Wali Songo, Ulama Nusantara, Habaib, dan Auliya di 18 provinsi Indonesia lengkap dengan alamat, peta rute GPS, kisah karomah, dan bacaan doa tawassul.',
      },
      '/peta': {
        title: 'Peta Rute Ziarah Makam Wali Songo & Ulama Nusantara — Ziarah Nusantara',
        desc: 'Peta interaktif titik lokasi GPS dan navigasi rute perjalanan ziarah ke 96 makam Waliyullah serta ulama besar di seluruh kepulauan Indonesia.',
      },
      '/panduan': {
        title: 'Panduan Ziarah Kubur Lengkap: Urutan Doa (Arab, Latin, Artinya), Tahlil, Yasin & Adab | Ziarah Nusantara',
        desc: 'Tuntunan lengkap adab & urutan bacaan doa ziarah kubur orang tua dan makam Wali (Arab, Latin, Artinya), Salam Ahli Kubur, Qasidah Salamullah Ya Sadah, Tawassul, Yasin & Tahlil sesuai sunnah Ahlussunnah wal Jamaah.',
      },
      '/rubrik': {
        title: 'Rubrik Sejarah, Kisah Karomah & Wasiat Batin Para Wali — Ziarah Nusantara',
        desc: 'Kisah nyata keteladanan, wasiat batin, sanad keilmuan, dan sejarah dakwah para Waliyullah Nusantara berbasis naskah babad dan jurnal akademik.',
      },
      '/doa': {
        title: 'Kumpulan Doa Khusus Ziarah Kubur, Tahlil & Tawassul Lengkap — Ziarah Nusantara',
        desc: 'Bacaan salam ziarah kubur, susunan tawassul khusus para Waliyullah, Surah Yasin, dan tahlil lengkap teks Arab, transliterasi Latin, serta terjemahan Bahasa Indonesia.',
      },
      '/infaq': {
        title: 'Infaq & Amal Jariyah Pelestarian Arsip Sejarah Makam Wali — Ziarah Nusantara',
        desc: 'Layanan infaq dan wakaf literasi digital QRIS resmi Ziarah Nusantara untuk menjaga riset sejarah, naskah doa ziarah, dan direktori 96 makam Waliyullah tetap bebas akses.',
      },
      '/donasi': {
        title: 'Infaq & Amal Jariyah Pelestarian Arsip Sejarah Makam Wali — Ziarah Nusantara',
        desc: 'Layanan infaq dan wakaf literasi digital QRIS resmi Ziarah Nusantara untuk menjaga riset sejarah, naskah doa ziarah, dan direktori 96 makam Waliyullah tetap bebas akses.',
      },
      '/kurasi': {
        title: 'Standar Kurasi & Metodologi Referensi Sejarah — Ziarah Nusantara',
        desc: 'Pedoman metodologi verifikasi sumber sejarah, jurnal akademik, naskah babad, dan kurasi 96 situs makam oleh Tim Kurator Arsip Ziarah Nusantara.',
      },
    };

    let cancelled = false;

    const applySeoMetadata = (matchedSite: ZiarahSite | null) => {
      if (cancelled) return;
      const isInternalAdminRoute =
        cleanPath.startsWith('/admin') || cleanPath.startsWith('/kurator');

      let activeTitle = isInternalAdminRoute
        ? 'Portal Internal Dewan Kurator — Ziarah Nusantara'
        : routeSeoMap[cleanPath]?.title || routeSeoMap['/'].title;
      let activeDesc = routeSeoMap[cleanPath]?.desc || routeSeoMap['/'].desc;
      let canonicalUrl = fullUrl;

      if (cleanPath === '/direktori') {
        canonicalUrl = `${baseOrigin}/`;
      } else if (cleanPath === '/infaq') {
        canonicalUrl = `${baseOrigin}/donasi`;
      }

      if (matchedSite) {
        const cleanSiteDesc = (matchedSite.description || '').replace(/<!--more-->/g, ' ').replace(/\s+/g, ' ').trim();
        activeTitle = `Makam ${matchedSite.title} (${matchedSite.location.city}, ${matchedSite.location.province}) — Rute, Sejarah & Doa Ziarah | Ziarah Nusantara`;
        activeDesc = `${cleanSiteDesc} Lokasi: ${matchedSite.location.address}, ${matchedSite.location.city}, ${matchedSite.location.province}. Lengkap dengan peta rute, riwayat karomah, dan doa tawassul.`;
        canonicalUrl = `${baseOrigin}${getSitePath(matchedSite)}`;
      }

      document.title = activeTitle;

      let robotsEl = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
      if (!robotsEl) {
        robotsEl = document.createElement('meta');
        robotsEl.name = 'robots';
        document.head.appendChild(robotsEl);
      }
      robotsEl.content = isInternalAdminRoute
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

      const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (descEl) descEl.content = activeDesc;

      const canonicalEl = document.getElementById('canonical-link') as HTMLLinkElement | null;
      if (canonicalEl) canonicalEl.href = canonicalUrl;

      const hreflangIdEl = document.getElementById('hreflang-id') as HTMLLinkElement | null;
      if (hreflangIdEl) hreflangIdEl.href = canonicalUrl;

      const hreflangIdShortEl = document.getElementById('hreflang-id-short') as HTMLLinkElement | null;
      if (hreflangIdShortEl) hreflangIdShortEl.href = canonicalUrl;

      const hreflangDefaultEl = document.getElementById('hreflang-default') as HTMLLinkElement | null;
      if (hreflangDefaultEl) hreflangDefaultEl.href = canonicalUrl;

      const ogTitleEl = document.getElementById('og-title') as HTMLMetaElement | null;
      if (ogTitleEl) ogTitleEl.content = activeTitle;

      const ogDescEl = document.getElementById('og-description') as HTMLMetaElement | null;
      if (ogDescEl) ogDescEl.content = activeDesc;

      const ogUrlEl = document.getElementById('og-url') as HTMLMetaElement | null;
      if (ogUrlEl) ogUrlEl.content = canonicalUrl;

      const ogImgEl = document.getElementById('og-image') as HTMLMetaElement | null;
      if (ogImgEl) ogImgEl.content = fullImageUrl;

      const twitterTitleEl = document.getElementById('twitter-title') as HTMLMetaElement | null;
      if (twitterTitleEl) twitterTitleEl.content = activeTitle;

      const twitterDescEl = document.getElementById('twitter-description') as HTMLMetaElement | null;
      if (twitterDescEl) twitterDescEl.content = activeDesc;

      const twitterImgEl = document.getElementById('twitter-image') as HTMLMetaElement | null;
      if (twitterImgEl) twitterImgEl.content = fullImageUrl;

      const schemaEl = document.getElementById('schema-jsonld');
      if (schemaEl) {
        const graphNodes: Record<string, any>[] = [
          {
            '@type': 'Organization',
            '@id': `${baseOrigin}/#organization`,
            name: 'Ziarah Nusantara',
            legalName: 'Tim Kurator Arsip Ziarah Nusantara',
            url: `${baseOrigin}/`,
            logo: {
              '@type': 'ImageObject',
              '@id': `${baseOrigin}/#logo`,
              url: fullImageUrl,
              contentUrl: fullImageUrl,
              width: 512,
              height: 512,
            },
            image: { '@id': `${baseOrigin}/#logo` },
          },
          {
            '@type': 'WebSite',
            '@id': `${baseOrigin}/#website`,
            url: `${baseOrigin}/`,
            name: 'Ziarah Nusantara',
            alternateName: ['Ziarah Kubur Nusantara', 'Direktori Makam Wali Nusantara'],
            description: activeDesc,
            inLanguage: 'id-ID',
            publisher: { '@id': `${baseOrigin}/#organization` },
          },
          {
            '@type': 'WebPage',
            '@id': `${canonicalUrl}#webpage`,
            url: canonicalUrl,
            name: activeTitle,
            description: activeDesc,
            inLanguage: 'id-ID',
            isPartOf: { '@id': `${baseOrigin}/#website` },
            primaryImageOfPage: { '@id': `${baseOrigin}/#logo` },
            thumbnailUrl: fullImageUrl,
          },
        ];

        if (matchedSite) {
          const cleanSiteDesc = (matchedSite.description || '').replace(/<!--more-->/g, ' ').replace(/\s+/g, ' ').trim();
          graphNodes.push({
            '@type': 'TouristAttraction',
            '@id': `${canonicalUrl}#place`,
            name: `Makam ${matchedSite.title} (${matchedSite.name})`,
            description: cleanSiteDesc,
            url: canonicalUrl,
            address: {
              '@type': 'PostalAddress',
              streetAddress: matchedSite.location.address,
              addressLocality: matchedSite.location.city,
              addressRegion: matchedSite.location.province,
              addressCountry: 'ID',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: matchedSite.location.lat,
              longitude: matchedSite.location.lng,
            },
          });
        }

        if (cleanPath === '/' || cleanPath === '/panduan') {
          graphNodes.push({
            '@type': 'FAQPage',
            '@id': `${canonicalUrl}#faq`,
            inLanguage: 'id-ID',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Apa Tujuan dan Hukum Ziarah Kubur dalam Islam?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Dalam syariat Islam, hukum ziarah kubur adalah sunnah sebagaimana sabda Rasulullah SAW dalam Hadits Riwayat Muslim. Tujuannya adalah melembutkan hati yang sedang penat oleh kesibukan dunia, mengingatkan diri kepada kematian dan akhirat, mendoakan ampunan bagi orang tua serta ahli kubur, dan meneladani perjuangan dakwah para Waliyullah.',
                },
              },
              {
                '@type': 'Question',
                name: 'Bagaimana Urutan Bacaan Doa Ziarah Kubur Singkat dan Lengkap?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Urutan tata cara dan bacaan doa ziarah kubur sesuai tuntunan ulama Ahlussunnah wal Jamaah meliputi: (1) Berwudhu dan meluruskan niat ziarah karena Allah SWT, (2) Mengucapkan salam penghormatan kepada ahli kubur, (3) Membaca istighfar tiga kali dan menghadiahkan bacaan Surah Al-Fatihah kepada Rasulullah SAW, para Waliyullah, orang tua, dan ahli kubur, (4) Membaca Surah Yasin, Surah Al-Ikhlas tiga kali, Surah Al-Falaq, Surah An-Nas, dan Ayat Kursi, (5) Melantunkan kalimat dzikir tahlil serta shalawat Nabi, lalu (6) Menutup dengan doa permohonan ampunan dan rahmat bagi ahli kubur.',
                },
              },
              {
                '@type': 'Question',
                name: 'Di Mana Saja Lokasi 96 Makam Wali Songo dan Ulama di Ziarah Nusantara?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Ziarah Nusantara mendokumentasikan 96 lokasi makam Waliyullah di 18 provinsi Indonesia lengkap dengan titik koordinat peta rute perjalanan, jadwal haul, kisah karomah, dan sanad keilmuan—mulai dari sembilan makam Wali Songo di Jawa Timur, Jawa Tengah, dan Jawa Barat hingga makam ulama besar dan habaib di Aceh, Sumatera, Banten, DKI Jakarta, Yogyakarta, Kalimantan, Sulawesi, Bali, Nusa Tenggara Barat, dan Maluku Utara.',
                },
              },
            ],
          });
        }

        schemaEl.textContent = JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': graphNodes,
        });
      }
    };

    if (cleanPath.startsWith('/situs/') || cleanPath.startsWith('/makam/')) {
      const rawParam = cleanPath.replace(/^\/(situs|makam)\//, '');
      import('./data/sites')
        .then(({ ziarahSites }) => {
          applySeoMetadata(findSiteByParam(ziarahSites, rawParam));
        })
        .catch(() => applySeoMetadata(null));
    } else {
      applySeoMetadata(null);
    }

    return () => {
      cancelled = true;
    };
  }, [location.pathname, customDomainOrigin]);

  // Load from local storage initially
  useEffect(() => {
    try {
      const localSites = localStorage.getItem('savedZiarah');
      const localDoas = localStorage.getItem('savedDoas');
      const localRubrik = localStorage.getItem('savedRubrik');
      if (localSites) setSavedSiteIds(JSON.parse(localSites));
      if (localDoas) setSavedDoas(JSON.parse(localDoas));
      if (localRubrik) setSavedRubrik(JSON.parse(localRubrik));
    } catch (e) {
      console.error('Error loading local data', e);
    }
    setIsDataLoaded(true);
  }, []);

  // Sync with Firestore when auth state changes (only if stored session exists or on admin routes)
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;
    let initialized = false;

    const hasStoredSession = (): boolean => {
      try {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('firebase:authUser:')) {
            return true;
          }
        }
      } catch {}
      return false;
    };

    const initAuth = async () => {
      if (initialized || cancelled) return;
      initialized = true;
      try {
        const [{ auth, db, handleFirestoreError, OperationType }, { onAuthStateChanged }, { doc, getDoc, setDoc, serverTimestamp }] =
          await Promise.all([
            import('./lib/firebase'),
            import('firebase/auth'),
            import('firebase/firestore'),
          ]);
        if (cancelled) return;
        unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
          if (currentUser) {
            try {
              const userRef = doc(db, 'users', currentUser.uid);
              const docSnap = await getDoc(userRef);

              if (docSnap.exists()) {
                const data = docSnap.data();
                if (Array.isArray(data.savedSiteIds)) setSavedSiteIds(data.savedSiteIds);
                if (Array.isArray(data.savedDoas)) setSavedDoas(data.savedDoas);
                if (Array.isArray(data.savedRubrik)) setSavedRubrik(data.savedRubrik);
              } else {
                let initialSites: string[] = [];
                let initialDoas: string[] = [];
                let initialRubrik: string[] = [];
                try {
                  initialSites = JSON.parse(localStorage.getItem('savedZiarah') || '[]');
                  initialDoas = JSON.parse(localStorage.getItem('savedDoas') || '[]');
                  initialRubrik = JSON.parse(localStorage.getItem('savedRubrik') || '[]');
                } catch {}

                await setDoc(userRef, {
                  userId: currentUser.uid,
                  savedSiteIds: initialSites,
                  savedDoas: initialDoas,
                  savedRubrik: initialRubrik,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp(),
                });
              }
            } catch (error) {
              handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
            }
          }
        });
      } catch {}
    };

    if (
      location.pathname.startsWith('/admin') ||
      location.pathname.startsWith('/kurator') ||
      hasStoredSession()
    ) {
      initAuth();
    }

    return () => {
      cancelled = true;
      if (unsubscribe) unsubscribe();
    };
  }, [location.pathname]);

  // Sync state changes to local storage & Firestore
  useEffect(() => {
    if (!isDataLoaded) return;

    try {
      localStorage.setItem('savedZiarah', JSON.stringify(savedSiteIds));
      localStorage.setItem('savedDoas', JSON.stringify(savedDoas));
      localStorage.setItem('savedRubrik', JSON.stringify(savedRubrik));
    } catch {}

    const saveToFirestore = async () => {
      if (user) {
        try {
          const [{ db }, { doc, setDoc, serverTimestamp }] = await Promise.all([
            import('./lib/firebase'),
            import('firebase/firestore'),
          ]);
          const userRef = doc(db, 'users', user.uid);
          await setDoc(
            userRef,
            {
              userId: user.uid,
              savedSiteIds: savedSiteIds,
              savedDoas: savedDoas,
              savedRubrik: savedRubrik,
              updatedAt: serverTimestamp(),
            },
            { merge: true }
          );
        } catch (error) {
          const { handleFirestoreError, OperationType } = await import('./lib/firebase');
          handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
        }
      }
    };

    saveToFirestore();
  }, [savedSiteIds, savedDoas, savedRubrik, user, isDataLoaded]);

  const handleToggleSave = React.useCallback((siteId: string) => {
    setSavedSiteIds((prev) => (prev.includes(siteId) ? prev.filter((id) => id !== siteId) : [...prev, siteId]));
  }, []);

  const handleToggleSaveDoa = React.useCallback((id: string) => {
    setSavedDoas((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  }, []);

  const handleToggleSaveRubrik = React.useCallback((id: string) => {
    setSavedRubrik((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  }, []);

  const handleSelectSite = React.useCallback(
    (site: ZiarahSite) => {
      setSelectedSite(site);
      navigate(getSitePath(site));
    },
    [navigate]
  );

  return (
    <SiteProvider>
      <div className="flex flex-col min-h-screen w-full bg-[#FAF8F5] font-sans text-stone-900 selection:bg-emerald-900/15 selection:text-stone-950 relative antialiased">
        {/* Editorial Glass Header (backdrop-blur applied on ::before so fixed descendants are never trapped) */}
        <header className="fixed top-0 left-0 right-0 z-[2000] pt-[env(safe-area-inset-top)] border-b border-stone-200/70 flex justify-center before:content-[''] before:absolute before:inset-0 before:bg-[#FAF8F5]/90 before:backdrop-blur-md before:-z-10 before:pointer-events-none">
          <div className="w-full max-w-6xl relative z-10">
            <Navbar onOpenKontribusi={() => setIsKontribusiOpen(true)} />
          </div>
        </header>

        {/* Main Content Area (Rendered immediately at opacity 1 for fast FCP/LCP) */}
        <main className="flex-1 flex flex-col relative z-10 pt-14 sm:pt-16 pb-24 md:pb-12 w-full overflow-x-hidden">
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center p-12">
                <div className="w-8 h-8 border-2 border-stone-300 border-t-emerald-800 rounded-full animate-spin" />
              </div>
            }
          >
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <DaftarMakam
                    onSelectSite={handleSelectSite}
                    savedSiteIds={savedSiteIds}
                    handleToggleSave={handleToggleSave}
                    savedDoas={savedDoas}
                    onToggleSaveDoa={handleToggleSaveDoa}
                    onOpenKontribusi={() => setIsKontribusiOpen(true)}
                  />
                }
              />
              <Route
                path="/direktori"
                element={
                  <DaftarMakam
                    onSelectSite={handleSelectSite}
                    savedSiteIds={savedSiteIds}
                    handleToggleSave={handleToggleSave}
                    savedDoas={savedDoas}
                    onToggleSaveDoa={handleToggleSaveDoa}
                    onOpenKontribusi={() => setIsKontribusiOpen(true)}
                  />
                }
              />
              <Route
                path="/peta"
                element={
                  <PetaLokasi
                    selectedSite={selectedSite}
                    setSelectedSite={setSelectedSite}
                    savedSiteIds={savedSiteIds}
                    handleToggleSave={handleToggleSave}
                    savedDoas={savedDoas}
                    onToggleSaveDoa={handleToggleSaveDoa}
                    onOpenKontribusi={() => setIsKontribusiOpen(true)}
                  />
                }
              />
              <Route
                path="/situs/:id"
                element={
                  <PetaLokasi
                    selectedSite={selectedSite}
                    setSelectedSite={setSelectedSite}
                    savedSiteIds={savedSiteIds}
                    handleToggleSave={handleToggleSave}
                    savedDoas={savedDoas}
                    onToggleSaveDoa={handleToggleSaveDoa}
                    onOpenKontribusi={() => setIsKontribusiOpen(true)}
                  />
                }
              />
              <Route
                path="/makam/:id"
                element={
                  <PetaLokasi
                    selectedSite={selectedSite}
                    setSelectedSite={setSelectedSite}
                    savedSiteIds={savedSiteIds}
                    handleToggleSave={handleToggleSave}
                    savedDoas={savedDoas}
                    onToggleSaveDoa={handleToggleSaveDoa}
                    onOpenKontribusi={() => setIsKontribusiOpen(true)}
                  />
                }
              />
              <Route path="/panduan" element={<BacaanZiarah />} />
              <Route
                path="/rubrik"
                element={
                  <RubrikKisah
                    savedArticles={savedRubrik}
                    onToggleSaveArticle={handleToggleSaveRubrik}
                    onOpenKontribusi={() => setIsKontribusiOpen(true)}
                  />
                }
              />
              <Route path="/doa" element={<KumpulanDoa savedDoas={savedDoas} onToggleSaveDoa={handleToggleSaveDoa} />} />
              <Route path="/infaq" element={<InfaqDigital />} />
              <Route path="/donasi" element={<InfaqDigital />} />
              <Route path="/kurasi" element={<KebijakanKurasi />} />
              <Route path="/admin" element={<AdminKurator />} />
              <Route path="/kurator-admin" element={<AdminKurator />} />
              <Route
                path="*"
                element={
                  <DaftarMakam
                    onSelectSite={handleSelectSite}
                    savedSiteIds={savedSiteIds}
                    handleToggleSave={handleToggleSave}
                    savedDoas={savedDoas}
                    onToggleSaveDoa={handleToggleSaveDoa}
                    onOpenKontribusi={() => setIsKontribusiOpen(true)}
                  />
                }
              />
            </Routes>
          </Suspense>
        </main>

        {/* Semantic Footer with Publisher Attribution & Agentic Resource Links */}
        <footer className="w-full border-t border-stone-300/80 bg-[#F3F0E8] py-8 px-4 sm:px-8 text-xs text-stone-700">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/favicon.svg"
                alt="Logo Resmi Ziarah Nusantara"
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="w-8 h-8 rounded-lg shrink-0"
              />
              <div>
                <p className="font-serif font-bold text-stone-950 text-sm">
                  Ziarah Nusantara — Panduan Ziarah Kubur &amp; Direktori Makam Wali Nusantara
                </p>
                <p className="text-stone-700">
                  Dikelola secara resmi oleh <strong>Tim Kurator Arsip Ziarah Nusantara</strong> •{' '}
                  <a href="https://ziarahnusantara.my.id" className="py-1 inline-block underline hover:text-stone-950">
                    Portal Resmi Ziarah Nusantara
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-semibold text-stone-800">
              <Link to="/direktori" className="py-1.5 min-h-[32px] inline-flex items-center hover:text-emerald-950">
                Direktori
              </Link>
              <Link to="/peta" className="py-1.5 min-h-[32px] inline-flex items-center hover:text-emerald-950">
                Peta Rute
              </Link>
              <Link to="/panduan" className="py-1.5 min-h-[32px] inline-flex items-center hover:text-emerald-950">
                Panduan Adab
              </Link>
              <Link to="/doa" className="py-1.5 min-h-[32px] inline-flex items-center hover:text-emerald-950">
                Doa &amp; Tahlil
              </Link>
              <Link to="/kurasi" className="py-1.5 min-h-[32px] inline-flex items-center hover:text-emerald-950">
                Standar Kurasi
              </Link>
              <Link
                to="/admin"
                className="py-1.5 min-h-[32px] inline-flex items-center text-stone-600 hover:text-stone-950 font-normal transition-colors"
                title="Portal Internal Dewan Kurator"
              >
                Portal Kurator
              </Link>
            </div>
          </div>
        </footer>

        {/* Lazy-loaded Contribution Modal */}
        {isKontribusiOpen && (
          <Suspense fallback={null}>
            <KontribusiModal isOpen={isKontribusiOpen} onClose={() => setIsKontribusiOpen(false)} />
          </Suspense>
        )}
      </div>
    </SiteProvider>
  );
}
