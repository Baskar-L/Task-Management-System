import React from "react";

import Modal from "./Modal";

const SessionExpired = ({
  isOpen,
}) => {

  return (

    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      title="Session Expired"
      size="sm"
    >

      <div
        className="
          text-center
          py-4
          flex
          flex-col
          items-center
        "
      >

        {/* ICON */}

        <div
          className="
            bg-red-100
            p-3
            rounded-full
            mb-3
          "
        >

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="
              w-8
              h-8
              text-red-500
            "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="
                M12 9v3
                m0 4h.01
                M5.07 19h13.86
                c1.54 0 2.5-1.67 1.73-3
                L13.73 4
                c-.77-1.33-2.69-1.33-3.46 0
                L3.34 16
                c-.77 1.33.19 3 1.73 3z
              "
            />

          </svg>

        </div>

        {/* TITLE */}

        <p
          className="
            text-gray-700
            text-sm
            font-medium
          "
        >

          Your session has expired

        </p>

        {/* DESCRIPTION */}

        <p
          className="
            text-gray-500
            text-xs
            mt-1
          "
        >

          Please login again to continue using the system

        </p>

        {/* LOADING */}

        <p
          className="
            text-red-500
            mt-4
            font-semibold
            animate-pulse
          "
        >

          Logging out...

        </p>

      </div>

    </Modal>

  );

};

export default SessionExpired;