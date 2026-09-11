const express=require("express");
const router=express.Router();

const {auth}=require("../middlewares/auth");

const{deleteAccount,updateProfile,updateDisplayPicture,getEnrolledCourses}=require("../controllers/Profile");
const {changePassword}=require("../controllers/Auth")

//route for deleting profile 
router.delete("/deleteProfile",auth,deleteAccount);
//route for updating profile
router.put("/updateProfile",auth,updateProfile);

//updating profile picture
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

//change password
router.post("/changepassword",auth,changePassword)

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)


module.exports=router