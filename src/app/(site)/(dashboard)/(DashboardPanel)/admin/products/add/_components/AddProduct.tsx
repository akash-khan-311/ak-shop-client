"use client";
import AddProductForm from "./AddProductForm";

export default function AddProduct() {
  const handleAddProduct = async (data: any) => {
    console.log("Product Data:", data);

    // API call
    // await fetch("/api/products", { method: "POST", body: JSON.stringify(data) })
  };
  return <AddProductForm onSubmit={handleAddProduct} />;
}
