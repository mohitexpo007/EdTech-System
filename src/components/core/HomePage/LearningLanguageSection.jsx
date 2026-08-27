import React from "react";
import HighlightText from "./HighlightText";

import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div className="mt-[130px]">
      <div className="flex flex-col gap-5 items-center">

        {/* Heading */}
        <div className="text-4xl font-semibold text-center px-4">
          Your Swiss Knife for
          <HighlightText text={" learning any language"} />
        </div>

        {/* Description */}
        <div className="text-center text-richblack-600 mx-auto text-lg font-medium w-[90%] md:w-[65%] max-w-[900px]">
          Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
          <br className="hidden md:block" />
          progress tracking, custom schedule and more.
        </div>

        {/* Images */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-5 w-full px-4">

          <img
            src={know_your_progress}
            alt="Know your progress"
            className="object-contain w-[80%] sm:w-[65%] md:w-auto md:-mr-32"
          />

          <img
            src={compare_with_others}
            alt="Compare with others"
            className="object-contain w-[80%] sm:w-[65%] md:w-auto z-10"
          />

          <img
            src={plan_your_lesson}
            alt="Plan your lessons"
            className="object-contain w-[80%] sm:w-[65%] md:w-auto md:-ml-36"
          />

        </div>

        <div className="mb-32">
          <CTAButton active={true} linkto={"/signup"}>
            Learn more
          </CTAButton>
        </div>

      </div>
    </div>
  );
};

export default LearningLanguageSection;