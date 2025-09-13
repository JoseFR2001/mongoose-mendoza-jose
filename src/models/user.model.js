import { model, Schema, Types } from "mongoose";
import { ReportModel } from "./report.model.js";
import { TeamModel } from "./team.model.js";
import { ProfileModel } from "./profile.model.js";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    team: [
      {
        type: Types.ObjectId,
        ref: "Team",
      },
    ],

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    versionKey: false,
  }
);

UserSchema.virtual("Profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("Report", {
  ref: "Report",
  localField: "_id",
  foreignField: "author",
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().isDeleted === true) {
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
