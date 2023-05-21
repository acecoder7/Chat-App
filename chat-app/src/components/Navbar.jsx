import React from 'react';
import PP from '../image/pp.jpg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  return (
    <div className='navbar'>
        <span className='logo'>My Chat App</span>
        <div className='user'>
            <img src={PP} alt=''/>
            <span>Harshita</span>
            <button onClick={()=>signOut(auth, )}>LOGOUT</button>
        </div>
    </div>
  )
}

export default Navbar