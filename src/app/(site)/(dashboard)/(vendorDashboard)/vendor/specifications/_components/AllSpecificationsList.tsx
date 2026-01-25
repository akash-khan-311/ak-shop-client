"use client";

import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import DataTableActions from "@/components/data-table/DataTableActions";
import DataTableFilters from "@/components/data-table/DataTableFilters";
import DataTablePagination from "@/components/data-table/DataTablePagination";
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
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { useGetTemplatesQuery } from "@/redux/features/specTemplate/specTemplate";
import { useGetUserByIdQuery } from "@/redux/features/users/usersApi";
import { useAppSelector } from "@/redux/hook";
import { TCategory } from "@/types/category";
import { TSpecField } from "@/types/specTemplate";
import { Plus, SquarePen, Trash2, ZoomIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
const tableHeading = [
  "Category",
  "Subcategory",
  "Fields",
  "Added By",
  "Published",
  "Actions",
];
export default function AllSpecificationsList() {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);
  const { data: categoriesData } = useGetAllCategoryQuery(token);
  const categories = useMemo(
    () => categoriesData?.data || [],
    [categoriesData],
  );
  const userId = user?.userId;
  const { data, isLoading } = useGetTemplatesQuery(
    { token, userId },
    { skip: !token },
  );

  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [idsToDelete, setIdsToDelete] = useState<string[]>([]);
  const { data: userData } = useGetUserByIdQuery(userId);

  const userDetails = userData?.data;

  const templates = useMemo(() => data?.data || [], [data]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const [filters, setFilters] = useState({
    search: "",
    category: "All Categories",
    sort: "No Sort",
  });
  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    let filtered = templates?.filter((template: any) => {
      // 🔍 Search filter
      const matchesSearch = template.categorySlug

        .toLowerCase()
        .includes(filters.search.toLowerCase());

      // 📂 Category filter
      const matchesCategory =
        filters.category === "All Categories" ||
        template.categorySlug === filters.category;

      return matchesSearch && matchesCategory;
    });

    // Published / Unpublished filter (from sort select)
    if (filters.sort === "Published") {
      filtered = filtered.filter((template: any) => template.isPublished);
    } else if (filters.sort === "Unpublished") {
      filtered = filtered.filter((template: any) => !template.isPublished);
    }

    //Name sorting
 if (filters.sort === "Name: A-Z") {
  filtered.sort((a, b) =>
    `${a.categorySlug}/${a.subcategorySlug}`.localeCompare(
      `${b.categorySlug}/${b.subcategorySlug}`
    )
  );
}
    return filtered;
  }, [templates, filters]);
  const paginatedTemplates = filteredTemplates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const exportCSV = () => {
    const csv = [
      "Category,Sub Category,Fields, Added By, Published",
      ...templates.map((template) =>
        [
          `"${template.categorySlug}"`,
          `"${template.subcategorySlug}"`,
          template.fields.length,
          `"${template?.userDetails?.name}"`,
          `"${template?.isPublished}"`,
        ].join(","),
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
    const json = JSON.stringify(templates, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "templates.json";
    a.click();
  };

  const toggleSelectAll = () => {
    if (selectedTemplates.length === templates.length) {
      setSelectedTemplates([]);
    } else {
      setSelectedTemplates(
        templates.map((template: TSpecField) => template._id),
      );
    }
  };
  const toggleSelect = (id: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  useEffect(() => {
  setCurrentPage(1);
}, [filters]);
  const filterKeys = [
    {
      key: "search",
      type: "search" as "search",
      placeholder: "Search by name",
    },
    {
      key: "category",
      type: "select" as "select",
      options: [
        "All Categories",
        ...categories.map((cat: TCategory) => cat.slug),
      ],
    },
    {
      key: "sort",
      type: "sort" as "sort",
      options: ["No Sort", "Published", "Unpublished", "Name: A-Z"],
    },
  ];
  const confirmDelete = (ids: string[]) => {
    setIdsToDelete(ids);
    setModalOpen(true);
  };
  return (
    <div>
      <DashboardPageHeader
        pathnames={["Specification", "Templates"]}
        title="Specification Templates"
        description="All specification templates listed here"
      />
      {/* Action Bar */}
      <DataTableActions
        bulkDelete={confirmDelete}
        exportCSV={exportCSV}
        exportJSON={exportJSON}
        selectedProducts={selectedTemplates}
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
            {/* Header */}
            <TableHeader>
              <TableRow>
                {tableHeading.map((item) => (
                  <TableHead key={item} className="uppercase">
                    {item === "Category" ? (
                      <div className="flex items-center gap-x-5">
                        <input
                          onChange={toggleSelectAll}
                          checked={
                            selectedTemplates.length === templates.length
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

            {/* Body */}
            <TableBody className="dark:bg-[#000] bg-gray-2">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-base">Loading...</TableCell>
                </TableRow>
              ) : paginatedTemplates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-base">No templates found</TableCell>
                </TableRow>
              ) : (
                paginatedTemplates.map((t: any) => (
                  <TableRow
                    key={t._id}
                    className={`hover:bg-muted/50 ${selectedTemplates.includes(t._id) && "bg-muted/50"}`}
                  >
                    {/* Category */}
                    <TableCell>
                      <div className="flex items-center gap-x-5">
                        <input
                          type="checkbox"
                          checked={selectedTemplates.includes(t._id)}
                          onChange={() => toggleSelect(t._id)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <span className="font-medium capitalize">
                          {t.categorySlug}
                        </span>
                      </div>
                    </TableCell>

                    {/* Subcategory */}
                    <TableCell>
                      {" "}
                      <span className="font-medium capitalize">
                        {t.subcategorySlug}
                      </span>
                    </TableCell>
                    {/* Fields */}
                    <TableCell>{t.fields?.length || 0}</TableCell>

                    {/* Published */}
                    <TableCell>
                      <span className="font-medium capitalize">
                        {userDetails?.name} {userData?.lastName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          t.isPublished
                            ? "bg-green/20 text-green"
                            : "bg-gray-7 text-gray-3"
                        }`}
                      >
                        {t.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </TableCell>
              

                    {/* Actions */}
                    <TableCell className="flex items-center gap-5">
                      <TooltipProvider delayDuration={1}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/vendor/specifications/edit/${t._id}`}>
                              <SquarePen size={20} />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit Template</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration={1}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href={`/dashboard/spec-templates/${t._id}`}>
                              <Trash2 size={20} />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Specifications</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

      
         {/* Pagination */}
               
        <DataTablePagination
          filteredItems={filteredTemplates}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
