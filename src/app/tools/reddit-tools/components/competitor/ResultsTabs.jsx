"use client";

export default function ResultsTabs({ active, setActive, counts, visible }) {
  if (!visible) return null;
  const tabs = [
    { id: "posts", label: "Posts", count: counts.posts },
    { id: "comments", label: "Comments", count: counts.comments },
  ];
  return (
    <div className="px-6 mt-8 border-b border-gray-200 flex gap-6">
      {tabs.map((t) => (
        <button
          key={t.id}
            onClick={() => setActive(t.id)}
          className={`relative pb-3 text-sm font-medium transition-colors ${
            active === t.id
              ? "text-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t.label}
          <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600">
            {t.count}
          </span>
          {active === t.id && (
            <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
