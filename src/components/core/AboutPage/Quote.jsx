import HighlightText from "../HomePage/HighlightText";
const Quote=()=>{
  return(
    <div className="mx-auto w-11/12 max-w-[1200px] py-12 text-center">
      <p className="text-4xl font-semibold leading-[1.4] text-richblack-100">
        <span className="text-richblack-600">“</span> We are passionate about revolutionizing the way we learn. Our innovative platform <span className="bg-gradient-to-r from-blue-200 to-blue-50 bg-clip-text text-transparent"><HighlightText text="combines technology"/></span>, <span className="text-[36px] leading-[52px] tracking-[-2%] font-semibold bg-gradient-to-r from-[#FF512F] to-[#F09819] bg-clip-text text-transparent">expertise</span>, and community to create an <span className="text-[36px] leading-[52px] tracking-[-2%] font-semibold bg-gradient-to-r from-[#E65C00] to-[#F9D423] bg-clip-text text-transparent">unparalleled educational experience.</span><span className="text-richblack-600">”</span>
      </p>
    </div>
  )
}

export default Quote;