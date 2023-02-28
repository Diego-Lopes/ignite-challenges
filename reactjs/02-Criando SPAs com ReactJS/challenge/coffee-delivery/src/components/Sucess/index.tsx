import { CurrencyDollar, MapPin, Timer } from "phosphor-react";
import { CicleIcons } from "../CicleIcons";
import * as S from "./styles";

export function Sucess() {
  return (
    <S.ContainerSucess>
      <h1>Uhu! Pedido confirmado</h1>
      <p>agora é só aguardar que logo o café chegará até você </p>
      <S.Content>
        <div className="border">
          <div className="cardInfo">
            <div className="icons">
              <CicleIcons color={"#8047F8"}>
                <MapPin size={16} weight="fill" color="white  " />
              </CicleIcons>
              <p>
                entrega em <strong>Rua</strong> resto do endereço
              </p>
            </div>
            <div className="icons">
              <CicleIcons color={"#DBAC2C"}>
                <Timer size={16} weight="fill" color="white  " />
              </CicleIcons>
              <p>
                Previsão de entrega <strong> 20 min - 30 min</strong>
              </p>
            </div>
            <div className="icons">
              <CicleIcons color={"#C47F17"}>
                <CurrencyDollar size={16} weight="fill" color="white  " />
              </CicleIcons>
              <p>
                <strong>Cartão de Crédito</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="img">
          <img
            src="/assets/img/Illustration.png"
            alt="image motoboy de entrega saindo"
          />
        </div>
      </S.Content>
    </S.ContainerSucess>
  );
}
