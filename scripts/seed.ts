import db from "../utils/dbUtil";
import HakAksesModel from "../models/HakAksesModel";

async function seedDB(): Promise<void> {
  try {
    await db.authenticate();
    console.log("Sedang melakukan penyemaian data...");

    // Tambahkan logika penyemaian data di sini
    const user_id = "12e091b8-f227-4a58-8061-dc4a100c60f1";
    await HakAksesModel.destroy({ where: { user_id: user_id } });
    await HakAksesModel.create({
      id: user_id,
      user_id: user_id,
      akses: "Admin,Lppm Ketua",
    });

    // Daftar ID yang harus disinkronkan dengan Laravel
    const users = [
      { id: "22e091b8-f227-4a58-8061-dc4a100c60f2", role: "DOSEN" }, // Budi
      { id: "33e091b8-f227-4a58-8061-dc4a100c60f3", role: "DOSEN" }, // Siti
      { id: "44e091b8-f227-4a58-8061-dc4a100c60f4", role: "DOSEN" }, // Rahmat
    ];

    console.log("Berhasil melakukan penyemaian database.");
  } catch (error) {
    console.error("Gagal melakukan penyemaian database: ", error);
  } finally {
    await db.close();
  }
}

(async () => {
  await seedDB();
})();
