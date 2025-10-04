import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from "@react-navigation/elements";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type Item = {
  name: string,
  quantity: number
}

export default function Index() {

  const [ items, setItems ] = useState<Item[]>([])
  const [ newItemName, setNewItemName ] = useState("")

  useEffect(() => {
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem('@items');
        if(storedItems) setItems(JSON.parse(storedItems));
      } catch (e) {
        console.error('Failed to load items', e);
      }
    }
    loadItems();
  }, []);

  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem('@items', JSON.stringify(items));
      } catch (e) {
        console.error('Failed to save items', e);
      }
    }
    saveItems();
  }, [items]);

  function registerNewItem () {
    if(newItemName === "")
    {
      alert("obrigatório nome do item")
      return;
    }
    setItems((prev : Item[]) => (prev.concat({
      name: newItemName,
      quantity: 1
    })))    
    setNewItemName("")
  }

  function handleDeleteItem (i : number) {
    setItems(prevItems => {
      if(prevItems[i].quantity === 1)
      {
        return prevItems.filter((_, index) => i !== index)
      }
      return prevItems.map((prev, index) => {
        if(index === i)
          prev.quantity--
        return prev;
      });
    })
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
                <Ionicons name="add" size={32} color="green" onPress={() => {
                    setItems(prevItems => prevItems.map((prev, index) => {
                      if(index === i){
                        prev.quantity++;
                        return prev
                      }
                      return prev
                    })
                )}}  />
                <Ionicons name="remove"size={32} color="green" onPress={() => handleDeleteItem(i)}/>
                <Ionicons name="trash"  style={{
                marginLeft:24}} onPress={() => {
                    setItems(prevItems => prevItems.filter((_, index) => index !== i));
                  }}
                  size={32} color="red" />
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