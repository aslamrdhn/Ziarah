import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { KontribusiModal } from './components/KontribusiModal';

const PetaLokasi = lazy(() => import('./views/PetaLokasi').then(m => ({ default: m.PetaLokasi })));
const DaftarMakam = lazy(() => import('./views/DaftarMakam').then(m => ({ default: m.DaftarMakam })));
const BacaanZiarah = lazy(() => import('./views/BacaanZiarah').then(m => ({ default: m.BacaanZiarah })));
const KebijakanKurasi = lazy(() => import('./views/KebijakanKurasi').then(m => ({ default: m.KebijakanKurasi })));
const AdminKurator = lazy(() => import('./views/AdminKurator').then(m => ({ default: m.AdminKurator })));
const KumpulanDoa = lazy(() => import('./views/KumpulanDoa').then(m => ({ default: m.KumpulanDoa })));
const RubrikKisah = lazy(() => import('./views/RubrikKisah').then(m => ({ default: m.RubrikKisah })));
const InfaqDigital = lazy(() => import('./views/InfaqDigital').then(m => ({ default: m.InfaqDigital })));

import { ZiarahSite } from './data/sites';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

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

  // Sync with Firestore when auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
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
            // Merge local data to firestore on first login
            await setDoc(userRef, {
              userId: currentUser.uid,
              savedSiteIds: savedSiteIds,
              savedDoas: savedDoas,
              savedRubrik: savedRubrik,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        }
      }
    });
    return () => unsubscribe();
  }, []); // Only run once on mount

  // Sync state changes to local storage & Firestore
  useEffect(() => {
    if (!isDataLoaded) return;
    
    // Save to local storage as fallback
    localStorage.setItem('savedZiarah', JSON.stringify(savedSiteIds));
    localStorage.setItem('savedDoas', JSON.stringify(savedDoas));
    localStorage.setItem('savedRubrik', JSON.stringify(savedRubrik));

    // Save to Firestore if logged in
    const saveToFirestore = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(userRef, {
            userId: user.uid,
            savedSiteIds: savedSiteIds,
            savedDoas: savedDoas,
            savedRubrik: savedRubrik,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
        }
      }
    };
    
    saveToFirestore();
  }, [savedSiteIds, savedDoas, savedRubrik, user, isDataLoaded]);

  const handleToggleSave = React.useCallback((siteId: string) => {
    setSavedSiteIds(prev => 
      prev.includes(siteId) 
        ? prev.filter(id => id !== siteId) 
        : [...prev, siteId]
    );
  }, []);

  const handleToggleSaveDoa = React.useCallback((id: string) => {
    setSavedDoas(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  }, []);

  const handleToggleSaveRubrik = React.useCallback((id: string) => {
    setSavedRubrik(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  }, []);

  const handleSelectSite = React.useCallback((site: ZiarahSite) => {
    setSelectedSite(site);
    navigate(`/makam/${site.id}`);
  }, [navigate]);
  
  return (
    <SiteProvider>
    <div className="flex flex-col min-h-screen w-full bg-[#F9F8F4] font-sans text-stone-900 selection:bg-stone-300 selection:text-stone-950 relative antialiased">
      {/* Editorial Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-[2000] bg-[#F9F8F4]/95 backdrop-blur-md border-b border-stone-300/80 flex justify-center">
        <div className="w-full max-w-6xl">
          <Navbar 
            onOpenKontribusi={() => setIsKontribusiOpen(true)} 
          />
        </div>
      </header>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 pt-16 md:pt-20 pb-24 md:pb-12 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex-1 flex flex-col w-full h-full"
          >
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center p-12">
                <div className="w-8 h-8 border-2 border-stone-300 border-t-emerald-800 rounded-full animate-spin" />
              </div>
            }>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<DaftarMakam onSelectSite={handleSelectSite} />} />
              <Route path="/peta" element={
                <PetaLokasi 
                  selectedSite={selectedSite}
                  setSelectedSite={setSelectedSite}
                  savedSiteIds={savedSiteIds}
                  handleToggleSave={handleToggleSave}
                  savedDoas={savedDoas}
                  onToggleSaveDoa={handleToggleSaveDoa}
                  onOpenKontribusi={() => setIsKontribusiOpen(true)}
                />
              } />
              <Route path="/makam/:id" element={
                <PetaLokasi 
                  selectedSite={selectedSite}
                  setSelectedSite={setSelectedSite}
                  savedSiteIds={savedSiteIds}
                  handleToggleSave={handleToggleSave}
                  savedDoas={savedDoas}
                  onToggleSaveDoa={handleToggleSaveDoa}
                  onOpenKontribusi={() => setIsKontribusiOpen(true)}
                />
              } />
              <Route path="/panduan" element={<BacaanZiarah />} />
              <Route path="/rubrik" element={
                <RubrikKisah 
                  savedArticles={savedRubrik} 
                  onToggleSaveArticle={handleToggleSaveRubrik} 
                  onOpenKontribusi={() => setIsKontribusiOpen(true)} 
                />
              } />
              <Route path="/doa" element={<KumpulanDoa savedDoas={savedDoas} onToggleSaveDoa={handleToggleSaveDoa} />} />
              <Route path="/infaq" element={<InfaqDigital />} />
              <Route path="/kurasi" element={<KebijakanKurasi />} />
              <Route path="/admin" element={<AdminKurator />} />
            </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Contribution Modal */}
      <KontribusiModal 
        isOpen={isKontribusiOpen} 
        onClose={() => setIsKontribusiOpen(false)} 
      />
        </div>
    </SiteProvider>
  );
}
