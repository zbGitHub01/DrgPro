import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import { Modal } from 'antd';
import {UserOutlined,EllipsisOutlined,AlertOutlined } from '@ant-design/icons'
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
        ],
        isShow: false
    }    

    handleMore=()=>{
        this.setState({
            isShow: true
        })
    }
   
    // （ok）点击事件回调
    handleOk = () =>{
        this.setState({
            isShow : false
        })
        window.localStorage.clear()
    }

    // （取消）点击事件回调
    handleCancel = () =>{
        this.setState({
            isShow : false
        }) 
    }

     render() {
         //如果localStorage中没有登陆数据 则重定向回登陆界面
         if( window.localStorage.length === 0){   
             return <Redirect to='/login'/>
         }
        const {navShowArray,isShow} = this.state
        const { USERNAME : username} = window.localStorage
        return (
            <div className='home'>
            <header className='home-nav'>
                <img src={Logo} alt='Logo'></img>
                <h1>DRG分组器维护测试平台</h1>
                {/* <div className='home-content'>
                    <span className='home-content-child'><MyNavLink to='/home/dataready'>数据准备</MyNavLink> </span>
                    <span className='home-content-child'><MyNavLink to='/home/analysis'>分组分析</MyNavLink> </span>
                    <span className='home-content-child'><MyNavLink to='/home/rolemanage'>规则管理</MyNavLink> </span>
                </div> */}
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
                <div className='more' onClick={this.handleMore}><EllipsisOutlined style={{color:'white'}} className='more-chi'/></div> 

               {
                   isShow === true ? 
                    (
                        <Modal title={<AlertOutlined style={{fontSize:'25px',color:'yellow'}}/>} visible={isShow}  onOk={this.handleOk} onCancel={this.handleCancel}>
                            <p style={{color:'red',fontSize:'20px'}}>确定退出？！</p>
                        </Modal>
                    ) :null

               }
                                                               
            </header>
            <section className='home-section'>       
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
   
