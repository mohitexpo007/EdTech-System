import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaBolt, FaExpandArrowsAlt, FaMobileAlt, FaReact } from "react-icons/fa";
import { Link } from "react-router-dom";
import heroPoster from "../../../../assets/HomeHero/studynotion-hero-poster.png";
import heroVideo from "../../../../assets/HomeHero/studynotion-hero.mp4";
import "./Hero.css";

const orbitItems = [
  { id: 1, title: "HTML", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", className: "orbit-item-1" },
  { id: 2, title: "CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", className: "orbit-item-2" },
  { id: 3, title: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", className: "orbit-item-3" },
  { id: 4, title: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", className: "orbit-item-4" },
  { id: 5, title: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", className: "orbit-item-5" },
  { id: 6, title: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", className: "orbit-item-6" },
];

const orbitTransition = (duration) => ({ duration, repeat: Infinity, ease: "linear" });

function FloatingSkill({ item }) {
  return (
    <motion.div className={`floating-skill ${item.className}`} whileHover={{ scale: 1.12, zIndex: 100 }}>
      <img className="floating-skill-icon" src={item.icon} alt={`${item.title} skill`} />
      <span>{item.title}</span>
    </motion.div>
  );
}

function UserCard({ initials, name, role, className }) {
  return (
    <motion.div className={`user-card ${className}`} whileHover={{ scale: 1.08 }}>
      <div className="user-avatar">{initials}</div>
      <div className="user-card-content"><span className="user-name">{name}</span><span className="user-role">{role}</span></div>
    </motion.div>
  );
}

function HeroOrbit() {
  return (
    <div className="hero-visual" aria-label="Atlas learning technologies">
      <div className="hero-glow" />
      <motion.div className="orbit-ring orbit-ring-large" animate={{ rotate: 360 }} transition={orbitTransition(45)} />
      <motion.div className="orbit-ring orbit-ring-small" animate={{ rotate: -360 }} transition={orbitTransition(32)} />
      <motion.div className="orbit-system" animate={{ rotate: 360 }} transition={orbitTransition(35)}>
        {orbitItems.map((item) => <FloatingSkill key={item.id} item={item} />)}
      </motion.div>
      <motion.div className="user-orbit" animate={{ rotate: -360 }} transition={orbitTransition(42)}>
        <UserCard initials="ST" name="Student" role="Learning" className="user-card-one" />
        <UserCard initials="DV" name="Developer" role="Building" className="user-card-two" />
        <UserCard initials="LR" name="Learner" role="Growing" className="user-card-three" />
      </motion.div>
      <motion.div className="hero-center" animate={{ y: [-8, 8, -8], rotateX: [1, -1, 1], rotateY: [-2, 2, -2] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
        <div className="hero-center-glow" />
        <div className="hero-video-card">
          <video autoPlay muted loop playsInline poster={heroPoster} aria-label="Atlas course preview"><source src={heroVideo} type="video/mp4" /></video>
          <div className="video-overlay" />
          <div className="video-label"><span className="status-dot" /> Learn. Build. Grow.</div>
        </div>
        <div className="center-badge"><strong>250+</strong><span>Courses</span></div>
      </motion.div>
      <span className="particle particle-1" /><span className="particle particle-2" /><span className="particle particle-3" /><span className="particle particle-4" />
    </div>
  );
}

const reveal = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay } });

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-grid" />
      <div className="hero-container">
        <div className="hero-content">
          <motion.div className="hero-eyebrow" {...reveal()}><span>✦</span> Empowering Learners</motion.div>
          <motion.h1 {...reveal(0.1)}>Empower Your Future<br />with <span className="orange-text">World-Class</span><br />Online Learning</motion.h1>
          <motion.p {...reveal(0.2)}>Atlas brings high-quality education within everyone&apos;s reach. Learn from expert instructors and build the skills you need for your future.</motion.p>
          <motion.div className="hero-buttons" {...reveal(0.3)}>
            <Link className="primary-button" to="/category/web-dev">Explore Courses <FaArrowRight /></Link>
            <Link className="secondary-button" to="/about">Learn More</Link>
          </motion.div>
        </div>
        <HeroOrbit />
      </div>
      <div className="hero-stats">
        <div className="stat"><FaBolt className="stat-icon" /><div><strong>1ms</strong><span>Fast Response</span></div></div>
        <div className="stat"><FaExpandArrowsAlt className="stat-icon" /><div><strong>10K+</strong><span>Scalable Requests</span></div></div>
        <div className="stat"><FaMobileAlt className="stat-icon" /><div><strong>100%</strong><span>Responsive UI</span></div></div>
        <div className="stat"><FaReact className="stat-icon" /><div><strong>React</strong><span>Powered Frontend</span></div></div>
      </div>
    </section>
  );
}
