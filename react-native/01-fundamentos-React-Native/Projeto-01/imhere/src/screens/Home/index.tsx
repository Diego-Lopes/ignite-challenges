import { useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles";

export function Home() {
  const [nameList, setNameList] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState("");

  function handleParticipantAdd(name: string) {
    if (name === "") {
      return Alert.alert("Alerta", "Insira um nome no campo para salvar.");
    }

    if (nameList.includes(name)) {
      return Alert.alert(
        "Participante existe",
        "Já existe um participante na lista com esse nome."
      );
    }
    setNameList(() => [...nameList, name]);
    setParticipantName("");
  }
  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          Alert.alert("Removido!");
          setNameList(
            nameList.filter((nameListFiltered) => name !== nameListFiltered)
          );
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.body}>
      <Text style={styles.Title}>Lista de convidados</Text>
      <Text style={styles.subTitle}>Diego Lopes</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={"Digite um nome"}
          placeholderTextColor="#d6d6d6"
          onChangeText={(e) => setParticipantName(e)}
          value={participantName}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleParticipantAdd(participantName)}
        >
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>
      {/* <ScrollView showsVerticalScrollIndicator={false}>
        {nameList.map((participant, index) => (
          <Participant
            key={index}
            name={participant}
            onRemove={() => handleParticipantRemove("Diego")}
          />
        ))}
      </ScrollView> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={nameList}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => (
          <Participant
            key={index}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione a sua lista de presença.
          </Text>
        )}
      />
    </View>
  );
}
