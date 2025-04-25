import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cookie from "cookie-parser"
import { accessTokenGenerator, refreshTokenGenerator } from "../utils/jwtGenertor.js";
import { sendEmail } from "../utils/sendEmail.js";
import { json, text } from "express";
import { generateOTP } from "../utils/generateOtp.js";
import jwt from "jsonwebtoken";
import { registrationTemplate } from "../utils/registrationEmailTemp.js";
import { sendOtpEmailTemp } from "../utils/sendOtpEmailTemp.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";


export const registerUserController = async(req,res)=>{
   try {
    const {name, email, password} = req.body;
    
    // checking for null value
    if(!name || !email || !password){
        return res.status(400).json({
            message:"Please enter the complete details",
            error: true,
            success: false
        });
    }

    //checking if user already exists in DB
    const userData = await UserModel.findOne({email});
    if(userData){
        return res.status(400).json({
            message: "Your account already exists. Please log in instead of registering.",
            error: true,
            success: false
        });
    }
    //hashing the password before storing it into database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
   
    //now storing hashed password and all others details into database
    const payload = {
        name,
        email,
        password:hashedPassword
    };
    const user= await UserModel.create(payload);
    if (!user) {
        return res.status(500).json({
          message: "User registration failed. Please try again.",
          error: true,
          success: false,
          verifyEmail: emailResponse.message
        });
      }

      const verifyEmailUrl = `${process.env.FRONTEND_URI}/email-verify?code=${user._id}`;
      //sending email
      const emailResponse = await sendEmail(
          {to:email,
           subject: "MyKart email verification",
           html:registrationTemplate(name,verifyEmailUrl)
          }
      )
    return res.status(201).json({
        message: "Successfully registered",
        error: false,
        success: true
    })
   } 
   catch (error) {

    return res.status(500).json({
        error:true,
        success: false,
        message: error.message || error
    })
   }
}

