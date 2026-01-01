"use client";

import React from "react";

export default function ScrollToFaqButton({ children, className }) {
  const handleClick = (e) => {
    e.preventDefault();
    // Try common selectors for the FAQ section
    const selectors = ["#faq", "[data-faq]", "[id*='faq']", "[data-section='faq']"];
    let el = null;
    for (const s of selectors) {
      el = document.querySelector(s);
      if (el) break;
    }
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      // small focus for accessibility
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    } else {
      // fallback to root anchor navigation
      window.location.href = "/#faq";
    }
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
