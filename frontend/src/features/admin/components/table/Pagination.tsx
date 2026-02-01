interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxVisiblePages?: number; // optional
}

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  maxVisiblePages = 5,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const half = Math.floor(maxVisiblePages / 2);

  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisiblePages - 1);

  if (end - start < maxVisiblePages - 1) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  const pages = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  const baseBtn =
    "px-3 py-1 rounded-full text-sm font-medium transition";
  const activeBtn = "bg-[#3b3c79] text-white";
  const inactiveBtn = "bg-[#232447] text-gray-400 hover:text-white";

  return (
    <div className="flex items-center gap-2 flex-wrap justify-center">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`${baseBtn} ${
          currentPage === 1 ? inactiveBtn : activeBtn
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`${baseBtn} ${
            currentPage === page ? activeBtn : inactiveBtn
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`${baseBtn} ${
          currentPage === totalPages ? inactiveBtn : activeBtn
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
