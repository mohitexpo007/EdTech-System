import { useSelector } from "react-redux";
import { buyCourse } from "../services/operations/studentFeatures";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Error from "./Error";
import copy from "copy-to-clipboard";
import {toast} from "react-hot-toast";
import { ACCOUNT_TYPE } from "../utils/constants";
import { addToCart } from "../slices/cartSlice";
import courseHeroBackground from "../assets/Images/category-hero-background.png";
import RatingStars from "../components/common/RatingStars";


const CourseDetails=()=>{
  const {token}=useSelector((state)=>state.auth);
  const {user}=useSelector((state)=>state.profile);
  const {loading}=useSelector((state)=>state.profile);
  const {paymentLoading}=useSelector((state)=>state.course);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {courseId}=useParams();

  const [courseData,setCourseData]=useState(null);
  const [avgReviewCount,setAvgReviewCount]=useState(0);
  const [totalNoOfLectures,setTotalNoOfLectures]=useState(0);
  const [isActive,setIsActive]=useState([]);
  const [confirmationModal,setConfirmationModal]=useState(null);

  useEffect(()=>{
    const getCoursefullDetails=async()=>{
      try{
        const result=await fetchCourseDetails(courseId);
        console.log("PRINTING RESULT",result);
        setCourseData(result);
      }
      catch(error){
        console.log("Could not fetch course details");
      }
    }
    getCoursefullDetails();
  },[courseId])


  const courseDetails=courseData?.data?.[0]?.courseDetails || courseData?.data?.courseDetails || courseData?.data?.[0];

  useEffect(()=>{
    const count=GetAvgRating(courseDetails?.ratingAndReview) || 0;
    setAvgReviewCount(count);
  },[courseData,courseDetails?.ratingAndReview])


  useEffect(()=>{
    let lectures=0;
    courseDetails?.courseContent?.forEach((sec)=>{
      //har section ke ander kitne subsections hai vo count kroge
      lectures+=sec.subSection?.length || 0
    })
    setTotalNoOfLectures(lectures);
  },[courseData,courseDetails?.courseContent])


  //ek array me store kra hai konse section open hai konse close so collapse all sbko band krde
  const handleActive=(id)=>{
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e)=>e!==id)
    )
  }

  const handleShare=()=>{
    copy(window.location.href);
    toast.success("Link Copied to Clipboard")
  }


  const handleBuyCourse=()=>{
    if(token){
      buyCourse(token,[courseId],user,navigate,dispatch);
      return
    }

    setConfirmationModal({
      text1:"You are not logged in!",
      text2:"Please login to Purchase Course.",
      btn1Text:"Login",
      btn2Text:"Cancel",
      btn1Handler:()=>navigate("/login"),
      btn2Handler:()=>setConfirmationModal(null),
    })
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(courseDetails))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }



  if(loading || !courseData){
    return(
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900">
        <div className="text-2xl font-semibold text-richblack-5">Loading...</div>
      </div>
    )
  }

  if(!courseData.success){
    return(
      <div>
        <Error/>
      </div>
    )
  }


  return(
    <div className="min-h-screen bg-[#050608]">
      <div className="relative w-full bg-[#050608]">
        <img
          src={courseHeroBackground}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,8,.88)_0%,rgba(5,6,8,.62)_42%,rgba(5,6,8,.16)_72%,rgba(5,6,8,.48)_100%)]" />
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img src={courseDetails?.thumbnail} alt="course thumbnail" className="aspect-auto w-full"/>
            </div>

            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              <p className="text-sm text-richblack-200">
                Home <span className="px-2 text-richblack-500">/</span> Catalog <span className="px-2 text-richblack-500">/</span> <span className="text-[#FFD700]">{courseDetails?.category?.name || "Course"}</span>
              </p>
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">{courseDetails?.courseName}</p>
              </div>

              <p className="text-richblack-200">{courseDetails?.courseDescription}</p>

              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-[#FFD700]">{avgReviewCount}</span>

                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />

                <span>{`(${(courseDetails?.ratingAndReview || []).length} reviews)`}</span>

                <span>{`${(courseDetails?.studentsEnroled || courseDetails?.studentsEnrolled || []).length} students enrolled`}</span>
              </div>

              <div>
                <p>Created By {`${courseDetails?.instructor?.firstName || "Instructor"} ${courseDetails?.instructor?.lastName || ""}`}</p>
              </div>

              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <span>ⓘ</span>
                  Created at {courseDetails?.createdAt ? new Date(courseDetails.createdAt).toLocaleDateString() : "02/2020"}
                </p>

                <p className="flex items-center gap-2">
                  <span>🌐</span>
                  English
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">Rs. {courseDetails?.price}</p>

            <button
              className="group relative w-full overflow-hidden rounded-xl border border-[#ff6b00]/40 bg-[#ff6b00] px-6 py-3 font-semibold text-black shadow-[0_8px_30px_rgba(255,107,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff7417] hover:shadow-[0_12px_35px_rgba(255,107,0,0.2)] active:translate-y-0"
              onClick={handleBuyCourse}
            >
              <span className="relative z-10">
                {paymentLoading ? "Processing..." : "Buy Now"}
              </span>

              {!paymentLoading && (
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
              )}
            </button>

              <button className="w-full rounded-lg bg-richblack-900 px-6 py-3 font-semibold text-richblack-5">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="-right-[1rem] top-[240px] z-30 mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <div className="overflow-hidden rounded-lg border border-richblack-600/60 bg-[#111214]/95 shadow-[0_20px_60px_rgba(0,0,0,.55)] backdrop-blur-sm">
              <img src={courseDetails?.thumbnail} alt="Course Thumbnail" className="h-[220px] w-full object-cover"/>

              <div className="p-5">
                <h2 className="mb-5 text-3xl font-bold text-richblack-5">Rs. {courseDetails?.price}</h2>

                <button className="group relative w-full overflow-hidden rounded-xl border border-[#ff6b00]/40 bg-[#ff6b00] px-6 py-3 font-semibold text-black shadow-[0_8px_30px_rgba(255,107,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff7417] hover:shadow-[0_12px_35px_rgba(255,107,0,0.2)] active:translate-y-0 py-3 px-4" onClick={handleBuyCourse}>
                  {paymentLoading ? "Processing..." : "Buy Now"}
                </button>

                <button className="mb-4 w-full rounded-lg bg-richblack-900 px-4 py-3 font-semibold text-richblack-5" onClick={()=>{handleAddToCart()}}>
                  Add to Cart
                </button>

                <p className="mb-5 text-center text-sm text-richblack-200">30-Day Money-Back Guarantee</p>

                <h3 className="mb-4 text-lg font-semibold text-richblack-5">This course includes:</h3>

                <div className="flex flex-col gap-3 text-sm text-caribbeangreen-100">
                  <p>◉ 8 hours on-demand video</p>
                  <p>↗ Full Lifetime access</p>
                  <p>▣ Access on Mobile and TV</p>
                  <p>✓ Certificate of completion</p>
                </div>

                <button className="mt-6 w-full text-center font-semibold text-[#FFB000]" onClick={()=>{handleShare()}}>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>

            <div className="mt-5 flex flex-col gap-3 text-richblack-200">
              {Array.isArray(courseDetails?.whatYouWillLearn) ? (
                courseDetails.whatYouWillLearn.map((item,index)=>(
                  <p key={index}>{item}</p>
                ))
              ) : (
                <p>{courseDetails?.whatYouWillLearn}</p>
              )}
            </div>
          </div>

          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>

              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                  <span>{courseDetails?.courseContent?.length || 0} section(s)</span>
                  <span>{totalNoOfLectures} lecture(s)</span>
                  <span>{courseData?.data?.[0]?.totalDuration || courseData?.data?.totalDuration || "7h 57m"} total length</span>
                </div>

                <div>
                  <button className="text-[#FFB000]" onClick={()=>setIsActive([])}>
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            <div className="py-4">
              {courseDetails?.courseContent?.map((course,index)=>(
                <div className="border border-richblack-600" key={course?._id || index}>
                  <button className="flex w-full items-center justify-between bg-richblack-700 px-5 py-4 text-left" onClick={()=>handleActive(course?._id || index)}>
                    <span className="font-semibold text-richblack-5">{course?.sectionName}</span>

                    <span className="text-sm text-[#FFD700]">
                      {course?.subSection?.length || 0} lectures
                    </span>
                  </button>

                  {isActive.includes(course?._id || index) && (
                    <div className="bg-richblack-900 px-5 py-3">
                      {course?.subSection?.map((subSection,subIndex)=>(
                        <div className="flex items-center justify-between gap-4 border-b border-richblack-700 py-3 last:border-b-0" key={subSection?._id || subIndex}>
                          <div className="flex items-center gap-3 text-richblack-200">
                            <span>▣</span>
                            <span>{subSection?.title}</span>
                          </div>

                          <span className="text-sm text-richblack-300">02:09</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>

              <div className="flex items-center gap-4 py-4">
                <img src={courseDetails?.instructor?.image} alt="Author" className="h-14 w-14 rounded-full object-cover"/>

                <p className="text-lg">
                  {`${courseDetails?.instructor?.firstName || "Instructor"} ${courseDetails?.instructor?.lastName || ""}`}
                </p>
              </div>

              <p className="text-richblack-50">
                {courseDetails?.instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      {confirmationModal && (
        <div className="fixed inset-0 z-[1000] grid place-items-center bg-black bg-opacity-50">
          <div className="w-[90%] max-w-[450px] rounded-lg bg-richblack-800 p-6">
            <p className="mb-2 text-xl font-semibold text-richblack-5">{confirmationModal.text1}</p>
            <p className="mb-6 text-richblack-200">{confirmationModal.text2}</p>

            <div className="flex justify-end gap-4">
              <button className="rounded-lg bg-yellow-50 px-5 py-2 font-semibold text-richblack-900" onClick={confirmationModal.btn1Handler}>
                {confirmationModal.btn1Text}
              </button>

              <button className="rounded-lg bg-richblack-600 px-5 py-2 font-semibold text-richblack-5" onClick={confirmationModal.btn2Handler}>
                {confirmationModal.btn2Text}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseDetails
