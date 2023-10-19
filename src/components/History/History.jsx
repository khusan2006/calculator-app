import React from 'react';
import './history.css'

const History = ({handleClearHistory, historyOperations}) => {

//   const historyItems = JSON.parse(localStorage.getItem('history')) 
  return (
    <div className='history'>
        <div className="history__operations">
           {historyOperations?.map((item, id) => {
            return <div className="history__operation" key={id}>
            <span>
                {item.firstNumber} {item.operationType} {item.secondNumber}
            </span>
            <span>
                =
            </span>
            <span>
                {item.result}
            </span>
        </div>
           })}
        </div>
        <button className='history__btn' onClick={handleClearHistory}>Clear History</button>
    </div>
  )
}

export default History
