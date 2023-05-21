import React, { useState } from 'react'
import PImg from '../image/imginput.png';
import GoogleIcon from '../image/google.png';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';


const Login = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;

        try{
          await signInWithEmailAndPassword(auth, email, password);
          navigate("/");
        } catch(err){
            setError(err);
        }
    }

    const handleGoogleSignIn = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        navigate("/");
      } catch (err) {
        setError(err);
      }
    };


  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>My Chat App</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <button>Sign In</button>
                <div className="googleSignUp" onClick={handleGoogleSignIn}>
                  <img src={GoogleIcon} alt="Google Icon" />
                  <span>Sign In with Google</span>
                </div>
                {error && <span>Something went wrong!</span>}
            </form>
            <p> Not registered yet? <Link to="/register">REGISTER</Link></p>

        </div>
    </div>
  )
}

export default Login