"use client";
import { useState } from "react";

export default function SearchPanel({ onSearch, loading, buttonLabel = "Analyze", timeRange, setTimeRange, customFrom, setCustomFrom, customTo, setCustomTo }) {
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
          <div className="grid grid-cols-2 gap-3 md:w-[430px]">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">Time Range</label>
              <select
                value={timeRange}
                onChange={e=> setTimeRange(e.target.value)}
                className="w-full rounded-lg border border-gray-400 bg-white px-3 py-2 text-sm text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                style={{color:'#111'}}
              >
                <option value="24h" className="text-black" style={{color:'#000'}}>Last 24 hours</option>
                <option value="7d" className="text-black" style={{color:'#000'}}>Last 7 days</option>
                <option value="30d" className="text-black" style={{color:'#000'}}>Last 30 days</option>
                <option value="90d" className="text-black" style={{color:'#000'}}>Last 90 days</option>
                <option value="1y" className="text-black" style={{color:'#000'}}>Last 1 year</option>
                <option value="all" className="text-black" style={{color:'#000'}}>All time</option>
                <option value="custom" className="text-black" style={{color:'#000'}}>Custom range</option>
              </select>
            </div>
            {timeRange === 'custom' && (
              <div className="col-span-2 flex gap-3">
                <div className="flex-1">
                  <label className="block text-[10px] font-medium text-gray-600 mb-1">From</label>
                  <input type="date" value={customFrom} onChange={e=> setCustomFrom(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900" />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-medium text-gray-600 mb-1">To</label>
                  <input type="date" value={customTo} onChange={e=> setCustomTo(e.target.value)} className="w-full rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-900" />
                </div>
              </div>
            )}
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
