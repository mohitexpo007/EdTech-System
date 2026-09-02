import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from "../components/core/AboutPage/Stats";
import LearningGrid from "../components/core/AboutPage/LearningGrid";

const About=()=>{
  return(
    <div className="bg-richblack-900 text-richblack-5">
      {/* section 1 */}
      <section className="bg-richblack-800 pt-14 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-20">
        <div className="w-11/12 max-w-[1200px] mx-auto">
          <header className="flex flex-col items-center text-center">
            <p className="text-richblack-300 text-base sm:text-lg mb-6 sm:mb-10">About us</p>
            <h1 className="text-3xl sm:text-4xl font-semibold leading-[1.3] max-w-[900px]">Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/></h1>
            <p className="mt-5 sm:mt-6 max-w-[850px] text-richblack-300 text-base sm:text-lg leading-6 sm:leading-7">Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>

            <div className="relative z-10 flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-4 lg:gap-x-6 mx-auto mt-8 sm:mt-12 w-full justify-center -mb-24 sm:-mb-28 lg:-mb-36">
              <img className="w-full sm:w-[32%] max-w-[380px] mx-auto object-cover" src={BannerImage1}/>
              <img className="w-full sm:w-[32%] max-w-[380px] mx-auto object-cover" src={BannerImage2}/>
              <img className="w-full sm:w-[32%] max-w-[380px] mx-auto object-cover" src={BannerImage3}/>
            </div>
          </header>
        </div> 
      </section>

      {/* section 2 */}  
      <section className="bg-richblack-900 pt-28 sm:pt-32 lg:pt-36 pb-2">
        <div className="w-full">
          <Quote/>
        </div>
      </section>


      {/* section 3 */}
      <section className="bg-richblack-900 py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col w-11/12 max-w-[1200px] mx-auto gap-y-24 sm:gap-y-28 lg:gap-y-36">
          {/* founding story box */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-y-12 lg:gap-y-0 gap-x-20">
            {/* founding story left box */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl sm:text-[36px] leading-9 sm:leading-[44px] tracking-[-2%] font-bold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent mb-5 sm:mb-6">Our Founding Story</h1>
              
              <p className="text-richblack-200 text-base sm:text-lg leading-7 sm:leading-8 mb-5 sm:mb-6">
                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
              </p>
              
              <p className="text-richblack-200 text-base sm:text-lg leading-7 sm:leading-8">
                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
              </p>
            </div>

            {/* founding story right box */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <img className="w-full max-w-[520px] drop-shadow-[0_0_45px_rgba(255,166,0,0.18)]" src={FoundingStory} />
            </div>
          </div>

          {/* vision and mission wala div */}
          <div className="flex flex-col lg:flex-row justify-between gap-y-16 lg:gap-y-0 gap-x-24">
            {/* left box */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl sm:text-[36px] leading-9 sm:leading-[44px] tracking-[-2%] font-bold bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent mb-5 sm:mb-6">
                Our Vision
              </h1>
              <p className="text-richblack-200 text-base sm:text-lg leading-7 sm:leading-8">
                With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
              </p>
            </div>

            {/* right box */}
            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl sm:text-4xl font-semibold mb-5 sm:mb-6">
                <HighlightText text="Our Mission"/>
              </h1>
              <p className="text-richblack-200 text-base sm:text-lg leading-7 sm:leading-8">
                Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <StatsComponent/>

      {/* section 5 */}
      <section>
        <LearningGrid/>
      </section>

    </div>
  )
}

export default About;