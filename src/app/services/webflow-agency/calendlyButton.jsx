"use client";
import Link from "next/link";
import React, { useState } from "react";

const ContactForm = ({ name }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  const openPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
    setIsSuccess(false);
    setErrors({});
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
    // Reset form data when closing
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      message: "",
    });
  };

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

    //if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
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
        setTimeout(() => {
          setIsSuccess(false);
          closePopup();
        }, 3000);
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
    <>
      {/* Button to trigger */}
      <Link href="/book-a-demo" passHref>
        <button className="text-m font-semibold rounded-md flex justify-center items-center relative h-12 w-40 overflow-hidden border-0 bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] text-white shadow-lg transition-all hover:shadow-xl">
          {name || "Book a Demo"}
        </button>
      </Link>

      {/* Modal Overlay */}
      {isPopupOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closePopup();
          }}
        >
          {/* Modal Content */}
          <div
            className="bg-[#0c102e] text-white rounded-xl p-6 w-[90%] max-w-lg relative"
            // style={{
            //   backgroundColor: "#141318",
            //   boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
            //   border: "1px solid rgba(60, 63, 84, 0.5)",
            // }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold text-center mb-2 mt-2">
              Let's Have a Chat <span className="inline-block">👋</span>
            </h2>

            {/* Description */}
            <p className="text-center text-gray-400 mb-6">
              Questions about our products/services, orders, or just want to say
              hello? We're here to help.
            </p>

            {isSuccess ? (
              <div className="bg-green-800 bg-opacity-20 border border-green-500 text-white p-4 rounded-lg text-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto mb-2 text-green-500"
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
                <h3 className="text-xl font-bold mb-2 text-green-400">
                  Success!
                </h3>
                <p>
                  Your message has been successfully submitted. We'll get back
                  to you soon!
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-4"
              >
                {errors.submission && (
                  <div className="bg-red-800 bg-opacity-20 border border-red-500 text-white p-3 rounded-md mb-4">
                    <p className="text-sm">{errors.submission}</p>
                  </div>
                )}

                <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    className={`w-full bg-gray-900 rounded px-3 py-2 text-white h-16 focus:outline-none focus:ring-1 focus:ring-[#3d4058] ${
                      errors.message
                        ? "border-red-500"
                        : "border border-gray-700"
                    }`}
                    placeholder="Write your message here."
                    style={{
                      backgroundColor: "#0c102e",
                      border: errors[name]
                        ? "1px solid #3d4058"
                        : "1px solid #3d4058",
                      resize: "none",
                    }}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-all ${
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
      )}
    </>
  );
};

export default ContactForm;
