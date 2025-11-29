import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface SubmissionLogAttributes {
  id: number;
  book_submission_id: number;
  user_id: string; // Siapa pelakunya?
  action: "SUBMIT" | "VERIFY" | "REJECT" | "APPROVE" | "COMMENT" | "PAID";
  note?: string; // Catatan revisi/alasan

  created_at?: Date;
  updated_at?: Date;
}

interface SubmissionLogCreationAttributes
  extends Optional<SubmissionLogAttributes, "id"> {}

class SubmissionLogModel
  extends Model<SubmissionLogAttributes, SubmissionLogCreationAttributes>
  implements SubmissionLogAttributes
{
  public id!: number;
  public book_submission_id!: number;
  public user_id!: string;
  public action!:
    | "SUBMIT"
    | "VERIFY"
    | "REJECT"
    | "APPROVE"
    | "COMMENT"
    | "PAID";
  public note!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

SubmissionLogModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    book_submission_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.UUID, allowNull: false },
    action: {
      type: DataTypes.STRING(50), // Menggunakan String agar fleksibel jika ada aksi baru
      allowNull: false,
    },
    note: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    sequelize,
    tableName: "submission_logs",
    timestamps: true,
    underscored: true,
  }
);

export default SubmissionLogModel;
