const Category=require("../models/category");
const mongoose = require("mongoose");

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

exports.createCategory=async(req ,res)=>{
  try{
    //fetch data
    const {name,description}=req.body;
    //validation
    if(!name || !description){
      return res.status(400).json({
        suceess:false,
        message:"All Fields are required"
      })
    }

    //create entry in db
    const CategoryDetails=await Category.create({
      name:name,
      description:description
    });
    console.log(CategoryDetails);

    return res.status(200).json({
      success:true,
      message:"category created successfully"
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

//getAlltags handler functionn

exports.showAllcategories=async(req,res)=>{
  try{
    const allCategory=await Category.find({},{name:true,description:true});
    return res.status(200).json({
      success:true,
      message:"All Category returned successfully",
      data:allCategory
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}

//category page details
//will be used in ui for category based courses
exports.categoryPageDetails=async (req,res)=>{
  try{
    //get category
    //fetch all the courses corresponding to this category
    //validation if no course
    //get courses for different categories  

    const {categoryId}=req.body;

    if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success:false,
        message:"Invalid category ID"
      })
    }

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReview",
        populate: {path:"instructor"},
      })
      .exec()


    //validate
    console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }

    // Handle the case when there are no courses
    if (selectedCategory.course.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }

    //get different category courses too for suggestion
   // const differentCategories=await Category.find({
   //   //ne is not equal to this category id
   //   _id:{$ne:categoryId},
   // }).populate("courses").exec();

    //top selling courses

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })

    let differentCategory = null;

    if (categoriesExceptSelected.length > 0) {
      const randomCategory =
        categoriesExceptSelected[
          getRandomInt(categoriesExceptSelected.length)
        ]

      differentCategory = await Category.findOne({
        _id: randomCategory._id,
      })
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: {path:"instructor"},
        })
        .exec()
    }

    console.log()

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: {path:"instructor"},
      })
      .exec()

    {/*flatMap() performs two operations:
          Maps each category to its courses array.
          Combines all those arrays into one single array. */}
    const allCourses = allCategories.flatMap((category) => category.course)

    const mostSellingCourses = allCourses
      .sort(
        (a, b) =>
          (b.studentsEnroled?.length || 0) -
          (a.studentsEnroled?.length || 0)
      )
      .slice(0, 10)


    return res.status(200).json({
      success:true,
      data:{
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      }
    });

  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}