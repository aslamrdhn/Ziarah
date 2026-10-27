import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const initCwd = process.env.INIT_CWD ? path.resolve(process.env.INIT_CWD) : cwd;
const rootDist = path.resolve(cwd, 'dist');

if (!fs.existsSync(rootDist)) {
  console.error('[postbuild] Error: dist directory was not generated at', rootDist);
  process.exit(1);
}

console.log('[postbuild] Verified dist directory at:', rootDist);

// If Vercel invoked the build from a subdirectory (Root Directory setting),
// mirror the built dist folder there so @vercel/static-build always finds it.
if (process.env.VERCEL || initCwd !== cwd) {
  const candidateDirs = new Set([
    path.join(initCwd, 'dist'),
    path.join(cwd, 'src', 'dist'),
    path.join(cwd, 'public', 'dist'),
  ]);

  for (const targetDist of candidateDirs) {
    if (path.resolve(targetDist) !== rootDist) {
      try {
        fs.mkdirSync(path.dirname(targetDist), { recursive: true });
        fs.cpSync(rootDist, targetDist, { recursive: true, force: true });
        console.log('[postbuild] Mirrored dist to:', targetDist);
      } catch (err) {
        console.warn('[postbuild] Skipped mirroring to', targetDist, err?.message);
      }
    }
  }
}
