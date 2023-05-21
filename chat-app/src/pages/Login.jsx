import React from 'react'
import PImg from '../image/imginput.png';


const Login = () => {
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>My Chat App</span>
            <span className='title'>Login</span>
            <form>
                <input type='text' placeholder='Name' />
                <input type='email' placeholder='Email' />
                <button>Sign In</button>
            </form>
            <p> Not registered yet? REGISTER</p>

        </div>
    </div>
  )
}

export default Login