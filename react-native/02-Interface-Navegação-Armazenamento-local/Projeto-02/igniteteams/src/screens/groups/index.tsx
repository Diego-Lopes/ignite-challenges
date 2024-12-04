import { Button } from "@components/button";
import { GroupCard } from "@components/groupCard";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { ListEmpty } from "@components/listEmpty";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { FlatList } from "react-native";
import * as S from "./style";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  function handleNewGroup() {

  }

  return (
    <S.Container>
      <Header />
      <Highlight title={"Tumas"} subTitle={"Jogue com a sua turma"} />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <GroupCard
            title={item}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message={"Que tal cadastrar a primeira turma?"}  />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
      />

      <Button 
        title="Criar nova turma"
        onPress={handleNewGroup}
      />

    </S.Container>
  );
}
