import React, { Component } from 'react'
import EditableTable from '../analysis/EditableTable'
import  { queryAllInfoAxios } from '../../api'
// import StringBuffer from '../../config/stringbuffer'
import './index.less'

export default class RoleManage extends Component{

    state={
        originDatas: [],
        da: []
    }

    queryDatas= async()=>{
        let resultAllInfo = await queryAllInfoAxios()
        // queryAllInfoAxios().then( async res => {
            const originDatas =  await resultAllInfo.data
            this.setState({originDatas})
        // })
    }
   
   

    componentDidMount(){
        this.queryDatas()
    }
   
    render() {
        const {originDatas,da} = this.state
        return (
            <section className='section-role'>
                <div className='section-role-sider'>
                    <span>{da}</span>
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
