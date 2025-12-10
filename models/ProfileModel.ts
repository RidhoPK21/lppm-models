import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface ProfileAttributes {
  id: string; // ✅ Diubah menjadi string (UUID)
  user_id: string;
  name?: string | null;

  NIDN?: string | null;
  Prodi?: string | null;
  SintaID?: string | null;
  ScopusID?: string | null;

  created_at?: Date;
  updated_at?: Date;
}

interface ProfileCreationAttributes
  extends Optional<ProfileAttributes, "id" | "created_at" | "updated_at"> {} // ✅ 'id' sekarang optional karena auto-generate

class ProfileModel
  extends Model<ProfileAttributes, ProfileCreationAttributes>
  implements ProfileAttributes
{
  public id!: string; // ✅ Diubah menjadi string
  public user_id!: string;
  public name!: string | null;

  public NIDN!: string | null;
  public Prodi!: string | null;
  public SintaID!: string | null;
  public ScopusID!: string | null;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

ProfileModel.init(
  {
    id: {
      type: DataTypes.UUID, // ✅ Tipe diubah menjadi UUID
      defaultValue: DataTypes.UUIDV4, // ✅ Ditambahkan untuk generate UUID otomatis
      primaryKey: true,
      // autoIncrement dihapus
    },

    user_id: {
      type: DataTypes.UUID, // ✅ Tipe diubah menjadi UUID (asumsi konsistensi dengan model lain)
      allowNull: false,
      unique: true,
      field: "user_id",
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: "name",
    },

    // ------------ INFORMASI AKADEMIK ----------------

    NIDN: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: "nidn",
    },

    Prodi: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: "prodi",
    },

    SintaID: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: "sinta_id",
    },

    ScopusID: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      field: "scopus_id",
    },

    created_at: {
      type: DataTypes.DATE,
      field: "created_at",
    },

    updated_at: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    sequelize,
    tableName: "profiles",
    timestamps: true,
    underscored: true,
  }
);

export default ProfileModel;
