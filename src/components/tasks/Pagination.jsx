import React from "react";

export default function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
}) {
  const total = Math.max(
    0,
    Number(totalPages) || 0
  );

  if (total <= 1) return null;

  const current = Math.min(
    Math.max(Number(page) || 1, 1),
    total
  );

  const pages = [];
  const windowSize = 1;

  pages.push(1);

  if (current - windowSize > 2) {
    pages.push("left-ellipsis");
  }

  const start = Math.max(
    2,
    current - windowSize
  );

  const end = Math.min(
    total - 1,
    current + windowSize
  );

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (
    current + windowSize <
    total - 1
  ) {
    pages.push("right-ellipsis");
  }

  pages.push(total);

  const handleClick = (pageNumber) => {
    if (
      !pageNumber ||
      pageNumber === current ||
      pageNumber === "left-ellipsis" ||
      pageNumber === "right-ellipsis"
    ) {
      return;
    }

    if (
      typeof onPageChange === "function"
    ) {
      onPageChange(Number(pageNumber));
    }
  };

  return (
    <nav
      aria-label="Task pagination"
      className="mt-5 flex flex-wrap items-center justify-center gap-2 select-none"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={current === 1}
        onClick={() =>
          handleClick(current - 1)
        }
        className="
          rounded-full
          border border-[#254593]
          px-3 py-1
          text-[#254593]
          transition
          hover:bg-[#254593]
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        &lt;
      </button>

      {pages.map(
        (pageNumber, index) =>
          pageNumber ===
            "left-ellipsis" ||
          pageNumber ===
            "right-ellipsis" ? (
            <span
              key={`${pageNumber}-${index}`}
              aria-hidden="true"
              className="px-2 text-gray-500"
            >
              …
            </span>
          ) : (
            <button
              key={`page-${pageNumber}`}
              type="button"
              onClick={() =>
                handleClick(pageNumber)
              }
              aria-label={`Go to page ${pageNumber}`}
              aria-current={
                pageNumber === current
                  ? "page"
                  : undefined
              }
              className={`
                h-9 w-9 rounded-full
                border
                font-medium
                transition
                ${
                  pageNumber === current
                    ? "border-[#254593] bg-[#254593] text-white"
                    : "border-[#254593] text-[#254593] hover:bg-[#254593] hover:text-white"
                }
              `}
            >
              {pageNumber}
            </button>
          )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={current === total}
        onClick={() =>
          handleClick(current + 1)
        }
        className="
          rounded-full
          border border-[#254593]
          px-3 py-1
          text-[#254593]
          transition
          hover:bg-[#254593]
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        &gt;
      </button>
    </nav>
  );
}