

import React from "react";

import { createPortal } from "react-dom";

import { IoIosClose } from "react-icons/io";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  full: "max-w-full mx-4",
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "lg",
}) => {

  if (!isOpen) return null;

  return createPortal(

    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/50
        p-3
      "
    >

      {/* MODAL */}

      <div
        className={`
          relative
          w-full
          ${sizeClasses[size]}
          bg-white
          rounded-xl
          shadow-2xl
          animate-fadeIn
        `}
      >

        {/* HEADER */}

        <div className="flex items-center justify-between p-4">

          <h2 className="text-lg font-semibold text-gray-800">

            {title}

          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex
              items-center
              justify-center
              w-8
              h-8
              rounded-lg
              hover:bg-gray-100
              transition
            "
          >

            <IoIosClose className="w-7 h-7 text-red-500" />

          </button>

        </div>

        {/* BODY */}

        <div className="p-4 md:p-5">

          {children}

        </div>

      </div>

    </div>,

    document.body

  );

};

export default Modal;