import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './index.less'

const { Header, Content, Footer, Sider } = Layout;

export default class Analysis extends Component {
    render() {
        return (
            <>
                <Layout style={{  height:'100%' }} className='layout'>
                    <Sider className='sider'>
                       sider 
                    
                    </Sider>
                    <Layout>
                        <Content style={{ margin: '15px 10px 20px',height:'100%'}}>
                            <div className="site-layout-background" style={{ padding: 24, height:'100%' }}>
                            content
                            </div>
                        </Content>
                    
                    </Layout>
                </Layout>
            </>
        )
    }
}
