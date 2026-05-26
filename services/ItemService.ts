import { Item } from "@/models/Item"
import { retryWithExponentialBackoff } from "@/utils/retryWithExponentialBackoff"
import ApiService from "./ApiService"

const ItemService = {
    getItems: async () => {
        const fn = async () => await ApiService.get("items") as Item[]
        return await retryWithExponentialBackoff<Item[]>(fn)
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