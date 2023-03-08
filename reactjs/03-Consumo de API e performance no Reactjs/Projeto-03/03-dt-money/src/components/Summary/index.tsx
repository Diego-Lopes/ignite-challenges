import * as S from "./styles";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from "phosphor-react";
import { useContext } from "react";
import { ThemeContext, useTheme } from "styled-components";

export function Summary() {
  const colors = useContext(ThemeContext)
  const theme = useTheme();
  return (
    <S.SummaryContainer>
      <S.SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={colors["green-500"]} />
        </header>
        <strong>R$ 17.000,00</strong>
      </S.SummaryCard>
      <S.SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={theme["red-300"]} />
        </header>
        <strong>R$ 17.000,00</strong>
      </S.SummaryCard>
      <S.SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={"#fff"} />
        </header>
        <strong>R$ 17.000,00</strong>
      </S.SummaryCard>
    </S.SummaryContainer>
  );
}
