const Course=require("../models/Course");
const Category=require("../models/category");
const User=require("../models/User");
const {uploadImageToCloudinary}=require("../utils/imageUploader");
require("dotenv").config();

//createCourse handler function
exports.createCourse=async(req,res)=>{
  try{
    //fetch data
    const {courseName, courseDescription,whatYouWillLearn,price,tag,category}=req.body;

    //get thumbnail
    const thumbnail=req.files.thumbnailImage;

    //validation
    if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !tag){
      return res.status(400).json({
        success:false,
        message:"All fields are required"
      })
    }

    //instructor details from db
    const userId=req.user.id;
    const instructorDetails=await User.findById(userId);

    if(!instructorDetails){
      return res.status(404).json({
        success:false,
        message:"Instructor Details not found"
      });
    }

    //check given tag is valid or not
    const categoryDetails=await Category.findById(category);
    if(!categoryDetails){
      return res.status(404).json({
        success:false,
        message:"Category Details not found"
      });
    }

    //upload to cloudinary
    const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

    //create an entry of new course
    const newCourse=await Course.create({
      courseName,
      courseDescription,
      instructor:instructorDetails._id,
      price,
      tag,
      whatYouWillLearn,
      category:categoryDetails._id,
      thumbnail:thumbnailImage.secure_url
    });

    //add the new course to the user schema of instructor
    await User.findByIdAndUpdate(
      {_id: instructorDetails._id},
      {
        $push:{
          courses: newCourse._id,
        }
      },
      {new:true}
    )

    //update tag schema
    await Category.findByIdAndUpdate(
      {_id: categoryDetails._id},
      {
        $push:{
          course: newCourse._id,
        }
      },
      {new:true}
    )

    return res.status(200).json({
      success:true,
      message:"Course Created Successfully",
      data:newCourse
    })
  }
  catch(error){
    console.error(error);
    return res.status(500).json({
      success:false,
      message:"Failed to create Course",
      error:error.message
    })
  }
}


//getAllCourses handler function
exports.getAllCourses=async(req,res)=>{
  try{
    const allCourses=await Course.find({},{course:true,price:true,thumbnail:true,
      instructor:true,
      ratingAndReview:true,
      studentsEnrolled:true
    }).populate("instructor").exec();

    return res.status(200).json({
      success:true,
      message:"Data fro all courses fetched successfully",
      data:allCourses,
    })

  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Cannot Fetch Course data",
      error:error.message
    })
  }
}

//getCourseDetails
exports.getCourseDetails=async (req,res)=>{
  try{
    //get id
    const{courseId}=req.body;
    //find course details
    const courseDetails=await Course.find({_id:courseId}).populate(
      {
        path:"instructor",
        populate:{
          path:"additionalDetails"
        }
      }
    )
    .populate("category")
    .populate("ratingAndReview")
    .populate({
      path:"courseContent",
      populate:{
        path:"subSection"
      }
    })
    .exec()

    //validation
    if(!courseDetails){
      return res.status(400).json({
        success:false,
        message:`Could not find the couse with ${courseId}`,
      })
    }

    return res.status(200).json({
      success:true,
      message:"Course details fetched successfully",
      data:courseDetails
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}