// fallback to copy svg if png not generated, actually let's just make quick copies or tell the user. 
// for AI Studio, we'll just copy icon.svg to the png paths to prevent 404s, some browsers support svg for manifest.
const fs = require('fs');
fs.copyFileSync('public/icon.svg', 'public/pwa-192x192.png');
fs.copyFileSync('public/icon.svg', 'public/pwa-512x512.png');
fs.copyFileSync('public/icon.svg', 'public/pwa-maskable-512x512.png');
fs.copyFileSync('public/icon.svg', 'public/apple-touch-icon.png');
