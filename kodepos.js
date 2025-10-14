/**
 * scraper kodepos
 * Created by: Zyko MD Official
 * Year: © 2025
 * 
 * 🔧 Paket yang digunakan::
 *   - axios
 *   - 
 * 
 * 🌐 Official Channel:
 *   https://whatsapp.com/channel/0029VaDl8Ig5PO19NKWwik0Z
 * 
 * 💬 pesan:
 *   "Wahai orang-orang yang beriman, mengapakah kamu mengatakan sesuatu yang tidak kamu kerjakan?
 *    Amat besar kebencian di sisi Allah bahwa kamu mengatakan apa-apa yang tidak kamu kerjakan."
 *    (QS ash-Shaff: 2-3)
 * 
 * 🚀 Contoh penggunaan tersedia di bagian bawah skrip.
 */

const axios = require("axios");

async function getKodePos(kata) {
  try {
    const url = "https://api.lincah.id/api/check/zipcode";

    const { data } = await axios.post(
      url,
      { search: kata },
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
          origin: "https://lincah.id",
          referer: "https://lincah.id/",
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
        },
      }
    );

    // Format hasil lengkap
    const result =
      data?.data?.data?.map((item) => ({
        kode: item.code,
        kodepos: item.postal,
        provinsi: item.province,
        kota: item.city,
        kecamatan: item.district,
        kelurahan: item.village,
        latitude: item.latitude,
        longitude: item.longitude,
        link_maps: `https://www.google.com/maps?q=${item.latitude},${item.longitude}`,
      })) || [];

    return result;
  } catch (err) {
    console.error("❌ Error:", err.message);
    return [];
  }
}
/*
getKodePos('sukabumi').then((res) => {
  console.log(res);
});*/