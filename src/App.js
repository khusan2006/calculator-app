import { useEffect, useState } from "react";
import CalcBody from "./components/CalcBody/CalcBody";
import CalcHeader from "./components/CalcHeader/CalcHeader";
import CalcScreen from "./components/CalcScreen/CalcScreen";
import History from "./components/History/History";

const MAX_VALUE = 10

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [inputNumber, setInputNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('')
  const [result, setResult] = useState('')
  const [operationType, setOperationType] = useState('')
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  console.log('render')
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
  
      setInputNumber(resultValue.toString())
      setResult(resultValue.toString())
    }
  }

  const reset = () => {
    setInputNumber('');
    setFirstNumber('');
    setSecondNumber('');
    setOperationType('');
  }

  const handleClearHistory = () => {
    setInputNumber('')
    localStorage.setItem('history', JSON.stringify([]))
  }

  const handlekeyboards = (event) => {
    const { key } = event;
  
    if (key === 'Backspace') {
      handleDelete();
    } else if (/[\d.]/.test(key)) {
      handleInputChange(key);
    } else if ('+-*/'.includes(key)) {
      handleOperations(key);
    } else if (['=', 'Enter'].includes(key)) {
      if (firstNumber) {
        handleOperations();
      }
    }
  };

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
  },[inputNumber, firstNumber, secondNumber])

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
  
      localStorage.setItem('history', JSON.stringify(historyItems));
      setSecondNumber('');
      setFirstNumber('');
      setOperationType('');
    }
  }, [result]);

  return (
    <div className="app">
        <div className="container">
            <CalcHeader setCurrentTheme={setCurrentTheme} />
            <CalcScreen inputNumber={inputNumber} setInputNumber={setInputNumber} MAX_VALUE={MAX_VALUE} handleCopy={handleCopy} />
            <CalcBody firstNumber={firstNumber} handleHistory={handleHistory} handleOperations={handleOperations} handleInputChange={handleInputChange} reset={reset} handleDelete={handleDelete} />
            {isHistoryOpen && <History handleClearHistory={handleClearHistory} />}
        </div>
    </div>
  );
}

export default App;
