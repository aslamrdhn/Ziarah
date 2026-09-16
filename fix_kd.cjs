const fs = require('fs');
let kd = fs.readFileSync('src/views/KumpulanDoa.tsx', 'utf8');

kd = kd.replace(/                      \)}\n                    \n                  \) : \(/, '                      )}\n                    </>\n                  ) : (');

fs.writeFileSync('src/views/KumpulanDoa.tsx', kd);
console.log("Fixed kd");
