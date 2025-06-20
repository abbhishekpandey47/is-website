import React from "react";
import CalendarBooking from "../../calendarButton";

export default function Cta() {
    return (
        <div>
            <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
                <div className="quicksand-bold text-[37px] max-sm:text-[1em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
                    <h1 className=" leading-[80px] max-sm:leading-[69px] text-center max-lg:text-center max-lg:mx-auto">
                        Ready to Transform Your AI Content?
                    </h1>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        Your AI agent startup is changing the game - now let's make sure the
                        world knows how. Infrasity will craft the technical stories and
                        growth strategy to get you there faster.
                    </p>
                </div>
            </div>
            <div className="p-8">
                <div className="flex justify-center">
                    <CalendarBooking />
                </div>
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[15px] text-gray-300 leading-relaxed font-light text-center mt-4">
                        Let's build your developer growth engine together!
                    </p>
                </div>
            </div>
        </div>
    );
}
