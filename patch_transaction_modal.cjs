const fs = require('fs');
let content = fs.readFileSync('src/components/TransactionModal.tsx', 'utf8');

// Update Props
content = content.replace(
  "type: 'infaq' | 'badal';",
  "type: 'infaq' | 'badal' | 'untold';\n  onSuccess?: () => void;"
);

// Add Lock to lucide imports
content = content.replace(
  "CreditCard, Heart, Upload } from 'lucide-react';",
  "CreditCard, Heart, Upload, Lock, Unlock } from 'lucide-react';"
);

// Add onSuccess to component params
content = content.replace(
  "export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, site, type }) => {",
  "export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, site, type, onSuccess }) => {"
);

// Add Untold headers
content = content.replace(
  "type === 'infaq' ? 'bg-brand-600' : 'bg-gold-600'",
  "type === 'infaq' ? 'bg-brand-600' : type === 'untold' ? 'bg-purple-600' : 'bg-gold-600'"
);
content = content.replace(
  "{type === 'infaq' ? <Heart className=\"w-6 h-6\" /> : <ShoppingBag className=\"w-6 h-6\" />}",
  "{type === 'infaq' ? <Heart className=\"w-6 h-6\" /> : type === 'untold' ? <Lock className=\"w-6 h-6\" /> : <ShoppingBag className=\"w-6 h-6\" />}"
);
content = content.replace(
  "{type === 'infaq' ? 'Infaq Digital' : 'Pesan Badal Ziarah'}",
  "{type === 'infaq' ? 'Infaq Digital' : type === 'untold' ? 'Buka Untold Story' : 'Pesan Badal Ziarah'}"
);
content = content.replace(
  "{type === 'infaq' ? `Sedekah untuk pemeliharaan ${site.name}` : `Wakilkan ziarah ke ${site.name}`}",
  "{type === 'infaq' ? `Sedekah untuk pemeliharaan ${site.name}` : type === 'untold' ? `Buka kisah rahasia ${site.name}` : `Wakilkan ziarah ke ${site.name}`}"
);

// Add Untold content section
const untoldContent = `
          {type === 'untold' && (
            <div className="space-y-6">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                  <div className="bg-purple-50 p-6 rounded-2xl border border-purple-200">
                    <Unlock className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-bold text-stone-900 mb-1">Akses Seumur Hidup</h3>
                    <p className="text-sm text-stone-600">Buka akses kisah eksklusif ini selamanya di perangkat Anda.</p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500 mb-1">Total Pembayaran</p>
                    <p className="font-bold text-purple-700 text-3xl">Rp 15.000</p>
                  </div>
                  <button onClick={() => setStep(2)} className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center">
                    Bayar Sekarang <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col items-center">
                    <QrCode className="w-32 h-32 text-stone-800 mb-4" />
                    <p className="text-sm text-stone-500 mb-1">Scan dengan aplikasi e-Wallet / M-Banking</p>
                    <p className="font-bold text-purple-700 text-xl">Rp 15.000</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (onSuccess) onSuccess();
                      else handleClose();
                    }} 
                    className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold transition-all shadow-sm"
                  >
                    Simulasikan Bayar Berhasil
                  </button>
                </motion.div>
              )}
            </div>
          )}
`;

content = content.replace(
  /(\s*\{type === 'badal' && \([\s\S]*?<\/div>\s*\)\s*\})/,
  `\n${untoldContent}$1`
);

fs.writeFileSync('src/components/TransactionModal.tsx', content);
console.log('TransactionModal patched');
