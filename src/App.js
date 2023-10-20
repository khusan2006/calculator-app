import {useState } from "react";
import CalcBody from "./components/CalcBody/CalcBody";
import CalcHeader from "./components/CalcHeader/CalcHeader";
import CalcScreen from "./components/CalcScreen/CalcScreen";
import History from "./components/History/History";
import { useKeyboard } from "./hooks/useKeyboard";
import { useLocalStorage } from "./hooks/useLocalStorage";

const MAX_VALUE = 10

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') ||
     window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  });
  const [inputNumber, setInputNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [operationType, setOperationType] = useState('')
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [historyOperations, setHistoryOperations] = useState(() => {
    return JSON.parse(localStorage.getItem('history') || '[]')
  })

  // handling changes
  const handleInputChange = (value) => {
    setInputNumber((prev)=> prev.length <= MAX_VALUE ? `${prev}${value}` : prev)
  }
  const handleDelete = () => {
    setInputNumber((prev) => prev.toString().slice(0,-1))
  }

  const handleHistory = () => {
    setIsHistoryOpen(prev => !prev)
  }
  //handling copying to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(inputNumber)
  }

  //resetting
  const handleReset = (fullReset) => {
    if(fullReset) setInputNumber('');
    setFirstNumber('');
    setOperationType('');
  }
  //handling operations
  const handleOperations = (type = '') => {
    if (!firstNumber) {
      setFirstNumber(inputNumber)
      setInputNumber('')
      setOperationType(type)
    } else {
      const num1 = Number(firstNumber)
      const num2 = Number(inputNumber)
      let resultValue
      
      switch (operationType) {
        case '+':
          resultValue = num1 + num2
          break
        case '-':
          resultValue = num1 - num2
          break
        case '*':
          resultValue = num1 * num2
          break
        case '/':
          resultValue = num1 / num2
          break
        default:
          break
      }
      setHistoryOperations(prev => [{
        firstNumber, secondNumber: inputNumber, result: resultValue, operationType
      },...prev])
      handleReset(false)
      setInputNumber(resultValue.toString())
    }
  }

  

  const handleClearHistory = () => {
    setHistoryOperations([])
 }

 const handleTheme = () => {
  document.documentElement.setAttribute('data-theme', currentTheme)
 }

  useLocalStorage('theme', currentTheme, handleTheme)
  useLocalStorage('history', historyOperations)

  //handling keyboard events with custom hook
  useKeyboard(["Backspace"], handleDelete, inputNumber)
  useKeyboard(["="], function() {if(firstNumber) {handleOperations()}}, inputNumber)
  useKeyboard(['+','-', '/','*'], handleOperations, inputNumber)
  useKeyboard(['1','2','3','4','5','6','7','8','9','0'], handleInputChange, inputNumber)

  return (
    <div className="app">
        <div className="container">
            <CalcHeader setCurrentTheme={setCurrentTheme} />
            <CalcScreen inputNumber={inputNumber} setInputNumber={setInputNumber} MAX_VALUE={MAX_VALUE} handleCopy={handleCopy} />
            <CalcBody firstNumber={firstNumber} handleHistory={handleHistory} handleOperations={handleOperations} handleInputChange={handleInputChange} handleReset={handleReset} handleDelete={handleDelete} />
            {isHistoryOpen && <History handleClearHistory={handleClearHistory} historyOperations={historyOperations} />}
        </div>
    </div>
  );
}

export default App;
