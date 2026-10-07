const fs = require('fs');
let content = fs.readFileSync('src/views/PetaLokasi.tsx', 'utf8');

content = content.replace(
  "import { ziarahSites, ZiarahSite } from '../data/sites';",
  "import { ZiarahSite } from '../data/sites';\nimport { useSites } from '../context/SiteContext';"
);

content = content.replace(
  /export const PetaLokasi: React.FC<PetaLokasiProps> = \(\{/,
  `export const PetaLokasi: React.FC<PetaLokasiProps> = ({`
);

content = content.replace(
  /const navigate = useNavigate\(\);/,
  `const navigate = useNavigate();\n  const { sites: ziarahSites, isLoading } = useSites();`
);

// We also need to fix `if (isLoading)` but PetaLokasi is complex. Let's just wrap it early or inside return.
content = content.replace(
  /return \(/,
  `if (isLoading) return <div className="p-8 text-center text-stone-500 flex-1 flex items-center justify-center">Memuat Peta Interaktif...</div>;
  return (`
);

fs.writeFileSync('src/views/PetaLokasi.tsx', content);
console.log('Fixed PetaLokasi.tsx');
