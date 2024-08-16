import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [submission, setSubmission] = useState({});

  return (
    <ToastContext.Provider
      value={{
        open, setOpen,
        submission, setSubmission
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  return useContext(ToastContext);
};

export { ToastProvider, useToast };