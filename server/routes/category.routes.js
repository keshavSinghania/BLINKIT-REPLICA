import { Router } from "express";
import { authTokenMiddleware } from "../middleware/authToken.middleware.js";
import { uploadCategory } from "../controllers/category.controller.js";

export const categoryRouter = new Router();
categoryRouter.put("/upload-category",authTokenMiddleware,uploadCategory);