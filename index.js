import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDb  from "./config/Mongodb.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import cookieParser from "cookie-parser";
dotenv.config();
const port =  process.env.PORT
const app =express();
//connecting to database
connectDb();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", AuthRoutes);

app.use("/api/profile",profileRoutes)

app.listen(8000, ()=>{
    console.log("Server is running")
})

app.get("/" ,(req,res)=>{
res.json({message:"WELCOME TO BACKEND"})
})
