import React, { Component } from 'react';
import { Select, Button, Input, Spin ,message } from 'antd';
import { PauseOutlined, DownloadOutlined } from '@ant-design/icons' 
import  { queryAllInfoAxios,queryByVarParam,updateByParam } from '../../api'
// import EditableTable from '../../config/menuTable'
import EditableTable from './EditableTable';
import './index.less'


const {Option} = Select
export default class Analysis extends Component {

    state = {
      datas: [], //数据源
      rulesData:[],
      isLoading: true, //加载图标显示
      selectValue: 'diag_name',
      inputValue: '',
      total: 0, //记录数显示,
      isReset:false,
      id:[]
    }

    // //初始化列表
    // initColumns = () => {
    //   this.setState({
    //     columns: EditableTable()
    //   })
    // }

    //获取后台数据
    getAllDatas = () => {
        this.set = setTimeout( async() => {

          let resultAllInfo = await queryAllInfoAxios()
          // await queryAllInfoAxios().then(res =>{
          // const list = res.data
          // console.log(JSON.stringify(columns.data.result).pid)
          //获取列表数据key(id)
          const id = this.state.datas.map(item => item.pid)
          if(resultAllInfo.status === 0){
            // console.log(res.data.data.length)
            const total = resultAllInfo.data.length
            this.setState( state => {             
                return {
                  isLoading:false,
                  datas: resultAllInfo.data,
                  rulesData: resultAllInfo.rules,
                  total,
                  id
                }
            })
          }
        // })
      }, 900)      
    }

    //获取选择搜索框关键字
    handleChange = (selectValue) =>{
      this.setState({selectValue},()=>{
        // console.log(selectValue)
        console.log(this.state.rulesData)
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
      this.setState(state=>({isLoading:true,datas:[],total:0}))
      setTimeout( async()=>{
        let queryInfo = await queryByVarParam(selectValue,inputValue)
        // queryByVarParam(selectValue,inputValue).then(res=>{
          if(queryInfo.status === 200) {
            this.setState(state => {
              return  { 
                isLoading: false,
                datas: queryInfo.data,
                total: queryInfo.data.length
              }
            })
          }
        // })
      },800)
    }

    //重置按钮
    resetClick= async()=>{  
      let resultAllInfo = await queryAllInfoAxios()   
      // queryAllInfoAxios().then( res =>{
        // const list = res.data
        const total = resultAllInfo.data.length
        this.setState( state => {             
            return {
              datas: resultAllInfo.data,
              inputValue: '',
              total,
            }
        })  
        document.getElementById('inp').value = '';
    // })  
    }

    //获取子组件表单值并更改数据
    getFormFields = async(row) => {
        let updateInfo = await  updateByParam(row)
        // updateByParam(row).then(async res=>{
          if(await updateInfo.status===0) {
            message.success('修改成功')
            this.getAllDatas()
          }
        // })
    }

    //数据深对比
    shouldComponentUpdate(nextProps,nextState){
      return !(this.state.datas === nextState.datas )
    }

    //发送axios查询 及 初始化列表数据
    componentDidMount() {
      // this.initColumns();
      this.getAllDatas();
    }

    //清除定时函数
    componentWillUnmount(){
      clearTimeout(this.set)
    }

  render() {
    const {datas,rulesData,isLoading,total} = this.state
        return (
            <section className='section-role'>
                <div className='section-role-sider'>
                  <ul style={{width:'100%',height:'100%',backgroundColor:'#eeeeee'}}>
                    {
                      rulesData.map(item=>{
                        return (
                          <li key={item.id} className='section-role-sider-li'>
                            <p className='li-firChild'>
                              {item.name} 
                              <DownloadOutlined style={{float:'right',marginRight:'20px',color:'#5681de'}}/>
                            </p>
                            <p>{item.value}</p>
                          </li>
                        )
                      })
                    } 
                  </ul>
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
                      <Input id='inp' onChange={this.handleInput} className='section-role-content-header-input' placeholder="填写关键字" name='screenValue'/>
                      <Button className='section-role-content-header-button' onClick={this.resetClick}>重置</Button>&nbsp;&nbsp;&nbsp;
                      <Button onClick={this.searchClick} style={{marginTop:'7px'}} type="primary">搜索</Button>
                    </div>
                    <hr/>
                    <div className='section-role-content-headerBottom'>
                      &nbsp;&nbsp;&nbsp;<p style={{width:'15%',marginTop:'5px'}}>符合条件有{total}条数据</p>
                      {/* <Button className='headerBottomButton' type='primary' >保存</Button> */}
                    </div>
                  </>
                  {/* <EditableTable/> */}
                  {
                    isLoading === true?<Spin tip="疯狂Loading中......" size="large" className='spin'></Spin>:
                    datas.length === 0 ? <></> : <EditableTable originDatas={datas} getFormFields={this.getFormFields}/>
                    //   <Table rowKey='pid' 
                    //   columns={columns} 
                    //   dataSource={datas} 
                    //   scroll={{ x: 1500, y: 580 }}
                    //   // rowSelection={{selectedRowKeys:[id],type: 'radio'}}
                    // />

                   
                  }                   
           </div>
            </section>
        )}
    
}
