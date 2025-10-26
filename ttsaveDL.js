/**
 * ================================================================
 * 🎁 Scraper: TiktokDowload
 * 📸 Fitur: Ambil vidio tiktok
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






const axios = require("axios");
const cheerio = require("cheerio");

/**
 * TikTok Downloader via ttsave.app + TikTok oEmbed
 * @param {string} urlTiktok - URL video TikTok
 * @returns {Promise<object>}
 */
async function ttsaveDL(urlTiktok) {
  try {
  
    const meta = await axios.get(`https://www.tiktok.com/oembed?url=${urlTiktok}`, {
      headers: {
        accept: "application/json, text/plain, */*",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
      },
    });

    const oembed = meta.data;

    
    const payload = {
      query: urlTiktok,
      language_id: "2", 
    };

    const res = await axios.post("https://ttsave.app/download", payload, {
      headers: {
        accept: "application/json, text/plain, */*",
        "content-type": "application/json",
        origin: "https://ttsave.app",
        referer: "https://ttsave.app/id/slide",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
      },
    });

    
    const $ = cheerio.load(res.data);

  
    const result = {
      status: true,
      creator: "ZykoBotz",
      title: oembed.title || "-",
      author: oembed.author_name || "-",
      username: oembed.author_unique_id || "-",
      id: oembed.embed_product_id || "-",
      desc: $("div.desc").text().trim() || "-",
      cover: oembed.thumbnail_url || $("a[type='cover']").attr("href") || null,
      profile: $("a[type='profile']").attr("href") || oembed.author_url || null,
      wm: $("a[type='watermark']").attr("href") || null,
      nowm: $("a[type='no-watermark']").attr("href") || null,
      audio: $("a[type='audio']").attr("href") || null,
      hashtag: (oembed.title?.match(/#\w+/g) || []).map((t) => t.replace("#", "")),
      message: "✅ Berhasil ambil video TikTok lengkap",
    };

    return result;
  } catch (err) {
    return {
      status: false,
      creator: "ZykoBotz",
      message:
        err.response?.status === 400
          ? "❌ Link TikTok tidak valid / private / expired"
          : `❌ Gagal ambil data: ${err.message}`,
    };
  }
}

// === TEST ===
/*if (require.main === module) {
  (async () => {
    const link = process.argv[2] || "https://vt.tiktok.com/ZSUEnqexS/";
    const result = await ttsaveDL(link);
    console.log(result);
  })();
}

module.exports = { ttsaveDL };*/
