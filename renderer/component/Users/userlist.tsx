import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import { AuthContext } from '../../firebase/AuthContext';
import { UserOutlined } from '@ant-design/icons';
import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { ChatContext } from '../../firebase/ChatContext';
import Link from 'next/link';
import { TeamOutlined } from '@ant-design/icons';

const userList: React.CSSProperties = {
  display: "flex",
  // position: "relative",
  paddingLeft: 12,
  alignItems: "center",
  columnGap: 10,
}


function UserList() {
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const [chats, setChats] = useState([]);
    
    useEffect(() =>{
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", user.uid),(doc:DocumentData) => {
            setChats(doc.data());
          });
      
          return () => {
            unsub();
          };
        };
        
        user.uid && getChats();
      },[user.uid])
  
      // console.log("chats", Object.entries(chats).length)

    const handleSelect = (user: any) => {
        dispatch({type: "CHANGE_USER", payload: user})
    }
  return (
    <>
        {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
        <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} style={userList}>
            <Avatar shape="square" icon={<UserOutlined />} size={40} style={{ background:"lightgray"}}/>
            <div style={{ color:"white", paddingTop:10}}>
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
            </div>
        </div>
        ))}
    </>
  )
}

export default UserList