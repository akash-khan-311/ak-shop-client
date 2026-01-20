import { FC, ReactNode, useState } from "react";

interface ConfirmationModalProps {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
  children?: ReactNode; // optional icon or element
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({
  title = "Are you sure?",
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  children,
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center backdrop-blur-md bg-[#000]/30 z-999999">
      <div className="bg-white dark:bg-dark border border-gray-6 rounded-lg p-6 w-full max-w-lg shadow-lg">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        {children}
        <p className="text-gray-700 dark:text-gray-300 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-dark-2 border border-gray-6 hover:bg-dark-3 duration-150 rounded "
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 bg-red-light text-white rounded hover:bg-red-dark duration-150 disabled:opacity-50"
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
