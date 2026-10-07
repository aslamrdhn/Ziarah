const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Insert SiteProvider import
content = content.replace(
  "import { onAuthStateChanged, User } from 'firebase/auth';",
  "import { onAuthStateChanged, User } from 'firebase/auth';\nimport { SiteProvider } from './context/SiteContext';"
);

// Wrap return div with <SiteProvider>
content = content.replace(
  /<div className="flex flex-col min-h-screen w-full bg-\[\#f4f7f4\] font-sans text-stone-900 selection:bg-gold-200 relative">/,
  `<SiteProvider>\n    <div className="flex flex-col min-h-screen w-full bg-[#f4f7f4] font-sans text-stone-900 selection:bg-gold-200 relative">`
);

content = content.replace(
  /<\/div>\n  \);\n\}\n$/,
  `    </div>\n    </SiteProvider>\n  );\n}\n`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed App.tsx Context');
