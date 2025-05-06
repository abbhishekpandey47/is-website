"use client";
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

  const openPopup = () => {
    setIsPopupOpen(true);
    document.body.style.overflow = "hidden";
    setIsSuccess(false);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    document.body.style.overflow = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
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
        pageUri: "https://www.infrasity.com/",
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
      }
    } catch (error) {
      console.error("Error submitting to HubSpot:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Button to trigger */}
      <button
        className="text-m quicksand-semibold rounded-[5px] flex justify-center items-center before:ease relative h-12 w-40 overflow-hidden border border-[#3b82f6] bg-[#5F64FF] text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:before:-translate-x-40"
        onClick={openPopup}
      >
        {name || "Book a Demo"}
      </button>

      {/* Custom Popup */}
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="bg-black text-white rounded-lg p-4 md:p-6 w-[90%] max-w-xl max-h-[90vh] overflow-y-auto"
            style={{
              position: "relative",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center text-2xl text-white bg-gray-800 hover:bg-gray-700 rounded-full"
              aria-label="Close"
            >
              ×
            </button>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 mt-4">
              Let's Have a Chat <span className="inline-block">👋</span>
            </h1>

            {/* Description */}
            <p className="text-center text-gray-400 mb-6">
              Questions about our products/services, orders, or just want to say
              hello? We're here to help
            </p>

            {isSuccess ? (
              <div className="bg-green-800 text-white p-4 rounded-lg text-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto mb-2"
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
                <h2 className="text-xl font-bold mb-2">Success!</h2>
                <p>
                  Your message has been successfully submitted. We'll get back
                  to you soon!
                </p>
              </div>
            ) : (
              /* single column layout  */
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <label className="block text-gray-300 mb-1">
                      First name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-white"
                      placeholder="First name"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-gray-300 mb-1">
                      Last name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-white"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                {/* Email and Phone number row */}
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <div className="w-full md:w-1/2 mb-4 md:mb-0">
                    <label className="block text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-white"
                      placeholder="Email"
                    />
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block text-gray-300 mb-1">
                      Phone number
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-white"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                {/* Message area */}
                <div>
                  <label className="block text-gray-300 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-gray-900 border border-gray-800 rounded px-3 py-2 text-white h-24"
                    placeholder="Write your message here."
                  />
                </div>

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full ${
                    isSubmitting
                      ? "bg-gray-600"
                      : "bg-gray-800 hover:bg-gray-700"
                  } text-white rounded py-3 transition-colors flex items-center justify-center`}
                >
                  {isSubmitting ? (
                    <>
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
                    </>
                  ) : (
                    "Book a Demo"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactForm;
