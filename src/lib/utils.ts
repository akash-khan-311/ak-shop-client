import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "techorbit_unsigned");
  formData.append("folder", "techorbit-employees");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Upload failed");
  return data.secure_url;
};

export const statuses = ["Processing", "Pending", "Delivered", "Cancelled"];

export const getStatusColor = (status: string) => {
  const colors = {
    Processing: "bg-orange/30 text-orange",
    Pending: "bg-yellow/30 text-yellow",
    Delivered: "bg-green/30 text-green",
    Cancelled: "bg-red/30 text-red",
  };
  return colors[status] || "bg-gray-500";
};