export const loginUserController = async(req,res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({
                message:"Please enter all the required details to proceed with login.",
                error: true,
                success: false
            })
        }
        const user= await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Please register your account before logging in.",
                error: true, 
                success: false
            })
        }
        //checking entered password is correct or not
        const allowAccess = await bcrypt.compare(password, user.password);
        if(!allowAccess){
            return res.json({
                message: "Incorrect password. Please try again.",
                error: true,
                success: false
            })
        }

        //checking if id is suspended
        if(user.status == "Suspended"){
            return res.status(400).json({
                message:"Id is suspended contact to admin",
                error: true,
                success: false
            })
        }

        //checking user verified his/her email id or not 
        if(!user.verify_email){
            return res.status(400).json({
                message: "Please verify your email before logging in.",
                error: true,
                success: false
            })
        }
        const accessToken = accessTokenGenerator(user._id);
        const refreshToken = refreshTokenGenerator(user._id);

        //saving refresh token to the database
        await UserModel.findByIdAndUpdate (user._id, {
            refresh_token:refreshToken});

        res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true, 
            sameSite: "Strict"
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: true, 
            sameSite: "Strict"
        });

        return res.status(200).json({
            message:"Successfully logged in",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const verifyUserController = async(req,res)=>{
    const {code} = req.body;
    try {
        const data =await UserModel.findOne({_id:code});
        if(!data){
            return res.status(500).json({
                message: "Wrong link clicked to verify email",
                error: true,
                success: false
            })
        }
        const updatedUser = await UserModel.updateOne({_id:code},{verify_email:true});
        return res.status(200).json({
            message: "Successfully verified your account",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const logOutController = async(req,res)=>{
    try {
        const userId = req.userId;
        //removing refresh token from database
        UserModel.findByIdAndUpdate(userId,{refresh_token:""});

        //clearing cookies
        const cookieOption = {
            httpOnly: true,
            secure : true,
            sameSite : "None"
        }
        res.clearCookie("access_token",cookieOption);
        res.clearCookie("refresh_token",cookieOption);

        return res.status(201).json({
            message: "Successfully logged out",
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateUserDetailsController = async(req, res)=>{
    try {
        const userId = req.userId; //from auth middleware
        const {name, email, password, mobile} = req.body;
        if(!name && !email && !password && !mobile){
            return res.status(400).json({
                message: "Nothing to update",
                error: true,
                success: false
            })
        }
        let hashedPassword = "";
        //hashing password 
        if(password){
           hashedPassword = await bcrypt.hash(password,10);
        }

        const updateFields = {};
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (password) updateFields.password = hashedPassword;
        if (mobile) updateFields.mobile = mobile;

        const updateUser = await UserModel.updateOne(
            { _id: userId },
            { $set: updateFields }
        );
        return res.status(201).json({
            message: "Successfully updated given details",
            error: false,
            success: true,
            data: updateUser
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true, 
            success: false
        })
    }
}

export const forgotPasswordController = async(req,res)=>{
    try {
        const {email} = req.body;

        //checking required details
        if(!email){
            return res.status(400).json({
                message : "Please provide required details",
                error : true,
                success : false
            })
        }

        //checking user exists or not
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "User not valid",
                error : true,
                success : false
            })
        }
        //if user exists then sending otp to the email
        const otp = generateOTP();
            await sendEmail({
                to : user.email,
                name: user.name,
                html: sendOtpEmailTemp(user.name , otp)
            });

        //saving otp and expiry time(1hr) to DB
        const forget_password_expiry = Date.now() + 60 * 60 * 1000;
        await UserModel.findByIdAndUpdate(user._id,{forgot_password_otp:otp, forget_password_expiry})
        return res.json({
            message : "Otp sent successfully",
            error : false,
            success : true
        })
    } catch(error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
};

export const verifyOtpController = async(req,res)=>{
    try {
        const {otp, email} = req.body;

        if(!otp || !email){
            return res.status(400).json({
                message : "Please provide required field",
                error : true, 
                success : false
            })
        };
    
        //checking user even exists?
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "user not valid",
                error : true,
                success: false
            })
        }
    
        //verifing otp
        if(otp !== user.forgot_password_otp){
            return res.status(400).json({
                message : "Invalid Otp",
                error: true,
                success :false
            })
        }
    
        //verifing otp expire??/
        const currectTime = Date.now();
        if(currectTime > user.forget_password_expiry){
            return res.status(400).json({
                message : "OTP expired",
                error : true,
                success : false
            })
        };
    
        return res.json({
            message : "OTP verified successfully",
            error : false,
            success :true
        })
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true, 
            success : false
        })
    }
}

export const updatePasswordController = async(req,res)=>{
    try {
        const {email, newPassword, confirmPassword} =req.body;

        if(!email || !newPassword || !confirmPassword){
            return res.status(400).json({
                message : "Please provide required detail",
                error : true,
                success : false
            })
        }
         if(newPassword !== confirmPassword){
            return res.status(400).json({
                message : "New password doesn't matched with confirm password",
                error :true,
                success :false
            })
         }

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message : "Invalid User",
                error : true,
                success :false
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        //updating the database password with new password 
        user.password = hashedPassword;
        await user.save()

        return res.json({
            message : "Password has been successfully updated",
            error : false,
            success :true
        })

    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const accessTokenUpdate = async(req,res)=>{
    try {
        const refreshToken = req.cookies.refresh_token || req.headers.authorization?.split(" ")[1];

        if(!refreshToken){
            return res.status(400).json({
                message : "havenot received refresh token",
                error: true ,
                success :false
            })
        }

        const verifyToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
        if(!verifyToken){
            return res.status(400).json({
                message : "invalid refresh token",
                error: true, 
                success: false
            })
        }
        const userId = verifyToken.id;
        
        //generating new access token
        const newAccessToken = accessTokenGenerator(userId);
        //sending new access token as cookie
        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: true, 
            sameSite: "Strict"
        });

        return res.json({
            message : "Successfully sent new access token",
            error : false,
            success : true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success :false
        })
    }
}

export const fetchUserDetails = async(req,res)=>{
    try {
        //storing user id got from the authmiddleware
        const userId = req.userId;
        if(!userId) {
            return res.status(400).json({
                message : "not received user id from middleware",
                error : true,
                success : false
            })
        };
        const user = await UserModel.findById(userId).select("-password -forgot_password_otp -forget_password_expiry");
        if(!user){
            return res.status(400).json({
                message : "Error while extracting user information from DB",
                error : true,
                success : false
            })
        };
        return res.json({
            message : "Sucessfully fetched user data",
            error : false,
            success : true,
            data : user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success :false
        })
    }
}

//controller to receive image convert into cloudinary url and stores in database
export const uploadAvatarController = async (req, res) => {
    try {
      const image = req.file; // Extracted by multer
      const userId = req.userId; // Provided by auth middleware
  
    //   console.log("Received Image:", image);
  
      // Upload to Cloudinary
      const cloudinaryUpload = await uploadImageCloudinary(image);
  
      const cloudinaryUrl = cloudinaryUpload?.url;
    //   console.log(cloudinaryUrl)
  
      if (!cloudinaryUrl) {
        return res.status(400).json({
          message: "Error while uploading image to Cloudinary",
          error: true,
          success: false,
        });
      }
  
      // Update user's avatar in DB
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { avatar: cloudinaryUrl },
      );
  
      return res.status(200).json({
        message: "Successfully uploaded avatar",
        success: true,
        data: {
          _id: updatedUser._id,
          avatar: updatedUser.avatar,
        },
      });
  
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Something went wrong",
        error: true,
        success: false,
      });
    }
  };
  