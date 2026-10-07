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

  // State for saved items
  const [savedSiteIds, setSavedSiteIds] = useState<string[]>([]);
  const [savedDoas, setSavedDoas] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Load from local storage initially
  useEffect(() => {
    try {
      const localSites = localStorage.getItem('savedZiarah');
      const localDoas = localStorage.getItem('savedDoas');
      if (localSites) setSavedSiteIds(JSON.parse(localSites));
      if (localDoas) setSavedDoas(JSON.parse(localDoas));
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
            setSavedSiteIds(data.savedSiteIds || []);
            setSavedDoas(data.savedDoas || []);
          } else {
            // Merge local data to firestore on first login
            await setDoc(userRef, {
              userId: currentUser.uid,
              savedSiteIds: savedSiteIds,
              savedDoas: savedDoas,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            });
          }
        } catch (error) {
          console.error("Error fetching user data from Firestore", error);
          try {
            handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
          } catch {
            // Logged structured error
          }
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

    // Save to Firestore if logged in
    const saveToFirestore = async () => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          // Use setDoc with merge instead of updateDoc to handle race conditions where doc doesn't exist yet
          await setDoc(userRef, {
            userId: user.uid,
            savedSiteIds: savedSiteIds,
            savedDoas: savedDoas,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } catch (error) {
          console.error("Error updating user data in Firestore", error);
          try {
            handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
          } catch {
            // Logged structured error
          }
        }
      }
    };
    
    saveToFirestore();
  }, [savedSiteIds, savedDoas, user, isDataLoaded]);

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

  const handleSelectSite = React.useCallback((site: ZiarahSite) => {
    setSelectedSite(site);
    navigate(`/makam/${site.id}`); // Auto-navigate to map when a site is selected from the list
  }, [navigate]);
  
  return (
    <SiteProvider>
    <div className="flex flex-col min-h-screen w-full bg-[#f8fafc] font-sans text-slate-900 selection:bg-emerald-200 selection:text-emerald-950 relative antialiased">
      {/* Dynamic Animated Ambient Background Glows */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden" 
        aria-hidden="true"
      >
        <motion.div 
          animate={{ 
            x: [0, 25, 0, -25, 0],
            y: [0, -20, 15, 0],
            scale: [1, 1.06, 0.98, 1] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] bg-gradient-to-b from-emerald-100/60 via-teal-50/30 to-transparent blur-3xl rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: [0, 30, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1] 
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 -left-32 w-88 h-88 bg-amber-100/40 blur-3xl rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: [0, -35, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 -right-32 w-96 h-96 bg-emerald-100/50 blur-3xl rounded-full" 
        />
      </div>
      
      {/* Sleek Floating Glass Header */}
      <header className="fixed top-0 left-0 right-0 z-[2000] bg-white/85 backdrop-blur-xl border-b border-slate-200/70 shadow-xs flex justify-center transition-all">
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
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col w-full h-full"
          >
            <Suspense fallback={
              <div className="flex-1 flex items-center justify-center p-12">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-9 h-9 border-3 border-emerald-200 border-t-emerald-700 rounded-full"
                />
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
              <Route path="/rubrik" element={<RubrikKisah />} />
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
