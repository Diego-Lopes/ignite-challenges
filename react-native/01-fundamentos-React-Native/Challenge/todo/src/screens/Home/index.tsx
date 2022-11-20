import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import Logo from "../../assets/Logo.svg";
import PlusCircle from "../../assets/plus-circle.svg";
import { useEffect, useState } from "react";
import { TaskCard } from "../../components/Task";

interface IListProps {
  checked: boolean;
  taskName: string;
}

export function Home() {
  const [handleFocus, setHandleFocus] = useState(false);
  const [task, setTask] = useState<string>("");
  const [listTasks, setListTasks] = useState<IListProps[]>([]);
  const [countTasks, setCountTasks] = useState(0);
  const [countCheckeds, setCountCheckeds] = useState(0);

  useEffect(() => {
    setCountTasks(listTasks.length);

    const listTasksCheckeds = listTasks.filter(
      (item: IListProps) => item.checked === true
    );
    setCountCheckeds(listTasksCheckeds.length);
  }, [listTasks]);

  function handleCreateTask(taskName: string) {
    if (taskName !== "") {
      const taskObject = { checked: false, taskName };
      setListTasks([...listTasks, taskObject]);
      setTask("");
    } else {
      Alert.alert("Atenção!", "O campo não pode está vazio.");
    }
  }

  function handleCheked(taskName: string) {
    listTasks.map((task) => {
      if (task.taskName === taskName) {
        if (task.checked === false) {
          task.checked = true;
        } else {
          task.checked = false;
        }
      }
      return task;
    });

    const listTasksCheckeds = listTasks.filter(
      (item: IListProps) => item.checked === true
    );
    setCountCheckeds(listTasksCheckeds.length);
  }

  function handleDelete(taskName: string) {
    Alert.alert("Remover", `Remover da lista de tarefas: ${taskName}?`, [
      {
        text: "Sim",
        onPress: () => {
          Alert.alert("Removido!");
          setListTasks(
            listTasks.filter((item: IListProps) => taskName !== item.taskName)
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
    <View style={styles.container}>
      <View style={styles.logoSvg}>
        <Logo width={110.34} height={32} />
      </View>

      <View style={styles.wrapperInput}>
        <TextInput
          style={[styles.input, !!handleFocus && styles.inputFocused]}
          placeholder={"Adicione uma nova tarefa"}
          placeholderTextColor="#B8B6B6"
          onFocus={() => setHandleFocus(!handleFocus)}
          onChangeText={setTask}
          value={task}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleCreateTask(task)}
        >
          <PlusCircle width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapperContent}>
        <View style={styles.wrapperCounts}>
          <View style={styles.boxCreat}>
            <Text style={styles.textCreate}>Criadas</Text>
            <Text style={styles.textCount}>{countTasks}</Text>
          </View>
          <View style={styles.boxCount}>
            <Text style={styles.textFinished}>Concluídas</Text>
            <Text style={styles.textCount}>{countCheckeds}</Text>
          </View>
        </View>

        <FlatList
          style={styles.flatList}
          data={listTasks}
          keyExtractor={(item) => item.taskName}
          renderItem={({ item }) => (
            <TaskCard
              key={item.taskName}
              task={item.taskName}
              isCheck={item.checked}
              onChecked={() => handleCheked(item.taskName)}
              onDelete={() => handleDelete(item.taskName)}
            />
          )}
          ListEmptyComponent={() => (
            <View style={styles.boxClipboard}>
              <Image source={require("../../assets/Clipboard.png")} />
              <Text style={styles.textClipboard}>
                Você ainda não tem tarefas cadastradas
              </Text>
              <Text style={styles.textClipboardSecund}>
                Crie tarefas e organize seus itens a fazer
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
