import React from "react";
import { Download, Printer } from "lucide-react";
import { statusBadgeClass, TOrder } from "@/data/order";

export default function Invoice({ order }: { order: TOrder }) {
  const invoiceData = {
    company: {
      name: "Zorvex",
      address: "2 Lawson Avenue, California, United States",
      phone: "+1 (212) 456-7890",
      email: "ecommerceadmin@gmail.com",
      website: "ecommerce-admin-board.vercel.app",
    },
    invoice: {
      status: "Processing",
      date: "July 22nd, 2025",
      number: "#20016",
      client: {
        name: "Chioma Adekunle",
        email: "chiadek@gmail.com",
        phone: "09012345678",
        address: "67 Artillery Junction, Port Harcourt, Rivers State",
      },
    },
    items: [
      {
        sr: 1,
        title: "Men's Cargo Trousers",
        quantity: 1,
        price: 55.0,
        amount: 55.0,
      },
      {
        sr: 2,
        title: "Men's Linen Shirt",
        quantity: 1,
        price: 45.0,
        amount: 45.0,
      },
      {
        sr: 3,
        title: "The Silent Patient",
        quantity: 4,
        price: 14.99,
        amount: 59.96,
      },
      {
        sr: 4,
        title: "SoundPods Mini",
        quantity: 1,
        price: 79.95,
        amount: 79.95,
      },
      {
        sr: 5,
        title: "Minimalist Wall Clock",
        quantity: 9,
        price: 29.99,
        amount: 269.91,
      },
      {
        sr: 6,
        title: "Glow Up Vitamin C Serum",
        quantity: 3,
        price: 34.99,
        amount: 104.97,
      },
      {
        sr: 7,
        title: "Non-Stick Loaf Pan",
        quantity: 2,
        price: 14.5,
        amount: 29.0,
      },
    ],
    payment: {
      method: "Card",
      shipping: 118.25,
      discount: 250.0,
      total: 619.0,
    },
  };

  return (
    <div className="min-h-screen dark:bg-gray-7 bg-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto ">
        {/* Header */}
        <h1 className="text-white text-2xl font-bold mb-6">Invoice</h1>

        {/* Invoice Container */}
        <div className="bg-zinc-900 rounded-lg p-6 sm:p-8 lg:p-10">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8">
            {/* Left: Invoice Info */}
            <div>
              <h2 className="text-white text-xl font-semibold mb-3">INVOICE</h2>
              <div className="flex items-center gap-2 mb-4">
                <span className=" ">Status</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${statusBadgeClass(order.status)}`}
                >
                  {order.status}
                </span>
              </div>
              <div className="space-y-2 flex items-center justify-between w-full">
                <div>
                  <div className="text-gray-400 text-sm">DATE</div>
                  <div className="text-white text-sm">{order.orderTime}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">INVOICE NO</div>
                  <div className="text-white text-sm">{order.invoiceNo}</div>
                </div>
              </div>
            </div>

            {/* Right: Company Info */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <span className="text-white text-xl font-bold">AK Shop</span>
              </div>
              <div className="text-gray-400 text-xs space-y-0.5">
                <div>{invoiceData.company.address}</div>
                <div>{invoiceData.company.phone}</div>
                <div>{invoiceData.company.email}</div>
                <div>{invoiceData.company.website}</div>
              </div>
            </div>
          </div>

          {/* Invoice To Section */}
          <div className="mb-8">
            <div className="text-gray-400 text-sm mb-2">INVOICE TO</div>
            <div className="text-white space-y-0.5 text-sm">
              <div className="font-semibold">{order.customerName}</div>
              <div>{invoiceData.invoice.client.email}</div>
              <div>{invoiceData.invoice.client.phone}</div>
              <div>{invoiceData.invoice.client.address}</div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="p-2 border">Item</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border">Demo Product</td>
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">${order.amount.toFixed(2)}</td>
                  <td className="p-2 border">${order.amount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 bg-zinc-800 rounded-lg p-6">
            <div>
              <div className="text-gray-400 text-xs mb-1">PAYMENT METHOD</div>
              <div className="text-white text-sm font-semibold">
                {order.method}
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1">SHIPPING COST</div>
              <div className="text-white text-sm font-semibold">${}</div>
            </div>
            <div>
              <div className="text-gray-400 text-xs mb-1">DISCOUNT</div>
              <div className="text-white text-sm font-semibold">
                ${invoiceData.payment.discount.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-end mb-8">
            <div className="text-right">
              <div className="text-gray-400 text-xs mb-1">TOTAL AMOUNT</div>
              <div className="text-green-500 text-3xl font-bold">
                ${invoiceData.payment.total.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors">
              <Download size={18} />
              <span>Download Invoice</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors">
              <Printer size={18} />
              <span>Print Invoice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
