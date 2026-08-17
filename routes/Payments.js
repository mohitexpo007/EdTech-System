const express=require("express");
const router=express.Router();

const{capturePayment,verifySignature}=require("../controllers/Payments");
const {auth,isStudent}=require("../middlewares/auth")

router.post("/capturePayment",auth,isStudent,capturePayment);

//we will create route for this and pass its url to razorpay for intercepting api
router.post("/verifySignature",verifySignature);