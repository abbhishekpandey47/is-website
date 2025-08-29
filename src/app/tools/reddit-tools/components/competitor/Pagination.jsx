"use client";

import session from "../../../utils/session";

// Generic pagination control
// Props: page (1-based), totalItems, pageSize, onPageChange, loading (optional)
export default function Pagination({ page, totalItems, pageSize = 15, onPageChange, loading }) {
  session.set('pagination', page);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  if (totalPages <= 1) return null;

  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  // Build a compact pages array with ellipsis sentinels
  function buildPages() {
    const windowSize = 5; // number of middle pages to show (excluding first/last)
    if (totalPages <= windowSize + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const half = Math.floor(windowSize / 2);
    let start = page - half;
    let end = page + half;
    if (start < 2) { // shift right if near beginning
      end += (2 - start);
      start = 2;
    }
    if (end > totalPages - 1) { // shift left if near end
      const diff = end - (totalPages - 1);
      start = Math.max(2, start - diff);
      end = totalPages - 1;
    }
    const pages = [1];
    if (start > 2) pages.push('ellipsis-left');
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < totalPages - 1) pages.push('ellipsis-right');
    pages.push(totalPages);
    return pages;
  }

  const pages = buildPages();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-xs select-none" aria-label="Pagination">
      <button
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className="px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50"
      >Prev</button>
      {pages.map((p) => {
        if (p === 'ellipsis-left' || p === 'ellipsis-right') {
          return <span key={p} className="px-2 text-gray-400">…</span>;
        }
        return (
          <button
            key={p}
            onClick={() => go(p)}
            className={`px-2 py-1 rounded border text-gray-700 ${p === page ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
            aria-current={p === page ? 'page' : undefined}
          >{p}</button>
        );
      })}
      <button
        onClick={() => go(page + 1)}
        disabled={page >= totalPages}
        className="px-2 py-1 rounded border border-gray-300 bg-white text-gray-700 disabled:opacity-40 hover:bg-gray-50"
      >Next</button>
      <span className="ml-2 text-gray-500 hidden sm:inline">Page {page} of {totalPages}{loading ? ' • updating…' : ''}</span>
    </div>
  );
}
