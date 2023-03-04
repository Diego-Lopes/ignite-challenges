import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Minus,
  Money,
  Plus,
  Trash,
} from "phosphor-react";
import * as S from "./styles";
import { StorageContext } from "../../context/StorageContext";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Sucess } from "../../components/Sucess";

export function Checkout() {
  const {
    shoppingCart,
    onSubAmount,
    onAddAmount,
    onRemovedItem,
    onFinishedShoppingCart,
  } = useContext(StorageContext);
  const [totalPriceAmount, setTotalPriceAmount] = useState(0);
  const [totalPriceAmountTaxa, setTotalPriceAmountTaxa] = useState(0);
  const [cep, setCep] = useState("");
  const [road, setRoad] = useState("");
  const [number, setNumber] = useState("");
  const [complementStreet, setComplementStreet] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [payment, setPayment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  let taxa = 3.5;
  useEffect(() => {
    let initialValue = 0;
    let total = shoppingCart.map((items) => {
      return +(items.amount * +items.price).toFixed(2);
    });

    setTotalPriceAmount(
      +total.reduce((acc, value) => acc + value, initialValue).toFixed(2)
    );

    if (totalPriceAmount > 0) {
      setTotalPriceAmountTaxa(+(totalPriceAmount + taxa).toFixed(2));
    } else {
      setTotalPriceAmountTaxa(0);
    }
  }, [totalPriceAmount, shoppingCart]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (
      cep !== "" &&
      road !== "" &&
      number !== "" &&
      district !== "" &&
      city !== "" &&
      uf !== ""
    ) {
      const pedido = shoppingCart.map((item) => {
        return {
          produto: item.titleProduct,
          quant: item.amount,
          preço: item.price,
        };
      });

      // console.log(pedido);
      let text = `
        Pedido : ${JSON.stringify(
          pedido.map((item) => {
            return item;
          })
        )}
       
      `;

      let address = `
      Endereço de entrega: 
      rua: ${road}, cep: ${cep}
      número da casa: ${number},
      bairro: ${district}, local: ${city}/${uf}
      ${!!complementStreet && complementStreet + ","}

      valor do pedido: ${String(totalPriceAmount.toFixed(2)).replace(
        /\./g,
        ","
      )}
      taxa de entrega: ${String(taxa.toFixed(2)).replace(/\./g, ",")}
      valor total: R$ ${String(totalPriceAmountTaxa.toFixed(2)).replace(
        /\./g,
        ","
      )}
      modo de pagamento: ${payment}.
    `;

      text = text
        .replace(/\"/g, " ")
        .replace(/\,/g, "\n")
        .replace(/\[|\]/g, "\n")
        .replace(/\{|\}/g, "")
        .replace(/\:/g, ": ");
      console.log(text + address);
      alert(text + address);
      setIsSubmitted(!isSubmitted);
      onFinishedShoppingCart();
    } else {
      alert("Preencher os campos de entrega");
    }
  }

  return (
    <>
      {isSubmitted ? (
        <Sucess />
      ) : (
        <S.CheckoutContainer>
          <S.Content>
            <S.Address>
              <h2 className="title">Complete seu pedido</h2>
              <S.Form onSubmit={onSubmit} id={"address"}>
                <div className="wrapper">
                  <div className="address">
                    <MapPinLine size={22} />
                    <div>
                      <p>Endereço de entrega</p>
                      <p>informe o endereço onde deseja receber seu pedido</p>
                    </div>
                  </div>
                  <div className="boxInputs">
                    <input
                      type="text"
                      value={cep}
                      maxLength={8}
                      onChange={(e) =>
                        setCep(
                          e.target.value
                            .replace(/\D/g, "")
                            .replace(/^(\d{5})(\d{3})$/, "$1-$2")
                        )
                      }
                      placeholder="CEP"
                    />
                    <input
                      type="text"
                      value={road}
                      onChange={(e) =>
                        setRoad(e.target.value.toLocaleUpperCase())
                      }
                      placeholder="RUA"
                    />
                    <div>
                      <input
                        type="text"
                        value={number}
                        onChange={(e) =>
                          setNumber(e.target.value.toLocaleUpperCase())
                        }
                        placeholder="NÚMERO"
                      />
                      <div className="inputComplemento">
                        <label htmlFor="1">
                          <i>"Opicional"</i>
                        </label>
                        <input
                          id="1"
                          type="text"
                          value={complementStreet}
                          onChange={(e) =>
                            setComplementStreet(
                              e.target.value.toLocaleUpperCase()
                            )
                          }
                          placeholder="COMPLEMENTO"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) =>
                        setDistrict(e.target.value.toLocaleUpperCase())
                      }
                      placeholder="BAIRRO"
                    />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value.toLocaleUpperCase())
                      }
                      placeholder="CIDADE"
                    />
                    <input
                      type="text"
                      value={uf}
                      onChange={(e) =>
                        setUf(e.target.value.toLocaleUpperCase())
                      }
                      placeholder="UF"
                    />
                  </div>
                </div>
                <div className="boxModePay">
                  <div className="boxInfo">
                    <div className="title">
                      <CurrencyDollar size={22} />
                      <div>
                        <p>Pagamento</p>
                        <p>
                          O pagamento é feito na entrega. Escolhe a forma que
                          deseja pagar
                        </p>
                      </div>
                    </div>
                    <div className="boxOptions">
                      <button
                        type="button"
                        onClick={() => setPayment("Cartão de crédito")}
                      >
                        <CreditCard size={16} />
                        cartão de crédito
                      </button>
                      <button
                        type="button"
                        onClick={() => setPayment("Cartão de débito")}
                      >
                        <Bank size={16} />
                        cartão de débito
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setPayment("Pagamento em dinheiro em mãos")
                        }
                      >
                        <Money size={16} />
                        dinheiro
                      </button>
                    </div>
                  </div>
                </div>
              </S.Form>
            </S.Address>
            <S.ShoppingCart>
              <h2 className="title">Cafés selecionados</h2>
              <div className="wrapperShoppingCart">
                {shoppingCart.map((item) => (
                  <S.CardItem key={item.id}>
                    <img src={item.urlImg} />
                    <div className="buttonOptions">
                      <p>{item.titleProduct}</p>
                      <div className="buttons">
                        <S.BoxCountUnit>
                          <S.subt
                            type="button"
                            // disabled={
                            //   amount === 1 || card.isSelected === true
                            //     ? true
                            //     : false
                            // }
                            onClick={() => {
                              onSubAmount(item.id);
                            }}
                          >
                            <Minus size={16} weight="bold" color="#8047F8" />
                          </S.subt>
                          <input
                            className="inputNumber"
                            type="number"
                            // disabled={card.isSelected === true ? true : false}
                            step={1}
                            value={item.amount}
                            min={1}
                            max={99}
                            onChange={(e) => {
                              // setAmount(+e.target.value);
                            }}
                          />
                          <S.add
                            type="button"
                            // disabled={card.isSelected === true ? true : false}
                            onClick={() => {
                              onAddAmount(item.id);
                            }}
                          >
                            <Plus size={16} weight="bold" color="#8047F8" />
                          </S.add>
                        </S.BoxCountUnit>
                        <button
                          className="trash"
                          onClick={() => onRemovedItem(item.id)}
                        >
                          <Trash size={16} />
                          remover
                        </button>
                      </div>
                    </div>
                    <div className="valueUnit">
                      <p>
                        R${" "}
                        {String(Number(item.price).toFixed(2)).replace(
                          /\./g,
                          ","
                        )}
                      </p>
                    </div>
                  </S.CardItem>
                ))}

                <S.DescriptionValues>
                  <div>
                    <p>Total de itens</p>
                    <p>{totalPriceAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p>Entrega</p>
                    <p>R$ {!!totalPriceAmount && "3,50"}</p>
                  </div>
                  <div>
                    <h3>Total</h3>
                    <h3>R$ {totalPriceAmountTaxa.toFixed(2)}</h3>
                  </div>
                </S.DescriptionValues>
                <S.Button type="submit" form="address">
                  confirmar pedido
                </S.Button>
              </div>
            </S.ShoppingCart>
          </S.Content>
        </S.CheckoutContainer>
      )}
    </>
  );
}
