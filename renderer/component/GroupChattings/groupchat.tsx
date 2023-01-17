import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react'
import { collection, doc, getDoc, where, query, serverTimestamp, setDoc, updateDoc, getDocs, onSnapshot, arrayUnion } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { AuthContext } from '../../firebase/AuthContext';
import { Input } from 'antd';
import GroupList from './grouplist';

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


function GroupChat() {
    const [username, setUsername] = useState("");
    const [err, setErr] = useState(false);
    const { user } = useContext(AuthContext)
    const [groupUser2, setGroupUser2] = useState(null)

    const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    // TODO: groupuser 만들기

    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setGroupUser2(doc.data());
        });
    } catch (err) {
        setErr(true);
    }
    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
    const combinedId = user.uid > groupUser2.uid ? user.uid + groupUser2.uid : groupUser2.uid + user.uid;
    console.log("combinedId",combinedId)
    try{
        const res = await getDoc(doc(db, "chats2", combinedId));

        if(!res.exists()){
            // chats 컬렉션 안에 체팅 생성
            await setDoc(doc(db, "chats2", combinedId), { messages: [] })

            // 1: 33:25~
            //  유저 채팅 생성
            await updateDoc(doc(db, "groupChats", groupUser2.uid), {
              members: arrayUnion({
                [combinedId + ".userInfo"]: {
                  uid: user.uid,
                  displayName: user.displayName,
                },
                [combinedId + ".date"]: serverTimestamp(),
              })
            });

            await updateDoc(doc(db, "groupChats", user.uid), {
              members: arrayUnion({
                [combinedId + ".userInfo"]: {
                  uid: groupUser2.uid,
                  displayName: groupUser2.displayName,
                },
                [combinedId + ".date"]: serverTimestamp(),
              })
            });
        }
    } catch (err) {}

    setGroupUser2(null);
    setUsername("")
    }

  return (
    <>
        {/* <Input style={{ height: 40, marginBottom: 16, marginTop: 12, borderRadius: 0, border: "none" }}
            type="text" 
            placeholder = "Find a groupUser" 
            onPressEnter={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username} />
        {err && <span>User not found!</span>}
        {groupUser2 && (
            <div onClick={handleSelect} style={userList}>
                <Avatar shape="square" icon={<UserOutlined />} size={50} style={{ background:"lightgray"}}/>
                <div style={{ color:"white"}}>
                    <div>{groupUser2.displayName}</div>
                </div>
            </div>
        )} */}
        <GroupList />
    </>
  )
}

export default GroupChat