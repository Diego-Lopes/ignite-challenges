import { createContext, ReactNode, useEffect, useState } from "react";
import { dataMock } from "../components/ListCoffees/Mock/data";

type CardCoffeeProps = {
  id: number,
  urlImg: string,
  titleProduct: string,
  isSelected: boolean,
  price: string,
  amount: number
};

export interface DataProps {
  id: number;
  urlImg: string;
  flag: string[];
  titleProduct: string;
  subTitleProduct: string;
  price: string;
  stock: string;
  isSelected: boolean;
}

interface StorageContextProps {
  data: DataProps[];
  onChangeShoppingCart: (value: CardCoffeeProps) => void;
}

export const StorageContext = createContext({} as StorageContextProps);

interface StorageContextProviderProps {
  children: ReactNode;
}
export function StorageContextProvider({
  children,
}: StorageContextProviderProps) {
  const [data, setData] = useState<DataProps[]>([]);
  const [shoppingCart, setShoppingCart] = useState<CardCoffeeProps[]>([]);
  
  useEffect(() => {
    setData(dataMock);
  }, []);

  useEffect(() => {
    window.sessionStorage.setItem(
      "@ignite-CoffeeDelivry:data-1.0.0",
      JSON.stringify(data)
    );

  }, [data])

  console.log({ data, shoppingCart });

  function onChangeShoppingCart(value: CardCoffeeProps) {
    setShoppingCart([...shoppingCart, value]);
    modificationState(value.id)
  }

  function modificationState(idItem: number) {
    data.filter(item => item.id === idItem).map(coffee => {
      return coffee.isSelected = true;
    })
  }

  useEffect(() => {
    window.sessionStorage.setItem(
      "@ignite-CoffeeDelivry:order-1.0.0",
      JSON.stringify(shoppingCart)
    );
  }, [shoppingCart]);

  return (
    <StorageContext.Provider
      value={{
        data,
        onChangeShoppingCart,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
