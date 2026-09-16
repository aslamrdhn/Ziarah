const fs = require('fs');

// Fix TransactionModal
let tx = fs.readFileSync('src/components/TransactionModal.tsx', 'utf8');
tx = tx.replace('CreditCard,', '');
tx = tx.replace('Upload,', '');
fs.writeFileSync('src/components/TransactionModal.tsx', tx);

// Fix MakamDetailView
let md = fs.readFileSync('src/views/MakamDetailView.tsx', 'utf8');
md = md.replace("import { ziarahSites } from '../data/sites';", "import { ziarahSites, ZiarahSite } from '../data/sites';");
fs.writeFileSync('src/views/MakamDetailView.tsx', md);

console.log("Types fixed again.");
