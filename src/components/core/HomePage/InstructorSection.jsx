import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-16 px-4 md:px-0">

      <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-center">

        {/* Image */}
        <div className="w-full md:w-[50%] relative">

          {/* White offset background */}
          <div className="absolute -left-3 -top-3 md:-left-5 md:-top-5 h-full w-full bg-white"></div>

          {/* Instructor image */}
          <img
            src={Instructor}
            alt="Instructor"
            className="relative z-10 w-full h-auto object-contain"
          />

        </div>

        {/* Content */}
        <div className="w-full md:w-[50%] flex flex-col gap-6 md:gap-10">

          {/* Heading */}
          <div className="text-4xl md:text-5xl font-semibold w-full md:w-[50%]">
            Become an
            <HighlightText text={"Instructor"} />
          </div>

          {/* Description */}
          <p className="font-medium text-[15px] md:text-[16px] w-full md:w-[80%] text-richblack-300">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          {/* Button */}
          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InstructorSection;