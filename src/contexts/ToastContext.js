import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const [ open, setOpen ] = useState(false);
  const [ submission, setSubmission ] = useState({});
  const [ hasSubmissionsChanged, setHasSubmissionsChanged] = useState(true);

  return (
    <ToastContext.Provider
      value={{
        open, setOpen,
        submission, setSubmission,
        hasSubmissionsChanged, setHasSubmissionsChanged
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