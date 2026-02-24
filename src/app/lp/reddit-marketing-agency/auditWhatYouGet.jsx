import Image from "next/image";
import Link from "next/link";
import ContactPopupButton from "./ContactPopupButton";

const items = [
  "Subreddit + keyword list for your product",
  "10 thread ideas + comment angles",
  "Do’s & Don’ts to avoid bans / low trust",
  "Paid + organic Reddit plan (based on your stage)",
  "30-day execution roadmap",
];

const CheckIcon = ({ className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`h-5 w-5 ${className}`}
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
    <section className="relative px-6 md:px-10 pt-24 pb-8">
         <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                      Your Reddit Opportunity Mapped in{' '}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>One Audit</span>
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>

                {/* Description */}
                <div className="max-w-[70%] mx-auto mb-8">
                    <p className="text-[17px] md:text-[17px] text-gray-300 leading-relaxed font-light">
                      We analyze and indicate the exact category, competitors, and buyer conversations to show where your product should appear, what to engage with, and how to build visibility without getting banned or flagged.
                    </p>
                </div>
            </div>

        <div className="flex flex-wrap-reverse md:flex-nowrap justify-center gap-20">
          
          <div className="mt-6 flex flex-col justify-center gap-4 mb-8 w-full max-w-lg px-6">
              {items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left shadow-[inset_0_0_50px_rgba(146,164,255,0.05)] "
                >
                  <span className="flex h-6 w-6= items-center justify-center rounded-md border border-emerald-500 bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-gray-100 md:text-base leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
    <div className="flex justify-center mt-4">
    <ContactPopupButton
                buttonText="Claim your free Reddit Audit"
                width="w-1/2"
                height="h-11"
                textSize="text-sm"
                textWeight="quicksand-semibold"
                thankYouPath="/lp/reddit-marketing-agency/thankyou"
              />
    </div>
          </div>
            
              <Image
                src="/reddit/freeAudit.svg"
                alt="Free Reddit audit badge"
                width={560}
                height={420}
                className="object-contain mix-blend-exclusion h-120 w-140"
              />
        </div>
    </section>
  );
}
