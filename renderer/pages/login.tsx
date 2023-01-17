import { Breadcrumb, Button, Checkbox, Form, Input, Layout, Typography } from 'antd';
import Head from 'next/head'
import React from 'react'
import { UserOutlined,KeyOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function Login() {
  const {
    Content,
  } = Layout;
  const { Title } = Typography;
  

  const router = useRouter();

  const onFinish = async(values: any) => {
    // console.log("values", values);
    const email = values.email
    const password = values.password
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('./chat')
   
    } catch (error) {
      if(error.code === "auth/user-not-found"){
        alert(" The ID or password you entered is incorrect.")
      } 
      return error;
    }
  }

  return (
    <React.Fragment>
      <Head>
        <title>채팅 프로그램</title>
      </Head>
      <Content style={{ padding: 48, height: "100%" }}>
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
            <div>Login</div>
          </div>
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

          {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 8 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit" block>
              Sign in
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <div>You don't have an account? </div>
            <Link href='/register'>
              <a>Register</a>
            </Link>
          </Form.Item>
        </Form>
      </Content>
    </React.Fragment>
  )
}

export default Login