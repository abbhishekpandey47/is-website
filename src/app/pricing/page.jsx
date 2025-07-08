"use client";

import BookDemo from "../book-a-demo/cta";
import PricingPage from "./pricing";

export default function Page() {
    return (
        <div className="text-white">
            <PricingPage />
            <div className="w-full h-px shadow-pink-400/50 bg-gradient-to-r from-pink-500/5 via-pink-300 to-pink-500/5"></div>
            <div className=" flex justify-center items-center mb-28">
                <BookDemo />
            </div>
        </div>
    );
}
