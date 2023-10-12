import { useEffect, useState } from "react";
import CalcBody from "./components/CalcBody";
import CalcHeader from "./components/CalcHeader";
import CalcScreen from "./components/CalcScreen";

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark')
  useEffect(() => {
    let localSTheme = localStorage.getItem('theme');
   
    if (!localSTheme) {
        setCurrentTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    }else{
      setCurrentTheme(localSTheme)
    }


    document.documentElement.setAttribute('data-theme', currentTheme);
  },[currentTheme])
  return (
    <div className="app">
        <div className="container">
            <CalcHeader setCurrentTheme={setCurrentTheme} />
            <CalcScreen />
            <CalcBody />
        </div>
    </div>
  );
}

export default App;
