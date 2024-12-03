import { GroupCard } from "@components/groupCard";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import * as S from "./style";

export function Groups() {
  return (
    <S.Container>
      <Header showBackButton />
      <Highlight title={"Tumas"} subTitle={"Jogue com a sua turma"} />

      <GroupCard title="Galera da T.I" onPress={() => {}}/>
      <GroupCard title="Galera da RH"/>
      <GroupCard title="Galera da BackOffice"/>
    </S.Container>
  );
}
