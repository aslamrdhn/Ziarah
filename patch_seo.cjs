const fs = require('fs');

function addHelmet(filePath, title, description) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('react-helmet-async')) {
    // Add import
    content = content.replace("import React", "import { Helmet } from 'react-helmet-async';\nimport React");
    
    // Check if component returns a fragment or element, wrap with Helmet
    // We will just insert Helmet right after the return statement
    const returnRegex = /(return\s*\(\s*)(<div|<main|<Fragment|<>)/;
    const match = content.match(returnRegex);
    
    if (match) {
      const helmetStr = `<Helmet>\n        <title>${title}</title>\n        <meta name="description" content="${description}" />\n      </Helmet>\n      `;
      content = content.replace(match[0], `$1<>\n      ${helmetStr}$2`);
      
      // Need to close the fragment at the end, but wait, usually components end with `);`. If we just do it like this it might break if we don't close fragment.
      // So let's insert it inside the outermost div.
      const returnDivRegex = /(return\s*\(\s*<div[^>]*>)/;
      const divMatch = content.match(returnDivRegex);
      if (divMatch) {
         content = content.replace(divMatch[0], `${divMatch[0]}\n      ${helmetStr}`);
      }
    }
    fs.writeFileSync(filePath, content);
    console.log(`Added SEO to ${filePath}`);
  }
}

addHelmet('src/views/DaftarMakam.tsx', 'Direktori Makam | Ziarah Nusantara', 'Cari dan jelajahi direktori makam wali, habaib, dan ulama di nusantara.');
addHelmet('src/views/PetaLokasi.tsx', 'Peta Lokasi Ziarah | Ziarah Nusantara', 'Peta interaktif makam para wali, habaib, dan ulama di Indonesia.');
addHelmet('src/views/BacaanZiarah.tsx', 'Panduan Ziarah | Ziarah Nusantara', 'Panduan adab, doa tawasul, tahlil, dan yasin untuk berziarah.');
addHelmet('src/views/KumpulanDoa.tsx', 'Koleksi Doa Pribadi | Ziarah Nusantara', 'Koleksi doa dan kisah karomah yang Anda simpan.');

