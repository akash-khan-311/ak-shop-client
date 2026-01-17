// DataTableFilters.tsx

interface Product {
  category: string;
  [key: string]: any;
}

interface DataTableFiltersProps {
  isProducts: boolean;
  isCategory: boolean;
  isOrders?: boolean;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  setCurrentPage: (value: number) => void;
  products: Product[];
}

export default function DataTableFilters({
  isProducts,
  isCategory,
  isOrders,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  setCurrentPage,
  products,
}: DataTableFiltersProps) {
  const categories = [
    "All Categories",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  return (
    <div className="dark:bg-dark rounded-lg p-4 mb-4 flex flex-col md:flex-row gap-3 items-center">
      <input
        type="text"
        placeholder={
          isProducts
            ? "Search Products"
            : isCategory
              ? "Search By Category Name"
              : isOrders && "Search By Order ID"
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-4 dark:bg-gray-7 bg-gray-3 w-full rounded flex-2 min-w-[500px]   focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      {isProducts && (
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-4 dark:bg-gray-7 bg-gray-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}
      {isProducts && (
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="dark:bg-gray-7 w-full bg-gray-3 p-4 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option>No Sort</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Name: A-Z</option>
          <option>Stock: Low to High</option>
        </select>
      )}
      <div className="flex justify-between items-center w-full gap-x-5">
        <button
          onClick={() => {
            setSearchTerm("");
            setCategoryFilter("All Categories");
            setSortBy("No Sort");
          }}
          className="py-4 w-full px-8 text-white bg-green hover:bg-green-dark duration-200 rounded"
        >
          Filter
        </button>
        <button
          onClick={() => {
            setSearchTerm("");
            setCategoryFilter("All Categories");
            setSortBy("No Sort");
            setCurrentPage(1);
          }}
          className="py-4 w-full px-8 dark:bg-gray-7 bg-gray-3 hover:bg-gray-4 dark:hover:bg-gray-7 duration-200 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
