import React from "react";
import CalendarBooking from "../../calendarButton";
import HighVolt from "./svg/hightVolt";
import Rocket from "./svg/rocket";
import Tool from "./svg/tool";

export default function Cta() {
    return (
        <div>
            <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
                <div className="quicksand-bold text-[37px] max-sm:text-[25px] tracking-tighter leading-[40px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:mx-auto tracking-wide">
                    See how fast we can go? book a quick sync
                    </h2>
                </div>
                <div class="flex justify-center my-6 mb-8">
                    <div class="w-[148px] h-1 rounded-full"
                        style={{
                            backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                        }}
                    ></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light tracking-wide">
                    From blog posts and docs to demo videos and launch campaigns—everything’s built, shipped, and live in 10–14 days.
                    </p>
                </div>
            </div>
            <div className="p-8">
                <div className="flex justify-center">
                    <CalendarBooking />
                </div>
            </div>
        </div>
    );
}
