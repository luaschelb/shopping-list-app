import { Item } from '@/models/Item';
import ItemService from '@/services/ItemService';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from "@react-navigation/elements";
import { Stack } from 'expo-router';
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, View } from "react-native";
import styles from './style';

export default function Index() {

  const [ items, setItems ] = useState<Item[]>([])
  const [ itemNameInput, setItemNameInput ] = useState("")
  const [ isLoading, setIsLoading ] = useState(true)

  async function getAllItems () {
    setIsLoading(true)
    try
    {
      const items = await ItemService.getItems()
      setItems(items)
    }
    catch (err) {
      console.error(err)
    }
    finally
    {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getAllItems()
  }, [])

  const handleNewitem = async () => {
    if (isLoading) return;
    setIsLoading(true)
    try
    {
      await ItemService.create({
        name: itemNameInput,
        quantity: 1
      })
    }
    catch (err) {
      console.error(err)
    }
    finally
    {
      setItemNameInput("")
      getAllItems()
    }
  }  

  const handleQuantityUpdate = async (item: Item, quantity: number) => {
    if (isLoading) return;
    setIsLoading(true)
    try
    {
      await ItemService.update(item.id as number, {
        name: item.name,
        quantity: quantity
      })
    }
    catch (err) {
      console.error(err)
    }
    finally
    {
      setItemNameInput("")
      getAllItems()
    }
  }
  
  const handleDelete = async (id: number) => {
    if (isLoading) return;
    setIsLoading(true)
    try
    {
    await ItemService.delete(id)
    }
    catch (err) {
      console.error(err)
    }
    finally
    {
      getAllItems()
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Lista de compras' }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
        <View style={styles.newItemCard}>
          <Text>Inserir novo item</Text>
          <TextInput
            value={itemNameInput}
            onChangeText={setItemNameInput}
            style={styles.textInput}></TextInput>
          <Button
            onPress={handleNewitem}
          >+</Button>
          {isLoading && <ActivityIndicator size="large" color="#007AFF" />}
        </View>
        <View>
          {
            items.map((item : Item, i : number) => (
              <View 
                style={styles.itemContainer} key={item.id}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.actionsContainer}>
                  <Text style={{fontSize: 24}}>{item.quantity}</Text>
                  <Ionicons name="add" size={24} color="green" onPress={ async () =>
                    await handleQuantityUpdate(item, item.quantity+1)
                  }
                      />
                  <Ionicons name="remove" size={24} color="green" onPress={async () => 
                    await handleQuantityUpdate(item, item.quantity-1 )}
                    />
                  <Ionicons name="trash"  style={{
                  marginLeft:24}} onPress={async() => {
                      await handleDelete(item.id as number)
                    }}
                    size={24} color="red" />
                </View>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </>
  );
}