import React, { useState } from 'react';
import AppHeader from '../layout/Header';
import AppFooter from '../layout/Footer';
import AppSidebar from '../layout/Sidebar';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import {
  Layout,
  Button,
  Input,
  List,
  Modal,
  Switch,
  message
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Content } = Layout;

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (index) => {
    setEditingIndex(index);
    setEditingRole(roles[index].name);
    setEditModalVisible(true);
  };

  const handleOk = () => {
    if (newRole) {
      setRoles(prevRoles => [...prevRoles, { name: newRole, enabled: true }]);
      setNewRole('');
    }
    setIsModalVisible(false);
  };

  const handleEditOk = () => {
    if (editingRole) {
      const updatedRoles = [...roles];
      updatedRoles[editingIndex].name = editingRole;
      setRoles(updatedRoles);
      setEditingRole('');
      message.success('Role edited successfully!');  
    }
    setEditModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  const toggleSwitch = (index) => {
    Modal.confirm({
      title: 'Confirm',
      content: `Are you sure you want to ${roles[index].enabled ? 'disable' : 'enable'} this role?`,
      onOk: () => {
        const updatedRoles = [...roles];
        const previousState = updatedRoles[index].enabled;
        updatedRoles[index].enabled = !previousState;
        setRoles(updatedRoles);
        
        // Display specific success message based on the action
        if (previousState) {
          message.success('Role disabled successfully!');
        } else {
          message.success('Role enabled successfully!');
        }
      }
    });
};

    return (
      <Layout style={{ minHeight: '100vh' }}>
          <AppSidebar />
          <Layout>
              <AppHeader />
              <Content style={{ textAlign: 'left', padding: '20px', paddingLeft: '140px', paddingRight: '140px' }}>
                  <h1>Role Management</h1>
                  <Button type="primary" onClick={showModal}>
                      Add Role
                  </Button>
                  <Modal title="Add Role" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                      <Input
                          value={newRole}
                          onChange={e => setNewRole(e.target.value)}
                          placeholder="Enter a new role"
                      />
                  </Modal>
                  <Modal title="Edit Role" visible={editModalVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
                      <Input
                          value={editingRole}
                          onChange={e => setEditingRole(e.target.value)}
                          placeholder="Edit role"
                      />
                  </Modal>
                  <List
                      size="x-small"
                      bordered
                      dataSource={roles}
                      renderItem={(role, index) => (
                          <List.Item style={{ justifyContent: 'space-between', display: 'flex' }}>
                              <span style={{ textAlign: 'left' }}>
                                  <Link to={`/role-list/${role.name}`}>{role.name}</Link>
                              </span>
                              <div>
                                  <Button icon={<EditOutlined />} onClick={() => showEditModal(index)} style={{ marginRight: '10px' }} />
                                  <Switch checked={role.enabled} onChange={() => toggleSwitch(index)} />
                              </div>
                          </List.Item>
                      )}
                      style={{ marginTop: '20px', paddingLeft: '170px', paddingRight: '170px', backgroundColor: 'white' }}
                  />
              </Content>
              <AppFooter />
          </Layout>
      </Layout>
  
  );
};

export default RoleList;
