import React from "react";
import { FaXmark } from "react-icons/fa6";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4 backdrop-blur-sm">
      <div className="bg-white bg-pixels bg-no-repeat bg-right-top p-6 rounded-lg w-full md:w-1/3 md:min-w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 z-10 transition hover:text-[#004D61]"
        >
          <FaXmark />
        </button>
        {children}
      </div>
    </div>
  );
}
