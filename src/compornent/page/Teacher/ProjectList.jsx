import React from 'react';
import { Card, Row, Col, Layout, Breadcrumb } from 'antd';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import {Link} from 'react-router-dom'
const { Content } = Layout;
const { Meta } = Card;

const ProjectList = () => {
    const projects = [
        {
            topic_code: 'PMS',
            topic_name: 'Project Management System',
            description: 'A system to manage projects.',
            // avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel'
        },
        {
            topic_code: 'ECP',
            topic_name: 'E-commerce Platform',
            description: 'An online shopping platform.',
            // avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel'
        },
        {
            topic_code: 'Facebook',
            topic_name: 'Social Media',
            description: 'An online shopping platform.',
            // avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel'
        }
    
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Breadcrumb
                    items={[
                        { title: 'Home' },
                        { title: 'Projects' },
                    ]}
                    style={{ marginLeft: 140, marginTop: 20 }}
                />
                <h1>Project Management</h1>
                <Content style={{ padding: '20px 120px' }}>
                    <div style={{ padding: '20px' }}>
                        <Row gutter={[16, 16]}>
                            {projects.map((project, index) => (
                                <Col key={index} span={8}>
                                    <Card
                                        style={{ width: 250 }}
                                        cover={
                                            <img
                                                alt={project.topic_name}
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                        }
                                    >
                                        <Meta
                                           
                                            title ={ <div><Link to={`../teacher/project-details`}>{project.topic_name}</Link></div>}  
                                            description={project.description}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default ProjectList;
