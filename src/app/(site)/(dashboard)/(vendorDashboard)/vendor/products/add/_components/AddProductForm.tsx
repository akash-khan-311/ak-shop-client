"use client";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";
import FormField from "@/components/ui/FormField";
import {
  categories,
  categoryBrandMap,
  productColors,
  productSpecifications,
} from "@/data";
import ImageUploadField from "@/helpers/ImageUpload";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddProductForm({
  mode = "add",
  defaultValues,
  onSubmit,
  isLoading,
}: any) {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const selectedCategory = watch("category");
  const selectedSubCategory = watch("subcategory");
  const subCategoryOptions =
    categories.find((cat) => cat.name === selectedCategory)?.subcategories ||
    [];

  const brandOptions =
    selectedCategory &&
    selectedSubCategory &&
    categoryBrandMap[selectedCategory]?.[selectedSubCategory]
      ? categoryBrandMap[selectedCategory][selectedSubCategory]
      : [];

  const specsFields =
    selectedCategory &&
    selectedSubCategory &&
    productSpecifications[selectedCategory]?.[selectedSubCategory]
      ? productSpecifications[selectedCategory][selectedSubCategory]
      : [];

  useEffect(() => {
    setValue("subcategory", "");
    setValue("brand", "");
  }, [selectedCategory, setValue]);

  useEffect(() => {
    setValue("brand", "");
  }, [selectedSubCategory, setValue]);
  return (
    <div>
      <DashboardPageHeader
        pathnames={["Products", "Add Product"]}
        description="Add Product Section"
        title="Add Product"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dark:bg-dark bg-gray-3 p-6 rounded-xl">
          <h2 className="text-xl md:text-2xl border-b dark:border-gray-6 border-gray-5 pb-4">
            Product Details
          </h2>
          <div
            className={`grid grid-cols-1 ${selectedCategory ? "md:grid-cols-3" : "md:grid-cols-2"} mt-6  gap-4  justify-center items-center`}
          >
            <div>
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="productName"
                label="Product Name"
                required
                register={register}
                type="text"
                placeholder="Enter Your Product Name"
                errors={errors}
                errorMessage="Product Name is Required"
              />
            </div>
            <div className="mx-auto w-full">
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="category"
                label="Product Category"
                required
                register={register}
                options={Object.keys(categoryBrandMap)}
                type="combobox"
                control={control}
                placeholder="Search Category"
                errors={errors}
                errorMessage="Product Name is Required"
              />
            </div>
            {selectedCategory && (
              <div>
                <FormField
                  label="Sub Category"
                  name="subcategory"
                  className="dark:bg-dark-2 bg-white"
                  type="combobox"
                  placeholder="Select sub category"
                  options={Object.keys(categoryBrandMap[selectedCategory])}
                  control={control}
                  register={register}
                  errors={errors}
                  required
                  errorMessage="Subcategory is required"
                />
              </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
            <div>
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="brand"
                label="Brand"
                required
                register={register}
                type="combobox"
                control={control}
                options={brandOptions}
                placeholder="Enter Your Product Name"
                errors={errors}
                errorMessage="Product Name is Required"
              />
            </div>
            <div>
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="color"
                label="Color"
                required
                register={register}
                type="combobox"
                control={control}
                options={productColors}
                placeholder="Select Your Product Color"
                errors={errors}
                errorMessage="Color is Required"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
            <div>
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="wight"
                label="Weight(KG)"
                register={register}
                type="number"
                control={control}
                placeholder="15"
                errors={errors}
              />
            </div>
            <div>
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="length"
                label="Length(CM)"
                register={register}
                type="number"
                control={control}
                placeholder="120"
                errors={errors}
              />
            </div>
            <div>
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="width"
                label="Width(CM)"
                register={register}
                type="number"
                control={control}
                placeholder="23"
                errors={errors}
              />
            </div>
          </div>
          <div>
            <FormField
              className="dark:bg-dark-2 bg-white"
              name="description"
              label="Product Description"
              register={register}
              type="textarea"
              control={control}
              placeholder="Enter Your Product Description"
              errors={errors}
            />
          </div>
        </div>
        <div className="dark:bg-dark bg-gray-3 p-6 rounded-xl mt-10">
          <h2 className="text-xl md:text-2xl border-b dark:border-gray-6 border-gray-5 pb-4">
            Pricing & Availability
          </h2>
          <div className="mt-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="quantity"
                label="Stock Quantity"
                required
                register={register}
                control={control}
                type="number"
                placeholder="15"
                errors={errors}
                errorMessage="Stock Quantity is Required"
              />
              <FormField
                className="dark:bg-dark-2 bg-white"
                name="availability"
                label="Availability Status"
                required
                register={register}
                control={control}
                type="combobox"
                options={["In Stock", "Out of Stock"]}
                placeholder="Select Availability Status"
                errors={errors}
                errorMessage="Stock Quantity is Required"
              />
            </div>
          </div>
        </div>
        {specsFields.length > 0 && (
          <div className="dark:bg-dark bg-gray-3 p-6 rounded-xl mt-10">
            <h2 className="text-xl md:text-2xl border-b dark:border-gray-6 border-gray-5 pb-4">
              Product Specifications
            </h2>
            <div className="mt-6 grid grid-cols-3 gap-5">
              {specsFields.map((field) => (
                <FormField
                  className="dark:bg-dark-2 bg-white"
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  type={field.type as any}
                  options={field?.options}
                  register={register}
                  control={control}
                  errors={errors}
                  placeholder={field.label}
                  required={field.optional ? false : true}
                  errorMessage={`${field.label} is required`}
                />
              ))}
            </div>
          </div>
        )}
        <div className="dark:bg-dark bg-gray-3 p-6 rounded-xl mt-10">
          <h2 className="text-xl md:text-2xl border-b dark:border-gray-6 border-gray-5 pb-4">
            Product Images
          </h2>
          <ImageUploadField setValue={setValue} />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-4 bg-pink text-white  py-2 px-8 rounded-lg"
        >
          {isLoading
            ? "Saving..."
            : mode === "add"
              ? "Add Product"
              : "Update Product"}
        </button>
      </form>
    </div>
  );
}
