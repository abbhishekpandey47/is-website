"use client";
import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [isHovered, setIsHovered] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone number - only allow digits
    if (name === "phoneNumber") {
      // Replace any non-digit characters with empty string
      const numericValue = value.replace(/[^\d+]/g, "");

      setFormData((prevState) => ({
        ...prevState,
        [name]: numericValue,
      }));
    } else {
      // Normal handling for other fields
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Add phone number validation if it's not empty
    if (formData.phoneNumber && !/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number should contain only digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const hubspotEndpoint =
      "https://api.hsforms.com/submissions/v3/integration/submit/242717777/7648d695-2791-40c7-8eda-668bf7b4e16c";

    const payload = {
      fields: [
        {
          name: "firstname",
          value: formData.firstName,
        },
        {
          name: "lastname",
          value: formData.lastName,
        },
        {
          name: "email",
          value: formData.email,
        },
        {
          name: "phone",
          value: formData.phoneNumber,
        },
        {
          name: "message",
          value: formData.message,
        },
      ],
      context: {
        pageUri: window.location.href,
        pageName: "Contact Form",
      },
    };

    try {
      const response = await fetch(hubspotEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Form submitted to HubSpot successfully");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
        setIsSuccess(true);
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        const errorData = await response.json();
        console.error("HubSpot submission failed:", errorData);
        setErrors({ submission: "Form submission failed. Please try again." });
      }
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
      setErrors({
        submission:
          "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Removed the InputField component as it was causing focus issues

  return (
    <div className="mt-36">
      <div className="bg-[#080b1e] text-white p-4">
        <h1 className="text-5xl text-center font-bold">Schedule a Free Demo</h1>
        <span className="text-center text-gray-400 mt-4 block max-w-4xl mx-auto">
          Book a free demo and see how Infrasity helps you move faster, smarter.
        </span>
      </div>

      <div className="bg-[#080b1e] text-white flex justify-center items-center p-4">
        <div className="bg-[#0c102e] rounded-xl p-8 w-full max-w-3xl mx-auto shadow-xl border border-[#3d4058]">
          {isSuccess ? (
            <div className="bg-green-800 bg-opacity-20 border border-green-500 text-white p-6 rounded-lg text-center mb-4">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-400">
                Message Sent!
              </h3>
              <p className="text-lg">
                Your message has been successfully submitted. We'll get back to
                you soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.submission && (
                <div className="bg-red-800 bg-opacity-20 border border-red-500 text-white p-4 rounded-md mb-4">
                  <p>{errors.submission}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name - Standard HTML input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-[0.5px] focus:ring-[#4f4bc6] ${
                      errors.firstName
                        ? "border border-red-500"
                        : "border border-[#3d4058]"
                    }`}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name - Standard HTML input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-[0.5px] focus:ring-[#4f4bc6] ${
                      errors.lastName
                        ? "border border-red-500"
                        : "border border-[#3d4058]"
                    }`}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email - Standard HTML input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-[0.5px] focus:ring-[#4f4bc6] ${
                      errors.email
                        ? "border border-red-500"
                        : "border border-[#3d4058]"
                    }`}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number - Standard HTML input */}
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-[0.5px] focus:ring-[#4f4bc6] ${
                      errors.phoneNumber
                        ? "border border-red-500"
                        : "border border-[#3d4058]"
                    }`}
                    placeholder="Phone Number"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full rounded px-4 py-3 text-white h-32 focus:outline-none focus:ring-[0.5px] focus:ring-[#4f4bc6] bg-[#0c102e] ${
                    errors.message
                      ? "border-red-500"
                      : "border border-[#3d4058]"
                  }`}
                  placeholder="Write your message here."
                  style={{
                    resize: "vertical",
                  }}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <div className="flex items-center justify-center mb-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-[50%] py-4 px-6 rounded-xl flex items-center justify-center font-medium text-lg transition-all ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white"
                  }`}
                  style={{
                    backgroundColor: "#1a1921",
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(18, 17, 23, 1), rgba(30, 28, 36, 0.9))",
                    boxShadow:
                      "0 4px 15px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "18px",
                    padding: "16px 20px",
                    color: "rgba(255, 255, 255, 0.8)",
                    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                    transition: "all 0.2s ease-out",
                    backdropFilter: "blur(5px)",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  ) : (
                    "Book a Demo"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
