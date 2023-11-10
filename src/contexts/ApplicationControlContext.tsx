import React, { createContext, useContext, useState } from "react";

type ApplicationControlContextProps = {
  isAdaptedDialogOpen: boolean;
  setIsAdaptedDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAlertOpen: boolean;
  setIsAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ApplicationControlContext = createContext<ApplicationControlContextProps>(
  null!
);

type ChildrenProps = {
  children: React.ReactNode;
};

export const ApplicationControlProvider = ({ children }: ChildrenProps) => {
  const [isAdaptedDialogOpen, setIsAdaptedDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <ApplicationControlContext.Provider
      value={{
        isAdaptedDialogOpen,
        setIsAdaptedDialogOpen,
        isAlertOpen,
        setIsAlertOpen,
      }}
    >
      {children}
    </ApplicationControlContext.Provider>
  );
};

export default function useApplicationControlContext() {
  return useContext(ApplicationControlContext);
}
