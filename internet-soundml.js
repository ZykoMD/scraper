/*
FITUR : PLUGINS 
FITUR : SOUNDML
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
const cheerio = require("cheerio");

let handler = async (m, { conn, text, usedPrefix, command }) => {
    conn.soundml = conn.soundml || {};
    if (!text) throw `• *Example:* ${usedPrefix + command} Fanny`;

    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

    const hasil = await getAudio(text);
    if (!hasil || hasil.length === 0) throw "❌ Tidak ditemukan audio untuk karakter ini.";

    let responseText = `✅ Ditemukan ${hasil.length} voice line:\n\n`;
    hasil.forEach((item, i) => {
        responseText += `*${i + 1}.* ${item.text}\n\n`;
    });
    responseText += '> Reply dengan nomor untuk mendengar audio.';

    await conn.reply(m.chat, responseText, m);
    conn.soundml[m.sender] = hasil;
};

handler.before = async (m, { conn }) => {
    conn.soundml = conn.soundml || {};
    if (!m.text || isNaN(m.text)) return;
    if (!conn.soundml[m.sender]) return;

    const index = parseInt(m.text) - 1;
    if (index < 0 || index >= conn.soundml[m.sender].length) return;

    const item = conn.soundml[m.sender][index];
    await conn.sendFile(m.chat, item.audio, null, `🎵 ${item.text}`, m);
    delete conn.soundml[m.sender];
};

handler.help = ["soundml"].map(v => v + ' heroml/karakter>')
handler.tags = ["internet"]
handler.command = ["soundml"];
handler.register = true;
handler.limitbts = true

module.exports = handler;


async function getAudio(kata) {
    try {
        const url = `https://mobile-legends.fandom.com/wiki/${encodeURIComponent(kata)}/Audio/id`;
        console.log("📥 Mengambil data dari:", url);

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const hasil = [];

        $("span.audio-button").each((i, el) => {
            const audioLink = $(el).find("audio").first().attr("src");
            if (!audioLink) return;

            const parentDivText = $(el).closest("div").text().trim().replace(/\u00A0/g, " ");
            const match = parentDivText.match(/["“](.+?)["”]/);
            const text = match ? match[1].trim() : "Tidak ditemukan";

            hasil.push({ audio: audioLink, text });
        });

        return hasil;

    } catch (e) {
        console.error('❌ Error:', e.message);
        return null;
    }
}