import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#131016',
    padding: 24,
  }, 
  Title: {
    color: '#fdfcfe',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:48
  }, 
  subTitle: {
    color: '#6b6b6b',
    fontSize: 16
  },
  input: {
    flex: 1,
    height: 56,
    backgroundColor: '#1f1e25',
    borderRadius: 5,
    color: '#fff',
    marginRight: 12,
    padding: 16,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#31cf67",
    justifyContent: 'center',
    alignItems:'center',
  },
  textButton: {
    color: "#fff",
    fontSize: 24,
  },
  form: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 36,
    marginBottom: 42,
  },
  listEmptyText: {
    color: '#fff',
    fontSize: 14,
    paddingHorizontal: 16,
    textAlign: "center"
  }
})