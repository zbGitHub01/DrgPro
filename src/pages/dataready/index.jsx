import React, { Component } from 'react'
import { Upload, message,Progress } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
export default class DataReady extends Component {

    state={
        percent: 0
    }

    getUpload = ()=>{
        let _this = this
        const pro = {
            name: 'file',
            multiple: true,
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            
            // onUploading(e){
            //     const xhr = new XMLHttpRequest();
            //     console.log('我是进度条')
            //     xhr.upload.onprogress =(e)=>{
            //         let percent = Math.floor((e.loaded/e.total)*100)
            //         console.log('我是进度条'+percent)
            //         _this.setState({
            //             percent: percent
            //         })    
            //     }
            // },

            onChange(info) {
              const { status } = info.file;
              if (status !== 'uploading') {
                  console.log(info.file.size/1000/556.89)
                // const xhr = new XMLHttpRequest();
                // console.log('我是进度条'+info)
                // xhr.upload.onprogress =(e)=>{
                //     let percent = Math.floor((e.loaded/e.total)*100)
                //     console.log('我是进度条'+percent)
                //     _this.setState({
                //         percent: percent
                //     })    
                // }
                console.log(info.file, info.fileList+'我在上传中');
                
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
                    // console.log('进度条在这'+percent)
                    // console.log(e.loaded)
                    // console.log(e.total)
                    // console.log(percent)
                    // let upload = this.state.upload;
                    // upload.progress.loaded = e.loaded;
                    // upload.progress.total = e.total;
                    // upload.progress.percentage = percent;
                    // _this.setState({
                    //     percent: percent
                    // })    
            },
          };

          return pro
    }

 
  
    render() {
            const {...pro} = this.getUpload()
            console.log(this.getUpload())
        return (
            <div style={{width:'70%',height:'579.39px',margin:'auto',marginTop:'120px'}}>
                <Dragger {...pro}>
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
                <div>
                    <Progress percent={this.state.percent} />
                </div>
            </div>
            
        )
    }
}
