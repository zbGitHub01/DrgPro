import React, { Component } from 'react'
import { Upload, message } from 'antd';
import { CloudUploadOutlined,FolderOpenOutlined } from '@ant-design/icons';

const { Dragger } = Upload;


export default class DataReady extends Component {

    state={
        percent: 0,
        processWidth: 0,
        fileName: '',
        isShowProgress: false
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
              if (status !== 'uploading') {            
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
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            },          
            onDrop (e){
                    console.log('lalalalalala', e.dataTransfer.files);                  
                    // let percent = Math.floor((e.loaded/e.total)*100);
                     console.log(e)
            },
          };

          return pro
    }
    
    componentDidMount(){
        this.getUpload()
    }

    render() {
            const {...pro} = this.getUpload()
            const {percent,isShowProgress,processWidth,fileName} = this.state
        return (
            <div style={{width:'70%',height:'579.39px',margin:'auto',marginTop:'120px'}}>
                {
                    isShowProgress === false ? (
                        <Dragger {...pro} >
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
                    )  
                    :(
                        <>                  
                            <div className='succPogress'>
                                <span style={{position:'absolute'}}><FolderOpenOutlined style={{fontSize:'20px',marginLeft:'20px'}}/>&nbsp;&nbsp;&nbsp;{fileName}</span>
                                <div style={{width:`${processWidth}%`,lineHeight:'78px',height:'78px',backgroundColor:'#eaeffa',borderRadius:'15px'}}>{percent+'%'}</div>                               
                            </div>
                            <span>ssssssssssss</span>
                            {/* <Progress {...pro} strokeColor={'#eaeffa'}
                            className= 'ant-progress-bgm' 
                            percent={percent}
                            trailColor ={'white'}
                            > </Progress> */}
                        </>
                        
                    )
                }
                    
                
            </div>
            
            
        )
    }
}
