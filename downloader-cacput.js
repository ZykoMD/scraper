/**
 * ================================================================
 * 🎁 Scraper: downloadCapcut
 * 📸 Fitur: Ambil vidio capcut
 * ================================================================
 * 🧠 Catatan:
 * - Dilarang menjual ulang atau menghapus kredit pembuat.
 * - Gunakan untuk pembelajaran dan pengembangan bot.
 * ================================================================
 */
/*
FITUR : PLUGINS 
FITUR : downloadCapcut
TYPE : CommonJS

Di Buat : Zyko MD
©Zyko MD 2025

 * 📸 TikTok: https://tiktok.com/@zyko_store
 * 📷 Instagram: https://instagram.com/zzyko_04
 * ▶ YouTube: https://www.youtube.com/@zykobotzz
 
 
Jangan di hapus creatornya kack
Saya capek ngetik kode 

"Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
(QS ash-Shaff: 2-3).
*/



const axios = require("axios");
const qs = require("qs");
const cheerio = require("cheerio");

function decodeBase64Url(b64) {
  try {
    return Buffer.from(b64, "base64").toString("utf-8");
  } catch {
    return b64;
  }
}

function secureLink(url) {
  return url ? url.replace(/^http:/, "https:") : url;
}

async function capcutDL(urlCapcut) {
  try {
    const res = await axios.post(
      "https://3bic.com/api/download",
      { url: urlCapcut },
      {
        headers: {
          "accept": "application/json, text/plain, */*",
          "content-type": "application/json",
          "origin": "https://3bic.com",
          "referer": "https://3bic.com/id",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
        },
      }
    );

    const data = res.data;
    let videoUrl = data.originalVideoUrl || data.videoUrl;

    
    if (videoUrl && videoUrl.startsWith("/getcapcut/")) {
      const part = videoUrl.split("/getcapcut/")[1];
      videoUrl = decodeBase64Url(part);
    }

    
    if (videoUrl && !/^https?:\/\//i.test(videoUrl)) {
      videoUrl = `https://3bic.com${videoUrl}`;
    }

    const directUrl = secureLink(videoUrl);

    return {
      status: true,
      creator: "ZykoBotz",
      title: data.title || "-",
      author: data.authorName || "-",
      thumb: data.coverUrl || null,
      video: directUrl,
      message: "Success",
    };
  } catch (err) {
    return {
      status: false,
      creator: "ZykoBotz",
      message:
        err.response?.status === 400
          ? "❌ Gagal, link CapCut tidak valid atau expired"
          : err.message,
    };
  }
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(
      `🚩 *Contoh:* ${usedPrefix + command} https://www.capcut.com/tv2/ZSUEx6GfW/`
    );
  }

  if (!text.includes("capcut.com")) {
    return m.reply("🚩 URL tidak valid, harus link dari CapCut!");
  }

  await m.reply("_⏳ Sedang mengunduh video CapCut..._");

  try {
    let result = await capcutDL(text);

    if (!result.status || !result.video) {
      return m.reply("🚩 Video tidak ditemukan atau link rusak.");
    }

    const caption = `
👤 Author: ${result.author}
📦 Source: CapCut
🎬Title: ${result.title}
`;

    await conn.sendMessage(
      m.chat,
      {
        video: { url: result.video },
        caption,
      },
      { quoted: m }
    );
  } catch (e) {
    console.error(e);
    m.reply("🚩 Terjadi kesalahan saat memproses permintaan.");
  }
};

handler.help = ['capcut'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^capcut|capcutdl$/i;
handler.register = true;
handler.limitbts = true;

module.exports = handler;
