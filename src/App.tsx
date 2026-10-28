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

import { ZiarahSite } from './data/sites';
import { Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';

import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { SiteProvider } from './context/SiteContext';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

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

  // Load custom domain setting from local cache immediately, then defer Firestore fetch
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

    const timer = window.setTimeout(() => {
      getDoc(doc(db, 'settings', 'infaq'))
        .then((snap) => {
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
        })
        .catch(() => {});
    }, 2500);

    return () => window.clearTimeout(timer);
  }, []);

  // Dynamically sync canonical URL, OpenGraph URL/image, and Schema.org @graph on route/domain change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const baseOrigin = customDomainOrigin || window.location.origin;
    const cleanPath = location.pathname === '/' ? '/' : location.pathname;
    const fullUrl = `${baseOrigin}${cleanPath}`;
    const fullImageUrl = `${baseOrigin}/pwa-512x512.png`;

    const routeSeoMap: Record<string, { title: string; desc: string }> = {
      '/': {
        title: 'Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara',
        desc: 'Situs resmi Ziarah Nusantara (ziarahnusantara.my.id) dikelola oleh Tim Kurator Arsip Ziarah Nusantara. Direktori makam Wali Songo, ulama Nusantara, peta interaktif, adab ziarah, kumpulan doa tahlil & tawassul, serta literasi sejarah Islam Nusantara.',
      },
      '/direktori': {
        title: 'Arsip & Direktori Makam Waliyullah — Ziarah Nusantara',
        desc: 'Direktori ensiklopedis makam Wali Songo, Ulama Nusantara, dan Tokoh Kesultanan Islam beserta koordinat peta dan rujukan jurnal ilmiah oleh Tim Kurator Arsip Ziarah Nusantara.',
      },
      '/peta': {
        title: 'Peta Rute Geospasial Makam Wali — Ziarah Nusantara',
        desc: 'Peta interaktif titik lokasi dan navigasi rute ziarah makam para Waliyullah serta ulama bersejarah di seluruh kepulauan Nusantara.',
      },
      '/panduan': {
        title: 'Panduan Adab & Tata Cara Ziarah Kubur — Ziarah Nusantara',
        desc: 'Tuntunan adab, niat, salam, dan tata cara ziarah makam para Waliyullah sesuai sunnah dan tradisi ulama Ahlussunnah wal Jamaah.',
      },
      '/rubrik': {
        title: 'Rubrik Kisah, Karomah & Naskah Sejarah — Ziarah Nusantara',
        desc: 'Kajian mendalam biografi, sanad keilmuan, sejarah dakwah, dan keteladanan para Waliyullah Nusantara yang dikurasi oleh Tim Kurator Arsip Ziarah Nusantara.',
      },
      '/doa': {
        title: 'Kumpulan Doa Khusus, Tahlil & Tawassul Lengkap — Ziarah Nusantara',
        desc: 'Bacaan salam ziarah, susunan tawassul, Yasin, dan tahlil lengkap teks Arab, transliterasi Latin, serta terjemahan Bahasa Indonesia.',
      },
      '/infaq': {
        title: 'Infaq Digital & Pelestarian Arsip — Ziarah Nusantara',
        desc: 'Layanan infaq dan wakaf digital QRIS resmi Ziarah Nusantara untuk mendukung riset literasi sejarah dan pelestarian situs makam Waliyullah.',
      },
      '/kurasi': {
        title: 'Kebijakan Kurasi & Standar Referensi Ilmiah — Ziarah Nusantara',
        desc: 'Pedoman metodologi verifikasi sumber sejarah, jurnal akademik, naskah babad, dan kurasi situs makam oleh Tim Kurator Arsip Ziarah Nusantara.',
      },
    };

    const activeSeo = routeSeoMap[cleanPath] || routeSeoMap['/'];
    document.title = activeSeo.title;

    const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (descEl) descEl.content = activeSeo.desc;

    const canonicalEl = document.getElementById('canonical-link') as HTMLLinkElement | null;
    if (canonicalEl) canonicalEl.href = fullUrl;

    const ogTitleEl = document.getElementById('og-title') as HTMLMetaElement | null;
    if (ogTitleEl) ogTitleEl.content = activeSeo.title;

    const ogDescEl = document.getElementById('og-description') as HTMLMetaElement | null;
    if (ogDescEl) ogDescEl.content = activeSeo.desc;

    const ogUrlEl = document.getElementById('og-url') as HTMLMetaElement | null;
    if (ogUrlEl) ogUrlEl.content = fullUrl;

    const ogImgEl = document.getElementById('og-image') as HTMLMetaElement | null;
    if (ogImgEl) ogImgEl.content = fullImageUrl;

    const twitterTitleEl = document.getElementById('twitter-title') as HTMLMetaElement | null;
    if (twitterTitleEl) twitterTitleEl.content = activeSeo.title;

    const twitterDescEl = document.getElementById('twitter-description') as HTMLMetaElement | null;
    if (twitterDescEl) twitterDescEl.content = activeSeo.desc;

    const twitterImgEl = document.getElementById('twitter-image') as HTMLMetaElement | null;
    if (twitterImgEl) twitterImgEl.content = fullImageUrl;

    const schemaEl = document.getElementById('schema-jsonld');
    if (schemaEl) {
      schemaEl.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${baseOrigin}/#organization`,
            name: 'Ziarah Nusantara',
            legalName: 'Tim Kurator Arsip Ziarah Nusantara',
            alternateName: [
              'Tim Kurator Arsip Ziarah Nusantara',
              'ziarahnusantara.my.id',
              'ziarah nusantara.my.id',
              'Arsip & Direktori Makam Wali Nusantara',
            ],
            url: `${baseOrigin}/`,
            description:
              'Tim Kurator Arsip Ziarah Nusantara adalah pengelola resmi platform Ziarah Nusantara (ziarahnusantara.my.id), pusat direktori digital, pemetaan geospasial, literasi sejarah akademik, dan panduan adab ziarah makam para Waliyullah serta Ulama di seluruh kepulauan Nusantara.',
            logo: {
              '@type': 'ImageObject',
              '@id': `${baseOrigin}/#logo`,
              url: fullImageUrl,
              contentUrl: fullImageUrl,
              width: 512,
              height: 512,
              caption: 'Logo Resmi Ziarah Nusantara — Lambang Kubah Emas dan Kaligrafi ZN Hijau Zamrud',
            },
            image: {
              '@id': `${baseOrigin}/#logo`,
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${baseOrigin}/#website`,
            url: `${baseOrigin}/`,
            name: 'Ziarah Nusantara',
            alternateName: [
              'Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara',
              'ziarahnusantara.my.id',
              'ziarah nusantara.my.id',
              'Direktori Makam Waliyullah & Ulama Nusantara',
            ],
            description: activeSeo.desc,
            inLanguage: 'id-ID',
            publisher: {
              '@id': `${baseOrigin}/#organization`,
            },
          },
          {
            '@type': 'WebPage',
            '@id': `${fullUrl}#webpage`,
            url: fullUrl,
            name: activeSeo.title,
            description: activeSeo.desc,
            inLanguage: 'id-ID',
            isPartOf: {
              '@id': `${baseOrigin}/#website`,
            },
            about: {
              '@id': `${baseOrigin}/#organization`,
            },
            primaryImageOfPage: {
              '@id': `${baseOrigin}/#logo`,
            },
          },
        ],
      });
    }
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

  // Sync with Firestore when auth state changes (deferred slightly to avoid blocking initial paint)
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    const timer = window.setTimeout(() => {
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
    }, 1500);

    return () => {
      window.clearTimeout(timer);
      if (unsubscribe) unsubscribe();
    };
  }, []);

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
      navigate(`/makam/${site.id}`);
    },
    [navigate]
  );

  return (
    <SiteProvider>
      <div className="flex flex-col min-h-screen w-full bg-[#F9F8F4] font-sans text-stone-900 selection:bg-stone-300 selection:text-stone-950 relative antialiased">
        {/* Editorial Glass Header */}
        <header className="fixed top-0 left-0 right-0 z-[2000] bg-[#F9F8F4]/95 backdrop-blur-md border-b border-stone-300/80 flex justify-center">
          <div className="w-full max-w-6xl">
            <Navbar onOpenKontribusi={() => setIsKontribusiOpen(true)} />
          </div>
        </header>

        {/* Main Content Area (Rendered immediately at opacity 1 for fast FCP/LCP) */}
        <main className="flex-1 flex flex-col relative z-10 pt-16 md:pt-20 pb-24 md:pb-12 w-full overflow-x-hidden">
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center p-12">
                <div className="w-8 h-8 border-2 border-stone-300 border-t-emerald-800 rounded-full animate-spin" />
              </div>
            }
          >
            <Routes location={location}>
              <Route path="/" element={<DaftarMakam onSelectSite={handleSelectSite} />} />
              <Route path="/direktori" element={<DaftarMakam onSelectSite={handleSelectSite} />} />
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
              <Route path="/kurasi" element={<KebijakanKurasi />} />
              <Route path="/admin" element={<AdminKurator />} />
              <Route path="/kurator-admin" element={<AdminKurator />} />
              <Route path="*" element={<DaftarMakam onSelectSite={handleSelectSite} />} />
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
                className="w-8 h-8 rounded-lg shrink-0"
              />
              <div>
                <p className="font-serif font-bold text-stone-950 text-sm">
                  Ziarah Nusantara — Jejak Spiritual Para Waliyullah Nusantara
                </p>
                <p className="text-stone-700">
                  Dikelola secara resmi oleh <strong>Tim Kurator Arsip Ziarah Nusantara</strong> •{' '}
                  <a href="https://ziarahnusantara.my.id" className="underline hover:text-stone-950">
                    ziarahnusantara.my.id
                  </a>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-semibold text-stone-800">
              <Link to="/direktori" className="hover:text-emerald-950">
                Direktori
              </Link>
              <Link to="/peta" className="hover:text-emerald-950">
                Peta Rute
              </Link>
              <Link to="/panduan" className="hover:text-emerald-950">
                Panduan Adab
              </Link>
              <Link to="/doa" className="hover:text-emerald-950">
                Doa &amp; Tahlil
              </Link>
              <Link to="/kurasi" className="hover:text-emerald-950">
                Standar Kurasi
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
