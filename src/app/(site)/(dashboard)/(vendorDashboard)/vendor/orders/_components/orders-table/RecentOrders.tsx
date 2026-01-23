"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {

  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { orders } from "@/data";
import Table from "@/app/(site)/(dashboard)/_components/table";

const RecentOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [actionDropdown, setActionDropdown] = useState(null);
  const [invoiceDropdown, setInvoiceDropdown] = useState(null);

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Order ${orderId} status changed to ${newStatus}`);
    setActionDropdown(null);
  };

  const handlePrintInvoice = (orderId) => {
    console.log(`Printing invoice for order ${orderId}`);
    window.print();
    setInvoiceDropdown(null);
  };

  return (
    <div className="">
      <div className="">
        <h1 className=" text-2xl font-bold mb-6">Recent Orders</h1>

        <div className="dark:bg-dark-2 rounded-lg overflow-hidden">
          {/* <table className="w-full border">
            <thead className="dark:bg-dark ">
              <tr className=" dark:border-gray-7 border-gray-3">
                <th className="text-left text-gray-5 font-medium px-6 py-4">
                  INVOICE NO.
                </th>
                <th className="text-left  text-gray-5 font-medium px-6 py-4">
                  ORDER TIME
                </th>
                <th className="text-left  text-gray-5 font-medium px-6 py-4">
                  CUSTOMER NAME
                </th>
                <th className="text-left  text-gray-5 font-medium px-6 py-4">
                  METHOD
                </th>
                <th className="text-left  text-gray-5 font-medium px-6 py-4">
                  AMOUNT
                </th>
                <th className="text-left  text-gray-5 font-medium px-6 py-4">
                  STATUS
                </th>
                <th className="text-left  text-gray-5 font-medium px-6 py-4">
                  ACTION
                </th>
                <th className="text-left  text-gray-5 font-medium px-6 py-4">
                  INVOICE
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className="border-b dark:border-gray-7 bg-gray-1 dark:bg-dark-2 border-gray-3 hover:bg-gray-800/50"
                >
                  <td className=" px-6 py-4">{order.id}</td>
                  <td className=" px-6 py-4">{order.time}</td>
                  <td className=" px-6 py-4">{order.customer}</td>
                  <td className=" px-6 py-4">{order.method}</td>
                  <td className=" px-6 py-4">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`${getStatusColor(order.status)}  px-3 py-1 rounded-full`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActionDropdown(
                            actionDropdown === index ? null : index
                          )
                        }
                        className="border w-full px-4 py-2 rounded-lg flex justify-between items-center gap-2 "
                      >
                        {order.status}
                        <ChevronDown
                          className={`w-4 h-4 ${actionDropdown === index && "rotate-180"} transition-all duration-300`}
                        />
                      </button>
                      {actionDropdown === index && (
                        <StatusDropdown
                          orderId={order.id}
                          currentStatus={order.status}
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 relative">
                    <div className="flex items-center gap-5">
                      <button
                        onClick={() => handlePrintInvoice(order.id)}
                        className=" hover:text-gray-300"
                        title="Print Invoice"
                      >
                        <Printer className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() =>
                          setInvoiceDropdown(
                            invoiceDropdown === index ? null : index
                          )
                        }
                        className=" hover:text-gray-300"
                        title="View Invoice"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
          <Table
            currentOrders={currentOrders}
            setActionDropdown={setActionDropdown}
            actionDropdown={actionDropdown}
            handlePrintInvoice={handlePrintInvoice}
            setInvoiceDropdown={setInvoiceDropdown}
            invoiceDropdown={invoiceDropdown}
            handleStatusChange={handleStatusChange}
          />
          <div className="flex items-center justify-between px-6 py-4 w-full border border-t-0 dark:border-gray-7">
            <div className="dark:text-gray-4 text-sm ">
              SHOWING {startIndex + 1} TO {Math.min(endIndex, orders.length)} OF{" "}
              {orders.length}
            </div>

            <div className="flex items-center gap-2 ">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center  text-gray-400 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded flex items-center justify-center ${currentPage === i + 1
                    ? " dark:bg-white/20 bg-gray-5/30"
                    : "text-gray-400 dark:hover:bg-white/20 hover:bg-gray-5/30 "
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
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
