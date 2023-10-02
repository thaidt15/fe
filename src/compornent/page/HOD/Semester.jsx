import React, { useState } from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { Layout, Button, Input, Modal, message, Form, Table, DatePicker, Switch , Breadcrumb} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
const { Content } = Layout;

const SemesterList = () => {
    const [semesters, setSemesters] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState(''); // either 'add' or 'edit'
    const [editingIndex, setEditingIndex] = useState(null);

    const [form] = Form.useForm();

    const showModal = (mode, index = null) => {
        if (mode === 'edit' && index !== null) {
            setEditingIndex(index);
            form.setFieldsValue(semesters[index]);
        } else {
            form.resetFields();
        }
        setModalMode(mode);
        setIsModalVisible(true);
    };

    const handleFormSubmit = (values) => {
        const newSemseter = { id: semesters.length + 1, ...values };
        if (modalMode === 'edit' && editingIndex !== null) {
            const updatedSemesters = [...semesters];
            updatedSemesters[editingIndex] = newSemseter;
            setSemesters(updatedSemesters);
            message.success('Semester edited successfully!');
        } else {
            setSemesters(prev => [...prev, newSemseter]);
            message.success('Semester added successfully!');
        }
        setIsModalVisible(false);
        form.resetFields();
    };
    const toggleStatus = (index) => {
        const currentStatus = semesters[index].status
        const updatedStatus = currentStatus === 'active' ? 'in-active' : 'active';
        Modal.confirm({
            title: 'Confirm Status Change',
            content: `Are you sure you want to change the status to ${updatedStatus}?`,
            onOk: () => {
                const updateSemester = [...semesters];
                updateSemester[index].status = updatedStatus;
                setSemesters(updateSemester);
                message.success(`Semester ${updatedStatus} successfully!`);
            }
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Semester Name',
            dataIndex: 'semester_name',
            key: 'semester_name'
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            render: (date) => date ? date.format("YYYY-MM-DD HH:mm") : null, // Format the date
            sorter: (a, b) => a.start_date - b.start_date 
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            key: 'end_date',
            render: (date) => date ? date.format("YYYY-MM-DD HH:mm") : null,
            sorter: (a, b) => a.end_date - b.end_date 
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, _, index) => (
                <Switch
                checked={status === 'active'}
                    onChange={() => toggleStatus(index)}
                />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record, index) => (
                <Button icon={<EditOutlined />} onClick={() => showModal('edit', index)} />
            )
        }
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
                            title: 'Semester Management',
                        },
                    ]}
                    style={{
                        marginLeft: 140, marginTop: 20
                    }}
                />
                <Content style={{ padding: '20px 140px' }}>
                    <h1>Semester Management</h1>
                    <Button style={{float: 'left'}} type="primary" onClick={() => showModal('add')}>Add Semester</Button>
                    
                <Modal
                    title={modalMode === 'edit' ? "Edit Semester" : "Add Semester"}
                    visible={isModalVisible}
                    footer={null}
                    onCancel={() => setIsModalVisible(false)}
                >
                    <Form layout='vertical' form={form} onFinish={handleFormSubmit}>
                        <Form.Item name="semester_name" label="Semester Name" rules={[{ required: true, message: 'Please input semester name!' }]}>
                            <Input placeholder="Enter semester name" />
                        </Form.Item>
                        <Form.Item name="start_date" label="Start Date" rules={[{ required: true, message: 'Please select start date!' }]}>
                            <DatePicker format="YYYY-MM-DD HH:mm" showTime />
                        </Form.Item>
                        <Form.Item name="end_date" label="End Date" rules={[{ required: true, message: 'Please select end date!' }]}>
                            <DatePicker format="YYYY-MM-DD HH:mm" showTime />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>Submit</Button>
                            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
                        </Form.Item>
                    </Form>
                </Modal>

                <Table
                        dataSource={semesters}
                        columns={columns}
                        rowKey="semester_id" // Assuming you'll have a semester_id as primary key
                        style={{ marginTop: '20px' }}
                    />
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default SemesterList;