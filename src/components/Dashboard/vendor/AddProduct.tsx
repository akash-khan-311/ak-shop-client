"use client";

import React, { useState, useCallback } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const categories = [
  "Electronics",
  "Mobile Phones",
  "Fashion",
  "Beauty & Health",
  "Home & Living",
  "Appliances",
  "Grocery & Pets",
  "Sports & Outdoor",
  "Automotive",
  "Baby & Kids",
  "Books & Media",
];

const categorySpecs: Record<string, string[]> = {
  Electronics: ["Brand", "Model", "Color", "Warranty"],
  "Mobile Phones": ["Brand", "Model", "RAM", "Storage", "Color", "Warranty"],
  Fashion: ["Size", "Color", "Material", "Gender"],
  "Beauty & Health": ["Ingredients", "Volume/Weight", "Skin Type"],
  "Home & Living": ["Material", "Dimensions", "Weight/Capacity"],
  Appliances: ["Brand", "Model", "Power", "Capacity", "Warranty"],
  "Grocery & Pets": ["Weight/Quantity", "Expiry Date", "Ingredients"],
  "Sports & Outdoor": ["Brand", "Material", "Size", "Weight"],
  Automotive: ["Brand", "Model", "Compatibility"],
  "Baby & Kids": ["Age Group", "Material", "Color"],
  "Books & Media": ["Author", "Publisher", "Language", "Pages"],
};

type Variant = {
  color?: string;
  size?: string;
  ram?: string;
  storage?: string;
  price: number;
  stock: number;
  sku: string;
  images: File[];
};

type FormValues = {
  title: string;
  description: string;
  category: string;
  specifications: Record<string, string>;
  mainImages: File[];
  variants: Variant[];
};

export default function DarazAddProductForm() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [previewMainImages, setPreviewMainImages] = useState<string[]>([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      specifications: {},
      mainImages: [],
      variants: [],
    },
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: FormValues) => {
    console.log("Full Product Data:", data);
    alert("Product submitted! Check console log");
    reset();
    setPreviewMainImages([]);
    setSelectedCategory("");
  };

  const handleMainImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setValue("mainImages", Array.from(files));
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setPreviewMainImages(urls);
    }
  };

  const selectedSpecs = selectedCategory ? categorySpecs[selectedCategory] : [];

  const useVariantImagesUpload = (index: number) => {
    const variantImages = watch(`variants.${index}.images`) || [];
    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        setValue(
          `variants.${index}.images`,
          [...variantImages, ...acceptedFiles],
          { shouldValidate: true }
        );
      },
      [variantImages, index]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: { "image/*": [] },
    });

    return { getRootProps, getInputProps, isDragActive, variantImages };
  };

  const VariantImagesUpload = ({ index }: { index: number }) => {
    const { getRootProps, getInputProps, isDragActive, variantImages } =
      useVariantImagesUpload(index);

    return (
      <div className="mt-2">
        <label className="font-medium">Variant Images</label>
        <div
          {...getRootProps()}
          className={`p-4 border-dashed border-2 rounded-md cursor-pointer mt-1 text-center ${
            isDragActive ? "border-blue-500" : "border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive
            ? "Drop the files here ..."
            : "Drag & drop images here, or click to select"}
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto">
          {variantImages.map((file, idx) => {
            const src = URL.createObjectURL(file);
            return (
              <Image
                height={300}
                width={300}
                key={idx}
                src={src}
                alt={`variant-${idx}`}
                className="w-20 h-20 object-cover rounded-md"
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-dark rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Title */}
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Product Title"
          className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}

        {/* Description */}
        <textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Product Description"
          className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}

        {/* Category */}
        <select
          {...register("category", { required: "Category is required" })}
          className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-red-500">{errors.category.message}</span>
        )}

        {/* Dynamic Specifications */}
        {selectedSpecs.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="font-semibold text-lg">Specifications</h3>
            {selectedSpecs.map((spec) => (
              <input
                key={spec}
                {...register(`specifications.${spec}`, {
                  required: `${spec} is required`,
                })}
                placeholder={spec}
                className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              />
            ))}
          </div>
        )}

        {/* Main Images */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Upload Main Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleMainImagesChange}
            className="border p-2 rounded-md dark:bg-gray-800 dark:text-white"
          />
          {previewMainImages.length > 0 && (
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {previewMainImages.map((src, idx) => (
                <Image
                  height={300}
                  width={300}
                  key={idx}
                  src={src}
                  alt={`Main ${idx}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
            </div>
          )}
        </div>

        {/* Variants */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Variants</h3>
          {variantFields.map((variant, index) => (
            <div
              key={variant.id}
              className="p-4 border rounded-md mb-3 flex flex-col gap-2"
            >
              {/* Color */}
              {selectedSpecs.includes("Color") && (
                <input
                  {...register(`variants.${index}.color` as const)}
                  placeholder="Color"
                  className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
              )}

              {/* Size */}
              {selectedSpecs.includes("Size") && (
                <input
                  {...register(`variants.${index}.size` as const)}
                  placeholder="Size"
                  className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
              )}

              {/* RAM */}
              {selectedSpecs.includes("RAM") && (
                <input
                  {...register(`variants.${index}.ram` as const)}
                  placeholder="RAM"
                  className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
              )}

              {/* Storage */}
              {selectedSpecs.includes("Storage") && (
                <input
                  {...register(`variants.${index}.storage` as const)}
                  placeholder="Storage"
                  className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
                />
              )}

              {/* Price */}
              <input
                type="number"
                {...register(`variants.${index}.price` as const, {
                  required: true,
                })}
                placeholder="Price"
                className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              />

              {/* Stock */}
              <input
                type="number"
                {...register(`variants.${index}.stock` as const, {
                  required: true,
                })}
                placeholder="Stock"
                className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              />

              {/* SKU */}
              <input
                {...register(`variants.${index}.sku` as const, {
                  required: true,
                })}
                placeholder="SKU"
                className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
              />

              {/* Variant Images Upload */}
              <VariantImagesUpload index={index} />

              {/* Remove Variant */}
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="bg-red-500 text-white px-2 py-1 rounded-md w-24 mt-2"
              >
                Remove Variant
              </button>
            </div>
          ))}

          {/* Add Variant Button */}
          <button
            type="button"
            onClick={() =>
              appendVariant({ price: 0, stock: 0, sku: "", images: [] })
            }
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mt-2"
          >
            Add Variant
          </button>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}
