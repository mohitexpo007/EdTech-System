import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import RequirementField from "./RequirementField";
import ChipInput from "./ChipInput";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { setStep,setCourse } from "../../../../../slices/courseSlice";
import Upload from "../Upload";
import { HiCurrencyRupee } from "react-icons/hi";

const CourseInformationForm=()=>{

  const{
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors}
  }=useForm()
  
  const dispatch=useDispatch();
  const{course,editCourse}=useSelector((state)=>state.course)
  const [loading,setLoading]=useState(false)
  const [courseCategories,setCourseCategories]=useState([]);
  const{token}=useSelector((state)=>state.auth)

  useEffect(()=>{
    const getCategories=async()=>{
      setLoading(true);
      const categories=await fetchCourseCategories();
      if (categories.length>0){
        setCourseCategories(categories);
      }
      setLoading(false);
    }

    if(editCourse){
      setValue("courseTitle",course.courseName);
      setValue("courseShortDesc",course.courseDescription);
      setValue("coursePrice",course.price);
      setValue("courseTags",course.tag);
      setValue("courseBenefits",course.whatYouWillLearn);
      setValue("courseCategory",course.category);
      setValue("courseRequirements",course.instructions);
      setValue("courseImage",course.thumbnail);
    }

    getCategories();
  },[
    course.category,
    course.courseDescription,
    course.courseName,
    course.instructions,
    course.price,
    course.tag,
    course.thumbnail,
    course.whatYouWillLearn,
    editCourse,
    setValue,
  ]);

  const isFormUpdated=()=>{
    const currentValues=getValues();
    if(currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory !== course.category ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !== course.instructions.toString()
    ) return true;
    else 
      return false;
  }

  //handles next button
  const onSubmit=async(data)=>{
     if(editCourse){
        if(isFormUpdated()){
          const currentValues=getValues();
          const formData=new FormData();

          formData.append("courseId",course._id);
          //sirf wahi chize append krenge jo change hui hai
          if(currentValues.courseTitle!==course.courseName){
            formData.append("courseName",data.courseTitle);
          }

          if(currentValues.courseShortDesc!==course.courseDescription){
            formData.append("courseDescription",data.courseShortDesc);
          }

          if(currentValues.coursePrice!==course.price){
            formData.append("price",data.coursePrice);
          }

          if(currentValues.courseTags.toString()!==course.tag.toString()){
            formData.append("tag",JSON.stringify(data.courseTags));
          }

          if(currentValues.courseBenefits!==course.whatYouWillLearn){
            formData.append("whatYouWillLearn",data.courseBenefits);
          }

          if(currentValues.courseCategory!==course.category){
            formData.append("category._id",data.courseCategory._id);
          }

          if(currentValues.courseImage!==course.thumbnail){
            formData.append("thumbnail",data.courseImage);
          }

          if(currentValues.courseRequirements.toString()!==course.instructions.toString()){
            formData.append("instructions",JSON.stringify(data.courseRequirements));
          }

          setLoading(true);
          const result=await editCourseDetails(formData,token);
          setLoading(false)
          if(result){
            dispatch(setStep(2));
            dispatch(setCourse(result));
          }
        }

        else{
            toast.error("No changes made to the form")
        }
        return
    
      }

      //if new course create krne aaye
      const formData=new FormData();
      formData.append("courseName",data.courseTitle);
      formData.append("courseDescription",data.courseShortDesc);
      formData.append("price",data.coursePrice);
      formData.append("tag",JSON.stringify(data.courseTags));
      formData.append("whatYouWillLearn",data.courseBenefits);
      formData.append("category",data.courseCategory);
      formData.append("thumbnail",data.courseImage);
      formData.append("instructions",JSON.stringify(data.courseRequirements));
      formData.append("status",COURSE_STATUS.DRAFT);


      setLoading(true);
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      const result=await addCourseDetails(formData,token);
      if(result){
        dispatch(setStep(2));
        dispatch(setCourse(result));
        
      }
      setLoading(false);
  }


    return(
    <form
    onSubmit={handleSubmit(onSubmit)}
    className="mt-8 rounded-md border border-richblack-700 bg-richblack-800 p-6 space-y-8 mr-4 ml-4">

      <div className="space-y-2">
        <label htmlFor="courseTitle" className="text-sm text-richblack-5">Course Title<sup className="text-pink-200">*</sup></label>
        <input
          id='courseTitle'
          placeholder="Enter Course Title"
          {...register("courseTitle",{required:true})}
          className="w-full rounded-md border border-richblack-600 bg-richblack-700 p-3 text-richblack-5 outline-none"
        />
        {
          errors.courseTitle && (
            <span className="text-xs text-pink-200">Course Title is Required**</span>
          )
        }
      </div>

      <div className="space-y-2">
        <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">Course Short Description<sup className="text-pink-200">*</sup></label>
        <textarea
          id='couseShortDesc'
          placeholder="Enter Description"
          {...register("courseShortDesc",{required:true})}
          className="min-h-[140px] w-full rounded-md border border-richblack-600 bg-richblack-700 p-3 text-richblack-5 outline-none"
        />
        {
          errors.courseShortDesc && (<span className="text-xs text-pink-200">Course Description is required</span>)
        }
      </div>

      <div className="relative space-y-2">
        <label htmlFor="coursePrice" className="text-sm text-richblack-5">Course Price<sup className="text-pink-200">*</sup></label>
        <input
          id='coursePrice'
          placeholder="Enter Course Price"
          {...register("coursePrice",{required:true,valueAsNumber:true})}
          className="w-full rounded-md border border-richblack-600 bg-richblack-700 p-3 pl-10 text-richblack-5 outline-none"
        />
        <HiCurrencyRupee className="absolute left-3 top-[42px] text-richblack-400"/>
        {
          errors.coursePrice && (
            <span className="text-xs text-pink-200">Course Price is Required**</span>
          )
        }
      </div>

      <div className="space-y-2">
        <label htmlFor="courseCategory" className="text-sm text-richblack-5">Course Category<sup className="text-pink-200">*</sup></label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory",{required:true})}
          className="w-full rounded-md border border-richblack-600 bg-richblack-700 p-3 text-richblack-300 outline-none"
        >
          <option value="" disabled>Choose a Category</option>

          {
            !loading && courseCategories.map((category,index)=>(
              <option key={index} value={category?._id}>
                {category?.name}
              </option>
            ))
          }
        </select>
      </div>

      {/* create a custom component for handling tags input */}
      {/* Course Tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Benefits of the course */}
      <div className="space-y-2">
        <label className="text-sm text-richblack-5">Benefits of the course<sup className="text-pink-200">*</sup></label>
        <textarea
        id="coursebenefits"
        placeholder="Enter Benefits of the course"
        {...register("courseBenefits",{required:true})}
        className="min-h-[130px] w-full rounded-md border border-richblack-600 bg-richblack-700 p-3 text-richblack-5 outline-none"
        />
        {
          errors.courseBenefits && (
            <span className="text-xs text-pink-200">
              Benefits of the course are required**
            </span>
          )
        }
      </div>

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

        <div className="flex justify-end gap-x-4">
          {
            editCourse && (
              <button
              onClick={()=> dispatch(setStep(2))}
              className="rounded-md border border-richblack-600 px-5 py-3 text-sm font-medium text-richblack-5"
              >
                Continue Without Saving
              </button>
            )
          }

          <IconBtn
              text={!editCourse ? "Next":"Save Changes"}
              customClasses={"px-6 py-3"}
              />

        </div>


    </form>
  )
}

export default CourseInformationForm;