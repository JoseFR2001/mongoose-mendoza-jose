import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
    // await mongoose.connection.dropDatabase()
  } catch (error) {
    console.error(error);
  }
};
