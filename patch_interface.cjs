const fs = require('fs');
let content = fs.readFileSync('src/data/sites.ts', 'utf8');

// Add untoldStory to interface
content = content.replace(
  '  doaKhusus?: {',
  '  untoldStory?: string;\n  doaKhusus?: {'
);

// Add sample untold stories
content = content.replace(
  /id: "wali-7",([\s\S]*?)facilities:/,
  `id: "wali-7",$1untoldStory: "Dalam sebuah manuskrip kuno yang tersimpan rapat, disebutkan bahwa Sunan Kalijaga memiliki kemampuan untuk 'melipat bumi' (Syi'ir Tayyul Ardh) saat melakukan perjalanan dari Demak ke Cirebon dalam hitungan detik untuk menghadiri pertemuan rahasia para Wali. Kisah ini dijaga lisan secara turun temurun oleh para kuncen keraton.",\n    facilities:`
);

content = content.replace(
  /id: "ulama-2",([\s\S]*?)facilities:/,
  `id: "ulama-2",$1untoldStory: "Beberapa murid terdekat bersaksi bahwa pada malam-malam tertentu sebelum wafatnya, ruang suluk Abah Guru memancarkan aroma kasturi yang sangat kuat hingga tercium ke jalanan Sekumpul, sebuah tanda dari para tamu langit yang tak kasat mata.",\n    facilities:`
);

content = content.replace(
  /id: "wali-1",([\s\S]*?)facilities:/,
  `id: "wali-1",$1untoldStory: "Menurut catatan saudagar Gujarat abad ke-14, Syekh Maulana Malik Ibrahim pernah menyelamatkan sebuah desa dari wabah mematikan hanya dengan membagikan air dari sumur kecil yang didoakannya. Sumur tersebut kini konon berada tersembunyi di bawah fondasi salah satu bangunan tua di sekitar makam.",\n    facilities:`
);

fs.writeFileSync('src/data/sites.ts', content);
console.log('Added untoldStory to some sites');
