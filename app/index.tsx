import { Item } from '@/models/Item';
import ItemService from '@/services/ItemService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import styles from './style';

export default function Index() {

  const [ items, setItems ] = useState<Item[]>([])
  const [ itemNameInput, setItemNameInput ] = useState("")

  async function getAllItems () {
    const items = await ItemService.getItems()
    setItems(items)
  }

  useEffect(() => {
    getAllItems()
  }, [])

  const handleNewitem = async () => {
    await ItemService.create({
      name: itemNameInput,
      quantity: 1
    })
    setItemNameInput("")
    getAllItems()
  }  

  const handleQuantityUpdate = async (item: Item, quantity: number) => {
    await ItemService.update(item.id as number, {
      name: item.name,
      quantity: quantity
    })
    getAllItems()
  }
  
  const handleDelete = async (id: number) => {
    await ItemService.delete(id)
    getAllItems()
  }

  return (
    <ScrollView>
      <View style={styles.newItemCard}>
        <Text
        >Inserir novo item</Text>
        <TextInput
          value={itemNameInput}
          onChangeText={setItemNameInput}
          style={styles.textInput}></TextInput>
        <Button
          onPress={handleNewitem}
        >+</Button>
      </View>
      <View>
        {
          items.map((item : Item, i : number) => (
            <View 
              style={styles.itemContainer} key={item.id}>
              <Text>{item.name}</Text>
              <View style={styles.actionsContainer}>
                <Text style={{fontSize: 24}}>{item.quantity}</Text>
                <Ionicons name="add" size={32} color="green" onPress={ async () =>
                  await handleQuantityUpdate(item, item.quantity+1)
                }
                    />
                <Ionicons name="remove"size={32} color="green" onPress={async () => 
                  await handleQuantityUpdate(item, item.quantity-1 )}
                  />
                <Ionicons name="trash"  style={{
                marginLeft:24}} onPress={async() => {
                    await handleDelete(item.id as number)
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