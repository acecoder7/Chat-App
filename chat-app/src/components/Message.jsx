import React from 'react';
import Pp from '../image/pp.jpg';

const Message = () => {
  return (
    <div className='message own'>
        <div className='msgInfo'>
            <img src={Pp} alt=''/>
            <span>just now</span>
        </div>
        <div className='msgBody'>
            <p>Hello</p>
            <img src={Pp} alt=''/>
        </div>
    </div>
  )
}

export default Message