"use client";

import FormField from "@/components/ui/FormField";
import Loader from "@/components/ui/Loader/PageLoader";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetTemplateByIdQuery,
  useUpdateTemplateMutation,
} from "@/redux/features/specTemplate/specTemplate";
import { useAppSelector } from "@/redux/hook";
import { TSpecFieldType, TTemplate } from "@/types/specTemplate";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { generateFieldKey } from "../../../add/_components/utils";
import { useRouter } from "next/navigation";

const needsOptions = (type: TSpecFieldType) =>
  type === "combobox" || type === "multi-select";
export default function EditTemplateForm({ id }: { id: string }) {
  const token = useAppSelector(selectCurrentToken);
  const [activeId, setActiveId] = useState<string | null>(null);
  const router = useRouter();
  const { data, isLoading, isError } = useGetTemplateByIdQuery(
    { token, id },
    { skip: !token || !id },
  );
  const [updateTemplate, { isLoading: isUpdating }] =
    useUpdateTemplateMutation();
  const template = data?.data;

  const defaultValues = useMemo<TTemplate>(
    () => ({
      categorySlug: template?.categorySlug || "",
      subcategorySlug: template?.subcategorySlug || "",
      isPublished: !!template?.isPublished,
      fields:
        (template?.fields || [])
          .slice()
          .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0))
          .map((f: any, idx: number) => ({
            label: f?.label || "",
            name: f?.name || "",
            type: (f?.type || "text") as TSpecFieldType,
            options: Array.isArray(f?.options) ? f.options : [],
            optional: !!f?.optional,
            order: typeof f?.order === "number" ? f.order : idx,
          })) || [],
    }),
    [template],
  );

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm<TTemplate>({
    defaultValues,
    mode: "onChange",
  });
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: "fields",
  });

  const watchedFields = watch("fields");
  const watchedPublished = watch("isPublished");
  useEffect(() => {
    if (template?._id) reset(defaultValues);
  }, [template?._id, reset, defaultValues]);

  const syncOrder = () => {
    const current = watch("fields") || [];
    current.forEach((f, i) => {
      if (f.order !== i) {
        setValue(`fields.${i}.order`, i, { shouldDirty: true });
      }
    });
  };

  const addField = () => {
    append({
      label: "",
      name: "",
      type: "text",
      options: [],
      order: fields.length,
    });
  };

  const setAutoNameFromLabel = (index: number) => {
    const label = (getValues(`fields.${index}.label`) || "").trim();
    if (!label) return;

    const autoName = generateFieldKey(label);

    // existing names (exclude current index)
    const all = getValues("fields") || [];
    const existing = all
      .map((f, i) => (i === index ? "" : (f.name || "").trim()))
      .filter(Boolean);

    let finalName = autoName;
    let n = 1;
    while (existing.includes(finalName)) {
      finalName = `${autoName}${n++}`;
    }

    setValue(`fields.${index}.name`, finalName, { shouldDirty: true });
  };

  const addOption = (fieldIndex: number) => {
    const opts = watchedFields?.[fieldIndex]?.options || [];
    setValue(`fields.${fieldIndex}.options`, [...opts, ""], {
      shouldDirty: true,
    });
  };

  const onSubmit = async (values: TTemplate) => {
    try {
      const normalized = values.fields
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((f, idx) => {
          const label = (f.label || "").trim();
          const name = (f.name || "").trim() || generateFieldKey(label);

          return {
            label,
            name,
            type: f.type,
            optional: !!f.optional,
            order: idx,
            options: needsOptions(f.type)
              ? (f.options || []).map((o) => o.trim()).filter(Boolean)
              : [],
          };
        });

      // options rule
      const invalidOptions = normalized.some((f) => {
        if (!needsOptions(f.type)) return false;
        return !f.options || f.options.length < 2;
      });
      if (invalidOptions)
        return toast.error("Combobox/Multi-select needs at least 2 options!");

      const payload = {
        categorySlug: values.categorySlug,
        subcategorySlug: values.subcategorySlug,
        isPublished: values.isPublished,
        fields: normalized,
      };
      console.log(payload);

      const res = await updateTemplate({ token, id, body: payload }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Updated successfully!");
        reset();
        router.push("/vendor/specifications");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Update failed!");
      console.log(err);
    }
  };

  const moveUp = (index: number, id: string) => {
    if (index === 0) return;
    setActiveId(id);
    move(index, index - 1);
    requestAnimationFrame(syncOrder);
    setTimeout(() => setActiveId(null), 350);
  };

  const moveDown = (index: number, id: string) => {
    if (index === fields.length - 1) return;
    setActiveId(id);
    move(index, index + 1);
    requestAnimationFrame(syncOrder);
    setTimeout(() => setActiveId(null), 350);
  };

  const removeField = (index: number) => {
    remove(index);
    requestAnimationFrame(() => syncOrder());
  };
  if (isLoading) return <Loader />;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Edit Specification Template</h2>
          <p className="text-sm text-gray-400">
            {template.categorySlug} / {template.subcategorySlug}
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        id="edit-template-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Meta (read-only) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl p-4 shadow-lg bg-gray-3 dark:bg-dark ">
          <FormField
            readOnly
            className="dark:bg-dark-2 bg-white"
            label="Category"
            name="categorySlug"
            type="text"
            register={register}
            errors={errors}
            required
            errorMessage="Category required"
          />

          <FormField
            className="dark:bg-dark-2 bg-white"
            label="Subcategory"
            name="subcategorySlug"
            type="text"
            readOnly
            register={register}
            errors={errors}
            required
            errorMessage="Subcategory required"
          />

          <input type="hidden" {...register("isPublished")} />
        </div>

        {/* Fields */}
        <div className="rounded-xl  p-4 shadow-lg bg-gray-3 dark:bg-dark space-y-4">
          <div className="flex items-center justify-between border-b border-gray-6 pb-4">
            <h3 className="text-lg font-semibold">Fields</h3>
          </div>

          {fields.length === 0 ? (
            <p className="text-center pb-5">
              No Fields Exists, Please Add a Field
            </p>
          ) : (
            <motion.div layout className="space-y-4">
              {fields.map((row, index) => {
                const type = watchedFields?.[index]?.type as TSpecFieldType;

                return (
                  <motion.div
                    key={row.id}
                    layout
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className={`rounded-xl border border-gray-6 p-4 space-y-4
                        bg-white/60 dark:bg-dark-2/40
                        shadow-sm hover:shadow-md transition-shadow
                        ${activeId === row.id ? "ring-2 ring-pink/60" : ""}
                      `}
                  >
                    {/* top bar */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Field #{index + 1}</p>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => moveUp(index, row.id)}
                          disabled={index === 0}
                          className="px-2 py-1 rounded bg-gray-7 text-xs disabled:opacity-40"
                        >
                          <ArrowUp className="text-white" size={20} />
                        </button>

                        <button
                          type="button"
                          onClick={() => moveDown(index, row.id)}
                          disabled={index === fields.length - 1}
                          className="px-2 py-1 rounded bg-gray-7 text-xs disabled:opacity-40"
                        >
                          <ArrowDown className="text-white" size={20} />
                        </button>

                        <button
                          type="button"
                          onClick={() => removeField(index)}
                          className="px-3 py-1 rounded bg-red/20 text-red text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Label + Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <FormField
                          className="dark:bg-dark-2 bg-white"
                          label="Label"
                          name={`fields.${index}.label`}
                          type="text"
                          register={register}
                          errors={errors}
                          required
                          errorMessage="Label required"
                          placeholder="e.g. RAM"
                          rules={{
                            onBlur: () => setAutoNameFromLabel(index),
                          }}
                        />
                        <input
                          type="hidden"
                          {...register(`fields.${index}.name`)}
                        />
                      </div>

                      <div>
                        <FormField
                          className="dark:bg-dark-2 bg-white"
                          label="Type"
                          name={`fields.${index}.type`}
                          type="select"
                          control={control}
                          register={register}
                          errors={errors}
                          required
                          errorMessage="Type required"
                          placeholder="Select type"
                          options={[
                            "text",
                            "textarea",
                            "number",
                            "date",
                            "combobox",
                            "multi-select",
                          ]}
                          rules={{
                            onChange: (e: any) => {
                              const nextType = e.target.value as TSpecFieldType;
                              if (!needsOptions(nextType)) {
                                setValue(`fields.${index}.options`, [], {
                                  shouldDirty: true,
                                });
                              }
                            },
                          }}
                        />
                      </div>
                    </div>

                    {/* Options */}
                    {needsOptions(type) && (
                      <div className="rounded-lg border p-3 border-gray-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold">Options</p>
                          <button
                            type="button"
                            onClick={() =>
                              setValue(
                                `fields.${index}.options`,
                                [
                                  ...(watchedFields?.[index]?.options || []),
                                  "",
                                ],
                                { shouldDirty: true },
                              )
                            }
                            className="px-3 py-1 rounded bg-gray-7 text-xs text-white"
                          >
                            + Add Option
                          </button>
                        </div>

                        {(watchedFields?.[index]?.options || []).map(
                          (_, optIndex) => (
                            <div key={optIndex} className="flex gap-2">
                              <input
                                value={
                                  watchedFields?.[index]?.options?.[optIndex] ||
                                  ""
                                }
                                onChange={(e) => {
                                  const next = [
                                    ...(watchedFields?.[index]?.options || []),
                                  ];
                                  next[optIndex] = e.target.value;
                                  setValue(`fields.${index}.options`, next, {
                                    shouldDirty: true,
                                  });
                                }}
                                className="w-full px-4 py-2 border border-gray-6 rounded-lg bg-white dark:bg-dark-2"
                                placeholder={`Option ${optIndex + 1}`}
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  const next = (
                                    watchedFields?.[index]?.options || []
                                  ).filter(
                                    (_: any, i: number) => i !== optIndex,
                                  );

                                  setValue(`fields.${index}.options`, next, {
                                    shouldDirty: true,
                                  });
                                }}
                                className="px-3 py-2 rounded bg-red/20 text-red"
                              >
                                ✕
                              </button>
                            </div>
                          ),
                        )}
                      </div>
                    )}

                    <input
                      type="hidden"
                      {...register(`fields.${index}.order`)}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 ">
              <button
                type="button"
                onClick={addField}
                className="px-3 py-2 rounded-lg bg-gray-7 text-white "
              >
                + Add Field
              </button>

              <button
                type="button"
                onClick={() => reset(defaultValues)}
                disabled={!isDirty}
                className="px-3 py-2 rounded-lg text-white bg-gray-7 white  disabled:opacity-50"
              >
                Reset
              </button>
            </div>
            <button
              type="submit"
              form="edit-template-form"
              // disabled={isUpdating}
              className="px-4 py-2 rounded-lg bg-pink text-white text-sm font-medium disabled:opacity-60"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
