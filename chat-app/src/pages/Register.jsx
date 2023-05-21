import React, { useState } from 'react'
import PImg from '../image/imginput.png';
import GoogleIcon from '../image/google.png';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const DEFAULT_PROFILE_PICTURE_URL = {PImg};

    const handleGoogleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const res = await signInWithPopup(auth, provider);
          const user = res.user;
    
          // Check if the user already exists in the database
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
    
          if (!userDocSnap.exists()) {
            // If the user does not exist, create a new user document
            await setDoc(userDocRef, {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
            });
    
            await setDoc(doc(db, "userChats", user.uid), {});
          }
    
          navigate("/");
        } catch (err) {
          setError(true);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const profilePictureUrl = file
        ? await uploadProfilePicture(name, file) // Upload the selected profile picture
        : DEFAULT_PROFILE_PICTURE_URL; // Use the default profile picture URL

      await updateProfile(res.user, {
        displayName: name,
        photoURL: profilePictureUrl,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: name,
        email,
        photoURL: profilePictureUrl,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  const uploadProfilePicture = async (name, file) => {
    try {
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await uploadTask;

      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      return downloadURL;
    } catch (err) {
      setError(true);
      throw err;
    }
  };

  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>My Chat App</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Name' />
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <input type='file' id='imgfile' style={{display:"none"}} />
                <label htmlFor='imgfile'>
                    <img src={PImg} alt=''/>
                    <span>Add profile image</span>
                </label>
                <button>Sign Up</button>

                <div className="googleSignUp" onClick={handleGoogleSignUp}>
                    <img src={GoogleIcon} alt="Google Icon" />
                    <span>Sign Up with Google</span>
                </div>
                {error && <span>Something went wrong!</span>}
            </form>
            <p> Already Registered? <Link to="/login">LOGIN</Link></p>

        </div>
    </div>
  )
}

export default Register
