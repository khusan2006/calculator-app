import React from 'react'

const CalcScreen = ({inputNumber, setInputNumber, MAX_VALUE}) => {
  function formatNumber() {
    return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  const handleChange = () => {
    return 
  }
  return (
    <div className='screen-container'>
        <input type="text" inputMode='number' placeholder='0' className='screen' value={formatNumber()} onChange={handleChange} />
    </div>
  )
}

export default CalcScreen
