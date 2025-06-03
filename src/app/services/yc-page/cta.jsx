import React from "react";
import CalendarBooking from "../../calendarButton";

export default function Cta() {
    return (
        <div>
            <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
                <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
                    <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto tracking-wide">
                        Ready to Scale Your Launch?
                    </h1>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light tracking-wide">
                        Get bulletproof tech content and sites that accelerate your startup's growth. See how our expert team can transform your go-to-market strategy.
                    </p>
                </div>
            </div>
            <div className="p-8">
                <div className="flex justify-center">
                    <CalendarBooking />
                </div>
                <div className="bg-black flex items-center justify-center p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10">
                            {/* Feature 1 */}
                            <div className="flex items-center gap-1">
                                <span className="text-xl">⚡</span>
                                <span className="text-white text-lg font-light">Launch-ready in days</span>
                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-center gap-1">
                                <span className="text-xl">⚡</span>
                                <span className="text-white text-lg font-light">Engineer-authored content</span>
                            </div>

                            {/* Feature 3 */}
                            <div className="flex items-center gap-1">
                                <span className="text-xl">🚀</span>
                                <span className="text-white text-lg font-light">YC-proven results</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
