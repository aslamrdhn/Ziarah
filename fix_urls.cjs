const https = require('https');
const fs = require('fs');

const files = [
  "File:Makam_Maulana_Malik_Ibrahim.jpg",
  "File:Ampel_Mosque_in_2008.jpg",
  "File:Masjid_Agung_Tuban.jpg",
  "File:Makam_Sunan_Drajat_Lamongan.jpg",
  "File:Masjid_Menara_Kudus_Tampak_Depan.jpg",
  "File:Makam_Sunan_Giri_Gapura_Undakan_Pertama.jpg",
  "File:Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg",
  "File:Sunan_Muria.jpg",
  "File:Sanctuary_of_Sunan_Gunung_Jati.jpg",
  "File:Makam_Gus_Dur.jpg",
  "File:Masjid_Kwitang.jpg",
  "File:Masjid_Ar-Raudhah_Sekumpul.jpg",
  "File:Makam_Syiah_Kuala.jpg",
  "File:Makam_Syekh_Yusuf.jpg"
];

async function getImageUrl(filename) {
  return new Promise((resolve) => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'NodeJS Script' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].imageinfo && pages[pageId].imageinfo[0].url) {
            resolve(pages[pageId].imageinfo[0].url);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    });
  });
}

async function run() {
  const urlMap = {};
  for (const file of files) {
    const url = await getImageUrl(file);
    console.log(file, "=>", url);
    urlMap[file] = url;
  }

  // Update sites.ts
  let content = fs.readFileSync('src/data/sites.ts', 'utf8');

  const replacements = {
    "wali-1": urlMap["File:Makam_Maulana_Malik_Ibrahim.jpg"] || "https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?q=80&w=600&auto=format&fit=crop",
    "wali-2": urlMap["File:Ampel_Mosque_in_2008.jpg"] || "https://images.unsplash.com/photo-1584824486509-112e4181f1ce?q=80&w=600&auto=format&fit=crop",
    "wali-3": urlMap["File:Masjid_Agung_Tuban.jpg"] || "https://images.unsplash.com/photo-1628863353596-3f191f4229bb?q=80&w=600&auto=format&fit=crop",
    "wali-4": urlMap["File:Makam_Sunan_Drajat_Lamongan.jpg"] || "https://images.unsplash.com/photo-1560961817-270830dbb126?q=80&w=600&auto=format&fit=crop",
    "wali-5": urlMap["File:Masjid_Menara_Kudus_Tampak_Depan.jpg"] || "https://images.unsplash.com/photo-1542125167-33d3c8a9134f?q=80&w=600&auto=format&fit=crop",
    "wali-6": urlMap["File:Makam_Sunan_Giri_Gapura_Undakan_Pertama.jpg"] || "https://images.unsplash.com/photo-1596773210332-9c3dbf9b7cbf?q=80&w=600&auto=format&fit=crop",
    "wali-7": urlMap["File:Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg"] || "https://images.unsplash.com/photo-1533054179373-8b7bc9a022f6?q=80&w=600&auto=format&fit=crop",
    "wali-8": urlMap["File:Sunan_Muria.jpg"] || "https://images.unsplash.com/photo-1582299106060-7058be5b072c?q=80&w=600&auto=format&fit=crop",
    "wali-9": urlMap["File:Sanctuary_of_Sunan_Gunung_Jati.jpg"] || "https://images.unsplash.com/photo-1605374431526-cb17a54a01c4?q=80&w=600&auto=format&fit=crop",
    "ulama-1": urlMap["File:Makam_Gus_Dur.jpg"] || "https://images.unsplash.com/photo-1596773210332-9c3dbf9b7cbf?q=80&w=600&auto=format&fit=crop",
    "habib-1": urlMap["File:Masjid_Kwitang.jpg"] || "https://images.unsplash.com/photo-1542125167-33d3c8a9134f?q=80&w=600&auto=format&fit=crop",
    "ulama-2": urlMap["File:Masjid_Ar-Raudhah_Sekumpul.jpg"] || "https://images.unsplash.com/photo-1582299106060-7058be5b072c?q=80&w=600&auto=format&fit=crop"
  };

  for (const [id, url] of Object.entries(replacements)) {
    const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?imageUrl:\\s*)"([^"]+)"`);
    content = content.replace(regex, `$1"${url}"`);
  }

  fs.writeFileSync('src/data/sites.ts', content);
  console.log('Fixed URLs in sites.ts');
}

run();
