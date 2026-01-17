export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

export type Action<T> = {
  icon: React.ReactNode;
  onClick: (row: T) => void;
};

export type FilterConfig = {
  search?: boolean;
  category?: {
    label: string;
    options: string[];
  };
  sort?: {
    label: string;
    options: string[];
  };
};
