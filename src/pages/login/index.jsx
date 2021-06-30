import React, { Component } from 'react'
import NormalLoginForm from './login-form'
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
                        <NormalLoginForm />
                    </div>
                </section>
            </div>
        )
    }
}

// const NormalLoginForm = () => {
     
//     const [form] = Form.useForm()
//     // const [value,setUser] = React.useState({}); 
//     const usernameRef = React.useRef()
//     const passwordRef = React.useRef()
    
  
   

    // const a = form.getFieldValue('username')

      
      // setUser({
      //     value: values
      // })
     

    

   
  
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

