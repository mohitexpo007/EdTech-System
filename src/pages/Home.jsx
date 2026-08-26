import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from "../components/core/HomePage/Button"
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks';

const Home = () => {
  return (
    <div>
      <Link to={"/signup"}></Link>

      {/*Section1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">

        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-1 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p className='text-white'>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={" Coding Skills"} />

          <div className="mt-4 w-[90%] text-center text-lg font-bold text-richblack-300">
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
          </div>
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* Video Section */}
        <div className="relative mx-3 my-12 w-[83%]">

          <div className="absolute -inset-5 bg-sky-400/10 blur-2xl"></div>

          {/* White offset layer behind video */}
          <div className="absolute -right-5 -bottom-5 h-full w-full bg-white"></div>

          {/* Video + blue/dark shadow */}
          <div className="relative z-10 shadow-[0_-15px_45px_rgba(56,189,248,0.25),0_0_35px_rgba(0,0,0,0.55)]">

            <video
              muted
              loop
              autoPlay
              className="w-full"
            >
              <source src={Banner} type="video/mp4" />
            </video>

          </div>

        </div>

        {/* Code Section 1 */}
        <div>
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

      </div>

      {/*Section 2 */}


      {/*Section 3 */}


      {/*Footer */}

    </div>
  )
}

export default Home