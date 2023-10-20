import { useEffect } from "react"

export const useKeyboard = (key, callbackFunction,) => {
    useEffect(() => {
        const handlekeyboards = (event) => {
           if(key.includes(event.key)) {
            callbackFunction(event.key)
           }
        };
          
        document.addEventListener('keydown', handlekeyboards)
    
        return function() {
          document.removeEventListener('keydown', handlekeyboards)
        }
      },[callbackFunction, key])
}