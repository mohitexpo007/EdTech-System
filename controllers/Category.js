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

exports.showAllcategory=async(req,res)=>{
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