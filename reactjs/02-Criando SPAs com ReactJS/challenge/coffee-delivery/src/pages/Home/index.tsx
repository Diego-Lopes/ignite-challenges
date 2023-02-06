import { Banner } from "../../components/Banner";
import { ListCoffees } from "../../components/ListCoffees";
import * as S from "./styles";

export function Home() {

  return (
    <S.HomeContainer>
      <Banner />
      <ListCoffees />
    </S.HomeContainer>
  )
}