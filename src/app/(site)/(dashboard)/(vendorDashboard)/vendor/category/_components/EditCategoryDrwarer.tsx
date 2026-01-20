"use client";

import { slugify } from "@/app/(site)/(dashboard)/utils/slugify";
import FormField from "@/components/ui/FormField";
import SingleImageUploadField from "@/helpers/SingleImageUploadField";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hook";
import { TCategory } from "@/types/category";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  categoryId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function EditCategoryDrawer({
  categoryId,
  isOpen,
  setIsOpen,
}: Props) {
  const { data } = useGetSingleCategoryQuery(categoryId, {
    skip: !isOpen,
  });
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const token = useAppSelector(selectCurrentToken);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [resetImageTrigger, setResetImageTrigger] = useState(false);
  const category = data?.data || null;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<TCategory>();
  const categoryName = watch("name");
  useEffect(() => {
    if (categoryName) {
      setValue("slug", slugify(categoryName), {
        shouldValidate: true,
      });
    }
  }, [categoryName, setValue]);
  useEffect(() => {
    if (category && isOpen) {
      reset({
        name: category?.name,
        slug: category?.slug,
      });
      if (category?.image?.url) {
        setPreviewImage(category?.image.url);
      }
      setResetImageTrigger(true);
    }
  }, [category, isOpen, reset]);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  console.log(category?.image?.url);

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }
      const result = await updateCategory({
        id: categoryId,
        data: formData,
        token: token,
      }).unwrap();
      if (result?.success) {
        toast.success("Category updated successfully");
        setIsOpen(false);
      }
    } catch (error: any) {
      console.error("Update failed:", error.response?.data || error.message);
      toast.error("Failed to update category");
    }
  };

  return (
    <div className="relative">
      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-999999 bg-gray-3 dark:bg-dark overflow-hidden  p-6  w-[90%]
      md:w-[70%] lg:w-[600px] xl:w-[800px] transition-all transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-0 right-0 fill-white p-4 inline-block"
        >
          <X className="" size={35} />
        </button>
        <h1 className="text-3xl font-semibold border-b border-gray-6 pb-4 mb-8">
          Edit Category
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Category Name"
              name="name"
              register={register}
              errors={errors}
              required
            />
            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Category Slug"
              name="slug"
              register={register}
              errors={errors}
              required
            />
          </div>
          <div className="mt-10">
            <SingleImageUploadField
              setValue={setValue}
              resetTrigger={resetImageTrigger}
              existingImage={previewImage}
            />
          </div>
          <div>
            <button
              className="p-2 px-8 bg-pink rounded-md w-full flex justify-center items-center *:hover:bg-pink-dark mt-10 text-white disabled:opacity-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Category"}
            </button>
          </div>
        </form>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-sm bg-[#000]/30 z-99"
          onClick={toggleDrawer}
        ></div>
      )}
    </div>
  );
}
