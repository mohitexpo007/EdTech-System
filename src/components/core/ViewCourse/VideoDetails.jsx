import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import "video-react/dist/video-react.css"
import { useLocation } from "react-router-dom"
import { BigPlayButton, Player } from "video-react"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [duration,setDuration]=useState(0)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        // console.log("courseSectionData", courseSectionData)
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        // console.log("filteredData", filteredData)
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )
        // console.log("filteredVideoData", filteredVideoData)
        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    })()
  }, [
        courseSectionData,
        courseEntireData,
        location.pathname,
        courseId,
        navigate,
        sectionId,
        subSectionId,
      ])

  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true
    } else {
      return false
    }
  }

  // go to the next video
  const goToNextVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    // console.log("no of subsections", noOfSubsections)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true
    } else {
      return false
    }
  }

  // go to the previous video
  const goToPrevVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  const formatDuration=(seconds)=>{
  const minutes=Math.floor(seconds/60);
  const remainingSeconds=Math.floor(seconds%60);
  return `${minutes}:${remainingSeconds.toString().padStart(2,"0")}`;
}

  return (
    <div className="flex flex-col gap-5 bg-[#050608] px-1 pb-10 pt-7 text-white">
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-sm text-[#777b82]">
              {courseEntireData?.courseName}
              <span className="mx-2 text-[#3c3f43]">›</span>
              Section 1
              <span className="mx-2 text-[#3c3f43]">›</span>
              <span className="text-[#ff6b00]">Lecture 1</span>
            </p>

            <h1 className="text-[30px] font-bold tracking-tight text-[#f5f5f5]">
              {videoData?.title}
            </h1>

            <p className="mt-2 text-[15px] text-[#a1a1a1]">
              Watch the full video to learn and build your skills.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-[#272a2e] bg-[#0b0c0e] px-5 py-3 text-sm font-semibold text-[#d1d1d1] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-200 hover:border-[#444] hover:bg-[#121417]">
              ♧ Save for later
            </button>

            {!completedLectures.includes(subSectionId) && (
              <button className="flex items-center gap-2 rounded-lg border border-[#ff6b00] bg-[#101011] px-5 py-3 text-sm font-semibold text-[#ff7417] shadow-[0_0_14px_rgba(255,107,0,0.12)] transition-all duration-200 hover:bg-[#24140b]" onClick={() => handleLectureCompletion()}>
                ✓ Mark as Complete
              </button>
            )}
          </div>
        </div>

        <div className="w-[80%] overflow-hidden rounded-xl border border-[#d95d00] bg-black shadow-[0_0_22px_rgba(255,107,0,0.13)]">
          {!videoData ? (
            <img
              src={previewSource}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          ) : (
            <Player
              ref={playerRef}
              aspectRatio="16:9"
              playsInline
              onEnded={() => setVideoEnded(true)}
              src={videoData?.videoUrl}
            >
              <BigPlayButton position="center" />
              {/* Render When Video Ends */}
              {videoEnded && (
                <div
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                  }}
                  className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
                >
                  {!completedLectures.includes(subSectionId) && (
                    <IconBtn
                      disabled={loading}
                      onclick={() => handleLectureCompletion()}
                      text={!loading ? "Mark As Completed" : "Loading..."}
                      customClasses="mx-auto max-w-max rounded-lg border border-[#ff6b00] bg-[#ff6b00] px-5 py-3 text-xl text-white"
                    />
                  )}
                  <IconBtn
                    disabled={loading}
                    onclick={() => {
                      if (playerRef?.current) {
                        // set the current time of the video to 0
                        playerRef?.current?.seek(0)
                        setVideoEnded(false)
                      }
                    }}
                    text="Rewatch"
                    customClasses="mx-auto mt-2 max-w-max rounded-lg border border-[#34373b] bg-[#111214] px-5 py-3 text-xl text-white"
                  />
                  <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="rounded-lg border border-[#33363a] bg-[#101113] px-5 py-3 text-white hover:border-[#ff6b00]"
                      >
                        Prev
                      </button>
                    )}
                    {!isLastVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                        className="rounded-lg border border-[#ff6b00] bg-[#ff6b00] px-5 py-3 text-white shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:bg-[#e85d00]"
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </Player>
          )}
        </div>

        <div className="rounded-xl border border-[#24272b] bg-gradient-to-br from-[#111214] to-[#0a0b0d] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
          <div className="border-b border-[#24272b] pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#ff6b00] bg-[#211208] text-xl text-[#ff6b00]">
                ▷
              </div>

              <div>
                <h2 className="text-xl font-semibold text-[#f1f1f1]">
                  {videoData?.title}
                </h2>

                <p className="mt-1 text-sm text-[#8e9195]">
                  Watch the full video to learn and build your skills.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-3">
            <div className="flex items-center gap-4 border-r border-[#24272b]">
              <span className="text-2xl text-[#92969b]">◷</span>

              <div>
                <p className="text-sm font-semibold text-[#ededed]">{formatDuration(duration)}</p>
                <p className="text-xs text-[#777b80]">Duration</p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-r border-[#24272b]">
              <span className="text-2xl text-[#92969b]">▱</span>

              <div>
                <p className="text-sm font-semibold text-[#ededed]">Video</p>
                <p className="text-xs text-[#777b80]">Content Type</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl text-[#ff6b00]">▥</span>

              <div>
                <p className="text-sm font-semibold text-[#ededed]">Beginner</p>
                <p className="text-xs text-[#777b80]">Level</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#24272b] bg-[#0c0d0f] p-5">
          <h2 className="text-xl font-semibold text-[#f1f1f1]">
            {videoData?.title}
          </h2>

          <p className="mt-3 border-t border-[#24272b] pt-4 text-sm leading-7 text-[#92969b]">
            {videoData?.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VideoDetails
// video