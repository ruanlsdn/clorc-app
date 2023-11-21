import React, { createContext, useContext, useState } from "react";
import { iProduct } from "../interfaces";

type DataControlContextProps = {
  products: iProduct[];
  setProducts: React.Dispatch<React.SetStateAction<iProduct[]>>;
};

type props = {
  children: React.ReactNode;
};

const DataControlContext = createContext<DataControlContextProps>(null!);

export const DataControlProvider = ({ children }: props) => {
  const [products, setProducts] = useState<iProduct[]>([]);

  return (
    <DataControlContext.Provider
      value={{
        products,
        setProducts,
      }}
    >
      {children}
    </DataControlContext.Provider>
  );
};

export default function useDataControlContext() {
  return useContext(DataControlContext);
}
