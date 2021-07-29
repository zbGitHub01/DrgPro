import React, { Component } from 'react'
import EditableTable from '../analysis/EditableTable'
import  { queryAllInfoAxios } from '../../axios'
import './index.less'

export default class RoleManage extends Component{

    state={
        originDatas: []
    }

    queryDatas=()=>{
        queryAllInfoAxios().then( async res => {
            const originDatas =  await res.data.data
            this.setState({originDatas})
        })
    }

    componentDidMount(){
        this.queryDatas()
    }
   
    render() {
        const {originDatas} = this.state
        return (
            <section className='section-role'>
                <div className='section-role-sider'>
                    co
                </div>
                <div className='section-role-content'>
                    {
                        originDatas.length === 0 ? <></> : <EditableTable originDatas={originDatas} />
                    }
                </div>
            </section>
        )
    }
}
