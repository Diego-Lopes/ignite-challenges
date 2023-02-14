import { createContext, ReactNode, useEffect, useState } from "react";
import { dataMock } from "../components/ListCoffees/Mock/data";

type CardCoffeeProps = {
  id: number;
  urlImg: string;
  titleProduct: string;
  isSelected: boolean;
  price: string;
  amount: number;
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
  onChangeRemoveShoppingCart: (value: number) => void;
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
    const dataLocaStorage: DataProps[] = JSON.parse(
      String(window.localStorage.getItem("@ignite-CoffeeDelivry:data-1.0.0"))
    );

    const shoppingCartOrders: CardCoffeeProps[] = JSON.parse(
      String(window.localStorage.getItem("@ignite-CoffeeDelivry:order-1.0.0"))
    );

    console.log(dataLocaStorage);

    if (dataLocaStorage !== null && shoppingCartOrders !== null) {
      if (dataLocaStorage.length > 0) {
        setShoppingCart(shoppingCartOrders);
        return setData(dataLocaStorage);
      }
      if (shoppingCartOrders.length > 0) {
      }
    } else {
      setData(dataMock);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "@ignite-CoffeeDelivry:data-1.0.0",
      JSON.stringify(data)
    );
  }, [data, shoppingCart]);

  console.log({ data, shoppingCart });

  function onChangeShoppingCart(value: CardCoffeeProps) {
    setShoppingCart([...shoppingCart, value]);
    modificationStateSelected(value.id);
  }

  function onChangeRemoveShoppingCart(valueId: number) {
    const newData: CardCoffeeProps[] = shoppingCart
      .filter((item) => item.id !== valueId)
      .map((coffee) => coffee);

    modificationStateNoSelected(valueId);
    setShoppingCart(newData);
  }

  function modificationStateSelected(idItem: number) {
    data
      .filter((item) => item.id === idItem)
      .map((coffee) => {
        return (coffee.isSelected = true);
      });

    setData(data);
  }

  function modificationStateNoSelected(idItem: number) {
    data
      .filter((item) => item.id === idItem)
      .map((coffee) => {
        coffee.isSelected = false;
      });
  }

  //adiciona no carrinho
  useEffect(() => {
    window.localStorage.setItem(
      "@ignite-CoffeeDelivry:order-1.0.0",
      JSON.stringify(shoppingCart)
    );
  }, [data, shoppingCart]);

  return (
    <StorageContext.Provider
      value={{
        data,
        onChangeShoppingCart,
        onChangeRemoveShoppingCart,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
