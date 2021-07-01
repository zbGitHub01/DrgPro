import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class DataReady extends Component {

    onc=()=>{
        console.log(window.localStorage.length)
    }
    render() {
        
         
        return (
            <div onClick={this.onc}>
                数据准备
            </div>
        )
    }
}
