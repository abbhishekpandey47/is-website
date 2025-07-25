"use client";

import React, { useState } from "react";

export const DownloadPage = () => {
  const [formData, setFormData] = useState({
    workEmail: "",
    fullName: "",
    companyName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { workEmail, fullName, companyName } = formData;

    if (!workEmail || !fullName || !companyName) {
      setErrorMessage("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      fields: [
        { name: "fullname", value: formData.fullName },
        { name: "companyname", value: formData.companyName },
        { name: "email", value: formData.workEmail },
      ],
      context: {
        pageUri: window.location.href,
        pageName: "Playbook for Reddit Marketting",
      },
    };

    try {
      const response = await fetch("/api/whitepaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const [hubspotRes] = await Promise.all([response]);

      if (hubspotRes.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          const link = document.createElement('a');
          link.href = "https://drive.google.com/uc?export=download&id=1bX9OsrZd2DltBL-p1aLhhUPIqwVW8au7";
          link.download = '';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, 100);
      } else {
        setErrorMessage("Failed to submit form. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="text-white">
      <div className="max-w-7xl mx-auto px-8 lg:px-14 pt-16 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div>
            <div className="max-w-md space-y-6">
              <div className="space-y-10">
                <h1 className="text-4xl font-bold text-white leading-normal tracking-tight">

                The Reddit B2B Playbook for AI & Infra Startups{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600">
                   Grow Without Paid Ads
                  </span>
                </h1>
              </div>
              <div className="space-y-10 text-gray-300 text-[19px] leading-relaxed tracking-wide">
                <p>

                Built from 500+ Reddit comments across 25+ subreddits.
Learn how we turn Reddit threads into mini demo calls, feedback loops, and signups.
If you're still ignoring Reddit, you're leaving trust (and traffic) on the table.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          {!isSubmitted ? (
            <div className="bg-black/20 backdrop-blur-md rounded-xl p-8 lg:p-12 mt-8 lg:mt-0 shadow-2xl border-[1px] border-white/20 hover:border-white/30">
              <div className="space-y-6">
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 mt-2 bg-black backdrop-blur-sm rounded-lg text-white placeholder-gray-300 outline-none focus:ring-1 focus:ring-purple-700 border border-white/20 transition-all"
                    placeholder="Full Name:"
                  />
                </div>

                <div>
                  <label>Work Email</label>
                  <input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 mt-2 bg-black backdrop-blur-sm rounded-lg text-white placeholder-gray-300 outline-none focus:ring-1 focus:ring-purple-700 border border-white/20 transition-all"
                    placeholder="Work Email:"
                  />
                </div>

                <div>
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 mt-2 bg-black backdrop-blur-sm rounded-lg text-white placeholder-gray-300 outline-none focus:ring-1 focus:ring-purple-700 border border-white/20 transition-all"
                    placeholder="Company Name:"
                  />
                </div>

                {errorMessage && (
                  <div className="text-red-400 text-sm text-left">
                    {errorMessage}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-900/20 font-semibold py-3 px-10 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Submitting..." : "Download Playbook"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-14">
              <div className="text-center">
                <div className="text-green-400 text-6xl mb-4">✓</div>
                <h2 className="text-3xl font-bold text-white mb-4">Success!</h2>
                <p className="text-gray-300 text-lg mb-6">
                  Thank you for your submission. Your playbook download will
                  begin shortly.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
