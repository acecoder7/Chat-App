import { createContext, useContext, useReducer } from "react";
import { AuthContext } from "./AuthContext";

// Create Chat Context
export const ChatContext = createContext();

// Chat Context Provider
export const ChatContextProvider = ({ children}) => {
    const {currentUser} = useContext(AuthContext);

    // Initial State
    const INITIAL_STATE = {
        chatId: "null",
        user: {},
    };

    // Reducer
    const chatReducer = (state, action)=> {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid, 
                };

            default:
                return state;
        }
    }

    // Use Reducer
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    
    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )
}