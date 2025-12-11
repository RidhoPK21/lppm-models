import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../utils/dbUtil";

interface SubmissionLogAttributes {
  id: string; // UBAH: number -> string (UUID)
  book_submission_id: string; // UBAH: number -> string (UUID)
  user_id: string; // Siapa pelakunya?
  action:
    | "SUBMIT"
    | "VERIFY"
    | "REJECT"
    | "APPROVE"
    | "COMMENT"
    | "PAID"
    | "CREATE_DRAFT"
    | "UPLOAD_DOCUMENTS"; // Update action types jika perlu
  note?: string | null; // Catatan revisi/alasan

  created_at?: Date;
  updated_at?: Date;
}

interface SubmissionLogCreationAttributes
  extends Optional<SubmissionLogAttributes, "id"> {}

class SubmissionLogModel
  extends Model<SubmissionLogAttributes, SubmissionLogCreationAttributes>
  implements SubmissionLogAttributes
{
  public id!: string; // UBAH: number -> string
  public book_submission_id!: string; // UBAH: number -> string
  public user_id!: string;
  public action!:
    | "SUBMIT"
    | "VERIFY"
    | "REJECT"
    | "APPROVE"
    | "COMMENT"
    | "PAID"
    | "CREATE_DRAFT"
    | "UPLOAD_DOCUMENTS";
  public note!: string | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

SubmissionLogModel.init(
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
    action: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "submission_logs",
    timestamps: true,
    underscored: true,
  }
);

export default SubmissionLogModel;
