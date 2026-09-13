import { useState } from "react";
import { useSelector } from "react-redux";
import {Table,Thead,Tr,Th,Tbody,Td} from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { MdEdit, MdDelete } from "react-icons/md";
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { deleteCourse, fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { useNavigate } from "react-router-dom";


export default function CoursesTable({courses,setCourses}){
  const {token}=useSelector((state)=>state.auth);
  const [loading,setLoading]=useState(false);
  const [confirmationModal,setConfirmationModal]=useState(null);
  const navigate=useNavigate();

  const handleCourseDelete= async(courseId)=>{
    console.log(courseId);
    setLoading(true)

    await deleteCourse({courseId:courseId},token);
    const result=await fetchInstructorCourses(token);
    if(result){
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false);
  }


  return(
    <div className="w-full overflow-hidden rounded-xl border border-richblack-700 bg-richblack-900 text-richblack-5">
      <Table className="w-full border-collapse">
        <Thead className="border-b border-richblack-700 bg-richblack-800">
          <Tr className="text-left">
            <Th className="w-[58%] px-7 py-6 text-base font-semibold uppercase tracking-wide text-richblack-200">
              Courses
            </Th>
            <Th className="w-[14%] px-5 py-6 text-base font-semibold uppercase tracking-wide text-richblack-200">
              Duration
            </Th>
            <Th className="w-[12%] px-5 py-6 text-base font-semibold uppercase tracking-wide text-richblack-200">
              Price
            </Th>
            <Th className="w-[16%] px-5 py-6 text-base font-semibold uppercase tracking-wide text-richblack-200">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody className="divide-y divide-richblack-800">
          {
            courses.length===0 ? (
              <Tr className="border-b border-richblack-800">
                <Td className="px-7 py-12 text-center text-lg text-richblack-300">
                  No Courses Found
                </Td>
              </Tr>
            )
            :
            (
              courses?.map((course)=>(
                <Tr key={course._id} className="border-b border-richblack-800 bg-richblack-900 transition-all hover:bg-richblack-800">
                  <Td className="w-[58%] px-7 py-7 align-middle">
                    <img
                      src={course?.thumbnail}
                      className="mr-6 inline-block h-[165px] w-[245px] rounded-lg object-cover align-middle"
                    />
                    <div className="inline-flex max-w-[calc(100%-275px)] flex-col gap-3 align-middle">
                      <p className="text-2xl font-semibold text-richblack-5">{course.courseName}</p>
                      <p className="line-clamp-2 text-base leading-7 text-richblack-300">{course.courseDescription}</p>
                      <p className="text-base text-richblack-300">Created: </p>
                      {
                        course.status === COURSE_STATUS.DRAFT ? (
                          <p className="w-fit rounded-full bg-pink-900/40 px-4 py-2 text-sm font-semibold text-pink-200">DRAFTED</p>
                        ):
                        (
                          <p className="w-fit rounded-full bg-yellow-900/40 px-4 py-2 text-sm font-semibold text-yellow-200">PUBLISHED</p>
                        )
                      }
                    </div>
                  </Td>

                  <Td className="w-[14%] px-5 py-7 text-base font-medium text-richblack-200 align-middle">
                      2hr 30min
                  </Td>

                  <Td className="w-[12%] px-5 py-7 text-base font-semibold text-richblack-100 align-middle">
                    ${course.price}
                  </Td>

                  <Td className="w-[16%] px-5 py-7 align-middle">
                    <button
                    disabled={loading}
                    aria-label="Edit course"
                    title="Edit course"
                    className="mr-4 rounded-md p-3 text-2xl text-richblack-300 transition-all hover:bg-richblack-700 hover:text-yellow-50 disabled:cursor-not-allowed disabled:opacity-50"

                    onClick={()=>{
                      //params me pass ki hai
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    >
                    <MdEdit />
                    </button>

                    <button
                    disabled={loading}
                    onClick={()=>{
                      setConfirmationModal({
                        text1:"Do you want to delete this course",
                        text2:"All the data related to this course will be deleted",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler: !loading ? ()=>handleCourseDelete(course._id):()=>{},
                        btn2Handler: !loading ? ()=>setConfirmationModal(null):()=>{},
                      })
                    }}
                    aria-label="Delete course"
                    title="Delete course"
                    className="rounded-md p-3 text-2xl text-richblack-300 transition-all hover:bg-richblack-700 hover:text-pink-200 disabled:cursor-not-allowed disabled:opacity-50"

                    >
                    <MdDelete />
                    </button>
                  </Td>
                </Tr>
              ))
            )
          }
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}