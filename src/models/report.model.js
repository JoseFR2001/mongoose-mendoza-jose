import { model, Schema } from "mongoose";

const ReportSchema = new Schema({
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
});

export const ReportModel = model("Report", ReportSchema);
