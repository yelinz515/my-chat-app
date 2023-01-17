import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from 'antd'
import { AuthContext } from '../../firebase/AuthContext';
import { UserOutlined } from '@ant-design/icons';
import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Link from 'next/link';
import { TeamOutlined } from '@ant-design/icons';
import { GroupChatContext } from '../../firebase/GroupChatContext';

const userList: React.CSSProperties = {
  display: "flex",
  // position: "relative",
  paddingLeft: 12,
  alignItems: "center",
  columnGap: 10,
  marginTop: 20
}

function GroupList() {
    const { user } = useContext(AuthContext);
    const { dispatch } = useContext(GroupChatContext);

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
  
    console.log("chats2", Object.entries(chats).map((chat) => chat[1].userInfo))

    const handleSelect = (user: any) => {
        dispatch({type: "CHANGE_USER", payload: user})
    }

    console.log("a", Object.entries(chats).map((chat) => chat[1].userInfo))
  return (
    <>
        {/* {Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((chat) => ( */}
        {/* TODO: 이름 때문에 모두 지칭했지만 선택 시 하나만 select */}
        <div key=""
             onClick={() => handleSelect(Object.entries(chats).map((chat) => chat[1].userInfo))} 
             style={userList}>
            <Avatar shape="square" icon={<UserOutlined />} size={40} style={{ background:"lightgray"}}/>
            <div style={{ color:"white"}}>
                <div>{Object.entries(chats).map((chat) => chat[1].userInfo.displayName)}</div>
            </div>
        </div>
        {/* ))} */}
    </>
  )
}

export default GroupList