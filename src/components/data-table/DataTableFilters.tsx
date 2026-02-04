export type FilterConfig = {
  key: string;
  type: "search" | "select" | "sort";
  placeholder?: string;
  options?: string[];
};
interface DataTableFiltersProps {
  filters: FilterConfig[];
  values: Record<string, string>;
  setValues: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onReset?: () => void;
}
export default function DataTableFilters({
  filters,
  values,
  setValues,
  onReset,
}: DataTableFiltersProps) {
  const handleChange = (key: string, value: string) => {
    setValues({ ...values, [key]: value });
  };

  return (
    <div className="dark:bg-dark bg-white shadow-xl rounded-lg p-4 mb-4 flex flex-col md:flex-row gap-3 items-center">
      {filters?.map((filter) => {
        if (filter.type === "search") {
          return (
            <input
              key={filter.key}
              type="text"
              placeholder={filter.placeholder}
              value={values[filter.key] || ""}
              onChange={(e) => handleChange(filter.key, e.target.value)}
              className="p-4 dark:bg-gray-7  bg-gray-3 w-full rounded focus:ring-2 focus:ring-green-500"
            />
          );
        }

        if (filter.type === "select" || filter.type === "sort") {
          return (
            <select
              key={filter.key}
              value={values[filter.key]}
              onChange={(e) => handleChange(filter.key, e.target.value)}
              className="p-4 dark:bg-gray-7 capitalize bg-gray-3 w-full rounded focus:ring-2 focus:ring-green-500"
            >
              {filter.options?.map((opt, indx) => (
                <option className="capitalize" key={indx} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          );
        }

        return null;
      })}

      <button
        onClick={onReset}
        className="py-4 px-6 bg-red text-white rounded hover:bg-red/90 w-full md:w-auto"
      >
        Reset
      </button>
    </div>
  );
}
