import React, { useState } from "react";
import "./App.css";

import calendarScreenshot from "./assets/Calendar_screenshot.png";
import syllabusScreenshot from "./assets/Syllabus.png";

const slides = [
  { id: 1, title: "My Calendar", img: calendarScreenshot },
  { id: 2, title: "Syllabus", img: syllabusScreenshot },
];

const scriptURL = 'https://script.google.com/macros/s/AKfycbzZE0maYtzcdt3bb3dy-yg0q-K8onwoEDnahArsZYMNRsRCMYhKHoCu2TvQyXVYDeX4bw/exec';

export default function App() {
  const [active, setActive] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prev = () => setActive((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setActive((i) => (i + 1) % slides.length);

  const scriptURL = 'https://script.google.com/macros/s/AKfycbzZE0maYtzcdt3bb3dy-yg0q-K8onwoEDnahArsZYMNRsRCMYhKHoCu2TvQyXVYDeX4bw/exec'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData(e.target);
    const email = formData.get('email');

    try {
      // Google Apps Script expects FormData format
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const result = await response.text();
        // Google Apps Script typically returns HTML or text
        setStatus('success');
        e.target.reset(); // Clear the form
        setTimeout(() => setStatus(''), 5000); // Clear message after 5 seconds
      } else {
        setStatus('error');
      }
    } catch (err) {
      // If CORS fails, try with no-cors mode (can't read response)
      try {
        await fetch(scriptURL, {
          method: 'POST',
          body: formData,
          mode: 'no-cors',
        });
        setStatus('success');
        e.target.reset();
        setTimeout(() => setStatus(''), 5000);
      } catch (noCorsErr) {
        setStatus('error');
        console.error('Error:', noCorsErr);
      }
    } finally {
      setIsSubmitting(false);
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
          <div className="v3-inputWithArrow">
            <input
              type="email"
              className="v3-input"
              placeholder="Enter your email here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <button type="submit" className="v3-inputArrow">
              ➔
            </button>
          </div>
        </form>
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