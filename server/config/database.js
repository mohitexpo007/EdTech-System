const mongoose=require("mongoose");
require("dotenv").config();

const dbConnect=()=>{
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>console.log("DB connection successful"))
  .catch((error)=>{
    console.log("DB connection issue");
    console.log(error);
    process.exit(1);
  })
}

module.exports=dbConnect;