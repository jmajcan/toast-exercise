import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  return (
    <ToastContext.Provider
      value={{
        open, setOpen,
        submissions, setSubmissions
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