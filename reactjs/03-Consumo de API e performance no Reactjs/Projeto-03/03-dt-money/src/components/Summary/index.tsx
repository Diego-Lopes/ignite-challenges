import * as S from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { ThemeContext, useTheme } from "styled-components";
import { TransactionsContext } from "../../contexts/TransactiosContext";
import { priceFormatter } from "../../utils/formatter";
import { useSummary } from "../../hooks/useSummary";

export function Summary() {
  //usando global theme no front para estilizar nível line.
  const colors = useContext(ThemeContext);
  const theme = useTheme();
  //-----------------------------------------------------
  const summary = useSummary();
  
  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={colors["green-500"]} />
        </header>
        <strong>{priceFormatter.format(summary.income)}</strong>
      </S.SummaryCard>
      <S.SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={theme["red-300"]} />
        </header>
        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </S.SummaryCard>
      <S.SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={"#fff"} />
        </header>
        <strong>{priceFormatter.format(summary.total)}</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  );
}
