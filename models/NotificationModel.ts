import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface NotificationAttributes {
  id: number;
  user_id: string; // Penerima notifikasi
  title: string;
  message: string;
  is_read: boolean;
  related_id?: number; // ID Buku terkait (opsional)
  type?: string; // BOOK_SUBMISSION, PAYMENT, dll

  created_at?: Date;
  updated_at?: Date;
}

interface NotificationCreationAttributes
  extends Optional<NotificationAttributes, "id"> {}

class NotificationModel
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: number;
  public user_id!: string;
  public title!: string;
  public message!: string;
  public is_read!: boolean;
  public related_id!: number;
  public type!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

NotificationModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    related_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "ID referensi ke data terkait (misal ID Buku)",
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "Jenis notifikasi: BOOK, JOURNAL, SYSTEM",
    },
  },
  {
    sequelize,
    tableName: "notifications",
    timestamps: true,
    underscored: true,
  }
);

export default NotificationModel;
