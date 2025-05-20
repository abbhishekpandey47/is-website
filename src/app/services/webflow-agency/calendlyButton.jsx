"use client";
import React, { useState, useEffect } from "react";
import ContactPage from "@/app/book-a-demo/page";

const CalendarBooking = ({ onBookingComplete }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [step, setStep] = useState(1); // 1: Calendar, 2: Time selection
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("UTC-06:00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const timeSlots = [
    "12:00 AM",
    "12:30 AM",
    "1:00 AM",
    "1:30 AM",
    "2:00 AM",
    "6:30 PM",
    "7:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
  ];

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px"; // Prevent layout shift
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    resetBooking();
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setStep(1);
    setUserInfo({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    });
    setErrors({});
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };
  const handleTimezoneChange = (e) => {
    setSelectedTimezone(e.target.value);
  };
  const goToTimeSelection = () => {
    if (selectedDate) {
      setStep(2);
    }
  };

  const goToCalendar = () => {
    setStep(1);
  };

  const goToUserInfo = () => {
    if (selectedTime) {
      setStep(3);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateUserInfo = () => {
    const newErrors = {};

    if (!userInfo.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!userInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Email address is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!validateUserInfo()) return;

    // Here you would submit the booking data to your API
    // For now, we'll just simulate success
    const bookingData = {
      date: selectedDate,
      time: selectedTime,
      ...userInfo,
    };

    setIsSubmitting(true);

    const hubspotEndpoint =
      "https://api.hsforms.com/submissions/v3/integration/submit/242717777/1bcf066f-9c19-430d-b3b2-a3f05aa671d7";

    const payload = {
      fields: [
        {
          name: "firstname",
          value: userInfo.firstName,
        },
        {
          name: "lastname",
          value: userInfo.lastName,
        },
        {
          name: "email",
          value: userInfo.email,
        },
        {
          name: "phone",
          value: userInfo.phoneNumber,
        },
        {
          name: "message",
          value: userInfo.message,
        },
        {
          name: "start_date",
          value: selectedDate,
        },
        {
          name: "meeting_time",
          value: selectedTime,
        },
        {
          name: "meeting_timezone",
          value: selectedTimezone,
        },
        {
          name: "domain",
          value: "https://" + userInfo.companyWebsite,
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
        setStep(4);

        // setTimeout(() => {
        //   closeModal();
        // }, 5000);
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
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDate = (date) => {
    return `${weekdays[date.getDay()]}, ${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected =
        selectedDate &&
        day === selectedDate.getDate() &&
        month === selectedDate.getMonth() &&
        year === selectedDate.getFullYear();

      const isTodayDate = isToday(date);
      const isPast = isPastDate(date);

      days.push(
        <div
          key={`day-${day}`}
          className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer mx-1
            ${isSelected ? "bg-blue-600 text-white" : ""} 
            ${
              isTodayDate && !isSelected
                ? "border border-blue-600 text-white"
                : ""
            }
            ${
              isPast && !isTodayDate
                ? "text-gray-500 cursor-not-allowed"
                : "hover:bg-gray-700"
            }`}
          onClick={() => !isPast && handleDateChange(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const timezones = [
    { value: "UTC-12:00", label: "(UTC-12:00) Baker Island" },
    { value: "UTC-11:00", label: "(UTC-11:00) Samoa" },
    { value: "UTC-10:00", label: "(UTC-10:00) Hawaii" },
    { value: "UTC-09:30", label: "(UTC-09:30) Marquesas Islands" },
    { value: "UTC-09:00", label: "(UTC-09:00) Alaska" },
    { value: "UTC-08:00", label: "(UTC-08:00) Pacific Time (US)" },
    { value: "UTC-07:00", label: "(UTC-07:00) Mountain Time (US)" },
    { value: "UTC-06:00", label: "(UTC-06:00) Central Time (US)" },
    { value: "UTC-05:00", label: "(UTC-05:00) Eastern Time (US)" },
    { value: "UTC-04:00", label: "(UTC-04:00) Atlantic Time" },
    { value: "UTC-03:30", label: "(UTC-03:30) Newfoundland" },
    { value: "UTC-03:00", label: "(UTC-03:00) Brasilia" },
    { value: "UTC-02:00", label: "(UTC-02:00) South Georgia" },
    { value: "UTC-01:00", label: "(UTC-01:00) Cape Verde" },
    { value: "UTC+00:00", label: "(UTC+00:00) London" },
    { value: "UTC+01:00", label: "(UTC+01:00) Paris" },
    { value: "UTC+02:00", label: "(UTC+02:00) Cairo" },
    { value: "UTC+03:00", label: "(UTC+03:00) Moscow" },
    { value: "UTC+03:30", label: "(UTC+03:30) Tehran" },
    { value: "UTC+04:00", label: "(UTC+04:00) Dubai" },
    { value: "UTC+04:30", label: "(UTC+04:30) Kabul" },
    { value: "UTC+05:00", label: "(UTC+05:00) Karachi" },
    { value: "UTC+05:30", label: "(UTC+05:30) New Delhi" },
    { value: "UTC+05:45", label: "(UTC+05:45) Kathmandu" },
    { value: "UTC+06:00", label: "(UTC+06:00) Dhaka" },
    { value: "UTC+06:30", label: "(UTC+06:30) Yangon" },
    { value: "UTC+07:00", label: "(UTC+07:00) Bangkok" },
    { value: "UTC+08:00", label: "(UTC+08:00) Singapore" },
    { value: "UTC+08:45", label: "(UTC+08:45) Eucla" },
    { value: "UTC+09:00", label: "(UTC+09:00) Tokyo" },
    { value: "UTC+09:30", label: "(UTC+09:30) Adelaide" },
    { value: "UTC+10:00", label: "(UTC+10:00) Sydney" },
    { value: "UTC+10:30", label: "(UTC+10:30) Lord Howe Island" },
    { value: "UTC+11:00", label: "(UTC+11:00) Solomon Islands" },
    { value: "UTC+11:30", label: "(UTC+11:30) Norfolk Island" },
    { value: "UTC+12:00", label: "(UTC+12:00) Auckland" },
    { value: "UTC+12:45", label: "(UTC+12:45) Chatham Islands" },
    { value: "UTC+13:00", label: "(UTC+13:00) Tonga" },
    { value: "UTC+14:00", label: "(UTC+14:00) Kiritimati" },
  ];
  return (
    <>
      <button
        className="text-m font-semibold rounded-md flex justify-center items-center relative h-12 w-40 overflow-hidden border-0 bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] text-white shadow-lg transition-all hover:shadow-xl"
        onClick={openModal}
      >
        Book a Meeting
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-[#0c102e] text-white rounded-xl p-6 w-[90%] max-w-md relative">
            <button
              onClick={closeModal}
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

            <div className="text-2xl font-bold text-center mb-4 mt-2">
              {step === 1 && "Select a Date"}
              {step === 2 && "Select a Time"}
              {/* {step === 3 && "Complete Your Booking"} */}
              {step === 4 && "Booking Confirmed"}
            </div>

            {step === 1 && (
              <div className="calendar-container">
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-full hover:bg-gray-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <h2 className="text-xl font-medium">
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </h2>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-gray-700"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekdays.map((day) => (
                    <div
                      key={day}
                      className="text-center text-gray-400 text-sm"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

                <div className="mt-6 flex justify-end">
                  {selectedDate && (
                    <button
                      onClick={goToTimeSelection}
                      className="bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white py-2 px-4 rounded-md"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="time-selection">
                <div>
                  <p className="text-lg font-medium mb-1">
                    {selectedDate && formatDate(selectedDate)}
                  </p>
                  <p className="text-gray-400 text-sm mb-2">
                    Select a time slot for your meeting
                  </p>
                </div>
                <div className="mb-4 bg-[#0e1433] rounded-lg">
                  <div>
                    <select
                      value={selectedTimezone}
                      onChange={handleTimezoneChange}
                      style={{
                        width: "100%",
                        fontSize: "0.875rem",
                        backgroundColor: "#0c102e",
                        border: "1px solid #374151",
                        borderRadius: "0.25rem",
                        padding: "0.5rem 0.75rem",
                        color: "#ffffff",
                        outline: "none",
                        boxShadow: "none",
                        transition: "all 0.2s",
                        scrollbarWidth: "thin" /* Firefox */,
                        scrollbarColor: "#3d4058 #1a1f4a" /* Firefox */,
                      }}
                      className="w-full text-sm bg-[#0c102e] border border-gray-700 rounded px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] p-2 custom-scrollbar"
                    >
                      {timezones.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto mb-4">
                  {timeSlots.map((time) => (
                    <div
                      key={time}
                      className={`p-2 text-center rounded-md cursor-pointer border border-gray-700
                        ${
                          selectedTime === time
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-700"
                        }`}
                      onClick={() => handleTimeSelection(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={goToCalendar}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                  >
                    Back
                  </button>

                  {selectedTime && (
                    <button
                      onClick={goToUserInfo}
                      className="bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white py-2 px-4 rounded-md"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="user-info">
                <div className="mb-4">
                  <p className="text-lg font-medium mb-1">Booking Details</p>
                  <p className="text-gray-400 text-sm">
                    {selectedDate && formatDate(selectedDate)} at {selectedTime}
                  </p>
                </div>

                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1 text-left">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] border border-gray-700`}
                        placeholder="First Name"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1 text-left">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1 text-left">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] border border-gray-700`}
                        placeholder="Last Name"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1 text-left">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-1 text-left">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] border border-gray-700`}
                        placeholder="Email"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1 text-left">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1 text-left">
                        Company Website
                      </label>
                      <input
                        type="text"
                        name="companyWebsite"
                        value={userInfo.companyWebiste}
                        onChange={handleInputChange}
                        className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] border border-gray-700`}
                        placeholder="https://"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-left">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={userInfo.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] border border-gray-700`}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 text-left">
                      Message
                    </label>
                    <textarea
                      type="text"
                      name="message"
                      value={userInfo.message}
                      onChange={handleInputChange}
                      className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] border border-gray-700`}
                      placeholder="Write your message here."
                    />
                  </div>
                </form>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                  >
                    Back
                  </button>

                  {!isSubmitting ? (
                    <button
                      onClick={handleBookingSubmit}
                      className="bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white py-2 px-4 rounded-md"
                    >
                      Confirm Booking
                    </button>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        style={{
                          animation: "spin 1s linear infinite",
                          marginLeft: "-0.25rem",
                          marginRight: "0.75rem",
                          height: "1.25rem",
                          width: "1.25rem",
                          color: "white",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          style={{ opacity: 0.25 }}
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          style={{ opacity: 0.75 }}
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="success-message text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto mb-4 text-green-500"
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
                  Booking Confirmed!
                </h3>
                <p className="text-gray-300">
                  Your meeting has been scheduled for:
                </p>
                <p className="font-medium">
                  {selectedDate && formatDate(selectedDate)} at {selectedTime}
                </p>
                <p className="mt-2 text-gray-400">
                  A confirmation email has been sent to your inbox.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarBooking;
