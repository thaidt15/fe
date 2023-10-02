import React, { useState } from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { Link } from "react-router-dom";
import {
    Layout,
    Button,
    Input,
    Breadcrumb,
    Modal,
    Switch,
    message,
    Form,
    Table
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Content } = Layout;

const IterationList = () => {
    const [iterations, setIterations] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [form] = Form.useForm();

    const toggleSwitch = (index) => {
        const currentStatus = iterations[index].status;
        const updatedStatus = currentStatus === 'active' ? 'in-active' : 'active';
        Modal.confirm({
            title: 'Confirm Status Change',
            content: `Are you sure you want to change the status to ${updatedStatus}?`,
            onOk: () => {
                const updatedIterations = [...iterations];
                updatedIterations[index].status = updatedStatus;
                setIterations(updatedIterations);
                message.success(`Iteration ${updatedStatus} successfully!`);
            }
        });
    };

    const [modalMode, setModalMode] = useState(''); // either 'add' or 'edit'

    const showModal = (mode, index = null) => {
        if (mode === 'edit' && index !== null) {
            setEditingIndex(index);
            form.setFieldsValue(iterations[index]);
        } else {
            form.resetFields();
        }
        setModalMode(mode);
        setIsFormVisible(true);
    };

    const handleFormSubmit = (values) => {
        const newIteration = { id: iterations.length + 1, ...values };
        if (modalMode === 'edit' && editingIndex !== null) {
            const updatedIterations = [...iterations];
            updatedIterations[editingIndex] = newIteration;
            setIterations(updatedIterations);
            message.success('Iteration edited successfully!');
        } else {
            setIterations(prev => [...prev, newIteration]);
            message.success('Iteration added successfully!');
        }
        setIsFormVisible(false);
        form.resetFields();
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Iteration Name',
            dataIndex: 'iteration_name',
            key: 'iteration_name',
            filters: iterations.map(iteration => ({ text: iteration.iteration_name, value: iteration.iteration_name })),
            onFilter: (value, record) => record.iteration_name.indexOf(value) === 0,
            sorter: (a, b) => a.iteration_name.localeCompare(b.iteration_name)

        },
        {
            title: 'Duration (week)',
            dataIndex: 'duration',
            key: 'duration',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, _, index) => (
                <Switch
                    checked={status === 'active'}
                    onChange={() => toggleSwitch(index)}
                />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (status, record, index) => (
                <>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showModal('edit', index)} // Use showModal here
                        style={{ marginRight: '10px' }}
                    />
                </>
            ),
        },
    ];
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Breadcrumb
                    items={[
                        {
                            title: <Link to='../home'>Home</Link>
                        },
                        
                        {
                            title: 'Iteration Management',
                        },
                    ]}
                    style={{
                        marginLeft: 140, marginTop: 20
                    }}
                />
                <Content style={{ padding: '20px 140px' }}>
                    <h1>Iteration Management</h1>
                    <Button
                        type="primary" onClick={() => showModal('add')}
                        style={{ float: 'left' }}
                    >Add Iteration</Button>


                    <Modal
                        title={modalMode === 'edit' ? "Edit Iteration" : "Add Iteration"}
                        visible={isFormVisible}
                        footer={null}
                        onCancel={() => {
                            setIsFormVisible(false);
                            form.resetFields();
                        }}
                    >
                        <Form layout='vertical' form={form} onFinish={handleFormSubmit}>
                            <Form.Item name="iteration_name" label="Iteration Name" rules={[{ required: true, message: 'Please input iteration name!' }]}>
                                <Input placeholder="Enter iteration name" />
                            </Form.Item>
                            <Form.Item name="duration" label="Duration (weeks)" rules={[
                                { required: true, message: 'Please input duration!' },
                                { pattern: /^[1-9]\d*$/, message: 'Duration must be a positive integer!' }
                            ]}>
                                <Input type="number" placeholder="Enter duration" />
                            </Form.Item>
                            <Form.Item hidden={true} initialValue="active" name="status">
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                                <Button style={{ marginLeft: '10px' }} onClick={() => {
                                    setIsFormVisible(false);
                                    form.resetFields();
                                }}>
                                    Cancel
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Table
                        dataSource={iterations}
                        columns={columns}
                        rowKey="iteration_name"
                        style={{ marginTop: '20px' }}
                    />
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default IterationList;
