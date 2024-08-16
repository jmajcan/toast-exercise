import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ToastContext.Provider value={{ open, setOpen }}>
      {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  return useContext(ToastContext);
};

export { ToastProvider, useToast };