import React from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const router = useRouter();
  console.log("Pagination props:", { currentPage, totalPages });
  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      router.push(`?page=${page}`); // Optional: Update the URL to reflect the current page
    }
  };

  // Build page numbers array with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 7; // Show max 7 page numbers including ellipsis

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    // Calculate start and end of middle section
    let start = Math.max(2, currentPage - 2);
    let end = Math.min(totalPages - 1, currentPage + 2);

    // Adjust if we're near the beginning
    if (currentPage <= 4) {
      start = 2;
      end = Math.min(6, totalPages - 1);
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - 3) {
      start = Math.max(2, totalPages - 5);
      end = totalPages - 1;
    }

    // Add ellipsis before middle section if needed
    if (start > 2) {
      pages.push('ellipsis-start');
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis after middle section if needed
    if (end < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-container flex justify-center items-center space-x-4 py-4">
      {/* Previous button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg border ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "bg-primary text-white"}`}
      >
        Previous
      </button>

      {/* Page numbers */}
      <div className="flex space-x-2">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg border ${page === currentPage ? "bg-blue-500 text-white" : "bg-white text-black"}`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg border ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "bg-primary text-white"}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
