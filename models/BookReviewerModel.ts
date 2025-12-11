import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookReviewerAttributes {
  id: string; // UBAH: number -> string (UUID)
  book_submission_id: string; // UBAH: number -> string (FK UUID)
  user_id: string;
  note?: string | null;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  reviewed_at?: Date | null;
  invited_by?: string | null;
  invited_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}

interface BookReviewerCreationAttributes
  extends Optional<
    BookReviewerAttributes,
    "id" | "note" | "reviewed_at" | "invited_by" | "invited_at"
  > {}

class BookReviewerModel
  extends Model<BookReviewerAttributes, BookReviewerCreationAttributes>
  implements BookReviewerAttributes
{
  public id!: string; // UBAH: number -> string
  public book_submission_id!: string; // UBAH: number -> string
  public user_id!: string;
  public note!: string | null;
  public status!: "PENDING" | "ACCEPTED" | "REJECTED";
  public reviewed_at!: Date | null;
  public invited_by!: string | null;
  public invited_at!: Date | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookReviewerModel.init(
  {
    id: {
      type: DataTypes.UUID, // UBAH: INTEGER -> UUID
      defaultValue: DataTypes.UUIDV4, // TAMBAH: Auto-generate UUID
      primaryKey: true,
    },
    book_submission_id: {
      type: DataTypes.UUID, // UBAH: INTEGER -> UUID
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "ACCEPTED", "REJECTED"),
      defaultValue: "PENDING",
      allowNull: false,
    },
    reviewed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    invited_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    invited_at: {
      type: DataTypes.DATE,
      allowNull: true,
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
