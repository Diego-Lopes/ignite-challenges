import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import * as S from "./styles";
export function Transaction() {
  return (
    <S.ContainerTransaction>
      <Header />
      <Summary />
      <S.TransactionContainers>
        <SearchForm />
        <S.TransactionTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de Site</td>
              <td>
                <S.PriceHighlight variant="income">
                  R$ 12.000,00
                </S.PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>
            <tr>
              <td width="50%">Despesa com servidor</td>
              <td>
                <S.PriceHighlight variant="outcome">- R$ 59,00</S.PriceHighlight>
              </td>
              <td>Infra</td>
              <td>10/03/2022</td>
            </tr>
          </tbody>
        </S.TransactionTable>
      </S.TransactionContainers>
    </S.ContainerTransaction>
  );
}
