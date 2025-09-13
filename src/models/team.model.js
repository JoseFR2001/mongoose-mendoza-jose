import { model, Schema, Types } from "mongoose";
import { ReportModel } from "./report.model";

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
    members: [
      {
        type: Types.ObjectId,
        ref: "User",
        require: true,
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

TeamSchema.virtual("Report", {
  ref: "Report",
  localField: "_id",
  foreignField: "Team",
});

TeamSchema.pre("findOneAndDelete", async function (next) {
  const team_id = this.getQuery()._id;
  await ReportModel.deleteMany({ team: team_id });
  next();
});

export const TeamModel = model("Team", TeamSchema);
