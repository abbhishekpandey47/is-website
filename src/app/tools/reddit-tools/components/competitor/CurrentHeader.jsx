"use client";

export default function CurrentHeader() {
  return (
    <header className="flex flex-col gap-1 p-6 pb-4">
      <h1 className="text-2xl font-semibold text-gray-900">
        Current Brand Mentions <span className="text-2xl">🔍</span>
      </h1>
      <p className="text-sm text-gray-600 max-w-2xl">
        Search live Reddit posts & comments that mention your brand, product or domain. Results include raw posts and direct comment mentions.
      </p>
    </header>
  );
}
