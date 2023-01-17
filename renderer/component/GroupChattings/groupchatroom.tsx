import React, { useContext, useEffect, useState } from 'react'
import { Layout } from 'antd';
import { Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GroupChatContext } from '../../firebase/GroupChatContext';
import { DocumentData, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { AuthContext } from '../../firebase/AuthContext';
import GroupMessages from './groupmessages';

function GroupChatRoom() {
    const {
        Header,
        Content,
    } = Layout;

    const { data } = useContext(GroupChatContext)

    // console.log("data2", data.user[0].displayName)
    const { user } = useContext(AuthContext);
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
  
    
  return (
    <Layout>
        <Header style={{ padding: 0, paddingLeft: 16, background: "#e6f4ff" }}>
        <Breadcrumb style={{ margin: '20px 0' }}>
          {/* 유저리스트 클릭 시 채팅방 이름 나타남 */}
        <Breadcrumb.Item>
          {/* GroupChattingRoom */}
          {`${data.user[0].displayName}, ${data.user[1].displayName}, ${data.user[2].displayName}`}
        </Breadcrumb.Item>
        {/* 1:1 채팅 시 삭제 */}
        <Breadcrumb.Item>
        <UserOutlined /> {Object.entries(chats).length}</Breadcrumb.Item>         
        </Breadcrumb>
        </Header>
        <Content style={{ margin: '0' }}>
          <GroupMessages />
        </Content>
    </Layout>
  )
}

export default GroupChatRoom