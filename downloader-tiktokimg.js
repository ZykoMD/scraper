/**
 * TikTok slide downloader Poto TikTok 
 * Created by: Zyko MD Official
 * Year: © 2025
 * 
 * 🔧 Paket yang digunakan::
 *   - axios
 *   - cheerio
 * 
 * 🌐 Official Channel:
 *   https://whatsapp.com/channel/0029VaDl8Ig5PO19NKWwik0Z
 * 
 * 💬 Credits:
 *   "Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
 *    Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
 *    (QS ash-Shaff: 2-3)
 * 
 * 🚀 Contoh penggunaan tersedia di bagian bawah skrip.
 */

const axios = require('axios');
const cheerio = require('cheerio');

async function ttimg(link) {
  try {
    const url = `https://dlpanda.com/?url=${link}&t0ken=b8b6c49aToTA`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const images = [];
    let audio = null;

    $('.col-md-12.col-lg-6 > img').each((i, el) => {
      const img = $(el).attr('src');
      if (img) images.push(img);
    });

    const audioSrc = $('audio source').attr('src');
    if (audioSrc) audio = audioSrc;

    return {
      success: true,
      imageCount: images.length,
      images,
      audio,
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      imageCount: 0,
      images: [],
      audio: null,
      error: e.message,
    };
  }
}
/*
ttimg('https://vt.tiktok.com/ZSUFq6ukd/').then((res) => {
  console.log(res);
});*/