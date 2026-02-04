"use client";

import { FC, ReactNode, useEffect, useState } from "react";

interface ConfirmationModalProps {
  isLoading?: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  children?: ReactNode;
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
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // ✅ open animation: start hidden then animate in
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    // next frame -> animate in
    const id = requestAnimationFrame(() => setIsEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const closeWithAnimation = () => {
    if (isClosing) return;
    setIsClosing(true);
    setIsEntered(false);

    setTimeout(() => {
      setIsVisible(false);
      onCancel?.();
    }, 200); // must match duration-200
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWithAnimation();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosing]);

  const handleConfirm = async () => {
    try {
      await onConfirm();
      closeWithAnimation();
    } catch {
      // keep modal open if confirm fails
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center">
      {/* overlay */}
      <div
        onClick={closeWithAnimation}
        className={`absolute inset-0 backdrop-blur-md bg-black/30 transition-opacity duration-200 ${
          isEntered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        className={`relative w-full max-w-lg rounded-lg bg-white dark:bg-dark border border-gray-6 shadow-lg p-6
        transform transition-all duration-200
        ${isEntered ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        {title && (
          <h2 className="text-xl md:text-2xl lg:text-3xl text-red font-semibold mb-4 text-center">
            {title}
          </h2>
        )}

        {children}

        <p className="text-center mb-4">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeWithAnimation}
            disabled={isLoading}
            className="px-4 py-2 dark:bg-dark-2 bg-transparent border border-gray-6 dark:hover:bg-dark-3 duration-150 rounded text-center disabled:opacity-50"
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
