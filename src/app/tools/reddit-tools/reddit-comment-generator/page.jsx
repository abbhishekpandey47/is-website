"use client"

import { useEffect, useState } from "react";
import FAQ from "./faq"
import RedditPostTemplate from "./hero"
import ToolsSection from "./tools"
import { FiSun, FiMoon, FiX } from "react-icons/fi";


export default function Page() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedPreference = localStorage.getItem('darkMode');
        const isDarkMode =
            savedPreference === 'true' ||
            (savedPreference === null && window.matchMedia('(prefers-color-scheme: dark)').matches);

        setDarkMode(isDarkMode);
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('darkMode', isDarkMode.toString());
    }, []);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        document.documentElement.classList.toggle('dark', newDarkMode);
        localStorage.setItem('darkMode', newDarkMode.toString());
    };
    return (
        <div
            className={`pt-16 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'
                }`}
        >
            <div className="max-w-6xl mx-auto flex justify-end items-end mb-10 mr-14 md:mr-14">
                <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full transition cursor-pointer ${darkMode
                        ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    aria-label="Toggle Dark Mode"
                >
                    {darkMode ? (
                        <FiSun className="w-5 h-5" />
                    ) : (
                        <FiMoon stroke="black" className="w-5 h-5" />
                    )}
                </button>
            </div>

           


            <RedditPostTemplate darkMode={darkMode} />
            <FAQ darkMode={darkMode} />
            <ToolsSection darkMode={darkMode} />
        </div>
    )
}
