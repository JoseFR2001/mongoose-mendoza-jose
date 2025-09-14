import { model, Schema, Types } from "mongoose";

const ProfileSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

export const ProfileModel = model("Profile", ProfileSchema);
