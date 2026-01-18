import { Download, Link, Plus, Trash2 } from "lucide-react";

// DataTableActions.tsx

export default function DataTableActions({
  exportCSV,
  exportJSON,
  bulkDelete,
  selectedProducts,
}: any) {
  return (
    <div className="bg-white dark:bg-dark border  rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-center justify-between">
      <div className="flex gap-2">
        <button
          onClick={exportCSV}
          className="px-4 py-2 dark:bg-gray-7 bg-gray-3 hover:bg-gray-4 dark:hover:bg-gray-6 rounded flex items-center gap-2 transition-all duration-300"
        >
          <Download size={16} />
          Export CSV
        </button>
        <button
          onClick={exportJSON}
          className="px-4 py-2 dark:bg-gray-7 bg-gray-3 hover:bg-gray-4 dark:hover:bg-gray-6 rounded flex items-center gap-2 transition-all duration-300"
        >
          <Download size={16} />
          Export JSON
        </button>
        <button
          onClick={bulkDelete}
          disabled={selectedProducts.length === 0}
          className="px-4 py-2 dark:bg-gray-7 bg-gray-3 hover:bg-gray-4 dark:hover:bg-gray-6 rounded flex items-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={16} />
          Bulk Action
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={bulkDelete}
          disabled={selectedProducts.length === 0}
          className="px-4 py-2 dark:bg-gray-7 bg-gray-3 hover:bg-gray-4 dark:hover:bg-gray-6 rounded flex items-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={16} />
          Bulk Action
        </button>
        <button
          disabled={selectedProducts.length === 0}
          className="px-4 text-white py-2 bg-red hover:bg-red rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
