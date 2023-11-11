import React, { useState } from 'react'
import './calcbody.css'
import { useKeyboard } from '../../hooks/useKeyboard';

const MAX_VALUE = 10

const CalcBody = ({setInputNumber, handleHistory, setHistoryOperations, inputNumber}) => {
  const [firstNumber, setFirstNumber] = useState('');
  const [operationType, setOperationType] = useState('')
  

  const handleInputChange = (value) => {
    if(value === '.' && inputNumber.includes('.')) return
    setInputNumber((prev)=> prev.length <= MAX_VALUE ? `${prev}${value}` : prev)
  }

  const handleDelete = () => {
    setInputNumber((prev) => prev.toString().slice(0,-1))
  }

    //resetting
  const handleReset = (fullReset) => {
      if(fullReset) setInputNumber('');
      setFirstNumber('');
      setOperationType('');
  }
    //handling operations
  const handleOperations = (type = '=') => {
    if (!firstNumber) {
        setFirstNumber(inputNumber)
        setInputNumber('')
        setOperationType(type)
      } else {
        // returns if second number is not entered after one of the operations is clicked
        if(!inputNumber) return

        //updates operationType if user clicks another operation type instead of equal button
        //it will allow user to do another operation after current operation
        type !== '=' &&  setOperationType(type)

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
        // storing result to history object so that show in history section
        setHistoryOperations(prev => [{
          firstNumber, 
          secondNumber: inputNumber,
          result: resultValue,
          operationType
        },...prev])

        //resetting 
        if(type === "=") {
          handleReset(false)
          setInputNumber(resultValue.toString()) 
        }
        //handles cases where users clicks another operation instead of equal button
        if(type === '+' || '-' || '*' || '/'){
            setInputNumber('')
            setFirstNumber(resultValue)
        }
    }
  }

    useKeyboard(["Backspace"], handleDelete)
    useKeyboard(["="], () => {if(firstNumber) handleOperations()})
    useKeyboard(['+','-', '/','*'], handleOperations)
    useKeyboard(['1','2','3','4','5','6','7','8','9','0','.'], handleInputChange)
    
  
  return (
    <div className='calc-body'>
        <span className='body__history' onClick={handleHistory}>History</span>
        <span className='body__voice'>voice</span>
        <span onClick={() => handleInputChange(7)}>7</span>
        <span onClick={() => handleInputChange(8)}>8</span>
        <span onClick={() => handleInputChange(9)}>9</span>
        <span className='body__del' onClick={handleDelete}>DEL</span>
        <span onClick={() => handleInputChange(4)}>4</span>
        <span onClick={() => handleInputChange(5)}>5</span>
        <span onClick={() => handleInputChange(6)}>6</span>
        <span onClick={() => handleOperations('+')}>+</span>
        <span onClick={() => handleInputChange(3)}>3</span>
        <span onClick={() => handleInputChange(2)}>2</span>
        <span onClick={() => handleInputChange(1)}>1</span>
        <span onClick={() => handleOperations('-')}>-</span>
        <span onClick={() => handleInputChange(".")}>.</span>
        <span onClick={() => handleInputChange(0)}>0</span>
        <span onClick={() => handleOperations('/')}>/</span>
        <span onClick={() => handleOperations('*')}>x</span>
        <span className='body__reset' onClick={() => handleReset(true)}>Reset</span>
        <span className='body__equal' onClick={() => firstNumber && handleOperations('=')}>=</span>
    </div>
  )
}

export default CalcBody
