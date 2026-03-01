"use client";
import ComingSoon from '@/Components/ComingSoon';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ComingSoon
        title="Schedule Management"
        description="Plan, queue, and optimize Reddit post timing. Intelligent scheduling engine coming soon."
        backHref="/threadflow"
      />
    </div>
  );
}
