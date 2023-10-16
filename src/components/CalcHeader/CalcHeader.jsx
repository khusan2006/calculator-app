import React from 'react';
import './calcheader.css'

const CalcHeader = ({setCurrentTheme}) => {
  const handleForm = (theme) => {
    localStorage.setItem('theme', theme)
    setCurrentTheme(theme)
  }
  return (
    <header className='header'>
      <h4 className='header__text'>calc</h4>
      <div className='theme'>
        <h4 className='theme__text'>theme</h4>
        <div className="theme__switcher" >
          <input className='hidden theme__swithcer-radio' type="radio" name='theme__switch'  value="dark" id='dark' />
          <input className='hidden theme__swithcer-radio' type="radio" name='theme__switch'  value='lught' id='light' />
          <input className='hidden theme__swithcer-radio' type="radio" name='theme__switch' value='vintage' id='vintage' />


          <div className="theme__switcher-indicators">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>
          <div className="theme__label-container">
          <label className='theme__label'  onClick={() => handleForm('dark')} htmlFor="dark">
            <span className='hidden'>theme</span>
          </label>
          <label className='theme__label' onClick={() => handleForm('light')} htmlFor="light">
            <span className='hidden'>theme</span>
          </label>
          <label className='theme__label'  onClick={() => handleForm('vintage')}  htmlFor="vintage">
            <span className='hidden'>theme</span>
          </label>

          <span className='circle'>&nbsp;</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default CalcHeader
