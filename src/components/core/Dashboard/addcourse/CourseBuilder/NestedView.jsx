import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaSortDown } from "react-icons/fa";
import {AiOutlinePlus} from "react-icons/ai"
import { setCourse } from "../../../../../slices/courseSlice";
import { deleteSubSection,deleteSection } from "../../../../../services/operations/courseDetailsAPI";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";



const NestedView=({handleChangeEditSectionName})=>{

  //delete section ke icon ke lie confirmationModal reuse hoga
  //video upload ke lie upload reuse hoga

  const{course}=useSelector((state)=>state.course)
  const{token}=useSelector((state)=>state.auth)
  const dispatch=useDispatch();

  const [addSubSection,setAddSubSection]=useState(null);
  const [viewSubSection,setViewSubSection]=useState(null);
  const [editSubSection,setEditSubSection]=useState(null);

  //delete ke lie
  const[confirmationModal,setConfirmationModal]=useState(null);

  const handleDeleteSection=async(sectionId)=>{
    const result=await deleteSection({
      sectionId,
      courseId:course._id,
      token
    })

    if(result){
      dispatch(setCourse(result))
    }
  }

  const handleDeleteSubSection=async(subSectionId,sectionId)=>{
    const result=await deleteSubSection({subSectionId,sectionId,courseId:course._id,token});
    if(result){
      dispatch(setCourse(result));
    }
    setConfirmationModal(null)
  }



  return(
    <div className="rounded-lg border border-richblack-600 bg-richblack-800 p-5 shadow-lg">
      <div className="space-y-2">
        {course?.courseContent?.map((section)=>(
          <details key={section._id} open className="overflow-hidden rounded-md border border-richblack-600 bg-richblack-700">

            {/* section displayed */}
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-4 text-richblack-5 transition-all hover:bg-richblack-600">
               <div className="flex items-center gap-3">
                <RxDropdownMenu className="text-richblack-300"/>
                <p className="text-base font-semibold">{section.sectionName}</p>
               </div>

               <div className="flex items-center gap-4">
                <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)} className="text-richblack-300 transition-all hover:text-yellow-50">
                  <MdEdit/>
                </button>

                <button onClick={()=>{
                  setConfirmationModal({
                    text1:"Delete this section",
                    text2:"All the lectures in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: ()=> handleDeleteSection(section._id),
                    btn2Handler: ()=>setConfirmationModal(null)
                  })
                }} className="text-richblack-300 transition-all hover:text-pink-200">
                  <MdDelete/>
                </button>

                <span className="text-richblack-500">|</span>
                
                <FaSortDown className="text-richblack-300"/>
                 
               </div>
            </summary>

            {/* subsection displayed */}
            <div className="border-t border-richblack-600 px-4 pb-3">
                {
                  section.subSection?.map((data)=>(
                    <div key={data?._id}
                    onClick={()=>setViewSubSection(data)}
                    className="flex cursor-pointer items-center justify-between border-b border-richblack-600 px-2 py-3 text-sm text-richblack-200 transition-all hover:bg-richblack-600"
                    >
                      <div className="flex items-center gap-3">

                        <RxDropdownMenu className="text-richblack-400"/>
                        <p>{data.title}</p>

                      </div>

                      <div className="flex items-center gap-4">
                        {/* edit */}
                        <button
                        onClick={()=>setEditSubSection({...data,sectionId:section._id})}
                        className="text-richblack-300 transition-all hover:text-yellow-50"
                        >
                          <MdEdit/>
                        </button>

                        {/* delete */}
                        <button
                        onClick={()=>{
                        setConfirmationModal({
                          text1:"Delete this Sub Section",
                          text2:"selected Lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: ()=> handleDeleteSubSection(data._id,section._id),
                          btn2Handler: ()=>setConfirmationModal(null)
                        })
                        }
                        } className="text-richblack-300 transition-all hover:text-pink-200">
                          <MdDelete/>
                        </button>

                      </div>
                    </div>
                  ))
                }

                <button
                onClick={()=>setAddSubSection(section._id)}
                className="mt-3 flex items-center gap-2 px-2 py-2 text-sm font-semibold text-yellow-50 transition-all hover:text-yellow-100"
                >
                  <AiOutlinePlus/>
                  <p>Add Lecture</p>
                </button>
            </div>

          </details>
        ))}
      </div>

      {addSubSection ? (<SubSectionModal
      modalData={addSubSection}
      setModalData={setAddSubSection}
      add={true}
      />)
      : viewSubSection ? (<SubSectionModal
      modalData={viewSubSection}
      setModalData={setViewSubSection}
      view={true}
      />)
      : editSubSection ? (<SubSectionModal
      modalData={editSubSection}
      setModalData={setEditSubSection}
      edit={true}
      />)
      :(<div></div>)}

      {/* if delete pr click kiya hai to confirmation modal khulega delete wala */}
      {
        confirmationModal ? 
        (<ConfirmationModal modalData={confirmationModal}/>):
        (<div></div>)
      }


    </div>
  )
}

export default NestedView;