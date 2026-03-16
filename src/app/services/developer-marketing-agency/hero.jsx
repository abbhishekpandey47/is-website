import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import CalendarBooking from "../../calendarButton";
import TrustedMarquee from "@/app/lp/reddit-marketing-agency/TrustedMarquee";

const HeroCTAPlaceholder = () => (
  <Link
    href="/contact"
    className="group relative inline-flex rounded-full p-px text-sm/6 text-zinc-400 duration-300 hover:text-zinc-100 hover:shadow-glow"
  >
    <div className="relative z-10 rounded-full bg-zinc-950 px-6 py-2 ring-1 ring-white/10">Book a demo</div>
  </Link>
);

const ContactPopupButton = dynamic(
  () => import("../../lp/reddit-marketing-agency/ContactPopupButton"),
  { ssr: false, loading: () => <HeroCTAPlaceholder /> }
);

const Particles = dynamic(
  () => import("../../../Components/ui/particles"),
  { ssr: false, loading: () => null }
);

export default function Hero({ isAdsVariant = false }) {
  return (
    <section className="relative isolate w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/developerMarketing/Hero.svg"
          alt="Hero background"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Gradient overlay effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#581c87]/30 via-transparent to-[#0d0a1a]" />

      <div className="relative pt-44 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Main Content */}
          <div className="relative mx-auto max-w-4xl text-center">
            {/* Headline */}
            <div className="space-y-6">
              <h1 className="font-[quicksand] bg-gradient-to-br from-white via-purple-200 to-purple-100 bg-clip-text text-5xl md:text-6xl font-bold tracking-tight text-transparent leading-tight">
                              The Developer Marketing Agency That Ships as Fast as You Do
              </h1>

              {/* Description */}
              <p className="font-[quicksand] text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We&apos;re the top rated developer marketing agency for dev-first SaaS companies. From technical content to community presence to AI search visibility we build the full growth engine so developers discover, evaluate, and adopt your product.
              </p>
            </div>

            {/* CTA Button */}
            <div className="mt-12 flex justify-center">
              {isAdsVariant ? (
                <ContactPopupButton
                  buttonText="Book a Call"
                  width="w-48"
                  height="h-12"
                  textSize="text-base"
                  textWeight="quicksand-semibold"
                />
              ) : (
                <CalendarBooking buttonText="Book a Call" />
              )}
            </div>
          </div>
                <div className="w-full flex flex-col items-center justify-center">
        <div className="w-[90%] justify-center items-center flex flex-col relative z-10">
          <TrustedMarquee />
        </div>
      </div>
        </div>
      </div>

      {/* Particles effect */}
      <Particles
        className="absolute inset-0 pointer-events-none"
        quantity={60}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    </section>
  );
}
