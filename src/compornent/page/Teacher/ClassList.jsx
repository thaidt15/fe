import React, { useState } from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { Link } from "react-router-dom";

import { Avatar, Card, Row, message, Col, Layout, Breadcrumb, Select, Button, Modal, Tooltip } from 'antd';

import { DashboardOutlined } from '@ant-design/icons';


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
    const [isMilestoneModalVisible, setMilestoneModalVisible] = useState(false);
    const [currentMilestone, setCurrentMilestone] = useState({
        from_date: '',
        to_date: '',
        iteration: 1,  // Assuming iteration starts from 1 by default
    });
    const showMilestoneModal = () => {
        const nextIteration = getNextIteration();
        if (nextIteration) {
            setCurrentMilestone({
                ...milestones[nextIteration],
                iteration: nextIteration
            });
            setMilestoneModalVisible(true);
        } else {
            message.info('All iterations are set and past!');
        }
    };
    const getNextIteration = () => {
        const today = new Date();
        for (let i = 1; i <= 4; i++) {
            const endDate = new Date(milestones[i].to_date);
            if (!milestones[i].to_date || endDate >= today) {
                return i;
            }
        }
        return null; // All iterations are set and past
    };
    const [milestones, setMilestones] = useState({
        1: { from_date: '', to_date: '' },
        2: { from_date: '', to_date: '' },
        3: { from_date: '', to_date: '' },
        4: { from_date: '', to_date: '' }
    });
    const iterations = [
        { id: 1, name: 'Iteration 1' },
        { id: 2, name: 'Iteration 2' },
        { id: 3, name: 'Iteration 3' },
        { id: 4, name: 'Iteration 4' },
    ];

    const handleMilestoneOk = () => {
        setMilestones({
            ...milestones,
            [currentMilestone.iteration]: {
                from_date: currentMilestone.from_date,
                to_date: currentMilestone.to_date
            }
        });
        setMilestoneModalVisible(false);
    };
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
                    <Modal
                        title="Set Milestone"
                        visible={isMilestoneModalVisible}
                        onOk={handleMilestoneOk}
                        onCancel={() => setMilestoneModalVisible(false)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Select
                                value={currentMilestone.iteration}
                                style={{ flex: 1 }}
                                onChange={(value) => setCurrentMilestone({ ...currentMilestone, iteration: value })}
                            >
                                {iterations.map((iter) => (
                                    <Option key={iter.id} value={iter.id}>
                                        {iter.name}
                                    </Option>
                                ))}
                            </Select>

                            <div style={{ flex: 1 }}>
                                <span>Start Date:</span>
                                <input
                                    type="date"
                                    value={currentMilestone.from_date}
                                    onChange={(e) => setCurrentMilestone({ ...currentMilestone, from_date: e.target.value })}
                                />
                            </div>

                            <div style={{ flex: 1 }}>
                                <span>End Date:</span>
                                <input
                                    type="date"
                                    value={currentMilestone.to_date}
                                    onChange={(e) => setCurrentMilestone({ ...currentMilestone, to_date: e.target.value })}
                                />
                            </div>
                        </div>
                    </Modal>
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

                                            <Link style={{ color: 'blue', marginLeft: '10px' }} to={'../teacher/class-user'}>
                                                <Button>Go to Class</Button>
                                            </Link>,
                                            <Tooltip title="Set Milestone">
                                                <Button
                                                    tooltip={<div>Documents</div>}
                                                    icon={<DashboardOutlined />}
                                                    onClick={showMilestoneModal}
                                                />
                                            </Tooltip>



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