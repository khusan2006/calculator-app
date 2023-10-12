import React from 'react'

const CalcBody = () => {
  return (
    <div className='calc-body'>
        <span className='body__history'>History</span>
        <span className='body__voice'>voice</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span className='body__del'>DEL</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>+</span>
        <span>3</span>
        <span>2</span>
        <span>1</span>
        <span>-</span>
        <span>.</span>
        <span>0</span>
        <span>/</span>
        <span>x</span>
        <span className='body__reset'>Reset</span>
        <span className='body__equal'>=</span>
    </div>
  )
}

export default CalcBody
