import { Router } from "express";
import { authTokenMiddleware } from "../middleware/authToken.middleware.js";
import { deleteCategory, editCategory, getCategory, uploadCategory } from "../controllers/category.controller.js";

export const categoryRouter = new Router();
categoryRouter.put("/upload-category",authTokenMiddleware,uploadCategory);
categoryRouter.get("/get-category",authTokenMiddleware,getCategory);
categoryRouter.put("/edit-category",authTokenMiddleware,editCategory);
categoryRouter.delete("/delete-category",authTokenMiddleware,deleteCategory);