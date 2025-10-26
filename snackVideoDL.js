/**
 * ================================================================
 * 🎁 Scraper: snackVideoDL
 * 📸 Fitur: Ambil vidio snackVidio
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
const qs = require("qs");


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

async function snackVideoDL(urlVideo) {
  try {
    const data = qs.stringify({
      "ic-request": "true",
      id: urlVideo,
      locale: "id",
      "ic-element-id": "main_page_form",
      "ic-id": "1",
      "ic-target-id": "active_container",
      "ic-trigger-id": "main_page_form",
      "ic-current-url": "/id",
      "ic-select-from-response": "#id1",
      _method: "POST",
    });

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
      Origin: "https://getsnackvideo.com",
      Referer: "https://getsnackvideo.com/id",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    };

    const res = await axios.post("https://getsnackvideo.com/results", data, {
      headers,
    });

    const $ = cheerio.load(res.data);

    const thumbB64 = $(".img_thumb img").attr("src") || null;
    const decodedThumb = thumbB64
      ? secureLink(decodeBase64Url(thumbB64.split("/p/")[1]))
      : null;

    const rows = [];
    $(".table-result tbody tr").each((_, el) => {
      const source = $(el).find("td:first").text().trim();
      const href = $(el).find("a").attr("href");
      if (href) {
        const base64part = href.split("/getsnackvideo/")[1];
        const decodedLink = secureLink(decodeBase64Url(base64part));
        rows.push({ source, link: decodedLink });
      }
    });

    return {
      status: true,
      creator: "ZykoBotz",
      thumb: decodedThumb,
      results: rows,
    };
  } catch (err) {
    return {
      status: false,
      creator: "ZykoBotz",
      message: err.message,
    };
  }
}

/*
(async () => {
  const link = process.argv[2] || "https://s.snackvideo.com/p/osE5jHpE";
  const result = await snackVideoDL(link);
  console.log(result);
})();
*/