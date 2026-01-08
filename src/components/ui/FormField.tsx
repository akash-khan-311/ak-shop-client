"use client";
import React from "react";
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
import { ChevronDownIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

type FormFieldProps = {
  label: string;
  name: string;
  errorMessage?: string;
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  control?: any;
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
  append,
}) => {
  const error = errors?.[name];

  // 🔹 Dynamic array input
  if (isArray && fields.length > 0) {
    return (
      <div className="w-full">
        <label className="block font-semibold mb-2 text-white">{label}</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              {...register(`${name}.${index}.value`, {
                required: required ? errorMessage : false,
                ...rules,
              })}
              className="flex-1 px-4 py-2 border text-white border-gray-300 rounded-lg focus:ring-1 focus:ring-[#1BCDD2] focus:border-[#1BCDD2] outline-none transition-all"
              placeholder={placeholder || label}
            />
            {index === fields.length - 1 && append && (
              <button
                type="button"
                onClick={append}
                className="bg-blue-500 text-white px-3 rounded"
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
      <label htmlFor={name} className="text-sm font-medium text-white">
        {label}
        {required && <span className="text-red-600"> *</span>}
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
          className="w-full px-4 py-2 text-white border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#1BCDD2] focus:border-[#1BCDD2] outline-none transition-all"
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
        <input
          id={name}
          {...register(name, {
            required: required ? errorMessage : false,
            ...rules,
          })}
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all dark:text-white dark:bg-dark-4 dark:bg-transparent"
        />
      )}

      {error && (
        <p className="text-red-dark text-sm">{error.message as string}</p>
      )}
    </div>
  );
};

export default FormField;
