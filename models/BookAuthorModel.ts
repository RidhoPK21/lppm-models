import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookAuthorAttributes {
  id: string; // UBAH: number -> string (UUID)
  book_submission_id: string; // UBAH: number -> string (UUID Foreign Key)
  user_id?: string | null; // Jika Dosen Internal (Optional)
  name: string; // Wajib (Nama Dosen atau Nama Orang Luar)
  role: "FIRST" | "MEMBER" | "CORRESPONDING";
  affiliation?: string | null; // Asal instansi (jika eksternal)

  created_at?: Date;
  updated_at?: Date;
}

interface BookAuthorCreationAttributes
  extends Optional<BookAuthorAttributes, "id"> {}

class BookAuthorModel
  extends Model<BookAuthorAttributes, BookAuthorCreationAttributes>
  implements BookAuthorAttributes
{
  public id!: string; // UBAH: number -> string
  public book_submission_id!: string; // UBAH: number -> string
  public user_id!: string | null;
  public name!: string;
  public role!: "FIRST" | "MEMBER" | "CORRESPONDING";
  public affiliation!: string | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookAuthorModel.init(
  {
    id: {
      type: DataTypes.UUID, // UBAH: INTEGER -> UUID
      defaultValue: DataTypes.UUIDV4, // TAMBAH: Generate UUID otomatis
      primaryKey: true,
    },
    book_submission_id: {
      type: DataTypes.UUID, // UBAH: INTEGER -> UUID (harus cocok dengan parent)
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "Diisi jika penulis adalah Dosen Internal",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Nama lengkap penulis",
    },
    role: {
      type: DataTypes.ENUM("FIRST", "MEMBER", "CORRESPONDING"),
      defaultValue: "MEMBER",
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Institut Teknologi Del",
    },
  },
  {
    sequelize,
    tableName: "book_authors",
    timestamps: true,
    underscored: true,
  }
);

export default BookAuthorModel;
