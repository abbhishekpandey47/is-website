"use client";
import { Sparkles } from "lucide-react";

const beforeItems = [
  { icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="-1 -1 20 20"
  fill="none"
  stroke="rgb(225, 73, 19)"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-5 h-5"
>
  <path d="M 11.7 6.3 L 6.3 11.7 M 6.3 6.3 L 11.7 11.7 M 18 9 C 18 13.971 13.971 18 9 18 C 4.029 18 0 13.971 0 9 C 0 4.029 4.029 0 9 0 C 13.971 0 18 4.029 18 9 Z" />
</svg>, text: "CI fails after merge" },
  { icon: <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    fill="none"
    stroke="rgb(225, 73, 19)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M 6.818 6.75 C 7.182 5.715 8.239 5.094 9.32 5.279 C 10.402 5.465 11.192 6.403 11.19 7.5 C 11.19 9 8.94 9.75 8.94 9.75 M 9 12.75 L 9.008 12.75 M 16.5 9 C 16.5 13.142 13.142 16.5 9 16.5 C 4.858 16.5 1.5 13.142 1.5 9 C 1.5 4.858 4.858 1.5 9 1.5 C 13.142 1.5 16.5 4.858 16.5 9 Z" />
  </svg>, text: "PRs merged with outdated base" },
  { icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 18 18"
  fill="none"
  stroke="rgb(225, 73, 19)"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-5 h-5"
>
  <path d="M 9 4.5 L 9 9 L 12 10.5 M 16.5 9 C 16.5 13.142 13.142 16.5 9 16.5 C 4.858 16.5 1.5 13.142 1.5 9 C 1.5 4.858 4.858 1.5 9 1.5 C 13.142 1.5 16.5 4.858 16.5 9 Z" />
</svg>
, text: "CI time wasted on reruns" },
  { icon: <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    fill="none"
    stroke="rgb(225, 73, 19)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M 6.818 6.75 C 7.182 5.715 8.239 5.094 9.32 5.279 C 10.402 5.465 11.192 6.403 11.19 7.5 C 11.19 9 8.94 9.75 8.94 9.75 M 9 12.75 L 9.008 12.75 M 16.5 9 C 16.5 13.142 13.142 16.5 9 16.5 C 4.858 16.5 1.5 13.142 1.5 9 C 1.5 4.858 4.858 1.5 9 1.5 C 13.142 1.5 16.5 4.858 16.5 9 Z" />
  </svg>, text: "CI jobs randomly flake" },
  { icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 18 18"
  fill="none"
  stroke="rgb(225, 73, 19)"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-5 h-5"
>
  <path d="M 10.5 8.25 L 6 8.25 M 7.5 11.25 L 6 11.25 M 12 5.25 L 6 5.25 M 15 7.875 L 15 5.1 C 15 3.84 15 3.21 14.755 2.728 C 14.539 2.305 14.195 1.961 13.771 1.745 C 13.29 1.5 12.66 1.5 11.4 1.5 L 6.6 1.5 C 5.34 1.5 4.71 1.5 4.229 1.745 C 3.805 1.961 3.461 2.305 3.245 2.728 C 3 3.21 3 3.84 3 5.1 L 3 12.9 C 3 14.16 3 14.79 3.245 15.271 C 3.461 15.695 3.805 16.039 4.229 16.255 C 4.71 16.5 5.34 16.5 6.6 16.5 L 8.625 16.5 M 16.5 16.5 L 15.375 15.375 M 16.125 13.5 C 16.125 14.95 14.95 16.125 13.5 16.125 C 12.05 16.125 10.875 14.95 10.875 13.5 C 10.875 12.05 12.05 10.875 13.5 10.875 C 14.95 10.875 16.125 12.05 16.125 13.5 Z" />
</svg>, text: "CI fails with no clear root cause" },
];

