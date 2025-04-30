import { Router } from "express";
import { authTokenMiddleware } from "../middleware/authToken.middleware.js";
import { getProducts, uploadProduct } from "../controllers/product.controller.js";

export const productRouter = Router()
productRouter.post("/upload-product",authTokenMiddleware,uploadProduct);
productRouter.post("/get-products",getProducts);