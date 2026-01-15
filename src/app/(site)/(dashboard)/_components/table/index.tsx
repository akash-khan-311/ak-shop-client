import { Printer, Search } from "lucide-react";
import { StatusDropdown } from "../StatusDropDown";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getStatusColor, statuses } from "@/lib/utils";
import {
  Table as ReactTable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const TableHeaderLabels = [
  "INVOICE NO.",
  "ORDER TIME",
  "CUSTOMER NAME",
  "METHOD",
  "AMOUNT",
  "STATUS",
  "ACTION",
  "INVOICE",
];
export default function Table({
  setInvoiceDropdown,
  handlePrintInvoice,
  setActionDropdown,
  currentOrders,
  actionDropdown,
  invoiceDropdown,
  handleStatusChange,
}: any) {
  return (
    <>
      <div className="overflow-x-auto">
        <ReactTable>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              {TableHeaderLabels.map((item) => (
                <TableHead key={item}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="dark:bg-[#000] bg-gray-2">
            {currentOrders.map((order: any, index: number) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.time}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.method}</TableCell>
                <TableCell>${order.amount.toFixed()}</TableCell>
                <TableCell>
                  <span
                    className={`${getStatusColor(order.status)} px-3 py-1 rounded-full`}
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>
                  <select
                    className="bg-transparent px-3 py-2 rounded-md border 
              focus:outline-none dark:border-gray-600"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    {statuses.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="dark:bg-dark bg-white"
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-5">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button onClick={() => handlePrintInvoice(order.id)}>
                            <Printer className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Print Invoice</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() =>
                              setInvoiceDropdown(
                                invoiceDropdown === index ? null : index
                              )
                            }
                          >
                            <Search className="w-5 h-5" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Invoice</p>
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
    </>
  );
}
