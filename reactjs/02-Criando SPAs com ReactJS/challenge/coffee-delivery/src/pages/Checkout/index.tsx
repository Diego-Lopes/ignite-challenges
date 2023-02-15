import { Bank, CreditCard, CurrencyDollar, MapPinLine, Money } from "phosphor-react";
import * as S from "./styles";
import { StorageContext } from '../../context/StorageContext'
import { useContext } from "react";

export function Checkout() {
  const { shoppingCart } = useContext(StorageContext);

  console.log( shoppingCart);
  
  return (
    <S.CheckoutContainer>
      <S.Content>
        <S.Address>
          <h2>Complete seu pedido</h2>
          <S.Form>
            <div className="address">
              <MapPinLine size={32} />
              <p>Endereço de entrega</p>
              <p>informe o endereço onde deseja receber seu pedido</p>
            </div>
            <div className="boxInputs">
              <input type="text" placeholder="CEP" />
              <input type="text" placeholder="RUA" />
              <input type="text" placeholder="NÚMERO" />
              <input type="text" placeholder="COMPLEMENTO" />
              <input type="text" placeholder="BAIRRO" />
              <input type="text" placeholder="CIDADE" />
              <input type="text" placeholder="UF" />
            </div>
            <div className="boxModePay">
              <div className="boxInfo">
                <div className="title">
                  <CurrencyDollar size={32} />
                  <h3>Pagamento</h3>
                </div>
                <div className="boxOptions">
                  <button type="button">
                    <CreditCard size={16}/>
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
        </S.Address>
        <S.ShoppingCart></S.ShoppingCart>
      </S.Content>
    </S.CheckoutContainer>
  );
}
