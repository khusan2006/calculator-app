import React from 'react';
import './calcscreen.css'

const CalcScreen = ({inputNumber, handleCopy}) => {
  function formatNumber() {
    return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  const handleChange = () => {
    return 
  }
  return (
    <div className='screen-container'>
        <div className="copy-icon" onClick={handleCopy}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
            <path d="M11.5 1a.5.5 0 0 1 .5.5V3h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V1.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M4.354 2.354a.5.5 0 0 1 .293-.293.5.5 0 0 1 .293.293L4.646 3.5h6.708a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .354-.646zM10 1H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2.5V1z"/>
          </svg>   
        </div>      
        <input type="text" inputMode='number' placeholder='0' className='screen' value={formatNumber()} onChange={handleChange} />
    </div>
  )
}

export default CalcScreen
