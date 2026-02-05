import { Check, X } from 'lucide-react';
import Image from 'next/image';

export default function RedditMarketingSlide() {
  return (
    <section className="relative overflow-hidden px-6 py-16 text-white md:px-12 lg:py-20">
      <div className="absolute inset-0 opacity-50" aria-hidden>
        <div className="absolute inset-0" />
        <div className="absolute -left-24 top-20 h-[320px] w-[320px] rounded-full bg-gradient-to-br from-[#7629ff]/30 via-transparent to-transparent blur-[60px]" />
        <div className="absolute right-16 top-16 h-[260px] w-[260px] rounded-full bg-gradient-to-br from-[#f97316]/30 via-transparent to-transparent blur-[80px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-12 text-center">
            <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="quicksand-bold text-[30px] max-sm:text-[1.5em] md:leading-[80px] text-white text-center flex justify-center mb-2">
                    <h2 className=" md:leading-[50px] text-center max-lg:text-center max-lg:mx-auto">
                      What We Learned Running Reddit for the Fastest-Growing{' '}<span className='bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600'>B2B Startups</span>
                    </h2>
                </div>
                <div className="flex justify-center my-6 mb-8">
                    <div className="w-[148px] h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-600 rounded-full"></div>
                </div>
            </div>

        <div className="flex justify-center gap-8 md:gap-12 lg:gap-16">
          <div className="">
            <Image
              src="/reddit/fails.svg"
              alt="What fails: common Reddit marketing pitfalls"
              width={550}
              height={320}
            //   fill
              priority
            //   sizes="(max-width: 1024px) 100vw, 540px"
            //   className="object-cover"
            />
          </div>

          <div className="">
            <Image
              src="/reddit/howwefix.svg"
              alt="How we fix Reddit marketing"
              width={550}
              height={320}
            //   fill
              priority
            //   sizes="(max-width: 1024px) 100vw, 540px"
            //   className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}