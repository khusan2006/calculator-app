import { useEffect, useState } from "react";
import CalcBody from "./components/CalcBody";
import CalcHeader from "./components/CalcHeader";
import CalcScreen from "./components/CalcScreen";

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [inputNumber, setInputNumber] = useState('');
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('')

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


  // useEffect(() => {
  //   document.addEventListener('keydown', event => {
  //     const key = event.key;
    
  //     if (key === 'Escape') {
  //         // resetCalculator();
  //         return;
  //     }
  
  //     if (key === 'Backspace') {
  //         setInputNumber((prev) => [...prev].splice(0,prev.length-1).join())
  //         return;
  //     }
  
  //     const keyNumber = +key;
  //     if (keyNumber >= 0 && keyNumber <= 9) {
  //         // getElement(`[data-key="${keyNumber}"]`).click();
  //         // getElement(`[data-key="${keyNumber}"]`).focus();
  //         return;
  //     }
  
  //     if (key === '.') {
  //         // getElement(`[data-key="."]`).click();
  //         // getElement(`[data-key="."]`).focus();
  //         return;
  //     }
  
  //     if (['+', '-', '/', '*'].includes(key)) {
  //         // getElement(`[data-operator="${key}"]`).click();
  //         // getElement(`[data-operator="${key}"]`).focus();
  //         return;
  //     }
  
  //     if (key === 'Enter') {
  //         event.preventDefault();
  //         // calculatorEqualButton.click();
  //         // calculatorEqualButton.focus();
  //     }
  // })
  // },[])
  return (
    <div className="app">
        <div className="container">
            <CalcHeader setCurrentTheme={setCurrentTheme} />
            <CalcScreen inputNumber={inputNumber} setInputNumber={setInputNumber} />
            <CalcBody setInputNumber={setInputNumber} handleIncrement={handleIncrement}  inputNumber={inputNumber} />
        </div>
    </div>
  );
}

export default App;
