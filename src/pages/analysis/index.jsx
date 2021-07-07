import React, { useState,Component } from 'react';
import { Table, Radio, Divider } from 'antd';
import {Link} from 'react-router-dom'
import './index.less'

export  const Analysis =()=> {

    
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text) => <Link>{text}</Link>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Disabled User',
          age: 99,
          address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '5',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '6',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '7',
            name: 'Disabled User',
            age: 99,
            address: 'Sidney No. 1 Lake Park',
          },
      ]; // rowSelection object indicates the need for row selection
      
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };

  
 
        const [selectionType, setSelectionType] = useState('checkbox');
        return (
            <section className='section-role'>
                <div className='section-role-sider'>
                    <h4>Middle size table</h4>
                    <Table columns={columns} dataSource={data} size="middle" />
                    <h4>Small size table</h4>
                    <Table columns={columns} dataSource={data} size="small" />
                </div>
                <div className='section-role-content'>
                <div>
                    <Radio.Group
                        onChange={({ target: { value } }) => {
                        setSelectionType(value);
                        }}
                        value={selectionType}
                    >
                        <Radio value="checkbox">Checkbox</Radio>
                        <Radio value="radio">radio</Radio>
                    </Radio.Group>

                    <Divider />

                    <Table
                        rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                        }}
                        columns={columns}
                        dataSource={data}
                    />
                    </div>
                </div>
            </section>
        )
    
}
