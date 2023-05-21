import React, { useContext } from 'react'
import Camera from '../image/camera.png';
import AddUser from '../image/addUser.png';
import Exit from '../image/exit.png';
import More from '../image/more.png';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';


const Chat = () => {
  const { data } = useContext(ChatContext);

  
  return (
    <div className='chat'>
        <div className='chatInfo'>
            <span> {data.user?.displayName} </span>
            <div className='chatIcons'>
                <img src={Camera} alt=''/>
                <img src={AddUser} alt=''/>
                <img src={Exit} alt='' />
                <img src={More} alt=''/>
            </div>
        </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat
