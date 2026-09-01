import { useSelector } from "react-redux"
import OTPInput from 'react-otp-input'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/authAPI";
import { sendOtp } from "../services/operations/authAPI";
import { BiReset } from "react-icons/bi";


const VerifyEmail=()=>{
  const {signupData,loading}=useSelector((state)=> state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [otp,setOtp]=useState("");

  //if signup data present nahi hai go back to signup page
  useEffect(()=>{
    if(!signupData){
      navigate("/signup");
    }
  })

  const handleOnSubmit=(e)=>{
    e.preventDefault();

    const {accountType,firstName,lastName,email,password,confirmPassword}=signupData;

    dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
  }

  return(
    <div className="min-h-[calc(100vh-3.5rem)] bg-richblack-900 flex items-center justify-center px-4 -translate-y-4">
      {loading ? (
        <div className="text-richblack-5 text-xl font-semibold">
          Loading....
        </div>
      ) : (
        <div className="w-full max-w-[470px]">
          <h1 className="text-richblack-5 text-3xl font-semibold mb-4">Verify Email</h1>
          <p className="text-richblack-300 text-[16px] leading-6 mb-8">A verification code has been sent to you. Enter the code below</p>
          
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-7">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props)=> <input {...props} className="!w-12 !h-12 rounded-md bg-richblack-800 border border-richblack-700 text-richblack-5 text-center text-lg outline-none focus:border-yellow-50 mx-1"></input>}
            />

            <button className="w-full rounded-md bg-yellow-50 py-3 text-richblack-900 font-semibold hover:bg-yellow-100 transition-all duration-200" type="submit">
              Verify Email
            </button>
          </form> 

          <div className="flex items-center justify-between mt-7">
            <div className="flex items-center">
              <Link to="/login"></Link>
              <p className="text-richblack-5 text-sm hover:text-yellow-50 transition-all duration-200 cursor-pointer">← Back to Login</p>
            </div>

            <button className="flex items-center gap-2 text-[#06B6D4] text-base font-medium cursor-pointer bg-transparent border-none hover:text-[#22D3EE] transition-all duration-200" onClick={()=>dispatch(sendOtp(signupData.email))}> 
              <BiReset className="text-xl" /> Resend it
            </button>
          </div>
        </div>

        
      )}
    </div>
  )

}

export default VerifyEmail;