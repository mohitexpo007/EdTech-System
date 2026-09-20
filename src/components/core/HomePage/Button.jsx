import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto} className="relative inline-block group">
      <div
            className={`relative text-center text-[15px] px-6 py-3 rounded-xl font-bold border transition-all duration-300
      ${
        active
          ? "border-[#ff6b00]/40 bg-[#ff6b00] text-black shadow-[0_8px_30px_rgba(255,107,0,0.12)] hover:-translate-y-0.5 hover:bg-[#ff7417] hover:shadow-[0_12px_35px_rgba(255,107,0,0.2)]"
          : "border-white/[0.08] bg-white/[0.035] text-[#d8d8d8] backdrop-blur-xl hover:-translate-y-0.5 hover:border-[#ff6b00]/25 hover:bg-white/[0.06] hover:text-white"
      }`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;