// this is shoppingcart

import { ReactNode, createContext, useState } from "react";

interface DataProps {
  id: string;
  imgUrl: string;
  title: string;
  price: string;
}

interface LocalStorageShoppingCartContextProps {
  data: DataProps[];
  countInTheShoppcart: number;
}

export const LocalStorageShoppcartContext = createContext(
  {} as LocalStorageShoppingCartContextProps
);

interface ShoppingCartLocalStorageProviderProps {
  children: ReactNode;
}

export function ShoppingcartLocalStorageProvider({
  children,
}: ShoppingCartLocalStorageProviderProps) {
  const [data, setData] = useState<DataProps[]>([]);
  const [countInTheShoppcart, setCountInTheShoppcart] = useState(0);

  //add in shoppcart

  return (
    <LocalStorageShoppcartContext.Provider
      value={{ data, countInTheShoppcart }}
    >
      {children}
    </LocalStorageShoppcartContext.Provider>
  );
}
