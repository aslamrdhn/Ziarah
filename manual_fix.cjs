const fs = require('fs');

function addCloseFragment(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('return (<>')) {
    // Find the last return statement of the component
    // It's usually `    </div>\n  );\n};` or similar. Let's just find `  );\n};` and replace the FIRST one.
    // wait, we can just replace `return (<>` with `return (\n<React.Fragment>` and find `  );\n};` and replace with `\n</React.Fragment>\n  );\n};`
    // but the regex didn't match.
    // Let's just restore original files and do it right.
  }
}

let pt = fs.readFileSync('src/views/PetaLokasi.tsx', 'utf8');
pt = pt.replace('return (<>', 'return (\n<React.Fragment>');
pt = pt.replace(/    <\/div>\n  \);\n\};/, '    </div>\n</React.Fragment>\n  );\n};');
pt = pt.replace(/    \n    <\/>\n  \);\n};/, '  );\n};'); // clean up previous bad fix
fs.writeFileSync('src/views/PetaLokasi.tsx', pt);

let df = fs.readFileSync('src/views/DaftarMakam.tsx', 'utf8');
df = df.replace('return (<>', 'return (\n<React.Fragment>');
df = df.replace(/    <\/div>\n  \);\n\}\);/, '    </div>\n</React.Fragment>\n  );\n});');
df = df.replace(/    \n    <\/>\n  \);\n}\);/, '  );\n});');
fs.writeFileSync('src/views/DaftarMakam.tsx', df);

let bc = fs.readFileSync('src/views/BacaanZiarah.tsx', 'utf8');
bc = bc.replace('return (<>', 'return (\n<React.Fragment>');
bc = bc.replace(/    <\/div>\n  \);\n\};/, '    </div>\n</React.Fragment>\n  );\n};');
bc = bc.replace(/    \n    <\/>\n  \);\n\};/, '  );\n};');
fs.writeFileSync('src/views/BacaanZiarah.tsx', bc);

let kd = fs.readFileSync('src/views/KumpulanDoa.tsx', 'utf8');
kd = kd.replace('return (<>', 'return (\n<React.Fragment>');
kd = kd.replace(/    <\/div>\n  \);\n\};/, '    </div>\n</React.Fragment>\n  );\n};');
kd = kd.replace(/    \n    <\/>\n  \);\n\};/, '  );\n};');
fs.writeFileSync('src/views/KumpulanDoa.tsx', kd);

console.log("Fixed manually");
