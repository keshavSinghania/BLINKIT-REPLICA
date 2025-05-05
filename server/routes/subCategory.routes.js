import { Router } from "express";
import { authTokenMiddleware } from "../middleware/authToken.middleware.js";
import { addSubCategory, deleteSubCategory, editSubCategory, getSubCategory } from "../controllers/subCategory.controller.js";
import { getProductBySubCategoryId } from "../controllers/product.controller.js";

export const subCategoryRouter = Router();
subCategoryRouter.put("/upload-sub-category",authTokenMiddleware,addSubCategory);
subCategoryRouter.get("/get-sub-category",getSubCategory);
subCategoryRouter.delete("/delete-sub-category",authTokenMiddleware,deleteSubCategory);
subCategoryRouter.put("/edit-sub-category",authTokenMiddleware,editSubCategory);
subCategoryRouter.post("/get-product-by-subCategoryId",getProductBySubCategoryId);