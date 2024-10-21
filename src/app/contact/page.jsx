'use client'
import React, { useEffect, useContext } from 'react';
import TestiCarousel from './TestiCarousel';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Button, message, Space } from 'antd';
import LoadingBar from 'react-top-loading-bar';

import AppContext from '@/context/Infracontext';

const contentStyle = {
    color: '#fff',
    padding: '2rem',
    textAlign: 'center',
    borderRadius: '8px',
    lineHeight: '1.5',
};

const ContactHome = () => {
    const [contactMsg, setContactMsg] = useState({
        fname: 'fname',
        lname: '',
        company: '',
        email: '',
        country: '',
        ccode: '',
        phone: '',
    })
    const success = (mymsg) => {
        messageApi.open({
            type: 'success',
            content: mymsg,
        });
    };
    const error = (mymsg) => {
        messageApi.open({
            type: 'error',
            content: mymsg,
        });
    };
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: 'Invitation sending on progress',
        });
    };
    const handleOnContactSend = async (e) => {
        e.preventDefault();
        warning()
        const myjson = await fetch('https://infrasity-backend.onrender.com/api/bookmeeting', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contactMsg),
        })
        const res = await myjson.json()
        if(res.success){
            success(res.msg)
        }
        else{
            error(res.msg)
        }
    }
    

    const context = useContext(AppContext)

    const { setProgress, progress } = context

    useEffect(() => {
        setProgress(100)
        return () => {
        }
    }, [])

    const [messageApi, contextHolder] = message.useMessage();
    


    return (
        <div className='absolute w-[100%] top-0 z-[21]'>
            {contextHolder}
            <Link href="/" className='cursor-pointer absolute pt-7 pl-10'>
                <div className=''><img className='w-40' src="/logodata/infrasity_logo.png" alt="image" /></div>
            </Link>
            <div className="flex min-h-screen flex-wrap max-lg:flex-col">
                {/* Left Section - Form */}
                <div className="w-[65%] max-lg:w-full bg-white flex flex-col justify-center items-center max-sm:px-6 p-12">
                    <div className="w-full max-w-xl p-8 max-sm:px-0">
                        <h2 className="text-3xl font-bold mb-4 text-center text-black quicksand-bold">Book a Demo</h2>
                        <p className="text-zinc-800 text-center mb-8 quicksand-medium">
                            Looking for developer-focused tech content to increase user signups for your product? Reach out at <a href="mailto:contact@infrasity.com" style={{ color: "darkblue" }} className='italic href-blue hover:underline'>contact@infrasity.com</a> for DevRel, Go-To-Market strategies, and tech content distribution for your product.
                        </p>
                        <form className="space-y-4">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="w-1/2 p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onChange={(e) => setContactMsg({ ...contactMsg, fname: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="w-1/2 p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onChange={(e) => setContactMsg({ ...contactMsg, lname: e.target.value })}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Company Name"
                                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                                onChange={(e) => setContactMsg({ ...contactMsg, company: e.target.value })}
                            />
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onChange={(e) => setContactMsg({ ...contactMsg, email: e.target.value })}
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Country"
                                className="w-full p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                                onChange={(e) => setContactMsg({ ...contactMsg, country: e.target.value })}
                            />
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="+91"
                                    className="w-[15%] p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onChange={(e) => setContactMsg({ ...contactMsg, ccode: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="0000000000"
                                    className="w-[85%] p-3 border border-gray-300 rounded-md bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                                    onChange={(e) => setContactMsg({ ...contactMsg, phone: e.target.value })}
                                />
                            </div>
                            <button onClick={handleOnContactSend} className="btn w-full bg-btnprimary border-none text-white p-3 font-semibold hover:bg-btnprimaryhov rounded-full transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600">
                                Continue
                            </button>
                        </form>

                        <p className="text-zinc-800 text-xs mt-4 text-center quicksand-ligth">
                            By signing up you agree to our <a href="#" className="text-blue-600 underline">Terms of Service</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
                        </p>
                    </div>
                </div>

                <div className="w-[35%] lg:fixed lg:right-0 lg:h-screen max-lg:w-full bg-gradient-to-br from-[#1c174a] to-[#1a1a6e] text-white p-8 flex flex-col justify-center items-center">
                    
                    <TestiCarousel />
                </div>
            </div>
        </div>
    );
}

export default ContactHome;
