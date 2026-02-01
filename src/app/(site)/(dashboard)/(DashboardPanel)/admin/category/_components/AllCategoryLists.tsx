"use client";

import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import DataTableActions from "@/components/data-table/DataTableActions";
import DataTableFilters from "@/components/data-table/DataTableFilters";
import DataTablePagination from "@/components/data-table/DataTablePagination";
import { ConfirmationModal } from "@/components/ui/confirmationToast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryForAdminQuery,
  useGetSingleCategoryQuery,
  useToggleCategoryPublishedMutation,
} from "@/redux/features/category/categoryApi";

import { useAppSelector } from "@/redux/hook";
import { TCategory } from "@/types/category";
import { Plus, SquarePen, Trash2, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import EditDrawer from "./EditDrawer";

export default function AllCategoryLists() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toggleCategoryPublished] = useToggleCategoryPublishedMutation();
  const [deleteCategory, { isLoading: isDeleteLoading }] =
    useDeleteCategoryMutation();
  const token = useAppSelector(selectCurrentToken);
  const { data, isLoading } = useGetAllCategoryForAdminQuery(token, {
    skip: !token,
  });
  const categories = useMemo(() => data?.data || [], [data]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeading = ["Category Name", "Published", "Actions"];

  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    sort: "No Sort",
  });
  // Filter and sort products
  const filteredCategories = useMemo(() => {
    let filtered = categories?.filter((category: TCategory) => {
      // 🔍 Search filter
      const matchesSearch = category.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      // 📂 Category filter
      const matchesCategory =
        filters.category === "All Categories" ||
        category.name === filters.category;

      return matchesSearch && matchesCategory;
    });

    // Published / Unpublished filter (from sort select)
    if (filters.sort === "Published") {
      filtered = filtered.filter((category: TCategory) => category.published);
    } else if (filters.sort === "Unpublished") {
      filtered = filtered.filter((category: TCategory) => !category.published);
    }

    // 🅰️ Name sorting
    if (filters.sort === "Name: A-Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [categories, filters]);

  // const result = filteredCategories();
  // Pagination

  const paginatedCategory = filteredCategories?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  // Export CSV
  const exportCSV = () => {
    const csv = [
      "Name,Slug,Subcategory Count",
      ...categories.map((cat) =>
        [`"${cat.name}"`, `"${cat.slug}"`, cat.subcategories.length].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "categories.csv";
    a.click();
  };

  // Export JSON
  const exportJSON = () => {
    const json = JSON.stringify(categories, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    a.click();
  };

  const toggleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((cat: TCategory) => cat._id));
    }
  };

  const handlePublished = async (id: string) => {
    try {
      const data = {
        id: id,
        token: token,
      };

      const result = await toggleCategoryPublished(data).unwrap();

      if (result?.success) toast.success(result?.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to toggle published status");
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const confirmDelete = (ids: string[]) => {
    setIdsToDelete(ids);
    setModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const result = await deleteCategory({ ids: idsToDelete, token }).unwrap();
      toast.success(result.message);
      setSelectedCategories([]);
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    } finally {
      setModalOpen(false);
      setIdsToDelete([]);
    }
  };

  const handleEditClick = (id: string) => {
    setSelectedCategoryId(id);
    setDrawerOpen(true);
  };

  const filterKeys = [
    {
      key: "search",
      type: "search" as "search",
      placeholder: "Search Category...",
    },
    {
      key: "category",
      type: "select" as "select",
      options: ["All Categories", ...categories.map((cat) => cat.name)],
    },
    {
      key: "sort",
      type: "sort" as "sort",
      options: ["No Sort", "Published", "Unpublished", "Name: A-Z"],
    },
  ];

  return (
    <div className="">
      <div className="">
        <DashboardPageHeader
          pathnames={["Category", "All Category"]}
          title="All Category"
          description="All Category Listing Here"
        />

        {/* Action Bar */}
        <DataTableActions
          bulkDelete={confirmDelete}
          exportCSV={exportCSV}
          exportJSON={exportJSON}
          selectedProducts={selectedCategories}
        />

        {/* Filters */}
        <DataTableFilters
          filters={filterKeys}
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
          <div className="relative w-full border overflow-x-auto scrollbar-thin scrollbar-thumb-gray-3">
            <Table>
              {/* Table Header */}
              <TableHeader>
                <TableRow>
                  {tableHeading.map((item) => (
                    <TableHead className="uppercase" key={item}>
                      {item === "Category Name" ? (
                        <div className="flex items-center gap-x-5">
                          <input
                            onChange={toggleSelectAll}
                            checked={
                              selectedCategories.length === categories.length
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
                      colSpan={3}
                      className="h-24 text-center text-base"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : paginatedCategory.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="h-24 text-center text-base"
                    >
                      No categories found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedCategory?.map((category: TCategory) => (
                    <TableRow
                      className={`hover:bg-muted/50 ${selectedCategories.includes(category._id) && "bg-muted/50"}`}
                      key={category._id}
                    >
                      <TableCell>
                        <div className="flex items-center gap-x-5">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category._id)}
                            onChange={() => toggleSelect(category._id)}
                            className="w-4 h-4 cursor-pointer"
                          />
                          <div className="flex  items-center gap-x-2 rounded-full">
                            <Image
                              src={category?.image?.url}
                              width={50}
                              height={50}
                              alt={category.name}
                              className="rounded-full w-10 h-10 object-cover"
                            />

                            <h2 className="text-base">{category.name}</h2>
                          </div>
                        </div>
                      </TableCell>
                      {/* <TableCell className="">{category.category}</TableCell> */}
                      <TableCell>
                        <label className="relative inline-block">
                          <input
                            onChange={() => handlePublished(category._id)}
                            checked={category.published}
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
                                <button
                                  onClick={() => handleEditClick(category._id)}
                                >
                                  <SquarePen size={20} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Edit Category</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider delayDuration={1}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button
                                  onClick={() => confirmDelete([category._id])}
                                >
                                  <Trash2 size={20} />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Category</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <DataTablePagination
            filteredItems={filteredCategories}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
      {selectedCategoryId && (
        <EditDrawer
          type="category"
          itemId={selectedCategoryId}
          isOpen={drawerOpen}
          setIsOpen={setDrawerOpen}
          title="Edit Category"
        />
      )}
      {modalOpen && (
        <ConfirmationModal
          isLoading={isDeleteLoading}
          title={`Are You Sure?`}
          message="This action cannot be undone. This will permanently delete the category and its associated data from the database."
          onCancel={() => setModalOpen(false)}
          onConfirm={handleDeleteConfirmed}
        />
      )}
    </div>
  );
}
