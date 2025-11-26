import type { Model, ModelStatic } from "sequelize";

// Import Existing Models
import HakAksesModel from "./HakAksesModel";
import TodoModel from "./TodoModel";

// --- SISTEM PENGHARGAAN BUKU ---
import BookSubmissionModel from "./BookSubmissionModel";
import BookAuthorModel from "./BookAuthorModel";
import SubmissionLogModel from "./SubmissionLogModel";
import BookReviewerModel from "./BookReviewerModel"; // [BARU]
import NotificationModel from "./NotificationModel"; // [BARU]

// =================================================
// DEFINISI RELASI ANTAR TABEL (ASSOCIATIONS)
// =================================================

// 1. Relasi Buku <-> Penulis
// Satu buku memiliki banyak penulis
BookSubmissionModel.hasMany(BookAuthorModel, {
  foreignKey: "book_submission_id",
  as: "authors",
});
// Satu penulis terikat pada satu buku (dalam konteks submission ini)
BookAuthorModel.belongsTo(BookSubmissionModel, {
  foreignKey: "book_submission_id",
  as: "submission",
});

// 2. Relasi Buku <-> Reviewer
// Satu buku bisa di-review oleh banyak dosen (jika Ketua LPPM mengundang lebih dari 1)
BookSubmissionModel.hasMany(BookReviewerModel, {
  foreignKey: "book_submission_id",
  as: "reviewers",
});
BookReviewerModel.belongsTo(BookSubmissionModel, {
  foreignKey: "book_submission_id",
  as: "submission",
});

// 3. Relasi Buku <-> Log Aktivitas
// Satu buku memiliki banyak riwayat status (history)
BookSubmissionModel.hasMany(SubmissionLogModel, {
  foreignKey: "book_submission_id",
  as: "logs",
});
SubmissionLogModel.belongsTo(BookSubmissionModel, {
  foreignKey: "book_submission_id",
  as: "submission",
});

// =================================================
// EXPORT MODELS
// =================================================

const models: ModelStatic<Model<any, any>>[] = [
  // Core
  HakAksesModel,
  TodoModel,

  // Book Reward System
  BookSubmissionModel,
  BookAuthorModel,
  SubmissionLogModel,
  BookReviewerModel,
  NotificationModel,
];

export {
  HakAksesModel,
  TodoModel,
  BookSubmissionModel,
  BookAuthorModel,
  SubmissionLogModel,
  BookReviewerModel,
  NotificationModel,
};

export default models;
