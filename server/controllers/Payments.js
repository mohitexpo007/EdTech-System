const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const {default:mongoose} = require("mongoose");
const { FaLastfm } = require("react-icons/fa");
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../templates/paymentSuccessEmail");

//capture the payment and initiate razorpay order
//single payment ke lie
{/*exports.capturePayment=async (req ,res)=>{
  //get courseId and userId
  //validation
  //valid courseId
  //valid courseDetail
  //user already pay for the same course verification
  //order create

  const {course_id}=req.body;
  const userId=req.user.id;

  if(!couse_id){
    return res.json({
      success:false,
      message:"Please provide valid course id"
    })
  }

  let course;
  try{
    course=await Course.findById(course_id);

    if(!course){
      return res.json({
        success:false,
        message:"Could not find the course"
      })
    }

    //user already paid for tje same course
    const uid=new mongoose.Types.ObjectId(userId);
    if(course.studentsEnrolled.includes(uid)){
      return res.status(200).json({
        success:false,
        message:"Student already emrolled"
      })
    }
  }
  catch(error){
    console.error(error);
    return res.status(500).json({
      success:false, 
      message:error.message
    })
  }


  //create order
  const amount=course.price;
  const currency="INR";

  const options={
    amount:amount*100,
    currency,
    reciept:Math.random(Date.now()).toString(),

    notes:{
      courseId:course_id,
      userId
    }
  }

  try{
    const paymentResponse=await instance.orders.create(options);
    console.log(paymentResponse);
    return res.status(200).json({
      success:true,
      courseName:course.courseName,
      courseDescription:course.courseDescription,
      thumbnail:course.thumbnail,
      orderId:paymentResponse.id,
      currency:paymentResponse.currency,
      amount:paymentResponse.amount
    })
  }
  catch(error){
    console.log(error);
    return res.json({
      success:false,
      message:"Could not initiate order"
    })
  }
}


//verify signature of razorpay and server webhook api
//we will create route for this and pass its url to razorpay for intercepting api
exports.verifySignature=async(req,res)=>{
  const webhookSecret="12345678";

  const signature=req.headers["x-razorpay-signature"];

  const shasum=crypto.createHmac("sha256",webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest=shasum.digest("hex");

  if(signature===digest){
    console.log("Payment is Authorized");

    const{courseId,userId}=req.body.payload.payment.entity.notes;

    try{
      //find the course and enroll student in it
      const enrolledCourse=await Course.findOneAndUpdate(
        {id:courseId},
        {$push:{studentsEnrolled:userId}},
        {new:true}
      );

      if(!enrolledCourse){
        return res.status(500).json({
          success:false,
          message:"Course not found"
        })
      }
      console.log(enrolledCourse);

      //find the student and add course to list of courses
      const enrolledStudent=await User.findOneAndUpdate(
                                                        {id:userId},
                                                        {$push:{courses:courseId}},
                                                        {new:true}
      );

      console.log(enrolledStudent);


      //mail send krdo
      const emailResponse=await mailSender(enrolledStudent.email,
                                            "Congratulations from Codehelp",
                                            "Congratulations you are onboarded into new Codehelp Course"
      );
      console.log(emailResponse);
      return res.status(200).json({
        success:true,
        message:"Signature is verified and Course Added"
      });
    }

    catch(error){
      return res.status(500).json({
        success:false,
        message:error.message
      })
    }
  }

  else{
    return res.status(400).json({
      success:false,
      message:"invalid payment request"
    })
  }
}*/}


