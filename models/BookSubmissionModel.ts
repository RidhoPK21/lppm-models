import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookSubmissionAttributes {
  id: string; // UBAH: number -> string (UUID)
  user_id: string;
  title: string;
  isbn: string;
  publication_year: number;
  publisher: string;
  publisher_level: "NATIONAL" | "INTERNATIONAL" | "NATIONAL_ACCREDITED";
  book_type: "TEACHING" | "REFERENCE" | "MONOGRAPH" | "CHAPTER";
  total_pages: number;
  drive_link?: string | null;
  pdf_path?: string | null;
  approved_amount?: number | null;
  payment_date?: Date | null;
  reject_note?: string | null;
  rejected_by?: string | null;
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
  extends Optional<
    BookSubmissionAttributes,
    | "id"
    | "drive_link"
    | "pdf_path"
    | "approved_amount"
    | "payment_date"
    | "reject_note"
    | "rejected_by"
  > {}

class BookSubmissionModel
  extends Model<BookSubmissionAttributes, BookSubmissionCreationAttributes>
  implements BookSubmissionAttributes
{
  public id!: string; // UBAH: number -> string
  public user_id!: string;
  public title!: string;
  public isbn!: string;
  public publication_year!: number;
  public publisher!: string;
  public publisher_level!: "NATIONAL" | "INTERNATIONAL" | "NATIONAL_ACCREDITED";
  public book_type!: "TEACHING" | "REFERENCE" | "MONOGRAPH" | "CHAPTER";
  public total_pages!: number;
  public drive_link?: string | null;
  public pdf_path?: string | null;
  public approved_amount?: number | null;
  public payment_date?: Date | null;
  public reject_note?: string | null;
  public rejected_by?: string | null;
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
    id: {
      type: DataTypes.UUID, // UBAH: INTEGER -> UUID
      defaultValue: DataTypes.UUIDV4, // TAMBAH: Auto-generate UUID
      primaryKey: true,
    },
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
    drive_link: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      comment: "JSON String Link Google Drive",
    },
    pdf_path: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      comment: "Path file PDF surat permohonan",
    },
    approved_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
      defaultValue: null,
    },
    payment_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
    },
    reject_note: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    rejected_by: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: null,
      comment: "User ID yang menolak (Staff/Ketua LPPM)",
    },
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
