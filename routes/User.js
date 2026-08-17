const express=require("express");
const router=express.Router();

const {login,sendOTP,signUp,changePassword}=require("../controllers/Auth");
const {resetPasswordToken,resetPassword}=require("../controllers/ResetPassword");
const {auth}=require("../middlewares/auth");

//route for user login
router.post("/login",login);

//route for user signup
router.post("/signUp",signUp);

//route for sending otp for user
router.post("/sendOTP",sendOTP);

//route for changing the password
router.post("changePassword",auth,changePassword);

//route for generating a reset password token
router.post("/reset-password-token",resetPasswordToken);

//route for resetting users password after verification
router.post("/reset-password",resetPassword);

module.exports=router