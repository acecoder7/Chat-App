import React, { useState } from 'react'
import PImg from '../image/imginput.png';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error)=>{
                    setError(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                        await updateProfile(res.user,{
                            name,
                            photoURL:downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            name,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    });

                }
            );

        } catch(err){
            setError(err);
        }
    }

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
                {error && <span>Something went wrong!</span>}
            </form>
            <p> Already Registered? LOGIN</p>

        </div>
    </div>
  )
}

export default Register
