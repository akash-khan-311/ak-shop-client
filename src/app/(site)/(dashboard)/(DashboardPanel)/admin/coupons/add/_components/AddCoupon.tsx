"use client";
import { useEffect, useMemo, useState } from "react";
import { useCreateCouponMutation } from "@/redux/features/coupons/couponsApi";
import DashboardPageHeader from "@/components/Dashboard/DashboardPageHeader";

import FormField from "@/components/ui/FormField";
import { useForm } from "react-hook-form";
import { FormValues } from "./formTypes";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { useGetAllCategoriesForUserQuery } from "@/redux/features/category/categoryApi";
import toast from "react-hot-toast";
const scopeOptions = ["global", "vendor", "products", "categories"];
const typeOptions = ["percentage", "fixed"];

export default function AddCouponForm() {
  const [createCoupon, { isLoading }] = useCreateCouponMutation();
  const token = useAppSelector(selectCurrentToken);
  const { data: productData } = useGetAllProductsQuery(token);
  const { data: categoryData } = useGetAllCategoriesForUserQuery(token);
  const products = useMemo(() => productData?.data || [], [productData]);
  const categories = useMemo(() => categoryData?.data || [], [categoryData]);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      code: "",
      type: "percentage",
      value: 10,
      scope: "global",
      productIds: [],
      startDate: undefined,
      endDate: undefined,
      usageLimit: undefined,
      perUserLimit: 1,
      isActive: true,
    },
  });

  const scope = watch("scope");
  const type = watch("type");

  useEffect(() => {
    if (scope !== "products") {
      setValue("productIds", []);
    }
  }, [scope, setValue]);

  const productIdOptions = useMemo(() => {
    return (products || []).map((p: any) => ({
      label: p.productName, // ✅ user sees this
      value: p._id, // ✅ form stores this
    }));
  }, [products]);
  const categoryIdOptions = useMemo(() => {
    return (categories || []).map((c: any) => ({
      label: c.name,
      value: c._id,
    }));
  }, [categories]);
  const onSubmit = async (values: FormValues) => {
    const payload: any = {
      ...values,
      code: values.code.trim().toUpperCase(),
    };

    // ✅ frontend safe checks
    if (payload.type === "percentage" && payload.value > 100) {
      toast.error("Percentage cannot exceed 100");
      return;
    }

    if (
      payload.scope === "products" &&
      (!payload.productIds || payload.productIds.length === 0)
    ) {
      toast.error(
        "Products scope selected — please select at least 1 productId",
      );
      return;
    }

    try {
      // backend e undefined/empty property clean করা (optional)
      Object.keys(payload).forEach((k) => {
        if (payload[k] === undefined) delete payload[k];
      });

      const res = await createCoupon(payload).unwrap();

      if (res.success) {
        toast.success(res.message);
        reset();
      }
    } catch (err: any) {
      toast.error("Failed to create coupon");
      console.log(err);
    }
  };
  return (
    <div className="space-y-6 ">
      <DashboardPageHeader
        pathnames={["Coupons", "Create"]}
        title="Create Coupon"
        description="Create a new coupon for discounts"
      />

      <div className="dark:bg-dark rounded-lg p-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: name + code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Coupon Name"
              name="name"
              type="text"
              placeholder="Welcome Discount"
              register={register}
              errors={errors}
              required
              errorMessage="Coupon name is required"
            />

            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Coupon Code"
              name="code"
              type="text"
              placeholder="WELCOME10"
              register={register}
              errors={errors}
              required
              errorMessage="Coupon code is required"
              rules={{
                onChange: (e: any) => {
                  // auto uppercase in UI (optional)
                  setValue("code", e.target.value.toUpperCase());
                },
              }}
            />
          </div>

          {/* Row 2: type + value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Discount Type"
              name="type"
              type="select"
              placeholder="Select type"
              options={typeOptions}
              control={control}
              register={register}
              errors={errors}
              required
              errorMessage="Type is required"
            />

            <FormField
              className="dark:bg-dark-2 bg-white"
              label={type === "percentage" ? "Value (%)" : "Value (৳)"}
              name="value"
              type="number"
              placeholder={type === "percentage" ? "10" : "200"}
              register={register}
              errors={errors}
              required
              errorMessage="Value is required"
              rules={{
                min: { value: 1, message: "Value must be at least 1" },
              }}
            />
          </div>

          {/* Row 4: scope + productIds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Scope"
              name="scope"
              type="select"
              placeholder="Select scope"
              options={scopeOptions}
              control={control}
              register={register}
              errors={errors}
              required
              errorMessage="Scope is required"
            />

            {scope === "products" && (
              <FormField
                className="dark:bg-dark-2 bg-white"
                label="Products"
                name="productIds"
                type="multi-select"
                placeholder="Select products"
                options={productIdOptions}
                control={control}
                register={register}
                errors={errors}
                required
                errorMessage="Select at least 1 product"
              />
            )}
            {scope === "categories" && (
              <FormField
                className="dark:bg-dark-2 bg-white"
                label="Categories"
                name="CategoriesIds"
                type="multi-select"
                placeholder="Select products"
                options={categoryIdOptions}
                control={control}
                register={register}
                errors={errors}
                required
                errorMessage="Select at least 1 product"
              />
            )}
          </div>

          {/* Row 5: startDate + endDate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Start Date (optional)"
              name="startDate"
              type="date"
              control={control}
              register={register}
              errors={errors}
            />

            <FormField
              className="dark:bg-dark-2 bg-white"
              label="End Date (optional)"
              name="endDate"
              type="date"
              control={control}
              register={register}
              errors={errors}
            />
          </div>

          {/* Row 6: usageLimit + perUserLimit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Total Usage Limit (optional)"
              name="usageLimit"
              type="number"
              placeholder="1000"
              register={register}
              errors={errors}
              rules={{
                min: { value: 1, message: "Usage limit must be >= 1" },
              }}
            />

            <FormField
              className="dark:bg-dark-2 bg-white"
              label="Per User Limit"
              name="perUserLimit"
              type="number"
              placeholder="1"
              register={register}
              errors={errors}
              required
              errorMessage="Per user limit is required"
              rules={{
                min: { value: 1, message: "Per user limit must be >= 1" },
              }}
            />
          </div>

          {/* isActive */}

          {/* Submit */}
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 rounded-md bg-green text-black font-medium disabled:opacity-60"
            >
              {isLoading ? "Creating..." : "Create Coupon"}
            </button>

            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 rounded-md  bg-red text-gray-2"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
