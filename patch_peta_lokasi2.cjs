const fs = require('fs');

let content = fs.readFileSync('src/views/PetaLokasi.tsx', 'utf8');

// Add react-router-dom imports
content = content.replace("import React from 'react';", "import React, { useEffect } from 'react';\nimport { useParams, useNavigate } from 'react-router-dom';");

// Inside PetaLokasi, use params
content = content.replace("export const PetaLokasi: React.FC<PetaLokasiProps> = ({ selectedSite, setSelectedSite, savedSiteIds, handleToggleSave, savedDoas, onToggleSaveDoa, onOpenKontribusi }) => {", "export const PetaLokasi: React.FC<PetaLokasiProps> = ({ selectedSite, setSelectedSite, savedSiteIds, handleToggleSave, savedDoas, onToggleSaveDoa, onOpenKontribusi }) => {\n  const { id } = useParams();\n  const navigate = useNavigate();\n\n  useEffect(() => {\n    if (id) {\n      const found = ziarahSites.find(s => s.id === id);\n      if (found) setSelectedSite(found);\n    } else {\n      setSelectedSite(null);\n    }\n  }, [id, setSelectedSite]);\n\n  const handleClose = () => {\n    setSelectedSite(null);\n    navigate('/peta');\n  };\n\n  const handleMapSelect = (site) => {\n    setSelectedSite(site);\n    if (site) {\n      navigate(`/makam/${site.id}`);\n    } else {\n      navigate('/peta');\n    }\n  };\n");

content = content.replace(
  "onSelectSite={setSelectedSite}",
  "onSelectSite={handleMapSelect}"
);

content = content.replace(
  "onClose={() => setSelectedSite(null)}",
  "onClose={handleClose}"
);
content = content.replace(
  "onClick={() => setSelectedSite(null)}",
  "onClick={handleClose}"
);

fs.writeFileSync('src/views/PetaLokasi.tsx', content);
console.log('PetaLokasi routing updated');
