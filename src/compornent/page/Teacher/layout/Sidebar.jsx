import React, { useState, useEffect } from 'react';
import './style.css';
import {
  CalculatorOutlined,
  AlignLeftOutlined,
  UserSwitchOutlined ,
  HomeOutlined,
  DropboxOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;



const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { },
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
            icon:<HomeOutlined />,
            label: <Link to='../teacher/'><span style={{float:'left'}}>Dashboard</span></Link>,

          },
          {
            key: '2',
            icon: <CalculatorOutlined />,
            label: <Link to='../teacher/class'><span style={{float:'left'}}>Class</span></Link>,

          },
          {
            key: '3',
            icon: <AlignLeftOutlined />,
            label: <Link to='../teacher/checklist-list'><span style={{float:'left'}}>CheckList Manager</span></Link>,
          },
          {
            key: '4',
            icon: <DropboxOutlined />,
            label: <Link to='../teacher/project-list'><span style={{float:'left'}}>Project Manager</span></Link>,
          },
         
          {
            key: '5',
            icon: <UserSwitchOutlined />,
            label: <span style={{float:'left'}}>Switch role</span>,
            children: [
              {
                key: '5-1',
                label: <Link to=''> <span style={{float:'left'}}>Head of department</span></Link>,
              },
              {
                key: '5-2',
                label: <Link to=''> <span style={{float:'left'}}>Teacher</span></Link>,
              },
              {
                key: '5-3',
                label: <Link to=''> <span style={{float:'left'}}>Reviewer</span></Link>,
              },
             
            ],
          },
        ]}
      />
    </Sider>
  );
};

export default AppSidebar;