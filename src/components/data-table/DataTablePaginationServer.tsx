"use client";

type Props = {
  currentPage: number;
  totalPage: number;
  setCurrentPage: (page: number) => void;
};

export default function DataTablePaginationServer({
  currentPage,
  totalPage,
  setCurrentPage,
}: Props) {
  if (totalPage <= 1) return null;

  const goPrev = () => setCurrentPage(Math.max(currentPage - 1, 1));
  const goNext = () => setCurrentPage(Math.min(currentPage + 1, totalPage));

  return (
    <div className="flex items-center justify-between p-3 border-t border-gray-700">
      <p className="text-sm text-gray-300">
        Page {currentPage} of {totalPage}
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-600 disabled:opacity-50"
        >
          Prev
        </button>

        <button
          onClick={goNext}
          disabled={currentPage === totalPage}
          className="px-3 py-1 rounded border border-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
