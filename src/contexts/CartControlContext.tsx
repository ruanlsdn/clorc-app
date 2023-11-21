import React, { createContext, useContext, useState } from "react";
import { iCartProduct, iProduct } from "../interfaces";

type CartControlContextProps = {
  selectedProduct: iProduct | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<iProduct | null>>;
  cartProducts: iCartProduct[];
  setCartProducts?: React.Dispatch<React.SetStateAction<iCartProduct | null>>;
  upsertProductOnCart: (product: iCartProduct) => void;
  removeProductFromCart: (productId: string) => void;
  removeAllProductsFromCart: () => void;
  getProductQuantityOnCart: (productId: string) => number;
  getTotalQuantityOnCart: () => number;
  getTotalPriceOnCart: () => string;
};

type props = {
  children: React.ReactNode;
};

const CartControlContext = createContext<CartControlContextProps>(null!);

export const CartControlProvider = ({ children }: props) => {
  const [selectedProduct, setSelectedProduct] = useState<iProduct | null>(null);
  const [cartProducts, setCartProducts] = useState<iCartProduct[]>([]);

  const upsertProductOnCart = (product: iCartProduct) => {
    const idx = cartProducts.findIndex((item) => item.id === product.id);

    if (idx < 0) {
      cartProducts.push(product);
    } else {
      cartProducts[idx].quantity = product.quantity;
    }
  };

  const getProductQuantityOnCart = (productId: string) => {
    const idx = cartProducts.findIndex((item) => item.id === productId);

    if (idx < 0) {
      return 0;
    } else {
      return cartProducts[idx].quantity;
    }
  };

  const getTotalQuantityOnCart = () => {
    let quantity = 0;

    cartProducts.forEach((item) => {
      quantity += item.quantity;
    });

    return quantity;
  };

  const getTotalPriceOnCart = () => {
    let price = 0;

    cartProducts.forEach((item) => {
      price += item.price! * item.quantity;
    });

    return price.toFixed(2);
  };

  const removeProductFromCart = (productId: string) => {
    setCartProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  const removeAllProductsFromCart = () => {
    setCartProducts([]);
  };

  return (
    <CartControlContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        cartProducts,
        upsertProductOnCart,
        removeProductFromCart,
        removeAllProductsFromCart,
        getProductQuantityOnCart,
        getTotalQuantityOnCart,
        getTotalPriceOnCart,
      }}
    >
      {children}
    </CartControlContext.Provider>
  );
};

export default function useCartControlContext() {
  return useContext(CartControlContext);
}
