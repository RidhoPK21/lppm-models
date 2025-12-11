import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../utils/dbUtil";

interface NotificationAttributes {
  id: number;
  user_id: string;
  title: string;
  message: string;
  type: "Info" | "Sukses" | "Peringatan" | "Error" | "System";
  is_read: boolean;
  reference_key?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

interface NotificationCreationAttributes 
  extends Optional<NotificationAttributes, "id" | "is_read" | "reference_key"> {}

class NotificationModel
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  public id!: number;
  public user_id!: string;
  public title!: string;
  public message!: string;
  public type!: "Info" | "Sukses" | "Peringatan" | "Error" | "System";
  public is_read!: boolean;
  public reference_key?: string | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

NotificationModel.init(
  {
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true 
    },
    user_id: { 
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id"
    },
    title: { 
      type: DataTypes.STRING(255),
      allowNull: false
    },
    message: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM("Info", "Sukses", "Peringatan", "Error", "System"),
      allowNull: false,
      defaultValue: "Info"
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: "is_read"
    },
    reference_key: {
      type: DataTypes.STRING(255),
      allowNull: true,
     
      field: "reference_key",
      comment: "Unique key untuk mencegah duplikasi notifikasi"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at"
    }
  },
  {
    sequelize,
    tableName: "notifications",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

export default NotificationModel;