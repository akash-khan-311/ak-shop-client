"use client";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import FormField from "@/components/ui/FormField";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { useGetAllCategoryForAdminQuery } from "@/redux/features/category/categoryApi";
import { useCreateSpecTemplateMutation } from "@/redux/features/specTemplate/specTemplate";
import { useAppSelector } from "@/redux/hook";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { generateFieldKey } from "./utils";
import toast from "react-hot-toast";
import { TYPE_OPTIONS } from "@/data";
type TSpecFieldType =
  | "text"
  | "number"
  | "date"
  | "combobox"
  | "boolean"
  | "multi-select";

type TSpecField = {
  label: string;
  name: string;
  type: TSpecFieldType;
  options?: string[];
  optionsText?: string;
  order?: number;
};
type TForm = {
  categoryName: string;
  subcategoryName: string;
  userId: string;
  isPublished: boolean;
};

export default function AddSpecTemplateForm() {
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetAllCategoryForAdminQuery(token, { skip: !token });
  const categories = useMemo(() => data?.data || [], [data]);
  const categoryOptions = categories.map((c: any) => c.name);
  const {
    register,
    control,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      categoryName: "",
      subcategoryName: "",
      userId: "",
      isPublished: true,
    },
  });
  console.log("this is categories", categories);
  const selectedCategoryName = watch("categoryName");
  const selectedSubcategoryName = watch("subcategoryName");

  const selectedCatObj = useMemo(() => {
    if (!selectedCategoryName) return null;
    return categories.find((c: any) => c.name === selectedCategoryName) || null;
  }, [categories, selectedCategoryName]);

  const subcategoryOptions =
    selectedCatObj?.subcategories?.map((s: any) => s.name) || [];

  const selectedSubObj = useMemo(() => {
    if (!selectedCatObj || !selectedSubcategoryName) return null;
    return (
      selectedCatObj.subcategories?.find(
        (s: any) => s.name === selectedSubcategoryName,
      ) || null
    );
  }, [selectedCatObj, selectedSubcategoryName]);

  const categorySlug = selectedCatObj?.slug;
  const subcategorySlug = selectedSubObj?.slug;

  const [fields, setFields] = useState<TSpecField[]>([]);
  const addField = () => {
    setFields((prev) => [
      ...prev,
      {
        label: "",
        name: "",
        type: "text",
        options: [],
        optional: false,
        order: prev.length,
      },
    ]);
  };

  const removeField = (index: number) => {
    setFields((prev) =>
      prev.filter((_, i) => i !== index).map((f, i) => ({ ...f, order: i })),
    );
  };

  const updateField = (index: number, patch: Partial<TSpecField>) => {
    setFields((prev) =>
      prev.map((f, i) => (i === index ? { ...f, ...patch } : f)),
    );
  };
  const [createTemplate, { isLoading }] = useCreateSpecTemplateMutation();
  // reset subcategory on category change
  useEffect(() => {
    setValue("subcategoryName", "");
  }, [selectedCategoryName, setValue]);

  const onSave = async (form: TForm) => {
    if (!token) return;

    if (!categorySlug || !subcategorySlug) {
      toast.error("Select category & subcategory first");

      return;
    }

    const cleanedFields = fields
      .map((f, idx) => ({
        label: (f.label || "").trim(),
        name: (f.name || "").trim(),
        type: f.type,
        order: idx,
        options:
          f.type === "combobox" || f.type === "multi-select"
            ? (f.optionsText || "")
                .split(",")
                .map((x) => x.trim())
                .filter(Boolean)
            : [],
      }))
      .filter((f) => f.label && f.name);

    if (cleanedFields.length === 0) {
      toast.error("Add at least 1 valid field");
      return;
    }

    // ✅ build payload exactly like Postman
    const body = {
      subcategorySlug,
      categorySlug,
      adminId: user?._id,
      fields: cleanedFields,
    };

    try {
      const res = await createTemplate({ token, body }).unwrap();
      //   alert(res?.message || "Template saved ✅");
      console.log("this is result from spec ", res);
      if (res?.success) {
        toast.success(res?.message || "Template created successfully ✅");
        setFields([]);
        reset();
      }
    } catch (err: any) {
      alert(err?.data?.message || "Failed to save template ❌");
    }
  };

  return (
    <div>
      <DashboardPageHeader
        pathnames={["Spec Templates", "Create"]}
        description="Create vendor/base specification templates"
        title="Create Spec Template"
      />
      <div>
        <form onSubmit={handleSubmit(onSave)} className="space-y-8">
          {/* Target selection */}
          <div className="dark:bg-dark bg-gray-3 p-6 rounded-xl">
            <h2 className="text-xl md:text-2xl border-b dark:border-gray-6 border-gray-5 pb-4">
              Template Target
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="categoryName"
                label="Category"
                required
                register={register}
                type="combobox"
                control={control}
                options={categoryOptions}
                placeholder="Select category"
                errors={errors}
                errorMessage="Category is required"
              />

              {selectedCategoryName && (
                <FormField
                  className="dark:bg-dark-2 bg-white"
                  name="subcategoryName"
                  label="Subcategory"
                  required
                  register={register}
                  type="combobox"
                  control={control}
                  options={subcategoryOptions}
                  placeholder="Select subcategory"
                  errors={errors}
                  errorMessage="Subcategory is required"
                />
              )}
            </div>
          </div>

          {/* Fields builder */}
          <div className="dark:bg-dark bg-gray-3 p-6 rounded-xl">
            <div className="flex items-center justify-between border-b dark:border-gray-6 border-gray-5 pb-4">
              <h2 className="text-xl md:text-2xl">Fields</h2>
            </div>

            <div className="mt-6 space-y-4">
              {fields.map((field, index) => {
                const showOptions =
                  field.type === "combobox" || field.type === "multi-select";

                return (
                  <div
                    key={index}
                    className="dark:bg-dark-2 bg-white rounded-xl p-4 border dark:border-gray-6 border-gray-4"
                  >
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 items-center">
                      {/* label */}
                      <div>
                        <label className="text-sm block mb-2">Label</label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 dark:bg-dark"
                          value={field.label}
                          onChange={(e) => {
                            const label = e.target.value;
                            updateField(index, {
                              label,
                              name: generateFieldKey(label),
                            });
                          }}
                          placeholder="e.g. RAM, Storage, Color, Size etc."
                        />
                      </div>

                      {/* type */}
                      <div>
                        <label className="text-sm block mb-2">Type</label>
                        <Select
                          value={field.type}
                          onValueChange={(value) =>
                            updateField(index, {
                              type: value as TSpecFieldType,
                              options:
                                value === "combobox" || value === "multi-select"
                                  ? field.options || []
                                  : [],
                            })
                          }
                        >
                          <SelectTrigger className="w-full border rounded-lg px-3 py-5 dark:bg-dark">
                            <SelectValue placeholder="Select field type" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              {TYPE_OPTIONS.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* optional */}
                      <div className="">
                        <button
                          type="button"
                          onClick={() => removeField(index)}
                          className="bg-red px-4 py-1 rounded-md text-white mt-6"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {showOptions && (
                      <div className="mt-4">
                        <label className="text-sm block mb-2">
                          Options (comma separated)
                        </label>
                        <input
                          className="w-full border rounded-lg px-3 py-2 dark:bg-dark"
                          value={field.optionsText || ""}
                          onChange={(e) =>
                            updateField(index, {
                              optionsText: e.target.value,
                            })
                          }
                          placeholder="6GB, 8GB, 16GB"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={addField}
                className="bg-pink text-white px-4 py-2 rounded-lg"
              >
                + Add a New Field
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-pink text-white py-2 px-8 rounded-lg"
              >
                {isLoading ? "Loading....." : "Create Template"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
