import React from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { Layout} from 'antd';
const { Content } = Layout;

const Dashboard = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
           
            <Layout>
                <AppHeader />
                
                <Content style={{ padding: '20px 140px' }}>
                    <h1>Head Of Department Dashboard</h1>
                   
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default Dashboard;