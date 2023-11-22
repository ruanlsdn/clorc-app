import React, { createContext, useContext, useState } from "react";
import { iProduct } from "../interfaces";

type DataControlContextProps = {
  selectedProduct: iProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<iProduct | null>>;
  products: iProduct[];
  setProducts: React.Dispatch<React.SetStateAction<iProduct[]>>;
  refreshProducts: boolean
  setRefreshProducts: React.Dispatch<React.SetStateAction<boolean>>;
};

type props = {
  children: React.ReactNode;
};

const DataControlContext = createContext<DataControlContextProps>(null!);

export const DataControlProvider = ({ children }: props) => {
  const [selectedProduct, setSelectedProduct] = useState<iProduct | null>(null!);
  const [products, setProducts] = useState<iProduct[]>([]);
  const [refreshProducts, setRefreshProducts] = useState<boolean>(null!);

  return (
    <DataControlContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        products,
        setProducts,
        refreshProducts, 
        setRefreshProducts
      }}
    >
      {children}
    </DataControlContext.Provider>
  );
};

export default function useDataControlContext() {
  return useContext(DataControlContext);
}
