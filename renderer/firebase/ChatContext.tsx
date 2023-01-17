import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext<any>({})

interface AuthProviderProps {
    children: React.ReactNode;
}
  

export const ChatContextProvider = ({ children }: AuthProviderProps) => {
    const { user } = useContext(AuthContext);
    const INITIAL_STATE = {
        chatId: "null",
        user:{}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user : action.payload,
                    chatId : user.uid > action.payload.uid 
                    ? user.uid + action.payload.uid 
                    : action.payload.uid + user.uid,
                };
            default:
                return state;   
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
          {children}
        </ChatContext.Provider>
      );
}