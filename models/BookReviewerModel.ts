import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookReviewerAttributes {
  id: number;
  book_submission_id: number;
  user_id: string; // [UBAH] Diganti dari reviewer_id menjadi user_id
  review_note?: string;
  review_date?: Date;
  status: "PENDING" | "COMPLETED" | "DECLINED";

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
  public user_id!: string; // [UBAH] Diganti dari reviewer_id menjadi user_id
  public review_note!: string;
  public review_date!: Date;
  public status!: "PENDING" | "COMPLETED" | "DECLINED";

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookReviewerModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    book_submission_id: { type: DataTypes.INTEGER, allowNull: false },

    // [UBAH] Nama kolom disesuaikan agar cocok dengan Laravel (where user_id = ...)
    user_id: { type: DataTypes.UUID, allowNull: false },

    review_note: { type: DataTypes.TEXT, allowNull: true },
    review_date: { type: DataTypes.DATE, allowNull: true },
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
