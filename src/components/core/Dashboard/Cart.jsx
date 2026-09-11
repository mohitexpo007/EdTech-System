import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component"
import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../slices/cartSlice";
import IconBtn from "../../common/IconBtn";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Cart(){

  const {total,totalItems}=useSelector((state)=>state.cart);
  const {cart}=useSelector((state)=>state.cart);
  const dispatch=useDispatch();

  const handleBuyCourse=()=>{
    const courses=cart.map((courses)=>courses._id);
    console.log("Bought these courses:",courses)
    //TODO : API INTEGRATE TO PAYMENT GATEWAY
  }


  return(
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 text-richblack-5">

      <h1 className="text-3xl font-medium mb-8">My Wishlist</h1>
      <p className="border-b border-richblack-700 pb-4 text-base text-richblack-300">{totalItems} Courses in Cart</p>

      {/* cart */}
      {total>0 ? 
      (<div className="w-full max-w-[1050px] pr-0 lg:pr-5 mt-5">
        {/* using map to fetch all the cart items */}
        { 
          cart.map((course,index)=>(
            <div className="grid grid-cols-1 md:grid-cols-[1fr_130px] gap-5 md:gap-8 py-6 border-b border-richblack-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img className="w-full sm:w-[180px] h-[150px] sm:h-[145px] rounded-md object-cover" src={course?.thumbnail}/>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-richblack-5">{course?.courseName}</p>
                  <p className="text-base text-richblack-400 mt-2">{course?.category?.name}</p>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-yellow-50 font-semibold">4.8</span>
                    <ReactStars
                      count={5}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<GiNinjaStar/>}
                      fullIcon={<GiNinjaStar/>}
                    />

                    <span className="text-richblack-400 text-sm">({course?.ratingAndReviews?.length} Ratings)</span>

                  </div>
                </div>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-start gap-5">

                <button
                  className="flex items-center gap-2 rounded-md border border-richblack-600 bg-richblack-800 px-4 py-2 text-pink-200 hover:bg-richblack-700 transition-all"
                  onClick={()=>dispatch(removeFromCart(course._id))}>
                  <RiDeleteBin6Line/>
                  <span>Remove</span>
                </button>

                <p className="text-xl font-semibold text-yellow-50">Rs {course?.price}</p>
              </div>
            </div>
          ))
        }

      </div>):(
        <p className="text-base text-richblack-300 mt-5">Your Cart is Empty</p>
      )}

      {/* checkout and total amount */}
      <div className="w-full max-w-[1050px] lg:max-w-[275px] lg:ml-auto mt-5 rounded-md border border-richblack-700 bg-richblack-800 p-6">
        
        <p className="text-base text-richblack-300 mb-2">Total:</p>
        <p className="text-2xl font-semibold text-yellow-50 mb-5">Rs {total}</p>

        <IconBtn
          text="Buy Now"
          onclick={handleBuyCourse}
          customClasses={"w-full justify-center"}
        />

      </div>
    </div>
  )
}