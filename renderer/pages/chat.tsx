
import React, { useContext, useState } from 'react'
import { Layout } from 'antd';
import ChatRoom from '../component/Chattings/chatroom';
import Users from '../component/Users/users';

import { auth } from "../firebase/firebase";
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { AuthContext } from '../firebase/AuthContext';
import GroupChatRoom from '../component/GroupChattings/groupchatroom';

function Chat() {
  const { Header, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { user } = useContext(AuthContext);

  // console.log("user", user.displayName)

  const Protected = () => {
      if(!user){
        return router.push('./home')
      }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* <: collapsed - 화면 조절 */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{overflowY: "scroll"}}>
      <Header style={{ display: "flex", justifyContent: "space-around", padding: 0, color:"white" }}>
        <div>
          {user.displayName}
          </div>
        {/* TODO: logout 에러 - errorboundary */}
        <button 
        style={{bottom: "0%", right: "0%", minHeight: 40, border: "none", background: "#001529", color:"white"}} 
        onClick={() => signOut(auth)
        .then(() => {Protected})
      }
        >Logout</button>
      </Header>
      <Users />
      </Sider>
      {/* TODO: 그룹 채팅방일때 ? 그룹채팅 : 채팅 */}
      <ChatRoom />
      <GroupChatRoom />
    </Layout>
  )
}

export default Chat