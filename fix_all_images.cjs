const https = require('https');
const fs = require('fs');

async function searchImage(query) {
  return new Promise((resolve) => {
    // Search commons
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url`;
    https.get(url, { headers: { 'User-Agent': 'NodeJS Script Image Fetcher' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = json.query.pages;
            const pageId = Object.keys(pages)[0];
            if (pages[pageId].imageinfo && pages[pageId].imageinfo[0].url) {
              resolve(pages[pageId].imageinfo[0].url);
              return;
            }
          }
          resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

const siteQueries = {
  "wali-1": "Makam Maulana Malik Ibrahim Gresik",
  "wali-2": "Masjid Sunan Ampel",
  "wali-3": "Masjid Agung Tuban",
  "wali-4": "Makam Sunan Drajat Lamongan",
  "wali-5": "Masjid Menara Kudus",
  "wali-6": "Makam Sunan Giri",
  "wali-7": "Masjid Agung Demak",
  "wali-8": "Makam Sunan Muria",
  "wali-9": "Makam Sunan Gunung Jati Cirebon",
  "ulama-1": "Makam Gus Dur Tebuireng",
  "habib-1": "Masjid Kwitang Jakarta",
  "ulama-2": "Masjid Ar-Raudhah Sekumpul Martapura",
  "ulama-3": "Makam Syiah Kuala Aceh",
  "ulama-4": "Makam Syekh Yusuf Makassar"
};

// Fallbacks if search fails
const fallbacks = {
  "ulama-1": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Makam_Gus_Dur.jpg",
  "ulama-2": "https://upload.wikimedia.org/wikipedia/commons/9/93/Masjid_Ar-Raudhah_Sekumpul.jpg",
  "habib-1": "https://upload.wikimedia.org/wikipedia/commons/c/c5/Majelis_Taklim_Al_Habib_Ali_Alhabsyi_Kwitang.jpg",
  "ulama-3": "https://upload.wikimedia.org/wikipedia/commons/2/23/Makam_Syiah_Kuala_di_Banda_Aceh.jpg",
  "ulama-4": "https://upload.wikimedia.org/wikipedia/commons/9/91/Makam_Syekh_Yusuf_Tajul_Khalwati_di_Gowa.jpg",
  "wali-1": "https://upload.wikimedia.org/wikipedia/commons/e/ed/Tomb_of_Maulana_Malik_Ibrahim.jpg",
  "wali-8": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Sunan_Muria.jpg/800px-Sunan_Muria.jpg",
  "wali-9": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Sanctuary_of_Sunan_Gunung_Jati.jpg"
};

const workingDefaults = {
  "default": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Great_Mosque_of_Banten_1.jpg/800px-Great_Mosque_of_Banten_1.jpg"
};

async function run() {
  let content = fs.readFileSync('src/data/sites.ts', 'utf8');

  for (const [id, query] of Object.entries(siteQueries)) {
    let url = await searchImage(query);
    console.log(`Search: ${query} => ${url ? url.substring(0, 60) : 'null'}`);
    
    if (!url) {
        url = fallbacks[id] || workingDefaults["default"];
    }

    // append query string for width if not present
    if (url && !url.includes('?')) {
        url += "?width=800";
    }

    const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?imageUrl:\\s*)"([^"]+)"`);
    content = content.replace(regex, `$1"${url}"`);
  }

  fs.writeFileSync('src/data/sites.ts', content);
  console.log('Fixed URLs in sites.ts');
}

run();
