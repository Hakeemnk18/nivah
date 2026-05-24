import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ MongoDB connected");
    console.log(mongoose.connection.host);
    console.log(mongoose.connection.name);
  } catch (error) {
    console.log("error in connect db config ", error);
  }
};
