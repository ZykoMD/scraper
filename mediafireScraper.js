/**
 * ================================================================
 * 🎁 Scraper: mediafireScraper 
 * 📸 Fitur: ambil file mediafire
 * ================================================================
 *
 * 👨‍💻 Author: Zyko MD Official
 * 🌐 Channel: https://whatsapp.com/channel/0029VaDl8Ig5PO19NKWwik0Z
 * 📸 TikTok: https://tiktok.com/@zyko_store
 * 📷 Instagram: https://instagram.com/zzyko_04
 * ▶ YouTube: https://www.youtube.com/@zykobotzz
 * 
 * 🧠 Catatan:
 * - Dilarang menjual ulang atau menghapus kredit pembuat.
 * - Gunakan untuk pembelajaran dan pengembangan bot.
 * ================================================================
 */




const fetch = require('node-fetch')
const cheerio = require('cheerio')

const mediafireScraper = async (mediafireUrl) => {
  try {
  
    const response = await fetch(mediafireUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    const html = await response.text();

    if (!response.ok) {
      throw new Error(`Request gagal: ${response.status} - ${html}`);
    }

  
    const $ = cheerio.load(html);
    let downloadUrl = null;
    const selectors = [
      'a[href*="download"]',
      '.downloadButton a',
      '#downloadButton a',
      'a.btn-primary',
      'a[href*="mediafire.com/download"]'
    ];

    for (const selector of selectors) {
      const link = $(selector).attr('href');
      if (link) {
        downloadUrl = link.startsWith('http') ? link : 'https://www.mediafire.com' + link;
        break;
      }
    }

  
    if (!downloadUrl) {
  
      $('script').each((i, el) => {
        const scriptText = $(el).html();
        const match = scriptText.match(/https:\/\/download\d+\.mediafire\.com\/[^"']+/);
        if (match) {
          downloadUrl = match[0];
        }
      });
    }

    if (!downloadUrl) {
      throw new Error('Link download tidak ditemukan');
    }

  
    return {
      status: 'success',
      downloadUrl,
      title: $('title').text().trim() || 'Unknown Title'
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message
    };
  }
};
/*
// Contoh penggunaan
(async () => {
    const mediafireUrl = "https://www.mediafire.com/file/pogfofomse4vr7g/ZYKOMDV12-main.zip/file" 
    let result = await mediafireScraper(mediafireUrl);
    console.log(JSON.stringify(result, null, 2));
})();*/
