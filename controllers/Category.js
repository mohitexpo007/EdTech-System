const Category=require("../models/category");

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
      message:"All Category returned successfully"
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
    const selectedCategory=await Category.findById(categoryId).populate("courses").exec();

    //validate
    if(!selectedCategory){
      return res.status(404).json({
        success:false,
        message:"Data not found"
      })
    }

    //get different category courses too for suggestion
    const differentCategories=await Category.find({
      //ne is not equal to this category id
      _id:{$ne:categoryId},
    }).populate("courses").exec();

    //top selling courses


    return res.status(200).json({
      success:true,
      data:{
        selectedCategory,
        differentCategories,
      }
    });

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}