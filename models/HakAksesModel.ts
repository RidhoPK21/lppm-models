import { DataTypes } from "sequelize";
import db from "../utils/dbUtil";

const TABLE_NAME = "m_hak_akses";

const DataModel = db.define(
  TABLE_NAME,
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, // primaryKey hanya pada ID
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false, // Tidak perlu defaultValue dan jangan primaryKey
    },
    akses: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: TABLE_NAME,
    createdAt: "created_at",
    updatedAt: "updated_at",
    timestamps: true,
  }
);

export default DataModel;