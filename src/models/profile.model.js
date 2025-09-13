import { model, Schema } from "mongoose";

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
      street: String,
      city: String,
      country: String,
    },
  },
  {
    versionKey: false,
  }
);

export const ProfileModel = model("Profile", ProfileSchema);
