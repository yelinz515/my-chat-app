import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react'
import { collection, doc, getDoc, where, query, serverTimestamp, setDoc, updateDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { AuthContext } from '../../firebase/AuthContext';
import { Input } from 'antd';
import UserList from './userlist';
import GroupChattings from '../GroupChattings/groupchat';

const userList: React.CSSProperties = {
    display: "flex",
    // position: "relative",
    paddingLeft: 12,
    marginBottom: 12,
    alignItems: "center",
    columnGap: 10,
}

interface UserList {
    uid: string,
    displayName: string,
}

// TODO: https://www.youtube.com/watch?v=k4mjF4sPITE 1:18:48~


function Users() {
    const [username, setUsername] = useState("");
    const [err, setErr] = useState(false);
    const { user } = useContext(AuthContext)
    const [user2, setUser2] = useState(null)

    const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUser2(doc.data());
        });
    } catch (err) {
        setErr(true);
    }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
    const combinedId = user.uid > user2.uid ? user.uid + user2.uid : user2.uid + user.uid;
    try{
        const res = await getDoc(doc(db, "chats", combinedId));

        if(!res.exists()){
            // chats 컬렉션 안에 체팅 생성
            await setDoc(doc(db, "chats", combinedId), { messages: [] })

            //  유저 채팅 생성
            await updateDoc(doc(db, "userChats", user2.uid), {
                [combinedId + ".userInfo"]: {
                  uid: user.uid,
                  displayName: user.displayName,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });

            await updateDoc(doc(db, "userChats", user.uid), {
                [combinedId + ".userInfo"]: {
                  uid: user2.uid,
                  displayName: user2.displayName,
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
        }
    } catch (err) {}

    setUser2(null);
    setUsername("")
    }

  return (
    <>
        <Input style={{ height: 40, marginBottom: 16, borderRadius: 0, border: "none" }}
            type="text" 
            placeholder = "Find a user" 
            onPressEnter={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username} />
        {err && <span>User not found!</span>}
        {user2 && (
            <div onClick={handleSelect} style={userList}>
                <Avatar shape="square" icon={<UserOutlined />} size={50} style={{ background:"lightgray"}}/>
                <div style={{ color:"white"}}>
                    <div>{user2.displayName}</div>
                </div>
            </div>
        )}
        <UserList />
        <GroupChattings />
    </>
  )
}

export default Users