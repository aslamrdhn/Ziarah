const fs = require('fs');

function injectHook(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Clean up previous failed attempts if they exist
  content = content.replace(/const \{ sites: ziarahSites, isLoading \} = useSites\(\);\n/g, '');
  content = content.replace(/if \(isLoading\) return <div className="p-8 text-center text-stone-500">.*?<\/div>;/g, '');

  if (filePath.includes('DaftarMakam')) {
    content = content.replace(/React\.memo\(\(\{\s*onSelectSite\s*\}\)\s*=>\s*\{/, 
      "React.memo(({ onSelectSite }) => {\n  const { sites: ziarahSites, isLoading } = useSites();\n");
    content = content.replace(/return\s*\(/, 
      "if (isLoading) return <div className=\"p-8 text-center text-stone-500\">Memuat Data Direktori...</div>;\n  return (");
    // Also fix the TS issue for s in ziarahSites.map
    content = content.replace(/ziarahSites\.map\(s =>/g, "ziarahSites.map((s: ZiarahSite) =>");
    content = content.replace(/ziarahSites\.filter\(site =>/g, "ziarahSites.filter((site: ZiarahSite) =>");
  }

  if (filePath.includes('KumpulanDoa')) {
    content = content.replace(/React\.memo\(\(\{\s*savedDoas,\s*onToggleSaveDoa\s*\}\)\s*=>\s*\{/, 
      "React.memo(({ savedDoas, onToggleSaveDoa }) => {\n  const { sites: ziarahSites, isLoading } = useSites();\n");
    content = content.replace(/return\s*\(/, 
      "if (isLoading) return <div className=\"p-8 text-center text-stone-500\">Memuat Koleksi Doa...</div>;\n  return (");
  }

  if (filePath.includes('PetaLokasi')) {
    content = content.replace(/export const PetaLokasi: React\.FC<PetaLokasiProps> = \(\{/g, 
      "export const PetaLokasi: React.FC<PetaLokasiProps> = ({");
    // Ensure we insert it after the destructured props
    content = content.replace(/const navigate = useNavigate\(\);/, 
      "const navigate = useNavigate();\n  const { sites: ziarahSites, isLoading } = useSites();");
    content = content.replace(/return\s*\(\s*<div className="w-full flex-1/, 
      "if (isLoading) return <div className=\"p-8 text-center text-stone-500\">Memuat Peta...</div>;\n  return (\n    <div className=\"w-full flex-1");
  }

  if (filePath.includes('MakamDetailView')) {
    content = content.replace(/export const MakamDetailView: React\.FC = \(\) => \{/g, 
      "export const MakamDetailView: React.FC = () => {\n  const { sites: ziarahSites, isLoading } = useSites();\n");
    content = content.replace(/return\s*\(/, 
      "if (isLoading) return <div className=\"p-8 text-center text-stone-500\">Memuat Detail Makam...</div>;\n  return (");
    content = content.replace(/ziarahSites\.find\(s =>/g, "ziarahSites.find((s: ZiarahSite) =>");
  }

  fs.writeFileSync(filePath, content);
  console.log('Fixed ' + filePath);
}

['src/views/DaftarMakam.tsx', 'src/views/KumpulanDoa.tsx', 'src/views/PetaLokasi.tsx'].forEach(file => {
  if (fs.existsSync(file)) injectHook(file);
});
if (fs.existsSync('src/views/MakamDetailView.tsx')) injectHook('src/views/MakamDetailView.tsx');

// Fix SiteContext TS issue
let ctxContent = fs.readFileSync('src/context/SiteContext.tsx', 'utf8');
ctxContent = ctxContent.replace(/import \{ collection, getDocs, onSnapshot \} from 'firebase\/firestore';/, "import { collection, onSnapshot } from 'firebase/firestore';");
fs.writeFileSync('src/context/SiteContext.tsx', ctxContent);

