const fs = require('fs');
if (fs.existsSync('src/views/MakamDetailView.tsx')) {
  let content = fs.readFileSync('src/views/MakamDetailView.tsx', 'utf8');

  content = content.replace(
    "import { ziarahSites, ZiarahSite } from '../data/sites';",
    "import { ZiarahSite } from '../data/sites';\nimport { useSites } from '../context/SiteContext';"
  );

  content = content.replace(
    /export const MakamDetailView: React.FC = \(\) => \{/,
    `export const MakamDetailView: React.FC = () => {
    const { sites: ziarahSites, isLoading } = useSites();`
  );

  content = content.replace(
    /return \(/,
    `if (isLoading) return <div className="p-8 text-center text-stone-500">Memuat Detail Makam...</div>;
    return (`
  );

  fs.writeFileSync('src/views/MakamDetailView.tsx', content);
  console.log('Fixed MakamDetailView.tsx');
}
