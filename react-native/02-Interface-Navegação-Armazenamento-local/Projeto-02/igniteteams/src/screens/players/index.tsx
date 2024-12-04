import { ButtonIcon } from "@components/buttonIcon";
import { Filter } from "@components/filter";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { PlayerCard } from "@components/playerCard";
import { useState } from "react";
import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

export function Players() {
  const [team, setTeam] = useState<string>('')
  const [countPlayers, setCountPlayers] = useState(['Diegones', 'Relampago marquinhos', 'Guerreiros', 'Patos', 'Amarantes', 'maculino'])
  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title="Nome da turma"
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
        renderItem={({ item }) => (
          <PlayerCard 
            name={item} 
            onRemove={() => {}}
          />
        )}
      
      />

    </Container>
  )
}