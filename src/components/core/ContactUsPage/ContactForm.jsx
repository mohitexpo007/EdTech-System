import React from "react"
import ContactUsForm from "./ContactUsForm"

const ContactForm = () => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:p-10">

      {/* Ambient Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/[0.07] blur-[100px] transition-all duration-700 group-hover:bg-orange-500/[0.1]" />

      <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-orange-600/[0.035] blur-[100px]" />

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10">

        {/* Header */}
        <div className="mb-8">

          <div className="mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00] shadow-[0_0_10px_rgba(255,107,0,0.8)]" />

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#ff7b22]">
              Contact Atlas
            </span>
          </div>

          <h1 className="max-w-[650px] text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            Got an idea?
            <br />
            <span className="text-[#ff7417]">
              Let&apos;s build it together.
            </span>
          </h1>

          <p className="mt-4 max-w-[600px] text-sm leading-6 text-[#777b80]">
            Tell us more about yourself and what you&apos;ve got in mind.
            We&apos;ll get back to you as soon as possible.
          </p>

        </div>

        {/* Form */}
        <ContactUsForm />

      </div>
    </div>
  )
}

export default ContactForm