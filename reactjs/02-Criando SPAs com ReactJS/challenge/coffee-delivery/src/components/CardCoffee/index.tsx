import { Minus, Plus, ShoppingCartSimple } from "phosphor-react";
import { useEffect, useState } from "react";
import * as S from "./styles";
interface CardCoffeeProps {
  id: number;
  urlImg: string;
  flag: string[];
  titleProduct: string;
  subTitleProduct: string;
  price: string;
  stock: string;
}
export function CardCoffee(card: CardCoffeeProps) {
  const [amount, setAmount] = useState(1);
  const [priceMultipliedByQuntity, setPriceMultipliedByQuntity] =
    useState(9.99);

  function addAmount() {
    setAmount(1 + amount);
  }

  function subAmount() {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  }

  useEffect(() => {
    setPriceMultipliedByQuntity(amount * Number(card.price));
  }, [amount]);
  
  return (
    <S.CardCoffeeContainer>
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
              disabled={amount === 1 ? true : false}
              onClick={subAmount}
            >
              <Minus size={16} weight="fill" />
            </S.subt>
            <input
              className="inputNumber"
              type="number"
              disabled
              step={1}
              value={amount}
              min="1"
              maxLength={99}
            />
            <S.add type="button" onClick={() => addAmount()}>
              <Plus size={16} weight="fill" />
            </S.add>
          </S.BoxCountUnit>
          <S.ButtonAddToShoppingCart type="button">
            <ShoppingCartSimple size={22} weight="fill" />
          </S.ButtonAddToShoppingCart>
        </div>
      </S.BoxInteraction>
    </S.CardCoffeeContainer>
  );
}
