import { GroupCard } from "@components/groupCard";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { useState } from "react";
import { FlatList } from "react-native";
import * as S from "./style";

export function Groups() {
  const [groups, setGroups] = useState<string[]>(["Galera da T.I", "Galera da R.H", "Galera da BackOffice"])
  return (
    <S.Container>
      <Header showBackButton />
      <Highlight title={"Tumas"} subTitle={"Jogue com a sua turma"} />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
      />


    </S.Container>
  );
}
