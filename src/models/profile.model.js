import { model, Schema, Types } from "mongoose";

const ProfileSchema = new Schema(
  {
    first_name: {
      type: String,
      require: true,
    },
    last_name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    address: {
      street: { type: String, require: true },
      city: { type: String, require: true },
      country: { type: String, require: true },
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      require: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const ProfileModel = model("Profile", ProfileSchema);
