import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";


const CourseBuilderForm=()=>{

  const{register,handleSubmit,setValue,formState:{errors}}=useForm();
  const[editSectionName,setEditSectionName]=useState(null);
  const{course}=useSelector((state)=>state.course);
  const{token}=useSelector((state)=>state.auth);
const [setLoading] = useState(false);

  const dispatch=useDispatch();

  {/* course edit krne ja rhe ho */}
  const goBack=()=>{
    dispatch(setStep(1));
    {/* this time we are editing the course so courseEdit flag which is on redux is true and course is also loaded from redux store*/}
    dispatch(setEditCourse(true));
  }
  
  const goToNext=()=>{
    if(course.courseContent.length === 0){
      toast.error("Please add atleast one section");
      return;
    }
    {/* agr kisi section ke andr subsection hai hi nhi then also error */}
    if(course.courseContent.some((section)=>section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section")
      return
    }
    //if everything is ok then go to step 3
    dispatch(setStep(3)); 
  }

  //section jb jb bnega update krenge so save krte jaenge 
  const onSubmit=async(data)=>{
    setLoading(true);
    let result;
    
    {/* if created course pr edit vala icon click kiya hota to edit krte then edit wala button show ho rha hota use click krdete */}
    if(editSectionName){
      //we are editing the section
      result=await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId:course._id
      },token)
    }
    else{
      result=await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      },token)
    }
    
      console.log("CREATE SECTION RESULT:",result);

    //update values
    if(result){
      
      console.log("CREATE SECTION RESULT:",result);
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName","");
    }

    setLoading(false)
  }

  //nested view has a edit button which changes the create section to edit section so we will create a function for this and pass it to the nested view
  const handleChangeEditSectionName=(sectionId,sectionName)=>{
    //if pehle se section id hai value me to toggle krdo section name hta do
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    } 

    setEditSectionName(sectionId);
    setValue("sectionName",sectionName)
  }

 

  const cancelEdit=()=>{
    setEditSectionName(null);
    setValue("sectionName","")
  }

  return(
    <div className="w-full">
      <p className="mb-6 text-3xl font-bold text-richblack-5">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 rounded-lg border border-richblack-600 bg-richblack-800 p-5 shadow-lg">
        <div>
          <label className="mb-2 block text-sm font-medium text-richblack-5">Section name <sup>*</sup></label>

          <input
            id='sectionName'
            placeholder="Add section name"
            {...register("sectionName",{required:true})}
            className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all placeholder:text-richblack-300 focus:border-yellow-50 focus:bg-richblack-600"
          />
          {
            errors.sectionName && (
              <span className="mt-1 block text-sm text-pink-200">Section Name is required</span>
            )
          }
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          {/* edit or create section button for section based on flag editSectionName*/}
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
          </IconBtn>
          {/* cancel edit button jb edit kr rhe honge */}
          {editSectionName && (
            <button
            type="button"
            onClick={cancelEdit}
            className="text-sm text-richblack-300 underline transition-all hover:text-richblack-5"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      
      {/* sections if available to display kro */}
      {course.courseContent.length>0 &&
      (<NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>)}

      <div className="mt-8 flex justify-end gap-x-3">
        <button
        onClick={goBack}
        className="rounded-md bg-richblack-700 px-5 py-3 text-sm font-semibold text-richblack-5 transition-all hover:bg-richblack-600"
        >
          Back
        </button>

        <IconBtn text="Next" onclick={goToNext}/> 
      </div>

    </div>
  )
}

export default CourseBuilderForm;