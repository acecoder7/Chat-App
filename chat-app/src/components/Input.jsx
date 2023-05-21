import React from 'react';
import ImgIn from '../image/camera.png';
import Attach from '../image/web.png';

const Input = () => {
  return (
    <div className='input'>
        <input type='text' placeholder='Type your message...' />
        <div className='send'>
            <img src={Attach} alt='' />
            <input type='file' style={{display:"none"}} id="fileImg" />
            <label htmlFor='fileImg'>
                <img src={ImgIn} alt='' />
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input