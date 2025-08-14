import React from "react";

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex items-center justify-between w-full max-w-80 text-gray-700 font-medium bg-white/70 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl px-4 py-2">
      {/* Previous Button */}
      <button
        type="button"
        aria-label="Previous"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className={`p-1 rounded-xl transition-colors ${
          page === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
        }`}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
            fill="#475569"
            stroke="#475569"
            strokeWidth=".078"
          />
        </svg>
      </button>

      {/* Page Info */}
      <span className="text-sm font-medium">
        Page <span className="text-blue-600">{page}</span> of{" "}
        <span className="text-purple-600">{totalPages}</span>
      </span>

      {/* Next Button */}
      <button
        type="button"
        aria-label="Next"
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className={`p-1 rounded-xl transition-colors ${
          page === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
        }`}
      >
        <svg
          className="rotate-180"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.499 12.85a.9.9 0 0 1 .57.205l.067.06a.9.9 0 0 1 .06 1.206l-.06.066-5.585 5.586-.028.027.028.027 5.585 5.587a.9.9 0 0 1 .06 1.207l-.06.066a.9.9 0 0 1-1.207.06l-.066-.06-6.25-6.25a1 1 0 0 1-.158-.212l-.038-.08a.9.9 0 0 1-.03-.606l.03-.083a1 1 0 0 1 .137-.226l.06-.066 6.25-6.25a.9.9 0 0 1 .635-.263Z"
            fill="#475569"
            stroke="#475569"
            strokeWidth=".078"
          />
        </svg>
      </button>
    </div>
  );
}
