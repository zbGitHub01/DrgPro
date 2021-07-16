import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { message } from 'antd';
import NormalLoginForm from './login-form'
import {loginAxios} from '../../axios'
import Logo from './logo.png'
import './login.less'

export default class Login extends Component {

    //获取到form子组件的值进行 axios登陆请求
    getUsers = (values)=>{
        let localStorage = window.localStorage
        const {username,password} = values
        loginAxios(values).then(res=>{
            if(res.data.status === 0){
                console.log(res.status)
                message.success('登陆成功')               
                //将用户信息存储在localStorage中
                localStorage.USERNAME = username
                localStorage.PASSWORD = password
                //登陆成功跳转
                this.props.history.replace('/home')
                console.log(localStorage.length)
                //window.location.href = "/home"; 
            }else {
                message.error(res.data.msg)
                console.log(res.data)
            }
        }).catch(err=>{
            console.log(err)
        })
    }

  
    render() {
        //如果localStorage中有数据 则跳转至主页
        if (window.localStorage.length > 0) {       
            return <Redirect to='/home'/>
        }
        return (
            <div className='loginPage'>
                <header className='login-nav'>
                    <img src={Logo} alt='Logo'></img>
                    <h1>DRG分组器规则维护测试平台</h1>
                </header>
                <section className='login-content'>
                    <h2>登陆</h2>
                    <div className='login-form-super'>
                        <NormalLoginForm getUsers={this.getUsers} />
                    </div>
                </section>
            </div>
        )
    }
}