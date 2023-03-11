import { MagnifyingGlass } from "phosphor-react";
import * as S from "./styles";
export function SearchForm() {
  return (
    <S.SearchFormContainer>
      <input type="text" placeholder="Busque por transações" />
      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </S.SearchFormContainer>
  );
}
