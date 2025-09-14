import { model, Schema, Types } from "mongoose";

const ReportSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      ENUM: ["pending", "in-process", "completed"],
      default: "pending",
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    team: {
      type: Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const ReportModel = model("Report", ReportSchema);
