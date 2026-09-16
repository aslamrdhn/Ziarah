const fs = require('fs');

let content = fs.readFileSync('src/views/BacaanZiarah.tsx', 'utf8');

// Find start and end
const startStr = "{/* Audio Guide Premium */}";
const endStr = "{/* Urutan Controls */}";
const startIdx = content.indexOf(startStr);
const endIdx = content.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
  content = content.slice(0, startIdx) + content.slice(endIdx);
  fs.writeFileSync('src/views/BacaanZiarah.tsx', content);
  console.log('Removed Audio Guide Mock');
} else {
  console.log('Could not find Audio Guide block');
}
