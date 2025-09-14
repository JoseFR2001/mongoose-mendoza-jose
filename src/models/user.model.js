import { model, Schema, Types } from "mongoose";
import { ReportModel } from "./report.model.js";
import { TeamModel } from "./team.model.js";
import { ProfileModel } from "./profile.model.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    teams: [
      {
        type: Types.ObjectId,
        ref: "Team",
      },
    ],

    is_deleted: {
      type: Boolean,
      default: false,
    },
    deleted_at: { type: Date, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

UserSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

UserSchema.virtual("report", {
  ref: "Report",
  localField: "_id",
  foreignField: "author",
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().is_deleted === true) {
    const user_id = this.getQuery()._id;
    await ReportModel.deleteMany({ author: user_id });
    await ProfileModel.deleteOne({ user: user_id });
    await TeamModel.updateMany(
      { members: user_id },
      { $pull: { members: user_id } }
    );
  }
  next();
});

export const UserModel = model("User", UserSchema);
