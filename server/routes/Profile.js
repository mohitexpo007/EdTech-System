const express=require("express");
const router=express.Router();

const {auth}=require("../middlewares/auth");

const{deleteAccount,updateProfile,updateDisplayPicture}=require("../controllers/Profile");

//route for deleting profile 
router.delete("/deleteProfile",auth,deleteAccount);
//route for updating profile
router.put("/updateProfile",auth,updateProfile);

//updating profile picture
router.put("/updateDisplayPicture",auth,updateDisplayPicture);

module.exports=router