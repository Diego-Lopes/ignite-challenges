import { Coffee, Package, ShoppingCart, Timer } from "phosphor-react";
import { CicleIcons } from "../CicleIcons";
import * as S from "./styles";

export function Banner() {
  return (
    <S.BannerContainer>
      <S.Content>
        <S.WrapperTexts>
          <h1 className="title">
            Encontre o café perfeito
            <br />
            para qualquer hora do dia
          </h1>

          <p className="description">
            Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
            hora
          </p>

          <div className="boxIcons">
            <div className="icon">
              <CicleIcons color={"#c47f17"}>
                <ShoppingCart weight="fill" size={16} color={"white"} />
              </CicleIcons>
              <p>Compra simples e segura</p>
            </div>
            <div className="icon">
              <CicleIcons color="#dbac2c">
                <Timer weight="fill" size={16} color={"white"} />
              </CicleIcons>
              <p>Entrega rápida e rastreada</p>
            </div>
            <div className="icon">
              <CicleIcons color="#574F4D">
                <Package weight="fill" size={16} color={"white"} />
              </CicleIcons>
              <p>Embalagem mantém o café intacto</p>
            </div>
            <div className="icon">
              <CicleIcons color="#8047F8">
                <Coffee weight="fill" size={16} color={"white"} />
              </CicleIcons>
              <p>O café chega fresquinho até você</p>
            </div>
          </div>
        </S.WrapperTexts>
      </S.Content>
    </S.BannerContainer>
  );
}
