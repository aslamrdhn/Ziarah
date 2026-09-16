const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace("import React, { useState, useEffect } from 'react';", "import React, { useState, useEffect, Suspense, lazy } from 'react';");

content = content.replace("import { PetaLokasi } from './views/PetaLokasi';\nimport { DaftarMakam } from './views/DaftarMakam';\nimport { BacaanZiarah } from './views/BacaanZiarah';\nimport { KebijakanKurasi } from './views/KebijakanKurasi';\nimport { AdminKurator } from './views/AdminKurator';\nimport { KumpulanDoa } from './views/KumpulanDoa';", 
`const PetaLokasi = lazy(() => import('./views/PetaLokasi').then(m => ({ default: m.PetaLokasi })));
const DaftarMakam = lazy(() => import('./views/DaftarMakam').then(m => ({ default: m.DaftarMakam })));
const BacaanZiarah = lazy(() => import('./views/BacaanZiarah').then(m => ({ default: m.BacaanZiarah })));
const KebijakanKurasi = lazy(() => import('./views/KebijakanKurasi').then(m => ({ default: m.KebijakanKurasi })));
const AdminKurator = lazy(() => import('./views/AdminKurator').then(m => ({ default: m.AdminKurator })));
const KumpulanDoa = lazy(() => import('./views/KumpulanDoa').then(m => ({ default: m.KumpulanDoa })));`);

content = content.replace(/<Routes location={location} key={location.pathname}>/, `<Suspense fallback={<div className="flex-1 flex items-center justify-center p-8"><div className="w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div></div>}>\n            <Routes location={location} key={location.pathname}>`);

content = content.replace(/<\/Routes>/, `</Routes>\n            </Suspense>`);

fs.writeFileSync('src/App.tsx', content);
console.log("App lazified");
