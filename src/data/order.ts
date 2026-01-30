// demoOrders.ts
export type TOrderStatus = "Processing" | "Delivered" | "Cancelled" | "Pending";
export type TPaymentMethod = "bKash" | "Nagad" | "Cash" | "Card";

export type TOrder = {
    _id: string;
    invoiceNo: number;
    orderTime: string; // "Jul 22, 2025 9:00 PM"
    customerName: string;
    method: TPaymentMethod;
    amount: number;
    status: TOrderStatus;
};

export const demoOrders: TOrder[] = [
    {
        _id: "ord_20015",
        invoiceNo: 20015,
        orderTime: "Jul 22, 2025 9:00 PM",
        customerName: "Chioma Adekunle",
        method: "Card",
        amount: 619.0,
        status: "Processing",
    },
    {
        _id: "ord_20014",
        invoiceNo: 20014,
        orderTime: "Jul 22, 2025 7:10 PM",
        customerName: "Tunde Adeboye",
        method: "bKash",
        amount: 5875.84,
        status: "Processing",
    },
    {
        _id: "ord_20013",
        invoiceNo: 20013,
        orderTime: "Jul 22, 2025 8:45 AM",
        customerName: "Chinedu Okoro",
        method: "Nagad",
        amount: 813.59,
        status: "Cancelled",
    },
    {
        _id: "ord_20012",
        invoiceNo: 20012,
        orderTime: "Jul 21, 2025 5:00 PM",
        customerName: "David",
        method: "Cash",
        amount: 36.5,
        status: "Processing",
    },
    {
        _id: "ord_20011",
        invoiceNo: 20011,
        orderTime: "Jul 21, 2025 3:30 PM",
        customerName: "Amaka Nwosu",
        method: "Card",
        amount: 37.19,
        status: "Delivered",
    },
    {
        _id: "ord_20010",
        invoiceNo: 20010,
        orderTime: "Jul 20, 2025 11:15 AM",
        customerName: "Rahim Uddin",
        method: "bKash",
        amount: 249.99,
        status: "Delivered",
    },
    {
        _id: "ord_20009",
        invoiceNo: 20009,
        orderTime: "Jul 20, 2025 9:40 AM",
        customerName: "Fatema Akter",
        method: "Nagad",
        amount: 1299.0,
        status: "Pending",
    },
    {
        _id: "ord_20008",
        invoiceNo: 20008,
        orderTime: "Jul 19, 2025 6:20 PM",
        customerName: "Hasan Mahmud",
        method: "Cash",
        amount: 58.75,
        status: "Delivered",
    },
];
export const statusBadgeClass = (status: TOrderStatus) => {
    if (status === "Processing") return "bg-teal text-white";
    if (status === "Delivered") return "bg-green text-white ";
    if (status === "Cancelled") return "bg-red text-white";

    return "bg-yellow text-white"; // Pending
};