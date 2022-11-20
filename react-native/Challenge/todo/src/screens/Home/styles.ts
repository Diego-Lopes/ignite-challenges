import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#131016",
    padding: 24,
  },
  logoSvg: {
    alignItems: "center",
    marginTop: 48,
  },
  wrapperInput: {
    width: "100%",
    flexDirection: "row",
    marginTop: 40,
  },
  input: {
    backgroundColor: '#1f1e25',
    flex: 1,
    padding: 16,
    color: "#fff",
    marginRight:4,
    height: 54,
    borderRadius: 6,
  },
  inputFocused: {
    borderWidth:1,
    borderColor: "#5E60CE"
  },
  button: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#1E6F9F"
  },
  wrapperContent: {
    width: "100%",
    height: "100%",
    marginTop: 32,
  },
  wrapperCounts: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingBottom: 39,

  },
  boxCreat: {
    width: 111,
    flexDirection: "row",
    alignItems: "center",
  },
  textCreate: {
    color: "#4EA8DE",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  boxCount: {
    width: 111,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },  
  textFinished: {
    color: "#8284FA",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 8,
  },
  textCount: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    backgroundColor: "#333333",
    paddingHorizontal: 8,
    borderRadius: 50,
  },
  boxClipboard: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 48,
  },
  textClipboard: {
    fontSize: 14,
    color: "#808080",
    marginTop: 16,
    fontWeight:"bold",
  },
  textClipboardSecund: {
    fontSize: 14,
    color: "#808080",
  },
  flatList: {
    borderTopWidth: 1,
    borderColor: "#333333",
  }
})