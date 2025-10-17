import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  newItemCard: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
    flex: 1,
    gap: 12,
    marginTop: "20%",
    marginHorizontal: 15,
    marginBottom: 32,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemContainer: {
    flexDirection: 'row',
    borderStyle: 'solid',
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginTop: 12,
    marginHorizontal: 50,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: 'auto',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center'
  },
  itemName: {
    maxWidth: 80,
    minWidth: 80
  }
})

export default styles