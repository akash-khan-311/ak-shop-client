"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CustomSelectProps = {
  options: string[];
  value?: string; // controlled
  defaultValue?: string; // uncontrolled
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
};

const CustomSelect = ({
  options,
  value,
  defaultValue = "All Categories",
  placeholder = "Select option",
  onChange,
  className,
}: CustomSelectProps) => {
  return (
    <Select
      value={value}
      defaultValue={value ? undefined : defaultValue}
      onValueChange={(val) => onChange?.(val)}
    >
      <SelectTrigger
        className={` w-full rounded-none px-3 py-6 dark:bg-dark
    focus:outline-none
    focus:ring-0
    focus:ring-offset-0
    focus-visible:outline-none
    focus-visible:ring-0
    focus-visible:ring-offset-0  ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="z-9999 overflow-auto ">
        <SelectGroup className="">
          {options.map((o) => (
            <SelectItem key={o} value={o}>
              {o}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
