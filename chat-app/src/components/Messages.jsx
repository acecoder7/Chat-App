import React, { useContext, useEffect, useState } from 'react';
import Message from './Message.jsx';
import { ChatContext } from '../context/ChatContext.js';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase.js';


const Messages = () => {
  // Local State
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  // Get the message from the database
  useEffect(()=>{
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    }
  },[data.chatId])


  return (
    <div className='messages'>
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

export default Messages
