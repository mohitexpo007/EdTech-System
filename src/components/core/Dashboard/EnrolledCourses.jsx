import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar"
import { useNavigate } from "react-router-dom";


const EnrolledCourses=()=>{
  const {token}=useSelector((state)=>state.auth);
  const [EnrolledCourses,setEnrolledCourses]=useState(null);
  const navigate=useNavigate();

  useEffect(()=>{
    const getEnrolledCourses=async()=>{
      try{
        const response=await getUserEnrolledCourses(token);
        console.log("this is response",response);
        setEnrolledCourses(response);
        
      }
      catch(error){
        console.log("Unable to fetch Enrolled Courses");
      }
    }

    getEnrolledCourses();
  },[token]);


  return(
    <div className="w-full px-6 py-6 text-richblack-5">

      <div className="text-3xl font-medium mb-8">Enrolled Courses</div>
      {
        !EnrolledCourses?(<div className="text-richblack-300 text-base">Loading...</div>):(
          !EnrolledCourses.length ? (<p className="text-richblack-300 text-base">You have not enrolled in any course yet</p>):(
            <div className="w-full rounded-md border border-richblack-700 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 bg-richblack-700 px-4 md:px-5 py-4 text-base text-richblack-200">
                <p>Course Name</p>
                <p className="hidden md:block">Durations</p>
                <p className="hidden md:block">Progress</p>
              </div>

              {/* Cards Enrolled  courses ke */}
              {
                EnrolledCourses.map((course,index)=>(
                  <div key={index} className="group grid cursor-pointer grid-cols-1 gap-y-5 border-t border-richblack-700 px-4 py-5 transition-all duration-300 hover:-translate-y-1 hover:bg-richblack-800 hover:shadow-[0_10px_28px_rgba(0,0,0,0.28)] md:grid-cols-3 md:items-center md:gap-y-0 md:px-5" onClick={() => {
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )}}>
                    <div className="flex items-center gap-x-4">
                      <img src={course.thumbnail} alt="Course" className="h-[55px] w-[70px] rounded-md object-cover transition-transform duration-300 group-hover:scale-105 md:h-[55px] md:w-[75px]"/>
                      <div>
                        <p className="text-base md:text-lg font-semibold text-richblack-5">{course.courseName}</p>
                        <p className="text-sm md:text-base text-richblack-300 mt-1">{course.courseDescription}</p>
                      </div>
                    </div>

                    <div className="text-base md:text-lg text-richblack-200">
                      {course?.totalDuration}
                    </div>

                    <div className="w-full md:max-w-[250px]">
                      <p className="text-sm md:text-base text-richblack-200 mb-2">Progress: {course.progressPercentage || 0}%</p>
                      {/* progress bar ke lie ramonak progress bar used */}
                      <ProgressBar
                        completed={course.progressPercentage || 0}
                        height='8px'
                        isLabelVisible={false}
                        />

                    </div>
                  </div>
                ))
              }
            </div>
          )
        )
      }

    </div>
  )
}

export default EnrolledCourses