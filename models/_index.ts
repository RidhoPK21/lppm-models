import type { Model, ModelStatic } from "sequelize";

// Import all models here
import HakAksesModel from "./HakAksesModel";

const models: ModelStatic<Model>[] = [HakAksesModel];

export default models;
