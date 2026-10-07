const fs = require('fs');
let content = fs.readFileSync('src/views/KumpulanDoa.tsx', 'utf8');

const disclaimerHTML = `
      <div className="bg-stone-50 rounded-2xl p-4 md:p-5 mb-8 border border-stone-200">
        <p className="text-xs md:text-sm text-stone-500 leading-relaxed text-center">
          <strong>Disclaimer (Peringatan):</strong> Teks bacaan, doa, dan tata cara ziarah yang ditampilkan dalam aplikasi ini bersumber dari referensi umum. Jika terdapat perbedaan pendapat (khilafiyah) atau pelafalan, harap merujuk pada guru atau ulama masing-masing.
        </p>
      </div>
`;

content = content.replace(
  /<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pb-20">/,
  `<div className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-10 pb-20">\n${disclaimerHTML}`
);

fs.writeFileSync('src/views/KumpulanDoa.tsx', content);
console.log('Fixed KumpulanDoa disclaimer');
