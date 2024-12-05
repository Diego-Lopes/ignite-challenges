import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";

export async function GroupRemoveByName(groupDeleted: string) {
  try {
    const storageGroups = await groupGetAll()

    const groups = storageGroups.filter(group => group !== groupDeleted)

    //removendo grupo
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))

    //removendo os jogadores do grupo excluído.
    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)

  } catch (error) {
    throw error
  }
}