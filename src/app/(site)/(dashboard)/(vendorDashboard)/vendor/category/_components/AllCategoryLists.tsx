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

import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetAllCategoryQuery,
  useToggleCategoryPublishedMutation,
} from "@/redux/features/category/categoryApi";

import { useAppSelector } from "@/redux/hook";
import { TCategory } from "@/types/category";
import { SquarePen, Trash2, ZoomIn } from "lucide-react";
import { useMemo, useState } from "react";

export default function AllCategoryLists() {
  const [
    toggleCategoryPublished,
    { isLoading, isError, isSuccess, data: result },
  ] = useToggleCategoryPublishedMutation();
  const token = useAppSelector(selectCurrentToken);
  const { data } = useGetAllCategoryQuery(token, {
    skip: !token,
  });
  const categories = useMemo(() => data?.data || [], [data]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const tableHeading = ["Category Name", "Published", "Actions"];

  // Filter and sort products
  const filteredCategories = useMemo(() => {
    let filtered = categories?.filter((category: TCategory) => {
      const matchesSearch = category.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesSearch;
    });

    return filtered;
  }, [categories, searchTerm]);

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

  const bulkDelete = () => {
    console.log("bulk deleted");
  };

  const toggleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((cat: TCategory) => cat._id));
    }
  };

  const handlePublished = (id: string) => {
    const data = {
      id: id,
      token: token,
    };

    toggleCategoryPublished(data);
  };

  const toggleSelect = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  console.log(categories);
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
          exportCSV={exportCSV}
          exportJSON={exportJSON}
          bulkDelete={bulkDelete}
          selectedProducts={selectedCategories}
        />

        {/* Filters */}
        <DataTableFilters
          isProducts={false}
          isCategory={true}
          isOrders={false}
          products={categories}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setCurrentPage={setCurrentPage}
        />

        {/* Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
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
                {paginatedCategory?.map((category: TCategory) => (
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
                        <div className="flex items-center gap-x-2">
                          {/* <Image
                            src={product.image}
                            width={50}
                            height={50}
                            alt="Product"
                          /> */}
                          <span className="text-2xl p-3 rounded-full border">
                            {/* {category?.image} */}
                          </span>
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
    </div>
  );
}
