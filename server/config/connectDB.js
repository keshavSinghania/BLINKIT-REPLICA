import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

//checking is there mongodb url present or not
if(!process.env.MONGODB_URI){
    throw new Error(
        "Please provide database uri"
    )
}

//connecting to the database using asynch , try , catch
const connectDB =async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to the databse successfully")
    } catch (error) {
        console.log(`error while connecting to the database ${error}`);
        process.exit(1)
    }
}

//exporting database function
export default connectDB;