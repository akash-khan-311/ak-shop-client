"use client";

import { slugify } from "@/app/(site)/(dashboard)/utils/slugify";
import FormField from "@/components/ui/FormField";
import SingleImageUploadField from "@/helpers/SingleImageUploadField";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetSingleCategoryQuery,

  useGetSingleSubCategoryQuery,

  useUpdateCategoryMutation,
  useUpdateSubCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { useAppSelector } from "@/redux/hook";
import { TCategory } from "@/types/category";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  type: "category" | "subcategory";
  itemId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  categories?: TCategory[];
};

export default function EditDrawer({
  type,
  itemId,
  isOpen,
  setIsOpen,
  title,
  categories = [],
}: Props) {
  const token = useAppSelector(selectCurrentToken);

  /* ---------------- queries ---------------- */
  const { data: categoryRes } = useGetSingleCategoryQuery(itemId, {
    skip: !isOpen || type !== "category",
  });

  const { data: subCategoryRes } = useGetSingleSubCategoryQuery(itemId, {
    skip: !isOpen || type !== "subcategory",
  });

  const item =
    type === "category"
      ? categoryRes?.data
      : subCategoryRes?.data;


  /* ---------------- mutations ---------------- */
  const [updateCategory, { isLoading: catLoading }] =
    useUpdateCategoryMutation();

  const [updateSubCategory, { isLoading: subLoading }] =
    useUpdateSubCategoryMutation();

  /* ---------------- local state ---------------- */
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [resetImageTrigger, setResetImageTrigger] = useState(false);

  const [brands, setBrands] = useState<string[]>([]);
  const [newBrand, setNewBrand] = useState("");

  /* ---------------- form ---------------- */
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>();

  const name = watch("name");

  /* slug auto */
  useEffect(() => {
    if (name) {
      setValue("slug", slugify(name));
    }
  }, [name, setValue]);

  /* set default values */
  useEffect(() => {
    if (item && isOpen) {
      reset({
        name: item.name,
        slug: item.slug,
        categoryId:
          typeof item.categoryId === "object"
            ? item.categoryId?._id
            : item.categoryId,
      });

      if (type === "category" && item.image?.url) {
        setPreviewImage(item.image.url);
      }

      if (type === "subcategory") {
        setBrands(item.brands || []);
      }

      setResetImageTrigger(true);
    }
  }, [item, isOpen, reset, type]);

  /* ---------------- brand handlers ---------------- */
  const addBrand = () => {
    if (newBrand && !brands.includes(newBrand)) {
      setBrands([...brands, newBrand]);
      setNewBrand("");
    }
  };

  const removeBrand = (brand: string) => {
    setBrands(brands.filter((b) => b !== brand));
  };

  /* ---------------- submit ---------------- */
  const onSubmit = async (data: any) => {
    try {
      /* ---------------- CATEGORY ---------------- */
      if (type === "category") {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("slug", data.slug)

        if (data.image instanceof File) {
          formData.append("image", data.image)
        }

        await updateCategory({
          id: itemId,
          token,
          data: formData,
        }).unwrap()

        toast.success("Category updated")
      }

      /* ---------------- SUB CATEGORY ---------------- */
      if (type === "subcategory") {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("slug", data.slug)
        formData.append("categoryId", data.categoryId)
        formData.append("brands", JSON.stringify(brands))

        // 🔥 image optional
        if (data.image instanceof File) {
          formData.append("image", data.image)
        }

        const result = await updateSubCategory({
          id: itemId,
          token,
          data: formData,
        }).unwrap()

        if (result.success) {
          toast.success("Subcategory updated")
        }
      }

      setIsOpen(false)
    } catch (err) {
      toast.error("Update failed")
      console.error(err)
    }
  }

  /* ---------------- UI ---------------- */
  return (
    <>
      <div
        className={`fixed inset-y-0 right-0 z-50 w-[90%] md:w-[600px] xl:w-[800px]
        bg-gray-3 dark:bg-dark p-6 overflow-y-auto transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4"
        >
          <X size={32} />
        </button>

        <h2 className="text-3xl font-semibold border-b pb-4 mb-6">
          {title}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            className="dark:bg-dark-2 bg-white"
            label={type === "category" ? "Category Name" : "Subcategory Name"}
            name="name"
            register={register}
            errors={errors}
            required
          />

          <FormField
            className="dark:bg-dark-2 bg-white"
            label="Slug"
            name="slug"
            register={register}
            errors={errors}
            required
          />

          {type === "subcategory" && (
            <div>
              <label className="block mb-1 font-medium">
                Parent Category
              </label>
              <select
                {...register("categoryId", { required: true })}
                className="w-full h-12 px-3 border border-gray-6 rounded dark:bg-dark-2"
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {type === "category" && (
            <SingleImageUploadField
              setValue={setValue}
              resetTrigger={resetImageTrigger}
              existingImage={previewImage}
            />
          )}
          {type === "subcategory" && (
            <SingleImageUploadField
              setValue={setValue}
              resetTrigger={resetImageTrigger}
              existingImage={item?.image?.url}
            />
          )}

          {type === "subcategory" && (
            <div>
              <label className="block mb-2 font-medium">Brands</label>

              <div className="flex flex-wrap gap-2 mb-2">
                {brands.map((b) => (
                  <div className="flex items-center" key={b}>

                    <span

                      className="px-3 bg-gray-6/40 rounded-md py-1 text-white flex items-center gap-2"
                    >
                      {b}

                    </span>
                    <TooltipProvider delayDuration={1}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => removeBrand(b)}
                            className="text-red-500"
                          >
                            <X size={15} color="red" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Remove Brand</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                  className="flex-1 px-3 h-11 border rounded dark:bg-dark-2 bg-white outline-none border-gray-6"
                  placeholder="New brand"
                />
                <button
                  type="button"
                  onClick={addBrand}
                  className="px-5 bg-green text-white rounded"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={type === "category" ? catLoading : subLoading}
            className="w-full h-12 bg-pink text-white rounded"
          >
            {type === "category"
              ? catLoading
                ? "Updating..."
                : "Update Category"
              : subLoading
                ? "Updating..."
                : "Update Subcategory"}
          </button>
        </form>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
