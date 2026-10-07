const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Replace updateDoc with setDoc(..., { merge: true }) to prevent race condition
content = content.replace(
  /await updateDoc\(userRef, \{\n\s*savedSiteIds: savedSiteIds,\n\s*savedDoas: savedDoas,\n\s*updatedAt: serverTimestamp\(\)\n\s*\}\);/g,
  `// Use setDoc with merge instead of updateDoc to handle race conditions where doc doesn't exist yet
          await setDoc(userRef, {
            userId: user.uid,
            savedSiteIds: savedSiteIds,
            savedDoas: savedDoas,
            updatedAt: serverTimestamp()
          }, { merge: true });`
);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed App.tsx race condition');
