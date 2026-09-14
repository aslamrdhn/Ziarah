const fs = require('fs');

let content = fs.readFileSync('src/data/sites.ts', 'utf8');

const updates = {
  "habib-1": "https://upload.wikimedia.org/wikipedia/commons/5/58/Masjid_Alhidayah_Kwitang_-_panoramio.jpg",
  "ulama-2": "https://upload.wikimedia.org/wikipedia/commons/e/e6/Jemaah_Haul_ke-15_Guru_Sekumpul_2.jpg",
  "ulama-3": "https://upload.wikimedia.org/wikipedia/commons/f/f0/Academic_activity_center_of_Syiah_Kuala_University.jpg",
  "ulama-4": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Masjid_Syekh_Muhammad_Yusuf_20220626_151617.jpg"
};

for (const [id, url] of Object.entries(updates)) {
  const regex = new RegExp(`(id:\\s*"${id}"[\\s\\S]*?imageUrl:\\s*)"([^"]+)"`);
  content = content.replace(regex, `$1"${url}?width=800"`);
}

fs.writeFileSync('src/data/sites.ts', content);
console.log('Patched remaining missing images');
