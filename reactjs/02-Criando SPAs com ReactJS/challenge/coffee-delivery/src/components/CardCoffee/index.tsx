import { Minus, Plus, ShoppingCartSimple } from 'phosphor-react';
import * as S from './styles';


export function CardCoffee() {
  return (
    <S.CardCoffeeContainer>
      <S.BoxImageCoffee>
        <S.ImageCoffee src="/assets/img/coffees/expressoTradicional.png" alt="uma imagem de café" />
      </S.BoxImageCoffee>
      <S.BoxFlags>
        <S.Flag>tradicional</S.Flag>
      </S.BoxFlags>
      <S.BoxDescription>
        <h2 className='title'>expresso tradicional</h2>
        <p className='description'>O tradicional café feito com água quente e grãos moídos</p>
      </S.BoxDescription>
      <S.BoxInteraction>
        <div className="boxValue">
          R$<p>9,99</p>
        </div>
        <div className="interaction">
          <S.BoxCountUnit>
            <S.subt type="button" disabled>
              <Minus size={16} weight="fill" />
            </S.subt>
            <p>1</p>
            <S.add type="button">
              <Plus size={16} weight="fill" />
            </S.add>
          </S.BoxCountUnit>
          <S.ButtonAddToShoppingCart type='button'>
            <ShoppingCartSimple size={22} weight="fill" />
          </S.ButtonAddToShoppingCart>
        </div>
      </S.BoxInteraction>
    </S.CardCoffeeContainer>
  )
}