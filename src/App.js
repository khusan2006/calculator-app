import { useEffect, useState } from "react";
import CalcBody from "./components/CalcBody";
import CalcHeader from "./components/CalcHeader";
import CalcScreen from "./components/CalcScreen";

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [inputNumber, setInputNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('')

  const handleInputChange = (value) => {
   inputNumber.length <=10 && setInputNumber((prev)=> `${prev}${value}`)
  }
  const handleIncrement = () => {
    if(!firstNumber) {
      setFirstNumber(inputNumber)
      setInputNumber('')
    }else{
      setInputNumber(Number(firstNumber) + Number(inputNumber))
    }
  }


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
      
    }
    document.addEventListener('keydown', handlekeyboards)

    return function() {
      document.removeEventListener('keydown', handlekeyboards)
    }
  },[inputNumber])
  return (
    <div className="app">
        <div className="container">
            <CalcHeader setCurrentTheme={setCurrentTheme} />
            <CalcScreen inputNumber={inputNumber} setInputNumber={setInputNumber} />
            <CalcBody setInputNumber={setInputNumber} handleIncrement={handleIncrement} handleInputChange={handleInputChange} inputNumber={inputNumber} />
        </div>
    </div>
  );
}

export default App;
