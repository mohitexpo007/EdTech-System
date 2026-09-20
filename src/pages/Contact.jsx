import React from "react"

import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import ContactDetails from "../components/core/ContactUsPage/ContactDetails"
import ContactForm from "../components/core/ContactUsPage/ContactForm"

const Contact = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030405] text-white">

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />

      {/* Ambient Glows */}
      <div className="pointer-events-none absolute -left-40 top-40 h-[500px] w-[500px] rounded-full bg-orange-600/[0.06] blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 top-[500px] h-[500px] w-[500px] rounded-full bg-orange-500/[0.04] blur-[140px]" />

      <div className="relative z-10">

        {/* Contact Section */}
        <div className="mx-auto mt-20 flex w-11/12 max-w-[1200px] flex-col justify-between gap-8 text-white lg:flex-row">

          {/* Contact Details */}
          <div className="lg:w-[40%]">
            <ContactDetails />
          </div>

          {/* Contact Form */}
          <div className="lg:w-[60%]">
            <ContactForm />
          </div>

        </div>

        {/* Reviews */}
        <div className="relative mx-auto my-24 flex w-11/12 max-w-[1200px] flex-col items-center justify-between gap-8 text-white">

          {/* Glow behind heading */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-orange-500/[0.05] blur-[100px]" />

          <div className="relative text-center">

            <div className="mb-3 flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff6b00] shadow-[0_0_10px_rgba(255,107,0,0.8)]" />

              <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#ff7b22]">
                Community
              </span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Reviews from other learners
            </h1>

            <p className="mx-auto mt-3 max-w-[550px] text-sm leading-6 text-[#73777c]">
              See what learners have to say about their experience with Atlas.
            </p>

          </div>

          <div className="relative w-full">
            <ReviewSlider />
          </div>

        </div>

        <Footer />

      </div>
    </div>
  )
}

export default Contact