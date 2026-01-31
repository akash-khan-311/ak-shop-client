import { demoOrders } from "@/data/order";
import React from "react";
import Invoice from "./_components/invoice";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ invoiceNo: string }>;
}) {
  const { invoiceNo } = await params;
  const invoiceNoNumber = Number(invoiceNo);
  const order = demoOrders.find((o) => o.invoiceNo === invoiceNoNumber);
  if (!order) return <div className="p-6">Invoice not found</div>;
  return (
    <>
      <Invoice order={order} />
    </>
  );
}
