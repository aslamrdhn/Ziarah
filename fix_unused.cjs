const fs = require('fs');

let ak = fs.readFileSync('src/views/AdminKurator.tsx', 'utf8');
ak = ak.replace('Lock, ShieldAlert', 'ShieldAlert');
fs.writeFileSync('src/views/AdminKurator.tsx', ak);

let bz = fs.readFileSync('src/views/BacaanZiarah.tsx', 'utf8');
bz = bz.replace('Copy, Volume2, Headphones', 'Copy');
fs.writeFileSync('src/views/BacaanZiarah.tsx', bz);

console.log('Fixed unused imports');
