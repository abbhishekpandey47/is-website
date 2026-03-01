import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const router = useRouter();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      router.push(`?page=${page}`);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage <= 4) {
      start = 2;
      end = Math.min(6, totalPages - 1);
    }

    if (currentPage >= totalPages - 3) {
      start = Math.max(2, totalPages - 5);
      end = totalPages - 1;
    }

    if (start > 2) {
      pages.push('ellipsis-start');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-1.5 py-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[13px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#ededed] hover:border-[rgba(255,255,255,0.12)] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.02)] disabled:hover:border-[rgba(255,255,255,0.06)]"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        Prev
      </button>

      <div className="flex gap-1">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 py-1.5 text-[13px] text-[rgba(255,255,255,0.25)]">
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`min-w-[32px] px-2 py-1.5 rounded-md text-[13px] transition-all duration-150 ${
                page === currentPage
                  ? "bg-[rgba(255,255,255,0.08)] text-[#ededed] border border-[rgba(255,255,255,0.12)]"
                  : "text-[rgba(255,255,255,0.4)] border border-transparent hover:bg-[rgba(255,255,255,0.03)] hover:text-[rgba(255,255,255,0.6)]"
              }`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-[13px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.6)] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#ededed] hover:border-[rgba(255,255,255,0.12)] transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[rgba(255,255,255,0.02)] disabled:hover:border-[rgba(255,255,255,0.06)]"
      >
        Next
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default Pagination;
