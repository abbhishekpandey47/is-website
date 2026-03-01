"use client";
import Link from 'next/link';
import { Clock } from 'lucide-react';

export default function ComingSoon({ title="Coming Soon", description="We're crafting something amazing here. Stay tuned!", backHref="/threadflow" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 font-geist animate-fade-up">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] mb-8">
        <Clock className="w-7 h-7 text-[rgba(255,255,255,0.25)]" />
      </div>

      <h1 className="text-[22px] font-semibold text-[#ededed] tracking-[-0.01em] mb-3">
        {title}
      </h1>

      <p className="text-[14px] text-[rgba(255,255,255,0.4)] max-w-md mb-8 leading-relaxed">
        {description}
      </p>

      <div className="flex gap-3">
        <Link
          href={backHref}
          className="bg-[#ededed] hover:bg-white text-[#0a0a0a] px-4 py-2 rounded-[7px] transition-colors text-[13px] font-medium"
        >
          Back to Dashboard
        </Link>
        <Link
          href="/"
          className="bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.12)] text-[rgba(255,255,255,0.6)] hover:text-[#ededed] px-4 py-2 rounded-[7px] transition-all text-[13px] font-medium"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
