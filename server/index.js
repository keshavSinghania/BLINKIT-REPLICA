import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.route.js";
import cloudinaryRouter from "./routes/cloudinary.route.js";
import { categoryRouter } from "./routes/category.routes.js";
import { subCategoryRouter } from "./routes/subCategory.routes.js";

//creating express app
const app = express();
//dot env init
dotenv.config();

//middlewares
app.use(cors({
    credentials: true,
    origin:process.env.FRONTEND_URL,
}))
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet({
    crossOriginResourcePolicy:false
}));
app.use(express.urlencoded({extended:true}));

const PORT = 8080 || process.env.PORT;
console.log(`your port is ${PORT}`);

app.get("/",(req,res)=>{
    res.send("hey")
});

app.use("/api/user",userRouter);
app.use("/api/category",categoryRouter)
app.use("/api/cloud",cloudinaryRouter);
app.use("/api/sub-category",subCategoryRouter);
//connecting to the database and starting server
connectDB().then(app.listen(PORT,()=>{
    console.log(`server is running at port number ${PORT}`);
})
);

