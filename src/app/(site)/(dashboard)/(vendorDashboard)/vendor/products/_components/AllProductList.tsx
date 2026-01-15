"use client";
import React, { useState, useMemo } from "react";
import {
  Search,
  Download,
  Trash2,
  Plus,
  Eye,
  Edit2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  SquarePen,
} from "lucide-react";
import {
  Table as ReactTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
const initialProducts = [
  {
    id: 1,
    name: "Teat",
    category: "Home Decor",
    price: 20.0,
    salePrice: 28.0,
    stock: 297,
    published: true,
    image: "🏠",
  },
  {
    id: 2,
    name: "Clementine Sloan",
    category: "Outdoor Gear",
    price: 331.0,
    salePrice: 655.0,
    stock: 573,

    published: true,
    image: "⛺",
  },
  {
    id: 3,
    name: "Heidi Morten",
    category: "Computers & Laptops",
    price: 797.0,
    salePrice: 920.0,
    stock: 575,

    published: false,
    image: "💻",
  },
  {
    id: 4,
    name: "Iphone 15pro",
    category: "Computers & Laptops",
    price: 2000.0,
    salePrice: 3500.0,
    stock: 3000,

    published: true,
    image: "📱",
  },
  {
    id: 5,
    name: "MX Vertical Mouses",
    category: "Computers & Laptops",
    price: 70.0,
    salePrice: 109.99,
    stock: 150,

    published: false,
    image: "🖱️",
  },
  {
    id: 6,
    name: "ErgoPro Mechanical Keyboard",
    category: "Computers & Laptops",
    price: 65.0,
    salePrice: 98.0,
    stock: 0,

    published: true,
    image: "⌨️",
  },
  {
    id: 7,
    name: "Non-Stick Loaf Pan",
    category: "Smartphones & Wearables",
    price: 7.5,
    salePrice: 14.5,
    stock: 280,

    published: true,
    image: "🍞",
  },
  {
    id: 8,
    name: "Silicone Baking Mat Set",
    category: "Smartphones & Wearables",
    price: 10.0,
    salePrice: 19.99,
    stock: 350,

    published: true,
    image: "🧁",
  },
  {
    id: 9,
    name: "Project Hail Mary",
    category: "Smartphones & Wearables",
    price: 12.5,
    salePrice: 24.95,
    stock: 19,

    published: true,
    image: "📚",
  },
  {
    id: 10,
    name: "The Silent Patient",
    category: "Smartphones & Wearables",
    price: 8.0,
    salePrice: 14.98,
    stock: 400,

    published: true,
    image: "📖",
  },
];

const tableHeading = [
  "Product Name",
  "Category",
  "price",
  "salePrice",
  "stock",
  "status",
  "view",
  "published",
  "actions",
];

export default function AllProductsList() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sortBy, setSortBy] = useState("No Sort");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const categories = [
    "All Categories",
    ...Array.from(new Set(products.map((p) => p.category))),
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All Categories" ||
        product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    if (sortBy === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Name: A-Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "Stock: Low to High") {
      filtered.sort((a, b) => a.stock - b.stock);
    }

    return filtered;
  }, [products, searchTerm, categoryFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export CSV
  const exportCSV = () => {
    const csv = [
      tableHeading.join(","),
      ...products.map((p) =>
        [
          p.id,
          `"${p.name}"`,
          `"${p.category}"`,
          p.price,
          p.salePrice,
          p.stock,
          `"${p.stock > 0 ? "Selling" : "Out of Stock"}"`,
          p.published,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();
  };

  // Export JSON
  const exportJSON = () => {
    const json = JSON.stringify(products, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    a.click();
  };

  // Select/Deselect all
  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map((p) => p.id));
    }
  };

  // Toggle individual selection
  const toggleSelect = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Delete product
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setSelectedProducts((prev) => prev.filter((i) => i !== id));
  };

  // Bulk delete
  const bulkDelete = () => {
    if (
      selectedProducts.length > 0 &&
      confirm(`Delete ${selectedProducts.length} products?`)
    ) {
      setProducts((prev) =>
        prev.filter((p) => !selectedProducts.includes(p.id))
      );
      setSelectedProducts([]);
    }
  };

  // Toggle published status
  const togglePublished = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p))
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        {/* Action Bar */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={exportJSON}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2"
            >
              <Download size={16} />
              Export JSON
            </button>
            <button
              onClick={bulkDelete}
              disabled={selectedProducts.length === 0}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={16} />
              Bulk Action
            </button>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded flex items-center gap-2">
              <Trash2 size={16} />
              Delete
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded flex items-center gap-2">
              <Plus size={16} />
              Add Product
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-4 mb-4 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-gray-700 rounded flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>No Sort</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Name: A-Z</option>
            <option>Stock: Low to High</option>
          </select>
          <button
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("All Categories");
              setSortBy("No Sort");
            }}
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded"
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
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Reset
          </button>
        </div>

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <ReactTable>
              {/* Table Header */}
              <TableHeader>
                <TableRow>
                  {tableHeading.map((item) => (
                    <TableHead className="uppercase" key={item}>
                      {item}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="dark:bg-[#000] bg-gray-2">
                {paginatedProducts.map((product: any, index: number) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-x-5">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleSelect(product.id)}
                          className="w-4 h-4"
                        />
                        <div className="flex items-center gap-x-2">
                          {/* <Image
                            src={product.image}
                            width={50}
                            height={50}
                            alt="Product"
                          /> */}
                          <span className="text-2xl p-3 rounded-full border">
                            {product.image}
                          </span>
                          <h2 className="text-base">{product.name}</h2>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>${product.price.toFixed()}</TableCell>
                    <TableCell>${product.salePrice.toFixed()}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      {product.stock > 0 ? (
                        <div className="bg-green text-center rounded-lg text-green-light-6 text-base">
                          <span>Selling</span>
                        </div>
                      ) : (
                        <div className="bg-red text-center rounded-lg text-red-light-6 text-base">
                          <span>Out of Stock</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <button>
                          <ZoomIn size={20} />
                        </button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <label className="relative inline-block">
                        <input
                          checked={product.published}
                          type="checkbox"
                          className="peer invisible"
                        />
                        <span className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-red border border-slate-300 transition-all duration-100 peer-checked:bg-green" />
                        <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4" />
                      </label>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-start items-center gap-x-5">
                        <button>
                          <SquarePen size={20} />
                        </button>
                        <button>
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ReactTable>
          </div>

          {/* Pagination */}
          <div className="p-4 dark:bg-dark flex items-center justify-between border-t border-gray-700">
            <div className="text-sm text-gray-400">
              SHOWING {(currentPage - 1) * itemsPerPage + 1} TO{" "}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} OF{" "}
              {filteredProducts.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 dark:text-white text-dark-2 hover:text-white hover:bg-gray-6 dark:hover:bg-dark-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              {[...Array(totalPages)].map((_, i) => (
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
        </div>
      </div>
    </div>
  );
}
