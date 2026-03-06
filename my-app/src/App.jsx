import React, { useState } from "react";
import "./App.css";

import calendarScreenshot from "./assets/Calendar_screenshot.png";
import syllabusScreenshot from "./assets/Syllabus.png";

const slides = [
  { id: 1, title: "My Calendar", img: calendarScreenshot },
  { id: 2, title: "Syllabus", img: syllabusScreenshot },
];

const scriptURL = 'https://script.google.com/macros/s/AKfycbzNtks-WcObk7_fY2qtjPFWC9POKLHICNmbqJDEF8ClQNZgVH8iOjRln1u9C3zonru_tQ/exec';

export default function App() {
  const [active, setActive] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActive((i) => (i + 1) % slides.length);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    if (!email.trim()) {
      setStatus("Please enter your email.");
      return;
    }

    setStatus("Submitting...");

    try {
      const res = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      setStatus(result.status === "success" ? "Thanks! You’re on the list." : "⚠️ Something went wrong.");
    } catch (error) {
      setStatus("Network error. Please try again.");
    }
  };

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

        {/* Email input */}
        
        <form id="email-form" onSubmit={handleSubmit}>
            <div className="v3-inputWrap">
              <input
                type="email"
                className="v3-input"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" style={{ display: "none" }} />
        </form>
        
        {/* Status message */}
        <p id="status">{status}</p>

        {/* Carousel */}
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