import { model, Schema, Types } from "mongoose";

const ReportSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    content: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      ENUM: ["pending", "in-process", "completed"],
      default: "pending",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
    },
    team: {
      type: Types.ObjectId,
      ref: "Team",
      require: true,
    },
  },
  {
    versionKey: false,
  }
);

export const ReportModel = model("Report", ReportSchema);
