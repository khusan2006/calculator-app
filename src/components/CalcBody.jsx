import React from 'react'

const CalcBody = ({handleInputChange, handleOperations}) => {
  
  return (
    <div className='calc-body'>
        <span className='body__history'>History</span>
        <span className='body__voice'>voice</span>
        <span onClick={() => handleInputChange(7)}>7</span>
        <span onClick={() => handleInputChange(8)}>8</span>
        <span onClick={() => handleInputChange(9)}>9</span>
        <span className='body__del'>DEL</span>
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
        <span className='body__reset'>Reset</span>
        <span className='body__equal'>=</span>
    </div>
  )
}

export default CalcBody
