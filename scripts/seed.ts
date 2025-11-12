import db from "../utils/dbUtil";

async function seedDB(): Promise<void> {
  try {
    console.log("Sedang melakukan penyemaian data...");

    // Tambahkan logika penyemaian data di sini

    console.log("Berhasil melakukan penyemaian database.");
  } catch (error) {
    console.error("Gagal melakukan penyemaian database: ", error);
  } finally {
    // Tutup koneksi agar Node.js bisa exit
    await db.close();
  }
}

(async () => {
  await seedDB();
})();
