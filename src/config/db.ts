import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI || "")
    .then(() => {
      console.log("Mongodb Connected");
    })
    .catch((err) => {
      console.error("MongoDB connection failed");
      console.error(err);
    });
};
