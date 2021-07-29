
import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from 'antd';


const originData = [];
for (let i = 0; i < 100; i++) {
    originData.push({
      key: i.toString(),
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };

    const EditableTable = (props) => { 
      //componentDidMount初始化数据
      React.useEffect(() => {
        setData(props.originDatas)
      },[props.originDatas]) 
      //useState获取父组件初始Table值
      const [data, setData] = useState(props.originDatas);
      const [form] = Form.useForm();
      
      const [editingPid, setEditingPid] = useState('');
      const isEditing = (record) => record.pid === editingPid;
      const edit = (record) => {
        form.setFieldsValue({
            pid: '',
            diag_code: '',
            diag_name: '',
            surg_code: '',
            surg_name: '',
            bill_drg: '',
            bill_drgcode: '',
            bill_drgname: '',
            sys_drg: '',
            sys_drgcode: '',
            sys_drgname: '',
            sys_drgcode_last:'' ,
            sys_drgname_last: ''  , 
            ...record,
        });
        setEditingPid(record.pid);
      };
    
      const cancel = () => {
        setEditingPid('');
      };
    
      const save = async (pid) => {
        try {
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex((item) => pid === item.pid);
          row['pid'] = pid
          //调用父组件方法传回表单属性
          props.getFormFields(row)     
    
          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setData(newData);
            setEditingPid('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingPid('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };
    
      const columns = [
        {
            title: 'pid',
            dataIndex: 'pid',
            width:60 ,
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
          dataIndex: '操作',
          fixed: 'right',
          width: 110,
          render: (_, record) => {
            const editable = isEditing(record);
            return editable ? (
              <span>
                <span
                  onClick={() => save(record.pid)}
                  style={{
                    marginRight: 20,
                    color:'#5cb5fe',
                    cursor:'pointer'
                  }}
                >
                  保存
                </span>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a href="javascript;">取消</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link disabled={editingPid !== ''} onClick={() => edit(record)}>
                编辑
              </Typography.Link>
            );
          },
        },
      ];
      const mergedColumns = columns.map((col) => {
        if (!col.editable) {
          return col;
        }
    
        return {
          ...col,
          onCell: (record) => ({
            record,
            inputType: col.dataIndex === 'pid' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
          }),
        };
      });
      return ( 
        <Form form={form} component={false} >
          <Table 
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            rowKey='pid'
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            scroll={{ x: 1500 }}
            pagination={{
              onChange: cancel,
            }}
          />
        
        </Form>
      );
    };
  export default EditableTable