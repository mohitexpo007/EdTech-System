import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skill paths",
  "Career paths",
];

const ExploreMore = () => {

  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  //highlighted card ke lie
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {

    setCurrentTab(value);

    const result = HomePageExplore.filter(
      (course) => course.tag === value
    );

    if (result.length > 0) {
      setCourses(result[0].courses);

      setCurrentCard(result[0].courses[0].heading);
    }
  };

  return (
    <div className="w-full">

      {/* Heading */}
      <div className="text-4xl font-semibold text-center">
        Unlock the
        <span className="text-caribbeangreen-300">
          {" "}Power of Code
        </span>
      </div>

      {/* Subtitle */}
      <p className="text-center text-richblack-300 text-[16px] mt-3">
        Learn to build anything you can imagine
      </p>


      {/* ================= TAG BAR ================= */}

      <div className="mt-8 flex justify-center px-4">

        <div
          className="
            inline-flex
            flex-row
            items-center
            justify-center

            rounded-full
            bg-richblack-800

            p-1

            max-w-full
            overflow-x-auto

            scrollbar-hide
          "
        >

          {tabsName.map((element, index) => {

            const active = currentTab === element;

            return (
              <div
                key={index}
                onClick={() => setMyCards(element)}

                className={`
                  flex
                  items-center
                  justify-center

                  whitespace-nowrap

                  text-[16px]

                  px-7
                  py-3

                  rounded-full

                  cursor-pointer

                  transition-all
                  duration-200

                  flex-shrink-0

                  ${
                    active
                      ? "bg-richblack-900 text-white font-medium"
                      : "text-richblack-200 hover:bg-richblack-900 hover:text-white"
                  }
                `}
              >
                {element}
              </div>
            );
          })}

        </div>

      </div>


      {/* ================= CARDS ================= */}

      {/* ================= CARDS ================= */}

      <div className="mt-16 px-4 sm:px-6 lg:px-0">

        <div
          className="
            flex
            flex-col
            md:flex-row
            justify-center
            items-center
            gap-8
            w-full
            max-w-[1200px]
            mx-auto

            relative
            z-30

            lg:-mb-[180px]
          "
        >

          {courses.map((element, index) => (
            <CourseCard
              key={index}
              course={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}

        </div>

      </div>


      {/* Bottom spacing */}
      <div className="h-[150px]"></div>

    </div>
  );
};

export default ExploreMore;