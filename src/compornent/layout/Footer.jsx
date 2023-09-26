import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        // Add your styles here
      }}
    >
      Ant Design ©2023 Created by Ant UED
    </Footer>
  );
};

export default AppFooter;
