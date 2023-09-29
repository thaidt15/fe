import React, { useState } from 'react';
import AppHeader from '../layout/Header';
import AppFooter from '../layout/Footer';
import AppSidebar from '../layout/Sidebar';
import { Space, Table, Tag } from 'antd';
import {
  Layout
} from 'antd';
import Paragraph from 'antd/es/skeleton/Paragraph';

const { Content } = Layout;


const Home = () => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };


const { Column, ColumnGroup } = Table;
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
  return (
    
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <AppSidebar />
      <Layout>
        <AppHeader />
        <Content style={{ textAlign: 'center' }}>
        <h1>Class</h1>
        <Table dataSource={data}>
    <ColumnGroup title="Name">
      <Column title="First Name" dataIndex="firstName" key="firstName" />
      <Column title="Last Name" dataIndex="lastName" key="lastName" />
    </ColumnGroup>
    <Column title="Age" dataIndex="age" key="age" />
    <Column title="Address" dataIndex="address" key="address" />
    <Column
      title="Tags"
      dataIndex="tags"
      key="tags"
      render={(tags) => (
        <>
          {tags.map((tag) => (
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          ))}
        </>
      )}
    />
    <Column
      title="Action"
      key="action"
      render={(_, record) => (
        <Space size="middle">
          <a>Invite {record.lastName}</a>
          <a>Delete</a>
        </Space>
      )}
    />
  </Table >
        </Content>
        <AppFooter />
      </Layout>
    </Layout>
  );
};

export default Home;
