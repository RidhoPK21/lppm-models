import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookReviewerAttributes {
  id: number;
  book_submission_id: number;
  reviewer_id: string; // UUID Dosen yang ditunjuk
  review_note?: string; // Komentar penilaian
  review_date?: Date; // Tanggal selesai menilai
  status: "PENDING" | "COMPLETED" | "DECLINED"; // Status tugas review

  created_at?: Date;
  updated_at?: Date;
}

interface BookReviewerCreationAttributes
  extends Optional<BookReviewerAttributes, "id"> {}

class BookReviewerModel
  extends Model<BookReviewerAttributes, BookReviewerCreationAttributes>
  implements BookReviewerAttributes
{
  public id!: number;
  public book_submission_id!: number;
  public reviewer_id!: string;
  public review_note!: string;
  public review_date!: Date;
  public status!: "PENDING" | "COMPLETED" | "DECLINED";

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookReviewerModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    book_submission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "ID Buku yang dinilai",
    },
    reviewer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "User ID dosen yang diminta me-review",
    },
    review_note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    review_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETED", "DECLINED"),
      defaultValue: "PENDING",
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
