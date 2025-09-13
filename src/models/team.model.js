import { model, Schema } from "mongoose";

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

export const TeamModel = model("Team", TeamSchema);
