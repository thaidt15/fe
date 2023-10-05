import React, { useState } from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { Link } from "react-router-dom";
import {
    Layout,
    Button,
    Breadcrumb,
    Modal,
    Switch,
    message,
    Form,
    Table,
    Input,
    Select,
    Upload
} from 'antd';
import { EditOutlined, EyeTwoTone } from '@ant-design/icons';
const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};


const { Content } = Layout;
const { Option } = Select;

const ClassList = () => {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [trainers, setTrainers] = useState(['SangNV', 'ThangPD', 'SonNT', 'TuanVM', 'HaiNB']); // Fixed trainers for demonstration
    const [form] = Form.useForm();
    const sampleClasses = [
        {
            id: 1,
            class_code: 'CS101',
            trainer_id: 'SangNV',
            reviewer1: 'ThangPD',
            reviewer2: 'TuanVM',
            status: 'active'
        },
        {
            id: 2,
            class_code: 'CS102',
            trainer_id: 'ThangPG',
            reviewer1: 'ThangPD',
            reviewer2: 'TuanVM',

            status: 'in-active'
        },
        {
            id: 3,
            class_code: 'CS103',
            trainer_id: 'SonNT',
            reviewer1: 'ThangPD',
            reviewer2: 'TuanVM',
            status: 'active'
        },
        {
            id: 4,
            class_code: 'CS104',
            trainer_id: 'TuanVM',
            reviewer1: 'ThangPD',
            reviewer2: 'TuanVM',
            status: 'active'
        },
        {
            id: 5,
            class_code: 'CS105',
            trainer_id: 'HaiNB',
            reviewer1: 'ThangPD',
            reviewer2: 'TuanVM',
            status: 'active'
        }
    ];
    const [classes, setClasses] = useState(sampleClasses);

    const toggleStatus = (index) => {
        const currentStatus = classes[index].status;
        const updatedStatus = currentStatus === 'active' ? 'in-active' : 'active';

        Modal.confirm({
            title: 'Confirm Status Change',
            content: `Are you sure you want to change the status to ${updatedStatus}?`,
            onOk: () => {
                const updatedClasses = [...classes];
                updatedClasses[index].status = updatedStatus;
                setClasses(updatedClasses);
                message.success(`Class ${updatedStatus} successfully!`);
            }
        });
    };

    const showModal = (mode, index = null) => {
        if (mode === 'edit' && index !== null) {
            setEditingIndex(index);
            form.setFieldsValue(classes[index]);
        } else {
            form.resetFields();
        }
        setIsFormVisible(true);
    };

    const handleFormSubmit = (values) => {
        const newClass = { id: classes.length + 1, ...values };
        if (editingIndex !== null) {
            const updatedClasses = [...classes];
            updatedClasses[editingIndex] = newClass;
            setClasses(updatedClasses);
            message.success('Class edited successfully!');
        } else {
            setClasses(prev => [...prev, newClass]);
            message.success('Class added successfully!');
        }
        setIsFormVisible(false);
        form.resetFields();
    };

    const dropdownContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 0,
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
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Class Code',
            dataIndex: 'class_code',
            key: 'class_code',
            sorter: (a, b) => a.class_code.localeCompare(b.class_code),
            render: (class_code) => <Link to={`../hod/class-details`}>{class_code}</Link>
        },
        {
            title: 'Lecturer',
            dataIndex: 'trainer_id',
            key: 'trainer_id',
            filters: trainers.map(trainer => ({ text: trainer, value: trainer })),
            onFilter: (value, record) => record.trainer_id === value,
        },

        {
            title: 'Reviewer 1',
            dataIndex: 'reviewer1',
            key: 'reviewer1',
            filters: trainers.map(trainer => ({ text: trainer, value: trainer })),
            onFilter: (value, record) => record.reviewer1 === value,
        },
        {
            title: 'Reviewer 2',
            dataIndex: 'reviewer2',
            key: 'reviewer2',
            filters: trainers.map(trainer => ({ text: trainer, value: trainer })),
            onFilter: (value, record) => record.reviewer2 === value,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record, index) => (
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
                <div>
                    <Button icon={<EditOutlined />} onClick={() => showModal('edit', index)} />,
                    <Link to={'../hod/class-user'} placeholder="Enter weight…"><Button icon={<EyeTwoTone />} /></Link>
                </div>

            )
        }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Breadcrumb style={{ marginLeft: 140, marginTop: 20 }}>
                    <Breadcrumb.Item><Link to='../home'>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Class Management</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ padding: '20px 140px' }}>
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
                    <h1>Class Management</h1>
                    <Button
                        type="primary"
                        onClick={() => showModal('add')}
                        style={{ float: 'left', marginBottom: '20px' }}
                    >
                        Add Class
                    </Button>
                    <Modal
                        title={editingIndex !== null ? "Edit Class" : "Add Class"}
                        visible={isFormVisible}
                        footer={null}
                        onCancel={() => setIsFormVisible(false)}
                    >
                        <Form layout='vertical' form={form} onFinish={handleFormSubmit}>
                            <Form.Item name="class_code" label="Class Code" rules={[{ required: true, message: 'Please input class code!' }]}>
                                <Input placeholder="Enter class code" />
                            </Form.Item>
                            <Form.Item name="trainer_id" label="Lecturer" rules={[{ required: true, message: 'Please select a Lecturer!' }]}>
                                <Select
                                    showSearch
                                    placeholder="Select a trainer"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {trainers.map(trainer => <Option key={trainer} value={trainer}>{trainer}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="reviewer1" label="Reviwer 1" rules={[{ required: true, message: 'Please select a Lecturer!' }]}>
                                <Select
                                    showSearch
                                    placeholder="Select a Reviewer 1"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {trainers.map(trainer => <Option key={trainer} value={trainer}>{trainer}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="reviewer2" label="Reviwer 2" rules={[{ required: true, message: 'Please select a Lecturer!' }]}>
                                <Select
                                    showSearch
                                    placeholder="Select a Reviewer 2"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {trainers.map(trainer => <Option key={trainer} value={trainer}>{trainer}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                                <Button onClick={() => setIsFormVisible(false)} style={{ marginLeft: '10px' }}>Cancel</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Table dataSource={classes} columns={columns} rowKey="class_code" />
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default ClassList;
