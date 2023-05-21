import React, { useContext, useState } from 'react';
import Pp from '../image/pp.jpg';
import { query, collection, where, getDocs, doc, updateDoc, serverTimestamp, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';


const Search = () => {
  // Local State
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setError] = useState(false);

  // Get Current user from Context
  const { currentUser } = useContext(AuthContext);


  // Handle search function
  const handleSearch = async () => {
    // Query the database for the user
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    // Get the user data
    try {
      const querySnapshot = await getDocs(q);

      // If the user exists, set the user state to the user data
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
        setError(false);
      } else {
        setUser(null);
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };


  // Handle Enter Key press
  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };


  // Handle selecting a user
  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    // Check if the chat already exsists
    try {
      const chatDocRef = doc(db, "chats", combinedId);
      const chatDocSnap = await getDoc(chatDocRef);

      if (!chatDocSnap.exists()) {
        const chatData = {
        messages: []
      };
        await setDoc(chatDocRef, chatData);
      }

      // Add the chat to the user's chat List
        const currentUserChatRef = doc(db, "userChats", currentUser.uid);
        const userChatRef = doc(db, "userChats", user.uid);

        // Add the chat to the current user's chat list
        await updateDoc(currentUserChatRef, {
          [combinedId]: {
            userInfo: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL
            },
            date: serverTimestamp()
          }
        });

        // Add the chat to the other user's chat list
        await updateDoc(userChatRef, {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL
            },
            date: serverTimestamp()
          }
        }); 
      
    } catch (err) {
      console.error("Error creating chat:", err);
    }

    // Reset the state
    setUser(null);
    setUsername("");
  };

  
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type='text' placeholder='Search...' onChange={e => setUsername(e.target.value)} onKeyDown={handleKey} value={username} />
      </div>
      {err && <span> User not found! </span>}
      {user && (
        <div className='userChat' onClick={handleSelect}>
          <img src={user.photoURL || Pp} alt='' />
          <div className='userChatMsg'>
            <span> {user.displayName} </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;


