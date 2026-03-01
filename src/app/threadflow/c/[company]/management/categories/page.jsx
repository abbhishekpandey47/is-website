"use client";
import ComingSoon from '@/Components/ComingSoon';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ComingSoon
        title="Category Management"
        description="Organize and manage your Reddit content categories. Advanced category management is coming soon."
        backHref="/threadflow"
      />
    </div>
  );
}
