require("dotenv").config();
const Profile=require("../models/Profile");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader");


exports.updateProfile=async (req ,res)=>{
  try{
    //get data
    //get userId
    //validation
    //find profile
    //update profile
    //return response


    const {dateOfBirth="",about="",contactNumber,gender,countryCode}=req.body;

    const id=req.user.id;
    if(!contactNumber || !gender || !id || !countryCode){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    const userDetails=await User.findById(id);
    const profileId=userDetails.additionalDetails;

    const profileDetails=await Profile.findById(profileId);

    profileDetails.dateOfBirth=dateOfBirth;
    profileDetails.about=about;
    profileDetails.gender=gender;
    profileDetails.contactNumber=contactNumber;
    profileDetails.countryCode=countryCode;

    await profileDetails.save();

    return res.status(200).json({
      success:true,
      message:"Profile updated successfully",
      profileDetails
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal sever error",
      error:error.message
    })
  }
}

//deleteAccount
//ui has delete account at bottom
exports.deleteAccount=async (req ,res)=>{
  try{
    //get id
    //validation on id
    //delete profile
    //delete user
    //return response
    const id=req.user.id;

    const userDetails=await User.findById(id);

    if(!userDetails){
      return res.status(404).json({
        success:false,
        message:"User not found"
      })
    }
    const profileId=userDetails.additionalDetails;

    //delete profile
    await Profile.findByIdAndDelete({_id:profileId}); 

    //delete user
    await User.findByIdAndDelete({_id:id});

    //delete from enrolled courses 

    return res.status(200).json({
      success:true,
      message:"User deleted successfully"
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"User cannot be deleted",
      error:error.message
    })
  }
}


exports.updateDisplayPicture=async(req, res)=>{
  try{
    const {image}=req.files;

    if(!image){
      return res.status(404).json({
        success:false,
        message:"Image not selected"
      })
    }
    
    const img=await uploadImageToCloudinary(image,process.env.FOLDER_NAME);
    const userId=req.user.id;
    console.log(userId);

    const response=await User.findByIdAndUpdate(userId,{image:img.secure_url},{new:true});

    return res.status(200).json({
      success:true,
      message:"Profile Picture Updated successfully",
      user:response
    }
    )
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Could not update profile picture"
    });
  }
}