const https = require('https');

async function searchWiki(query) {
  return new Promise(resolve => {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&gsrlimit=1`;
    https.get(url, { headers: { 'User-Agent': 'NodeJS Wiki script' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          resolve(`${query}: ${pages[pageId].imageinfo[0].url}`);
        } catch(e) { resolve(`${query}: Not Found`); }
      });
    });
  });
}

async function run() {
  const queries = [
    'Makam Sunan Gresik',
    'Masjid Sunan Ampel',
    'Makam Sunan Bonang',
    'Makam Sunan Drajat',
    'Masjid Menara Kudus',
    'Makam Sunan Giri',
    'Masjid Agung Demak',
    'Makam Sunan Muria',
    'Makam Sunan Gunung Jati',
    'Makam Syekh Kholil Bangkalan',
    'Makam Habib Ali Al Habsyi Solo',
    'Makam Mbah Priok',
    'Makam Syekh Maulana Yusuf',
    'Makam Sunan Bayat',
    'Makam Syekh Nawawi Banten',
    'Makam Habib Kwitang',
    'Makam Luar Batang'
  ];
  for (const q of queries) {
    console.log(await searchWiki(q));
  }
}
run();
