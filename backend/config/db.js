import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB CONNECTED SUCCESSFULLY: ${conn.connection.host}`);
  } catch (error) {
    console.log("DB CONNECTİON ERROR:", error);
    process.exit(1);
  }
};
