import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

// Atribut TypeScript Interface
interface BookSubmissionAttributes {
  id: number;
  user_id: string; // Dosen Pengaju (UUID)
  title: string;
  isbn: string; // Syarat Mutlak (Pedoman)
  publication_year: number;
  publisher: string;
  publisher_level: "NATIONAL" | "INTERNATIONAL" | "NATIONAL_ACCREDITED"; // Penentu Reward
  book_type: "TEACHING" | "REFERENCE" | "MONOGRAPH" | "CHAPTER"; // Penentu Reward
  total_pages: number; // Validasi (Monograf min 40 hal)
  file_path: string; // Bukti Fisik (Cover, Daftar Isi) - bisa null
  drive_link?: string; // Link Softcopy (JSON String 5 Link) - TEXT
  status:
    | "DRAFT"
    | "SUBMITTED"
    | "REVISION_REQUIRED"
    | "VERIFIED_STAFF"
    | "APPROVED_CHIEF"
    | "REJECTED"
    | "PAID";
  approved_amount?: number; // Nominal final yang disetujui

  created_at?: Date;
  updated_at?: Date;
}

// Interface untuk Creation (id opsional karena auto-increment)
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
  public file_path!: string;
  public drive_link!: string;
  public status!:
    | "DRAFT"
    | "SUBMITTED"
    | "REVISION_REQUIRED"
    | "VERIFIED_STAFF"
    | "APPROVED_CHIEF"
    | "REJECTED"
    | "PAID";
  public approved_amount!: number;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookSubmissionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID, // UUID Sesuai HakAksesModel
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: { notEmpty: true },
    },
    publication_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher_level: {
      type: DataTypes.ENUM("NATIONAL", "INTERNATIONAL", "NATIONAL_ACCREDITED"),
      allowNull: false,
      comment: "Menentukan besaran insentif sesuai Tabel Pedoman",
    },
    book_type: {
      type: DataTypes.ENUM("TEACHING", "REFERENCE", "MONOGRAPH", "CHAPTER"),
      allowNull: false,
      comment: "Jenis buku menentukan kategori penghargaan",
    },
    total_pages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Digunakan untuk validasi kriteria tebal buku (min 40 hal)",
    },
    file_path: {
      type: DataTypes.STRING, // Path local untuk file kecil (bukti)
      allowNull: true,
    },
    drive_link: {
      // [PENTING] Ubah jadi TEXT agar muat menampung JSON string panjang (5 link)
      type: DataTypes.TEXT,
      allowNull: true,
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
    approved_amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true, // Diisi oleh Ketua LPPM/HRD saat approve
    },
  },
  {
    sequelize,
    tableName: "book_submissions", // Standar SDI: Plural & Snake Case
    timestamps: true,
    underscored: true, // Standar SDI: created_at, updated_at
  }
);

export default BookSubmissionModel;
