import { Avatar, Image, Input } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { UserOutlined } from '@ant-design/icons';
import { arrayUnion, doc, DocumentData, onSnapshot, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { ChatContext } from '../../firebase/ChatContext';
import { AuthContext } from '../../firebase/AuthContext';
import { v4 as uuid } from "uuid"
import GroupMessage from './groupmessage';
import { GroupChatContext } from '../../firebase/GroupChatContext';

const chatContainer: React.CSSProperties = {
    display: "inline-block",
    position: "relative", 
    width: "100%", 
    height: "90%",
    backgroundColor: "#bae0ff",
    overflowY: "scroll",
}
const myChat: React.CSSProperties = {
    width: "100%",
    marginTop: "5px",
    paddingRight: "3px",
    marginBottom: "3px",
    textAlign: "right",
    wordBreak: "break-all",
}

function GroupMessages() {
    const { data } = useContext(GroupChatContext)
    const { user } = useContext(AuthContext);

    const [messages, setMessages] = useState([])
    const [text, setText] = useState("")

    useEffect(() =>{
        const unsub = onSnapshot(doc(db, "chats2", data.chatId),(doc:DocumentData) => {
          doc.exists() && setMessages(doc.data().messages);
        });
    
        return () => {
          unsub();
        };
        
    },[data.chatId])

    console.log("messages2",messages)
    console.log("Data2", data)

    const handleSend = async () => {
        await updateDoc(doc(db, "chats2", data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
            }),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", data.user[0].uid), {
            [data.chatId + ".lastMessage"]:{
                text
            },
            [data.chatId + ".date"]: serverTimestamp()
        });

        setText("");
    }



  return (
    <>
        <div style={chatContainer}>
            <div style={myChat}>
                {/* {messages === undefined || messages.map((m)=>( */}
                    <GroupMessage 
                    // message={m} 
                    // key={m.id}
                    />
                {/* ))} */}
            </div>
        </div>
        {/* chat input */}
        <div style={{ display: "flex", padding: '10px', minHeight: 64, background:"white"}}>
            <Input 
                style={{width: "100%", height: "100%", minHeight: 40, border: "none"}} 
                type="text"
                placeholder="Type Something..."
                onChange={(e) => setText(e.target.value)}
                value={text}/>
            <button 
                style={{bottom: "0%", right: "0%", minHeight: 40, border: "none"}} 
                onClick={handleSend}
                >
                Send
                </button>
        </div>
    </>
  )
}

export default GroupMessages