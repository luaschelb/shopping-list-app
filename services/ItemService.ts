import { Item } from "@/models/Item"
import ApiService from "./ApiService"

const ItemService = {
    getItems: async () => {
        const result = await ApiService.get("items") as Item[]
        console.log(result)
        return result
    },

    create: async (newItem: Item) => {
        const result = await ApiService.create("items", newItem)
    },

    update: async (id: number, updatedItem: Item) => {
        const result = await ApiService.update("items", id, updatedItem)
    },
    
    delete: async (id: number) => {
        const result = await ApiService.delete("items", id)
    },
}

export default ItemService