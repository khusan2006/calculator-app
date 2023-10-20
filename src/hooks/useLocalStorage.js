import { useEffect } from "react"

export const useLocalStorage = (name, value, callback=()=>{}) => {
    useEffect(() => {
        const item = JSON.stringify(value)
        localStorage.setItem(name, item)
        callback()
    },[name, value, callback])
}