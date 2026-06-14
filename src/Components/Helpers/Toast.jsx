import React, { useEffect, useState } from "react";

/* =========================
   SUCCESS MESSAGE
========================= */

export function SuccessMessage({ message }) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [message]);

  if (!visible) return null;

  return (

    <div
      id="toast-success"
      role="alert"
      className="
        fixed
        top-5
        right-5
        z-[9999]
        flex
        items-center
        w-fit
        max-w-sm
        p-4
        rounded-xl
        shadow-xl
        bg-white
        border-l-4
        border-green-500
      "
    >

      {/* ICON */}

      <div
        className="
          inline-flex
          items-center
          justify-center
          w-9
          h-9
          rounded-full
          bg-green-500
          text-white
        "
      >

        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
        </svg>

      </div>

      {/* MESSAGE */}

      <div
        className="
          ms-3
          text-sm
          font-medium
          text-green-600
        "
      >
        {message}
      </div>

      {/* CLOSE BUTTON */}

      <button
        type="button"
        onClick={() => setVisible(false)}
        className="
          ms-auto
          inline-flex
          items-center
          justify-center
          w-8
          h-8
          rounded-lg
          hover:bg-gray-100
          text-green-500
          transition
        "
      >

        <svg
          className="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>

      </button>

    </div>
  );
}

/* =========================
   FAILED MESSAGE
========================= */

export function FailedMessage({ message }) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [message]);

  if (!visible) return null;

  return (

    <div
      id="toast-danger"
      role="alert"
      className="
        fixed
        top-5
        right-5
        z-[9999]
        flex
        items-center
        w-fit
        max-w-sm
        p-4
        rounded-xl
        shadow-xl
        bg-white
        border-l-4
        border-red-500
      "
    >

      {/* ICON */}

      <div
        className="
          inline-flex
          items-center
          justify-center
          w-9
          h-9
          rounded-full
          bg-red-500
          text-white
        "
      >

        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
        </svg>

      </div>

      {/* MESSAGE */}

      <div
        className="
          ms-3
          text-sm
          font-medium
          text-red-500
        "
      >
        {message}
      </div>

      {/* CLOSE BUTTON */}

      <button
        type="button"
        onClick={() => setVisible(false)}
        className="
          ms-auto
          inline-flex
          items-center
          justify-center
          w-8
          h-8
          rounded-lg
          hover:bg-gray-100
          text-red-500
          transition
        "
      >

        <svg
          className="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>

      </button>

    </div>
  );
}

/* =========================
   WARNING MESSAGE
========================= */

export function WarningMessage({ message }) {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

  }, [message]);

  if (!visible) return null;

  return (

    <div
      id="toast-warning"
      role="alert"
      className="
        fixed
        top-5
        right-5
        z-[9999]
        flex
        items-center
        w-fit
        max-w-sm
        p-4
        rounded-xl
        shadow-xl
        bg-white
        border-l-4
        border-orange-500
      "
    >

      {/* ICON */}

      <div
        className="
          inline-flex
          items-center
          justify-center
          w-9
          h-9
          rounded-full
          bg-orange-500
          text-white
        "
      >

        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
        </svg>

      </div>

      {/* MESSAGE */}

      <div
        className="
          ms-3
          text-sm
          font-medium
          text-orange-500
        "
      >
        {message}
      </div>

      {/* CLOSE BUTTON */}

      <button
        type="button"
        onClick={() => setVisible(false)}
        className="
          ms-auto
          inline-flex
          items-center
          justify-center
          w-8
          h-8
          rounded-lg
          hover:bg-gray-100
          text-orange-500
          transition
        "
      >

        <svg
          className="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>

      </button>

    </div>
  );
}