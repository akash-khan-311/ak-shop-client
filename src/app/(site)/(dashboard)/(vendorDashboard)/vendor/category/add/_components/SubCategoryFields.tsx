"use client";

import {
  useFieldArray,
  Control,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/FormField";
import { useEffect } from "react";
import { slugify } from "@/app/(site)/(dashboard)/utils/slugify";

type Props = {
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  index: number;
  watch: any;
  setValue: any;
  removeSubcategory: (index: number) => void;
  canRemove: boolean;
};

const SubCategoryFields = ({
  control,
  register,
  errors,
  watch,
  index,
  setValue,
  removeSubcategory,
  canRemove,
}: Props) => {
  const {
    fields: brandFields,
    append: appendBrand,
    remove: removeBrand,
  } = useFieldArray({
    control,
    name: `subcategories.${index}.brands`,
  });

  const subcategoryName = watch(`subcategories.${index}.name`);
  useEffect(() => {
    if (subcategoryName) {
      setValue(`subcategories.${index}.slug`, slugify(subcategoryName), {
        shouldValidate: true,
      });
    }
  }, [subcategoryName, index, setValue]);

  return (
    <div className="border  dark:border-gray-6 border-gray-5 rounded-lg p-5 space-y-4 mt-5">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Subcategory {index + 1}</h3>

        {canRemove && (
          <Button
            type="button"
            variant="destructive"
            onClick={() => removeSubcategory(index)}
          >
            Remove
          </Button>
        )}
      </div>

      <FormField
        className="dark:bg-dark-2 bg-white"
        label="Subcategory Name"
        name={`subcategories.${index}.name`}
        register={register}
        placeholder="Enter Sub Category Name"
        errorMessage="Sub Category Name is Required"
        errors={errors}
        required
      />

      <FormField
        className="dark:bg-dark-2 bg-white"
        label="Subcategory Slug"
        name={`subcategories.${index}.slug`}
        register={register}
        errors={errors}
        required
        placeholder="Enter Sub Category Slug"
        errorMessage="Sub Category Slug is Required"
      />

      <FormField
        className="dark:bg-dark-2 bg-white"
        label="Brands"
        name={`subcategories.${index}.brands`}
        register={register}
        required
        errors={errors}
        isArray
        fields={brandFields}
        append={() => appendBrand({ value: "" })}
        placeholder="Brand name"
        errorMessage="Brand Name is Required"
      />
    </div>
  );
};

export default SubCategoryFields;
