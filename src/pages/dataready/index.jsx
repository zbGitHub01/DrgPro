import React, { Component } from 'react'
import { Upload, message, Modal, Button } from 'antd';
import { CloudUploadOutlined,FolderOpenOutlined,CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Dragger } = Upload;


export default class DataReady extends Component {

    state={
        percent: 0,
        pro: {},
        processWidth: 0,
        fileName: '', 
        isShowDelete: false, //是否显示删除对话框
        isRemove: false, //是否显示删除按钮
        isSucceed: 1, //1表示上传中显示百分比，2表示上传完成可计算，3表示上传失败，4表示处理成功可删除
        isShowProgress: false //是否显示上传进度条
    }

    getUpload = ()=>{
        let _this = this
        const pro = {
            name: 'file',
            multiple: true,
            showUploadList: false,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',                     
            beforeUpload(info) {               
                const isCSV = info.type === 'application/vnd.ms-excel';
                if (!isCSV) {
                    message.error('上传文件的格式必须为csv！')
                    return false;
                } 
                // else {
                //     _this.setState({   
                //         isShowProgress : true,                       
                //     })   
                // }
            },          
            onChange(info) {
              const { status } = info.file;
              const event = info.event
              if(event) {
                    let percent = ((event.loaded / event.total)* 100).toFixed(2)
                    let processWidth = (event.loaded / event.total)*100
                    const fileName = info.file.name
                    _this.setState({  
                        isShowProgress: true,
                        fileName,                       
                        percent,
                        processWidth,                       
                    })   
              }
              if (status === 'uploading') {   
                  _this.setState({
                      isSucceed: 1
                  })         
                //   console.log(e)
                // const xhr = new XMLHttpRequest();
                // console.log('我是进度条'+info)
                // xhr.upload.onprogress =(e)=>{
                //     let percent = Math.floor((e.loaded/e.total)*100)
                //     console.log('我是进度条'+percent)
                //     _this.setState({
                //         percent: percent
                //     })    
                // }
                console.log(info.file,info.file.name, info.fileList+'我在上传中');                
              }
              if (status === 'done') {
                message.success(`${info.file.name} 文件上传成功.`);
                _this.setState({
                    isSucceed: 2
                })
                console.log('done')
              } else if (status === 'error') {
                message.error(`${info.file.name} 文件上传失败.`);
                _this.setState({
                    isSucceed: 3
                })
              }
            },          
            onDrop (e){
                    console.log('lalalalalala', e.dataTransfer.files);                  
                    // let percent = Math.floor((e.loaded/e.total)*100);
                     console.log(e)
            },
            onRemove(info){
                const {isRemove} = _this.state
                if (isRemove) {
                    return false
                }
                console.log('删除了')
            }           
          };         
          return pro         
    }

    //点击重新上传 回调
    handleUploadAgain=()=>{
        this.setState({
            isShowProgress :false
        })
    }

    handleDelete=()=>{
        this.setState({
            isShowDelete: true
        })
        // this.getUpload().onRemove()
    }

    //判断进度框内 的上传进度并显示相应dom
    renderUploadShow = ()=>{
        const {isSucceed,percent} = this.state
        if (isSucceed === 1) {
            return (<span className='succProgress-num'>{percent+'%'}</span>)
       } else if (isSucceed === 2 || isSucceed === 3) {
            return (<span className='succProgress-num' style={{cursor:'pointer'}} onClick={this.handleUploadAgain}>重新上传</span>)
       } else {
           return (<span className='succProgress-num' style={{cursor:'pointer',color:'red'}} onClick={this.handleDelete}>删除</span>)
       }
    }

    //判断上传之后 是否可计算
    redenrComputedShow =()=>{
        const {isSucceed} = this.state
        if(isSucceed === 1) {
            return (<span>正在上传...</span> )
        } else if (isSucceed === 2) {
            return (
                    <>
                    <span>可以根据现有规则进行计算&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> 
                    <Link to='/home/rolemanage' style={{color:'blue'}}>查看规则  ></Link> 
                    </>)
        } else if (isSucceed === 3) {
            return ( <span style={{color:'red'}}>上传失败！</span> )
        }else {
            return ( <span> 处理成功 ，可以在分组分析中查看</span> )
        }
    }

