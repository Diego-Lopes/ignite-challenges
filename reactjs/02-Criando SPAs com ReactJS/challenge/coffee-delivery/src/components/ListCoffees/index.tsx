import { CardCoffee } from "../CardCoffee";
import * as S from "./styles";
import { data } from "./Mock/data";

export function ListCoffees() {
  return (
    <S.ListCoffeeContainer>
      <S.Content>
        <h1>Nossos cafés</h1>
        <S.Wrapper>
          {data.map((Coffee) => (
            <CardCoffee
              key={Coffee.id}
              id={Coffee.id}
              urlImg={Coffee.urlImg}
              flag={Coffee.flag}
              titleProduct={Coffee.titleProduct}
              subTitleProduct={Coffee.subTitleProduct}
              price={Coffee.price}
              stock={Coffee.stock}
            />
          ))}
        </S.Wrapper>
      </S.Content>
    </S.ListCoffeeContainer>
  );
}
