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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const hubspotEndpoint =
      "https://api.hsforms.com/submissions/v3/integration/submit/242709921/3b2b67f1-6869-43e8-bef0-a492b08e632f";

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

  const InputField = ({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
  }) => (
    <div className="mb-4">
      <label className="block text-gray-300 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className={`w-full bg-[#3d4058] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] ${
          errors[name] ? "border-red-500" : "border border-gray-700"
        }`}
        placeholder={placeholder}
        style={{
          backgroundColor: "#0c102e",
          border: errors[name] ? "1px solid #3d4058" : "1px solid #3d4058",
        }}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080b1e] text-white flex justify-center items-center p-4">
      <div className="bg-[#0c102e] rounded-xl p-8 w-full max-w-3xl mx-auto shadow-xl">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          Get in Touch <span className="inline-block">👋</span>
        </h1>

        {/* Description */}
        <p className="text-center text-gray-400 mb-8">
          Questions about our products/services, orders, or just want to say
          hello? We're here to help.
        </p>

        {isSuccess ? (
          <div className="bg-green-800 bg-opacity-20 border border-green-500 text-white p-6 rounded-lg text-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-3 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
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
              <InputField
                label="First Name"
                name="firstName"
                placeholder="First Name"
                required
              />
              <InputField
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Email"
                required
              />
              <InputField
                label="Phone Number"
                name="phoneNumber"
                placeholder="Phone Number"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full rounded px-4 py-3 text-white h-32 focus:outline-none focus:ring-1 focus:ring-[#3d4058] ${
                  errors.message ? "border-red-500" : "border border-gray-700"
                }`}
                placeholder="Write your message here."
                style={{
                  backgroundColor: "#0c102e",
                  border: errors.message
                    ? "1px solid #3d4058"
                    : "1px solid #3d4058",
                  resize: "vertical",
                }}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-md font-medium text-lg transition-all ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white"
              }`}
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
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
