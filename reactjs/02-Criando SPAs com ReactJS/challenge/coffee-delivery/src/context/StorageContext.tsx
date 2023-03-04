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
  countInTheCart: number;
  shoppingCart: CardCoffeeProps[];
  onChangeShoppingCart: (value: CardCoffeeProps) => void;
  onSubAmount: (value: number) => void;
  onAddAmount: (value: number) => void;
  onRemovedItem: (value: number) => void;
  onChangeRemoveShoppingCart: (value: number) => void;
  onFinishedShoppingCart: () => void;
  isToggle: boolean;
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
  const [countInTheCart, setCountInTheCart] = useState<number>(0);
  const [isToggle, setIsToggle] = useState(false);

  // console.log({ countInTheCart });

  // console.log({ shoppingCart });

  useEffect(() => {
    const dataLocaStorage: DataProps[] = JSON.parse(
      String(window.localStorage.getItem("@ignite-CoffeeDelivry:data-1.0.0"))
    );

    const shoppingCartOrders: CardCoffeeProps[] = JSON.parse(
      String(window.localStorage.getItem("@ignite-CoffeeDelivry:order-1.0.0"))
    );

    // console.log(dataLocaStorage);

    if (dataLocaStorage !== null && shoppingCartOrders !== null) {
      if (dataLocaStorage.length > 0) {
        setShoppingCart(shoppingCartOrders);
        return setData(dataLocaStorage);
      }
    } else {
      setData(dataMock);
    }
  }, [isToggle]);

  useEffect(() => {
    window.localStorage.setItem(
      "@ignite-CoffeeDelivry:data-1.0.0",
      JSON.stringify(data)
    );
  }, [data, shoppingCart, isToggle]);

  // console.log({ data, shoppingCart });

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

  function onSubAmount(id: number) {
    shoppingCart
      .filter((filterItem) => filterItem.id === id)
      .map((item) => {
        if (item.amount > 1) {
          item.amount = item.amount - 1;
        }
        return;
      });
    setIsToggle(!isToggle);
    window.localStorage.setItem(
      "@ignite-CoffeeDelivry:order-1.0.0",
      JSON.stringify(shoppingCart)
    );
  }

  function onAddAmount(id: number) {
    shoppingCart
      .filter((filterItem) => filterItem.id === id)
      .map((item) => {
        if (item.amount < 99) {
          item.amount = item.amount + 1;
        }
        return;
      });
    setIsToggle(!isToggle);
    window.localStorage.setItem(
      "@ignite-CoffeeDelivry:order-1.0.0",
      JSON.stringify(shoppingCart)
    );
  }

  function onRemovedItem(id: number) {
    console.log("entrou");
    let newArray = [];
    newArray = shoppingCart.filter((filterItem) => filterItem.id !== id);
    modificationStateNoSelected(id);
    window.localStorage.setItem(
      "@ignite-CoffeeDelivry:order-1.0.0",
      JSON.stringify(newArray)
    );
    setIsToggle(!isToggle);
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
        if (coffee.isSelected === false) {
          coffee.isSelected = true;
          window.localStorage.setItem(
            "@ignite-CoffeeDelivry:data-1.0.0",
            JSON.stringify(data)
          );
        } else {
          coffee.isSelected = false;
          window.localStorage.setItem(
            "@ignite-CoffeeDelivry:data-1.0.0",
            JSON.stringify(data)
          );
        }
      });
  }

  //adiciona no carrinho
  useEffect(() => {
    window.localStorage.setItem(
      "@ignite-CoffeeDelivry:order-1.0.0",
      JSON.stringify(shoppingCart)
    );
    let isManyInTheCart = JSON.parse(
      String(window.localStorage.getItem("@ignite-CoffeeDelivry:order-1.0.0"))
    );
    setCountInTheCart(isManyInTheCart.length);
  }, [data, shoppingCart]);

  function onFinishedShoppingCart() {
    window.localStorage.removeItem("@ignite-CoffeeDelivry:order-1.0.0");
    setCountInTheCart(0);
  }

  return (
    <StorageContext.Provider
      value={{
        data,
        shoppingCart,
        countInTheCart,
        onChangeShoppingCart,
        onChangeRemoveShoppingCart,
        onSubAmount,
        onAddAmount,
        onRemovedItem,
        onFinishedShoppingCart,
        isToggle,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
}
