import { Check } from "lucide-react";

type Props = {
  orderId: string;
  currentStatus: string;
  handleStatusChange: (orderId: string, newStatus: string) => void;
};

export const StatusDropdown = ({
  orderId,
  currentStatus,
  handleStatusChange,
}: Props) => {
  const statuses = ["Processing", "Pending", "Delivered", "Cancelled"];

  return (
    <div className="absolute  right-0 mt-1 w-full bg-white dark:bg-dark rounded-lg shadow-lg z-50 border border-gray-700">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => handleStatusChange(orderId, status)}
          className="w-full px-4 py-2 text-left text-sm  hover:bg-orange/10 dark:hover:bg-dark-3 first:rounded-t-lg last:rounded-b-lg flex items-center justify-between"
        >
          {status}
          {currentStatus === status && (
            <Check className="w-4 h-4 text-green-400" />
          )}
        </button>
      ))}
    </div>
  );
};
