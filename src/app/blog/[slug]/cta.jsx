import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <div className="w-full">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[#2a2d5a]/30 border rounded-2xl border-purple-500/30"></div>

                <div className="px-8 pb-12 md:px-12 md:pb-10 text-center md:text-left -mt-6">
                    <div className="">

                        <h2 className="font-[quicksand] text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                            Tired of wasting engineering time on content?
                        </h2>

                        {/* Description */}
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                            Let Infrasity handle your technical content, explainer videos, and developer GTM,
                            while your team focuses on shipping.
                        </p>

                        <Link
                            href="/contact"
                            className="group no-underline inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-purple-700 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                        >
                            <span className="text-[14px]">Schedule a 15-min call</span>
                            <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>

                    </div>
                </div>


            </div>
        </div>
    )
}