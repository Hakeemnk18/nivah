import mongoose from "mongoose";
import { env } from './env.js';
export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("✅ MongoDB connected");
    }
    catch (error) {
        console.log("error in connect db config ", error);
    }
};
//# sourceMappingURL=db.js.map