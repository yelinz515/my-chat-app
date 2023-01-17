import React, { useContext, useEffect, useState } from 'react'
import { Layout } from 'antd';
import { Breadcrumb } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ChatContext } from '../../firebase/ChatContext';
import Messages from './messages';

function ChatRoom() {
    const {
        Header,
        Content,
    } = Layout;

    const { data } = useContext(ChatContext)
    
  return (
    <Layout>
        <Header style={{ padding: 0, paddingLeft: 16, background: "#e6f4ff" }}>
        <Breadcrumb style={{ margin: '20px 0' }}>
          {/* 유저리스트 클릭 시 채팅방 이름 나타남 */}
        <Breadcrumb.Item>{data.user?.displayName}</Breadcrumb.Item>
        {/* 1:1 채팅 시 삭제 */}
        <Breadcrumb.Item>
        <UserOutlined /> 2</Breadcrumb.Item>         
        </Breadcrumb>
        </Header>
        <Content style={{ margin: '0' }}>
          <Messages />
        </Content>
    </Layout>
  )
}

export default ChatRoom