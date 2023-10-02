import React, { useState } from 'react';
import AppHeader from '../../layout/Header';
import AppFooter from '../../layout/Footer';
import AppSidebar from '../../layout/Sidebar';
import {
    Layout, Table, Button, Input, Modal, Switch, message, DatePicker, Select
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Option } = Select;

const Milestone = () => {
    const [milestones, setMilestones] = useState([]);
    const [newMilestone, setNewMilestone] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredMilestones = milestones.filter(milestone => {
        return milestone.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const showModal = () => {
        setIsModalVisible(true);
    };
    const getUniqueFilters = (data, key) => {
        const uniqueItems = [...new Set(data.map(item => item[key]))];
        return uniqueItems.map(value => ({
            text: value,
            value: value,
        }));
    };
    const showEditModal = (index) => {
        setEditingIndex(index);
        setNewMilestone({ ...milestones[index] });
        setIsModalVisible(true);
    };


    const handleOk = () => {
        if (newMilestone.name) {
            if (editingIndex !== null) {
                const updatedMilestones = [...milestones];
                updatedMilestones[editingIndex] = newMilestone;
                setMilestones(updatedMilestones);
                message.success('Milestone edited successfully!');
            } else {
                setMilestones(prev => [...prev, { ...newMilestone, id: (prev.length + 1).toString() }]);
                // ^ Automatically sets ID to the next number in line based on the length of milestones list
                message.success('Milestone added successfully!');
            }
            setNewMilestone({});
            setEditingIndex(null);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingIndex(null);
        setNewMilestone({});
    };

    const toggleSwitch = (index) => {
        Modal.confirm({
            title: 'Confirm',
            content: `Are you sure you want to ${milestones[index].enabled ? 'disable' : 'enable'} this milestone?`,
            onOk: () => {
                const updatedMilestones = [...milestones];
                updatedMilestones[index].enabled = !updatedMilestones[index].enabled;
                setMilestones(updatedMilestones);
                message.success(`${milestones[index].enabled ? 'Milestone disabled' : 'Milestone enabled'} successfully!`);
            }
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Iteration',
            dataIndex: 'iteration',
            key: 'iteration',
            filters: getUniqueFilters(milestones, 'iteration'),
            onFilter: (value, record) => record.iteration.indexOf(value) === 0,
        },
        {
            title: 'Class',
            dataIndex: 'class',
            key: 'class',
            filters: getUniqueFilters(milestones, 'class'),
            onFilter: (value, record) => record.class.indexOf(value) === 0,
        },
        {
            title: 'From Date',
            dataIndex: 'from_date',
            key: 'from_date',
            render: date => date.format('YYYY-MM-DD')
        },
        {
            title: 'To Date',
            dataIndex: 'to_date',
            key: 'to_date',
            render: date => date.format('YYYY-MM-DD')
        },
        {
            title: 'Status',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (enabled, _, index) => (
                <Switch checked={enabled} onChange={() => toggleSwitch(index)} />
            )
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record, index) => (
                <Button icon={<EditOutlined />} onClick={() => showEditModal(index)} />
            )
        }
    ];

    const iterations = ['Iteration 1', 'Iteration 2', 'Iteration 3', 'Iteration 4'];
    const classes = ['KS1601', 'KS1602', 'KS1603', 'KS1604'];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <h1>Milestone Management</h1>
                <Content style={{ textAlign: 'left', padding: '20px', paddingLeft: '140px', paddingRight: '140px' }}>
                    <Button type="primary" onClick={showModal}>Add Milestone</Button>
                    <Input
                        placeholder="Search milestones..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        style={{ marginBottom: '20px', marginTop: 20, width: 400, marginLeft: 100, textAlign: 'center' }}
                    />
                    <Table
                        dataSource={filteredMilestones}
                        columns={columns}
                        style={{ marginTop: '20px' }}
                        rowKey="id"
                    />
                    <Modal title={editingIndex !== null ? "Edit Milestone" : "Add Milestone"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input

                            value={newMilestone.name}
                            onChange={e => setNewMilestone(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter a new milestone name"
                        />

                        <Select
                            showSearch    // <-- added this line to enable search
                            value={newMilestone.iteration}
                            onChange={value => setNewMilestone(prev => ({ ...prev, iteration: value }))}
                            placeholder="Select iteration"
                            style={{ width: '100%', marginTop: '10px' }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            } // <-- added this line for filtering options
                        >
                            {iterations.map(iter => <Option key={iter} value={iter}>{iter}</Option>)}
                        </Select>

                        <Select
                            showSearch    // <-- added this line to enable search
                            value={newMilestone.class}
                            onChange={value => setNewMilestone(prev => ({ ...prev, class: value }))}
                            placeholder="Select class"
                            style={{ width: '100%', marginTop: '10px' }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            } // <-- added this line for filtering options
                        >
                            {classes.map(cls => <Option key={cls} value={cls}>{cls}</Option>)}
                        </Select>
                        <DatePicker
                            value={newMilestone.from_date}
                            onChange={date => setNewMilestone(prev => ({ ...prev, from_date: date }))}
                            style={{ width: '100%', marginTop: '10px' }}
                        />

                        <DatePicker
                            value={newMilestone.to_date}
                            onChange={date => setNewMilestone(prev => ({ ...prev, to_date: date }))}
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                    </Modal>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default Milestone;