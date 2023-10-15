import { useEffect, useState } from "react";
import CalcBody from "./components/CalcBody";
import CalcHeader from "./components/CalcHeader";
import CalcScreen from "./components/CalcScreen";

const MAX_VALUE = 10

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [inputNumber, setInputNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [operationType, setOperationType] = useState('')
  // handling changes
  const handleInputChange = (value) => {
    setInputNumber((prev)=> prev.length <= MAX_VALUE ? `${prev}${value}` : prev)
  }
  const handleDelete = () => {
    setInputNumber((prev) => prev.toString().slice(0,-1))
  }
  //handling operations
 const handleOperations = (type='') => {
      if(!firstNumber) {
        setFirstNumber(inputNumber)
        setInputNumber('')
        setOperationType(type)
      }else{
        if(operationType === '+') {
          setInputNumber((Number(firstNumber) + Number(inputNumber)).toString())
          setFirstNumber('')
          setOperationType('')
        }
        if(operationType === '-') {
          setInputNumber((Number(firstNumber) - Number(inputNumber)).toString())
          setFirstNumber('')
          setOperationType('')
        }
        if(operationType === '*') {
          setInputNumber((Number(firstNumber) * Number(inputNumber)).toString())
          setFirstNumber('')
          setOperationType('')
        }
        if(operationType === '/') {
          setInputNumber((Number(firstNumber) / Number(inputNumber)).toString())
          setFirstNumber('')
          setOperationType('')
        } 
      }
    

  }

  const reset = () => {
    setInputNumber('')
    setFirstNumber('')
  }

  const handlekeyboards = (e) => {
    const {key} = e
    if(key === 'Backspace') {
      handleDelete() 
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
    if(key === '=' || key === 'Enter') {
      firstNumber && handleOperations()
    }
  }

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

    document.addEventListener('keydown', handlekeyboards)

    return function() {
      document.removeEventListener('keydown', handlekeyboards)
    }
  },[inputNumber, firstNumber])

  return (
    <div className="app">
        <div className="container">
            <CalcHeader setCurrentTheme={setCurrentTheme} />
            <CalcScreen inputNumber={inputNumber} setInputNumber={setInputNumber} MAX_VALUE={MAX_VALUE} />
            <CalcBody firstNumber={firstNumber} handleOperations={handleOperations} handleInputChange={handleInputChange} reset={reset} handleDelete={handleDelete} />
        </div>
    </div>
  );
}

export default App;
