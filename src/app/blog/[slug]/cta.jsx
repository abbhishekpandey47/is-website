import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function CTA() {
    return (
        <div className="max-w-7xl mx-auto px-6">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[#2a2d5a]/30 border rounded-2xl border-purple-500/30"></div>

                <div className="px-8 pb-12 md:px-12 md:pb-10 text-center md:text-left">
                    <div className="max-w-3xl mx-auto">

                        <h2 className="font-[quicksand] text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Tired of wasting engineering time on content?
                        </h2>

                        {/* Description */}
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                            Let Infrasity handle your technical content, explainer videos, and developer GTM,
                            while your team focuses on shipping.
                        </p>

                        <Link
                            href="/contact"
                            className="no-underline  inline-flex items-center gap-3 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                            Schedule a 15-min call
                            <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    )
}