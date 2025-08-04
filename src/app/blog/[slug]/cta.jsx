import { ArrowRightIcon } from "lucide-react";

export default function CTA() {
    return (
        <div className="max-w-7xl mx-auto px-6 mt-20">
            <div className="relative overflow-hidden rounded-2xl border border-white/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[#2a2d5a]/30 border rounded-2xl border-purple-500/30"></div>

                <div className="relative px-8 py-12 md:px-12 md:py-10 text-center md:text-left">
                    <div className="max-w-3xl mx-auto">

                        <h2 className="font-[quicksand] text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            Tired of wasting engineering time on content?
                        </h2>

                        {/* Description */}
                        <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                            Let Infrasity handle your technical content, explainer videos, and developer GTM,
                            while your team focuses on shipping.
                        </p>

                        <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                            Schedule a 15-min call
                            <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>

                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}