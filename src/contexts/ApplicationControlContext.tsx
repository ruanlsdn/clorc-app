import React, { createContext, useContext, useState } from "react";
import { ActionEnum } from "../enums/ActionEnum";

type ApplicationControlContextProps = {
  action: ActionEnum;
  setAction: React.Dispatch<React.SetStateAction<ActionEnum>>;
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
  const [action, setAction] = useState(ActionEnum.NONE);
  const [isAdaptedDialogOpen, setIsAdaptedDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <ApplicationControlContext.Provider
      value={{
        action,
        setAction,
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
