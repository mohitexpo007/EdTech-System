import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../../data/countrycode.json"
import { apiConnector } from "../../../services/apiconnector"
import { contactusEndpoint } from "../../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    try {
      setLoading(true)

      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )

      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={handleSubmit(submitContactForm)}
    >

      {/* First / Last Name */}
      <div className="flex flex-col gap-5 lg:flex-row">

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label
            htmlFor="firstname"
            className="text-xs font-medium uppercase tracking-wider text-[#8a8e93]"
          >
            First Name
          </label>

          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-[#4f5358] hover:border-white/[0.13] focus:border-[#ff6b00]/50 focus:bg-white/[0.05] focus:shadow-[0_0_25px_rgba(255,107,0,0.05)]"
            {...register("firstname", { required: true })}
          />

          {errors.firstname && (
            <span className="-mt-1 text-[11px] text-[#ff7b22]">
              Please enter your name.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label
            htmlFor="lastname"
            className="text-xs font-medium uppercase tracking-wider text-[#8a8e93]"
          >
            Last Name
          </label>

          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-[#4f5358] hover:border-white/[0.13] focus:border-[#ff6b00]/50 focus:bg-white/[0.05] focus:shadow-[0_0_25px_rgba(255,107,0,0.05)]"
            {...register("lastname")}
          />
        </div>

      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">

        <label
          htmlFor="email"
          className="text-xs font-medium uppercase tracking-wider text-[#8a8e93]"
        >
          Email Address
        </label>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-[#4f5358] hover:border-white/[0.13] focus:border-[#ff6b00]/50 focus:bg-white/[0.05] focus:shadow-[0_0_25px_rgba(255,107,0,0.05)]"
          {...register("email", { required: true })}
        />

        {errors.email && (
          <span className="-mt-1 text-[11px] text-[#ff7b22]">
            Please enter your Email address.
          </span>
        )}

      </div>

      {/* Phone */}
      <div className="flex flex-col gap-2">

        <label
          htmlFor="phonenumber"
          className="text-xs font-medium uppercase tracking-wider text-[#8a8e93]"
        >
          Phone Number
        </label>

        <div className="flex gap-3">

          <div className="flex w-[105px] flex-col gap-2">

            <select
              name="countrycode"
              id="countrycode"
              className="w-full rounded-xl border border-white/[0.08] bg-[#0a0b0d] px-3 py-3 text-sm text-[#c8cbd0] outline-none transition-all duration-300 hover:border-white/[0.13] focus:border-[#ff6b00]/50"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} - {ele.country}
                  </option>
                )
              })}
            </select>

          </div>

          <div className="flex w-[calc(100%-118px)] flex-col gap-2">

            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="w-full rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-[#4f5358] hover:border-white/[0.13] focus:border-[#ff6b00]/50 focus:bg-white/[0.05] focus:shadow-[0_0_25px_rgba(255,107,0,0.05)]"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: {
                  value: 12,
                  message: "Invalid Phone Number",
                },
                minLength: {
                  value: 10,
                  message: "Invalid Phone Number",
                },
              })}
            />

          </div>

        </div>

        {errors.phoneNo && (
          <span className="-mt-1 text-[11px] text-[#ff7b22]">
            {errors.phoneNo.message}
          </span>
        )}

      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">

        <label
          htmlFor="message"
          className="text-xs font-medium uppercase tracking-wider text-[#8a8e93]"
        >
          Message
        </label>

        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Tell us what you have in mind..."
          className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.035] px-4 py-3 text-sm text-white outline-none backdrop-blur-xl transition-all duration-300 placeholder:text-[#4f5358] hover:border-white/[0.13] focus:border-[#ff6b00]/50 focus:bg-white/[0.05] focus:shadow-[0_0_25px_rgba(255,107,0,0.05)]"
          {...register("message", { required: true })}
        />

        {errors.message && (
          <span className="-mt-1 text-[11px] text-[#ff7b22]">
            Please enter your Message.
          </span>
        )}

      </div>

      {/* Submit */}
      <button
        disabled={loading}
        type="submit"
        className={`group relative overflow-hidden rounded-xl border border-[#ff6b00]/40 bg-[#ff6b00] px-6 py-3.5 text-center text-sm font-semibold text-black shadow-[0_8px_30px_rgba(255,107,0,0.12)] transition-all duration-300 ${
          !loading &&
          "hover:-translate-y-0.5 hover:bg-[#ff7417] hover:shadow-[0_12px_35px_rgba(255,107,0,0.2)] active:translate-y-0"
        } disabled:cursor-not-allowed disabled:bg-[#34363a] disabled:text-[#777b80]`}
      >
        <span className="relative z-10">
          {loading ? "Sending..." : "Send Message"}
        </span>

        {!loading && (
          <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
        )}
      </button>

    </form>
  )
}

export default ContactUsForm