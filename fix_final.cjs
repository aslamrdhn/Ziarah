const fs = require('fs');

function fixSyntax(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // First, remove the bad `<React.Fragment>` injections
  content = content.replace(/return \(\n<React\.Fragment>/, 'return (');
  content = content.replace(/<\/React\.Fragment>\n  \);\n};/, '  );\n};');
  content = content.replace(/<\/React\.Fragment>\n  \);\n\}\);/, '  );\n});');
  
  // Then, just remove `Helmet` from the views temporarily so they build, we can use `App.tsx` for Helmet or just put it correctly.
  content = content.replace(/<Helmet>[\s\S]*?<\/Helmet>/, '');
  content = content.replace("import { Helmet } from 'react-helmet-async';", "");
  
  fs.writeFileSync(filePath, content);
}

['src/views/PetaLokasi.tsx', 'src/views/DaftarMakam.tsx', 'src/views/BacaanZiarah.tsx', 'src/views/KumpulanDoa.tsx'].forEach(fixSyntax);

console.log("Fixed.");
