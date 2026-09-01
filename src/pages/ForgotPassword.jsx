import { useState } from "react";
import { useSelector } from "react-redux"
import { getPasswordResetToken } from "../services/operations/authAPI";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";


const ForgotPassword=()=>{

  const {loading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [emailSent,setEmailSent]=useState(false);
  const [email,setEmail]=useState("");

  const submitHandler=(e)=>{
    e.preventDefault();
    //sends the link wala token to gmail from backend
    dispatch(getPasswordResetToken(email,setEmailSent));
  }

  return(
    <div className="min-h-[calc(100vh-3.5rem)] bg-richblack-900 flex items-center justify-center px-4 -translate-y-12">
      {
        loading ? (
          <div className="text-white text-xl font-semibold"> Loading... </div>
        ):(
          //We are checking according to email is sent or not use emailSent flag which page to render resetPassword page or mail send page

          <div className="w-full max-w-[450px]">
            <h1 className="text-3xl font-semibold text-richblack-5 mb-4">
              {
                !emailSent ? "Reset your Password" : "Check Your Email"
              }
            </h1>

            <p className="text-[16px] leading-6 text-richblack-300 mb-8">
              {
                !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
              }
            </p>

              <form className="flex flex-col gap-6" onSubmit={submitHandler}>
                {
                  !emailSent && (
                    <label className="flex flex-col gap-2">
                      <p className="text-[14px] text-richblack-5">Email Address<span className="text-pink-200"> *</span></p>
                      <input className="w-full rounded-md bg-richblack-800 border border-richblack-700 px-4 py-3 text-richblack-5 outline-none focus:border-yellow-50" required type='email' name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email Address"></input>
                    </label>
                  )
                }


                <button className="w-full rounded-md bg-yellow-50 py-3 text-richblack-900 font-semibold hover:bg-yellow-100 transition-all duration-200">
                  {
                    !emailSent ? "Reset Password" : "Resend Email"
                  }
                </button>
              </form>
              
              <div className="mt-6">
                <button className="text-richblack-5 text-sm hover:text-yellow-50 transition-all duration-200 flex items-center gap-2" onClick={()=> navigate(-1)}>
                  ← Back to login
                </button>
              </div>
          </div>
        )
      }
    </div>
  )
}

export default ForgotPassword;