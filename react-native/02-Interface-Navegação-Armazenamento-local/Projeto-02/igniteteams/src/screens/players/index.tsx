import { Button } from "@components/button";
import { ButtonIcon } from "@components/buttonIcon";
import { Filter } from "@components/filter";
import { Header } from "@components/header";
import { Highlight } from "@components/highlight";
import { Input } from "@components/input";
import { ListEmpty } from "@components/listEmpty";
import { Loading } from "@components/loading";
import { PlayerCard } from "@components/playerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GroupRemoveByName } from "@storage/group/groupRemoveByName";
import { PlayerAddByGroup } from "@storage/player/playerAddByGroup";
import { PlayersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/appError";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string
}

export function Players() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [newPlayerName, setNewPlayerName] = useState<string>('')
  const [team, setTeam] = useState<string>('')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams



  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo pessoa', 'Informe o nome da pessoa para adicionar.')
    }

    if (team.trim().length === 0) {
      return Alert.alert('Novo pessoa', 'Selecione o time da pessoa.')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await PlayerAddByGroup(newPlayer, group)

      newPlayerNameInputRef.current?.blur() //retirar o foco.
      // Keyboard.dismiss() //fechar o teclado

      fetchPlayersByTeam()
      setNewPlayerName('')

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo pessoa', error.message)
      } else {
        console.log(error);
        Alert.alert('Novo pessoa', 'Ocorreu um erro ao adicionar a pessoa.')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true)

      const playersByTeam = await PlayersGetByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayersByTeam()
    } catch (error) {
      console.log(error);
      Alert.alert('Remover pessoa', 'Não foi possível remover a pessoa selecionada.')

    }
  }
  async function groupRemove(group: string) {
    try {
      await GroupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error);
      Alert.alert('Remover turma', 'Não foi possível remover a turma selecionada.')
    }
  }
  async function handleGroupRemove() {
    try {
      Alert.alert(
        'Remover',
        'Deseja remover a turma?',
        [
          { text: 'Não', style: 'cancel' },
          { text: 'Sim', onPress: () => groupRemove(group) }
        ]
      )
    } catch (error) {
      console.log(error);
      Alert.alert('Remover turma', 'Não foi possível remover a turma selecionada.')

    }
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subTitle="Adicione a galera e separe os times"
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer} //para usar o botão de enviar do teclado
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>
      {
        isLoading ? <Loading /> : <FlatList
          data={players}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 }
          ]}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
        />
      }


      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />

    </Container>
  )
}