"use client";

import FormField from "@/components/ui/FormField";
import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import SubCategoryFields from "./SubCategoryFields";
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
      subcategories: [
        {
          name: "",
          slug: "",
          brands: [{ value: "" }],
        },
      ],
    },
  });

  const {
    fields: subcategoryFields,
    append: appendSubcategory,
    remove: removeSubcategory,
  } = useFieldArray({
    control,
    name: "subcategories",
  });
  const token = useAppSelector(selectCurrentToken);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
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
      let imageUrl = "";

      if (data.image) {
        imageUrl = await uploadImageToCloudinary(data.image);
      }

      const formattedData = {
        token,
        categoryData: {
          image: imageUrl,
          name: data.name,
          slug: data.slug,
          subcategories: data.subcategories.map((sub) => ({
            name: sub.name,
            slug: sub.slug,
            brands: sub.brands.map((b) => b.value).filter(Boolean),
          })),
        },
      };

      const result = await createCategory(formattedData).unwrap();
      if (result.success) {
        toast.success("Category created successfully");
        reset();
      }
      console.log(result);
    } catch (error) {}
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

          {/* SUBCATEGORIES */}
          {subcategoryFields.map((sub, index) => (
            <SubCategoryFields
              key={sub.id}
              index={index}
              watch={watch}
              setValue={setValue}
              control={control}
              register={register}
              errors={errors}
              removeSubcategory={removeSubcategory}
              canRemove={subcategoryFields.length > 1}
            />
          ))}
          <div className="dark:bg-dark bg-gray-3 p-6 rounded-xl mt-10">
            <h2 className="text-xl md:text-2xl border-b dark:border-gray-6 border-gray-5 pb-4">
              Product Images
            </h2>
            <SingleImageUploadField setValue={setValue} />
          </div>
          <div className="flex justify-between items-center mt-10">
            {/* ADD SUBCATEGORY */}
            <button
              className="bg-gray-6 text-white hover:bg-gray-7 duration-200 shadow-xl py-2 px-8 rounded-md"
              type="button"
              onClick={() =>
                appendSubcategory({
                  name: "",
                  slug: "",
                  brands: [{ value: "" }],
                })
              }
            >
              + Add Subcategory
            </button>

            {/* SUBMIT */}
            <button
              className="bg-pink text-white hover:bg-pink-light duration-200 shadow-xl py-2 px-8 rounded-md"
              type="submit"
            >
              Create Category
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