//multiple payments ke lie
exports.capturePayment = async(req,res)=>{

  //sbse pehle sare courses ki id jo bhi kharid rha and us person ki userId jo kharid rha
  const {courses}=req.body
  const userId=req.user.id;

  if(courses.length===0){
    return res.json({success:false, message:"Please provide Course Id"})
  }

  //total amount calculate kro sare selected courses
  let totalAmount=0;

  for(const course_id of courses){
    let course;
    try{
      course=await Course.findById(course_id);
      if(!course){
        return res.status(200).json({success:false,message:"Could not find the course"})
      }

      //check kro user already enrolled to nhi hai us course me
      const uid=new mongoose.Types.ObjectId(userId);
      if(course.studentsEnrolled.includes(uid)){
        return res.status(200).json({success:false,message:"Student is already enrolled in the course"})
      }

      totalAmount+=course.price;
    }
    catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,message:error.message
      })
    }
  }

  //ab order create krne ke lie options ki need hoti hai vo create krne hote hai
  const options={
    amount:totalAmount*100,   
    currency:"INR",
    receipt:Math.random(Date.now()).toString()
  }

  //ab is option ka use krke order create krenge
  try{
    const paymentResponse=await instance.orders.create(options);
    res.json({
      success:true,
      message:paymentResponse
    })
  }
  catch(error){
     console.log(error);
     return res.status(500).json({
      success:false,
      message:"Could not initiate order"
     })
  }

}

//ab payment verification krenge abhi order initiate kra tha
exports.verifySignature=async(req,res)=>{
  const razorpay_order_id=req.body?.razorpay_order_id;
  const razorpay_payment_id=req.body?.razorpay_payment_id;
  const razorpay_signature=req.body?.razorpay_signature;
  const courses=req.body?.courses;
  const userId=req.user.id;

  if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
    return res.status(200).json({success:false,message:"Payment failed"})
  }

  //in steps ke piche logic nhi hai ab order id ke bad pipe operator se add krne hai
  let body=razorpay_order_id + "|" +razorpay_payment_id;
  const expectedSignature=crypto
  .createHmac("sha256",process.env.RAZORPAY_SECRET)
  .update(body.toString())
  .digest("hex")

  if(expectedSignature ===  razorpay_signature){
    //enroll krwao student ko
    await enrollStudent(courses,userId,res);

    //return res
    return res.status(200).json({success:true,message:"Payment Verified"})
  }
  return res.status(200).json({success:false,message:"Payment Failed"})
}

const enrollStudent=async(courses,userId,res)=>{
  if(!courses || !userId){
    return res.status(400).json({success:false,message:"Please Provide data for Courses and UserID"})
  }

  //courses contains all the ids of courses and this loop means take each element or id named course_id or whatever we want to give and and traverse one by one
  for(const course_id of courses){
    try{
      //course ko find kro and uske studentEnroll array me student enroll kro
      const enrolledCourse=await Course.findByIdAndUpdate(
        course_id,
        {$push:{studentsEnrolled:userId}},
        {new:true}
      )

      if(!enrolledCourse){
        return res.status(500).json({success:false,message:"Course not found"})
      }

      //find the student and the course to list of enrolledCourses
      const enrolledStudent=await User.findByIdAndUpdate(userId,
        {$push:{
          courses : course_id
        }},{new:true}
      )

      if(!enrolledStudent){
        return res.status(404).json({success:false,message:"Student not found"})
      }

      //mail send krdo student ko
      const emailResponse=await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled int ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(enrolledCourse.courseName,`${enrolledStudent.firstName}`)
      )

      console.log("Email sent Successfully",emailResponse?.response);
    }
    catch(error){
      console.log(error);
      return res.status(500).json({success:false,message:error.message})
    }
  }

}


exports.sendPaymentSuccessEmail=async(req,res)=>{
  const{orderId,paymentId,amount}=req.body;

  const userId=req.user.id;

  if(!orderId || !paymentId || !amount || !userId){
    return res.status(400).json({success:false,message:"Please provide all the fields"})
  }

  try{
    //student ki email id dhundo or mail send kro
    const enrolledStudent=await User.findById(userId);

    if(!enrolledStudent || !enrolledStudent.email){
      return res.status(400).json({success:false,message:"Student email not found"})
    }

    await mailSender(
      enrolledStudent.email,
      `Payment Recieved`,
      paymentSuccessEmail(`${enrolledStudent.firstName}`,amount/100,orderId,paymentId)
    );

    return res.status(200).json({success:true,message:"Payment success email sent successfully"})
  }
  catch(error){
    console.log("error in sending email",error);
    return res.status(500).json({success:false,message:"Could not send email"});
  }
}