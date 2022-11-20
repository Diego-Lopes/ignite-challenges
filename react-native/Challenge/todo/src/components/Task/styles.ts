import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapperContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#262626",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333333",
    marginBottom: 8,
  },
  buttonCheck: {
    width: 24,
    height: 24,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
    textAlign: "left",
    marginHorizontal: 8,
  },
  buttonDelete: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#5E5D5D",
  },
  isCheck: {
    color: "#808080",
    textDecorationLine: "line-through"
  }
})