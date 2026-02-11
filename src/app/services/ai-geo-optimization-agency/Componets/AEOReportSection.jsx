"use client";
import React, { useState } from "react";
import Image from "next/image";

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
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">If Buyers Ask AI About Your Category Do You Show Up?</h2>
        <p className="text-white/80 text-lg">Get a free AEO report showing your visibility, citations, and positioning across ChatGPT, Claude, and Perplexity.</p>
      </div>
      <div
        className="relative w-full flex flex-col md:grid md:grid-cols-3 rounded-2xl shadow-lg border border-[#777777] p-6 md:p-12 px-4 gap-8 max-w-6xl mx-auto overflow-hidden bg-center bg-no-repeat bg-auto m-8"
        style={{ backgroundImage: "linear-gradient(180deg, rgba(14, 14, 23, 0.85), rgba(14, 14, 23, 0.95)), url('/aeo/aeoreportbg.svg')" }}
      >
      {/* Left: Form */}
      <div className="relative z-10 flex-0 flex flex-col justify-center min-w-[320px]">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">Get your free AEO Report today</h2>
        <p className="text-white/80 text-lg mb-6">See where your product appears, how often it&apos;s cited, and how AI positions you across ChatGPT, Claude, and Perplexity.</p>
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
      <div className="col-span-2 relative z-10 flex flex-1 flex-col justify-center items-center min-w-[320px] md:items-end">
        <Image
          src="/aeo/aeoReport.svg"
          alt="AEO Report Mockup"
          width={800}
          height={480}
          priority
          className="max-w-full rounded-xl shadow-2xl w-full md:w-[50rem] md:h-[28rem] md:relative md:-right-[4.5rem] md:-bottom-[6.5rem]"
        />
      </div>
      </div>
    </section>
  );
}
