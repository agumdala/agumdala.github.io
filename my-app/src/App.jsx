import React, { useState } from "react";
import "./App.css";

import calendarScreenshot from "./assets/Calendar_screenshot.png";
import syllabusScreenshot from "./assets/Syllabus.png";

const slides = [
  { id: 1, title: "My Calendar", img: calendarScreenshot },
  { id: 2, title: "Syllabus", img: syllabusScreenshot },
];

export default function App() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActive((i) => (i + 1) % slides.length);

  return (
    <div className="v3-page">
      <div className="v3-logo">AcePrep</div>

      <main className="v3-main">
        <h1 className="v3-title">
          Welcome to <br /> AcePrep
        </h1>

        <p className="v3-subtitle">
          A study tool designed to help students reach their full potential. Join the waitlist
          to beta test our site!
        </p>

        <div className="v3-inputWrap">
          <input className="v3-input" placeholder="Enter your email here" />
        </div>

        <section className="v3-carousel">
          <button
            className="v3-arrow v3-left"
            onClick={prev}
            type="button"
            aria-label="Previous"
          >
            ‹
          </button>

          <div className="v3-frame">
            <img className="v3-img" src={slides[active].img} alt={slides[active].title} />
          </div>

          <button
            className="v3-arrow v3-right"
            onClick={next}
            type="button"
            aria-label="Next"
          >
            ›
          </button>

          <div className="v3-dots">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                className={`v3-dot ${idx === active ? "is-active" : ""}`}
                onClick={() => setActive(idx)}
                type="button"
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}