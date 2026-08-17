const express=require("express");
const router=express.Router();

//importing controllers

//course controller
const{createCourse,getAllCourses,getCourseDetails}=require("../controllers/Course");

//categories controller
const {showAllCategories,createCategory,categoryPageDetails}=require("../controllers/Section");

//Sections controller
const {createSection,updateSection,deleteSection}=require("../controllers/Section");

//subSection controllers
const{createSubSection,updateSubSection,deleteSubSection}=require("../controllers/Subsection");

//Rating Controllers
const{createRating,getAverageRating,getAllRating}=require("../controllers/RatingAndReview");

//Importing Middlewares
const{auth,isInstructor,isStudent,isAdmin}=require("../middlewares/auth");


//routes

//couses can only be created by instructor

router.post("/createCourse",auth,isInstructor,createCourse);
//add a section to a course 
router.post("/addSection",auth,isInstructor,createSection);
//Update a section => put
router.post("/updateSection",auth,isInstructor,updateSection);
//Delete a section
router.post("/deleteSection",auth,isInstructor,deleteSection);
//edit subsection
router.post("updateSubSection",auth,isInstructor,updateSubSection);
//Delete SubSection
router.post("/deleteSubSection",auth,isInstructor,deleteSubSection);
//Add a subSection to a section
router.post("/addSubSection",auth,isInstructor,createSubSection);
//Get all registered courses
router.get("/getAllCourses",getAllCourses);
//Get details for a Specific course
router.post("/getCourseDetails",getCourseDetails);



//Category can only be created by Admin
router.post("/createCategory",auth,isAdmin,createCategory);
router.get("/showAllCategories",showAllCategories);
router.post("/getCategoryPageDetails",categoryPageDetails);


//Rating and review
router.post("/createRating",auth,isStudent,createRating);
router.get("/getAverageRating",getAverageRating);
router.get("/getReviews",getAllRating);

module.exports=router