import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookReviewerAttributes {
  id: number;
  book_submission_id: number;
  user_id: string;
  note?: string; // UBAH dari review_note ke note
  status: "PENDING" | "ACCEPTED" | "REJECTED"; // UBAH status values
  reviewed_at?: Date; // UBAH dari review_date ke reviewed_at
  invited_by?: string; // TAMBAH field baru
  invited_at?: Date; // TAMBAH field baru
  created_at?: Date;
  updated_at?: Date;
}

interface BookReviewerCreationAttributes
  extends Optional<BookReviewerAttributes, "id" | "note" | "reviewed_at" | "invited_by" | "invited_at"> {}

class BookReviewerModel
  extends Model<BookReviewerAttributes, BookReviewerCreationAttributes>
  implements BookReviewerAttributes
{
  public id!: number;
  public book_submission_id!: number;
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
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true 
    },
    book_submission_id: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    user_id: { 
      type: DataTypes.UUID, 
      allowNull: false 
    },
    note: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    status: {
      type: DataTypes.ENUM("PENDING", "ACCEPTED", "REJECTED"),
      defaultValue: "PENDING",
      allowNull: false
    },
    reviewed_at: { 
      type: DataTypes.DATE, 
      allowNull: true 
    },
    invited_by: { 
      type: DataTypes.UUID, 
      allowNull: true 
    },
    invited_at: { 
      type: DataTypes.DATE, 
      allowNull: true 
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