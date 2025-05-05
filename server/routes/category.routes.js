import { Router } from "express";
import { authTokenMiddleware } from "../middleware/authToken.middleware.js";
import { deleteCategory, editCategory, getCategory, uploadCategory } from "../controllers/category.controller.js";
import { getProductsByCategoryId } from "../controllers/product.controller.js";

export const categoryRouter = new Router();
categoryRouter.put("/upload-category",authTokenMiddleware,uploadCategory);
categoryRouter.get("/get-category",getCategory);
categoryRouter.put("/edit-category",authTokenMiddleware,editCategory);
categoryRouter.delete("/delete-category",authTokenMiddleware,deleteCategory);
categoryRouter.post("/get-product-by-categoryId",getProductsByCategoryId);