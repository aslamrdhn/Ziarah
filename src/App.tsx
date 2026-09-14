import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { KontribusiModal } from './components/KontribusiModal';
import { PetaLokasi } from './views/PetaLokasi';
import { DaftarMakam } from './views/DaftarMakam';
import { BacaanZiarah } from './views/BacaanZiarah';
import { KebijakanKurasi } from './views/KebijakanKurasi';
import { AdminKurator } from './views/AdminKurator';
import { KumpulanDoa } from './views/KumpulanDoa';
import { ZiarahSite } from './data/sites';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('daftar');
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

  const handleNavigate = React.useCallback((view: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectSite = React.useCallback((site: ZiarahSite) => {
    setSelectedSite(site);
    setCurrentView('peta'); // Auto-navigate to map when a site is selected from the list
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'peta':
        return (
          <PetaLokasi 
            selectedSite={selectedSite}
            setSelectedSite={setSelectedSite}
            savedSiteIds={savedSiteIds}
            handleToggleSave={handleToggleSave}
            savedDoas={savedDoas}
            onToggleSaveDoa={handleToggleSaveDoa}
            onOpenKontribusi={() => setIsKontribusiOpen(true)}
          />
        );
      case 'daftar':
        return <DaftarMakam onSelectSite={handleSelectSite} />;
      case 'bacaan':
        return <BacaanZiarah />;
      case 'doa-karomah':
        return <KumpulanDoa savedDoas={savedDoas} onToggleSaveDoa={handleToggleSaveDoa} />;
      case 'kurasi':
        return <KebijakanKurasi />;
      case 'admin':
        return <AdminKurator />;
      default:
        return <DaftarMakam onSelectSite={handleSelectSite} />;
    }
  };

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
            currentView={currentView} 
            onNavigate={handleNavigate} 
            onOpenKontribusi={() => setIsKontribusiOpen(true)} 
          />
        </div>
      </div>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 pt-20 pb-12 w-full overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col w-full h-full"
          >
            {renderView()}
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
