import React from 'react'

const HighlightText = ({ text }) => {
  return (
    <span
      className="inline-block font-bold mx-2 py-1 -my-1"
      style={{
        background: "linear-gradient(90deg, #00d9ff, #00bfff, #38bdf8, #00d9ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {text}
    </span>
  )
}

export default HighlightText