    // （ok）点击事件回调
    handleOk = () =>{
        this.setState({
            isRemove : true,
            isShowProgress: false,
            isShowDelete : false
        })
    }

    // （取消）点击事件回调
    handleCancel = () =>{
        this.setState({
            isShowDelete : false
        })    
    }

    //导出按钮的回调
    handleOutput=()=>{
        console.log('我导出完了')
    }

    //计算和重新计算回调
    handleComputed=()=>{
        console.log('我计算完了')
        this.setState({
            isSucceed: 4
        })
    }

    componentDidMount(){
        this.getUpload()
    }

    render() {
            const {...pro} = this.getUpload()
            const { isShowProgress,processWidth,fileName,isShowDelete,isSucceed } = this.state
        return (
            <div style={{width:'70%',height:'579.39px',margin:'auto',paddingTop:'120px'}}>
                {
                    isShowProgress === false ? (
                        <Dragger {...pro} >
                            <p className="ant-upload-drag-icon" style={{ height:'60px'}} >
                            <CloudUploadOutlined style={{fontSize:'60px',color:'#3569d6'}}/>
                            </p>
                            <br/>
                            <p style={{fontSize:'20px',color:'#4675da'}}>上传源数据</p>
                            <br/>
                            <p className="ant-upload-text" style={{color:'#adaeb3'}}>数据格式为csv，建议大小不超过300Mb</p>
                            <br/>
                            <p className="ant-upload-hint">
                                'BILL_DRGCODE','SYS_DRGCODE','RESPONSE_JSON'必须存在
                            </p>
                        </Dragger>
                    )  
                    :(
                        <>
                        <Dragger {...pro} style={{display:'none'}}>
                            <p className="ant-upload-drag-icon" style={{ height:'60px',margin:0}} >
                            <CloudUploadOutlined style={{fontSize:'60px',color:'#3569d6'}}/>
                            </p>
                            <br/>
                            <p style={{fontSize:'20px',color:'#4675da'}}>上传源数据</p>
                            <br/>
                            <p className="ant-upload-text" style={{color:'#adaeb3'}}>数据格式为csv，建议大小不超过300Mb</p>
                            <br/>
                            <p className="ant-upload-hint">
                                'BILL_DRGCODE','SYS_DRGCODE','RESPONSE_JSON'必须存在
                            </p>
                        </Dragger>
                                          
                            <div className='succPogress' style={{ borderColor:isSucceed === 3 ? 'red':'blue'}}>
                            {
                                isShowDelete === true ? 
                                    (
                                        <Modal title= {<span><CloseCircleOutlined style={{fontSize:'15px',color:'red'}}/>&nbsp;&nbsp;确认删除该数据吗?</span> }  visible={isShowDelete}  onOk={this.handleOk} onCancel={this.handleCancel}>
                                            <p>该操作会删除该数据并恢复到没有数据的状态。</p>
                                        </Modal>
                                    ) :null

                            }
                                <span style={{position:'absolute'}}><FolderOpenOutlined style={{fontSize:'20px',marginLeft:'20px'}}/>&nbsp;&nbsp;&nbsp;{fileName}</span>
                                <div style={{width:`${processWidth}%`,lineHeight:'78px',height:'78px',backgroundColor:'#eaeffa',borderRadius:'15px'}}>
                                   
                                    {
                                       this.renderUploadShow()
                                        // isSucceed === 1 & isSucceed !== 4? <span className='succProgress-num'>{percent+'%'}</span> : 
                                        // <span className='succProgress-num' style={{cursor:'pointer'}} onClick={this.handleClick}>重新上传</span>
                                    }                                   
                                </div>
                                                         
                            </div>
                            <>
                            {
                                this.redenrComputedShow()
                            }  
                            </>
                            <br/>
                            <br/>
                            <div style={{textAlign:'center'}}>
                                <Button disabled={ isSucceed === 4? false:true } type="primary" onClick={this.handleOutput} >导出</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                {
                                    isSucceed === 4? <Button type="primary" onClick={this.handleComputed} >重新计算</Button>
                                    :<Button type="primary" disabled={isSucceed === 2? false:true} onClick={this.handleComputed} >计算</Button>
                                }                               
                            </div>
                        </>
                        
                    )
                }
                    
                
            </div>
            
            
        )
    }
}
