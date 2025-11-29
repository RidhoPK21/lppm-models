import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookAuthorAttributes {
  id: number;
  book_submission_id: number;
  user_id?: string; // Jika Dosen Internal (Optional)
  name: string; // Wajib (Nama Dosen atau Nama Orang Luar)
  role: "FIRST" | "MEMBER" | "CORRESPONDING";
  affiliation?: string; // Asal instansi (jika eksternal)

  created_at?: Date;
  updated_at?: Date;
}

interface BookAuthorCreationAttributes
  extends Optional<BookAuthorAttributes, "id"> {}

class BookAuthorModel
  extends Model<BookAuthorAttributes, BookAuthorCreationAttributes>
  implements BookAuthorAttributes
{
  public id!: number;
  public book_submission_id!: number;
  public user_id!: string;
  public name!: string;
  public role!: "FIRST" | "MEMBER" | "CORRESPONDING";
  public affiliation!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookAuthorModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    book_submission_id: { type: DataTypes.INTEGER, allowNull: false },
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
