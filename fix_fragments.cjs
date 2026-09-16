const fs = require('fs');

function fixFragment(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('return (<>')) {
    content = content.replace(/(\s*\)\;\s*\};?\s*)$/, '\n    </>\n  $1');
    fs.writeFileSync(filePath, content);
  }
}

fixFragment('src/views/PetaLokasi.tsx');
fixFragment('src/views/DaftarMakam.tsx');
fixFragment('src/views/BacaanZiarah.tsx');
fixFragment('src/views/KumpulanDoa.tsx');
console.log('Fixed fragments');
