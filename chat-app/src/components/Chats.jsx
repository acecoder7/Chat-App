import React from 'react';
import Pp from '../image/pp.jpg';

const Chats = () => {
  return (
    <div className='chats'>
        <div className='userChat'>
            <img src={Pp} alt='' />
            <div className='userChatMsg'>
                <span> Harshita </span>
                <p> Heyyy! </p>
            </div>
        </div>

        <div className='userChat'>
            <img src={Pp} alt='' />
            <div className='userChatMsg'>
                <span> Mansi Tomer </span>
                <p> Good morning </p>
            </div>
        </div>

        <div className='userChat'>
            <img src={Pp} alt='' />
            <div className='userChatMsg'>
                <span> Noor Jaben Naheed </span>
                <p> Happy new year </p>
            </div>
        </div>
    </div>
  )
}

export default Chats
