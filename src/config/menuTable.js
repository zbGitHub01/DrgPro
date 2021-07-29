/**
 * 
 * 表头字段定义
 * 
 */
 import React, { useState } from 'react';
 import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';

const EditableTable =()=>{
    // const isEditing = (record) => record.key === editingKey;
    const columns = [
        {
          title: 'pid',
          dataIndex: 'pid',
          width:60          
        },
        {
          title: 'diag_code',
          dataIndex: 'diag_code' ,
          width:120              
        },
        {
          title: 'diag_name',
          dataIndex: 'diag_name',  
          width:120 ,
          editable: true                   
        },
        {
            title: 'surg_code',
            dataIndex: 'surg_code' ,
            width:120                     
        },
        {
            title: 'surg_name',
            dataIndex: 'surg_name',
            width: 120 ,
            editable: true         
        },
        {
            title: 'bill_drg',
            dataIndex: 'bill_drg' ,
            width:120                     
        },
        {
            title: 'bill_drgcode',
            dataIndex: 'bill_drgcode' ,
            width:120          
        },
        {
            title: 'bill_drgname',
            dataIndex: 'bill_drgname' ,
            width:120                     
        },
        {
            title: 'sys_drg',
            dataIndex: 'sys_drg'  ,
            width:120                    
        },
        {
            title: 'sys_drgcode',
            dataIndex: 'sys_drgcode'  ,
            width:120                    
        },
        {
            title: 'sys_drgname',
            dataIndex: 'sys_drgname'  ,
            width:120                    
        },
        {
            title: 'sys_drgcode_last',
            dataIndex: 'sys_drgcode_last' ,
            width:140                    
        },
        {
            title: 'sys_drgname_last',
            dataIndex: 'sys_drgname_last'  ,
            width:145                    
        },
        {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 80,
            render: ()=><span style={{cursor:'pointer'}}>编辑</span>      
        //     render: (_, record) => {
        //         const editable = isEditing(record); 
        //         return editable ? (<span>1</span> ):(<span onClick={() => edit(record)} >2</span>)          
        // }
    }
      ];
      return columns

}


      
export default EditableTable