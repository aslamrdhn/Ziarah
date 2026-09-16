const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace imports
content = content.replace(
  "import { motion, AnimatePresence } from 'motion/react';",
  "import { motion, AnimatePresence } from 'motion/react';\nimport { Routes, Route, useLocation, useNavigate } from 'react-router-dom';"
);

// Remove unused state
content = content.replace(
  "const [currentView, setCurrentView] = useState<string>('daftar');",
  "const location = useLocation();\n  const navigate = useNavigate();"
);
content = content.replace(
  "const handleNavigate = React.useCallback((view: string) => {\n    setCurrentView(view);\n    window.scrollTo({ top: 0, behavior: 'smooth' });\n  }, []);\n\n  const handleSelectSite = React.useCallback((site: ZiarahSite) => {\n    setSelectedSite(site);\n    setCurrentView('peta'); // Auto-navigate to map when a site is selected from the list\n  }, []);",
  "const handleSelectSite = React.useCallback((site: ZiarahSite) => {\n    setSelectedSite(site);\n    navigate('/peta'); // Auto-navigate to map when a site is selected from the list\n  }, [navigate]);"
);

// Remove renderView function entirely
content = content.replace(
  /const renderView = \(\) => \{[\s\S]*?\};\n/,
  ''
);

// Update Navbar props
content = content.replace(
  /<Navbar \s*currentView=\{currentView\} \s*onNavigate=\{handleNavigate\} \s*onOpenKontribusi=\{\(\) => setIsKontribusiOpen\(true\)\} \s*\/>/,
  '<Navbar \n            onOpenKontribusi={() => setIsKontribusiOpen(true)} \n          />'
);

// Update main area
content = content.replace(
  /<AnimatePresence mode="wait">[\s\S]*?<\/AnimatePresence>/,
  `<AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-1 flex flex-col w-full h-full"
          >
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
              <Route path="/panduan" element={<BacaanZiarah />} />
              <Route path="/doa" element={<KumpulanDoa savedDoas={savedDoas} onToggleSaveDoa={handleToggleSaveDoa} />} />
              <Route path="/kurasi" element={<KebijakanKurasi />} />
              <Route path="/admin" element={<AdminKurator />} />
            </Routes>
          </motion.div>
        </AnimatePresence>`
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx rewritten for routing');
