import React, { useContext, useEffect, useRef } from 'react';
import Pp from '../image/pp.jpg';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Message = ({message}) => {
  // Local State
  const { currentUser } = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  // Scroll to the bottom of the messages
  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message]);


  // Get the time difference
  const getTimeDifference = () => {
    const currentTime = new Date();
    const messageTime = new Date(message.date.seconds * 1000);
    const timeDifference = currentTime - messageTime;

    // If the message was sent less than a minute ago
    if (timeDifference < 60000) {
      return "just now";

    // If the message was sent less than an hour ago  
    } else if (timeDifference < 3600000) {
      const minutes = Math.floor(timeDifference / 60000);
      return `${minutes} min ago`;

    // If the message was sent less than a day ago
    } else if (timeDifference < 86400000) {
      const hours = Math.floor(timeDifference / 3600000);
      return `${hours} hr ago`;

    // If the message was sent more than a day ago
    } else {
      const days = Math.floor(timeDifference / 86400000);
      return `${days} day ago`;
    }
  };

  

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && "own"}`}>
        <div className='msgInfo'>
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt=''/>
            <span>{getTimeDifference()}</span>
        </div>
        <div className='msgBody'>
            <p>{message.text}</p>
            {message.img && <img src={message.img} alt=''/>}
        </div>
    </div>
  )
}

export default Message