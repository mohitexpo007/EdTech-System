import React from "react"
import * as Icon1 from "react-icons/bi"
import * as Icon3 from "react-icons/hi2"
import * as Icon2 from "react-icons/io5"

const contactDetails = [
  {
    icon: "HiChatBubbleLeftRight",
    heading: "Chat on us",
    description: "Our friendly team is here to help.",
    details: "info@studynotion.com",
  },
  {
    icon: "BiWorld",
    heading: "Visit us",
    description: "Come and say hello at our office HQ.",
    details:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    icon: "IoCall",
    heading: "Call us",
    description: "Mon - Fri From 8am to 5pm",
    details: "+123 456 7869",
  },
]

const ContactDetails = () => {
  return (
    <div className="relative flex flex-col gap-4">

      {/* Small heading */}
      <div className="mb-2">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b00] shadow-[0_0_10px_rgba(255,107,0,0.7)]" />

          <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#ff7b22]">
            Get in touch
          </span>
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-white">
          Let&apos;s connect.
        </h2>

        <p className="mt-2 max-w-[380px] text-sm leading-6 text-[#777b80]">
          Have a question, idea, or just want to talk? Reach out to the Atlas
          team.
        </p>
      </div>

      {contactDetails.map((ele, i) => {
        let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon]

        return (
          <div
            className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#ff6b00]/25 hover:bg-white/[0.045] hover:shadow-[0_15px_45px_rgba(255,107,0,0.06)]"
            key={i}
          >

            {/* Card Glow */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-orange-500/[0.06] blur-3xl transition-all duration-500 group-hover:bg-orange-500/[0.12]" />

            <div className="relative flex gap-4">

              {/* Icon */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#ff6b00]/15 bg-[#ff6b00]/[0.07] text-[#ff7b22] transition-all duration-500 group-hover:scale-105 group-hover:border-[#ff6b00]/30 group-hover:bg-[#ff6b00]/[0.12] group-hover:shadow-[0_0_25px_rgba(255,107,0,0.08)]">
                <Icon size={21} />
              </div>

              <div className="min-w-0">

                <h3 className="text-base font-semibold text-[#eeeeee]">
                  {ele?.heading}
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#70747a]">
                  {ele?.description}
                </p>

                <p className="mt-2 break-words text-sm font-medium text-[#b8bbc0] transition-colors duration-300 group-hover:text-[#ff9a52]">
                  {ele?.details}
                </p>

              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDetails