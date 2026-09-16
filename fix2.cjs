const fs = require('fs');
let content = fs.readFileSync('src/views/PetaLokasi.tsx', 'utf8');
content = content.replace("          </div>              )}", "          </div>        </>      )}");
fs.writeFileSync('src/views/PetaLokasi.tsx', content);
