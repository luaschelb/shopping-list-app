import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    ...Platform.select({
      web: { boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' },
    }),
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
    marginTop: "10%",
    marginHorizontal: 15,
    marginBottom: 32,
    backgroundColor: '#ffffff',
    ...Platform.select({
      web: { boxShadow: '0px 2px 3px rgba(0,0,0,0.10)' },
    }),
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
    paddingHorizontal: 6,
    width: 'auto',
    backgroundColor: '#ffffff',
    ...Platform.select({
      web: { boxShadow: '0px 1px 2px rgba(0,0,0,0.08)' },
    }),
    elevation: 2,
  },
  lastItemContainer: {
    marginBottom: 8
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center'
  },
  itemName: {
    maxWidth: 120,
    minWidth: 120
  },
  addButtonText: {
    fontSize: 24,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  }
})

export default styles