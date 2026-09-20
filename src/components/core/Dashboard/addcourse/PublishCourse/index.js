import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";


const PublishCourse=()=>{

  const {register,handleSubmit,setValue,getValues}=useForm();
  const dispatch=useDispatch();
  const {course}=useSelector((state)=>state.course);
  const{token}=useSelector((state)=>state.auth);
  const[loading,setLoading]=useState(false);

  //page render hote hi check kro if course ka status already published hai to public true krdo
  useEffect(()=>{
  if(course?.status === COURSE_STATUS.PUBLISHED){
    setValue("public",true);
  }
  }, [course?.status, setValue])

  const goBack=()=>{
    dispatch(setStep(2));
  }

  const gotoCourses=()=>{
    dispatch(resetCourseState());
    //navigate to my-courses
  }

  const handleCoursePublish=async()=>{
    if((course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true) ||
    (course.status===COURSE_STATUS.DRAFT && getValues("public")===false)
    ){
      //no updation in form
      //no need to make api call
      gotoCourses();
      return;
    }
    //if form status update hua then api call
    const formData=new FormData();
    formData.append("courseId",course._id);
    const courseStatus=getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status",courseStatus);

    setLoading(true);
    const result=await editCourseDetails(formData,token);

    if(result){
      gotoCourses();
    }
    setLoading(false);
  }

  const onSubmit=()=>{
    handleCoursePublish();
  }

  return(
    <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-8 text-richblack-5">
      <div className="flex items-center justify-between">
        <button type="button" onClick={goBack} className="flex items-center gap-2 text-sm text-richblack-300 transition-all hover:text-richblack-5">
          <span>←</span>
          Back to Course Builder
        </button>
        <p className="text-sm text-richblack-300">Step 3 of 3</p>
      </div>

      <div className="w-full">
        <div className="w-full">
          <div className="mb-8">
            <p className="mb-2 text-3xl font-bold text-richblack-5">Publish Settings</p>
            <p className="text-sm text-richblack-300">Choose whether you want to make your course available to students.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full rounded-xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg">
            <div className="rounded-lg border border-richblack-600 bg-richblack-700 p-5 transition-all hover:border-richblack-500">
              <label className="flex cursor-pointer items-center gap-4">
                <input
                  type="checkbox"
                  id="public"
                  {...register("public")}
                  className="peer sr-only"
                />

                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-richblack-400 bg-richblack-800 text-sm font-bold text-richblack-900 transition-all peer-checked:border-yellow-50 peer-checked:bg-yellow-50 peer-focus:ring-2 peer-focus:ring-yellow-50/40">
                  <span className="hidden peer-checked:block">✓</span>
                </span>

                <div className="flex flex-col gap-1">
                  <p className="text-base font-semibold text-richblack-5">Make this Course Public</p>
                  <p className="text-sm text-richblack-300">Allow students to discover and enroll in this course.</p>
                </div>
              </label>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-4">
              <button
                    disabled={loading}
                    type="button"
                    onClick={goBack}
                    className="rounded-lg border border-richblack-600 bg-richblack-700 px-6 py-3 text-sm font-semibold text-richblack-5 transition-all hover:bg-richblack-600 disabled:cursor-not-allowed disabled:opacity-50">
                ← Back
              </button>
              <IconBtn disabled={loading} text="save changes"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )


}

export default PublishCourse;