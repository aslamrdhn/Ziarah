const fs = require('fs');

let content = fs.readFileSync('src/data/sites.ts', 'utf8');

const replacements = {
  "wali-1": "https://commons.wikimedia.org/wiki/Special:FilePath/Makam_Maulana_Malik_Ibrahim.jpg?width=800",
  "wali-2": "https://commons.wikimedia.org/wiki/Special:FilePath/Ampel_Mosque_in_2008.jpg?width=800",
  "wali-3": "https://commons.wikimedia.org/wiki/Special:FilePath/Masjid_Agung_Tuban.jpg?width=800",
  "wali-4": "https://commons.wikimedia.org/wiki/Special:FilePath/Makam_Sunan_Drajat_Lamongan.jpg?width=800",
  "wali-5": "https://commons.wikimedia.org/wiki/Special:FilePath/Masjid_Menara_Kudus.jpg?width=800",
  "wali-6": "https://commons.wikimedia.org/wiki/Special:FilePath/Makam_Sunan_Giri_Gapura_Undakan_Pertama.jpg?width=800",
  "wali-7": "https://commons.wikimedia.org/wiki/Special:FilePath/Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg?width=800",
  "wali-8": "https://commons.wikimedia.org/wiki/Special:FilePath/Makam_Sunan_Muria.jpg?width=800",
  "wali-9": "https://commons.wikimedia.org/wiki/Special:FilePath/Sanctuary_of_Sunan_Gunung_Jati.jpg?width=800",
  "ulama-1": "https://commons.wikimedia.org/wiki/Special:FilePath/Makam_Gus_Dur.jpg?width=800",
  "habib-1": "https://commons.wikimedia.org/wiki/Special:FilePath/Masjid_Kwitang.jpg?width=800",
  "ulama-2": "https://commons.wikimedia.org/wiki/Special:FilePath/Masjid_Ar-Raudhah_Sekumpul.jpg?width=800"
};

for (const [id, url] of Object.entries(replacements)) {
  const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?imageUrl:\\s*)"([^"]+)"`);
  content = content.replace(regex, `$1"${url}"`);
}

fs.writeFileSync('src/data/sites.ts', content);
console.log('Images updated successfully');
