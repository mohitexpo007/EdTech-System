const Tag=require("../models/tags");

exports.createTag=async(req ,res)=>{
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
    const tagDetails=await Tag.create({
      name:name,
      description:description
    });
    console.log(tagDetails);

    return res.status(200).json({
      success:true,
      message:"tag created successfully"
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

exports.showAlltags=async(req,res)=>{
  try{
    const allTags=await Tag.find({},{name:true,description:true});
    return res.status(200).json({
      success:true,
      message:"All tags returned successfully"
    })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}