const fs = require('fs');
let content = fs.readFileSync('src/views/KumpulanDoa.tsx', 'utf8');

content = content.replace(
  "import { ziarahSites } from '../data/sites';",
  "import { useSites } from '../context/SiteContext';"
);

content = content.replace(
  /const \[searchQuery, setSearchQuery\] = useState\(''\);/,
  `const [searchQuery, setSearchQuery] = useState('');\n  const { sites: ziarahSites, isLoading } = useSites();`
);

content = content.replace(
  /return \(/,
  `if (isLoading) return <div className="p-8 text-center text-stone-500">Memuat Koleksi Doa...</div>;
  return (`
);

fs.writeFileSync('src/views/KumpulanDoa.tsx', content);
console.log('Fixed KumpulanDoa.tsx');
