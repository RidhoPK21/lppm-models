import type { Model, ModelStatic } from "sequelize";

// Import existing models
import HakAksesModel from "./HakAksesModel";
import TodoModel from "./TodoModel";

// --- TAMBAHAN BARU ---
// Import model penghargaan buku yang baru dibuat
import BookSubmissionModel from "./BookSubmissionModel";
import BookAuthorModel from "./BookAuthorModel";
import SubmissionLogModel from "./SubmissionLogModel";

const models: ModelStatic<Model>[] = [
  // Hak Akses
  HakAksesModel,

  // Todos
  TodoModel,

  // --- TAMBAHAN BARU ---
  // Daftarkan model penghargaan buku di sini agar ter-sync ke database
  BookSubmissionModel,
  BookAuthorModel,
  SubmissionLogModel,
];

export default models;
