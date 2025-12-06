import type { Model, ModelStatic } from "sequelize";

// Import Existing
import HakAksesModel from "./HakAksesModel";
import TodoModel from "./TodoModel";

// Import 5 Tabel Bisnis
import BookSubmissionModel from "./BookSubmissionModel";
import BookAuthorModel from "./BookAuthorModel";
import SubmissionLogModel from "./SubmissionLogModel";
import BookReviewerModel from "./BookReviewerModel";
import NotificationModel from "./NotificationModel";

// Import Profile
import ProfileModel from "./ProfileModel";

// --- RELASI (ASSOCIATIONS) ---

// 1. Buku <-> Penulis
BookSubmissionModel.hasMany(BookAuthorModel, {
  foreignKey: "book_submission_id",
  as: "authors",
});
BookAuthorModel.belongsTo(BookSubmissionModel, {
  foreignKey: "book_submission_id",
  as: "submission",
});

// 2. Buku <-> Reviewer
BookSubmissionModel.hasMany(BookReviewerModel, {
  foreignKey: "book_submission_id",
  as: "reviewers",
});
BookReviewerModel.belongsTo(BookSubmissionModel, {
  foreignKey: "book_submission_id",
  as: "submission",
});

// 3. Buku <-> Logs
BookSubmissionModel.hasMany(SubmissionLogModel, {
  foreignKey: "book_submission_id",
  as: "logs",
});
SubmissionLogModel.belongsTo(BookSubmissionModel, {
  foreignKey: "book_submission_id",
  as: "submission",
});

// --- EXPORT ---

const models: ModelStatic<Model<any, any>>[] = [
  HakAksesModel,
  TodoModel,
  BookSubmissionModel,
  BookAuthorModel,
  SubmissionLogModel,
  BookReviewerModel,
  NotificationModel,
  ProfileModel, // <-- DITAMBAHKAN
];

export {
  HakAksesModel,
  TodoModel,
  BookSubmissionModel,
  BookAuthorModel,
  SubmissionLogModel,
  BookReviewerModel,
  NotificationModel,
  ProfileModel, // <-- DITAMBAHKAN
};

export default models;
