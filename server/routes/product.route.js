import { Router } from "express";
import { authTokenMiddleware } from "../middleware/authToken.middleware.js";
import { getProducts, uploadProduct, getProductById} from "../controllers/product.controller.js";

export const productRouter = Router()
productRouter.post("/upload-product",authTokenMiddleware,uploadProduct);
productRouter.post("/get-products",getProducts);
productRouter.post("/get-products-by-id",getProductById);
productRouter.post("/get-products-by-id",getProductById);