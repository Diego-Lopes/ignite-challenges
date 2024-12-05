import { Button } from "@components/button";
import { GroupCard } from "@components/groupCard";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { ListEmpty } from "@components/listEmpty";
import { Loading } from "@components/loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { groupGetAll } from "@storage/group/groupGetAll";
import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import * as S from "./style";

export function Groups() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()
  function handleNewGroup() {
    navigation.navigate('new')
  }

  async function fetchGroups() {
    try {
      setIsLoading(true)
      const groups = await groupGetAll()

      setGroups(groups)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group })
  }

  useFocusEffect(useCallback(() => {
    fetchGroups()
  }, []))

  return (
    <S.Container>
      <Header />
      <Highlight title={"Tumas"} subTitle={"Jogue com a sua turma"} />
      {
        isLoading ? <Loading /> : <FlatList
          data={groups}
          keyExtractor={(item) => item}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <GroupCard
              title={item}
              onPress={() => handleOpenGroup(item)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message={"Que tal cadastrar a primeira turma?"} />
          )}
          contentContainerStyle={groups.length === 0 && { flex: 1 }}
        />
      }


      <Button
        title="Criar nova turma"
        onPress={handleNewGroup}
      />

    </S.Container>
  );
}
