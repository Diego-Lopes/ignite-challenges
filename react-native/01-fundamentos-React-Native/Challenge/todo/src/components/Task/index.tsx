import { Image, Text, TouchableOpacity, View } from "react-native";
import Lixeira from "../../assets/delete.svg";
import { styles } from "./styles";

interface ITask {
  task: string;
  isCheck: boolean;
  onDelete: () => void;
  onChecked: () => void;

}

export function TaskCard({ task, isCheck, onDelete, onChecked }: ITask) {
  return (
    <>
      <View style={styles.wrapperContent}>
        <TouchableOpacity style={styles.buttonCheck} onPress={onChecked}>
          <Image source={isCheck ? require("../../assets/checked.png") : require("../../assets/check.png")} />
        </TouchableOpacity>
        <Text style={[styles.text, !!isCheck && styles.isCheck]}>{task}</Text>
        <TouchableOpacity style={styles.buttonDelete} onPress={onDelete}>
          <Lixeira width={12.48} height={14} />
        </TouchableOpacity>
      </View>
    </>
  );
}
