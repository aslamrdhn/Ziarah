const fs = require('fs');
let content = fs.readFileSync('src/views/DaftarMakam.tsx', 'utf8');

content = content.replace(
  "import { ZiarahSite, ziarahSites } from '../data/sites';",
  "import { ZiarahSite } from '../data/sites';\nimport { useSites } from '../context/SiteContext';"
);

content = content.replace(
  /export const DaftarMakam: React.FC<DaftarMakamProps> = \(\{ onSelectSite \}\) => \{/,
  `export const DaftarMakam: React.FC<DaftarMakamProps> = ({ onSelectSite }) => {
  const { sites: ziarahSites, isLoading } = useSites();`
);

content = content.replace(
  /return \(/,
  `if (isLoading) return <div className="p-8 text-center text-stone-500">Memuat Data Direktori...</div>;
  return (`
);

fs.writeFileSync('src/views/DaftarMakam.tsx', content);
console.log('Fixed DaftarMakam.tsx');
