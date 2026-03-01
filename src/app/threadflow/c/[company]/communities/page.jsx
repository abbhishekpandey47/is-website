"use client";
import ComingSoon from '@/Components/ComingSoon';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ComingSoon
        title="Communities"
        description="Track and manage subreddit communities your brand engages with. Community insights are coming soon."
        backHref="/threadflow"
      />
    </div>
  );
}
