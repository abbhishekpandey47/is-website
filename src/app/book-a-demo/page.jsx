"use client";
import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
    countryCode: "+91",
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
          value: formData.countryCode + " " + formData.phoneNumber,
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
        <div className="bg-black rounded-xl p-8 w-full max-w-3xl mx-auto shadow-xl border border-[#3d4058]">
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
                    style={{
                      backgroundColor: "#1a1921",
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(18, 17, 23, 1), rgba(30, 28, 36, 0.9))",
                      boxShadow:
                        "0 4px 15px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      padding: "16px 20px",
                      color: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(5px)",
                    }}
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
                    style={{
                      backgroundColor: "#1a1921",
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(18, 17, 23, 1), rgba(30, 28, 36, 0.9))",
                      boxShadow:
                        "0 4px 15px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      padding: "16px 20px",
                      color: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(5px)",
                    }}
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
                    style={{
                      backgroundColor: "#1a1921",
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(18, 17, 23, 1), rgba(30, 28, 36, 0.9))",
                      boxShadow:
                        "0 4px 15px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      padding: "16px 20px",
                      color: "rgba(255, 255, 255, 0.8)",
                      backdropFilter: "blur(5px)",
                    }}
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
                  <div className="flex w-full">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="w-[88px] bg-[#0c102e] rounded-l pl-1 py-2 text-white focus:outline-none focus:ring-[0.5px] focus:ring-[#4f4bc6] border border-[#3d4058] border-r-0"
                      style={{
                        backgroundColor: "#1a1921",
                        backgroundImage:
                          "linear-gradient(to bottom, rgba(18, 17, 23, 1), rgba(30, 28, 36, 0.9))",
                        boxShadow:
                          "0 4px 15px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        color: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(5px)",
                      }}
                    >
                      <option value="+1">🇺🇸 +1</option>{" "}
                      <option value="+7">🇷🇺 +7</option>{" "}
                      <option value="+20">🇪🇬 +20</option>{" "}
                      <option value="+27">🇿🇦 +27</option>{" "}
                      <option value="+30">🇬🇷 +30</option>{" "}
                      <option value="+31">🇳🇱 +31</option>{" "}
                      <option value="+32">🇧🇪 +32</option>{" "}
                      <option value="+33">🇫🇷 +33</option>{" "}
                      <option value="+34">🇪🇸 +34</option>{" "}
                      <option value="+36">🇭🇺 +36</option>{" "}
                      <option value="+39">🇮🇹 +39</option>{" "}
                      <option value="+40">🇷🇴 +40</option>{" "}
                      <option value="+41">🇨🇭 +41</option>{" "}
                      <option value="+43">🇦🇹 +43</option>{" "}
                      <option value="+44">🇬🇧 +44</option>{" "}
                      <option value="+45">🇩🇰 +45</option>{" "}
                      <option value="+46">🇸🇪 +46</option>{" "}
                      <option value="+47">🇳🇴 +47</option>{" "}
                      <option value="+48">🇵🇱 +48</option>{" "}
                      <option value="+49">🇩🇪 +49</option>{" "}
                      <option value="+51">🇵🇪 +51</option>{" "}
                      <option value="+52">🇲🇽 +52</option>{" "}
                      <option value="+54">🇦🇷 +54</option>{" "}
                      <option value="+55">🇧🇷 +55</option>{" "}
                      <option value="+56">🇨🇱 +56</option>{" "}
                      <option value="+57">🇨🇴 +57</option>{" "}
                      <option value="+58">🇻🇪 +58</option>{" "}
                      <option value="+60">🇲🇾 +60</option>{" "}
                      <option value="+61">🇦🇺 +61</option>{" "}
                      <option value="+62">🇮🇩 +62</option>{" "}
                      <option value="+63">🇵🇭 +63</option>{" "}
                      <option value="+64">🇳🇿 +64</option>{" "}
                      <option value="+65">🇸🇬 +65</option>{" "}
                      <option value="+66">🇹🇭 +66</option>{" "}
                      <option value="+81">JP +81</option>{" "}
                      <option value="+82">🇰🇷 +82</option>{" "}
                      <option value="+84">🇻🇳 +84</option>{" "}
                      <option value="+86">🇨🇳 +86</option>{" "}
                      <option value="+90">🇹🇷 +90</option>{" "}
                      <option value="+91">🇮🇳 +91</option>{" "}
                      <option value="+92">🇵🇰 +92</option>{" "}
                      <option value="+93">🇦🇫 +93</option>{" "}
                      <option value="+94">🇱🇰 +94</option>{" "}
                      <option value="+95">🇲🇲 +95</option>{" "}
                      <option value="+98">🇮🇷 +98</option>{" "}
                      <option value="+212">🇲🇦 +212</option>{" "}
                      <option value="+213">🇩🇿 +213</option>{" "}
                      <option value="+216">🇹🇳 +216</option>{" "}
                      <option value="+218">🇱🇾 +218</option>{" "}
                      <option value="+220">🇬🇲 +220</option>{" "}
                      <option value="+221">🇸🇳 +221</option>{" "}
                      <option value="+234">🇳🇬 +234</option>{" "}
                      <option value="+254">🇰🇪 +254</option>{" "}
                      <option value="+351">🇵🇹 +351</option>{" "}
                      <option value="+352">🇱🇺 +352</option>{" "}
                      <option value="+353">🇮🇪 +353</option>{" "}
                      <option value="+354">🇮🇸 +354</option>{" "}
                      <option value="+355">🇦🇱 +355</option>{" "}
                      <option value="+358">🇫🇮 +358</option>{" "}
                      <option value="+359">🇧🇬 +359</option>{" "}
                      <option value="+370">🇱🇹 +370</option>{" "}
                      <option value="+371">🇱🇻 +371</option>{" "}
                      <option value="+372">🇪🇪 +372</option>{" "}
                      <option value="+380">🇺🇦 +380</option>{" "}
                      <option value="+385">🇭🇷 +385</option>{" "}
                      <option value="+420">🇨🇿 +420</option>{" "}
                      <option value="+421">🇸🇰 +421</option>{" "}
                      <option value="+503">🇸🇻 +503</option>{" "}
                      <option value="+504">🇭🇳 +504</option>{" "}
                      <option value="+505">🇳🇮 +505</option>{" "}
                      <option value="+506">🇨🇷 +506</option>{" "}
                      <option value="+507">🇵🇦 +507</option>{" "}
                      <option value="+591">🇧🇴 +591</option>{" "}
                      <option value="+593">🇪🇨 +593</option>{" "}
                      <option value="+595">🇵🇾 +595</option>{" "}
                      <option value="+598">🇺🇾 +598</option>{" "}
                      <option value="+673">🇧🇳 +673</option>{" "}
                      <option value="+852">🇭🇰 +852</option>{" "}
                      <option value="+855">🇰🇭 +855</option>{" "}
                      <option value="+880">🇧🇩 +880</option>{" "}
                      <option value="+886">🇹🇼 +886</option>{" "}
                      <option value="+960">🇲🇻 +960</option>{" "}
                      <option value="+961">🇱🇧 +961</option>{" "}
                      <option value="+962">🇯🇴 +962</option>{" "}
                      <option value="+963">🇸🇾 +963</option>{" "}
                      <option value="+966">🇸🇦 +966</option>{" "}
                      <option value="+971">🇦🇪 +971</option>{" "}
                      <option value="+972">🇮🇱 +972</option>{" "}
                      <option value="+977">🇳🇵 +977</option>{" "}
                      <option value="+994">🇦🇿 +994</option>{" "}
                      <option value="+995">🇬🇪 +995</option>
                    </select>

                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      pattern="[0-9]*"
                      inputMode="numeric"
                      className={`flex-1 bg-[#0c102e] rounded-r px-1 py-2 text-white focus:outline-none focus:ring-[0.5px] focus:ring-[#4f4bc6] ${
                        errors.phoneNumber
                          ? "border border-red-500"
                          : "border border-[#3d4058]"
                      }`}
                      placeholder="Phone Number"
                      style={{
                        backgroundColor: "#1a1921",
                        backgroundImage:
                          "linear-gradient(to bottom, rgba(18, 17, 23, 1), rgba(30, 28, 36, 0.9))",
                        boxShadow:
                          "0 4px 15px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        padding: "16px 20px",
                        color: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(5px)",
                      }}
                    />
                  </div>
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
                  // style={{
                  //   resize: "vertical",
                  // }}
                  style={{
                    backgroundColor: "#1a1921",
                    backgroundImage:
                      "linear-gradient(to bottom, rgba(18, 17, 23, 1), rgba(30, 28, 36, 0.9))",
                    boxShadow:
                      "0 4px 15px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    padding: "16px 20px",
                    color: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(5px)",
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
                  className="w-[50%] py-4 px-6 rounded-xl flex items-center justify-center font-medium text-lg transition-all bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white"
                  // style={{
                  //   backgroundColor: "#1a1921",
                  //   backgroundImage:
                  //     "linear-gradient(to bottom, rgba(18, 17, 23, 1), rgba(30, 28, 36, 0.9))",
                  //   boxShadow:
                  //     "0 4px 15px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.05)",
                  //   border: "1px solid rgba(255, 255, 255, 0.08)",
                  //   borderRadius: "18px",
                  //   padding: "16px 20px",
                  //   color: "rgba(255, 255, 255, 0.8)",
                  //   transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                  //   transition: "all 0.2s ease-out",
                  //   backdropFilter: "blur(5px)",
                  // }}
                  // onMouseEnter={() => setIsHovered(true)}
                  //onMouseLeave={() => setIsHovered(false)}
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
