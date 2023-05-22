import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';



const Chats = () => {
    // Local State
    const [chats,setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    // Get the chats from the database
    useEffect(()=> {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc)=>{
                setChats(doc.exists() ? doc.data() : {});
            });
    
            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    },[currentUser.uid]);


    // Handle selecting a user
    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload:u})
    }



  return (
    <div className='chats'>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=> (
            <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
                <img src={chat[1].userInfo.photoURL} alt='' />
                <div className='userChatMsg'>
                    <div>
                    <span> {chat[1].userInfo.displayName} </span>
                    <p> {chat[1].lastMessage?.text} </p>
                    </div>
                    <button>Leave</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Chats
