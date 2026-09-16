const fs = require('fs');

let content = fs.readFileSync('src/components/TransactionModal.tsx', 'utf8');

const targetStr = `<button \n                    onClick={() => {\n                      if (onSuccess) onSuccess();\n                      else handleClose();\n                    }} \n                    className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold transition-all shadow-sm"\n                  >\n                    Simulasikan Bayar Berhasil\n                  </button>`;

content = content.replace(targetStr, 
  `<div className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-center">
    <p className="text-sm font-bold text-stone-800">Preview Mode</p>
    <p className="text-xs text-stone-500 mt-1">Sistem pembayaran belum tersedia.</p>
  </div>`
);

// wait, the whitespace might be different, let me just replace "Simulasikan Bayar Berhasil" directly
content = content.replace(/<button[\s\S]*?>\s*Simulasikan Bayar Berhasil\s*<\/button>/g, 
  `<div className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-center">\n    <p className="text-sm font-bold text-stone-800">Preview Mode</p>\n    <p className="text-xs text-stone-500 mt-1">Sistem pembayaran belum tersedia.</p>\n  </div>`
);

fs.writeFileSync('src/components/TransactionModal.tsx', content);
console.log('Fixed TransactionModal');
