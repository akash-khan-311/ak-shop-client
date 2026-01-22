"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

type Props = {
  setValue: any;
  resetTrigger: boolean;
  existingImage?: string;
};
export default function SingleImageUploadField({
  setValue,
  resetTrigger,
  existingImage,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  console.log(existingImage)
  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

  useEffect(() => {
    if (resetTrigger) {
      setPreview(existingImage || null);
      setValue("image", null);
    }
  }, [resetTrigger, setValue, existingImage]);

  const handleFile = (file: File | null) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setValue("image", file, { shouldValidate: true });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files?.[0] || null);
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
          onChange={(e) => handleFile(e.target.files?.[0] || null)}
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
        </div>
      )}
    </div>
  );
}
