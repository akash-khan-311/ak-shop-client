"use client";

import FormField from "@/components/ui/FormField";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import { slugify } from "@/app/(site)/(dashboard)/utils/slugify";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";

import SingleImageUploadField from "@/helpers/SingleImageUploadField";
import { uploadImageToCloudinary } from "@/lib/utils";
import toast from "react-hot-toast";

/* ---------------- TYPES ---------------- */

type BrandField = {
  value: string;
};

type SubCategory = {
  name: string;
  slug: string;
  brands: BrandField[];
};

type CategoryFormData = {
  image?: File | null;
  name: string;
  slug: string;
  subcategories: SubCategory[];
};

/* ---------------- COMPONENT ---------------- */

const CreateCategory = () => {
  const {
    reset,
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      slug: "",
      image: null,
    },
  });

  const token = useAppSelector(selectCurrentToken);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [resetImage, setResetImage] = useState(false);
  const categoryName = watch("name");
  useEffect(() => {
    if (categoryName) {
      setValue("slug", slugify(categoryName), {
        shouldValidate: true,
      });
    }
  }, [categoryName, setValue]);

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);

      if (data.image) formData.append("image", data.image);

      const result = await createCategory({ token, formData }).unwrap();
      if (result.success) {
        toast.success("Category created successfully");
        reset();
        setResetImage(true);
      }
    } catch (error) {
      if (error.status === 409) {
        toast.error(error.data.message);
      } else {
        toast.error("Failed to create category");
      }
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div>
      <DashboardPageHeader
        pathnames={["Category", "Add Category"]}
        title="Create Category"
        description="Here can create a new Category"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="dark:bg-dark bg-gray-3 p-6 rounded-xl">
          <h2 className="text-xl md:text-2xl border-b dark:border-gray-6 border-gray-5 pb-4">
            Create Category
          </h2>
          {/* CATEGORY INFO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Category Name"
              name="name"
              placeholder="Enter Category Name"
              register={register}
              errors={errors}
              required
              errorMessage="Category name is required"
            />

            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Category Slug"
              name="slug"
              placeholder="Enter Category Slug"
              register={register}
              errorMessage="Category slug is required"
              errors={errors}
              required
            />
          </div>

          <div className="dark:bg-dark bg-gray-3 p-6 rounded-xl mt-10">
            <h2 className="text-xl md:text-2xl border-b dark:border-gray-6 border-gray-5 pb-4">
              Product Images
            </h2>
            <SingleImageUploadField
              resetTrigger={resetImage}
              setValue={setValue}
            />
          </div>
          <div className="flex justify-between items-center mt-10">
            {/* SUBMIT */}
            <button
              disabled={isLoading}
              className="bg-pink text-white hover:bg-pink-light duration-200 shadow-xl py-2 px-8 rounded-md *:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 "
              type="submit"
            >
              {isLoading ? "Creating..." : "Create Category"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
