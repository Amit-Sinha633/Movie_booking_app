import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConnection = async (req, res) => {
  try {
    console.log("hii")
    const connction = await mongoose.connect(process.env.DB_CONNCTION);
    console.log("Db connected successfully");
  } catch (error) {
    console.log("something got error from mongodb",error);
  }
};

export default dbConnection;
