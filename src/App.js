import { useCallback, useEffect, useState } from "react";
import CalcBody from "./components/CalcBody/CalcBody";
import CalcHeader from "./components/CalcHeader/CalcHeader";
import CalcScreen from "./components/CalcScreen/CalcScreen";
import History from "./components/History/History";
import { useKeyBoard } from "./hooks/useKeyboard";

const MAX_VALUE = 10

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [inputNumber, setInputNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('')
  const [result, setResult] = useState('')
  const [operationType, setOperationType] = useState('')
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [historyOperations, setHistoryOperations] = useState(() => {
    return JSON.parse(localStorage.getItem('history'))
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
  //handling operations
  const handleOperations = useCallback((type = '') => {
    if (!firstNumber) {
      setFirstNumber(inputNumber)
      setInputNumber('')
      setOperationType(type)
    } else {
      setSecondNumber(inputNumber)
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
  
      setInputNumber(resultValue.toString())
      setResult(resultValue.toString())
    }
  },[firstNumber,inputNumber, operationType])

  const reset = (resetForHistory) => {
    setFirstNumber('');
    setInputNumber('');
    setSecondNumber('');
    setOperationType('');
  }

  const handleClearHistory = () => {
    setHistoryOperations([])
    localStorage.setItem('history', JSON.stringify([]))
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

  

  useEffect(() => {
    const prevHistoryItems = JSON.parse(localStorage.getItem('history')) || [];
  
    if (firstNumber || secondNumber || operationType) {
      const newHistoryItem = {
        operationType,
        firstNumber,
        secondNumber,
        result
      };

      const historyItems = [newHistoryItem, ...prevHistoryItems];
      setHistoryOperations(historyItems)
      localStorage.setItem('history', JSON.stringify(historyItems));
      setSecondNumber('');
      setFirstNumber('');
      setOperationType('');
    }
  }, [result]);
  //handling keyboard events with custom hook
  useKeyBoard(["Backspace"], handleDelete, inputNumber)
  useKeyBoard(["="], function() {if(firstNumber) {handleOperations()}}, inputNumber)
  useKeyBoard(['+','-', '/','*'], handleOperations, inputNumber)
  useKeyBoard(['1','2','3','4','5','6','7','8','9','0'], handleInputChange, inputNumber)

  return (
    <div className="app">
        <div className="container">
            <CalcHeader setCurrentTheme={setCurrentTheme} />
            <CalcScreen inputNumber={inputNumber} setInputNumber={setInputNumber} MAX_VALUE={MAX_VALUE} handleCopy={handleCopy} />
            <CalcBody firstNumber={firstNumber} handleHistory={handleHistory} handleOperations={handleOperations} handleInputChange={handleInputChange} reset={reset} handleDelete={handleDelete} />
            {isHistoryOpen && <History handleClearHistory={handleClearHistory} historyOperations={historyOperations} />}
        </div>
    </div>
  );
}

export default App;
