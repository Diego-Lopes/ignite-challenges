import { Button } from "@components/button";
import { ButtonIcon } from "@components/buttonIcon";
import { Filter } from "@components/filter";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { ListEmpty } from "@components/listEmpty";
import { PlayerCard } from "@components/playerCard";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState<string>('')
  const [countPlayers, setCountPlayers] = useState(['Diegones', 'Relampago marquinhos', 'Guerreiros', 'Patos', 'Amarantes', 'maculino', 'olocou', 'marcus'])

  const route = useRoute()
  const { group } = route.params as RouteParams

  
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subTitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}

        />
        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={['TIME A', 'TIME B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberOfPlayers>{countPlayers.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList 
        data={countPlayers}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[
          {paddingBottom: 100 },
          countPlayers.length === 0 && {flex: 1}
        ]}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item} 
            onRemove={() => {}}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time"  />
        )}
      />

      <Button 
        title="Remover turma"
        type="SECONDARY"
      />

    </Container>
  )
}