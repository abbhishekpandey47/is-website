"use client";
import { Timer, Layers, ArrowRight } from "lucide-react";
import { Database } from "lucide-react"; // fallback for scalable postgres icon

export default function WhyInfrasity() {
  return (
    <section
      id="why-supabase"
      className="container mx-auto px-6 py-6 md:py-10 lg:px-16 xl:px-20 flex flex-col gap-8"
    >
      {/* Header */}
      <div className="max-w-xl flex flex-col gap-2">
        <h2 className="text-3xl md:text-4xl font-semibold text-zinc-400">
        Why companies choose{" "}
          <span className="specialtext">Infrasity for developer marketting</span>
        </h2>
        <p className="text-zinc-400">
          Build secure, scalable applications using a developer platform built
          for dependability.
        </p>
      </div>

      {/* Features */}
      <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
        {/* Item 1 */}
        <li className="flex flex-col gap-2 text-sm text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-timer stroke-1 mb-2 text-current w-7 h-7"><line x1="10" x2="14" y1="2" y2="2"></line><line x1="12" x2="15" y1="14" y2="11"></line><circle cx="12" cy="14" r="8"></circle></svg>
          <div className="w-full h-px bg-zinc-700">
            <span className="block w-7 h-px bg-zinc-400" />
          </div>
          <h4 className="text-lg lg:text-xl mt-1 text-zinc-100">
          Build adoption, not just content
          </h4>
          <p className="text-zinc-400">
          We go beyond blogs and docs. Infrasity builds developer trust with stories, repos, and examples that engineers actually use.
          </p>
        </li>

        {/* Item 2 */}
        <li className="flex flex-col gap-2 text-sm text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" class="stroke-1 mb-2 text-current w-7 h-7"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
          <div className="w-full h-px bg-zinc-700">
            <span className="block w-7 h-px bg-zinc-400" />
          </div>
          <h4 className="text-lg lg:text-xl mt-1 text-zinc-100">
          Everything your GTM stack needs
          </h4>
          <p className="text-zinc-400">
          From SEO blogs to GitHub repos, release notes to Reddit credibility — we cover every surface where developers discover and adopt new tools.
          </p>
        </li>

        {/* Item 3 */}
        <li className="flex flex-col gap-2 text-sm text-zinc-400">
         <svg width="25" height="25" viewBox="0 0 25 25" fill="currentColor" class="w-7 h-7 mb-2" xmlns="http://www.w3.org/2000/svg"><path d="M13.2689 14.9229C14.04 16.494 15.6379 17.4892 17.3881 17.4893H22.0892C22.4726 17.4893 22.7843 17.8003 22.7845 18.1836C22.7845 18.5671 22.4728 18.8789 22.0892 18.8789H20.1664C20.1564 21.0605 18.171 22.4853 16.0052 22.4854C14.044 22.4854 12.4009 21.1292 11.9603 19.3037L11.9213 19.126L11.9086 18.9854C11.9116 18.6624 12.1408 18.3748 12.4701 18.3105C12.7994 18.2463 13.1203 18.4265 13.2445 18.7246L13.2845 18.8594L13.3412 19.0947C13.6746 20.251 14.742 21.0967 16.0052 21.0967C17.6551 21.0966 18.7655 20.0649 18.7758 18.8789H17.3881C15.108 18.8788 13.0263 17.5811 12.0218 15.5342L13.2689 14.9229ZM18.7767 15.6787V11.4639C18.7766 8.09738 16.0476 5.36816 12.681 5.36816H11.7269C11.7032 5.36816 11.6797 5.36364 11.6566 5.36133H7.15564C6.5783 5.36133 6.05835 5.69927 5.82068 6.21777L5.77673 6.32422L4.26404 10.4443C4.03486 11.0686 4.21563 11.7696 4.71814 12.2051L5.75622 13.1045L5.93298 13.2754C6.32193 13.694 6.54138 14.2468 6.54138 14.8242V16.4775L6.5531 16.7227C6.67574 17.9298 7.69544 18.8721 8.93493 18.8721C9.2213 18.8721 9.45986 18.6685 9.51501 18.3984L9.52771 18.2793V10.9121C9.52772 9.33737 10.1566 7.82755 11.2748 6.71875L11.3842 6.63086C11.6543 6.45411 12.0199 6.48475 12.2562 6.72266C12.5263 6.995 12.5247 7.43503 12.2523 7.70508L12.097 7.86816C11.3396 8.69814 10.9164 9.78304 10.9164 10.9121V18.2793L10.9056 18.4814C10.8044 19.4807 9.96094 20.2607 8.93493 20.2607C6.91113 20.2607 5.25814 18.6714 5.15661 16.6729L5.15173 16.4775V14.8242C5.15173 14.5993 5.06693 14.3838 4.9154 14.2207L4.84607 14.1543L3.80798 13.2549C2.86934 12.4414 2.53223 11.1318 2.96033 9.96582L4.47302 5.84473L4.55798 5.63867C5.02039 4.62971 6.03224 3.97266 7.15564 3.97266H11.8246V3.97949H12.681C16.8146 3.97949 20.1662 7.33032 20.1664 11.4639V15.6787C20.1664 16.0622 19.8546 16.373 19.4711 16.373C19.0877 16.3728 18.7767 16.0621 18.7767 15.6787ZM12.3392 14.6055C12.6835 14.4365 13.1 14.5785 13.2689 14.9229L12.0218 15.5342C11.8532 15.1901 11.9953 14.7745 12.3392 14.6055Z M14.4779 10.7135C14.4779 11.1278 14.8137 11.4635 15.2279 11.4635C15.6421 11.4635 15.9779 11.1278 15.9779 10.7135C15.9779 10.2993 15.6421 9.96354 15.2279 9.96354C14.8137 9.96354 14.4779 10.2993 14.4779 10.7135Z" fill-rule="evenodd" clip-rule="evenodd" stroke="none" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="1"></path></svg>
          <div className="w-full h-px bg-zinc-700">
            <span className="block w-7 h-px bg-zinc-400" />
          </div>
          <h4 className="text-lg lg:text-xl mt-1 text-zinc-100">
          Credibility, community-first
          </h4>
          <p className="text-zinc-400">
          Our work shows up in the channels that matter: subreddits, GitHub discussions, Dev.to hubs. That’s where early adoption signals are born.
          </p>
        </li>

        {/* Item 4 */}
        <li className="flex flex-col gap-2 text-sm text-zinc-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right stroke-1 mb-2 text-current w-7 h-7"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          <div className="w-full h-px bg-zinc-700">
            <span className="block w-7 h-px bg-zinc-400" />
          </div>
          <h4 className="text-lg lg:text-xl mt-1 text-zinc-100">
          Save founders from distraction
          </h4>
          <p className="text-zinc-400">Your team ships features. We handle developer marketing — so you don’t burn cycles writing blogs, chasing keywords, or seeding Reddit threads.</p>
        </li>
      </ul>
    </section>
  );
}
