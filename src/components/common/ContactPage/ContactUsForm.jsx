import { useState,useEffect } from "react";
import {useForm} from "react-hook-form";
import { apiConnector } from "../../../services/apiconnector";
import { contactusEndpoint } from "../../../services/apis";
import toast from "react-hot-toast";
import CountryCode from "../../../data/countrycode.json"

const ContactUsForm=()=>{
  const [loading,setLoading]=useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors,isSubmitSuccessful}
  }=useForm();

  const submitContactForm=async(data)=>{
    console.log("Logging Data",data);
    try{
      setLoading(true);
      const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
      console.log("Logging response",response);
      setLoading(false);
      toast.success("Message Recieved")
    }
    catch(error){
      console.log("Error: ",error.message);
      toast.error("Please try again")
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(isSubmitSuccessful){
      reset({
        email:"",
        firstname:"",
        lastname:"",
        message:"",
        phoneNo:"",
      })
    }
  },[reset,isSubmitSuccessful])
  //form ka state change hone pr reset function ki definition change hogi

  return(
    //we will use useFormHook which manages state itself also validation also managed by it 
    <form className="w-11/12 max-w-[520px] mx-auto flex flex-col gap-y-5" onSubmit={handleSubmit(submitContactForm)}>

      <div className="flex flex-col sm:flex-row gap-5">
        {/* first name */}
        <div className="flex flex-col w-full gap-y-2">
          <label className="text-sm text-richblack-5" htmlFor="firstname">First Name</label>
          <input
            className="w-full rounded-md bg-richblack-800 px-3 py-3 text-richblack-5 placeholder:text-richblack-400 outline-none border border-richblack-700 focus:border-yellow"
            type='text'
            name='firstname'
            id='firstname'
            placeholder="Enter first name"
            {...register("firstname",{required:true})}
            />
            {
              errors.firstname && (
                <span className="text-xs text-pink-200">
                  Please enter Your name
                </span>
              )
            }
        </div>

        {/* last name */}
        <div className="flex flex-col w-full gap-y-2">
          <label className="text-sm text-richblack-5" htmlFor="lastname">Last Name</label>
          <input
            className="w-full rounded-md bg-richblack-800 px-3 py-3 text-richblack-5 placeholder:text-richblack-400 outline-none border border-richblack-700 focus:border-yellow"
            type='text'
            name='lastname'
            id='lastname'
            placeholder="Enter last name"
            {...register("lastname")}
            />
        </div>
      </div>
      
      {/* email */}
      <div className="flex flex-col gap-y-2">
        <label className="text-sm text-richblack-5" htmlFor="email">Email Address</label>
        <input
          className="w-full rounded-md bg-richblack-800 px-3 py-3 text-richblack-5 placeholder:text-richblack-400 outline-none border border-richblack-700 focus:border-yellow"
          type='email'
          name='email'
          id='email'
          placeholder='Enter email Address'
          {...register("email",{required:true})}
        />
        {
          errors.email && (
            <span className="text-xs text-pink-200">
              Please enter your email
            </span>
          )
        }
      </div>

      {/* phoneNo */}
      <label className="text-sm text-richblack-5" htmlFor="phonenumber">Phone Number</label>
      <div className="flex gap-x-3">
        
      <div className="w-[110px]">
        <select className="w-full h-[48px] rounded-md bg-richblack-800 px-3 text-richblack-200 outline-none border border-richblack-700 focus:border-yellow-50" name="dropdown" id="dropdown" {...register("countrycode",{required:true})}>
          {
            CountryCode.map((element,index)=>{
              return(
                <option key={index} value={element.code}>
                  {element.code} -{element.country}
                </option>
              )
            })
          }
        </select>
      </div>
      <div className="flex-1">
        <input className="w-full h-[48px] rounded-md bg-richblack-800 px-3 text-richblack-5 placeholder:text-richblack-400 outline-none border border-richblack-700 focus:border-yellow-50" type="tel" name="phoneNo" id="phonenumber" placeholder="12345 67890" {...register("phoneNo",{required:true,maxLength:{value:10,message:"Invalid Phone number"},minLength:{value:8,message:"Invalid Phone number"}})} />
      </div>
        {
          errors.countrycode && (
            <span className="text-xs text-pink-200">
              Please select your country code
            </span>
          )
        }
        {
          errors.phoneNo && (
            <span className="text-xs text-pink-200">
              Please enter your phone number
            </span>
          )
        }
      </div>

      {/* message */}
      <div className="flex flex-col gap-y-2">
        <label className="text-sm text-richblack-5" htmlFor="message">Message</label>
        <textarea
          className="w-full rounded-md bg-richblack-800 px-3 py-3 text-richblack-5 placeholder:text-richblack-400 outline-none border border-richblack-700 focus:border-yellow resize-none"
          name="message"
          id='message'
          cols='30'
          rows='7'
          placeholder="Enter Your message here"
          {...register("message",{required:true})}
        />
        {
          errors.message && (
            <span className="text-xs text-pink-200">
              Please enter your message
            </span>
          )
        }
      </div>

      <button type='submit'
      className="w-full rounded-md bg-yellow-50 py-3 text-center px-6 text-[16px] font-bold text-black hover:bg-yellow-25 hover:scale-[0.98] transition-all duration-200"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>

    </form>
      
  )
}

export default ContactUsForm;