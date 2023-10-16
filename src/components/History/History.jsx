import React from 'react';
import './history.css'

const History = () => {
  return (
    <div className='history'>
        <div className="history__operations">
            <div className="history__operation">
                <span>
                    837363 + 7
                </span>
                <span>
                    =
                </span>
                <span>
                    894688
                </span>
            </div>
        </div>
        <button className='history__btn'>Clear History</button>
    </div>
  )
}

export default History
