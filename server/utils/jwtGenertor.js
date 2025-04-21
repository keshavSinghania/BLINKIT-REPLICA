import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const accessTokenGenerator = (id)=>{
    try {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if(!secret){
            throw new Error("Missing access token secret in .env file");
        }
        const token = jwt.sign({id},secret,{expiresIn:"3h"});
        return token;
    } catch (error) {
        console.error("Error generating access token:", error.message);
        return null;
    }
}

export const refreshTokenGenerator = (id)=>{
    try {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        if(!secret){
            throw new Error("Missing secret token in .env file");
        }
        const token = jwt.sign({id}, secret, {expiresIn:"14d"});
        return token;
    } catch (error) {
        console.error("Error generating refresh token");
        return null;
    }
}