const afterItems = [
  { icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 18 18"
  fill="none"
  stroke="rgb(40, 184, 84)"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-5 h-5"
>
  <path d="M 9 11.25 L 6.75 9 M 9 11.25 C 10.048 10.852 11.053 10.349 12 9.75 M 9 11.25 L 9 15 C 9 15 11.272 14.588 12 13.5 C 12.81 12.285 12 9.75 12 9.75 M 6.75 9 C 7.149 7.965 7.652 6.972 8.25 6.038 C 10.027 3.196 13.149 1.479 16.5 1.5 C 16.5 3.54 15.915 7.125 12 9.75 M 6.75 9 L 3 9 C 3 9 3.412 6.727 4.5 6 C 5.715 5.19 8.25 6 8.25 6 M 3.375 12.375 C 2.25 13.32 1.875 16.125 1.875 16.125 C 1.875 16.125 4.68 15.75 5.625 14.625 C 6.158 13.995 6.15 13.028 5.558 12.443 C 4.954 11.866 4.013 11.837 3.375 12.375 Z" />
</svg>, text: "CI always passes after merge" },
  { icon:  <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 18 18"
  fill="none"
  stroke="rgb(40, 184, 84)"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-5 h-5"
><path d="M 7.5 13.244 L 7.5 15 C 7.5 15.828 8.172 16.5 9 16.5 C 9.828 16.5 10.5 15.828 10.5 15 L 10.5 13.244 M 9 1.5 L 9 2.25 M 2.25 9 L 1.5 9 M 4.125 4.125 L 3.675 3.675 M 13.875 4.125 L 14.325 3.675 M 16.5 9 L 15.75 9 M 13.5 9 C 13.5 11.485 11.485 13.5 9 13.5 C 6.515 13.5 4.5 11.485 4.5 9 C 4.5 6.515 6.515 4.5 9 4.5 C 11.485 4.5 13.5 6.515 13.5 9 Z" fill="transparent" stroke-width="1.5" stroke="var(--token-6da957cc-090e-4d1c-9dc0-fb2970f18968, rgb(40, 184, 84))" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=""/></svg>, text: "Drift from main automatically detected" },
  { icon: <Sparkles className="w-5 h-5 stroke-green-400" />, text: "Retries are automatic, tracked, and reduced" },
  { icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 18 18"
  fill="none"
  stroke="rgb(40, 184, 84)"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-5 h-5"
><path d="M 7.5 13.244 L 7.5 15 C 7.5 15.828 8.172 16.5 9 16.5 C 9.828 16.5 10.5 15.828 10.5 15 L 10.5 13.244 M 9 1.5 L 9 2.25 M 2.25 9 L 1.5 9 M 4.125 4.125 L 3.675 3.675 M 13.875 4.125 L 14.325 3.675 M 16.5 9 L 15.75 9 M 13.5 9 C 13.5 11.485 11.485 13.5 9 13.5 C 6.515 13.5 4.5 11.485 4.5 9 C 4.5 6.515 6.515 4.5 9 4.5 C 11.485 4.5 13.5 6.515 13.5 9 Z" fill="transparent" stroke-width="1.5" stroke="var(--token-6da957cc-090e-4d1c-9dc0-fb2970f18968, rgb(40, 184, 84))" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=""/></svg>, text: "Flaky jobs detected, flagged, and monitored" },
  { icon: <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 18 18"
  fill="none"
  stroke="rgb(40, 184, 84)"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  className="w-5 h-5"
><path d="M 7.5 13.244 L 7.5 15 C 7.5 15.828 8.172 16.5 9 16.5 C 9.828 16.5 10.5 15.828 10.5 15 L 10.5 13.244 M 9 1.5 L 9 2.25 M 2.25 9 L 1.5 9 M 4.125 4.125 L 3.675 3.675 M 13.875 4.125 L 14.325 3.675 M 16.5 9 L 15.75 9 M 13.5 9 C 13.5 11.485 11.485 13.5 9 13.5 C 6.515 13.5 4.5 11.485 4.5 9 C 4.5 6.515 6.515 4.5 9 4.5 C 11.485 4.5 13.5 6.515 13.5 9 Z" fill="transparent" stroke-width="1.5" stroke="var(--token-6da957cc-090e-4d1c-9dc0-fb2970f18968, rgb(40, 184, 84))" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray=""/></svg>, text: "Job-level visibility helps pinpoint what broke" },
];

export default function FeatureComparison() {
  return (
    <section className="relative py-20 bg-zinc-950 text-zinc-100 font-[quicksand]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="text-white">Before</span> vs{" "}
            <span className="text-white">After Infrasity</span>
          </h2>
        </div>

        {/* Columns */}
        <div className="relative">
          {/* Middle divider line */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Before Infrasity */}
            <div>
              <h3 className="text-xl font-semibold specialtext mb-6 text-center">
                Before Infrasity
              </h3>
              <ul className="space-y-5">
                {beforeItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 w-full rounded-xl
                      bg-[radial-gradient(87%_241%_at_125%_203%,rgba(70,70,80,0.9),rgba(20,20,25,0.75))]
                      backdrop-blur-lg shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_8px_20px_rgba(0,0,0,0.55)]
                      p-3 transition-transform"
                  >
                 <div class="flex items-center justify-center w-8 h-8 rounded-md 
  bg-gradient-to-br from-zinc-700/70 to-zinc-900/90 
  shadow-inner ring-1 ring-white/10 border border-white/5">
  {item.icon}
</div>

                    <span className="text-sm font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Infrasity */}
            <div>
              <h3 className="text-xl font-semibold specialtext mb-6 text-center">
                After Infrasity
              </h3>
              <ul className="space-y-5">
                {afterItems.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 w-full rounded-xl
                      bg-[radial-gradient(87%_241%_at_125%_203%,rgba(70,70,80,0.9),rgba(20,20,25,0.75))]
                      backdrop-blur-lg shadow-[inset_0_1px_2px_rgba(255,255,255,0.12),0_8px_20px_rgba(0,0,0,0.55)]
                      p-3 transition-transform"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-md 
  bg-gradient-to-br from-zinc-700/70 via-zinc-800/80 to-emerald-900/80
  shadow-inner ring-1 ring-white/10 border border-white/5">
  {item.icon}
</div>

                    <span className="text-sm font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
