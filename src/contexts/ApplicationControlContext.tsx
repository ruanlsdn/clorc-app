import React, { createContext, useContext, useState } from "react";

type ApplicationControlContextProps = {
  isCreateProductDialogOpen: boolean;
  setIsCreateProductDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isEditProductDialogOpen: boolean;
  setIsEditProductDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteProductAlertOpen: boolean;
  setIsDeleteProductAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isIncreaseAmountAlertOpen: boolean;
  setIsIncreaseAmountAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOrderInfoAlertOpen: boolean;
  setIsOrderInfoAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSellReportSettingsDialogOpen: boolean;
  setIsSellReportSettingsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type props = {
  children: React.ReactNode;
};

const ApplicationControlContext = createContext<ApplicationControlContextProps>(
  null!
);

export const ApplicationControlProvider = ({ children }: props) => {
  const [isCreateProductDialogOpen, setIsCreateProductDialogOpen] =  useState(false);
  const [isEditProductDialogOpen, setIsEditProductDialogOpen] = useState(false);
  const [isDeleteProductAlertOpen, setIsDeleteProductAlertOpen] = useState(false);
  const [isIncreaseAmountAlertOpen, setIsIncreaseAmountAlertOpen] = useState(false);
  const [isOrderInfoAlertOpen, setIsOrderInfoAlertOpen] = useState(false);
  const [isSellReportSettingsDialogOpen, setIsSellReportSettingsDialogOpen] = useState(false);

  return (
    <ApplicationControlContext.Provider
      value={{
        isCreateProductDialogOpen,
        setIsCreateProductDialogOpen,
        isEditProductDialogOpen,
        setIsEditProductDialogOpen,
        isDeleteProductAlertOpen,
        setIsDeleteProductAlertOpen,
        isIncreaseAmountAlertOpen,
        setIsIncreaseAmountAlertOpen,
        isOrderInfoAlertOpen,
        setIsOrderInfoAlertOpen,
        isSellReportSettingsDialogOpen,
        setIsSellReportSettingsDialogOpen
      }}
    >
      {children}
    </ApplicationControlContext.Provider>
  );
};

export default function useApplicationControlContext() {
  return useContext(ApplicationControlContext);
}
