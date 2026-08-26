import React, { useEffect, useState } from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  shadowColor
}) => {
  const [code, setCode] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    const done = code.length === codeblock.length;
    const empty = code.length === 0;

    const delay = done && !deleting ? 3000 : deleting ? 5 : 35;

    const timer = setTimeout(() => {
      if (!deleting && !done)
        setCode(codeblock.slice(0, code.length + 1));
      else if (!deleting && done)
        setDeleting(true);
      else if (deleting && !empty)
        setCode(codeblock.slice(0, code.length - 1));
      else if (deleting && empty)
        setDeleting(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [code, deleting, codeblock]);

  // Syntax highlighting
  const highlight = (line) =>
    line
      .split(
        /(<!DOCTYPE html>|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:href|rel|src|className|class|id|type|title|def|for|in|if|else|elif|return|print|import|from|True|False|None)\b)/g
      )
      .map((part, i) => {
        const color =
          part === "<!DOCTYPE html>"
            ? "#FBBF24"
            : /^(def|for|in|if|else|elif|return|print|import|from|True|False|None)$/.test(part)
            ? "#F43F5E"
            : /^(href|rel|src|className|class|id|type|title)$/.test(part)
            ? "#F43F5E"
            : /^["'].*["']$/.test(part)
            ? "#FBBF24"
            : "#CBD5E1";

        return (
          <span key={i} style={{ color }}>
            {part}
          </span>
        );
      });

  const lines = code.split("\n");

  return (
    <div className={`flex ${position} my-20 justify-between flex-col lg:gap-10 gap-10 w-full min-w-0`}>

      {/* Content */}
      <div className="w-full lg:w-[50%] min-w-0 flex flex-col gap-8">
        {heading}

        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
          {subheading}
        </div>

        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative h-fit flex py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 w-full lg:w-[470px] max-w-full min-w-0 overflow-hidden">

        {/* Glows */}
        {shadowColor === "yellow" && (
          <>
            <div className="absolute -top-20 left-10 h-64 w-96 rounded-full bg-yellow-500/30 blur-[65px]" />
            <div className="absolute top-0 right-10 h-40 w-56 rounded-full bg-orange-500/10 blur-[75px]" />
          </>
        )}

        {shadowColor === "blue" && (
          <>
            <div className="absolute -top-20 left-10 h-64 w-96 rounded-full bg-blue-500/30 blur-[65px]" />
            <div className="absolute top-0 right-10 h-40 w-56 rounded-full bg-cyan-500/10 blur-[75px]" />
          </>
        )}

        {/* Transparent background */}
        <div className="absolute inset-0 bg-richblack-900/40 backdrop-blur-sm border border-richblack-600/40" />
        {backgroundGradient}

        {/* Line numbers */}
        <div className="relative z-10 shrink-0 w-[10%] text-center select-none text-richblack-400 font-inter font-bold">
          {lines.map((_, i) => (
            <div key={i} className="h-[18px] sm:h-[24px] leading-[18px] sm:leading-6">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code */}
        <div className="relative z-10 min-w-0 w-[90%] overflow-hidden font-bold font-mono pr-2">
          {lines.map((line, i) => (
            <div
              key={i}
              className="h-[18px] sm:h-[24px] leading-[18px] sm:leading-6 whitespace-nowrap overflow-hidden"
            >
              {highlight(line)}
              {i === lines.length - 1 && (
                <span className="animate-pulse text-slate-400">|</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;