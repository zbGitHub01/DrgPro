import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {UserOutlined} from '@ant-design/icons'
import Analysis from '../../pages/analysis'
import Dataready from '../../pages/dataready'
import Rolemanage from '../../pages/rolemanage'
import MyNavLink from '../mynavlink'
import Logo from './logo.png'
import './index.less'


export default class Home extends Component {

    state = {
        navShowArray: [
            { id: '01',title:'数据准备',ename: 'dataready'},
            { id: '02',title:'分组分析',ename: 'analysis'},
            { id: '03',title:'规则管理',ename: 'rolemanage'},
        ]
    }    
     render() {
         //如果localStorage中没有登陆数据 则重定向回登陆界面
         if( window.localStorage.length === 0){   
             return <Redirect to='/login'/>
         }
        const {navShowArray} = this.state
        const { USERNAME : username} = window.localStorage
        return (
            <div className='home'>
            <header className='home-nav'>
                <img src={Logo} alt='Logo'></img>
                <h1>DRG分组器维护测试平台</h1>
                <ul className='home-content'> 
                     {
                       navShowArray.map((navObj)=>{
                           return (
                                <li key={navObj.id} className='home-content-child' >
                                    <MyNavLink to={`/home/${navObj.ename}`}>{navObj.title}</MyNavLink>
                                </li>
                           )
                       })
                    } 
                </ul>
                <div className='nav-User'>
                     <p className='nav-user-fir'><UserOutlined className='nav-user-sec'/><span className='nav-user-thi'>{username}</span></p>
                     {/* <p className='uy'><span className='nav-user-fou'>  2 </span></p>  */}
                </div>

               
                             
            </header>
            <section className=''>       
                <Switch>           
                    <Route path='/home/dataready' component={Dataready} />
                    <Route path='/home/analysis' component={Analysis} />
                    <Route path='/home/rolemanage' component={Rolemanage} />
                    <Redirect to='/home/dataready'/>
                </Switch>
                
            </section>
            </div>
        )
    }
}
   
