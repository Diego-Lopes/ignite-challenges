import { CardCoffee } from '../CardCoffee';
import * as S from './styles';


export function ListCoffees() {

  return (
    <S.ListCoffeeContainer>
      <S.Content>
        <h1>Nossos cafés</h1>
        <S.Wrapper>
          <CardCoffee />
          <CardCoffee />
          <CardCoffee />
          <CardCoffee />
          <CardCoffee />
          <CardCoffee />
          <CardCoffee />
          <CardCoffee />
          <CardCoffee />
          <CardCoffee />
        </S.Wrapper>
      </S.Content>
    </S.ListCoffeeContainer>
  )
}