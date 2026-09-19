import React, { useCallback, useMemo, useRef } from "react";
import HighlightText from "../HighlightText";
import CTAButton from "../Button";
import { FaArrowRight } from "react-icons/fa";
import InstructorShowcase from "../../../../assets/Images/instructor-showcase.png";
import "./InstructorFeature.css";

const BACKGROUND_DOT_COUNT = 52;

const InstructorFeature = () => {
  const sectionRef = useRef(null);
  const dotRefs = useRef([]);
  const backgroundDots = useMemo(() => Array.from({ length: BACKGROUND_DOT_COUNT }, (_, index) => ({
    id: index, left: `${(index * 37 + 9) % 52 + 2}%`, top: `${(index * 53 + 7) % 86 + 7}%`,
    size: 2 + (index % 4), delay: `-${(index % 9) * 0.45}s`, duration: `${4 + (index % 4)}s`,
  })), []);

  const moveDots = useCallback((event) => {
    const section = sectionRef.current;
    if (!section) return;
    const bounds = section.getBoundingClientRect();
    dotRefs.current.forEach((dot) => {
      if (!dot) return;
      const dotX = bounds.left + (Number(dot.dataset.x) / 100) * bounds.width;
      const dotY = bounds.top + (Number(dot.dataset.y) / 100) * bounds.height;
      const deltaX = event.clientX - dotX;
      const deltaY = event.clientY - dotY;
      const distance = Math.hypot(deltaX, deltaY);
      const strength = Math.max(0, 1 - distance / 230) * 14;
      dot.style.setProperty("--cursor-shift-x", distance ? `${(deltaX / distance) * strength}px` : "0px");
      dot.style.setProperty("--cursor-shift-y", distance ? `${(deltaY / distance) * strength}px` : "0px");
    });
  }, []);

  return (
    <section ref={sectionRef} className="instructor-feature" onPointerMove={moveDots}
      onPointerLeave={() => dotRefs.current.forEach((dot) => {
        dot?.style.setProperty("--cursor-shift-x", "0px");
        dot?.style.setProperty("--cursor-shift-y", "0px");
      })}>
      <div className="instructor-feature__dots" aria-hidden="true">
        {backgroundDots.map((dot, index) => <span ref={(node) => { dotRefs.current[index] = node; }} data-x={parseFloat(dot.left)} data-y={parseFloat(dot.top)} key={dot.id} className="instructor-feature__dot" style={{ left: dot.left, top: dot.top, width: dot.size, height: dot.size, animationDelay: dot.delay, animationDuration: dot.duration }} />)}
      </div>
      <div className="instructor-feature__content">
        <span className="instructor-feature__eyebrow">Teach with Atlas</span>
        <h2>Become an <HighlightText text="Instructor" /></h2>
        <p>Instructors from around the world teach millions of students on Atlas. We provide the tools and skills to teach what you love.</p>
        <div className="instructor-feature__cta"><CTAButton active={true} linkto="/signup"><span className="flex flex-row gap-2 items-center">Start Learning Today <FaArrowRight /></span></CTAButton></div>
      </div>
      <div className="instructor-feature__visual" aria-hidden="true"><img src={InstructorShowcase} alt="" /></div>
    </section>
  );
};

export default InstructorFeature;
