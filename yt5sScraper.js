/**
 * ================================================================
 * 🎁 Scraper: yt5sScraper
 * 📸 Fitur: Ambil vidio youtube
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

async function yt5sScraper(youtubeUrl, quality = '1080p') {
  try {
    
    const mainPageResponse = await fetch('https://yt5s.rip/id/', {
      method: 'GET',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
        'Accept':
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    
    const cookies = mainPageResponse.headers.get('set-cookie') || '';
    console.log('🍪 Cookies dari halaman utama:', cookies || '(tidak ada)');


    const payload = new URLSearchParams();
    payload.append(
      'id',
      '94sUtLF3QW9YwVlT+6rbPksNpDvFAn2OvdJVkdYilZmUbEYH92ehW+4bV8+cy37Q4OAPwxKFOPwWgTuS93pyvE8rC4rJ0Jl/ex9PegaptfM='
    );
    payload.append('platform', 'youtube');
    payload.append('url', youtubeUrl);
    payload.append('title', youtubeUrl);
    payload.append('ext', 'mp4');
    payload.append('note', quality);
    payload.append('format', '137');

    const convertUrl =
      'https://yt5s.rip/mates/en/convert?id=94sUtLF3QW9YwVlT+6rbPksNpDvFAn2OvdJVkdYilZmUbEYH92ehW+4bV8+cy37Q4OAPwxKFOPwWgTuS93pyvE8rC4rJ0Jl/ex9PegaptfM=';

    
    const res = await fetch(convertUrl, {
      method: 'POST',
      body: payload,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'X-Requested-With': 'XMLHttpRequest',
        'X-Note': quality,
        'Referer': 'https://yt5s.rip/id/',
        'Origin': 'https://yt5s.rip',
        'Cookie': cookies,
      },
    });

    let json;
    try {
      json = await res.json();
    } catch (e) {
      throw new Error('Respon bukan JSON valid.');
    }

    if (json.status === 'success') {
      return {
        success: true,
        downloadUrl: json.downloadUrlX,
        status: json.status,
      };
    } else {
      throw new Error('Gagal mendapatkan data: ' + JSON.stringify(json));
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}
/*
// Contoh penggunaan
const youtubeUrl =
  'https://youtu.be/HWjVXC9XOPY?si=hlmwhHkoJceRlJuE';
const quality = '1080p';

(async () => {
  let res = await yt5sScraper(youtubeUrl, quality);
  console.log('🎬 Hasil:', res);
})();*/



