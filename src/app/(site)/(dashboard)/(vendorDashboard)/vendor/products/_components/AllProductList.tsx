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
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import Link from "next/link";
import DataTableActions from "@/components/data-table/DataTableActions";
import DataTableFilters from "@/components/data-table/DataTableFilters";
import DataTablePagination from "@/components/data-table/DataTablePagination";
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
    <div className="">
      <div className="">
        <DashboardPageHeader
          pathnames={["Products", "All Products"]}
          title="All Product"
          description="All Products Listing Here"
        />

        {/* Action Bar */}
        <DataTableActions
          exportCSV={exportCSV}
          exportJSON={exportJSON}
          bulkDelete={bulkDelete}
          selectedProducts={selectedProducts}
        />

        {/* Filters */}
        <DataTableFilters
          isProducts={true}
          isCategory={false}
          isOrders={false}
          products={products}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setCurrentPage={setCurrentPage}
        />

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <ReactTable>
              {/* Table Header */}
              <TableHeader>
                <TableRow>
                  {tableHeading.map((item) => (
                    <TableHead className="uppercase" key={item}>
                      {item === "Product Name" ? (
                        <div className="flex items-center gap-x-5">
                          <input
                            onChange={toggleSelectAll}
                            type="checkbox"
                            className="w-4 h-4"
                          />
                          {item}
                        </div>
                      ) : (
                        <>{item}</>
                      )}
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
                          onChange={() => togglePublished(product.id)}
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
          <DataTablePagination
            filteredItems={filteredProducts}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
