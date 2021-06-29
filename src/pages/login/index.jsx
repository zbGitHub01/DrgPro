import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Logo from './logo.png'
import './login.less'

export default class Login extends Component {
    render() {
        return (
            <div className='loginPage'>
                <header className='login-nav'>
                    <img src={Logo} alt='Logo'></img>
                    <h1>测试平台</h1>
                </header>
                <section className='login-content'>
                    <h2>登陆</h2>
                    <div className='login-form-super'>
                        <NormalLoginForm className='login-form-child'/>
                    </div>
                </section>
            </div>
        )
    }
}

function NormalLoginForm () {
     
    const [form] = Form.useForm()
    const [value,setUser] = React.useState({}); 
    const usernameRef = React.useRef()
    const passwordRef = React.useRef()
    

    console.log(usernameRef)


    // const a = form.getFieldValue('username')

    const onFinish = (values) => {
      console.log('Received values of form: ', values);
      console.log('woshi:'+ values.username)
      
      setUser({
          value: values
      })
     
    };
    
    
   
  
    // const [user,setUser] = React.useState({username: '',password:''});
    // const uname = usernameRef.current.getFieldsValue()  
    // const upass = passwordRef.current.getFieldsValue()  
    // setUser({
    //      username: uname,
    //      password: upass
    //      })
    //     console.log(user)
    // handleChange = (e)=>{       
    //     const [user,setUser] = React.UseState({username: '',password:''}); 
    //     setUser({
    //         [e.target.name]:e.target.value
    //     })
    //    console.log(user)
    // }

    return (
       
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input  style={{height:'40px'}} 
          prefix={<UserOutlined className="site-form-item-icon" />} 
          placeholder="请输入账号" 
          ref={usernameRef}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            style={{height:'40px'}}
            type="password"
            ref={passwordRef}
            
            placeholder="请输入密码"
          />
        </Form.Item>
       
  
        <Form.Item>
          <Button   style={{width:'260px',height:'40px'}} type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
         
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
           &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <a className="login-form-forgot" href="javac:">
            忘记密码
          </a>
        </Form.Item>
      </Form>
    );
  };

