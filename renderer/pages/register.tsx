import { Button, Form, Input, Layout, Typography } from 'antd';
import Link from 'next/link';
import React from 'react'
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useRouter } from 'next/router';
import { doc, setDoc } from "firebase/firestore"

function Register() {
  const {
    Header,
    Content,
} = Layout;
const { Title } = Typography;

const router = useRouter();

const onFinish = async(values: any) => {
  console.log("values", values);
  const displayName = values.displayName
  const email = values.email
  const password = values.password

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)

    //Update profile
    await updateProfile(res.user, {
      displayName
    });
    //create user on firestore
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      displayName,
      email,
    });

    //create empty user chats on firestore
    await setDoc(doc(db, "userChats", res.user.uid), {});
    // await setDoc(doc(db, "groupChats",  res.user.uid), { members: [] })
    
    alert("Registered/Saved successfully.")
    router.push('./home')
 
  } catch (error) {
    alert(error.message)
  }
};

  return (
    <React.Fragment>        
      <Header>
        <Link href="/home">
          <a>Back</a>
        </Link>
      </Header>
      <Content style={{ padding: 48 }}>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
            <div style={{ maxWidth: '100%', textAlign: 'center', paddingBottom: 24}}>
              <Title>Lune Chat</Title>
              <div>Register</div>
            </div>
            <Form.Item
            label="nickname"
            name="displayName"
            rules={[{ required: true, message: 'Enter your name.' }]}
            >
            <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Enter your email.' }]}
            >
            <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'Enter your password.' }]}
            >
            <Input.Password prefix={<KeyOutlined />} />
            </Form.Item>
            {/* avatar */}
            {/* <Form.Item label="Upload" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" block>
                Sign up
            </Button>
            </Form.Item>

        </Form>
        </Content>
    </React.Fragment>
  )
}

export default Register