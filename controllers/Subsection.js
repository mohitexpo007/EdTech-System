const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//createSubsection

exports.createSubSection=async(req ,res)=>{
  try{
    //fetch data from req body
    //extract file/video
    //validation
    //upload video to cloudinary
    //upldatte section with the subSection id
    //return response

    const {sectionId,title,timeDuration,description}=req.body;

    const video=req.files.videoFile;
    if(!sectionId || !title || !timeDuration ||!description || !video){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    //secure url
    const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

     const SubSectionDetails=await SubSection.create({
      title:title,
      timeDuration:timeDuration,
      description:description,
      videoUrl:uploadDetails.secure_url 
     })

     const updatedSection=await Section.findByIdAndUpdate(sectionId,
      {push:{
        subSection:SubSectionDetails._id 
      }},
      {new:true}
     );


     return res.status(200).json({
      success:true,
      message:"Sub Section Created Successfully",
      updatedSection
     })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal Server Error",
      error:error.message
    })
  }
}

//updateSubSection

exports.updatedSubSection=async (req,res)=>{
  try{
    const {subSectionID,title,timeDuration,description}=req.body;

    const video=req.files.videoFile;
    if(!subSectionId || !title || !timeDuration ||!description || !video){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    //secure url
    const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

     const SubSectionDetails=await SubSection.findByIdAndUpdate(subSectionID,{
      title:title,
      timeDuration:timeDuration,
      description:description,
      videoUrl:uploadDetails.secure_url 
     })

     return res.status(200).json({
      success:true,
      message:"Sub Section Created Successfully",
      SubSectionDetails
     })

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal Server Error",
      error:error.message
    })
  }
}

//deleteSubSection
exports.deleteSubSection=async (req ,res)=>{
  try{
    const {SubSectionId}=req.body;

    await SubSection.findByIdAndDelete(SubSectionId);
    return res.status(200).json({
      success:false,
      message:"Subsection deleted"
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Internal Server Error",
      error:error.message
    })
  }
}