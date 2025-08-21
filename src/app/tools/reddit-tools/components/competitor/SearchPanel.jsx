"use client";
import { useState } from "react";

export default function SearchPanel({ onSearch, loading, buttonLabel = "Analyze" }) {
  const [value, setValue] = useState("");

  const trigger = () => {
    if (!value.trim()) return;
    onSearch(value.trim());
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      trigger();
    }
  };

  return (
    <div className="px-6">
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand / Company / Domain
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="e.g. qodo, linear, competitor.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400 caret-gray-900"
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:w-72">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Time Range (coming soon)
              </label>
              <select disabled className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
                <option>Last 30 days</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Sort (coming soon)
              </label>
              <select disabled className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
                <option>Most recent</option>
              </select>
            </div>
            <button
              type="button"
              onClick={trigger}
              disabled={!value.trim() || loading}
              className="col-span-2 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && (
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}
              <span>{loading ? `${buttonLabel}...` : buttonLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
