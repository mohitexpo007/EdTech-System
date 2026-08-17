const {instance}=require("../config/razorpay");
const Course=require("../models/Course");
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");

//capture the payment and initiate razorpay order
exports.capturePayment=async (req ,res)=>{
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
}