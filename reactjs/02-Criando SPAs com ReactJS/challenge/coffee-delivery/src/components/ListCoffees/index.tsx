import { CardCoffee } from "../CardCoffee";
import * as S from "./styles";
import { dataMock } from "./Mock/data";
import { DataProps, StorageContext } from "../../context/StorageContext";
import { useContext, useEffect, useState } from "react";

export function ListCoffees() {
  const { data } = useContext(StorageContext);
  const [dataInSessions, setDataInSessions] = useState<DataProps[]>([]);
  
  // useEffect(() => {
  //   const session = String(window.sessionStorage.getItem("@ignite-CoffeeDelivry:data-1.0.0"));
  //   setDataInSessions(JSON.parse(session))
  // }, [])

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
              isSelected={Coffee.isSelected}
            />
          ))}
        </S.Wrapper>
      </S.Content>
    </S.ListCoffeeContainer>
  );
}
