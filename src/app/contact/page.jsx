"use client";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ContactPage from "../book-a-demo/page";
import Image from "next/image";
import { Router } from "next/router";
import { useRouter } from "next/navigation"; // add this

const CalendarBooking = () => {
    const buttonText = "Book a Meeting";
    const bgGradient = ""; // Default background color if no gradient is passed
    const width = "w-40"; // Default width
    const height = "h-12"; // Default height
    const textSize = "text-sm"; // Text size
    const textWeight = "quicksand-semibold"; // Text weight
    const borderColor = "#3b82f6"; // Default border color
    const onClick = () => {};
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
        companyWebsite: "",
        countryCode: "+91",
    });
    const [errors, setErrors] = useState({});
    // Email validation state (for UI feedback only)
    const [isEmailValidating, setIsEmailValidating] = useState(false);
    const [emailValidationResult, setEmailValidationResult] = useState(null);
    const [selectedTimezone, setSelectedTimezone] = useState("UTC-08:00");
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    const istTimeSlots = [
        "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
        "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
        "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
        "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
        "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM",
        "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
        "12:00 AM", "12:30 AM"
    ];


    const timezones = [
        { value: "UTC-12:00", label: "(UTC-12:00) Baker Island" },
        { value: "UTC-11:00", label: "(UTC-11:00) Samoa Standard Time" },
        { value: "UTC-10:00", label: "(UTC-10:00) Hawaii Standard Time" },
        { value: "UTC-09:30", label: "(UTC-09:30) Marquesas Islands" },
{ value: "UTC-08:00", label: "(UTC-08:00) Pacific Standard Time (US)" },
        { value: "UTC-07:00", label: "(UTC-07:00) Pacific Daylight Time (US)" },
        { value: "UTC-06:00", label: "(UTC-06:00) Mountain Daylight Time (US)" },
        { value: "UTC-05:00", label: "(UTC-05:00) Central Daylight Time (US)" },
        { value: "UTC-04:00", label: "(UTC-04:00) Eastern Daylight Time (US)" },
        { value: "UTC-03:00", label: "(UTC-03:00) Atlantic Daylight Time" },
        { value: "UTC-02:30", label: "(UTC-02:30) Newfoundland Daylight Time" },
        { value: "UTC-03:00", label: "(UTC-03:00) Brasilia" },
        { value: "UTC-02:00", label: "(UTC-02:00) South Georgia" },
        { value: "UTC-01:00", label: "(UTC-01:00) Cape Verde" },
        { value: "UTC+00:00", label: "(UTC+00:00) Greenwich Mean Time" },
        { value: "UTC+01:00", label: "(UTC+01:00) London Daylight Time" },
        { value: "UTC+02:00", label: "(UTC+02:00) Paris Daylight Time" },
        { value: "UTC+02:00", label: "(UTC+02:00) Cairo" },
        { value: "UTC+03:00", label: "(UTC+03:00) Moscow" },
        { value: "UTC+03:30", label: "(UTC+03:30) Tehran" },
        { value: "UTC+04:00", label: "(UTC+04:00) Dubai" },
        { value: "UTC+04:30", label: "(UTC+04:30) Kabul" },
        { value: "UTC+05:00", label: "(UTC+05:00) Karachi" },
        { value: "UTC+05:30", label: "(UTC+05:30) New Delhi (IST)" },
        { value: "UTC+05:45", label: "(UTC+05:45) Kathmandu" },
        { value: "UTC+06:00", label: "(UTC+06:00) Dhaka" },
        { value: "UTC+06:30", label: "(UTC+06:30) Yangon" },
        { value: "UTC+07:00", label: "(UTC+07:00) Bangkok" },
        { value: "UTC+08:00", label: "(UTC+08:00) Singapore" },
        { value: "UTC+08:45", label: "(UTC+08:45) Eucla" },
        { value: "UTC+09:00", label: "(UTC+09:00) Tokyo" },
        { value: "UTC+10:30", label: "(UTC+10:30) Adelaide Daylight Time" },
        { value: "UTC+11:00", label: "(UTC+11:00) Sydney Daylight Time" },
        { value: "UTC+11:00", label: "(UTC+11:00) Lord Howe Island" },
        { value: "UTC+11:00", label: "(UTC+11:00) Solomon Islands" },
        { value: "UTC+11:30", label: "(UTC+11:30) Norfolk Island" },
        { value: "UTC+13:00", label: "(UTC+13:00) Auckland Daylight Time" },
        { value: "UTC+13:45", label: "(UTC+13:45) Chatham Islands Daylight Time" },
        { value: "UTC+13:00", label: "(UTC+13:00) Tonga" },
        { value: "UTC+14:00", label: "(UTC+14:00) Kiritimati" },
    ];

    const timeToMinutes = (timeStr) => {
        const [time, period] = timeStr.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;

        return hours * 60 + minutes;
    };

    const minutesToTime = (minutes) => {
        minutes = ((minutes % 1440) + 1440) % 1440;

        let hours = Math.floor(minutes / 60);
        const mins = minutes % 60;

        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours || 12;

        return `${hours}:${mins.toString().padStart(2, "0")} ${period}`;
    };

    const getTimezoneOffsetMinutes = (timezone) => {
        const offsetMatch = timezone.match(/UTC([+-])(\d+):(\d+)/);
        if (!offsetMatch) return 0;

        const sign = offsetMatch[1] === "+" ? 1 : -1;
        const hours = parseInt(offsetMatch[2]);
        const minutes = parseInt(offsetMatch[3]);

        return sign * (hours * 60 + minutes);
    };

    // Map a numeric offset in minutes to the closest timezone value string in `timezones`
    const mapOffsetToTimezoneValue = (offsetMinutes) => {
        if (!Array.isArray(timezones) || timezones.length === 0) return "UTC+00:00";

        // Precompute offsets for each option
        let best = timezones[0].value;
        let bestDiff = Infinity;

        timezones.forEach((tz) => {
            const tzOffset = getTimezoneOffsetMinutes(tz.value);
            const diff = Math.abs(tzOffset - offsetMinutes);
            if (diff < bestDiff) {
                bestDiff = diff;
                best = tz.value;
            }
        });

        return best;
    };

    // Auto-detect browser/device timezone once on mount and set the closest option
    useEffect(() => {
        try {
            if (typeof window !== "undefined" && Intl && Intl.DateTimeFormat) {
                const tz = Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g. "America/Los_Angeles"
                if (tz && typeof tz === "string") {
                    const now = new Date();
                    const formatter = new Intl.DateTimeFormat("en-US", {
                        timeZone: tz,
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                    });
                    const parts = formatter.formatToParts(now);
                    const hour = parseInt(parts.find((p) => p.type === "hour")?.value ?? "0", 10);
                    const minute = parseInt(parts.find((p) => p.type === "minute")?.value ?? "0", 10);

                    const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
                    let localMinutes = hour * 60 + minute;

                    // offset = local - UTC, normalized to [-720, 720)
                    let offset = localMinutes - utcMinutes;
                    offset = ((offset + 720) % 1440) - 720;

                    const closestTz = mapOffsetToTimezoneValue(offset);
                    setSelectedTimezone(closestTz);
                }
            }
        } catch (e) {
            console.warn("Failed to auto-detect timezone, using default UTC-08:00", e);
        }
        // We only want this to run once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const convertTimeSlots = (targetTimezone) => {
        const pdtOffsetMinutes = getTimezoneOffsetMinutes("UTC-08:00");
        const targetOffsetMinutes = getTimezoneOffsetMinutes(targetTimezone);

        const offsetDifference = targetOffsetMinutes - pdtOffsetMinutes;

        return istTimeSlots
            .map((timeSlot) => {
                const pdtMinutes = timeToMinutes(timeSlot);

                const targetMinutes = (pdtMinutes + offsetDifference + 1440) % 1440;

                return {
                    originalPDT: timeSlot,
                    convertedTime: minutesToTime(targetMinutes),
                    pdtOffset: pdtOffsetMinutes,
                    targetOffset: targetOffsetMinutes,
                    diffMinutes: offsetDifference,
                };
            })
            .sort(
                (a, b) =>
                    timeToMinutes(a.convertedTime) - timeToMinutes(b.convertedTime)
            );
    };

    // Helper: Get current time in minutes for a given timezone
    const getCurrentTimeInTimezoneMinutes = (timezone) => {
        const now = new Date();
        // Get UTC time in minutes
        const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
        // Get offset for selected timezone
        const offsetMinutes = getTimezoneOffsetMinutes(timezone);
        // Calculate local time in selected timezone
        let localMinutes = utcMinutes + offsetMinutes;
        // Wrap around 24h
        localMinutes = ((localMinutes % 1440) + 1440) % 1440;
        return localMinutes;
    };

    useEffect(() => {
        const convertedSlots = convertTimeSlots(selectedTimezone);
        // Remove slots that fall between 2:00 AM and 6:00 AM IST
        const pdtoffset = getTimezoneOffsetMinutes("UTC-08:00");
        const istoffset = getTimezoneOffsetMinutes("UTC+05:30");
        const pdtoISTDiff = istoffset - pdtoffset;

        const withoutIstQuietHours = convertedSlots.filter((slot) => {
            const istMinutes = (timeToMinutes(slot.originalPDT) + pdtoISTDiff + 1440) % 1440;
            // Exclude 2:00 AM (120) to 6:00 AM (360) IST
            return !(istMinutes >= 120 && istMinutes < 360);
        });

        // Filter out past slots if selectedDate is today
        let filteredSlots = withoutIstQuietHours;
        if (selectedDate) {
            const today = new Date();
            if (
                selectedDate.getDate() === today.getDate() &&
                selectedDate.getMonth() === today.getMonth() &&
                selectedDate.getFullYear() === today.getFullYear()
            ) {
                const nowMinutes = getCurrentTimeInTimezoneMinutes(selectedTimezone);
                filteredSlots = withoutIstQuietHours.filter(
                    (slot) => timeToMinutes(slot.convertedTime) > nowMinutes
                );
            }
        }
        setAvailableTimeSlots(filteredSlots);
        setSelectedTime(null);
    }, [selectedTimezone, selectedDate]);

    const handleTimezoneChange = (e) => {
        setSelectedTimezone(e.target.value);
    };

    const handleTimeSelection = (timeObject) => {
        setSelectedTime(timeObject.convertedTime);
        // console.log(
        //   `Selected: ${timeObject.convertedTime} in ${selectedTimezone} (${timeObject.originalPDT} PDT)`
        // );
        setStep(3);
    };

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

    const openModal = () => {
        setIsModalOpen(true);
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        // Restore body scrolling when modal is closed
        document.body.style.overflow = 'unset';
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
            message: "",
            companyWebiste: "",
            countryCode: "",
        });
        setErrors({});
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // const handleTimeSelection = (time) => {
    //   setSelectedTime(time);
    // };
    // const handleTimezoneChange = (e) => {
    //   setSelectedTimezone(e.target.value);
    // };
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
            setStep(4);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });

        if (name === "email") {
            setEmailValidationResult(null);
            setErrors((prev) => ({ ...prev, email: undefined }));
        }

        if (errors[name]) {
            setErrors({ ...errors, [name]: undefined });
        }
    };

    // Async MX lookup validation
    const validateEmailWithApi = async (email) => {
        setIsEmailValidating(true);
        setEmailValidationResult(null);
        if (!email) {
            setEmailValidationResult({ valid: false, reason: "Email is required" });
            setIsEmailValidating(false);
            return { valid: false, reason: "Email is required" };
        }
        // Company email check (client-side)
        if (/@(gmail|yahoo|hotmail|outlook|aol|icloud|protonmail|yandex|live|msn|yo|yoo)\.(com|in|net|org|co\.uk|de|fr)$/i.test(email)) {
            setEmailValidationResult({ valid: false, reason: "Please enter a valid company email address" });
            setIsEmailValidating(false);
            return { valid: false, reason: "Please enter a valid company email address" };
        }
        try {
            const res = await fetch("/api/validate-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            setEmailValidationResult(data);
            setIsEmailValidating(false);
            return data;
        } catch (err) {
            setEmailValidationResult({ valid: false, reason: "Could not validate email. Try again." });
            setIsEmailValidating(false);
            return { valid: false, reason: "Could not validate email. Try again." };
        }
    };

    // Async validation for submit
    const validateUserInfo = async () => {
        const newErrors = {};

        if (!userInfo.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!userInfo.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        // Email: use API
        const emailResult = await validateEmailWithApi(userInfo.email);
        if (!emailResult.valid) {
            newErrors.email = emailResult.reason || "Invalid email";
        }

        setErrors(newErrors);
        setEmailValidationResult(emailResult);
        return Object.keys(newErrors).length === 0;
    };

    // buildEmailValidationMessage no longer needed

    // validateEmailWithZeroBounce removed

    const pad = (n) => n.toString().padStart(2, '0');
    const dateString = selectedDate
        ? `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}`
        : null;

    // GTM Services state and handlers
    const [services, setServices] = useState({
        technicalContent: false,
        seoContent: false,
        productDocs: false,
        webflow: false,
        video: false,
        reddit: false,
        other: "",
        otherChecked: false,
    });

    const handleServiceChange = (e) => {
        const { name, checked, type, value } = e.target;
        if (name === "otherChecked") {
            setServices((prev) => ({ ...prev, otherChecked: checked, other: checked ? prev.other : "" }));
        } else if (name === "other") {
            setServices((prev) => ({ ...prev, other: value }));
        } else {
            setServices((prev) => ({ ...prev, [name]: checked }));
        }
    };

    // Final submit handler (step 3): submit to HubSpot (with slot info)
    const handleFinalSubmit = async () => {
        setIsSubmitting(true);
        function to12HourFormat(time) {
            if (!time) return "";
            if (/^\d{1,2}:\d{2} (AM|PM)$/i.test(time.trim())) return time.trim();
            let [h, m] = (time.split(":")[0] || "").split(":");
            if (!h || !m) {
                const parts = time.match(/(\d{1,2}):(\d{2})/);
                if (parts) {
                    h = parts[1];
                    m = parts[2];
                } else {
                    return time;
                }
            }
            h = parseInt(h, 10);
            m = parseInt(m, 10);
            let period = h >= 12 ? "PM" : "AM";
            let hour12 = h % 12;
            if (hour12 === 0) hour12 = 12;
            return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
        }
        const bookingData = {
            date: dateString,
            time: to12HourFormat(selectedTime),
            ...userInfo,
        };
        const hubspotEndpoint =
            "https://api.hsforms.com/submissions/v3/integration/submit/242717777/1bcf066f-9c19-430d-b3b2-a3f05aa671d7";
        const payload = {
            fields: [
                { name: "firstname", value: userInfo.firstName || "" },
                { name: "lastname", value: userInfo.lastName || "" },
                { name: "email", value: userInfo.email || "" },
                { name: "phone_number1", value: (userInfo.countryCode || "") + " " + (userInfo.phoneNumber || "") },
                { name: "message", value: userInfo.message || "" },
                { name: "start_date", value: dateString || "" },
                { name: "meeting_time", value: selectedTime || "" },
                { name: "meeting_timezone", value: selectedTimezone || "" },
                { name: "domain", value: userInfo.companyWebsite ? (userInfo.companyWebsite.startsWith('http') ? userInfo.companyWebsite : 'https://' + userInfo.companyWebsite) : "" },
                { name: "gtm_services", value: [
                    services.technicalContent && "Technical Content",
                    services.seoContent && "SEO/Thought leadership/Marketing Content",
                    services.productDocs && "Product and Use Case documentation",
                    services.webflow && "Webflow Services",
                    services.video && "Video Production and Product Explainers",
                    services.reddit && "Reddit Engagement for Community Driven Growth",
                    services.otherChecked && services.other && `Other: ${services.other}`
                ].filter(Boolean).join(", ") || "" }
            ],
            context: {
                pageUri: window.location.href,
                pageName: "Contact Form",
            },
        };
        try {
            const response = await fetch(hubspotEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                setStep(4);
                try {
                    const emailResponse = await fetch("/api/send-email", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: userInfo.email,
                            firstName: userInfo.firstName,
                            lastName: userInfo.lastName,
                            date: dateString,
                            time: to12HourFormat(selectedTime),
                            timezone: selectedTimezone,
                            companyWebsite: userInfo.companyWebsite,
                        }),
                        signal: AbortSignal.timeout(30000),
                    });
                    if (!emailResponse.ok) {
                        const errorText = await emailResponse.text();
                        console.error("Email API error:", errorText);
                    }
                } catch (emailErr) {
                    console.error("Failed to send confirmation email:", emailErr);
                }
            } else {
                const errorData = await response.json();
                console.error("HubSpot submission failed:", errorData);
                setErrors({ submission: "Form submission failed. Please try again." });
            }
        } catch (error) {
            console.error("Error submitting to HubSpot:", error);
            setErrors({ submission: "Network error. Please check your connection and try again." });
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

        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        return date < today || isWeekend;
    };

    const isSameDay = (a, b) => {
        return (
            a.getDate() === b.getDate() &&
            a.getMonth() === b.getMonth() &&
            a.getFullYear() === b.getFullYear()
        );
    };


    const formatDate = (date) => {
        return `${weekdays[date.getDay()]}, ${months[date.getMonth()]
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
            ${isPast && !isTodayDate
                            ? "text-gray-500 cursor-default"
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

    const router = useRouter(); // add this

    useEffect(() => {
        if (step === 4) {
            const selectedTzObj = timezones.find(tz => tz.value === selectedTimezone);
            const timezoneLabel = selectedTzObj ? selectedTzObj.label : selectedTimezone;
            localStorage.setItem("bookingSelected", JSON.stringify({ date: selectedDate, time: selectedTime, timezone: selectedTimezone, timezoneLabel }));
            router.push("/contact/thank-you");
        }
    }, [step, router, dateString, selectedTime, selectedTimezone, timezones]);

    return (
        <div className="h-full">
            <div className="w-full pt-36 items-center justify-center">
                <div className="w-full text-white rounded-xl p-8 flex flex-col items-center">
                    <h1 className="text-5xl text-center font-bold mb-4">Schedule a Free Demo</h1>
                    <span className="text-center text-gray-400 mb-8">
                        Book a free demo and see how Infrasity helps you move faster, smarter.
                    </span>
                </div>
                <div
                    className="mb-24"
                    style={{
                        background:
                            "radial-gradient(ellipse at 50% 0%, #272b40 0%, transparent 40%)",
                    }}
                >
                    <div className="w-full mt-10 h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5 mb-14"></div>

                    <div className="flex items-center justify-center p-4">
                        <div className="w-full lg:w-[50%] items-center justify-center rounded-3xl border border-gray-400 p-10"
                            style={{
                                background: "linear-gradient(to right, #0e1329 0%, #0e1329 10%, #353586 100%)",
                                border: "2px solid #393a52",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <div className="text-xl font-bold text-center mb-4 mt-10 ">
                                {step === 2 && (
                                    <div>
                                        <div className="rounded-full">
                                            <Image
                                                className="mx-auto mb-4 rounded-full"
                                                src="/logodata/infrasity_logo.png"
                                                alt="Meeting"
                                                width={150}
                                                height={100}
                                            />
                                        </div>
                                        Book a Time to Connect with Us
                                    </div>
                                )}
                                {step === 3 && "Book a Time to Connect with Us"}
                                {/* {step === 3 && "Complete Your Booking"} */}
                                {/* {step === 4 && "Booking Confirmed"} */}
                            </div>

                            {step === 2 && (
                                <div className="calendar-container">
                                    <div className="flex justify-between items-center mb-4">
                                        <button
                                            onClick={prevMonth}
                                            className="p-2 rounded-full hover:bg-gray-700"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <h2 className="text-xl font-medium">
                                            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                                        </h2>
                                        <button
                                            onClick={nextMonth}
                                            className="p-2 rounded-full hover:bg-gray-700"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-7 gap-1 mb-2">
                                        {weekdays.map((day) => (
                                            <div key={day} className="text-center text-gray-400 text-sm">{day}</div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                                    <div className="mt-6 flex justify-between">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                                        >
                                            Back
                                        </button>
                                        {selectedDate && (
                                            <button
                                                onClick={() => setStep(3)}
                                                className="bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white py-2 px-4 rounded-md"
                                            >
                                                Next
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="time-selection">
                                    <div>
                                        <p className="text-lg font-medium mb-1">
                                            {selectedDate && formatDate(selectedDate)}
                                        </p>
                                        <p className="text-gray-400 text-sm mb-2">
                                            Select a time slot for your meeting
                                        </p>
                                        {selectedDate && availableTimeSlots.length === 0 && (
                                            <div className="mt-2 text-sm text-yellow-300">
                                                {isSameDay(selectedDate, new Date())
                                                    ? "No time slots are available today. Please pick another date."
                                                    : "No time slots are available for this date. Please pick another date."}
                                            </div>
                                        )}
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
                                                    scrollbarWidth: "thin",
                                                    scrollbarColor: "#3d4058 #1a1f4a",
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
                                    {availableTimeSlots.length > 0 ? (
                                        <>
                                            <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto mb-4">
                                                {availableTimeSlots.map((slot, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => setSelectedTime(slot.convertedTime)}
                                                        className={`p-2 text-center rounded-md cursor-pointer border border-gray-700 
                ${selectedTime === slot.convertedTime
                                                            ? "bg-blue-600 text-white"
                                                            : "hover:bg-gray-700"
                                                        }`}
                                                    >
                                                        <div className="font-medium">{slot.convertedTime}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mb-4 p-4 border border-gray-700 rounded-md bg-[#0e1433] text-gray-300">
                                            No slots to show.
                                        </div>
                                    )}
                                    <div className="mt-6 flex justify-between">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                                        >
                                            Back
                                        </button>
                                                    {selectedTime && (
                                                        <div className="flex justify-end mt-4">
                                                            <button
                                                                className="bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white py-2 px-4 rounded-md"
                                                                disabled={isSubmitting}
                                                                onClick={handleFinalSubmit}
                                                            >
                                                                {isSubmitting ? "Submitting..." : "Confirm Slot"}
                                                            </button>
                                                        </div>
                                                    )}
                                    </div>
                                </div>
                            )}

                            {/* Final confirmation step removed. After slot selection, form is submitted and user is redirected to thank you page. */}

                            {step === 1 && (
                                <div className="user-info">
                                    <form className="space-y-4" onSubmit={async (e) => {
                                        e.preventDefault();
                                        const valid = await validateUserInfo();
                                        if (!valid) return;
                                        if (typeof window !== "undefined") {
                                            sessionStorage.setItem("contactUserInfo", JSON.stringify(userInfo));
                                        }
                                        const endpoint = "https://api.hsforms.com/submissions/v3/integration/submit/242717777/a8f79f68-e81c-41a5-a56c-7a1bc953579e";
                                        const payload = {
                                            fields: [
                                                { name: "firstname", value: userInfo.firstName || "" },
                                                { name: "lastname", value: userInfo.lastName || "" },
                                                { name: "email", value: userInfo.email || "" },
                                                { name: "phone_number1", value: (userInfo.countryCode || "") + " " + (userInfo.phoneNumber || "") },
                                                { name: "message", value: userInfo.message || "" },
                                                { name: "domain", value: userInfo.companyWebsite ? (userInfo.companyWebsite.startsWith('http') ? userInfo.companyWebsite : 'https://' + userInfo.companyWebsite) : "" },
                                                { name: "gtm_services", value: [
                                                    services.technicalContent && "Technical Content",
                                                    services.seoContent && "SEO/Thought leadership/Marketing Content",
                                                    services.productDocs && "Product and Use Case documentation",
                                                    services.webflow && "Webflow Services",
                                                    services.video && "Video Production and Product Explainers",
                                                    services.reddit && "Reddit Engagement for Community Driven Growth",
                                                    services.otherChecked && services.other && `Other: ${services.other}`
                                                ].filter(Boolean).join(", ") || "" }
                                            ],
                                            context: {
                                                pageUri: window.location.href,
                                                pageName: "Contact Form",
                                            },
                                        };
                                        try {
                                            await fetch(endpoint, {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify(payload),
                                            });
                                        } catch (err) {}
                                        setStep(2);
                                    }}>
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
                                                    onBlur={async () => { await validateEmailWithApi(userInfo.email); }}
                                                    className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] border border-gray-700`}
                                                    placeholder="Email"
                                                />
                                                {isEmailValidating && (
                                                    <p className="text-yellow-300 text-sm mt-1 text-left">
                                                        Validating email...
                                                    </p>
                                                )}
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1 text-left">
                                                        {errors.email}
                                                    </p>
                                                )}
                                                {!isEmailValidating &&
                                                    emailValidationResult &&
                                                    emailValidationResult.valid === false &&
                                                    emailValidationResult.reason && (
                                                        <p className="text-red-500 text-sm mt-1 text-left">
                                                            {emailValidationResult.reason}
                                                        </p>
                                                    )}
                                                {!isEmailValidating &&
                                                    emailValidationResult &&
                                                    emailValidationResult.valid === true &&
                                                    !errors.email && (
                                                        <p className="text-green-400 text-sm mt-1 text-left">
                                                            Email validated successfully.
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
                                                    value={userInfo.companyWebsite}
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
                                            <div className="flex w-full">
                                                <select
                                                    name="countryCode"
                                                    value={userInfo.countryCode}
                                                    onChange={handleInputChange}
                                                    className="w-[88px] bg-[#0c102e] rounded-l pl-1 py-2 text-white focus:outline-none focus:ring-[0.5px] focus:ring-[#4f4bc6] border border-[#3d4058] border-r-0"
                                                >
                                                    <option value="+1">🇺🇸 +1</option>
                                                    <option value="+7">🇷🇺 +7</option>
                                                    <option value="+20">🇪🇬 +20</option>
                                                    <option value="+27">🇿🇦 +27</option>
                                                    <option value="+30">🇬🇷 +30</option>
                                                    <option value="+31">🇳🇱 +31</option>
                                                    <option value="+32">🇧🇪 +32</option>
                                                    <option value="+33">🇫🇷 +33</option>
                                                    <option value="+34">🇪🇸 +34</option>
                                                    <option value="+36">🇭🇺 +36</option>
                                                    <option value="+39">🇮🇹 +39</option>
                                                    <option value="+40">🇷🇴 +40</option>
                                                    <option value="+41">🇨🇭 +41</option>
                                                    <option value="+43">🇦🇹 +43</option>
                                                    <option value="+44">🇬🇧 +44</option>
                                                    <option value="+45">🇩🇰 +45</option>
                                                    <option value="+46">🇸🇪 +46</option>
                                                    <option value="+47">🇳🇴 +47</option>
                                                    <option value="+48">🇵🇱 +48</option>
                                                    <option value="+49">🇩🇪 +49</option>
                                                    <option value="+51">🇵🇪 +51</option>
                                                    <option value="+52">🇲🇽 +52</option>
                                                    <option value="+54">🇦🇷 +54</option>
                                                    <option value="+55">🇧🇷 +55</option>
                                                    <option value="+56">🇨🇱 +56</option>
                                                    <option value="+57">🇨🇴 +57</option>
                                                    <option value="+58">🇻🇪 +58</option>
                                                    <option value="+60">🇲🇾 +60</option>
                                                    <option value="+61">🇦🇺 +61</option>
                                                    <option value="+62">🇮🇩 +62</option>
                                                    <option value="+63">🇵🇭 +63</option>
                                                    <option value="+64">🇳🇿 +64</option>
                                                    <option value="+65">🇸🇬 +65</option>
                                                    <option value="+66">🇹🇭 +66</option>
                                                    <option value="+81">JP +81</option>
                                                    <option value="+82">🇰🇷 +82</option>
                                                    <option value="+84">🇻🇳 +84</option>
                                                    <option value="+86">🇨🇳 +86</option>
                                                    <option value="+90">🇹🇷 +90</option>
                                                    <option value="+91">🇮🇳 +91</option>
                                                    <option value="+92">🇵🇰 +92</option>
                                                    <option value="+93">🇦🇫 +93</option>
                                                    <option value="+94">🇱🇰 +94</option>
                                                    <option value="+95">🇲🇲 +95</option>
                                                    <option value="+98">🇮🇷 +98</option>
                                                    <option value="+212">🇲🇦 +212</option>
                                                    <option value="+213">🇩🇿 +213</option>
                                                    <option value="+216">🇹🇳 +216</option>
                                                    <option value="+218">🇱🇾 +218</option>
                                                    <option value="+220">🇬🇲 +220</option>
                                                    <option value="+221">🇸🇳 +221</option>
                                                    <option value="+234">🇳🇬 +234</option>
                                                    <option value="+254">🇰🇪 +254</option>
                                                    <option value="+351">🇵🇹 +351</option>
                                                    <option value="+352">🇱🇺 +352</option>
                                                    <option value="+353">🇮🇪 +353</option>
                                                    <option value="+354">🇮🇸 +354</option>
                                                    <option value="+355">🇦🇱 +355</option>
                                                    <option value="+358">🇫🇮 +358</option>
                                                    <option value="+359">🇧🇬 +359</option>
                                                    <option value="+370">🇱🇹 +370</option>
                                                    <option value="+371">🇱🇻 +371</option>
                                                    <option value="+372">🇪🇪 +372</option>
                                                    <option value="+380">🇺🇦 +380</option>
                                                    <option value="+385">🇭🇷 +385</option>
                                                    <option value="+420">🇨🇿 +420</option>
                                                    <option value="+421">🇸🇰 +421</option>
                                                    <option value="+503">🇸🇻 +503</option>
                                                    <option value="+504">🇭🇳 +504</option>
                                                    <option value="+505">🇳🇮 +505</option>
                                                    <option value="+506">🇨🇷 +506</option>
                                                    <option value="+507">🇵🇦 +507</option>
                                                    <option value="+591">🇧🇴 +591</option>
                                                    <option value="+593">🇪🇨 +593</option>
                                                    <option value="+595">🇵🇾 +595</option>
                                                    <option value="+598">🇺🇾 +598</option>
                                                    <option value="+673">🇧🇳 +673</option>
                                                    <option value="+852">🇭🇰 +852</option>
                                                    <option value="+855">🇰🇭 +855</option>
                                                    <option value="+880">🇧🇩 +880</option>
                                                    <option value="+886">🇹🇼 +886</option>
                                                    <option value="+960">🇲🇻 +960</option>
                                                    <option value="+961">🇱🇧 +961</option>
                                                    <option value="+962">🇯🇴 +962</option>
                                                    <option value="+963">🇸🇾 +963</option>
                                                    <option value="+966">🇸🇦 +966</option>
                                                    <option value="+971">🇦🇪 +971</option>
                                                    <option value="+972">🇮🇱 +972</option>
                                                    <option value="+977">🇳🇵 +977</option>
                                                    <option value="+994">🇦🇿 +994</option>
                                                    <option value="+995">🇬🇪 +995</option>
                                                </select>
                                                <input
                                                    type="tel"
                                                    name="phoneNumber"
                                                    value={userInfo.phoneNumber}
                                                    onChange={handleInputChange}
                                                    className={`w-full bg-[#0c102e] rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#3d4058] border border-gray-700`}
                                                    placeholder="Phone Number"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-gray-300 mb-2 text-left font-semibold">
                                                What GTM services are you interested in?
                                            </label>
                                            <div className="grid grid-cols-1 gap-2">
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="technicalContent" checked={services.technicalContent} onChange={handleServiceChange} className="mr-2" />
                                                    Technical Content
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="reddit" checked={services.reddit} onChange={handleServiceChange} className="mr-2" />
                                                    Reddit Engagement for Community Driven Growth
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="seoContent" checked={services.seoContent} onChange={handleServiceChange} className="mr-2" />
                                                    SEO/Thought leadership/Marketing Content
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="productDocs" checked={services.productDocs} onChange={handleServiceChange} className="mr-2" />
                                                    Product and Use Case documentation
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="webflow" checked={services.webflow} onChange={handleServiceChange} className="mr-2" />
                                                    Webflow Services
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="video" checked={services.video} onChange={handleServiceChange} className="mr-2" />
                                                    Video Production and Product Explainers
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" name="otherChecked" checked={services.otherChecked} onChange={handleServiceChange} className="mr-2" />
                                                    Other
                                                    {services.otherChecked && (
                                                        <input
                                                            type="text"
                                                            name="other"
                                                            value={services.other}
                                                            onChange={handleServiceChange}
                                                            className="ml-2 px-2 py-1 rounded bg-[#0c102e] border border-gray-700 text-white"
                                                            placeholder="Please specify"
                                                        />
                                                    )}
                                                </label>
                                            </div>
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
                                        <div className="mt-6 flex justify-end">
                                            <button
                                                type="submit"
                                                className={`bg-gradient-to-r from-[#5F64FF] to-[#4d51e0] hover:from-[#4d51e0] hover:to-[#3c40c5] text-white py-2 px-4 rounded-md ${isEmailValidating || errors.email || !userInfo.email || (emailValidationResult && emailValidationResult.valid === false) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                disabled={isEmailValidating || errors.email || !userInfo.email || (emailValidationResult && emailValidationResult.valid === false)}
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* {step === 4 && (
                               Router.push('/contact/thank-you')
                            )} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarBooking;
