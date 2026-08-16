const Section = require("../models/Section");
const Course = require("../models/Course");

//createsection
exports.createSection=async(req , res)=>{
  try{
    //data fetch
    //data validation
    //create section
    //update course with section objectid
    //return response

    const{sectionName,courseId}=req.body;

    if(!sectionName || !courseId){
      return res.status(400).json({
        success:false,
        message:"Missing Properties"
      })
    }

    const newSection=await Section.create({sectionName});

    const updatedCourseDetails=await Course.findByIdAndUpdate(courseId,{
      $push:{
        courseContent:newSection._id
      },
    },{new:true})

    return res.status(200).json({
      success:true,
      message:"Section created successfully",
      updatedCourseDetails,
    })
  }

  catch(error){
    return res.status(500).json({
      success:false,
      message:"Unable to create Section, please try again later",
      error:error.message
    })
  }
}

//updatesection
exports.updateSection=async(req ,res)=>{
  try{
    //data input
    //data validation
    //update data
    //course has the section id so we dont need to update in course

    const{sectionName,sectionId}=req.body;
    if(!sectionName || !sectionId){
      return res.status(400).json({
        success:false,
        message:"Missing Properties"
      })
    }

    const section=await Section.findByIdAndUpdate(sectionId,
      {sectionName},{new:true}
    )

    return res.status(200).json({
      success:true,
      message:"Section updated successfully"
    })

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Unable to update Section, please try again later",
      error:error.message
    })
  }
}

//deleteSection
exports.deleteSection=async(req ,res)=>{
  try{
    //get id assuming we are sending id in params
    //find by id and delete
    //course object id remove=>not needed
    //return response

    const {sectionId}=req.params;
    await Section.findByIdAndDelete(sectionId);


    return res.status(200).json({
      success:true,
      message:"Section deleted"
    })

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:"Unable to delete Section, please try again later",
      error:error.message
    })
  }
}