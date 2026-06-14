import React from "react";

export default function Pagination({
  page = 1,
  totalPages = 1,
  onPageChange,
}) {

  const current = Number(page) || 1;

  const total = Math.max(
    0,
    Number(totalPages) || 0
  );

  if (total <= 1) return null;

  const pages = [];

  const windowSize = 1;

  /* ALWAYS FIRST PAGE */

  pages.push(1);

  /* LEFT ELLIPSIS */

  if (current - windowSize > 2) {
    pages.push("left-ellipsis");
  }

  /* MIDDLE PAGES */

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

  /* RIGHT ELLIPSIS */

  if (current + windowSize < total - 1) {
    pages.push("right-ellipsis");
  }

  /* LAST PAGE */

  if (total > 1) {
    pages.push(total);
  }

  const handleClick = (p) => {

    if (
      !p ||
      p === current ||
      p === "left-ellipsis" ||
      p === "right-ellipsis"
    ) {
      return;
    }

    if (
      typeof onPageChange ===
      "function"
    ) {
      onPageChange(Number(p));
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-5 select-none flex-wrap">

      {/* PREVIOUS */}

      <button
        aria-label="Previous page"
        disabled={current === 1}
        onClick={() =>
          handleClick(current - 1)
        }
        className="
          px-3 py-1 rounded-full
          border border-[#254593]
          text-[#254593]
          hover:bg-[#254593]
          hover:text-white
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
        "
      >
        &lt;
      </button>

      {/* PAGE BUTTONS */}

      {pages.map((p, idx) =>

        p === "left-ellipsis" ||
          p === "right-ellipsis" ? (

          <span
            key={p + idx}
            className="px-2 text-gray-500"
          >
            …
          </span>

        ) : (

          <button
            key={`page-${p}`}
            onClick={() =>
              handleClick(p)
            }
            aria-label={`Go to page ${p}`}
            aria-current={
              p === current
                ? "page"
                : undefined
            }
            className={`
              w-9 h-9 rounded-full
              border
              transition
              font-medium
              
              ${p === current
                ? "bg-[#254593] text-white border-[#254593]"
                : "text-[#254593] border-[#254593] hover:bg-[#254593] hover:text-white"
              }
            `}
          >
            {p}
          </button>

        )
      )}

      {/* NEXT */}

      <button
        aria-label="Next page"
        disabled={current === total}
        onClick={() =>
          handleClick(current + 1)
        }
        className="
          px-3 py-1 rounded-full
          border border-[#254593]
          text-[#254593]
          hover:bg-[#254593]
          hover:text-white
          disabled:opacity-50
          disabled:cursor-not-allowed
          transition
        "
      >
        &gt;
      </button>

    </div>
  );
}