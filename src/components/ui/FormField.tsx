"use client";

import React, { useMemo, useState } from "react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectOption = string | { label: string; value: string };

type FormFieldType =
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
  | "radio"
  | "multi-select";

type FormFieldProps = {
  autoComplete?: string;
  label: string;
  name: string;
  errorMessage?: string;
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  control?: any;
  className?: string;
  type?: FormFieldType;
  placeholder?: string;
  options?: SelectOption[];
  required?: boolean;
  rules?: RegisterOptions;
  isArray?: boolean;
  fields?: { id: string }[];
  readOnly?: boolean;
  append?: () => void;
};

const normalizeOptions = (options: SelectOption[] = []) =>
  options.map((op) => (typeof op === "string" ? { label: op, value: op } : op));

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
  readOnly,
  append,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const error = useMemo(() => {
    if (!errors) return undefined;
    return name.split(".").reduce<any>((acc, key) => acc?.[key], errors);
  }, [errors, name]);

  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);

  // ✅ combobox helper: ComboBox যদি string[] expect করে, label list pass করছি
  const comboBoxOptions = useMemo(
    () => normalizedOptions.map((o) => o.label),
    [normalizedOptions],
  );

  if (isArray && fields.length > 0) {
    return (
      <div className="w-full">
        <label className="block font-semibold mb-2 ">{label}</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 mb-2">
            <input
              autoComplete={autoComplete}
              readOnly={readOnly}
              {...register(`${name}.${index}.value`, {
                required: required ? errorMessage : false,
                ...rules,
              })}
              className={`flex-1 px-4 py-2 border border-gray-6 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all ${className}`}
              placeholder={placeholder || label}
            />
            {index === fields.length - 1 && append && (
              <button
                type="button"
                onClick={append}
                className="bg-blue px-3 rounded"
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

      {/* FILE */}
      {type === "file" ? (
        <Input
          autoComplete={autoComplete}
          readOnly={readOnly}
          id={name}
          {...register(name, {
            required: required ? errorMessage : false,
            ...rules,
          })}
          type="file"
          placeholder={placeholder}
        />
      ) : type === "date" ? (
        /* DATE */
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
                        : placeholder || "Select date"}
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
                value={field.value}
                options={comboBoxOptions}
                placeholder={placeholder}
                onSelect={(value) => field.onChange(value)}
                className={`${className} border-gray-6 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all`}
              />
            )}
          />
        </div>
      ) : type === "multi-select" ? (
        /* MULTI SELECT (label+value support) */
        <div className="space-y-2 w-full">
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? errorMessage : false }}
            defaultValue={[]}
            render={({ field }) => {
              const selected: string[] = Array.isArray(field.value)
                ? field.value
                : [];

              const selectedLabels = selected.map(
                (val) =>
                  normalizedOptions.find((o) => o.value === val)?.label || val,
              );

              return (
                <>
                  <Select
                    onValueChange={(val) => {
                      if (!val) return;
                      if (selected.includes(val)) return;
                      field.onChange([...selected, val]); // ✅ store only value (id)
                    }}
                  >
                    <SelectTrigger
                      className={`w-full border py-6 border-gray-6 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all ${className}`}
                    >
                      <SelectValue
                        placeholder={placeholder || "Select options"}
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {normalizedOptions.map((op) => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selected.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selected.map((val, idx) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() =>
                            field.onChange(selected.filter((x) => x !== val))
                          }
                          className="px-2 py-1 bg-gray-5 rounded-md border text-sm text-white border-gray-6 dark:text-white"
                          title="Click to remove"
                        >
                          {selectedLabels[idx]} ✕
                        </button>
                      ))}
                    </div>
                  )}
                </>
              );
            }}
          />
        </div>
      ) : type === "textarea" ? (
        /* TEXTAREA */
        <textarea
          {...register(name, {
            required: required ? errorMessage : false,
            ...rules,
          })}
          autoComplete={autoComplete}
          readOnly={readOnly}
          id={name}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border border-gray-6 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all ${className}`}
          rows={name === "address" ? 4 : 9}
        />
      ) : type === "radio" ? (
        /* RADIO (label+value support) */
        <div className="flex gap-5 flex-wrap">
          {normalizedOptions.map((opt) => (
            <label
              htmlFor={`${name}-${opt.value}`}
              key={opt.value}
              className="flex items-center gap-2 text-white"
            >
              <Input
                autoComplete={autoComplete}
                readOnly={readOnly}
                id={`${name}-${opt.value}`}
                type="radio"
                value={opt.value}
                {...register(name, {
                  required: required ? errorMessage : false,
                  ...rules,
                })}
              />
              {opt.label}
            </label>
          ))}
        </div>
      ) : type === "select" ? (
        /* SELECT (label+value support) */
        <div className="space-y-1 w-full">
          <Controller
            name={name}
            control={control}
            rules={{ required: required ? errorMessage : false }}
            render={({ field }) => (
              <Select
                value={field.value ?? ""} // ✅ default show
                onValueChange={(val) => {
                  field.onChange(val);
                  if (rules?.onChange) {
                    rules.onChange({ target: { value: val } } as any);
                  }
                }}
              >
                <SelectTrigger
                  className={`w-full border py-6 border-gray-6 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all ${className}`}
                >
                  <SelectValue placeholder={placeholder || "Select"} />
                </SelectTrigger>

                <SelectContent>
                  {normalizedOptions.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      ) : (
        /* DEFAULT INPUT */
        <div className="relative">
          <input
            autoComplete={autoComplete}
            id={name}
            readOnly={readOnly}
            {...register(name, {
              required: required ? errorMessage : false,
              ...rules,
            })}
            type={
              type === "password" ? (showPassword ? "text" : "password") : type
            }
            placeholder={placeholder}
            className={`w-full px-4 py-3 relative border border-gray-6 rounded-lg focus:ring-1 focus:ring-pink focus:border-pink outline-none transition-all dark:text-white ${className}`}
          />

          {type === "password" && (
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            >
              {!showPassword ? (
                <Eye size={20} className="absolute top-3 right-5" />
              ) : (
                <EyeOff size={20} className="absolute top-3 right-5" />
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
