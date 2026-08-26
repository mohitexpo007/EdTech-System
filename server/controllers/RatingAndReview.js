//createRating
//getAverageRating
//getAllRating
const RatingAndReview=require("../models/RatingAndReview");
const Course=require("../models/Course");
const { aggregate } = require("../models/Profile");

exports.createRating=async (req,res)=>{
  try{
    //get user id
    //fetch data from req body
    //check if user is enrolled in course or not
    //check if user already reviewed the course 
    //create rating and review
    //update course 


    const {courseId,rating,review}=req.body;
    const userId=req.user.id;

    const courseDetails=await Course.findOne(
                                    {_id:courseId,
                                      studentsEnrolled:{$elemMatch:{$eq:userId}}
                                    }


    )

    if(!courseDetails){
      return res.status(404).json({
        success:false,
        message:"Student not enrolled in the course"
      })
    }

    const alreadyReviewed=await RatingAndReview.findOne({
      user:userId,
      course:courseId,
    });


    if(alreadyReviewed){
      return res.status(403).json({
        success:false,
        message:"Course is already reviewed by the user"
      })
    }

    const ratingandreview=await RatingAndReview.create({rating,review,course:courseId,user:userId});

    const updatedCourseDetails=await Course.findByIdAndUpdate(
                                {_id:CourseId},
                                {$push:{ratingAndReview:ratingandreview._id}},
                                {new:true}
    );

    console.log(updatedCourseDetails);
    return res.status(200).json({
      success:true,
      message:"Rating and review submitted",
      ratingandreview
    })

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


//getAverageRating
exports.getAverageRating=async(req,res)=>{
  try{
    //get course id
    //calculate average rating
    //return average rating

    const courseId=req.body.courseId;

    //calculate average rating
    const result=await RatingAndReview.aggregate([
      {$match:{
        course: new mongoose.Types.ObjectId(courseId),
      }},
      {$group:{
        _id:null,
        averageRating:{$avg:"$rating"}
      }}
    ])

    if(result.length>0){
      return res.status(200).json({
        success:true,
        //avg function ek array return krega result me and key value hai har index pr

        averageRating: result[0].averageRating,
      })
    }
    //if no review rating exist
    else{
      return res.status(200).json({
        success:true,
        message:"Average rating is 0, no ratings till now",
        averageRating:0
      })
    }
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


//getAllRating
exports.getAllRating=async(req,res)=>{
  try{

    //direct all reviews from db
    const allReviews=(await RatingAndReview.find({})).toSorted({rating:"desc"})
    .populate({
      path:"user",
      //only below fields required
      select:"firstName lastName email image"
    })
    .populate({
      path:"course",
      select:"courseName"
    }).exec();

    return res.status(200).json({
      success:true,
      message:"All reviews fetched successfully",
      data:allReviews
    })

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}