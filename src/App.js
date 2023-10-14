import { useEffect, useState, useCallback } from "react";
import CalcBody from "./components/CalcBody";
import CalcHeader from "./components/CalcHeader";
import CalcScreen from "./components/CalcScreen";

const MAX_VALUE = 10

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [inputNumber, setInputNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState('');

  const handleInputChange = useCallback((value) => {
    inputNumber.length <= MAX_VALUE && setInputNumber((prev)=> `${prev}${value}`)
},[inputNumber.length])

  const handleOperations = useCallback((type) => {
      if(!firstNumber) {
        setFirstNumber(inputNumber)
        setInputNumber('')
      }else{
        if(type === '+') {
          setInputNumber(Number(firstNumber) + Number(inputNumber))
          setFirstNumber('')
        }
        if(type === '-') {
          setInputNumber(Number(firstNumber) - Number(inputNumber))
          setFirstNumber('')
        }
        if(type === '*') {
          setInputNumber(Number(firstNumber) * Number(inputNumber))
          setFirstNumber('')
        }
        if(type === '/') {
          setInputNumber(Number(firstNumber) / Number(inputNumber))
          setFirstNumber('')
        } 
      }
    

  },[firstNumber, inputNumber])

  // effect for handling theme 
  useEffect(() => {
    let localSTheme = localStorage.getItem('theme');
   
    if (!localSTheme) {
        setCurrentTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }else{
      setCurrentTheme(localSTheme)
    }
    document.documentElement.setAttribute('data-theme', currentTheme);
  },[currentTheme])

  //effect for handling keyboard events 
  useEffect(() => {
    const handlekeyboards = (e) => {
      const {key} = e
      if(key === 'Backspace') {
        setInputNumber((prev) => prev.slice(0,-1))
      }

      const keyNumber = +key;

      if(keyNumber >= 0 && keyNumber <= 9) {
        handleInputChange(keyNumber)
      }

      if(key === '.') {
        handleInputChange(key)
      }
      
      if(['+','-','*','/'].includes(key)) {
        handleOperations(key)
      }
    }
    document.addEventListener('keydown', handlekeyboards)

    return function() {
      document.removeEventListener('keydown', handlekeyboards)
    }
  },[inputNumber, handleInputChange, handleOperations])
  return (
    <div className="app">
        <div className="container">
            <CalcHeader setCurrentTheme={setCurrentTheme} />
            <CalcScreen inputNumber={inputNumber} setInputNumber={setInputNumber} MAX_VALUE={MAX_VALUE} />
            <CalcBody handleOperations={handleOperations} handleInputChange={handleInputChange} />
        </div>
    </div>
  );
}

export default App;
