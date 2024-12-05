import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/appError";
import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";

export async function PlayerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {

    const storagePlayers = await playersGetByGroup(group)


    const playerAlreadyExists = storagePlayers.filter(player => player.name === newPlayer.name)



    if (playerAlreadyExists.length > 0) {
      throw new AppError('Já existe um jogador cadastrado com esse nome.')
    }

    const storage = JSON.stringify([...storagePlayers, newPlayer])

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch (error) {
    throw (error)
  }
}