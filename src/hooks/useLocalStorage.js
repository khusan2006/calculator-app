import { useEffect } from "react"

export const useLocalStorage = (name, value) => {
    useEffect(() => {
        const item = JSON.stringify(value)
        localStorage.setItem(name, item)
    },[name, value])
}