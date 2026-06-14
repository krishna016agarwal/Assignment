import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BadgeCheck,
  HandHeart,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        },
      );
    });
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="blob one" />
        <div className="blob two" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="eyebrow">
            <Sparkles size={18} /> Youth-led social impact movement
          </p>
          <h1>
            Small wings. Big change. Become a volunteer at{" "}
            <span>NayePankh Foundation.</span>
          </h1>
          <p className="hero-subtitle">
            A beautiful platform for registering volunteers, managing
            applications, tracking impact and generating reports through a
            secure admin dashboard.
          </p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/register">
              Start Volunteering <ArrowRight size={18} />
            </Link>
            <Link className="secondary-btn" to="/login">
              Admin Login
            </Link>
          </div>
          <div className="hero-stats glass">
            <div>
              <b>45+</b>
              <span>seed volunteers</span>
            </div>
            <div>
              <b>7</b>
              <span>impact areas</span>
            </div>
            <div>
              <b>100%</b>
              <span>responsive UI</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="hero-card glass"
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="floating-card top">
            <BadgeCheck /> Verified NGO-style dashboard
          </div>
          <div className="circle-visual">
            <HandHeart size={80} />
          </div>
          <h3>Volunteer Impact Hub</h3>
          <p>Education • Events • Fundraising • Field Work</p>
          <div className="progress">
            <span style={{ width: "78%" }} />
          </div>
        </motion.div>
      </section>

      <section
        className="impact-section"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div>
          <p className="section-tag">Mission</p>
          <h2>Empowering students to build social responsibility</h2>
          <p>
            Use this website as your college/internship project. The frontend
            looks modern, the backend is structured, and fake data helps the
            dashboard look complete from day one.
          </p>
        </div>
        <div className="impact-card glass">
          <h3>Ready demo credentials</h3>
          <p>
            <b>Admin:</b> admin@nayepankh.org / admin123
          </p>
          <p>
            <b>Volunteer:</b> volunteer1@demo.com / password123
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;
