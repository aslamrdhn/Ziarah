const fs = require('fs');

let content = fs.readFileSync('src/views/PetaLokasi.tsx', 'utf8');
content = content.replace('$1<>', 'return (<>');
content = content.replace('$2 className', '<div className');
fs.writeFileSync('src/views/PetaLokasi.tsx', content);

let daftar = fs.readFileSync('src/views/DaftarMakam.tsx', 'utf8');
daftar = daftar.replace('$1<>', 'return (<>');
daftar = daftar.replace('$2 className', '<div className');
fs.writeFileSync('src/views/DaftarMakam.tsx', daftar);

let bacaan = fs.readFileSync('src/views/BacaanZiarah.tsx', 'utf8');
bacaan = bacaan.replace('$1<>', 'return (<>');
bacaan = bacaan.replace('$2 className', '<div className');
fs.writeFileSync('src/views/BacaanZiarah.tsx', bacaan);

let doa = fs.readFileSync('src/views/KumpulanDoa.tsx', 'utf8');
doa = doa.replace('$1<>', 'return (<>');
doa = doa.replace('$2 className', '<div className');
fs.writeFileSync('src/views/KumpulanDoa.tsx', doa);

console.log("Fixed $1 and $2");
