import React, { Component } from 'react'
import {NavLink,Route,Switch} from 'react-router-dom'
import Analysis from './analysis'
import Dataready from './dataready'
import Rolemanage from './rolemanage'
import Logo from './logo.png'
import './index.less'


export default class Home extends Component {
    render() {
        return (
            <div className='home'>
            <header className='home-nav'>
                <img src={Logo} alt='Logo'></img>
                <h1>测试平台</h1>
                <div className='home-content'>
                    <p className='home-content-child'>数据准备</p>
                    <p className='home-content-child'>分组分析</p>
                    <p className='home-content-child'>规则管理</p>
                </div>
            </header>
            <section className=''>       
                <Dataready/> 
                <Analysis />
                <Rolemanage/>
                dddddddd
            </section>
        </div>
        )
    }
}
