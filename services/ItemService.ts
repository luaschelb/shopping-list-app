import { Item } from "@/models/Item"
import ApiService from "./ApiService"

const ItemService = {
    getItems: async () => {
        return await ApiService.get("items") as Item[]
    },

    create: async (newItem: Item) => {
        return await ApiService.create("items", newItem)
    },

    update: async (id: number, updatedItem: Item) => {
        return await ApiService.update("items", id, updatedItem)
    },
    
    delete: async (id: number) => {
        return await ApiService.delete("items", id)
    },
}

export default ItemService