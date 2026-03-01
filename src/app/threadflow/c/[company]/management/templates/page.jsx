"use client";
import ComingSoon from '@/Components/ComingSoon';

export default function Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ComingSoon
        title="Template Management"
        description="Reusable, high-performing Reddit content templates with AI-assisted customization are being built."
        backHref="/threadflow"
      />
    </div>
  );
}
