import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface SubmissionLogAttributes {
  id: number;
  book_submission_id: number;
  user_id: string; // Siapa yang melakukan aksi
  action: string; // SUBMIT, APPROVE, REJECT, COMMENT
  note?: string; // Catatan revisi/alasan penolakan

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
  public action!: string;
  public note!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

SubmissionLogModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    book_submission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID, // Atau DataTypes.UUID
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING, // Contoh: 'VERIFIED_BY_STAFF', 'REJECTED_BY_CHIEF'
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true, // Catatan opsional, tapi wajib jika REJECT/REVISION
    },
  },
  {
    sequelize,
    tableName: "submission_logs", // Standar SDI: Plural
    timestamps: true,
    underscored: true,
  }
);

export default SubmissionLogModel;
