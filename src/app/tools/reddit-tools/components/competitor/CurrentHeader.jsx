"use client";

export default function CurrentHeader() {
  return (
    <header className="flex flex-col gap-1 p-6 pb-4">
  <h1 className="text-3xl font-bold mb-1"><span className="gradient-text">Current Brand Mentions</span> <span className="text-3xl">🔍</span></h1>
      <p className="text-md text-foreground-muted max-w-2xl">
        Search live Reddit posts & comments that mention your brand, product or domain. Results include raw posts and direct comment mentions.
      </p>
    </header>
  );
}
