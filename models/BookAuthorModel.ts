import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookAuthorAttributes {
  id: string; // Tipe data diubah menjadi string (UUID)
  book_submission_id: string;
  user_id?: string; // Jika Dosen Internal (Optional)
  name: string; // Wajib (Nama Dosen atau Nama Orang Luar)
  role: "FIRST" | "MEMBER" | "CORRESPONDING";
  affiliation?: string; // Asal instansi (jika eksternal)

  created_at?: Date;
  updated_at?: Date;
}

// Menghapus 'id' dari tipe Optional karena sekarang kita akan
// menghasilkan UUID secara otomatis di definisi kolom
interface BookAuthorCreationAttributes
  extends Optional<BookAuthorAttributes, "created_at" | "updated_at"> {}

class BookAuthorModel
  extends Model<BookAuthorAttributes, BookAuthorCreationAttributes>
  implements BookAuthorAttributes
{
  public id!: string; // Tipe data diubah menjadi string
  public book_submission_id!: string;
  public user_id!: string;
  public name!: string;
  public role!: "FIRST" | "MEMBER" | "CORRESPONDING";
  public affiliation!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookAuthorModel.init(
  {
    id: {
      type: DataTypes.UUID, // Menggunakan tipe UUID
      defaultValue: DataTypes.UUIDV4, // Menghasilkan UUID secara otomatis
      primaryKey: true,
      // Hapus autoIncrement karena tidak berlaku untuk UUID
    },
    book_submission_id: { type: DataTypes.UUID, allowNull: false },

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
