import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface BookAuthorAttributes {
  id: number;
  book_submission_id: number; // FK ke Submission
  user_id?: string; // FK ke User (Jika Dosen Internal)
  name: string; // Nama (Wajib jika Eksternal)
  role: "FIRST_AUTHOR" | "CO_AUTHOR" | "CORRESPONDING_AUTHOR";
  affiliation: string; // Syarat Pedoman: Wajib afiliasi IT Del untuk dapat reward

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
  public role!: "FIRST_AUTHOR" | "CO_AUTHOR" | "CORRESPONDING_AUTHOR";
  public affiliation!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

BookAuthorModel.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("FIRST_AUTHOR", "CO_AUTHOR", "CORRESPONDING_AUTHOR"),
      allowNull: false,
      comment: "Penting untuk perhitungan pembagian persentase reward",
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Institut Teknologi Del", // Default sesuai syarat Pedoman
    },
  },
  {
    sequelize,
    tableName: "book_authors", // Standar SDI: Plural
    timestamps: true,
    underscored: true,
  }
);

export default BookAuthorModel;
