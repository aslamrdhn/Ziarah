const fs = require('fs');
let bz = fs.readFileSync('src/views/BacaanZiarah.tsx', 'utf8');

// Replace all `)} \n )}` where the first one is the end of an inner block and the second is the end of the step block
// Wait, actually I can just do this:
bz = bz.replace(/                \)}\n              \n            \)}/g, '                )}\n              </>\n            )}');

fs.writeFileSync('src/views/BacaanZiarah.tsx', bz);
console.log("Fixed bz");
