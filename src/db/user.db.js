import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const dbConnection = async(req,res) =>{
    try {
        const connction = await mongoose.connect(process.env.DB_CONNCTION)
        console.log("Db connected successfully")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection