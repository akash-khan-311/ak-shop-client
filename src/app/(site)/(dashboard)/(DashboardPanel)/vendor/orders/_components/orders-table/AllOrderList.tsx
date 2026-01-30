"use client";
import { useMemo, useState } from "react";
import { ZoomIn, Printer, FileText, Search } from "lucide-react";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import DataTableActions from "@/components/data-table/DataTableActions";
import DataTableFilters from "@/components/data-table/DataTableFilters";
import DataTablePagination from "@/components/data-table/DataTablePagination";
import {
  Table as ReactTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  demoOrders,
  statusBadgeClass,
  TOrder,
  TOrderStatus,
  TPaymentMethod,
} from "@/data/order";
import { TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
const tableHeading = [
  "Invoice No",
  "Order Time",
  "Customer Name",
  "Method",
  "Amount",
  "Status",
  "Action",
  "Invoice",
];

export default function AllOrderList() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    search: "",
    status: "All Status",
    method: "All Methods",
    sort: "No Sort",
  });
  const statusOptions = [
    "All Status",
    "Processing",
    "Delivered",
    "Cancelled",
    "Pending",
  ];
  const methodOptions = ["All Methods", "bKash", "Nagad", "Cash", "Card"];
  const filteredOrders = useMemo(() => {
    let filtered = demoOrders.filter((o: TOrder) => {
      const q = filters.search.toLowerCase();

      const matchesSearch =
        o.customerName.toLowerCase().includes(q) ||
        String(o.invoiceNo).includes(q);

      const matchesStatus =
        filters.status === "All Status" ||
        o.status === (filters.status as TOrderStatus);

      const matchesMethod =
        filters.method === "All Methods" ||
        o.method === (filters.method as TPaymentMethod);

      return matchesSearch && matchesStatus && matchesMethod;
    });

    // sort
    if (filters.sort === "Amount: Low to High") {
      filtered.sort((a, b) => a.amount - b.amount);
    } else if (filters.sort === "Amount: High to Low") {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (filters.sort === "Invoice: New to Old") {
      filtered.sort((a, b) => b.invoiceNo - a.invoiceNo);
    } else if (filters.sort === "Invoice: Old to New") {
      filtered.sort((a, b) => a.invoiceNo - b.invoiceNo);
    } else if (filters.sort === "Customer: A-Z") {
      filtered.sort((a, b) => a.customerName.localeCompare(b.customerName));
    }

    return filtered;
  }, [filters]);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const toggleSelectAll = () => {
    const ids = paginatedOrders.map((o) => o._id);
    const allSelected = ids.every((id) => selectedOrders.includes(id));
    setSelectedOrders(allSelected ? [] : ids);
  };

  const toggleSelect = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };
  const exportCSV = () => {
    const csv = [
      tableHeading.join(","),
      ...filteredOrders.map((o) =>
        [
          o.invoiceNo,
          `"${o.orderTime}"`,
          `"${o.customerName}"`,
          `"${o.method}"`,
          o.amount,
          `"${o.status}"`,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
  };

  const exportJSON = () => {
    const json = JSON.stringify(filteredOrders, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.json";
    a.click();
  };

  const bulkDelete = () => {
    if (
      selectedOrders.length > 0 &&
      confirm(`Delete ${selectedOrders.length} orders?`)
    ) {
      setSelectedOrders([]);
    }
  };
  return (
    <div>
      <DashboardPageHeader
        pathnames={["Orders", "All Orders"]}
        title="All Orders"
        description="All Orders Listing Here"
      />

      <DataTableActions
        exportCSV={exportCSV}
        exportJSON={exportJSON}
        bulkDelete={bulkDelete}
        selectedProducts={selectedOrders}
      />

      <DataTableFilters
        filters={[
          {
            key: "search",
            type: "search",
            placeholder: "Search by invoice or customer...",
          },
          { key: "status", type: "select", options: statusOptions },
          { key: "method", type: "select", options: methodOptions },
          {
            key: "sort",
            type: "sort",
            options: [
              "No Sort",
              "Invoice: New to Old",
              "Invoice: Old to New",
              "Amount: Low to High",
              "Amount: High to Low",
              "Customer: A-Z",
            ],
          },
        ]}
        values={filters}
        setValues={setFilters}
        onReset={() =>
          setFilters({
            search: "",
            status: "All Status",
            method: "All Methods",
            sort: "No Sort",
          })
        }
      />

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <ReactTable>
            <TableHeader>
              <TableRow>
                {tableHeading.map((item) => (
                  <TableHead className="uppercase " key={item}>
                    {item === "Invoice No" ? (
                      <div className="flex items-center gap-x-5">
                        <input
                          onChange={toggleSelectAll}
                          type="checkbox"
                          className="w-4 h-4"
                        />
                        {item}
                      </div>
                    ) : (
                      item
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody className="dark:bg-[#000] bg-gray-2">
              {paginatedOrders.map((order) => (
                <TableRow
                  key={order._id}
                  className={`hover:bg-muted/50 ${
                    selectedOrders.includes(order._id) ? "bg-muted/50" : ""
                  }`}
                >
                  <TableCell>
                    <div className="flex items-center gap-x-5">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order._id)}
                        onChange={() => toggleSelect(order._id)}
                        className="w-4 h-4"
                      />
                      <span className="font-medium">{order.invoiceNo}</span>
                    </div>
                  </TableCell>

                  <TableCell>{order.orderTime}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.method}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>

                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusBadgeClass(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <button className="inline-flex items-center gap-2">
                      <ZoomIn size={18} />
                      <span className="text-sm">View</span>
                    </button>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-4">
                      <TooltipProvider delayDuration={1}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`/vendor/orders/invoice/${order.invoiceNo}`}
                              title="Invoice"
                            >
                              <FileText size={18} />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Invoice</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider delayDuration={1}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button>
                              <Printer size={18} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Print Invoice</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ReactTable>
        </div>

        <DataTablePagination
          filteredItems={filteredOrders}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
