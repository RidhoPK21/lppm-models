import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookSubmissionAttributes {
  id: number;
  user_id: string; // Pengaju
  title: string;
  isbn: string;
  publication_year: number;
  publisher: string;
  publisher_level: "NATIONAL" | "INTERNATIONAL" | "NATIONAL_ACCREDITED";
  book_type: "TEACHING" | "REFERENCE" | "MONOGRAPH" | "CHAPTER";
  total_pages: number;

  // Kolom Krusial
  drive_link?: string; // JSON String untuk Link Dokumen
  pdf_path?: string; // Path file PDF yang tersimpan
  approved_amount?: number; // Nominal dari Ketua/HRD
  payment_date?: Date; // Jadwal Cair dari HRD
  reject_note?: string; // Catatan penolakan dari Reviewer/HRD

  status:
    | "DRAFT"
    | "SUBMITTED"
    | "REVISION_REQUIRED"
    | "VERIFIED_STAFF"
    | "APPROVED_CHIEF"
    | "REJECTED"
    | "PAID";

  created_at?: Date;
  updated_at?: Date;
}

interface BookSubmissionCreationAttributes
  extends Optional<BookSubmissionAttributes, "id"> {}

class BookSubmissionModel
  extends Model<BookSubmissionAttributes, BookSubmissionCreationAttributes>
  implements BookSubmissionAttributes
{
  public id!: number;
  public user_id!: string;
  public title!: string;
  public isbn!: string;
  public publication_year!: number;
  public publisher!: string;
  public publisher_level!: "NATIONAL" | "INTERNATIONAL" | "NATIONAL_ACCREDITED";
  public book_type!: "TEACHING" | "REFERENCE" | "MONOGRAPH" | "CHAPTER";
  public total_pages!: number;

  public drive_link!: string;
  public pdf_path!: string;
  public approved_amount!: number;
  public payment_date!: Date;
  public reject_note!: string;

  public status!:
    | "DRAFT"
    | "SUBMITTED"
    | "REVISION_REQUIRED"
    | "VERIFIED_STAFF"
    | "APPROVED_CHIEF"
    | "REJECTED"
    | "PAID";

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookSubmissionModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    isbn: { type: DataTypes.STRING(50), allowNull: false },
    publication_year: { type: DataTypes.INTEGER, allowNull: false },
    publisher: { type: DataTypes.STRING, allowNull: false },
    publisher_level: {
      type: DataTypes.ENUM("NATIONAL", "INTERNATIONAL", "NATIONAL_ACCREDITED"),
      allowNull: false,
    },
    book_type: {
      type: DataTypes.ENUM("TEACHING", "REFERENCE", "MONOGRAPH", "CHAPTER"),
      allowNull: false,
    },
    total_pages: { type: DataTypes.INTEGER, allowNull: false },

    // Fitur Utama
    drive_link: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "JSON String Link Google Drive",
    },
    pdf_path: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Path file PDF surat permohonan",
    },
    approved_amount: { type: DataTypes.DECIMAL(15, 2), allowNull: true },
    payment_date: { type: DataTypes.DATEONLY, allowNull: true },
    reject_note: { type: DataTypes.TEXT, allowNull: true },

    status: {
      type: DataTypes.ENUM(
        "DRAFT",
        "SUBMITTED",
        "REVISION_REQUIRED",
        "VERIFIED_STAFF",
        "APPROVED_CHIEF",
        "REJECTED",
        "PAID"
      ),
      defaultValue: "DRAFT",
    },
  },
  {
    sequelize,
    tableName: "book_submissions",
    timestamps: true,
    underscored: true,
  }
);

export default BookSubmissionModel;