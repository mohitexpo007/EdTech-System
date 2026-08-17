const express=require("express");
const router=express.Router();

const {auth}=require("../middlewares/auth");

const{deleteAccount,updateProfile}=require("../controllers/Profile");

//route for deleting profile 
router.delete("/deleteProfile",deleteAccount);
//route for updating profile
router.put("/updateProfile",auth,updateProfile);

module.exports=router