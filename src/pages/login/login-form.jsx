import React, { Component } from 'react'
import { Modal, Form, Input, Button, Checkbox } from 'antd';

import {withRouter} from 'react-router-dom'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

 class NormalLoginForm extends Component {

    state={
        username: '',
        password: '',
        isShow : false,
    }

    //实时动态获取输入框值
    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //忘记密码 （ok）点击事件回调
    handleOk = () =>{
        this.setState({
            isShow : false
        })
    }

    //忘记密码 （取消）点击事件回调
    handleCancel = () =>{
        this.setState({
            isShow : false
        })
    }
    
    //忘记密码点击显示Modal框
    handleClick =()=>{
        //console.log('1111')
        this.setState({
            isShow :true
        })
    }
    

    //表单提交触发回调将表单值传给父组件login
    onFinish = (values) => {
        console.log('Received values of form: ', values);
        //console.log('woshi:'+ values.username)
        this.props.getUsers(values)     
    }
    render() {
        const {username,password,isShow} = this.state
        return (
           <>
                {
                    isShow === true?  
                    (<Modal title="忘记密码？" visible={isShow} onOk={this.handleOk} onCancel={this.handleCancel}>
                        <p>请联系管理员重置账号密码。</p>                
                    </Modal>):null               
                }
                 <Form
                    name="normal_login"
                    className="login-form"             
                    onFinish={this.onFinish}
                    form={this.form}
                >
                    <Form.Item
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: '请输入用户名！',
                        },
                    ]}
                    >
                    <Input  style={{height:'40px'}} 
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="请输入账号" 
                    onChange={this.handleChange}
                    name="username"
                    />
                    </Form.Item>
                    <Form.Item
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: '请输入密码',
                        },
                    ]}
                    >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        style={{height:'40px'}}
                        type="password"        
                        placeholder="请输入密码"
                        name="password"
                        onChange={this.handleChange}
                    />
                    </Form.Item>
                
            
                    <Form.Item>
                    <Button disabled={ username === '' || password === ''}  style={{width:'260px',height:'40px'}} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    
                    </Form.Item>
                    <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <a className="login-form-forgot" href="javac:" onClick={this.handleClick}>
                        忘记密码
                    </a>
                    </Form.Item>
                </Form>
           </>
        )
    }
}
export default withRouter(NormalLoginForm)