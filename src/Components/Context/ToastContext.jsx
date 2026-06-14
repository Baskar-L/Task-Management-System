import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  SuccessMessage,
  FailedMessage,
  WarningMessage,
} from "../Helpers/Toast";

const ToastContext = createContext();

export const ToastProvider = ({
  children,
}) => {

  const [toast, setToast] = useState({
    type: "",
    message: "",
    id: null,
  });

  const showToast = (
    type,
    message
  ) => {

    setToast({
      type,
      message,
      id: Date.now(),
    });

  };

  return (
    <ToastContext.Provider
      value={{ showToast }}
    >

      {children}

      {/* GLOBAL TOAST */}

      {toast.type === "success" && (
        <SuccessMessage
          key={toast.id}
          message={toast.message}
        />
      )}

      {toast.type === "error" && (
        <FailedMessage
          key={toast.id}
          message={toast.message}
        />
      )}

      {toast.type === "warning" && (
        <WarningMessage
          key={toast.id}
          message={toast.message}
        />
      )}

    </ToastContext.Provider>
  );
};

export const useToast = () =>
  useContext(ToastContext);