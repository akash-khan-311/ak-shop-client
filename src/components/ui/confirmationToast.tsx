import { FC, ReactNode, useState } from "react";

interface ConfirmationModalProps {
  isLoading?: boolean;
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
  isLoading,
}) => {
  const handleConfirm = async () => {
    try {
      const result = await onConfirm();
      console.log("this is confirm delete", result);
    } finally {
    }
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center backdrop-blur-md bg-[#000]/30 z-999999">
      <div className="bg-white dark:bg-dark border border-gray-6 rounded-lg p-6 w-full max-w-lg shadow-lg flex flex-col items-center justify-center">
        {title && (
          <h2 className="text-xl md:text-2xl lg:text-3xl text-red font-semibold mb-4 text-center">
            {title}
          </h2>
        )}
        {children}
        <p className="text-center mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-dark-2 border border-gray-6 hover:bg-dark-3 duration-150 rounded text-center"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-light text-white rounded hover:bg-red-dark duration-150 disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
