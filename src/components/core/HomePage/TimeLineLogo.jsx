import React from "react";

import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col md:flex-row gap-12 md:gap-10 items-center w-11/12 max-w-maxContent mx-auto">

        {/* Timeline */}
        <div className="w-full md:w-[45%] flex flex-col gap-10">
          {timeline.map((element, index) => (
            <div className="flex flex-row gap-6 relative" key={index}>

              {/* Dotted connector */}
              {index !== timeline.length - 1 && (
                <div className="absolute left-[25px] top-[50px] bottom-[-20px] border-l-2 border-dashed border-richblack-300" />
              )}

              {/* Logo */}
              <div className="relative z-10 w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <img src={element.Logo} alt="" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h2 className="font-semibold text-[18px]">
                  {element.heading}
                </h2>

                <p className="text-base">
                  {element.Description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Image */}
        <div className="relative w-full md:w-[50%] max-w-full pb-20">

          {/* Blue oval glow behind image */}
          <div className="absolute -inset-x-6 md:-inset-x-10 top-8 bottom-8 bg-blue-300/30 blur-3xl rounded-full" />

          {/* Image */}
          <img
            src={TimelineImage}
            alt="timelineImage"
            className="relative z-10 w-full h-auto object-cover shadow-white"
          />

          {/* Green statistics box */}
          <div className="absolute z-20 bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-auto">

            <div className="flex flex-row gap-3 sm:gap-5 items-center border-r border-caribbeangreen-300 px-4 sm:px-7">
              <p className="text-2xl sm:text-3xl font-bold">10</p>

              <p className="text-caribbeangreen-300 text-xs sm:text-sm">
                Years of Experience
              </p>
            </div>

            <div className="flex flex-row gap-3 sm:gap-5 items-center px-4 sm:px-7">
              <p className="text-2xl sm:text-3xl font-bold">250</p>

              <p className="text-caribbeangreen-300 text-xs sm:text-sm">
                Type of Courses
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TimelineSection;