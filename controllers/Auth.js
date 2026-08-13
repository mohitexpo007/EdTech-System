const User=require("../models/User");
const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const Profile=require("../models/Profile");
const jwt=require("jsonwebtoken");
require("dotenv").config();

//send OTP
exports.sendOTP=async(req ,res )=>{

  try{
    //fetch email from
      const {email}=req.body;

      //check if user already exist
      const checkUserPresent=await User.findOne({email});

      //if user already exist return response
      if(checkUserPresent){
        return res.status(401).json({
          success:false,
          message:"User already registered",
        })
      }

      //generate otp
      var otp=otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
      });

      //check unique otp or not in db
      const result=await OTP.findOne({otp:otp});

      while(result){
        otp=otpGenerator(6,{
          upperCaseAlphabets:false,
          lowerCaseAlphabets:false,
          specialChars:false
        });
        result=await OTP.findOne({otp:otp});
      }
      console.log("OTP generated ", otp);

      //creating a optPayload using otp model for db insertion
      const otpPayload={email,otp};

      //create an entry in db for OTP
      const otpBody=await OTP.create(otpPayload);
      console.log(otpBody);

      //return response successfully
      res.status(200).json({
        success:true,
        message:"OTP sent successfully",
        otp
      })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.nessage
    })
  }
   
}

//signup 
exports.signUp=async(req,res)=>{

  try{
      //data fetch from request body
      //validate data
      //2 password matching
      //check user already exist or not

      //find most recent OTP stored for the user
      //validate OTP

      //hash password
      //entry create in DB

      //return res

      //step1
      const{firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body;

      if(!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !contactNumber || !otp){
        return res.status(403).json({
          success:false,
          message:"All fields are required"
        })
      }

      if(password!==confirmPassword){
        return res.status(400).json({
          success:false,
          message:"Password and Confirm Password does not match please check"
        })
      }

      const existingUser=await User.findOne({email});
      if(existingUser){
        return res.status(400).json({
          success:false,
          message:"User is already registered"
        });
      }


      //step2 otp matching
      const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
      console.log("Recent OTP ",recentOTP); 

      if(recentOtp.length==0){
        //otp not found
        return res.status(400).json({
          success:false,
          message:"OTP not found"
        })
      }else if(otp !== recentOtp){
        //invalid otp
        return res.status(400).json({
          success:false,
          message:"Invalid OTP"
        })
      }

      //step 3 hashing and storing in db
      const hashedPassword=await bcrypt.hash(password,10);

      //additionaldetals consist of Profile model so first we create it
      //additional detail stores the reference of profile so db me save kro
      const profileDetails=await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
      }) 

      //in otp we stored email,otp in  otppayload here we passed directly so there are 2 ways of doing this
      const user=await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
      })

      return res.status(200).json({
        success:true,
        message:"User is registered Successfully",
        user
      })

  }

  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"User cannot be registered Please try again"
    })
  }

}

//Login
exports.login=async(req,res)=>{
  try{

    //get data from req body
    //validate data
    //user check exist or not
    //generate JWT, after password matching
    //create cookie and send response

     const {email,password}=req.body;
     //validation
     if(!email || !password){
      return res.status(403).json({
        success:false,
        message:"All fields are required please try again"
      });

      const user=await User.findOne({email}).populate("additionalDetails");
      if(!user){
        return res.status(401).json({
          success:false,
          message:"User is not registered, please signup first"
        })
      }

      //generate jwt after password matching
      if(await bcrypt.compare(password,user.password)){
        //jwt generation
        const payload={
          email:user.email,
          id:user._id,
          accountType:user.accountType
        }

        const token=jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn:"2h",

        });
        user.token=token;
        user.password=undefined;
      }

      //create cookie and send response
      const options={
        expires:new Date(Date.now()+3*24*60*60*1000),
        httpOnly:true,
      }
      res.cookie("token",toke,options).status(200).json({
        success:true,
        token,
        user,
        message:"Logged in successfully"
      })

     }
     else{
      return res.status(401).json({
        success:false,
        message:"Password is Incorrect"
      })
     }
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Login failure please try again"
    })
  }
}

//changePassword
exports.changePassword=async(req,res )=>{

  try{
    //get data from req body
    //get oldPassword newPassword confirm password
    //validation

    //update password in db
    //send mail-password updated
    //return response


    const {email,oldPassword,newPassword,confirmPassword}=req.body;

    if(!oldPassword || !newPassword || !confirmPassword){
      return res.status(400).json({
        success:false,
        message:"All fields are required please try again"
      })
    }else if(oldPassword==newPassword){
      return res.status(400).json({
        success:false,
        message:"Please enter different password than previous one"
      })
    }else if(newPassword!==confirmPassword){
      return res.status(400).json({
        success:false,
        message:"Confirm Password does not match with new Password"
      })
    }

    //update password in db
    const user=await User.findOne({email});

    //hash confirmPassword
    const hashednewPassword=await bcrypt.hash(confirmPassword,10);

    //find in db and update password
    const updatedPassword=await User.findByIdAndUpdate(
      {_id:user._id},
      {password:hashednewPassword},
    )

    return res.status(200).json({
      success:true,
      message:"Password updated Successfully"
    });
  }
  
  catch(error){

    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Password Updation Failed"
    })
  }

}