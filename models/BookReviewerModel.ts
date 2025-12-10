import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookReviewerAttributes {
  id: string; // ✅ Diubah menjadi string (UUID)
  book_submission_id: string;
  user_id: string;
  note?: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  reviewed_at?: Date;
  invited_by?: string;
  invited_at?: Date;

  created_at?: Date;
  updated_at?: Date;
}

interface BookReviewerCreationAttributes
  extends Optional<
    BookReviewerAttributes,
    | "id"
    | "note"
    | "reviewed_at"
    | "invited_by"
    | "invited_at"
    | "created_at"
    | "updated_at"
  > {}

class BookReviewerModel
  extends Model<BookReviewerAttributes, BookReviewerCreationAttributes>
  implements BookReviewerAttributes
{
  public id!: string; // ✅ Diubah menjadi string
  public book_submission_id!: string;
  public user_id!: string;
  public note!: string;
  public status!: "PENDING" | "ACCEPTED" | "REJECTED";
  public reviewed_at!: Date;
  public invited_by!: string;
  public invited_at!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookReviewerModel.init(
  {
    id: {
      type: DataTypes.UUID, // ✅ Tipe diubah menjadi UUID
      defaultValue: DataTypes.UUIDV4, // ✅ Ditambahkan untuk generate UUID otomatis
      primaryKey: true,
      // autoIncrement dihapus karena tidak berlaku untuk UUID
    },
    book_submission_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "ID Pengajuan Buku",
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "ID Reviewer (Dosen Internal)",
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Catatan/Review dari Reviewer",
    },
    status: {
      type: DataTypes.ENUM("PENDING", "ACCEPTED", "REJECTED"),
      defaultValue: "PENDING",
      allowNull: false,
      // comment: "Status undangan Reviewer", 
    },
    reviewed_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Tanggal/waktu Review selesai",
    },
    invited_by: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "ID User yang mengundang Reviewer",
    },
    invited_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "Tanggal/waktu Reviewer diundang",
    },
  },
  {
    sequelize,
    tableName: "book_reviewers",
    timestamps: true,
    underscored: true,
  }
);

export default BookReviewerModel;
