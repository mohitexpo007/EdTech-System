import React from "react";
import { FaUsers, FaSitemap } from "react-icons/fa";

const CourseCard = ({
  course,
  currentCard,
  setCurrentCard,
}) => {
  const isActive = currentCard === course.heading;

  return (
    <div
      onClick={() => setCurrentCard(course.heading)}
      className={`
        group relative cursor-pointer

        w-full sm:w-[350px] lg:w-[390px]
        min-h-[340px]

        flex flex-col justify-between

        transition-all duration-300

        ${
          isActive
            ? "bg-white text-richblack-800 shadow-[12px_12px_0px_#FFD60A]"
            : "bg-richblack-800 text-richblack-5"
        }
      `}
    >

      {/* Course Content */}
      <div className="px-7 pt-7">

        {/* Heading */}
        <h3
          className={`
            text-2xl font-semibold mb-5
            ${
              isActive
                ? "text-richblack-800"
                : "text-richblack-5"
            }
          `}
        >
          {course.heading}
        </h3>

        {/* Description */}
        <p
          className={`
            text-[17px] leading-7
            ${
              isActive
                ? "text-richblack-500"
                : "text-richblack-400"
            }
          `}
        >
          {course.description}
        </p>

      </div>

      {/* Bottom information */}
      <div
        className={`
          w-full px-7 py-5

          flex flex-row
          items-center
          justify-between

          border-t

          ${
            isActive
              ? "border-richblack-100"
              : "border-richblack-700"
          }
        `}
      >

        {/* Level */}
        <div className="flex items-center gap-2">

          <FaUsers
            className={`
              text-[18px]
              ${
                isActive
                  ? "text-cyan-600"
                  : "text-richblack-400"
              }
            `}
          />

          <span
            className={`
              text-[16px] font-medium
              ${
                isActive
                  ? "text-cyan-700"
                  : "text-richblack-400"
              }
            `}
          >
            {course.level}
          </span>

        </div>

        {/* Lessons */}
        <div className="flex items-center gap-2">

          <FaSitemap
            className={`
              text-[18px]
              ${
                isActive
                  ? "text-cyan-600"
                  : "text-richblack-400"
              }
            `}
          />

          <span
            className={`
              text-[16px] font-medium
              ${
                isActive
                  ? "text-cyan-700"
                  : "text-richblack-400"
              }
            `}
          >
            {course.lessonNumber} Lessons
          </span>

        </div>

      </div>

    </div>
  );
};

export default CourseCard;