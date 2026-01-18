import { ChevronLeft, ChevronRight } from "lucide-react";

// DataTablePagination.tsx
export default function DataTablePagination({
  filteredItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: any) {
  const totalPages = Math.ceil(filteredItems?.length / itemsPerPage);
  return (
    <div className="p-4 dark:bg-dark flex items-center justify-between border-t border-gray-700">
      <div className="text-sm text-gray-400">
        SHOWING {(currentPage - 1) * itemsPerPage + 1} TO{" "}
        {Math.min(currentPage * itemsPerPage, filteredItems?.length)} OF{" "}
        {filteredItems?.length}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="p-2 dark:text-white text-dark-2 hover:text-white hover:bg-gray-6 dark:hover:bg-dark-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
        </button>
        {filteredItems &&
          [...Array(totalPages)]?.map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded text-[#000]  dark:text-white ${
                currentPage === i + 1
                  ? "dark:bg-dark-2 bg-gray-6 hover:text-white text-[#fff]"
                  : "dark:hover:bg-dark-2 hover:bg-gray-6 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className="p-2 dark:text-white text-dark-2 hover:text-white hover:bg-gray-6 dark:hover:bg-dark-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
