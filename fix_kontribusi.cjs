const fs = require('fs');

let content = fs.readFileSync('src/components/KontribusiModal.tsx', 'utf8');

// Replace the form tag
content = content.replace(
  /<form className="space-y-6" onSubmit=\{\(e\) => \{ e\.preventDefault\(\); onClose\(\); \}\}>/,
  `<div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-6">
    <p className="text-sm font-bold text-stone-900">Preview Mode</p>
    <p className="text-xs text-stone-500 mt-1">Formulir kontribusi belum aktif karena membutuhkan konfigurasi endpoint koleksi Firestore tambahan untuk fitur kurasi komunitas.</p>
  </div>\n<form className="space-y-6" onSubmit={(e) => { e.preventDefault(); }}>`
);

// Replace the submit button
content = content.replace(
  /<button type="submit" className="px-6 py-2\.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-colors shadow-sm flex items-center">/,
  `<button type="button" disabled className="px-6 py-2.5 text-sm font-bold text-white bg-stone-400 rounded-xl flex items-center cursor-not-allowed">`
);

fs.writeFileSync('src/components/KontribusiModal.tsx', content);
console.log('Fixed KontribusiModal');
