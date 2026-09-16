const fs = require('fs');
let pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

pkg.name = "ziarah-nusantara";
pkg.version = "1.0.0";

delete pkg.dependencies['@react-three/drei'];
delete pkg.dependencies['@react-three/fiber'];
delete pkg.dependencies['three'];
delete pkg.dependencies['vite'];

pkg.devDependencies['@types/react'] = "^19.3.0"; // match react-dom version roughly or whatever is latest for 19

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log("package.json patched");
