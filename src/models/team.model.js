import { model, Schema, Types } from "mongoose";
import { ReportModel } from "./report.model.js";

const TeamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

TeamSchema.virtual("report", {
  ref: "Report",
  localField: "_id",
  foreignField: "team",
});

TeamSchema.pre("findOneAndDelete", async function (next) {
  const team_id = this.getQuery()._id;
  await ReportModel.deleteMany({ team: team_id });
  next();
});

export const TeamModel = model("Team", TeamSchema);
