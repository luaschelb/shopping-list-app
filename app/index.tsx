import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type Item = {
  name: string,
  quantity: number
}

export default function Index() {

  const [ items, setItems ] = useState<Item[]>([])
  const [ newItemName, setNewItemName ] = useState("")

  function registerNewItem () {
    if(newItemName === "")
    {
      alert("obrigatório nome do item")
      return;
    }
    setItems((prev : Item[]) => (prev.concat({
      name: newItemName,
      quantity: 0
    })))    
    setNewItemName("")
  }

  return (
    <ScrollView>
      <View style={styles.newItemCard}>
        <Text
        >Inserir novo item</Text>
        <TextInput
          value={newItemName}
          onChangeText={setNewItemName}
          style={styles.textInput}></TextInput>
        <Button
          onPress={registerNewItem}
        >+</Button>
      </View>
      <View>
        {
          items.map((item : Item, i : number) => (
            <View 
              style={styles.itemContainer} key={i}>
              <Text>{item.name}</Text>
              <View style={styles.actionsContainer}>
                <Text style={{fontSize: 24}}>{item.quantity}</Text>
                <Ionicons name="add" size={32} color="green" />
                <Ionicons name="remove" size={32} color="green" />
                <Ionicons name="trash" size={32} color="red" />
              </View>
            </View>
          ))
        }
      </View>
    </ScrollView>
  );
}

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