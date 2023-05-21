import React, { useContext, useState } from 'react';
import ImgIn from '../image/camera.png';
import Attach from '../image/web.png';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';



const Input = () => {
  // Local State
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  // Get current use and data from context
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  // Handle sending a message
  const handleSend = async() => {

    // If there is an image, upload it to firebase storage
    if(img){
      try {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      // Listen to state changes, errors, and completion of the upload
      uploadTask.on(
        'state_changed',
          null,
          (error) => {
            console.error('Error uploading image:', error);
          },
        // When the image is successfully uploaded, get its download URL
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(doc(db, "chats", data.chatId),{
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img: downloadURL,
            }),
          });
        }
      );
      } catch (error) {
        console.log(error);
      }

      // If there is no image, just send the text message
    } else {

      // Update the messages array in the database
      await updateDoc(doc(db, "chats", data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now(),
        }),
      });
    }

    // Update the last message and date in the userChats collection
    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId + ".date"]:serverTimestamp(),
    })

    // Update the last message and date in the userChats collection
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId + ".lastMessage"]:{
        text,
      },
      [data.chatId + ".date"]:serverTimestamp(),
    })

    // Reset the state
    setText("");
    setImg(null);
  }


  
  return (
    <div className='input'>
        <input type='text' placeholder='Type your message...' onChange={e=>setText(e.target.value)} value={text} />
        <div className='send'>
            <img src={Attach} alt='' />
            <input type='file' style={{display:"none"}} id="fileImg" onChange={(e) => setImg(e.target.files[0])} />
            <label htmlFor='fileImg'>
                <img src={ImgIn} alt='' />
            </label>
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input