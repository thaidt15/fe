import React, { useState } from 'react';
import AppHeader from '../layout/Header';
import AppFooter from '../layout/Footer';
import AppSidebar from '../layout/Sidebar';
import {
    Layout,
    Button,
    Input,
    Table,
    Modal,
    message
} from 'antd';
import { EditOutlined,DeleteOutlined  } from '@ant-design/icons';
const { TextArea } = Input;
const { Content } = Layout;

const CheckList = () => {
    const [checkList, setCheckList] = useState([]);
    const [newCheckList, setNewCheckList] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingCheckList, setEditingCheckList] = useState('');
    const [editingDescription, setEditingDescription] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const showEditModal = (index) => {
        setEditingIndex(index);
        setEditingCheckList(checkList[index].name);
        setEditModalVisible(true);
    };

    const handleOk = () => {
        if (newCheckList) {
            const newId = checkList.length + 1;
            setCheckList(prevCheckList => [...prevCheckList, { 
                id: newId, 
                name: newCheckList, 
                description: newDescription, 
                enabled: true 
            }]);
            setNewCheckList('');
            setNewDescription(''); 
        }
        setIsModalVisible(false);
    };

    const handleEditOk = () => {
        if (editingCheckList) {
            const updatedCheckList = [...checkList];
            updatedCheckList[editingIndex].name = editingCheckList;
            updatedCheckList[editingIndex].description = editingDescription; // Update the description
            setCheckList(updatedCheckList);
            setEditingCheckList('');
            setEditingDescription('');  
            message.success('CheckList edited successfully!');
        }
        setEditModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleEditCancel = () => {
        setEditModalVisible(false);
    };


    const deleteItem = index => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this checklist?',
            onOk: () => {
                const updatedCheckList = [...checkList];
                updatedCheckList.splice(index, 1);
                setCheckList(updatedCheckList);
                message.success('CheckList deleted successfully!');
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
            key: 'name',
            render: (text, record) => <span title={record.description}>{text}</span>
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button icon={<EditOutlined />} onClick={() => showEditModal(record.key)} style={{ marginRight: '10px' }} />
                    <Button icon={<DeleteOutlined />} onClick={() => deleteItem(record.key)} danger />
                </div>
            )
        }
    ];
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Content style={{ textAlign: 'left', padding: '20px', paddingLeft: '140px', paddingRight: '140px' }}>
                    <Button type="primary" onClick={showModal}>
                        Add Check-list
                    </Button>
                    <Modal title="Add Check-list" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <Input
                            value={newCheckList}
                            onChange={e => setNewCheckList(e.target.value)}
                            placeholder="Enter a Check-list"
                        />
                        <br /><br />
                        <TextArea
                            value={newDescription}
                            onChange={e => setNewDescription(e.target.value)}
                            placeholder="Enter a description"
                        />
                    </Modal>
                    <Modal title="Edit Check-list" visible={editModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
                        <Input
                            value={editingCheckList}
                            onChange={e => setEditingCheckList(e.target.value)}
                            placeholder="Edit check-list"
                        />
                        <br /><br />
                        <TextArea
                            value={editingDescription}
                            onChange={e => setEditingDescription(e.target.value)}
                            placeholder="Edit description"
                        />
                    </Modal>
                    <Table
                        dataSource={checkList.map((item, index) => ({ ...item, key: index }))}
                        columns={columns}
                        style={{ marginTop: '20px' }}
                    />
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default CheckList;