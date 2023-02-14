import { Minus, Plus, ShoppingCartSimple, X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { StorageContext } from "../../context/StorageContext";
import { dataMock } from "../ListCoffees/Mock/data";
import * as S from "./styles";
interface CardCoffeeProps {
  id: number;
  urlImg: string;
  flag: string[];
  titleProduct: string;
  subTitleProduct: string;
  isSelected: boolean;
  price: string;
  stock: string;
  amount?: number;
}
export function CardCoffee(card: CardCoffeeProps) {
  let stateNamber = 1;
  const [amount, setAmount] = useState(stateNamber);
  const [priceMultipliedByQuntity, setPriceMultipliedByQuntity] = useState(
    +card.price
  );
  const [isCheckingShoppingCart, setIsCheckingShoppingCart] = useState(
    card.isSelected
  );

  const { data, onChangeShoppingCart, onChangeRemoveShoppingCart } =
    useContext(StorageContext);

  useEffect(() => {
    const shoppingCartOrders: CardCoffeeProps[] = JSON.parse(
      String(window.localStorage.getItem("@ignite-CoffeeDelivry:order-1.0.0"))
    );
    if (shoppingCartOrders !== null) {
      if (shoppingCartOrders.length > 0) {
        shoppingCartOrders
          .filter((order) => order.id === card.id)
          .map((item) => {
            setAmount(Number(item.amount));
          });
      }
    }
  }, [data]);

  function addAmount() {
    if (amount >= 1 && amount < 99) {
      setAmount(1 + amount);
    }
  }

  function subAmount() {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }

  function onChangeForShoppingCart() {
    console.log("addicional ao carrinho");

    const ObjectCoffee = {
      id: card.id,
      urlImg: card.urlImg,
      titleProduct: card.titleProduct,
      isSelected: !isCheckingShoppingCart,
      price: card.price,
      amount,
    };
    onChangeShoppingCart(ObjectCoffee);
  }
  function onChangeRemoveItemForShoppingCart() {
    console.log("removido do carrinho");
    onChangeRemoveShoppingCart(card.id);
  }

  useEffect(() => {
    setPriceMultipliedByQuntity(amount * Number(card.price));
  }, [amount, card.price]);
  useEffect(() => {
    setIsCheckingShoppingCart(card.isSelected);
  }, [card.isSelected]);

  return (
    <S.CardCoffeeContainer isAdded={isCheckingShoppingCart}>
      <S.BoxImageCoffee>
        <S.ImageCoffee src={card.urlImg} alt="uma imagem de café" />
      </S.BoxImageCoffee>
      <S.BoxFlags>
        {card.flag.map((msg) => (
          <S.Flag key={msg}>{msg}</S.Flag>
        ))}
      </S.BoxFlags>
      <S.BoxDescription>
        <h2 className="title">{card.titleProduct}</h2>
        <p className="description">{card.subTitleProduct}</p>
      </S.BoxDescription>
      <S.BoxInteraction>
        <div className="boxValue">
          <p>
            R${" "}
            <span>
              {String(priceMultipliedByQuntity.toFixed(2)).replace(/\./g, ",")}
            </span>
          </p>
        </div>
        <div className="interaction">
          <S.BoxCountUnit>
            <S.subt
              type="button"
              disabled={amount === 1 || card.isSelected === true ? true : false}
              onClick={subAmount}
            >
              <Minus size={16} weight="bold" color="#8047F8" />
            </S.subt>
            <input
              className="inputNumber"
              type="number"
              disabled={card.isSelected === true ? true : false}
              step={1}
              value={amount}
              min={1}
              max={99}
              onChange={(e) => {
                setAmount(+e.target.value);
              }}
            />
            <S.add
              type="button"
              disabled={card.isSelected === true ? true : false}
              onClick={() => addAmount()}
            >
              <Plus size={16} weight="bold" color="#8047F8" />
            </S.add>
          </S.BoxCountUnit>
          {isCheckingShoppingCart ? (
            <S.ButtonAddToShoppingCart
              isAdded={isCheckingShoppingCart}
              type="button"
              onClick={() => {
                onChangeRemoveItemForShoppingCart();
                setIsCheckingShoppingCart(!isCheckingShoppingCart);
              }}
            >
              <X size={22} weight="bold" color="#fff" />
            </S.ButtonAddToShoppingCart>
          ) : (
            <S.ButtonAddToShoppingCart
              isAdded={isCheckingShoppingCart}
              type="button"
              onClick={() => {
                onChangeForShoppingCart();
                setIsCheckingShoppingCart(!isCheckingShoppingCart);
              }}
            >
              <ShoppingCartSimple size={22} weight="fill" />
            </S.ButtonAddToShoppingCart>
          )}
        </div>
      </S.BoxInteraction>
    </S.CardCoffeeContainer>
  );
}
