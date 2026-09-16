const fs = require('fs');
let bz = fs.readFileSync('src/views/BacaanZiarah.tsx', 'utf8');

bz = bz.replace(/\s*\)\}\s*\n\s*\)\}/g, '\n                )}\n              </>\n            )}');

fs.writeFileSync('src/views/BacaanZiarah.tsx', bz);
console.log("Fixed bz2");
