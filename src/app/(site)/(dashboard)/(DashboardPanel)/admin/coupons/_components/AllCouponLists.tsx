"use client";

import { useMemo, useState } from "react";
import { Trash2, SquarePen } from "lucide-react";

import {
  Table as ReactTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import DataTableActions from "@/components/data-table/DataTableActions";
import DataTableFilters from "@/components/data-table/DataTableFilters";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useDeleteCouponMutation,
  useGetCouponsQuery,
  useToggleCouponActiveMutation,
} from "@/redux/features/coupons/couponsApi";
import DataTablePaginationServer from "@/components/data-table/DataTablePaginationServer";
import { TCoupon } from "@/types/coupon";
import { formatDate, getCouponStatus, statusClass, statusLabel } from "./utils";
import toast from "react-hot-toast";

const tableHeading = [
  "Name",
  "Code",
  "Discount",
  "Scope",
  "Published",
  "Start Date",
  "End Date",
  "Status",
  "Actions",
];

const sortOptions = [
  "No Sort",
  "Newest",
  "Oldest",
  "Code: A-Z",
  "Code: Z-A",
  "Low to High",
  "High to Low",
];
const mapSortToApi = (sortLabel: string) => {
  switch (sortLabel) {
    case "Newest":
      return "-createdAt";
    case "Oldest":
      return "createdAt";
    case "Code: A-Z":
      return "code";
    case "Code: Z-A":
      return "-code";
    case "Low to High":
      return "value";
    case "High to Low":
      return "-value";
    default:
      return "-createdAt";
  }
};
export default function AllCouponLists() {
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [filters, setFilters] = useState({
    searchTerm: "",
    scope: "all",
    isActive: "all",
    sort: "Newest",
  });

  const sort = useMemo(() => mapSortToApi(filters.sort), [filters.sort]);

  const { data, isLoading, isFetching } = useGetCouponsQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: filters.searchTerm || undefined,
    scope: filters.scope as any,
    isActive: filters.isActive as any,
    sort,
  });

  const coupons = useMemo(() => data?.data?.items || [], [data?.data?.items]);
  const meta = data?.data?.meta;

  const [deleteCoupon] = useDeleteCouponMutation();
  const [toggleActive] = useToggleCouponActiveMutation();

  const toggleSelectAll = () => {
    const ids = coupons.map((c) => c._id);
    if (selected.length === ids.length) setSelected([]);
    else setSelected(ids);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleDelete = async (couponId: string) => {
    if (!confirm("Delete this coupon?")) return;
    await deleteCoupon({ couponId }).unwrap();
    setSelected((prev) => prev.filter((x) => x !== couponId));
  };

  const bulkDelete = async () => {
    if (selected.length === 0) return;
    if (!confirm(`Delete ${selected.length} coupons?`)) return;

    for (const id of selected) {
      await deleteCoupon({ couponId: id }).unwrap();
    }
    setSelected([]);
  };

  const exportCSV = () => {
    const rows = [
      tableHeading.join(","),
      ...coupons.map((c) =>
        [
          `"${c.code}"`,
          c.type,
          c.value,
          c.scope,
          c.minPurchase ?? 0,
          `${c.usedCount}/${c.usageLimit ?? "∞"}`,
          c.isActive,
          `"${new Date(c.createdAt).toLocaleString()}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `coupons-page-${currentPage}.csv`;
    a.click();
  };

  const exportJSON = () => {
    const json = JSON.stringify(coupons, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `coupons-page-${currentPage}.json`;
    a.click();
  };

  const onReset = () => {
    setFilters({
      searchTerm: "",
      scope: "all",
      isActive: "all",
      sort: "Newest",
    });
    setCurrentPage(1);
  };

  const onChangeFilters = (next: any) => {
    setFilters(next);
    setCurrentPage(1);
  };

  console.log("this is all coupons", coupons);
  const handleToggleActive = async (id: string) => {
    try {
      const result = await toggleActive({ couponId: id }).unwrap();
      console.log(result);
      if (result.success) {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error("Failed to toggle active status");
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <DashboardPageHeader
        pathnames={["Coupons", "All Coupons"]}
        title="All Coupons"
        description="Manage your coupon codes here"
      />
      <DataTableActions
        exportCSV={exportCSV}
        exportJSON={exportJSON}
        bulkDelete={bulkDelete}
        selectedProducts={selected}
      />
      <DataTableFilters
        filters={[
          {
            key: "searchTerm",
            type: "search",
            placeholder: "Search coupon code...",
          },
          {
            key: "scope",
            type: "select",
            options: ["all", "global", "products", "categories"],
          },
          {
            key: "isActive",
            type: "select",
            options: ["all", "true", "false"],
          },
          {
            key: "sort",
            type: "sort",
            options: sortOptions,
          },
        ]}
        values={filters}
        setValues={onChangeFilters}
        onReset={onReset}
      />
      <div className="bg-gray-7 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <ReactTable>
            <TableHeader>
              <TableRow>
                {tableHeading.map((item) => (
                  <TableHead className="uppercase" key={item}>
                    {item === "Name" ? (
                      <div className="flex items-center gap-x-5">
                        <input
                          onChange={toggleSelectAll}
                          type="checkbox"
                          className="w-4 h-4"
                          checked={
                            selected.length > 0 &&
                            selected.length === coupons.length
                          }
                        />
                        <span className="dark:text-gray-5 text-gray-2 ">
                          {item}
                        </span>
                      </div>
                    ) : (
                      <span className="dark:text-gray-5 text-gray-2 ">
                        {item}
                      </span>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="dark:bg-[#000] bg-gray-2">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={tableHeading.length}>
                    <span className="text-center flex justify-center text-xl">
                      Loading....
                    </span>
                  </TableCell>
                </TableRow>
              ) : coupons.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={tableHeading.length}>
                    <span className="text-center flex justify-center text-xl">
                      No coupons found
                    </span>
                  </TableCell>
                </TableRow>
              ) : (
                coupons.map((c: TCoupon) => (
                  <TableRow
                    key={c._id}
                    className={`hover:bg-muted/50 ${selected.includes(c._id) ? "bg-muted/50" : ""}`}
                  >
                    <TableCell>
                      <div className="flex items-center gap-x-5">
                        <input
                          type="checkbox"
                          checked={selected.includes(c._id)}
                          onChange={() => toggleSelect(c._id)}
                          className="w-4 h-4"
                        />
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </TableCell>

                    <TableCell>{c.code}</TableCell>
                    <TableCell>
                      {c.type === "percentage" ? `${c.value}%` : `৳${c.value}`}
                    </TableCell>
                    <TableCell>
                      <span className="uppercase">{c.scope}</span>
                    </TableCell>

                    <TableCell>
                      <label className="relative inline-block">
                        <input
                          onChange={() => handleToggleActive(c._id)}
                          checked={c.isActive}
                          type="checkbox"
                          className="peer invisible"
                          disabled={isFetching}
                        />
                        <span className="absolute top-0 left-0 w-9 h-5 cursor-pointer rounded-full bg-red border border-slate-300 transition-all duration-100 peer-checked:bg-green" />
                        <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full z-10 transition-all duration-100 peer-checked:translate-x-4" />
                      </label>
                    </TableCell>

                    <TableCell>{formatDate(c.startDate)}</TableCell>
                    <TableCell>{formatDate(c.endDate)}</TableCell>
                    <TableCell>
                      {(() => {
                        const st = getCouponStatus(c);
                        return (
                          <span
                            className={`px-3 py-1 rounded-md text-sm font-medium ${statusClass[st]}`}
                          >
                            {statusLabel[st]}
                          </span>
                        );
                      })()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-x-5">
                        <button
                          title="Edit"
                          onClick={() => console.log("edit", c._id)}
                        >
                          <SquarePen size={20} />
                        </button>

                        <button
                          title="Delete"
                          onClick={() => handleDelete(c._id)}
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </ReactTable>
        </div>

        <DataTablePaginationServer
          currentPage={currentPage}
          totalPage={meta?.totalPage || 1}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
