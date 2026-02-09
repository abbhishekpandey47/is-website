"use client";
import React, { useState } from "react";

export default function AEOReportSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/sendAEOReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send email");
      }
    } catch (err) {
      setError("Failed to send email");
    }
    setLoading(false);
  };

  return (
    <section className="w-full flex flex-col gap-10 py-10">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">How do AI systems talk about your product?</h2>
        <p className="text-white/80 text-lg">Get a free AEO report showing visibility, citations, and sentiment across leading answer engines.</p>
      </div>
      <div
        className="relative w-full flex flex-col md:flex-row rounded-2xl shadow-lg border border-[#777777] md:p-12 gap-8 max-w-6xl mx-auto overflow-hidden bg-center bg-no-repeat bg-auto"
        style={{ backgroundImage: "url('/aeo/aeoreportbg.svg')" }}
      >
      {/* Left: Form */}
      <div className="relative z-10 flex-1 flex flex-col justify-center min-w-[320px]">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Get your free AEO Report today</h2>
        <p className="text-white/80 text-lg mb-6">Discover how your brand performs on answer engines and uncover the opportunities to outpace the competition</p>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="bg-[#18181b] border border-[#333] rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:border-violet-400 placeholder:text-white/40"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-black font-semibold py-3 rounded-lg mt-2 transition hover:bg-violet-500 hover:text-white"
            >
              {loading ? "Analyzing..." : "Analyze my brand"}
            </button>
            {error && <span className="text-red-400 text-sm mt-2">{error}</span>}
          </form>
        ) : (
          <div className="bg-violet-900/80 border border-violet-400/40 rounded-lg p-6 mt-2">
            <h3 className="text-white text-xl font-bold mb-2">Success!</h3>
            <p className="text-white/80">Thank you! You will receive your AEO report within 1 business day over email.</p>
          </div>
        )}
        <div className="mt-8">
          <p className="text-white/70 text-base mb-2">Get insights into:</p>
          <ul className="text-white/90 text-base flex flex-col gap-2">
            <li className="flex items-center gap-2"><span className="text-violet-400 font-bold">✓</span> AI Visibility</li>
            <li className="flex items-center gap-2"><span className="text-violet-400 font-bold">✓</span> Source Citations</li>
            <li className="flex items-center gap-2"><span className="text-violet-400 font-bold">✓</span> Brand Sentiment</li>
            <li className="flex items-center gap-2"><span className="text-violet-400 font-bold">✓</span> Content AEO</li>
          </ul>
        </div>
      </div>
      {/* Right: Mockup/Preview */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center min-w-[320px] ">
        <img src="/aeo/aeoReport.svg" alt="AEO Report Mockup" className="max-w-full rounded-lg shadow-lg relative -right-[3.5rem] -bottom-[3.5rem] w-[35rem] h-[32rem]"/>
      </div>
      </div>
    </section>
  );
}
