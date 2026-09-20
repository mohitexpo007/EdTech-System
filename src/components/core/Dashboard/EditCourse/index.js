import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../addcourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";


export default function EditCourse(){

  const dispatch=useDispatch();
  const {courseId}=useParams();
  const {course}=useSelector((state)=>state.course);
  const [loading,setLoading]=useState(false);
  const {token}=useSelector((state)=>state.auth);

  useEffect(()=>{
    const populateCourseDetails=async()=>{
      setLoading(true);
      const result=await getFullDetailsOfCourse(courseId,token);
      if(result?.courseDetails){
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false)
    }
    populateCourseDetails();
  },[courseId, dispatch, token])

  if(loading){
    return(
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center bg-richblack-900 text-2xl font-semibold text-richblack-5">
        Loading....
      </div>
    )
  }

  return(
    <div className="min-h-[calc(100vh-3.5rem)] bg-richblack-900 px-4 py-8 text-richblack-5 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto w-full max-w-[1000px]">
        {
          course ? (<RenderSteps />) : (<p className="text-lg text-richblack-300">Course Not Found</p>)
        }
      </div>
    </div>
  )
}