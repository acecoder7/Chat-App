import React, { useContext } from 'react';
import PP from '../image/pp.jpg';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

  const { currentUser } = useContext(AuthContext);
  return (
    <div className='navbar'>
        <span className='logo'>My Chat App</span>
        <div className='user'>
            <img src={currentUser.photoURL} alt=''/>
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth, )}>LOGOUT</button>
        </div>
    </div>
  )
}

export default Navbar