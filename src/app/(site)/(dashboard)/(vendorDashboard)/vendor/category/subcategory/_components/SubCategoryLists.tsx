"use client";

import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetSubCategoryQuery } from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hook";
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
import { useMemo, useState } from "react";
import { TSubCategory } from "@/types/category";
import { SquarePen, Trash2 } from "lucide-react";
import DataTablePagination from "@/components/data-table/DataTablePagination";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import DataTableActions from "@/components/data-table/DataTableActions";
import DataTableFilters from "@/components/data-table/DataTableFilters";
import toast from "react-hot-toast";
const tableHeading = ["Sub Category Name", "Category", "Published", "Actions"];
export default function SubCategoryLists() {
  const token = useAppSelector(selectCurrentToken);
  const { data, isLoading, isSuccess, isError, error } =
    useGetSubCategoryQuery(token);
  const subCategories = useMemo(() => data?.data || [], [data]);
  console.log(subCategories);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    sort: "No Sort",
  });

  const categories = [
    "All Categories",
    ...Array.from(
      new Set(subCategories.map((subCategory) => subCategory?.categoryName)),
    ),
  ];

  // Filter and sort products
  const filteredSubCategories = useMemo(() => {
    // 1️⃣ Filter by search & category
    let filtered = subCategories.filter((subCategory) => {
      const matchesSearch = subCategory.name
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const matchesCategory =
        filters.category === "All Categories" ||
        subCategory.categoryName === filters.category;

      return matchesSearch && matchesCategory;
    });

    // 2️⃣ Filter by Published / Unpublished
    if (filters.sort === "Published") {
      filtered = filtered.filter((subCategory) => subCategory.published);
    } else if (filters.sort === "Unpublished") {
      filtered = filtered.filter((subCategory) => !subCategory.published);
    }

    // 3️⃣ Sort alphabetically
    if (filters.sort === "Name: A-Z") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [subCategories, filters]);

  // Filter and sort products
  const filteredCategories = useMemo(() => {
    let filtered = subCategories?.filter((subCategory: TSubCategory) => {
      const matchesSearch = subCategory.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    return filtered;
  }, [subCategories, searchTerm]);

  // const result = filteredCategories();
  // Pagination

  const paginatedSubCategory = filteredSubCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  // Export CSV
  const exportCSV = () => {
    const csv = [
      "Name,Slug,Category Count",
      ...subCategories.map((cat) =>
        [`"${cat.name}"`, `"${cat.slug}"`, cat.subCategories.length].join(","),
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
    const json = JSON.stringify(subCategories, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "products.json";
    a.click();
  };

  const toggleSelectAll = () => {
    if (selectedCategories.length === subCategories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(subCategories.map((cat: any) => cat._id));
    }
  };

  const filterKeys = [
    {
      key: "search",
      type: "search" as "search",
      placeholder: "Search Sub Category...",
    },
    {
      key: "category",
      type: "select" as "select",
      options: categories as string[],
    },
    {
      key: "sort",
      type: "sort" as "sort",
      options: ["No Sort", "Published", "Unpublished", "Name: A-Z"],
    },
  ];

  // const handlePublished = async (id: string) => {
  //   try {
  //     const data = {
  //       id: id,
  //       token: token,
  //     };

  //     const result = await toggleCategoryPublished(data).unwrap();

  //     if (result?.success) toast.success(result?.message);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to toggle published status");
  //   }
  // };

  const toggleSelect = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const confirmDelete = (ids: string[]) => {
    setIdsToDelete(ids);
    setModalOpen(true);
  };

  // const handleDeleteConfirmed = async () => {
  //   try {
  //     const result = await deleteCategory({ ids: idsToDelete, token }).unwrap();
  //     toast.success(result.message);
  //     setSelectedCategories([]); // bulk clear
  //   } catch (err: any) {
  //     toast.error(err?.data?.message || "Delete failed");
  //   } finally {
  //     setModalOpen(false);
  //     setIdsToDelete([]);
  //   }
  // };
  return (
    <div className="mt-10">
      <DashboardPageHeader
        pathnames={["Category", "Sub Category"]}
        title="Sub Category List"
        description="All Sub Category List here"
      />

      {/* Action Bar */}
      <DataTableActions
        bulkDelete={confirmDelete}
        exportCSV={exportCSV}
        exportJSON={exportJSON}
        selectedProducts={selectedCategories}
      />

      {/* Filters */}
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
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableRow>
                {tableHeading.map((item) => (
                  <TableHead className="uppercase" key={item}>
                    {item === "Sub Category Name" ? (
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
              {paginatedSubCategory?.map((subCategory: any) => (
                <TableRow
                  className={`hover:bg-muted/50 ${selectedCategories.includes(subCategory._id) && "bg-muted/50"}`}
                  key={subCategory._id}
                >
                  <TableCell>
                    <div className="flex items-center gap-x-5">
                      <div className="flex  items-center gap-x-2 rounded-full">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(subCategory._id)}
                          onChange={() => toggleSelect(subCategory._id)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <h2 className="text-base">{subCategory.name}</h2>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-x-5">
                      <div className="flex  items-center gap-x-2 rounded-full">
                        <h2 className="text-base">
                          {subCategory.categoryName}
                        </h2>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {subCategory.published ? (
                      <span className="text-green bg-green/20 p-2 rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="text-red bg-red/20 p-2 rounded-full">
                        Unpublished
                      </span>
                    )}
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
                            <p>Edit Sub Category</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration={1}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button>
                              <Trash2 size={20} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Sub Category</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
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
  );
}
