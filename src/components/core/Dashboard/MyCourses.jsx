import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconBtn";
import CoursesTable from "./InstructorCourses/CourseTable";

const MyCourses=()=>{

  const{token}=useSelector((state)=>state.auth);
  const navigate= useNavigate();
  const [courses,setCourses]=useState([]);

  useEffect(()=>{
    const fetchCourses=async()=>{
      const result=await fetchInstructorCourses(token);
      if(result){
        setCourses(result);
      }
    }
    fetchCourses();
  },[token])
  return(
    <div className="mx-auto flex w-11/12 max-w-[1200px] flex-col gap-8 text-richblack-5">
      <div className="flex w-full flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-richblack-5">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={()=>navigate("/dashboard/add-course")}
        />
      </div>

      {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}


export default MyCourses