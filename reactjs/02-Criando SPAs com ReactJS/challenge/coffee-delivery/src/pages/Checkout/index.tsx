import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from "phosphor-react";
import * as S from "./styles";
import { StorageContext } from "../../context/StorageContext";
import { useContext } from "react";

export function Checkout() {
  const { shoppingCart } = useContext(StorageContext);

  console.log({ shoppingCart });

  return (
    <S.CheckoutContainer>
      <S.Content>
        {/* <S.Address>
          <h2 className="title">Complete seu pedido</h2>
          <S.Form>
            <div className="wrapper">
              <div className="address">
                <MapPinLine size={22} />
                <div>
                  <p>Endereço de entrega</p>
                  <p>informe o endereço onde deseja receber seu pedido</p>
                </div>
              </div>
              <div className="boxInputs">
                <input type="text" placeholder="CEP" />
                <input type="text" placeholder="RUA" />
                <div>
                  <input type="text" placeholder="NÚMERO" />
                  <div className="inputComplemento">
                    <label htmlFor="1">
                      <i>Opcional</i>
                    </label>
                    <input id="1" type="text" placeholder="COMPLEMENTO" />
                  </div>
                </div>
                <input type="text" placeholder="BAIRRO" />
                <input type="text" placeholder="CIDADE" />
                <input type="text" placeholder="UF" />
              </div>
            </div>
            <div className="boxModePay">
              <div className="boxInfo">
                <div className="title">
                  <CurrencyDollar size={22} />
                  <div>
                    <p>Pagamento</p>
                    <p>
                      O pagamento é feito na entrega. Escolhe a forma que deseja
                      pagar
                    </p>
                  </div>
                </div>
                <div className="boxOptions">
                  <button type="button">
                    <CreditCard size={16} />
                    cartão de crédito
                  </button>
                  <button type="button">
                    <Bank size={16} />
                    cartão de débito
                  </button>
                  <button type="button">
                    <Money size={16} />
                    dinheiro
                  </button>
                </div>
              </div>
            </div>
          </S.Form>
        </S.Address> */}
        <S.ShoppingCart>
          <h2 className="title">Cafés selecionados</h2>
          <div className="wrapperShoppingCart">
            <S.CardItem>
              <img src={shoppingCart[0].urlImg} />
              <div className="buttonOptions">
                <p>{shoppingCart[0].titleProduct}</p>
                <div className="buttons">
                  <button>values</button>
                  <button>remove</button>
                </div>
              </div>
              <div className="valueUnit">
                <p>R$ {shoppingCart[0].price.replace(/\./g, ",")}</p>
              </div>
            </S.CardItem>
            <S.DescriptionValues>
              <div>
                <p>Total de itens</p>
                <p>{+shoppingCart[0].price * shoppingCart[0].amount}</p>
              </div>
              <div>
                <p>Entrega</p>
                <p>R$ 3,50</p>
              </div>
              <div>
                <h3>Total</h3>
                <h3>
                  R$ {+shoppingCart[0].price * shoppingCart[0].amount + 3.5}
                </h3>
              </div>
            </S.DescriptionValues>
            <S.Button>confirmar pedido</S.Button>
          </div>
        </S.ShoppingCart>
      </S.Content>
    </S.CheckoutContainer>
  );
}
