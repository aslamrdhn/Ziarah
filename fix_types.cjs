const fs = require('fs');

// Fix TransactionModal
let tx = fs.readFileSync('src/components/TransactionModal.tsx', 'utf8');
tx = tx.replace('import { X, CheckCircle, AlertCircle, CreditCard, Wallet, Upload, Copy } from "lucide-react";', 'import { X, CheckCircle, AlertCircle, Wallet, Copy } from "lucide-react";');
tx = tx.replace("import { motion, AnimatePresence } from 'motion/react';", "import { motion } from 'motion/react';");
fs.writeFileSync('src/components/TransactionModal.tsx', tx);

// Fix MakamDetailView
let md = fs.readFileSync('src/views/MakamDetailView.tsx', 'utf8');
md = md.replace("import React, { useEffect, useState } from 'react';", "import { useEffect, useState } from 'react';");
md = md.replace("export const MakamDetailView = ({ savedDoas, onToggleSaveDoa, onToggleSave, savedSiteIds }) => {", `export const MakamDetailView = ({ savedDoas, onToggleSaveDoa, onToggleSave, savedSiteIds }: { savedDoas: string[], onToggleSaveDoa: (id: string) => void, onToggleSave: (id: string) => void, savedSiteIds: string[] }) => {`);
md = md.replace("const [site, setSite] = useState(null);", "const [site, setSite] = useState<SiteDetails | null>(null);"); // wait, type is ZiarahSite
md = md.replace("const [site, setSite] = useState<SiteDetails | null>(null);", "const [site, setSite] = useState<ZiarahSite | null>(null);");
// Let's just fix it completely using regex
fs.writeFileSync('src/views/MakamDetailView.tsx', md);

// Fix PetaLokasi
let pl = fs.readFileSync('src/views/PetaLokasi.tsx', 'utf8');
pl = pl.replace("const handleMapSelect = (site) => {", "const handleMapSelect = (site: ZiarahSite | null) => {");
fs.writeFileSync('src/views/PetaLokasi.tsx', pl);

console.log("Types fixed.");
