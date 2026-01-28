"use client";
import Image from "next/image";
import Link from "next/link";
import CalendarBooking from "../../calendarButton";

const items = [
  "Subreddit + keyword list for your product",
  "10 thread ideas + comment angles",
  "Do’s & Don’ts to avoid bans / low trust",
  "Paid + organic Reddit plan (based on your stage)",
  "30-day execution roadmap",
];

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="h-5 w-5 text-[#7ef29d]"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z"
      clipRule="evenodd"
    />
  </svg>
);

export default function AuditWhatYouGet() {
  return (
    <section className="relative px-6 md:px-10 pt-12 pb-8">
         <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                      What you’ll get in the{" "}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>free Reddit audit</span>
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                         A focused, non-generic teardown of your category on Reddit so you know exactly where to engage, what to say, and how to stay unflagged while earning trust fast.
                    </p>
                </div>
            </div>
      <div className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl border border-[#2d3355] bg-[#0c1025]/90 backdrop-blur">

        <div className="flex justify-around ">
          
          <div className="mt-6 flex flex-col justify-center gap-4 mb-8 w-full max-w-lg px-6">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex align-center items-start gap-3 rounded-xl border border-white/5 bg-white/5 px-3 py-3 text-left h-12"
                >
                  <CheckIcon />
                  <span className="text-sm text-gray-100 md:text-base">{item}</span>
                </div>
              ))}
    <div className="flex justify-center mt-4">
    <CalendarBooking
                href={"/contact?app=ads"} 
                buttonText="Get Free Reddit Audit"
                width="w-1/2"
                height="h-11"
                textSize="text-sm"
                textWeight="quicksand-semibold"
              />
    </div>
          </div>
            
              <Image
                src="/reddit/freeAudit.png"
                alt="Free Reddit audit badge"
                width={480}
                height={400}
                className="object-contain mix-blend-exclusion"
              />
        </div>
      </div>
    </section>
  );
}
