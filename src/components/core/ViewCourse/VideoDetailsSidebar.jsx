import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"
import { completedlecEndpoints } from "../../../services/apis"
import { apiConnector } from "../../../services/apiconnector"
import { setCompletedLectures } from "../../../slices/viewCourseSlice"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { courseId, sectionId, subSectionId } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  const dispatch = useDispatch()

  const { GET_COMPLETED_LECTURES_API } = completedlecEndpoints
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const getCompletedLec = async () => {
      try {
        const result = await apiConnector(
          "POST",
          GET_COMPLETED_LECTURES_API,
          {
            courseId: courseId,
          },
          {
            Authorization: `Bearer ${token}`,
          }
        )

        if (result?.data?.success) {
          console.log("Completed lec api result", result)

          const completedVideos =
            result.data.courseProgress?.completedVideos || []

          const completedVideoIds = completedVideos.map((id) =>
            String(id)
          )

          console.log("Completed video IDs:", completedVideoIds)

          dispatch(setCompletedLectures(completedVideoIds))
        } else {
          dispatch(setCompletedLectures([]))
        }
      } catch (error) {
        console.log("Error in completed lectures api", error)
      }
    }

    if (courseId && token) {
      getCompletedLec()
    }
  }, [courseId, token, dispatch, GET_COMPLETED_LECTURES_API])

  useEffect(() => {
    console.log("Completed lectures from Redux:", completedLectures)
  }, [completedLectures])

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return

      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )

      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)

      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id

      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-[#242629] bg-[#090a0c] shadow-[8px_0_30px_rgba(0,0,0,0.35)]">
        <div className="mx-4 flex flex-col items-start justify-between gap-4 border-b border-[#242629] py-5 text-lg font-bold text-[#f1f1f1]">
          <div className="flex w-full items-center justify-between">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-lg border border-[#33363a] bg-[#101113] p-1 text-[#c0c2c5] transition-all duration-200 hover:border-[#ff6b00] hover:text-[#ff6b00]"
              title="back"
            >
              <IoIosArrowBack size={25} />
            </div>

            <IconBtn
              text="Add Review"
              customClasses="ml-auto rounded-lg border border-[#ff6b00] bg-[#17100c] px-3 py-2 text-sm text-[#ff7417] hover:bg-[#2a160b] hover:text-[#ff8a3d]"
              onclick={() => setReviewModal(true)}
            />
          </div>

          <div className="flex w-full flex-col rounded-xl border border-[#2d3034] bg-gradient-to-br from-[#121315] to-[#0b0c0e] p-4 shadow-[0_8px_25px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#8c3900] bg-[#251208] text-2xl text-[#ff6b00] shadow-[0_0_15px_rgba(255,107,0,0.1)]">
                &lt;/&gt;
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[#f0f0f0]">
                  {courseEntireData?.courseName}
                </p>

                <div className="mt-3 h-[7px] overflow-hidden rounded-full bg-[#27292c]">
                  <div
                    className="h-full rounded-full bg-[#ff6b00] shadow-[0_0_8px_rgba(255,107,0,0.45)] transition-all duration-500"
                    style={{
                      width: `${
                        totalNoOfLectures
                          ? (completedLectures?.length /
                              totalNoOfLectures) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>

                <p className="mt-2 text-xs text-[#777b80]">
                  {totalNoOfLectures
                    ? Math.round(
                        (completedLectures?.length / totalNoOfLectures) * 100
                      )
                    : 0}
                  % completed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-5rem)] overflow-y-auto px-3 pb-5">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-3 cursor-pointer overflow-hidden rounded-xl border border-[#25282c] text-sm text-[#f1f1f1] transition-all duration-200 hover:border-[#393c40]"
              onClick={() => setActiveStatus(course?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-[#111214] px-5 py-4 hover:bg-[#151619]">
                <div className="w-[70%] font-semibold text-[#dedede]">
                  {course?.sectionName}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#777b80]">
                    {course?.subSection?.length || 0}
                  </span>

                  <span
                    className={`${
                      activeStatus === course?._id
                        ? "rotate-0"
                        : "rotate-180"
                    } text-[#ff6b00] transition-all duration-500`}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === course?._id && (
                <div className="border-t border-[#292c30] bg-[#090a0c] transition-[height] duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      className={`group flex cursor-pointer items-center gap-3 border-b border-[#1b1d20] px-4 py-3 text-sm transition-all duration-200 ${
                        videoBarActive === topic._id
                          ? "border-l-[4px] border-l-[#ff6b00] bg-gradient-to-r from-[#32180d] to-[#17100d] font-semibold text-[#ff8a3d] shadow-[inset_8px_0_20px_rgba(255,107,0,0.04)]"
                          : "text-[#9b9da1] hover:bg-[#111214] hover:text-[#ededed]"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.some(
                          (id) => String(id) === String(topic?._id)
                        )}
                        onChange={() => {}}
                        className="h-4 w-4 accent-[#ff6b00]"
                      />

                      <span className="flex-1">{topic.title}</span>

                      {videoBarActive === topic._id && (
                        <span className="text-[#ff6b00]">▶</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="relative mt-5 overflow-hidden rounded-xl border border-[#8b3c08] bg-gradient-to-br from-[#17100c] via-[#101011] to-[#0a0b0c] p-5 shadow-[0_0_20px_rgba(255,107,0,0.06)]">
            <div className="absolute -bottom-10 -right-10 h-28 w-40 rotate-[-8deg] rounded-[50%] border border-[#a9470b] opacity-40"></div>

            <div className="relative mb-3 flex items-center gap-3">
              <span className="text-2xl text-[#ff6b00]">🔥</span>

              <div>
                <p className="text-sm font-semibold text-[#eeeeee]">
                  Keep Learning
                </p>

                <p className="text-xs text-[#85888c]">
                  Small steps make big progress.
                </p>
              </div>
            </div>

            <div className="relative h-[7px] overflow-hidden rounded-full bg-[#292b2e]">
              <div
                className="h-full rounded-full bg-[#ff6b00] shadow-[0_0_8px_rgba(255,107,0,0.45)]"
                style={{
                  width: `${
                    totalNoOfLectures
                      ? (completedLectures?.length / totalNoOfLectures) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}