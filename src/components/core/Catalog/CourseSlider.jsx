import { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, Pagination } from "swiper/modules"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import CourseCard from "./Course_Card"

export default function CourseSlider({Courses}){
  const [swiper, setSwiper] = useState(null)

  return(
    <>
      {
        Courses?.length?(
          <div className="category-slider">
          <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={24}
          pagination={true}
          modules={[Autoplay,Pagination]}
          className="mySwiper w-full"
          autoplay={{
            delay:1500,
            disableOnInteraction:false
          }}
          onSwiper={setSwiper}
          breakpoints={{
            640:{slidesPerView:2},
            1024:{slidesPerView:3}
          }}
          >
            {
              Courses.map((course,index)=>(
                <SwiperSlide key={index} className="!h-auto">
                  <CourseCard course={course} Height={"h-[250px]"}/>
                </SwiperSlide>
              ))
            }
          </Swiper>
          <button type="button" className="category-slider__button category-slider__button--prev" aria-label="Previous courses" onClick={() => swiper?.slidePrev()}>
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className="category-slider__button category-slider__button--next" aria-label="Next courses" onClick={() => swiper?.slideNext()}>
            <FaChevronRight aria-hidden="true" />
          </button>
          </div>
        ):
        (
          <p className="py-6 text-center text-richblack-300">No Course Found</p>
        )
      }
    </>
  )
}