"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type ImageUploadProps = {
  setValue: UseFormSetValue<any>; // or UseFormSetValue<CategoryFormData>
};

export default function SingleImageUploadField({ setValue }: ImageUploadProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));

    // ✅ RHF value update (single image)
    setValue("image", file, { shouldValidate: true });
  };

  const handleRemove = () => {
    setImage(null);
    setPreview(null);
    setValue("image", undefined as any);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleFileChange(file);
  };

  return (
    <div className="mb-6">
      <div
        className="border-2 border-dashed border-gray-5 rounded-lg p-6 text-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center text-gray-4">
          <Upload />
          <p>Drag image or click to upload</p>
          <p className="text-sm text-gray-400">(JPEG, PNG, WEBP only)</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        />
      </div>

      {preview && (
        <div className="mt-4 relative w-40 h-40 rounded overflow-hidden shadow-xl">
          <Image
            src={preview}
            alt="Category Image"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
