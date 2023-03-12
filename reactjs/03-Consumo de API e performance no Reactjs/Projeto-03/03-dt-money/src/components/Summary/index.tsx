import * as S from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { ThemeContext, useTheme } from "styled-components";
import { TransactionsContext } from "../../contexts/TransactiosContext";
import { priceFormatter } from "../../utils/formatter";

export function Summary() {
  //usando global theme no front para estilizar nível line.
  const colors = useContext(ThemeContext);
  const theme = useTheme();
  //-----------------------------------------------------

  const { transactions } = useContext(TransactionsContext);
  const sumary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  );
  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={colors["green-500"]} />
        </header>
        <strong>{priceFormatter.format(sumary.income)}</strong>
      </S.SummaryCard>
      <S.SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={theme["red-300"]} />
        </header>
        <strong>{priceFormatter.format(sumary.outcome)}</strong>
      </S.SummaryCard>
      <S.SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={"#fff"} />
        </header>
        <strong>{priceFormatter.format(sumary.total)}</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  );
}
