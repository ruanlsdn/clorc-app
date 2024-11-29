import React, { createContext, useContext, useState } from 'react';
import { iCard, iProduct } from '../interfaces';

type DataControlContextProps = {
  products: iProduct[];
  setProducts: React.Dispatch<React.SetStateAction<iProduct[]>>;
  cards: iCard[];
  setCards: React.Dispatch<React.SetStateAction<iCard[]>>;
  selectedProduct: iProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<iProduct | null>>;
  selectedCard: iCard | null;
  setSelectedCard: React.Dispatch<React.SetStateAction<iCard | null>>;
  refreshProducts: boolean;
  setRefreshProducts: React.Dispatch<React.SetStateAction<boolean>>;
  refreshCards: boolean;
  setRefreshCards: React.Dispatch<React.SetStateAction<boolean>>;
};

type props = {
  children: React.ReactNode;
};

const DataControlContext = createContext<DataControlContextProps>(null!);

export const DataControlProvider = ({ children }: props) => {
  const [products, setProducts] = useState<iProduct[]>([]);
  const [cards, setCards] = useState<iCard[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<iProduct | null>(null!);
  const [selectedCard, setSelectedCard] = useState<iCard | null>(null!);
  const [refreshProducts, setRefreshProducts] = useState<boolean>(null!);
  const [refreshCards, setRefreshCards] = useState<boolean>(null!);

  return (
    <DataControlContext.Provider
      value={{
        products,
        setProducts,
        cards,
        setCards,
        selectedProduct,
        setSelectedProduct,
        selectedCard,
        setSelectedCard,
        refreshProducts,
        setRefreshProducts,
        refreshCards,
        setRefreshCards,
      }}
    >
      {children}
    </DataControlContext.Provider>
  );
};

export default function useDataControlContext() {
  return useContext(DataControlContext);
}
