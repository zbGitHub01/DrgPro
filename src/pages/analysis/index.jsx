import React, { Component } from 'react';
import { Table, Select, Button, Input, Spin } from 'antd';
import { PauseOutlined } from '@ant-design/icons'
// import {Link} from 'react-router-dom'   
import  { queryAllInfoAxios,queryByPid,queryByDiagName,queryBySurgName } from '../../axios'
import columns from '../../config/menuTable'
import './index.less'


const {Option} = Select
export default class Analysis extends Component {

    state = {
      datas: [],
      isLoading: true,
      columns: [],
      selectValue: 'diag_name',
      inputValue: '',
      id:[]
    }

    //初始化列表
    initColumns = () => {
      this.setState({
        columns
      })
    }

    //获取后台数据
    getAllDatas = () => {
        this.set = setTimeout(async() => {
          await queryAllInfoAxios().then(res =>{
          const list = res.data
          // console.log(JSON.stringify(columns.data.result).pid)
          //获取列表数据key(id)
          const id = this.state.datas.map(item => item.pid)
          if(res.data.status === 0){
            this.setState( state => {             
                return {
                  isLoading:false,
                  datas: list.data.result,
                  id
                }
            })
          }
        })
      }, 900)      
    }

    //获取选择搜索框关键字
    handleChange = (selectValue) =>{
      this.setState({selectValue},()=>{
        console.log(selectValue)
      })
      
    }

    //输入框获取值
    handleInput=(e)=>{
      const inputValue = e.target.value
      this.setState({
        inputValue
      })
    }

    //搜索按钮触发得查询
    searchClick = () => {
      const {selectValue,inputValue} = this.state
      // console.log(selectValue,inputValue)
      switch(selectValue) {
        case 'pid' :
            queryByPid({'pid':inputValue}).then(res=>{
                const data = res.data
                console.log(data)
                return data
            })
        break;
        case 'diag_name' :
            queryByDiagName({'diag_name':inputValue}).then(res=>{
                const data = res.data
                console.log(data)
                return data
            })
        break;
        case 'surg_name' :
            queryBySurgName({'surg_name':inputValue}).then(res=>{
                const data = res.data
                console.log(data)
                return data
            })
        break;
        default:
          break
      }
      // const data = querySwitch(selectValue,inputValue)
      // console.log(data)
    }

    //发送axios查询 及 初始化列表数据
    componentDidMount() {
      this.initColumns()
      this.getAllDatas()
    }

    //清除定时函数
    componentWillUnmount(){
      clearTimeout(this.set)
    }

  render() {
    const {datas,isLoading,columns,id} = this.state
        return (
            <section className='section-role'>
                <div className='section-role-sider'>
                  fffsssssssdd
                </div>
                <div className='section-role-content' >      
                  <>
                    <div className='section-role-content-header'>
                      <h1>筛选</h1>
                      <Select defaultValue="diag_name" style={{ width: 178,marginTop:'7px'}} onChange={this.handleChange}>
                        <Option value="pid"> 编号(pid)</Option>
                        <Option value="diag_name">分组名称(diag_name)</Option>
                        <Option value="surg_name">手术名称(surg_name)</Option>
                      </Select>&nbsp;&nbsp;
                      {/* <Dropdown  overlay={menu} placement="bottomLeft" trigger='click'>
                        <Button style={{marginTop:'7px',width:'130px'}}>
                          d
                          <DownOutlined />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Button>
                      </Dropdown>&nbsp; */}
                      <PauseOutlined rotate={90} style={{marginTop:'15px'}} />&nbsp;&nbsp;
                      <Input onChange={this.handleInput} className='section-role-content-header-input' placeholder="填写关键字" name='screenValue'/>
                      <Button className='section-role-content-header-button'>重置</Button>&nbsp;&nbsp;&nbsp;
                      <Button onClick={this.searchClick} style={{marginTop:'7px'}} type="primary">搜索</Button>
                    </div>
                    <hr/>
                    <div className='section-role-content-headerBottom'>
                      &nbsp;&nbsp;&nbsp;<p style={{width:'15%',marginTop:'5px'}}>符合条件有xxx条数据</p>
                      <Button className='headerBottomButton' type='primary' >保存</Button>
                    </div>
                  </>
                  {
                    isLoading === true?<Spin tip="疯狂Loading中......" size="large" className='spin'></Spin>:
                    <Table rowKey='pid' 
                      columns={columns} 
                      dataSource={datas} 
                      scroll={{ x: 1000 }}
                      // rowSelection={{selectedRowKeys:[id],type: 'radio'}}
                    />
                  }                   
           </div>
            </section>
        )}
    
}
