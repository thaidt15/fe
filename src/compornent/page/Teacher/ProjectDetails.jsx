import React, { useState } from 'react';
import { Layout, Button, Descriptions, Input, Upload, message, Breadcrumb } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';

const { Content } = Layout;
const { Item } = Descriptions;

const ProjectDetails = () => {
    const [fileList, setFileList] = useState([]);
    const initialProject = {
        project_id: 1,
        topic_code: 'PMS',
        topic_name: 'Project Management System',
        description: 'A system to manage projects.',
        created_at: '2023-01-01',
        updated_at: '2023-01-10',
        created_by: 'ThaiDT',
        updated_by: 'ThaiDZ'
    };
    const [uploading, setUploading] = useState(false);
    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        setUploading(true);
        fetch('https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };
    const props = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';
            if (!isExcel) {
                message.error('You can only upload Excel files!');
                return false;
            }
            setFileList([...fileList, file]);
            return false;
        },
    };

    const [project, setProject] = useState(initialProject);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would potentially send the updated project details to your backend.
    };

    const handleCancel = () => {
        setIsEditing(false);
        setProject(initialProject); // Reset the changes.
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Breadcrumb
                    items={[
                        { title: <Link to='../teacher/'>Home</Link> },
                        { title: <Link to='../teacher/project-list'>Projects</Link> },
                        { title: project.topic_name },
                    ]}
                    style={{ marginLeft: 140, marginTop: 20 }}
                />
                <Content style={{ padding: '20px 140px' }}>
                    <h1>Project Details</h1>
                    <div style={{ display: 'flex', alignItems: 'center' }}>

                        <Upload {...props}>
                            <Button icon={<UploadOutlined />} style={{ marginLeft: 16 }}>
                                Import Project Tracking
                            </Button>
                        </Upload>
                        {
                            fileList.length > 0 && (
                                <Button
                                    type="primary"
                                    onClick={handleUpload}
                                    disabled={fileList.length === 0}
                                    loading={uploading}
                                    style={{
                                        marginTop: 16,
                                    }}
                                >
                                    {uploading ? 'Uploading' : 'Start Upload'}
                                </Button>
                            )
                        }
                        {!isEditing && <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} style={{ marginBottom: '0px', marginLeft: 10 }}>Edit Information</Button>}
                    </div>
                    
                    {isEditing && (
                        <>
                            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{ marginRight: '10px', marginBottom: '20px' }}>Save</Button>
                            <Button type="danger" icon={<CloseOutlined />} onClick={handleCancel} style={{ marginBottom: '20px' }}>Cancel</Button>
                        </>
                    )}
                    <Descriptions bordered layout="vertical">
                        <Item label="Topic Code">
                            {isEditing ? <Input value={project.topic_code} onChange={e => setProject({ ...project, topic_code: e.target.value })} /> : project.topic_code}
                        </Item>
                        <Item label="Topic Name">
                            {isEditing ? <Input value={project.topic_name} onChange={e => setProject({ ...project, topic_name: e.target.value })} /> : project.topic_name}
                        </Item>
                        <Item label="Description">
                            {isEditing ? <Input.TextArea value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} /> : project.description}
                        </Item>
                        <Item label="Created At">{project.created_at}</Item>
                        <Item label="Updated At">{project.updated_at}</Item>
                        <Item label="Created By">{project.created_by}</Item>
                        <Item label="Updated By">{project.updated_by}</Item>
                    </Descriptions>
                    <Link to={'../teacher/projects'}>
                        <Button type="primary" style={{ float: 'left', marginTop: 30 }}>
                            Back
                        </Button>
                    </Link>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default ProjectDetails;
