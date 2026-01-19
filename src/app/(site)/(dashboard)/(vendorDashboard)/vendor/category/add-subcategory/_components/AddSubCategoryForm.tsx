"use client";

import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import FormField from "@/components/ui/FormField";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useCreateSubCategoryMutation,
  useGetAllCategoryQuery,
} from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hook";
import { X } from "lucide-react";
import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

export default function AddSubCategoryForm() {
  const [createSubCategory, { isLoading }] = useCreateSubCategoryMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      categoryId: "",
      name: "",
      brands: [{ value: "" }],
    },
  });

  const token = useAppSelector(selectCurrentToken);

  const { data } = useGetAllCategoryQuery(token, {
    skip: !token,
  });

  const categories = useMemo(() => data?.data || [], [data]);

  // 🔹 Brands field array
  const {
    fields: brandFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "brands",
  });

  const onSubmit = async (formData: any) => {
    const slug = formData.name.toLowerCase().replace(/\s+/g, "-");
    const payload = {
      name: formData.name,
      slug,
      brands: formData.brands
        .map((b: { value: string }) => b.value.trim())
        .filter(Boolean),
    };

    console.log(payload);

    try {
      const result = await createSubCategory({
        id: formData.categoryId,
        token,
        payload,
      }).unwrap();

      if (result.success) {
        toast.success("Subcategory created successfully");
        reset();
      }

      // reset();
    } catch (error) {
      toast.error("Failed to create subcategory");
      console.log(error);
    }
  };

  return (
    <div>
      <DashboardPageHeader
        pathnames={["Category", "Add Sub Category"]}
        title="Add Sub Category"
        description="Here can add a new Sub Category"
      />
      <div className=" bg-gray-3 p-6 rounded-xl dark:bg-dark  border ">
        <h2 className="text-xl font-semibold mb-4">Add Sub Category</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Category Select */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Select Category
            </label>
            <select
              {...register("categoryId", { required: true })}
              className="w-full border px-3 py-2 rounded dark:bg-dark-2 bg-white"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {errors?.categoryId && (
              <p className="text-red-500 text-sm mt-1">Category is required</p>
            )}
          </div>

          {/* Subcategory Name */}
          <FormField
            className="dark:bg-dark-2 bg-white"
            label="Subcategory Name"
            name="name"
            register={register}
            placeholder="Enter Sub Category Name"
            errorMessage="Sub Category Name is Required"
            errors={errors}
            required
          />

          {/* 🔥 Brands Array */}
          <div>
            <label className="block mb-2 text-sm font-medium">Brands</label>

            {brandFields.map((field, index) => (
              <div key={field.id} className="flex gap-2 mb-2">
                <input
                  {...register(`brands.${index}.value`, { required: true })}
                  placeholder="Brand name"
                  className="flex-1 border focus:outline-none border-gray-6 px-3 py-2 rounded  dark:bg-dark-2 bg-white"
                />

                {brandFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={() => append({ value: "" })}
              className="text-sm text-orange dark:text-orange-dark mt-1"
            >
              + Add Brand
            </button>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-pink text-white py-2 rounded *:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:bg-pink-light duration-200 shadow-xl "
          >
            {isLoading ? "Creating..." : "Create Sub Category"}
          </button>
        </form>
      </div>
    </div>
  );
}
