import React from "react";
import CalendarBooking from "../../calendarButton";

export default function Cta() {
    return (
        <div>
            <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] tracking-tighter text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[80px] max-lg:text-center max-lg:mx-auto">
                        Want your {" "}
                        <span
                            className="bg-clip-text text-transparent"
                            style={{
                                backgroundImage: "linear-gradient(90.63deg, #6B5BE7 14.54%, #A64AE7 42.42%, #C62FE7 86.96%)"
                            }}
                        >GTM motion</span> {" "}to feel like a compound engine?
                    </h2>
                </div>
                <div className="flex justify-center my-1 mb-7">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        Let’s talk about how Infrasity can power your next launch, one page at a time.                    </p>
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
