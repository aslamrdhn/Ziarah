const https = require('https');

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/Ampel_Mosque_in_2008.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/52/Masjid_Agung_Tuban_Front_View.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1c/Makam_Sunan_Drajat_Lamongan.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e6/Masjid_Menara_Kudus_Tampak_Depan.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4c/Makam_Sunan_Giri_Gapura_Undakan_Pertama.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/41/Sisi_Depan_Serambi_Masjid_Agung_Demak_Kab.Demak_Prop.Jateng_Indonesia.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3d/Sanctuary_of_Sunan_Gunung_Jati.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/ed/Tomb_of_Maulana_Malik_Ibrahim.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Sunan_Muria.jpg/800px-Sunan_Muria.jpg"
];

async function check(url) {
  return new Promise(resolve => {
    https.get(url, res => {
      resolve(`${res.statusCode} : ${url}`);
    }).on('error', () => resolve(`ERR : ${url}`));
  });
}
async function run() {
  for(let u of urls) console.log(await check(u));
}
run();
