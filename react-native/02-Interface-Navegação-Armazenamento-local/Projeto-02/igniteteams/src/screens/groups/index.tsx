import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import * as S from "./style";

export function Groups() {
  return (
    <S.Container>
      <Header showBackButton />
      <Highlight title={"Tumas"} subTitle={"Jogue com a sua turma"} />
    </S.Container>
  );
}
