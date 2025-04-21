import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

export const authTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        // Fallback to Authorization header if cookie is missing
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1]; // Extract token from Bearer
        }
        if (!token) {
            return res.status(400).json({
                message: "Access token missing",
                error: true,
                success: false
            })
        }

        //verifing access token
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (!verified) {
            return res.status(401).json({
                message: "Invalid! Access Token",
                error: true,
                success: false
            })
        };
        const userId = verified.id;
        req.userId = userId;
        next();

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}