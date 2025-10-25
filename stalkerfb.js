/**
 * ================================================================
 * 🎬 Scraper: stalkerfb
 * ================================================================
 *
 * 👨‍💻 Author: Zyko MD Official
 * 🌐 Channel: https://whatsapp.com/channel/0029VaDl8Ig5PO19NKWwik0Z
 * 📸 TikTok: https://tiktok.com/@zyko_store
 * 📷 Instagram: https://instagram.com/zzyko_04
 * ▶️ YouTube: https://www.youtube.com/@zykobotzz
 *
 * 🧠 Catatan:
 * - Dilarang menjual ulang atau menghapus kredit pembuat.
 * - Silakan gunakan untuk pembelajaran dan pengembangan bot.
 * ================================================================
 */
 
 
 
 
const axios = require("axios");


async function scrapeFacebookPage(input) {
  try {
  
    const link = input.startsWith("http")
      ? input
      : `https://www.facebook.com/${input}`;

    const url = "https://storyviewer.ai/api/v1/facebook/page-detail";

    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      origin: "https://storyviewer.ai",
      referer: "https://storyviewer.ai/facebook-story-viewer",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
    };

    const payload = { page_id: "", link };

    const { data } = await axios.post(url, payload, { headers });

    if (data?.code !== 100000) {
      throw new Error(`Gagal ambil data (${data?.message || "Unknown error"})`);
    }

    const d = data.data;

    return {
      success: true,
      page_id: d.page_id,
      title: d.title,
      bio: d.bio,
      likes: d.likes_count,
      followers: d.followers_count,
      avatar: d.avatar_url,
      description: d.description,
      social: {
        instagram: d.instagram,
        youtube: d.youtube,
        twitter: d.twitter,
        telegram: d.telegram,
        website: d.website,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || "Terjadi kesalahan saat memproses permintaan",
    };
  }
}
/*
(async () => {
    const data = await scrapeFacebookPage("zykobotz");
  console.log(data);
})()
*/
