"use client";
import React, { useState } from "react";
import {
  Controller,
  FieldErrors,
  UseFormRegister,
  RegisterOptions,
} from "react-hook-form";

import ComboBox from "@/components/ui/combo-box";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

type FormFieldProps = {
  label: string;
  name: string;
  errorMessage?: string;
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  control?: any;
  className?: string;
  type?:
    | "text"
    | "email"
    | "number"
    | "date"
    | "file"
    | "textarea"
    | "select"
    | "checkbox"
    | "password"
    | "combobox"
    | "radio";
  placeholder?: string;
  options?: string[];
  required?: boolean;
  rules?: RegisterOptions;
  isArray?: boolean;
  fields?: { id: string }[];
  append?: () => void;
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  errorMessage,
  name,
  register,
  errors,
  type = "text",
  placeholder,
  options = [],
  required = false,
  isArray = false,
  fields = [],
  rules,
  control,
  className,
  append,
}) => {
  const error = errors?.[name];

  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Dynamic array input
  if (isArray && fields.length > 0) {
    return (
      <div className="w-full">
        <label className="block font-semibold mb-2 ">{label}</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`${name}.${index}.value`, {
                required: required ? errorMessage : false,
                ...rules,
              })}
              className={`flex-1 px-4 py-2 border  border-gray-6 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all ${className}`}
              placeholder={placeholder || label}
            />
            {index === fields.length - 1 && append && (
              <button
                type="button"
                onClick={append}
                className="bg-blue  px-3 rounded"
              >
                +
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1 w-full">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-7 dark:text-gray-4 "
      >
        {label}
        {required && <span className="text-red"> *</span>}
      </label>

      {type === "file" ? (
        <Input
          id={name}
          {...register(name, {
            required: required ? errorMessage : false,
            ...rules,
          })}
          type={type}
          placeholder={placeholder}
        />
      ) : type === "date" ? (
        <div className="space-y-1 w-full">
          <Controller
            control={control}
            name={name}
            rules={{ required: required ? errorMessage : false }}
            render={({ field }) => {
              const selectedDate = field.value
                ? new Date(field.value)
                : undefined;

              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "Select date"}
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      captionLayout="dropdown"
                      onSelect={(date) => field.onChange(date?.toISOString())}
                    />
                  </PopoverContent>
                </Popover>
              );
            }}
          />
        </div>
      ) : type === "combobox" ? (
        <div className="space-y-1 w-full">
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? errorMessage : false }}
            render={({ field }) => (
              <ComboBox
                options={options || []}
                placeholder={placeholder}
                onSelect={(value) => field.onChange(value)}
                className={className}
              />
            )}
          />
        </div>
      ) : type === "textarea" ? (
        <textarea
          {...register(name, {
            required: required ? errorMessage : false,
            ...rules,
          })}
          id={name}
          placeholder={placeholder}
          className={`w-full px-4 py-2  border border-gray-3 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all ${className}`}
          rows={name === "address" ? 4 : 9}
        />
      ) : type === "radio" ? (
        <div className="flex gap-5">
          {options.map((opt) => (
            <label
              htmlFor={opt}
              key={opt}
              className="flex items-center gap-2 text-white"
            >
              <Input
                id={opt}
                className=""
                type="radio"
                value={opt}
                {...register(name, {
                  required: required ? errorMessage : false,
                  ...rules,
                })}
              />
              {opt}
            </label>
          ))}
        </div>
      ) : (
        <div className="relative">
          <input
            id={name}
            {...register(name, {
              required: required ? errorMessage : false,
              ...rules,
            })}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            className={`w-full px-4 py-3 relative border border-gray-6 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all dark:text-white  ${className}`}
          />
          {type === "password" && (
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {type === "password" && !showPassword ? (
                <Eye size={20} className="absolute top-3 right-5" />
              ) : (
                <EyeOff size={20} className="absolute top-3 right-5  " />
              )}
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="text-red-dark text-sm">{error.message as string}</p>
      )}
    </div>
  );
};

export default FormField;
