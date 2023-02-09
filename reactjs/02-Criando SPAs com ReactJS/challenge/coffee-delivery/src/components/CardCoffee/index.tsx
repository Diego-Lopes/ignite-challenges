import { Minus, Plus, ShoppingCartSimple } from "phosphor-react";
import * as S from "./styles";
interface CardCoffeeProps {
  urlImg: string;
  flag: string[];
  titleProduct: string;
  subTitleProduct: string;
  price: string;
  stock: string;
}
export function CardCoffee(card:CardCoffeeProps) {
  return (
    <S.CardCoffeeContainer>
      <S.BoxImageCoffee>
        <S.ImageCoffee
          src={card.urlImg}
          alt="uma imagem de café"
        />
      </S.BoxImageCoffee>
      <S.BoxFlags>
        {
          card.flag.map(msg => (<S.Flag>{msg}</S.Flag>))
        }
      </S.BoxFlags>
      <S.BoxDescription>
        <h2 className="title">{card.titleProduct}</h2>
        <p className="description">
          {card.subTitleProduct}
        </p>
      </S.BoxDescription>
      <S.BoxInteraction>
        <div className="boxValue">
          <p>
            R$ <span>{card.price}</span>
          </p>
        </div>
        <div className="interaction">
          <S.BoxCountUnit>
            <S.subt type="button" disabled>
              <Minus size={16} weight="fill" />
            </S.subt>
            <input
              className="inputNumber"
              type="number"
              disabled
              step={1}
              value="10"
              min="1"
              maxLength={99}
            />
            <S.add type="button">
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
