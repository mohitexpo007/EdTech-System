import { useSelector } from "react-redux"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { useLocation } from "react-router-dom";
import { AiFillEyeInvisible,AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const UpdatePassword=()=>{
  const {loading}=useSelector((state)=> state.auth);
  const dispatch=useDispatch();
  const location=useLocation();

  const [formData,setFormData]=useState({
    password:"",
    confirmPassword:""
  })
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);

  const {password,confirmPassword}=formData;

  const handleOnChange=(e)=>{
    setFormData((prevData)=>(
      {
        ...prevData,
        [e.target.name]:e.target.value
      }
    ))
  }

  const handleOnSubmit=(e)=>{
    e.preventDefault();
    const token=location.pathname.split('/').at(-1);
    dispatch(resetPassword(password,confirmPassword,token));
  }

  return(
    <div className="min-h-[calc(100vh-3.5rem)] bg-richblack-900 flex items-center justify-center px-4 -translate-y-4">
      {loading ? (
        <div className="text-richblack-5 text-xl font-semibold">
          Loading....
        </div>
      ):(
        <div className="w-full max-w-[444px]">
          <h1 className="text-richblack-5 text-3xl font-semibold mb-3">Choose  new password</h1>
          <p className="text-richblack-300 text-[16px] leading-6 mb-8">Almost done. Enter your new password and youre all set.</p>

          <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
            <label className="relative flex flex-col gap-2">
              <p className="text-richblack-5 text-[14px]">New Password<span className="text-pink-200"> *</span></p>
              <input className="w-full rounded-md bg-richblack-800 border border-richblack-700 px-4 py-3 text-richblack-5 outline-none focus:border-yellow-50" required type={showPassword ? "text":"password"} name='password' value={password} onChange={handleOnChange} placeholder="Password" />
              <span className="absolute right-4 bottom-3 cursor-pointer text-richblack-200 -translate-y-1" onClick={()=>setShowPassword((prev)=>!prev)}>
                {
                  showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>
                }
              </span>
            </label>

            <label className="relative flex flex-col gap-2">
              <p className="text-richblack-5 text-[14px]">New Password<span className="text-pink-200"> *</span></p>
              <input className="w-full rounded-md bg-richblack-800 border border-richblack-700 px-4 py-3 text-richblack-5 outline-none focus:border-yellow-50" required type={showConfirmPassword ? "text":"password"} name='confirmPassword' value={confirmPassword} onChange={handleOnChange} placeholder="Confirm Password" />

              //eye icon
              <span className="absolute right-4 bottom-3 cursor-pointer text-richblack-200 -translate-y-9" onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                {
                  showConfirmPassword ? <AiFillEyeInvisible/> : <AiFillEye/>
                }
              </span>
            </label>

            <button className="w-full rounded-md bg-yellow-50 py-3 text-richblack-900 font-semibold hover:bg-yellow-100 transition-all duration-200" type="submit">
              Reset Password
            </button>

            <div className="mt-2">
              <Link to="/login">
                <p className="text-richblack-5 text-sm hover:text-yellow-50 transition-all duration-200">← Back to Login</p>
              </Link>
            </div>
          </form>
        </div>
      )
    }
    </div>
  )
}

export default UpdatePassword;