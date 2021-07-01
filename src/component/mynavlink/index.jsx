import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class MyNavLink extends Component {
    render() {
        return (
            <NavLink style={{color: 'white',width: '100%'}}  activeClassName = "blurColor" className='home-content-child' {...this.props}></NavLink>
        )
    }
}
