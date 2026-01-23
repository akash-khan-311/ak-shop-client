"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Control, UseFormSetValue, useWatch } from "react-hook-form";

type ImageUploadProps = {
  setValue: UseFormSetValue<any>;
  control: Control<any>;
};

export default function ImageUploadField({
  setValue,
  control,
}: ImageUploadProps) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const watchedImages = useWatch({
    control,
    name: "images",
  });

  useEffect(() => {
    if (!watchedImages || watchedImages.length === 0) {
      setImages([]);
      setPreviews([]);
    }
  }, [watchedImages]);
  const handleFilesChange = (files: FileList | null) => {
    if (!files) return;
    const filesArray = Array.from(files);
    const updatedImages = [...images, ...filesArray];
    const updatedPreviews = [
      ...previews,
      ...filesArray.map((file) => URL.createObjectURL(file)),
    ];

    setImages(updatedImages);
    setPreviews(updatedPreviews);

    // Update RHF value
    setValue("images", updatedImages, { shouldValidate: true });
  };

  const handleRemove = (index: number) => {
    const updatedImages = [...images];
    const updatedPreviews = [...previews];
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setImages(updatedImages);
    setPreviews(updatedPreviews);

    setValue("images", updatedImages, { shouldValidate: true });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFilesChange(e.dataTransfer.files);
  };

  return (
    <div className="mb-6">
      <div
        className="border-2 border-dashed border-gray-5 rounded-lg p-6 text-center cursor-pointer dark:border-gray-600 dark:text-gray-300"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="text-gray-4 flex flex-col items-center">
          <Upload />
          <p>Drag your images or click here</p>
          <p className="text-sm text-gray-400">
            (Only *.jpeg, *.webp and *.png images will be accepted)
          </p>
        </div>
        <input
          type="file"
          multiple
          accept="image/png, image/jpeg, image/webp"
          className="hidden"
          ref={fileInputRef}
          onChange={(e) => handleFilesChange(e.target.files)}
        />
      </div>

      {previews?.length > 0 && (
        <div className="flex flex-wrap mt-4 gap-3">
          {previews.map((src, index) => (
            <div
              key={index}
              className="relative w-40 h-40 shadow-xl rounded overflow-hidden"
            >
              <Image
                height={200}
                width={200}
                src={src}
                alt={`preview-${index}`}
                className="w-full h-full object-cover shadow-xl"
              />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
