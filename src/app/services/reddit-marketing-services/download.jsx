"use client";

import React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import { saveUserData } from "../../roi-cal/user"

export default function DownloadPDF() {
    const [isEmailSending, setIsEmailSending] = useState(false);
    const [isPopup, setIsPopup] = useState(false);
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const popupRef = useRef(null);
    const handlePopup = () => {
        setIsPopup(true);
        document.body.style.overflow = 'hidden';
    };

    const closePopup = () => {
        setIsPopup(false);
        document.body.style.overflow = 'unset';
        setEmail("");
        setIsSubmitted(false); // Reset submitted state when closing
        setErrorMessage(""); // Clear any error messages
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsEmailSending(true);
        setErrorMessage("");

        if (!email) {
            setIsEmailSending(false);
            return;
        }

        try {
            const userData = {
                email
            };

            const result = await saveUserData(userData);

            if (result && result.status === "success") {
                setIsEmailSending(false);
                setIsSubmitted(true);

                setTimeout(() => {
                    window.location.href = "https://drive.google.com/uc?export=download&id=1bX9OsrZd2DltBL-p1aLhhUPIqwVW8au7";
                }, 1500);
            } else {
                throw new Error("Received unsuccessful response from saveUserData");
            }
        } catch (error) {
            setIsEmailSending(false);
            setErrorMessage("Failed to submit form. Please try again.");
            console.error("Error saving form data:", error);
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                closePopup();
            }
        }

        if (isPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isPopup]);

    return (
        <div className="flex items-center justify-center my-16">
            <div className="w-[90%]">
                <div
                    className="relative rounded-3xl overflow-hidden transition-all duration-500 hover:border-purple-500/30"
                    style={{
                        background: "linear-gradient(to top right, #020207 40%, #2c3077 90%)",
                        border: "2px solid #2f2f37",
                        transition: "all 0.3s ease",
                    }}
                >
                    <div
                        className={`absolute -top-1 -right-1 w-32 h-32 bg-gradient-to-br from-purple-500/30 via-blue-500/20 to-transparent rounded-full blur-xl transition-all duration-500`}
                    ></div>

                    {/* Desktop Layout */}
                    <div className="hidden md:flex">
                        <div className="w-[60%] flex-1 p-14 px-14 mb-2">
                            <div className="flex items-start justify-between mb-3">
                                <h2 className="text-[26px] font-bold text-white quicksand-bold tracking-wide">
                                    <span className="text-[#FB651E]">Reddit </span>Marketing Built for Engineers, <br /> Not Marketers.
                                </h2>
                            </div>

                            <p className="w-[110%] text-[15px] text-[#FFFFFF] tracking-wider leading-[26px] font-[Quicksand] font-light mb-8">
                                We help AI and DevTool startups grow organically through value-first participation in the right threads. Get high-upvoted mentions, long-term discoverability, and real traffic — all without breaking subreddit rules.
                            </p>

                            <div className="flex items-center justify-left">
                                <button
                                    onClick={handlePopup}
                                    className="flex items-center border border-white justify-between px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105"
                                >
                                    <span className="mr-3">Download Playbook</span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex-shrink-0"
                                    >
                                        <mask id="mask0_846_1604" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                            <rect width="20" height="20" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_846_1604)">
                                            <path d="M3.33325 18.3332V16.6665H16.6666V18.3332H3.33325ZM9.99992 14.9998L4.16659 7.49984H7.49992V1.6665H12.4999V7.49984H15.8333L9.99992 14.9998ZM9.99992 12.2915L12.4166 9.1665H10.8333V3.33317H9.16658V9.1665H7.58325L9.99992 12.2915Z" fill="currentColor" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Right Side - Image */}
                        <div className="w-[40%] flex-1">
                            <div className="h-full min-h-[200px] -top-8 left-4 bottom-0 right-0 relative overflow-hidden rounded-xl">
                                <div className=" p-4 h-full relative overflow-hidden rounded-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br flex items-center justify-center text-slate-600 text-lg font-medium rounded-xl">
                                        <img
                                            src={`/reddit/download.png`}
                                            alt="Kubiya Dashboard"
                                            height={500}
                                            width={600}
                                            className="absolute inset-0 object-cover rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="md:hidden">
                        <div className="w-full p-8">
                            <div className="h-56 relative overflow-hidden rounded-xl">
                                <div className="h-full relative overflow-hidden rounded-xl">
                                    <div className="absolute inset-0 bg-gradient-to-br flex items-center justify-center text-slate-600 text-lg font-medium rounded-xl">
                                        <img
                                            src={`/reddit/download.png`}
                                            alt="Kubiya Dashboard"
                                            className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full p-6 pt-2">
                            <div className="mb-4">
                                <h2 className="text-xl sm:text-2xl font-bold text-white quicksand-bold tracking-wide">
                                    <span className="text-[#FB651E]">Reddit </span>Marketing Built for Engineers, Not Marketers.
                                </h2>
                            </div>

                            <p className="text-sm sm:text-base text-[#FFFFFF] tracking-wide leading-6 font-[Quicksand] font-light mb-6">
                                We help AI and DevTool startups grow organically through value-first participation in the right threads. Get high-upvoted mentions, long-term discoverability, and real traffic — all without breaking subreddit rules.
                            </p>

                            <div className="flex items-center justify-center">
                                <button
                                    onClick={handlePopup}
                                    className="flex items-center border border-white justify-between px-4 sm:px-6 py-3 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 w-full sm:w-auto"
                                >
                                    <span className="mr-3">Download Playbook</span>
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="flex-shrink-0"
                                    >
                                        <mask id="mask0_846_1604_mobile" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                            <rect width="20" height="20" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_846_1604_mobile)">
                                            <path d="M3.33325 18.3332V16.6665H16.6666V18.3332H3.33325ZM9.99992 14.9998L4.16659 7.49984H7.49992V1.6665H12.4999V7.49984H15.8333L9.99992 14.9998ZM9.99992 12.2915L12.4166 9.1665H10.8333V3.33317H9.16658V9.1665H7.58325L9.99992 12.2915Z" fill="currentColor" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
                    <div
                        ref={popupRef}
                        className="rounded-xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden max-w-md w-full"
                        style={{
                            backgroundColor: "rgba(30, 32, 45, 0.7)",
                            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.36)",
                            border: "1px solid rgba(60, 63, 84, 0.3)",
                        }}
                    >
                        <button
                            onClick={closePopup}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 cursor-pointer z-20"
                            type="button"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-purple-500 opacity-10 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-blue-500 opacity-10 blur-2xl"></div>

                        <div className="relative z-10">
                            {!isSubmitted ? (
                                <>
                                    <h3 className="text-lg sm:text-xl font-medium text-gray-100 mb-4">
                                        Download Playbook
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-300 mb-6">
                                        Enter your email address to Download Playbook.
                                    </p>

                                    {errorMessage && (
                                        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                                            <p className="text-red-300 text-sm">{errorMessage}</p>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isEmailSending}
                                            className="w-full py-3 px-4 text-white font-medium rounded-lg transition-all disabled:opacity-50"
                                            style={{
                                                background: 'linear-gradient(to right, #2563eb, #9333ea)',
                                                backgroundImage: 'linear-gradient(to right, #2563eb, #9333ea)',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isEmailSending) {
                                                    e.target.style.opacity = '0.9';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.opacity = '1';
                                            }}
                                        >
                                            {isEmailSending ? (
                                                <span className="flex items-center justify-center">
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
                                                </span>
                                            ) : (
                                                "Submit"
                                            )}
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8">
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
                                    <h3 className="text-lg sm:text-xl font-medium text-gray-100 mb-2">
                                        Thank You!
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-300">
                                        Your email has been successfully submitted. Download will start shortly...
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}