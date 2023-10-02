import React, { useState } from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { Link } from "react-router-dom";

import { Avatar, Card, Row, Col, Layout,Breadcrumb,Select } from 'antd';



const { Content } = Layout;
const { Meta } = Card;
const { Option } = Select;
const ClassList = () => {
    const classes = [
        {
            title: 'SE1603_KS',
            total_student: '30',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel'
        },
        {
            title: 'SE1604_KS',
            total_student: '31',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel'
        },
        {
            title: 'SE1605_KS',
            total_student: '25',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel'
        },
        {
            title: 'SE1606_KS',
            total_student: '29',
            avatar: 'https://xsgames.co/randomusers/avatar.php?g=pixel'
        },

    ];
    const dropdownContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 20
    };
    
    const labelStyle = {
        marginRight: 10,
        fontSize: 16,
        fontWeight: 'bold'
    };
    
    const dropdownStyle = {
        width: 150
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Breadcrumb
                    items={[
                        {
                            title: <Link to='../teacher/'>Home</Link>
                        },
                        
                        {
                            title: 'Class',
                        },
                    ]}
                    style={{
                        marginLeft: 140, marginTop: 20
                    }}
                />
                <Content style={{ padding: '20px 120px' }}>
                <div style={dropdownContainerStyle}>
                        <span style={labelStyle}>SEMESTER</span>
                        <Select
                            defaultValue="FALL2023"
                            style={dropdownStyle}
                        >
                            <Option value="FALL2023">FALL2023</Option>
                            <Option value="SUMMER2023">SUMMER2023</Option>
                            <Option value="SPRING2023">SPRING2023</Option>
                            
                        </Select>
                    </div>
                    <div style={{ padding: '20px' }}>
                        <Row gutter={[16, 16]}>
                            {classes.map((cls, index) => (
                                <Col key={index} span={8}>
                                    <Card
                                        style={{ width: 250 }}
                                        cover={
                                            <img
                                                alt={cls.title}
                                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                            />
                                        }
                                        actions={[
                                           <Link style={{color:'blue'}} to={'../teacher/class-user'}>Go to Class</Link>
                                        ]}
                                    >
                                        <Meta
                                            avatar={<Avatar src={cls.avatar} />}
                                            title={cls.title}
                                            description={`Total Students: ${cls.total_student}`}
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

export default ClassList;