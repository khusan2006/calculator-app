import {useState } from "react";
import CalcBody from "./components/CalcBody/CalcBody";
import CalcHeader from "./components/CalcHeader/CalcHeader";
import CalcScreen from "./components/CalcScreen/CalcScreen";
import History from "./components/History/History";
import { useLocalStorage } from "./hooks/useLocalStorage";

const MAX_VALUE = 10

function App() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') ||
     window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  });
  const [inputNumber, setInputNumber] = useState('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const [historyOperations, setHistoryOperations] = useState(() => {
    return JSON.parse(localStorage.getItem('history') || '[]')
  })

  const handleHistory = () => {
    setIsHistoryOpen(prev => !prev)
  }
  //handling copying to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(inputNumber)
  }

  const handleClearHistory = () => {
    setHistoryOperations([])
 }

 const handleTheme = () => {
  document.documentElement.setAttribute('data-theme', currentTheme)
 }
  useLocalStorage('theme', currentTheme, handleTheme)
  useLocalStorage('history', historyOperations)


  return (
    <div className="app">
        <div className="container">
            <CalcHeader setCurrentTheme={setCurrentTheme} />
            <CalcScreen inputNumber={inputNumber} setInputNumber={setInputNumber} MAX_VALUE={MAX_VALUE} handleCopy={handleCopy} />
            <CalcBody  handleHistory={handleHistory} setHistoryOperations={setHistoryOperations} inputNumber={inputNumber} setInputNumber={setInputNumber} />
            {isHistoryOpen && <History handleClearHistory={handleClearHistory} historyOperations={historyOperations} />}
        </div>
    </div>
  );
}

export default App;
