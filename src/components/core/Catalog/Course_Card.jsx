import { useEffect, useState } from "react";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";
import { Link } from "react-router-dom";

export default function Course_Card({course, Height}){ 
  const [avgReviewCount,setAvgReviewCount]=useState(0);

  useEffect(()=>{
    const count=GetAvgRating(course.ratingAndReview)
    setAvgReviewCount(count);
  },[course]);

  return(
    <div className="w-full">
      {/* link tab because each course is clickable */}
      <Link to={`/courses/${course._id}`}>

        <div className="course-card-glass flex h-full w-full flex-col gap-4 rounded-xl p-4 transition-all duration-300 hover:-translate-y-1 ">

          <div className="w-full overflow-hidden rounded-xl">
            <img 
            src={course?.thumbnail}
            alt='course ka thumbnail'
            className={`${Height} w-full rounded-xl object-cover transition-all duration-300 hover:scale-105`}
            />
          </div>

          <div className="flex flex-col gap-3">

            <p className="line-clamp-2 min-h-[48px] text-lg font-semibold leading-6 text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-300">{course?.instructor?.firstName} {course?.instructor?.lastName} </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-yellow-50">{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-sm text-richblack-400">{course?.ratingAndReview?.length || 0} Ratings</span>
            </div>
            <p className="text-xl font-bold text-richblack-5">₹{course?.price}</p>

          </div>

        </div>

      </Link>
    </div>
  )
}