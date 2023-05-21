import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

// Create Authentication Context
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  // Set initial state to null
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Listen for changes in authentication
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
      }
    });

    return () => {
      unsub();
    };
  }, []);

  
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
