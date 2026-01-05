"use client";
import { useState } from "react";

const EmailModal = ({ show, onClose, template }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");

  if (!show) return null;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Trigger download
      const link = document.createElement('a');
      link.href = template.downloadLink;
      link.download = `${template.slug}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Close modal
      onClose();
      setEmail("");
    } catch (error) {
      setEmailError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#1e293b] border border-[#2a2f45] rounded-2xl shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-2xl font-bold text-white mb-2 font-[quicksand] font-extrabold tracking-tight">Download Template</h3>
        <p className="text-gray-400 mb-6 font-[quicksand] font-normal">Enter your email to download the template</p>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@company.com"
              className="w-full px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-[quicksand] font-normal"
              disabled={isSubmitting}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-400 font-[quicksand] font-normal">{emailError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-[quicksand] font-semibold"
          >
            {isSubmitting ? "Processing..." : "Download Template"}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 text-center font-[quicksand] font-normal">
          We respect your privacy. No spam, unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default EmailModal;


