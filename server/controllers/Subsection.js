const SubSection=require("../models/SubSection");
const Section=require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../models/Course")

//createSubsection

exports.createSubSection=async(req ,res)=>{
  try{
    //fetch data from req body
    //extract file/video
    //validation
    //upload video to cloudinary
    //upldatte section with the subSection id
    //return response

    const {sectionId,title,description,courseId}=req.body;

    const video=req.files.video;
    if(!sectionId || !title ||!description || !video || !courseId){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    //secure url
    const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

     const SubSectionDetails=await SubSection.create({
      title:title,
      description:description,
      videoUrl:uploadDetails.secure_url 
     })

     const updatedSection=await Section.findByIdAndUpdate(sectionId,
      {$push:{
        subSection:SubSectionDetails._id 
      }},
      {new:true}
     ).populate("subSection");

     const course=await Course.findById(courseId)
      .populate({
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      })
      .exec();


     return res.status(200).json({
      success:true,
      message:"Sub Section Created Successfully",
      data:course
     })
  }
  catch(error){
    console.log("Subsection error",error)
    return res.status(500).json({
      success:false,
      message:"Internal Server Error",
      error:error.message
    })
  }
}

//updateSubSection
exports.updateSubSection=async (req,res)=>{
  try{
    const {subSectionId,title,description,courseId}=req.body;

    const video=req.files?.video;

    if(!subSectionId || !title || !description || !courseId){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    let SubSectionDetails;

    if(video){
      //secure url
      const uploadDetails=await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

      SubSectionDetails=await SubSection.findByIdAndUpdate(subSectionId,{
        title:title,
        description:description,
        videoUrl:uploadDetails.secure_url 
      },{new:true})
    }
    else{
      SubSectionDetails=await SubSection.findByIdAndUpdate(subSectionId,{
        title:title,
        description:description
      },{new:true})
    }

    const course=await Course.findById(courseId)
      .populate({
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      })
      .exec()

    return res.status(200).json({
      success:true,
      message:"Sub Section Updated Successfully",
      data:course
    })

  }
  catch(error){
    console.log("Update Subsection error",error)
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
    const {subSectionId,sectionId,courseId}=req.body;

    await Section.findByIdAndUpdate(sectionId,{
      $pull:{
        subSection:subSectionId
      }
    })

    await SubSection.findByIdAndDelete(subSectionId);

    const course=await Course.findById(courseId)
      .populate({
        path:"courseContent",
        populate:{
          path:"subSection"
        }
      })
      .exec();

    return res.status(200).json({
      success:true,
      message:"Subsection deleted",
      data:course
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