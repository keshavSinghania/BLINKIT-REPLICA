import { Router } from "express";
import { authTokenMiddleware } from "../middleware/authToken.middleware.js";
import upload from "../middleware/multer.js";
import { uploadCloudinarySingleImage } from "../controllers/cloudinary.controller.js";

const cloudinaryRouter = Router();

cloudinaryRouter.post("/upload-cloudinary-single-image",authTokenMiddleware,upload.single("image"),uploadCloudinarySingleImage);

export default cloudinaryRouter;