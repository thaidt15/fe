import React, { useState } from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { Link } from "react-router-dom";
// import { Form } from 'antd';
import {
  Layout,
  Button,
  Input,
  List,
  Modal,
  Switch,
  message,
  Form,
  Breadcrumb
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Content } = Layout;

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [isFormVisible, setIsFormVisible] = useState(false); // For the Add Role form
  const [editFormVisible, setEditFormVisible] = useState(false); // For the Edit Role form

  const [form] = Form.useForm(); // For the Add Role form
  const [editForm] = Form.useForm(); // For the Edit Role form

  const showForm = () => {
    setIsFormVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    setRoles(prevRoles => [...prevRoles, { name: values.role, enabled: true }]);
    setIsFormVisible(false);
    form.resetFields();
  };

  const showEditForm = (index) => {
    setEditFormVisible(true);
    setEditingIndex(index);
    editForm.setFieldsValue({ role: roles[index].name });
  };

  const handleEditFormCancel = () => {
    setEditFormVisible(false);
    editForm.resetFields();
  };

  const handleEditFormSubmit = (values) => {
    const updatedRoles = [...roles];
    updatedRoles[editingIndex].name = values.role;
    setRoles(updatedRoles);
    setEditFormVisible(false);
    editForm.resetFields();
    message.success('Role edited successfully!');
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
        <Breadcrumb
          items={[
            {
              title: <Link to='../home'>Home</Link>
            },

            {
              title: 'Role Management',
            },
          ]}
          style={{
            marginLeft: 140, marginTop: 20
          }}
        />
        <Content style={{ textAlign: 'left', padding: '20px', paddingLeft: '140px', paddingRight: '140px' }}>
          <h1 style={{ textAlign: 'center' }}>Role Management</h1>
          <Button type="primary" onClick={showForm}>
            Add Role
          </Button>

          {/* Add Role Modal with Form */}
          <Modal title="Add Role" visible={isFormVisible} footer={null} onCancel={handleFormCancel}>
            <Form layout='vertical' form={editForm} onFinish={handleEditFormSubmit}>
              <Form.Item name="role" label="Role Name" rules={[{ required: true, message: 'Please input role name!' }]}>
                <Input placeholder="Enter a new role name" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button style={{ marginLeft: '10px' }} onClick={handleFormCancel}>Cancel</Button>
              </Form.Item>
            </Form>
          </Modal>

          {/* Edit Role Modal with Form */}
          <Modal title="Edit Role" visible={editFormVisible} footer={null} onCancel={handleEditFormCancel}>
            <Form layout='vertical' form={editForm} onFinish={handleEditFormSubmit}>
              <Form.Item name="role" label="Role Name" rules={[{ required: true, message: 'Please input role name!' }]}>
                <Input placeholder="Edit role" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button style={{ marginLeft: '10px' }} onClick={handleEditFormCancel}>Cancel</Button>
              </Form.Item>
            </Form>
          </Modal>
          <Modal title="Add Role" visible={isFormVisible} footer={null} onCancel={handleFormCancel}>
            <Form layout='vertical' form={form} onFinish={handleFormSubmit}>
              <Form.Item name="role" label="Role Name" rules={[{ required: true, message: 'Please input role name!' }]}>
                <Input placeholder="Enter a new role name" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
                <Button style={{ marginLeft: '10px' }} onClick={handleFormCancel}>Cancel</Button>
              </Form.Item>
            </Form>
          </Modal>
          {/* Role List */}
          <List
            size="x-small"
            bordered
            dataSource={roles}
            renderItem={(role, index) => (
              <List.Item style={{ justifyContent: 'space-between', display: 'flex' }}>
                <span style={{ textAlign: 'left' }}>
                  {role.name}
                </span>
                <div>
                  <Button icon={<EditOutlined />} onClick={() => showEditForm(index)} style={{ marginRight: '10px' }} />
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