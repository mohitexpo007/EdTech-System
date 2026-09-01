
const express=require("express");
const app=express();

const userRoutes=require("./routes/User")
const profileRoutes=require("./routes/Profile")
const paymentRoutes=require("./routes/Payments")
const courseRoutes=require("./routes/Course")

const dbConnect=require("./config/database");
const cookieParser=require("cookie-parser");

//cors for frontend and backend connection
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload=require("express-fileupload")
require("dotenv").config();

const PORT=process.env.PORT || 4000;

//database connection
dbConnect();
//middlewares
app.use(express.json());
app.use(cookieParser());

//for entertaining frontend requests from 3000 to backend 
app.use(
  cors({
    //jo bhi request frontend se aa rhi
    origin:"http://localhost:3000",
    credentials:true
  })
)

//file upload middleware
app.use(
  fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
  })
)

//cloudinary connection
cloudinaryConnect();

//routes mounting
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);

//default route

app.get("/",(req,res)=>{
  return res.json({
    success:true,
    message:"Your server is up and running..."
  })
});

app.listen(PORT,()=>{
  console.log(`App is running at ${PORT}`)
})