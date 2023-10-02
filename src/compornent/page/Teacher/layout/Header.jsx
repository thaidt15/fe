import React from 'react';
import { Menu as AntMenu, Layout, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const AppHeader = () => {
  const menu = (
    <AntMenu>
      <AntMenu.Item key="0">
        <a href="/profile">Profile</a>
      </AntMenu.Item>

      <AntMenu.Item key="1">
        <a href="/logout">Logout</a>
      </AntMenu.Item>
    </AntMenu>
  );

  return (
    <Header
      style={{
        padding: '0 24px', // padding added to give some space on the sides
        backgroundColor: 'white',
        display: 'flex', // using flex for positioning
        justifyContent: 'flex-end', // aligns children to the right
      }}
    >
      <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <Avatar icon={<UserOutlined />} />
        </a>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
