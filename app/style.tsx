
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
  },
  newItemCard: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    flex: 1,
    gap: 5,
    marginTop: "20%",
    marginHorizontal: 15,
    marginBottom: 32
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center'
  },
  itemContainer: {
    flex:1, 
    flexDirection:'row',
    borderStyle: 'solid',
    justifyContent: "space-around",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 12,
    marginHorizontal: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    width: 'auto'
  }
})

export default styles