
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Input, MenuProps } from 'antd';
import { Layout, Menu } from 'antd';

import ChatRoom from '../component/Chattings/chatroom';
// import { AuthContext } from '../firebase/AuthContext';
import Users from '../component/Users/users';

import { auth, db } from "../firebase/firebase";
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { AuthContext } from '../firebase/AuthContext';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

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
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <Header style={{ display: "flex", justifyContent: "space-around", padding: 0, color:"white" }}>
        <div>
          {user.displayName}
          </div>
        {/* TODO: logout 에러 */}
        <button 
        style={{bottom: "0%", right: "0%", minHeight: 40, border: "none", background: "#001529", color:"white"}} 
        onClick={() => signOut(auth)
        .then(() => {Protected})
      }
        >Logout</button>
      </Header>
      <Users />
      </Sider>
      <ChatRoom />
    </Layout>
  )
}

export default Chat