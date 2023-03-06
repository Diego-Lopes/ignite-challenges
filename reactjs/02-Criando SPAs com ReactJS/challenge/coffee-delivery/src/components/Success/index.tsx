import { CurrencyDollar, MapPin, Timer } from "phosphor-react";
import { CicleIcons } from "../CicleIcons";
import * as S from "./styles";

interface SuccessProps {
  address: string;
  payment: string;
  number: string;
  district: string;
  city: string;
  complementsStreet: string;
}

export function Success(props: SuccessProps) {
  return (
    <S.ContainerSuccess>
      <div className="containerText">
        <h1>Uhu! Pedido confirmado</h1>
        <p>agora é só aguardar que logo o café chegará até você </p>
      </div>
      <S.Content>
        <div className="border">
          <div className="cardInfo">
            <div className="icons">
              <CicleIcons color={"#8047F8"}>
                <MapPin size={16} weight="fill" color="white  " />
              </CicleIcons>
              <p>
                Entrega em{" "}
                <strong>
                  {props.address} n° {props.number}
                </strong>{" "}
                complemento: {props.complementsStreet.toLocaleLowerCase()}{" "}
                Cidade: {props.city.toLocaleLowerCase()}
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
                Forma de pagamento:{" "}
                <strong>{props.payment.toLocaleUpperCase()}</strong>
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
    </S.ContainerSuccess>
  );
}
