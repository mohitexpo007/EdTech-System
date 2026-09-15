const express=require("express");
const router=express.Router();

const{capturePayment,verifySignature,sendPaymentSuccessEmail}=require("../controllers/Payments");
const {auth,isStudent}=require("../middlewares/auth")

router.post("/capturePayment",auth,capturePayment);

//we will create route for this and pass its url to razorpay for intercepting api
router.post("/verifySignature",auth,verifySignature);

router.post("/sendPaymentSuccessEmail",auth,sendPaymentSuccessEmail)

module.exports=router