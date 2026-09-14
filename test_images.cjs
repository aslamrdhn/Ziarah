const https = require('https');

async function searchImage(query) {
  return new Promise((resolve) => {
    // Search commons
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=5&prop=imageinfo&iiprop=url`;
    https.get(url, { headers: { 'User-Agent': 'NodeJS Script' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = json.query.pages;
            const results = Object.values(pages).map(p => p.imageinfo?.[0]?.url).filter(Boolean);
            resolve(results);
          } else {
            resolve([]);
          }
        } catch (e) {
          resolve([]);
        }
      });
    });
  });
}

async function run() {
  console.log("Kwitang:", await searchImage("Kwitang"));
  console.log("Sekumpul:", await searchImage("Sekumpul"));
  console.log("Syiah Kuala:", await searchImage("Syiah Kuala"));
  console.log("Syekh Yusuf:", await searchImage("Syekh Yusuf"));
}
run();
