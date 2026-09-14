import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination,Autoplay,Navigation } from "swiper/modules"
import CourseCard from "./Course_Card"

export default function CourseSlider({Courses}){

  return(
    <>
      {
        Courses?.length?(
          <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={24}
          pagination={true}
          modules={[Autoplay,Navigation,Pagination]}
          className="mySwiper w-full"
          autoplay={{
            delay:1500,
            disableOnInteraction:false
          }}
          navigation={true}
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
        ):
        (
          <p className="py-6 text-center text-richblack-300">No Course Found</p>
        )
      }
    </>
  )
}