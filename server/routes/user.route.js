import Router from "express";
import { accessTokenUpdate, fetchUserDetails, forgotPasswordController, loginUserController, logOutController, registerUserController, updatePasswordController, updateUserDetailsController, verifyOtpController, verifyUserController } from "../controllers/auth.controller.js";
import { authTokenMiddleware } from "../middleware/authToken.middleware.js";

const userRouter = Router();
userRouter.post("/register",registerUserController);
userRouter.post("/verify-email",verifyUserController);
userRouter.post("/login",loginUserController);
userRouter.get("/logout",authTokenMiddleware, logOutController);
userRouter.put("/update-user", authTokenMiddleware, updateUserDetailsController);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.put("/verify-otp",verifyOtpController);
userRouter.put("/update-password",updatePasswordController);
userRouter.post("/update-access-token", accessTokenUpdate);
userRouter.get("/fetch-user-details", authTokenMiddleware,fetchUserDetails);


export default userRouter;