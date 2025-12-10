import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface SubmissionLogAttributes {
  id: string; // ✅ Diubah menjadi string (UUID)
  book_submission_id: string;
  user_id: string; // Siapa pelakunya?
  // ✅ Disesuaikan untuk mengakomodasi nilai historis yang ada di database
  action:
    | "SUBMIT"
    | "VERIFY"
    | "REJECT"
    | "APPROVE"
    | "COMMENT"
    | "PAID"
    | "CREATE_DRAFT"
    | "PAYMENT_DISBURSED"
    | "UPLOAD_DOCUMENTS";
  note?: string; // Catatan revisi/alasan

  created_at?: Date;
  updated_at?: Date;
}

interface SubmissionLogCreationAttributes
  extends Optional<
    SubmissionLogAttributes,
    "id" | "note" | "created_at" | "updated_at"
  > {} // ✅ 'id' sekarang optional karena auto-generate

class SubmissionLogModel
  extends Model<SubmissionLogAttributes, SubmissionLogCreationAttributes>
  implements SubmissionLogAttributes
{
  public id!: string; // ✅ Diubah menjadi string
  public book_submission_id!: string;
  public user_id!: string;
  // ✅ Disesuaikan untuk mengakomodasi nilai historis yang ada di database
  public action!:
    | "SUBMIT"
    | "VERIFY"
    | "REJECT"
    | "APPROVE"
    | "COMMENT"
    | "PAID"
    | "CREATE_DRAFT"
    | "PAYMENT_DISBURSED"
    | "UPLOAD_DOCUMENTS";
  public note!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

SubmissionLogModel.init(
  {
    id: {
      type: DataTypes.UUID, // ✅ Tipe diubah menjadi UUID
      defaultValue: DataTypes.UUIDV4, // ✅ Ditambahkan untuk generate UUID otomatis
      primaryKey: true,
      // autoIncrement dihapus
    },
    book_submission_id: { type: DataTypes.UUID, allowNull: false },

    user_id: { type: DataTypes.UUID, allowNull: false },
    action: {
      type: DataTypes.ENUM(
        "SUBMIT",
        "VERIFY",
        "REJECT",
        "APPROVE",
        "COMMENT",
        "PAID",
        "CREATE_DRAFT", // <-- DITAMBAHKAN
        "PAYMENT_DISBURSED", // <-- DITAMBAHKAN
        "UPLOAD_DOCUMENTS" // <-- DITAMBAHKAN
      ), // ✅ Diubah kembali ke ENUM agar lebih terkontrol
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
