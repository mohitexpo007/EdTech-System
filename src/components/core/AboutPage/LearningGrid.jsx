import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../../core/HomePage/Button"

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid=()=>{
  return(
    <div className="grid w-11/12 max-w-[1300px] mx-auto grid-cols-1 lg:grid-cols-4 mb-20 mt-20">
      {
        LearningGridArray.map((card,index)=>{
          return(
            <div key={index}
            className={`${index === 0 && "lg:col-span-2 bg-richblack-900"}
            ${
             card.order%2===1?"bg-richblack-700" : "bg-richblack-800"
            }
            ${card.order===3 && "lg:col-start-2"}
            `}
            >
              {
                card.order<0 ? (
                  <div className="flex flex-col gap-y-6 sm:gap-y-8 p-6 sm:p-8 lg:p-10">
                    <div className="text-3xl sm:text-4xl font-semibold leading-9 sm:leading-[44px] text-richblack-5">
                      {card.heading}
                      <HighlightText text={card.highlightText}/>
                    </div>
                    <p className="text-richblack-300 text-base sm:text-lg leading-6 sm:leading-7">
                      {card.description}
                    </p>
                    <div>
                    <CTAButton active={true} linkto={card.BtnLink}>
                      {card.BtnText}
                    </CTAButton>
                    </div>
                  </div>
                ):(
                  <div className="flex flex-col gap-y-8 sm:gap-y-12 p-6 sm:p-8 lg:p-10 min-h-0 lg:min-h-[348px]">
                    <h1 className="text-richblack-5 text-xl sm:text-2xl font-semibold leading-7 sm:leading-8 max-w-full lg:max-w-[250px]">
                      {card.heading}
                    </h1>
                    <p className="text-richblack-300 text-base sm:text-lg leading-6 sm:leading-7 max-w-full lg:max-w-[300px]">
                      {card.description}
                    </p>
                  </div>
                )
              }
            </div>
          )
        })
      }
      
    </div>
  )
}

export default LearningGrid;