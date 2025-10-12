import { fetch, FetchRequestInit } from 'expo/fetch';

const BaseUrl = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/"
const request = async (endpoint: string, init?: FetchRequestInit)=> {
    try
    {
        const res = await fetch(endpoint, init)
        if(!res.ok)
        {
            throw new Error(`Request ${endpoint} failed with status ${res.status}`, )
        }
        const contentType = res.headers?.get("content-type")
        if(contentType?.includes("application/json"))
            return res.json()
        return res
    }
    catch (error)
    {
        console.error('API error: ', error)
        throw error
    }
}

const ApiService = {
    get: async (endpoint: string) : Promise<object>=> {
        return await request(BaseUrl+endpoint)
    },

    delete: async(endpoint: string, id: number) => {
        return await request(`${BaseUrl}${endpoint}/${id}`, {
            method: "DELETE",
        })
    },

    create: async(endpoint: string, payload: object) => {
        return await request(`${BaseUrl}${endpoint}`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    },

    update: async(endpoint: string, id: number, payload: object) => {
        return await request(`${BaseUrl}${endpoint}/${id}`, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
    }
}

export default ApiService;