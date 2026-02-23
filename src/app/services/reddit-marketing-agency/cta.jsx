import Link from "next/link";
import CalendarBooking from "../../calendarButton";

export default function Cta() {
    return (
        <div className="px-8 py-16">
            <div
                className="max-w-[1240px] mx-auto text-center relative overflow-hidden rounded-2xl"
                style={{
                    background: "#0e0b1b",
                    border: "1.5px solid rgba(45, 51, 71, 1)",
                }}
            >
                {/* Top purple gradient accent line */}
                <div className="absolute top-0 left-[8%] right-[8%] h-[2px] bg-gradient-to-r from-transparent via-pink-400 to-transparent" />

                {/* Subtle orange radial glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse 55% 45% at 50% 100%, rgba(255,69,0,0.05) 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-10 px-8 md:px-[90px] py-16 md:py-[80px]">
                    {/* Heading */}
                    <div className="quicksand-bold text-[30px] md:text-[42px] max-sm:text-[1.6em] leading-tight text-white text-center flex justify-center mb-3">
                        <h2 className="leading-tight text-center max-lg:mx-auto text-[28px] md:text-[70px] max-sm:text-[1.6em]">
                            Your Buyers Are on <span className="text-[#ff4500]">Reddit.</span>
                            <br />
                            Are You in That{" "}
                            <em className="not-italic text-[#ff4500]">Conversation?</em>
                        </h2>
                    </div>

                    {/* Subtext */}
                    <div className="max-w-[520px] mx-auto mb-8">
                        <p className="text-[16px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                            We'll audit your current Reddit presence, map the competitive landscape, and deliver a month-by-month engagement plan before we take a dollar.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 justify-center flex-wrap items-center">
                        <CalendarBooking
                            buttonText="Get a Free Reddit Audit →"
                            width="w-auto"
                            textSize="text-sm"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
