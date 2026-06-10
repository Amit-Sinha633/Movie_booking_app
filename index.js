import express from "express"
import router from "./src/routes/movie.route.js"
import dotenv from "dotenv"
dotenv.config()
import dbConnection from "./src/db/db.js"
import theatre from "./src/routes/theatre.route.js"
import mongoose from "mongoose"
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/mba/api/v1",router)
app.use("/mba/theatre/api/v1",theatre)
mongoose.set("debug",true)
dbConnection()
const Port = process.env.PORT || 5000

app.listen(Port,()=>{
    console.log(`This is my localhost ${Port}`)
})