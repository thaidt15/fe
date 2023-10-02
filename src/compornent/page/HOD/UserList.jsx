import React, { useState } from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { Link } from "react-router-dom";
import {
    Layout,
    Button,
    Modal,
    Switch,
    message,
    Table,
    Image, 
    Checkbox,
    Input, 
    Breadcrumb
} from 'antd';

const { Content } = Layout;

const UserList = () => {
    const { Search } = Input;
    const fixedUsers = [
        {
            id: 1,
            full_name: 'Đoàn Trọng Thái',
            email: 'Thaidt15@fpt.edu.vn',
            avatar_image: 'https://s.net.vn/FqqY',
            status: 'active',
            role: 'Lecturer'
        },
        {
            id: 2,
            full_name: 'Hà Tiến Thành',
            email: 'thanhht15@fpt.edu.vn',
            avatar_image: 'https://s.net.vn/FqqY',
            status: 'in-active',
            role: 'Lecturer'
        },
        {
            id: 3,
            full_name: 'Đoàn Văn Khánh',
            email: 'khanhdv15@fpt.edu.vn',
            avatar_image: 'https://s.net.vn/FqqY',
            status: 'active',
            role: 'Student'
        },
        {
            id: 4,
            full_name: 'Nguyễn Lê Huy',
            email: 'HuyNL@fpt.edu.vn',
            avatar_image: 'https://s.net.vn/FqqY',
            status: 'active',
            role: 'Lecturer'
        }
    ];
    const [users, setUsers] = useState(fixedUsers);// This will contain a list of users.
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered users based on search and role filter
    const filteredUsers = users.filter(user => {
        const matchSearch = searchTerm ? user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        
        return matchSearch;
    });
    
    const toggleUserStatus = (index) => {
        const currentUserStatus = users[index].status;
        const updatedStatus = currentUserStatus === 'active' ? 'in-active' : 'active';

        Modal.confirm({
            title: 'Confirm Status Change',
            content: `Are you sure you want to change the status to ${updatedStatus}?`,
            onOk: () => {
                const updatedUsers = [...users];
                updatedUsers[index].status = updatedStatus;
                setUsers(updatedUsers);
                message.success(`User ${updatedStatus} successfully!`);
            }
        });
    };
   
    const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);

    const roles = ['Head of department', 'Lecturer', 'Student', 'Reviewer'];

    const showRoleModal = (index) => {
        setEditingIndex(index);
        setSelectedRoles([users[index].role]);
        setIsRoleModalVisible(true);
    };

    const handleOk = () => {
        if (editingIndex !== null) {
            const updatedUsers = [...users];
            updatedUsers[editingIndex].role = selectedRoles.join(", ");
            setUsers(updatedUsers);
        }
        setIsRoleModalVisible(false);
    };

    const handleCancel = () => {
        setIsRoleModalVisible(false);
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            render: (text, record) => <Link to={`/hod/user-details`}>{text}</Link>
        },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Image',
            dataIndex: 'avatar_image',
            key: 'avatar_image',
            render: (text) => <Image width={50} src="https://s.net.vn/PFt1" alt="User Avatar" />
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, _, index) => (
                <Switch
                    checked={status === 'active'}
                    onChange={() => toggleUserStatus(index)}
                />
            )
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: roles.map(role => ({ text: role, value: role })),
            onFilter: (value, record) => record.role.includes(value),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record, index) => (
                <Button onClick={() => showRoleModal(index)}>
                    Change Role
                </Button>
            ),
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
                            title: 'User Management',
                        },
                    ]}
                    style={{
                        marginLeft: 140, marginTop: 20
                    }}
                />
                <Content style={{ padding: '20px 140px' }}>
                    <h1>User Management</h1>

                    <Search
                        placeholder="Enter name or email to search..."
                        onSearch={value => setSearchTerm(value)}
                        style={{ width: 300, marginBottom: 16 }}
                    />
                    

                    <Table dataSource={filteredUsers} columns={columns} rowKey="id" style={{ marginTop: '20px' }} />

                    <Modal
                        title="Change Role"
                        visible={isRoleModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <h3>Please choose the role to update</h3><br></br>
                        <Checkbox.Group
                            options={roles}
                            value={selectedRoles}
                            onChange={setSelectedRoles}
                        />
                    </Modal>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default UserList;