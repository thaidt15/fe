import React, { useState, useEffect } from 'react';
import './style.css';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}



const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {},
  } = theme.useToken();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      const siderContainer = document.querySelector('.sider-container');
      if (siderContainer) {
        if (scrolled) {
          siderContainer.classList.add('scrolled');
        } else {
          siderContainer.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light" >
      <div className="demo-logo-vertical sider-container">
        <img
          className="sider-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/2560px-FPT_logo_2010.svg.png"
          alt=""
        />
      </div>
      <Menu
    theme="light"
    mode="inline"
    defaultSelectedKeys={['1']}
    items={[
        {
            key: '1',
            icon: <UserOutlined />,
            label: <Link to='login'>Login</Link>,
          
        },
        {
            key: '2',
            icon: <UserOutlined />,
            label: 'nav 2',
        },
        {
            key: '3',
            icon: <UserOutlined />,
            label: 'nav 3',
        }
    ]}
/>
    </Sider>
  );
};

export default AppSidebar;
