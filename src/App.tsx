import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { KontribusiModal } from './components/KontribusiModal';
const PetaLokasi = lazy(() => import('./views/PetaLokasi').then(m => ({ default: m.PetaLokasi })));
const DaftarMakam = lazy(() => import('./views/DaftarMakam').then(m => ({ default: m.DaftarMakam })));
const BacaanZiarah = lazy(() => import('./views/BacaanZiarah').then(m => ({ default: m.BacaanZiarah })));
const KebijakanKurasi = lazy(() => import('./views/KebijakanKurasi').then(m => ({ default: m.KebijakanKurasi })));
const AdminKurator = lazy(() => import('./views/AdminKurator').then(m => ({ default: m.AdminKurator })));
const KumpulanDoa = lazy(() => import('./views/KumpulanDoa').then(m => ({ default: m.KumpulanDoa })));
import { ZiarahSite } from './data/sites';
import { motion, AnimatePresence } from 'motion/react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSite, setSelectedSite] = useState<ZiarahSite | null>(null);
  const [isKontribusiOpen, setIsKontribusiOpen] = useState(false);
  
  // Persist saved sites in localStorage
  const [savedSiteIds, setSavedSiteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('savedZiarah');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing savedZiarah from localStorage', e);
      return [];
    }
  });

  // Persist saved doa and karomah in localStorage
  const [savedDoas, setSavedDoas] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('savedDoas');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing savedDoas from localStorage', e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('savedZiarah', JSON.stringify(savedSiteIds));
  }, [savedSiteIds]);

  useEffect(() => {
    localStorage.setItem('savedDoas', JSON.stringify(savedDoas));
  }, [savedDoas]);

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
    <div className="flex flex-col min-h-screen w-full bg-[#f4f7f4] font-sans text-stone-900 selection:bg-gold-200 relative">
      {/* Subtle background pattern overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 mix-blend-multiply" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231d3e38' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Clean Light Navbar */}
      <div className="fixed top-0 left-0 right-0 z-[2000] bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-sm flex justify-center">
        <div className="w-full max-w-5xl">
          <Navbar 
            onOpenKontribusi={() => setIsKontribusiOpen(true)} 
          />
        </div>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 pt-20 pb-12 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col w-full h-full"
          >
            <Suspense fallback={<div className="flex-1 flex items-center justify-center p-8"><div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div></div>}>
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
              <Route path="/doa" element={<KumpulanDoa savedDoas={savedDoas} onToggleSaveDoa={handleToggleSaveDoa} />} />
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
  );
}
