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
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg border ${page === currentPage ? "bg-blue-500 text-white" : "bg-white text-black"}`}
          >
            {page}
          </button>
        ))}
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
