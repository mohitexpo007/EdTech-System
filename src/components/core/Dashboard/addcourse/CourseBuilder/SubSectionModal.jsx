import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import {RxCross1} from "react-icons/rx"
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";
import { toast } from "react-hot-toast";

const SubSectionModal=({
  modalData,
  setModalData,
  add=false,
  view=false,
  edit=false
})=>{

  const{
    register,
    handleSubmit,
    setValue,
    formState:{errors},
    getValues,
  }=useForm()

  const dispatch=useDispatch();
  const [loading,setLoading]=useState(false)
  const {course}=useSelector((state)=>state.course);
  const {token}=useSelector((state)=>state.auth);

  useEffect(()=>{
    if(view || edit){
      setValue("lectureTitle",modalData.title);
      setValue("lectureDesc",modalData.description)
      setValue("lectureVideo",modalData.videoUrl);
    }
  },[])

  const isFormUpdated=()=>{
    const currentValues=getValues();
    if(currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ){
      return true;
    }
    else{
      return false;
    }
  }

  const onSubmit=async(data)=>{
    if(view){
      return;
    }
    if(edit){
      if(!isFormUpdated()){
        toast.error("No changes made to the form")
      }
      else{
        //edit krdo store me
        handleEditSubSection();
      }
      return
    }

    //new subsection create krne ke lie tha
    const formData=new FormData();
    formData.append("sectionId",modalData);
    formData.append("courseId",course._id);
    formData.append("title",data.lectureTitle)
    formData.append("description",data.lectureDesc)
    formData.append("video",data.lectureVideo)

    //API call
    const result=await createSubSection(formData,token);

    if(result){
      dispatch(setCourse(result));
    }
    //modal band krne ke lie
    setModalData(null);
    setLoading(false)


  }

  const handleEditSubSection=async()=>{
    const currentValues=getValues();
    const formData=new FormData();

    formData.append("sectionId",modalData.sectionId)
    formData.append("subSectionId",modalData._id)
    formData.append("courseId",course._id)
    formData.append("title",currentValues.lectureTitle)
    formData.append("description",currentValues.lectureDesc)

    if(currentValues.lectureVideo !== modalData.videoUrl){
      formData.append("video",currentValues.lectureVideo)
    }

    setLoading(true);
    //api call
    const result=await updateSubSection(formData,token);
    if(result){
      dispatch(setCourse(result));
    }
    setModalData(null);
    setLoading(false);
  }


  return(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-xl border border-richblack-600 bg-richblack-800 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-richblack-600 pb-4">
          <p className="text-xl font-semibold text-richblack-5">{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>

          <button
            onClick={()=> (loading ? {} : setModalData(null))}
            className="rounded-full p-2 text-richblack-300 transition-all hover:bg-richblack-700 hover:text-richblack-5"
          >
              <RxCross1/>
          </button>
        </div>


        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Upload 
                name="lectureVideo"
                label="Lecture Video"
                register={register}
                setValue={setValue}
                errors={errors}
                video={true}
                viewData={view ? modalData.videoUrl: null}
                editData={edit ? modalData.videoUrl: null}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-richblack-5">Lecture Title</label>
              <input
                id="lectureTitle"
                placeholder="Enter Lecture Title"
                {...register("lectureTitle",{required:true})}
                className="w-full rounded-md border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all placeholder:text-richblack-300 focus:border-yellow-50 focus:bg-richblack-600"
              />
              {errors.lectureTitle && (<span className="mt-1 block text-sm text-pink-200">
                Lecture Title is required
              </span>)}
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-richblack-5">Lecture Description</label>
                <textarea
                  id='lectureDesc'
                  placeholder="Enter Lecture Description"
                  {...register("lectureDesc",{required:true})}
                  className="w-full min-h-[130px] rounded-md border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all placeholder:text-richblack-300 focus:border-yellow-50 focus:bg-richblack-600"
                />
                {errors.lectureDesc && (<span className="mt-1 block text-sm text-pink-200">
                Lecture Description is required
              </span>)}
            </div>

            {
              !view && (
                <div className="flex justify-end">
                  <IconBtn
                    text={loading ? "Loading...": edit ? "Save Changes" : "Save"}
                  />
                </div>
              )
            }
        </form>
      </div>


    </div>
  )
}


export default SubSectionModal;