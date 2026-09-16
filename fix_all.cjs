const fs = require('fs');

// KumpulanDoa
let kd = fs.readFileSync('src/views/KumpulanDoa.tsx', 'utf8');
kd = kd.replace(')}                                      ) : (', ')}                    </>\n                  ) : (');
fs.writeFileSync('src/views/KumpulanDoa.tsx', kd);

// BacaanZiarah
let bz = fs.readFileSync('src/views/BacaanZiarah.tsx', 'utf8');
bz = bz.replace('              )}                      )}        </div>      </motion.div>    </div>  );};', '              )}\n            </div>\n          )}\n        </div>\n      </motion.div>\n    </div>\n  );\n};');
fs.writeFileSync('src/views/BacaanZiarah.tsx', bz);

console.log("Fixed JSX");
