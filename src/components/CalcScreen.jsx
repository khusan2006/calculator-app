import React from 'react'

const CalcScreen = ({inputNumber, setInputNumber}) => {
  function formatNumber() {
    return inputNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const removeCommas = (value) => {
    return value.replace(/,/g, '');
  }

  const handleChange = (e) => {
    if(inputNumber.length <= 10) {
      setInputNumber(removeCommas(e.target.value))
    }else{
      if(e.nativeEvent.inputType === 'deleteContentBackward') {
        setInputNumber(removeCommas(e.target.value))
      }else{
        return
      }
     
    }
  }
  return (
    <div className='screen-container'>
        <input type="text" inputMode='number' placeholder='0' className='screen' value={formatNumber()} onChange={handleChange} />
    </div>
  )
}

export default CalcScreen
