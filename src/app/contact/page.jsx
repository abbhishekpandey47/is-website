'use client';
import React, { useEffect, useContext } from 'react';
import TestiCarousel from './TestiCarousel';
import Link from 'next/link';
import { useState } from 'react';
import { message, Spin } from 'antd'; // Import Spin for loading indicator
import AppContext from '@/context/Infracontext';

const ContactHome = () => {
    const [contactMsg, setContactMsg] = useState({
        fname: '',
        lname: '',
        company: '',
        email: '',
        country: '',
        ccode: '',
        phone: '',
    });

    const [loading, setLoading] = useState(false); // Loading state

    const success = (mymsg) => {
        message.success(mymsg);
    };

    const error = (mymsg) => {
        message.error(mymsg);
    };

    const handleOnContactSend = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 90000);

            const response = await fetch(
                'https://infrasity-backend-j84r.onrender.com/api/bookmeeting',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contactMsg),
                    signal: controller.signal,
                }
            );

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const res = await response.json();
            if (res.success) {
                success(res.msg);
            } else {
                error(res.msg);
            }
        } catch (err) {
            if (err.name === 'AbortError') {
                error('Request timed out. Please try again.');
            } else {
                error('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const context = useContext(AppContext);
    const { setProgress } = context;

    useEffect(() => {
        setProgress(100);
    }, []);

    return (
        <div className="absolute w-[100%] top-0 z-[21]">
            {/* Global style overrides for Ant Design alerts */}
            <style jsx global>{`
                .ant-message {
                    z-index: 9999 !important;
                    top: 80px !important;
                    left: 50% !important;
                    transform: translateX(-50%);
                    position: fixed !important;
                }

                .ant-message-notice-content {
                    font-size: 22px;
                    padding: 20px 30px;
                    border-radius: 8px;
                    text-align: center;
                    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
                }

                @media (min-width: 768px) {
                    .ant-message {
                        left: 33% !important;
                        transform: translateX(-25%);
                    }
                }
            `}</style>

            <Link href="/" className="cursor-pointer absolute pt-7 pl-10">
                <img
                    className="w-40"
                    src="/logodata/infrasity_logo.png"
                    alt="logo"
                />
            </Link>

            <div className="flex min-h-screen flex-wrap max-lg:flex-col">
                {/* Left Section - Form */}
                <div className="w-[45%] max-lg:w-full bg-white flex flex-col justify-center items-center max-sm:px-6 p-12">
                    <div className="w-full max-w-xl p-8 max-sm:px-0">
                    <h1 className="text-3xl font-bold mb-4 text-center text-black quicksand-bold">
                        Book a <span className="text-[#6c5be7]">FREE</span> Demo
                    </h1>
                        <p className="text-zinc-800 text-center mb-8 quicksand-medium">
                            Looking for developer-focused tech content to
                            increase user signups for your product? Reach out at{' '}
                            <a
                                href="mailto:contact@infrasity.com"
                                style={{ color: 'darkblue' }}
                                className="italic href-blue hover:underline"
                            >
                                contact@infrasity.com
                            </a>{' '}
                            for DevRel, Go-To-Market strategies, and tech
                            content distribution for your product.
                        </p>

                        <form onSubmit={handleOnContactSend} className="space-y-4">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-1/2 p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
                                    onChange={(e) =>
                                        setContactMsg({
                                            ...contactMsg,
                                            fname: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-1/2 p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none"
                                    onChange={(e) =>
                                        setContactMsg({
                                            ...contactMsg,
                                            lname: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="w-full p-3 border border-gray-300 rounded-md bg-white text-black"
                                onChange={(e) =>
                                    setContactMsg({
                                        ...contactMsg,
                                        company: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-3 border border-gray-300 rounded-md bg-white text-black"
                                onChange={(e) =>
                                    setContactMsg({
                                        ...contactMsg,
                                        email: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                className="w-full p-3 border border-gray-300 rounded-md bg-white text-black"
                                onChange={(e) =>
                                    setContactMsg({
                                        ...contactMsg,
                                        country: e.target.value,
                                    })
                                }
                            />
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="+91"
                                    className="w-[15%] p-3 border border-gray-300 rounded-md bg-white text-black"
                                    onChange={(e) =>
                                        setContactMsg({
                                            ...contactMsg,
                                            ccode: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type="text"
                                    placeholder="0000000000"
                                    className="w-[85%] p-3 border border-gray-300 rounded-md bg-white text-black"
                                    onChange={(e) =>
                                        setContactMsg({
                                            ...contactMsg,
                                            phone: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <button
                            type="submit"
                            style={{
                                width: '100%',
                                backgroundColor: loading ? 'gray' : '#1E40AF', // bg-blue-600
                                border: 'none',
                                color: 'white',
                                padding: '0.75rem', // p-3
                                fontWeight: '600', // font-semibold
                                borderRadius: '9999px', // rounded-full
                                transition: 'background-color 0.2s', // transition duration-200
                                outline: 'none', // focus:outline-none
                                boxShadow: loading ? 'none' : '0 0 0 2px #1E40AF' // focus:ring-2 focus:ring-blue-600
                            }}
                            disabled={loading}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563EB'} // hover:bg-btnprimaryhov
                            onMouseLeave={(e) => e.target.style.backgroundColor = loading ? 'gray' : '#1E40AF'} // bg-blue-600
                            >
                            {loading ? <Spin size="small" /> : 'Continue'}
                            </button>
                        </form>

                        <p className="text-zinc-800 text-xs mt-4 text-center">
                            By signing up you agree to our{' '}
                            <a href="terms-of-services" className="text-blue-600 underline">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="privacy-policy" className="text-blue-600 underline">
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>

                <div className="flex flex-col h-full w-[55%] lg:fixed lg:right-0 bg-gradient-to-br from-[#1c174a] to-[#1a1a6e] text-white max-lg:w-full">
                    {/* USP Section */}
                    <div className="flex flex-col justify-center items-center h-1/2 p-16 space-y-6">
                        <h2 className="text-3xl font-bold mb-4 text-center">Why Modern Engineering Companies Trust Infrasity</h2>
                        <div className="flex flex-col justify-center items-start space-y-4 quicksand-light text-base md:text-lg 2xl:text-xl">
                            <div className="flex items-start space-x-2">
                                <svg className="w-6 h-6 text-green-500 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                <p className="text-left">Technical Expertise: Content written by developers & Infrastructure engineers</p>
                            </div>
                            <div className="flex items-start space-x-2 ">
                                <svg className="w-6 h-6 text-green-500 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                <p className="text-left">Proven Results: 70% of content getting 1st page of SERP</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <svg className="w-6 h-6 text-green-500 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                <p className="text-left">Content written by developers & Infrastructure engineers</p>
                            </div>
                            <div className="flex items-start space-x-2">
                                <svg className="w-6 h-6 text-green-500 flex-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                                <p className="text-left">Developer Relations Approach: Unified process for content research & analytics</p>
                            </div>
                        </div>
                    </div>
                    <hr className="border-t border-white opacity-50 mx-8 my-2" />
                    {/* Testimonials Section */}
                    <div className="flex flex-col justify-center items-center h-1/2 max-pb-16">
                        {/*<h2 className="text-4xl font-bold mb-2 text-center">What Our Clients Say</h2>*/}
                        <TestiCarousel />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactHome;

