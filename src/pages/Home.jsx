import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimeLineLogo';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorFeature from '../components/core/HomePage/InstructorFeature/InstructorFeature';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Hero from '../components/core/HomePage/HeroFeature/Hero';
import ReviewSlider from '../components/common/ReviewSlider';

const Home = () => {
  return (
    <div className="bg-black">
      <Hero/>

      {/*Section1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between bg-black">

        {/* Code Section 1 */}
        <div >
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential "} />
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try tI Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
            <html>
            <head>
              <title>Example</title>
              <link rel="stylesheet" href="styles.css">
            </head>
            <body>
              <h1><a href="/">Header</a></h1>
              <nav>
                <a href="one/">One</a>
                <a href="two/">Two</a>
                <a href="three/">Three</a>
              </nav>`}
            codeColor={"text-yellow-25"}
            shadowColor={"yellow"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`def calculate_sum(numbers):
                total = 0
                for number in numbers:
                    total += number
                return total

            numbers = [10, 20, 30, 40]
            result = calculate_sum(numbers)
            print(result)`}
            codeColor={"text-yellow-25"}
            shadowColor={"blue"}
          />
        </div>

        <ExploreMore></ExploreMore>

      </div>

      {/* Section 2 */}
      <div className="homepage-section-two">
        <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mx-auto">

          <div className="h-[90px]"></div>

          <div className="flex flex-row gap-7 text-white">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex items-center gap-3">
                Explore Full Catalog
                <FaArrowRight />
              </div>
            </CTAButton>

            <CTAButton active={false} linkto={"/signup"}>
              <div>
                Learn More
              </div>
            </CTAButton>
          </div>

        </div>


        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">

          <div className="flex flex-row gap-5 mt-10 mb-[95px]">

            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-[16px]">
                The modern Atlas is the dictates its own terms. Today, to be a competitive
                specialist requires more than professional skills.
              </div>

              <CTAButton active={true} linkto={"/signup"}>
                <div>
                  Learn more
                </div>
              </CTAButton>

            </div>

          </div>

        </div>

        <TimelineSection></TimelineSection>

        <LearningLanguageSection></LearningLanguageSection>

      </div>


      {/* Section 3 */}
      <div className="w-full mt-16 bg-black text-white">
        <div className="w-full">
          <InstructorFeature />
        </div>

        <h2 className="text-center text-4xl font-semibold mt-10 mb-32">
          Review from Other Learners
        </h2>

        {/* Review Slider here */}
        <ReviewSlider/>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  )
}

export default Home
