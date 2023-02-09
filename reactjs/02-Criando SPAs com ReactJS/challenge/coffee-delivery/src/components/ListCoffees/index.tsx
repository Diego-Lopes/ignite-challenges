import { CardCoffee } from "../CardCoffee";
import * as S from "./styles";

export function ListCoffees() {
  const dataMock = [
    {
      urlImg: "/assets/img/coffees/expressoTradicional.png",
      flag: ["tradicional"],
      titleProduct: "expresso tradicional",
      subTitleProduct:
        "O tradicional café feito com água quente e grãos moídos",
      price: "9,99",
      stock: "10",
    },
    {
      urlImg: "/assets/img/coffees/expressoTradicional.png",
      flag: ["tradicional", "gelado"],
      titleProduct: "expresso gelado",
      subTitleProduct:
        "Bebida preparada com café expresso e cubos de gelo",
      price: "9,99",
      stock: "10",
    },
    {
      urlImg: "/assets/img/coffees/expressoTradicional.png",
      flag: ["tradicional"],
      titleProduct: "expresso cremoso",
      subTitleProduct:
        "Café expresso tradicional com espuma cremosa",
      price: "9,99",
      stock: "10",
    },
  ];
  return (
    <S.ListCoffeeContainer>
      <S.Content>
        <h1>Nossos cafés</h1>
        <S.Wrapper>
          {dataMock.map((item) => (
            <CardCoffee 
              urlImg={item.urlImg} 
              flag={item.flag} 
              titleProduct={item.titleProduct} 
              subTitleProduct={item.subTitleProduct} 
              price={item.price} 
              stock={item.stock} />
          ))}
        </S.Wrapper>
      </S.Content>
    </S.ListCoffeeContainer>
  );
}
