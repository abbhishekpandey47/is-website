import CalendarBooking from "../../calendarButton";
import ContactPopupButton from "./ContactPopupButton";


export default function Cta() {
    return (
        <div>
            <div className="max-w-6xl mx-auto text-center relative z-10 mb-8">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] tracking-tighter leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[80px] max-lg:text-center max-lg:mx-auto">
                        Ready to win <span className="text-[#ff4500]">Reddit</span>? Get a <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 bg-clip-text text-transparent font-bold">free audit</span> today.
                    </h2>
                </div>
                <div className="flex justify-center my-3 mb-7">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                        Join the developer tools that are already dominating Reddit conversations.
                    </p>
                </div>
            </div>
                 <div className="flex flex-col items-center">
                                    {/* Center - Book a Demo button */}
                                    <div className="flex flex-col items-center mt-4">
                                        <ContactPopupButton buttonText="Book a Strategy Call" width="w-52" height="h-11" textSize="text-sm" textWeight="quicksand-semibold" />
                                        <p className="text-[0.75rem] px-[1rem] py-[0.75rem]">Free Reddit audit included</p>
                                    </div>
                                </div>
          
        </div>
    );
}
