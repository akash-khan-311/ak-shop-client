"use client";
import { useState, useMemo } from "react";
import { Trash2, ZoomIn, SquarePen } from "lucide-react";
import {
  Table as ReactTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";

import DataTableActions from "@/components/data-table/DataTableActions";
import DataTableFilters from "@/components/data-table/DataTableFilters";
import DataTablePagination from "@/components/data-table/DataTablePagination";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import {
  useDeleteProductsMutation,
  useGetAllProductForAdminQuery,
  useTogglePublishProductMutation,
} from "@/redux/features/products/productApi";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { TProduct } from "@/types/product.type";
import Image from "next/image";
import toast from "react-hot-toast";
import { ConfirmationModal } from "@/components/ui/confirmationToast";

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
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const itemsPerPage = 10;
  const token = useAppSelector(selectCurrentToken);
  const [togglePublish] = useTogglePublishProductMutation();
  const [deleteProducts, { isLoading: isDeleting }] =
    useDeleteProductsMutation();
  const { data, isLoading } = useGetAllProductForAdminQuery(token);
  const products = useMemo(() => data?.data || [], [data?.data]);
  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    sort: "No Sort",
  });

  const categories = [
    "All Categories",
    ...(Array.from(
      new Set(products.map((p: TProduct) => p.category)),
    ) as string[]),
  ];
  console.log("this is products", products);
  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product: TProduct) => {
      const matchesSearch = product?.productName
        ?.toLowerCase()
        ?.includes(filters.search.toLowerCase());

      const matchesCategory =
        filters.category === "All Categories" ||
        product.category === filters.category;

      return matchesSearch && matchesCategory;
    });

    if (filters.sort === "Price: Low to High") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "Price: High to Low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "Name: A-Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sort === "Stock: Low to High") {
      filtered.sort((a, b) => a.stock - b.stock);
    }

    return filtered;
  }, [products, filters]);

  // Pagination

  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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
        ].join(","),
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

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((product: any) => product._id));
    }
  };

  // Toggle individual selection
  const toggleSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // Delete product
  const confirmDelete = (ids: string[]) => {
    setIdsToDelete(ids);
    setModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const result = await deleteProducts({ ids: idsToDelete, token }).unwrap();
      toast.success(result.message);
      setSelectedProducts([]);
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    } finally {
      setModalOpen(false);
      setIdsToDelete([]);
    }
  };

  // Toggle published status
  const handleTogglePublished = async (id: string) => {
    try {
      const result = await togglePublish({ id, token }).unwrap();

      if (result?.success) toast.success(result?.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to toggle published status");
    }
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
          bulkDelete={confirmDelete}
          selectedProducts={selectedProducts}
        />

        {/* Filters */}
        <DataTableFilters
          filters={[
            {
              key: "search",
              type: "search",
              placeholder: "Search products...",
            },
            {
              key: "category",
              type: "select",
              options: categories,
            },
            {
              key: "sort",
              type: "sort",
              options: [
                "No Sort",
                "Price: Low to High",
                "Price: High to Low",
                "Name: A-Z",
                "Stock: Low to High",
              ],
            },
          ]}
          values={filters}
          setValues={setFilters}
          onReset={() =>
            setFilters({
              search: "",
              category: "All Categories",
              sort: "No Sort",
            })
          }
        />

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <ReactTable className="">
              {/* Table Header */}
              <TableHeader>
                <TableRow>
                  {tableHeading.map((item) => (
                    <TableHead className="uppercase" key={item}>
                      {item === "Product Name" ? (
                        <div className="flex items-center gap-x-5">
                          <input
                            onChange={toggleSelectAll}
                            checked={
                              selectedProducts.length ===
                              paginatedProducts.length
                            }
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
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="h-24 text-center text-base"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : paginatedProducts.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="h-24 text-center text-base"
                    >
                      No products found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedProducts?.map((product: any, index: number) => (
                    <TableRow
                      className={`hover:bg-muted/50 ${selectedProducts.includes(product?._id) && "bg-muted/50"}`}
                      key={product?._id}
                    >
                      <TableCell>
                        <div className="flex items-center gap-x-5">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product._id)}
                            onChange={() => toggleSelect(product._id)}
                            className="w-4 h-4"
                          />
                          <div className="flex items-center gap-x-2">
                            <Image
                              src={product?.images?.[0]?.url}
                              width={50}
                              height={50}
                              alt="Product"
                            />

                            <h2 className="text-base">
                              {product?.productName}
                            </h2>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="">
                        <div>
                          <h3 className="text-base ">{product?.category}</h3>
                          <p className="text-sm text-gray-6">
                            {product?.subcategory}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>${product?.price?.toFixed()}</TableCell>
                      <TableCell>${product?.regularPrice?.toFixed()}</TableCell>
                      <TableCell>{product?.quantity}</TableCell>
                      <TableCell>
                        {product.availability ? (
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
                            onChange={() => handleTogglePublished(product?._id)}
                            checked={product?.isPublished}
                            type="checkbox"
                            className="peer invisible"
                          />
                          <span className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-red border border-slate-300 transition-all duration-100 peer-checked:bg-green" />
                          <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4" />
                        </label>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-start items-center gap-x-5">
                          <TooltipProvider delayDuration={1}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button>
                                  <SquarePen size={20} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Product</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider delayDuration={1}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => confirmDelete([product._id])}
                                >
                                  <Trash2 size={20} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Product</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
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
      {modalOpen && (
        <ConfirmationModal
          isLoading={isDeleting}
          title={`Are You Sure?`}
          message="This action cannot be undone. This will permanently delete the category and its associated data from the database."
          onCancel={() => setModalOpen(false)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}
