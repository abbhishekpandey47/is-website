'use client'
import { useEffect, useState } from "react";

const ThankYou = () => {

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


    const [dateStr, setDateStr] = useState("");
    const [time, setTime] = useState("");
    const [timezoneLabel, setTimezoneLabel] = useState("");

    useEffect(() => {
        try {
            const raw = localStorage.getItem("bookingSelected");
            if (raw) {
                const data = JSON.parse(raw);
                // support both {date,time} and {selectedDate,selectedTime}
                setDateStr(data?.date || data?.selectedDate || "");
                setTime(data?.time || data?.selectedTime || "");
                setTimezoneLabel(data?.timezoneLabel || data?.timezone || "");
            }
        } catch {}
    }, []);

    const toDate = (v) => {
        if (!v) return null;
        // robust parse for YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
            const [y, m, d] = v.split("-").map(Number);
            return new Date(y, m - 1, d);
        }
        const d = new Date(v);
        return isNaN(d) ? null : d;
    };

    const formatDate = (v) => {
        const d = toDate(v);
        if (!d) return "";
        return `${weekdays[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };

    const displayDate = formatDate(dateStr);

    return (
        <div className="success-message text-center py-8 min-h-screen mt-40 ">
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
                                        {displayDate} at {time}
                                        {timezoneLabel && (
                                            <> {timezoneLabel}</>
                                        )}
                                    </p>
                                    <p className="mt-2 text-gray-400">
                                        A confirmation email has been sent to your inbox.
                                    </p>
                                </div>
    );
};

export default ThankYou;
