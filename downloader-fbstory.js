/*
FITUR : PLUGINS 
FITUR : fbStoryDownloader
TYPE : CommonJS

Di Buat : Zyko MD
©Zyko MD 2025

 * ig: 
 * yt: @zykobotz
 * tt: @zyko_store
 * saluran: https://whatsapp.com/channel/0029VaDl8Ig5PO19NKWwik0Z
 
 
Jangan di hapus creatornya kack
Saya capek ngetik kode 

"Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
(QS ash-Shaff: 2-3).
*/

const axios = require("axios");

async function fbStoryDownloader(link) {
  try {
    const res = await axios.get("https://anonstoryviewer.net/api/facebook/stories", {
      params: { url: link },
      headers: {
        "accept": "application/json",
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "referer": "https://anonstoryviewer.net/",
        "sec-ch-ua": '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
        "sec-ch-ua-platform": '"Windows"',
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
      }
    });

    const data = res.data;
    if (!data?.user || !data?.stories) throw new Error("Story tidak ditemukan");

    const user = {
      name: data.user.name,
      profile_picture: data.user.profile_picture,
      profile_url: data.user.url
    };

    const stories = data.stories.map(story => ({
      id: story.id,
      type: story.type,
      url: story.url
    }));

    return {
      status: true,
      user,
      stories
    };
  } catch (e) {
    return {
      status: false,
      message: e.message
    };
  }
}
let handler = async (m, { conn, text }) => {
  if (!text) return m.reply("📌 Kirim link story Facebook yang mau diunduh. link cerita fb");

  const result = await fbStoryDownloader(text);

  if (!result.status) {
    return m.reply(`❌ Gagal ambil story.\n\n${result.message}`);
  }

  const caption = `📱 *Facebook Story Downloader*\n👤 *User:* ${result.user.name}\n🔗 ${result.user.profile_url}\n\nTotal story: ${result.stories.length}`;
  for (const story of result.stories) {
    try {
      if (story.type === "video") {
        await conn.sendMessage(m.chat, { video: { url: story.url }, caption }, { quoted: m });
      } else if (story.type === "image") {
        await conn.sendMessage(m.chat, { image: { url: story.url }, caption }, { quoted: m });
      }
    } catch (err) {
      console.error("❌ Gagal kirim story:", err.message);
      await conn.sendMessage(m.chat, { text: `${caption}\n\n🔗 ${story.url}` }, { quoted: m });
    }
  }
};

handler.help = ["fbstory"].map(v => v + ' <url>');
handler.tags = ["downloader"];
handler.command = /^fbstory$/i;

module.exports = handler;