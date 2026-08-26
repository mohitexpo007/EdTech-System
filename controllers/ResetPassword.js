
const User=require("../models/User");
const mailSender=require("../utils/mailSender");
const bcrypt=require("bcrypt");
const crypto=require("crypto")

//resetPasswordtoken
exports.resetPasswordToken=async(req ,res)=>{
  try{
    //get email from req body
    //check user for email, validation
    //link create kro
    //generate token
    //add field for token in the user model
    //update user by adding token and expiration time
    //create url
    //send mail containing the url

    const email=req.body.email;
    const user=await User.findOne({email:email});
    if(!user){
      return res.json({
        success:false,
        message:"Your Email is not registered with us"
      });
    }

    //token generate
    const token=crypto.randomUUID();

    //update and add it in user
    const updatedDetails=await User.findOneAndUpdate(
      {email:email},
      {
        token:token,
        resetPasswordExpires:Date.now()+5*60*1000
      },
    { new:true}
    )

    const url=`http://localhost:3000/update-password/${token}`

    //send mail containing the URL
    await mailSender(email,
                      "Password Reset Link",
                      `Password Reset List: ${url}`
                        );

    return res.status(200).json({
      success:true,
      message:"Email sent successfully, please check email and change password"
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Something went wrong while reseting password"
    })
  }
}


//resetPassword
exports.resetPassword=async (req,res)=>{
  try{
    //data fetch
    //validation
    //get userDetails from db using token => the above function updated the user and added the token in it so now using this token when user clicked on mail link the db searches the data for this user
    //if no extry - invalid 
    //token time check
    //hash password

    const{password,confirmPassword,token}=req.body;
    //frontend inserted token in body above

    //validation
    if(password!=confirmPassword){
      return res.json({
        success:false,
        message:"Password not Matching"
      })
    }

    //get userdetails from db using token
    const userDetails=await User.findOne({token:token});

    //if no entry->invalid token
    if(!userDetails){
      return res.json({
        success:false,
        message:"Token is invalid"
      })
    }
    //token time check
    if(userDetails.resetPasswordExpires<Date.now()){
      return res.json({
        success:false,
        message:"Token is expired please regenerate your token "
      });
    }

    const hashedpassword=await bcrypt.hash(password,10);

    await User.findOneAndUpdate(
      {token:token},
      {password:hashedpassword},
      {new:true}
    );

    return res.status(200).json({
      success:true,
      message:"Password reset successfully"
    })

  }
  catch(error){
    return res.status(400).json({
      success:false, 
      message:"Something went wrong while reseting password"
    })
  }
}