import React, { useState } from 'react';
import { Layout, Button, Descriptions, Input, Form } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import AppHeader from '../../layout/Header';
import AppFooter from '../../layout/Footer';
import AppSidebar from '../../layout/Sidebar';

const { Content } = Layout;
const { Item } = Descriptions;

const TeamDetails = () => {
    const initialTeam = {
        team_name: 'Sample Team',
        project_name: 'Sample Project',
        gitlab_url: 'https://gitlab.com/sample',
        status: 'Active',
        created_at: '2023-01-01',
        updated_at: '2023-01-10'
    };

    const [team, setTeam] = useState(initialTeam);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        // Here you would potentially send the updated team details to your backend.
    };

    const handleCancel = () => {
        setIsEditing(false);
        setTeam(initialTeam); // Reset the changes.
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Content style={{ padding: '20px 140px' }}>
                    <h1>Team Details</h1>
                    {!isEditing && <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} style={{ marginBottom: '20px' }}>Edit Information</Button>}
                    {isEditing && (
                        <>
                            <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{ marginRight: '10px', marginBottom: '20px' }}>Save</Button>
                            <Button type="danger" icon={<CloseOutlined />} onClick={handleCancel} style={{ marginBottom: '20px' }}>Cancel</Button>
                        </>
                    )}
                    <Descriptions bordered layout="vertical">
                        <Item label="Team Name">
                            {isEditing ? <Input value={team.team_name} onChange={e => setTeam({ ...team, team_name: e.target.value })} /> : team.team_name}
                        </Item>
                        <Item label="Project Name">
                            {isEditing ? <Input value={team.project_name} onChange={e => setTeam({ ...team, project_name: e.target.value })} /> : <Link to="../teacher/project-backlog">{team.project_name}</Link>}
                        </Item>
                        <Item label="GitLab URL">
                            {isEditing ? <Input value={team.gitlab_url} onChange={e => setTeam({ ...team, gitlab_url: e.target.value })} /> : <a href={team.gitlab_url} target="_blank" rel="noopener noreferrer">{team.gitlab_url}</a>}
                        </Item>
                        <Item label="Status">{team.status}</Item>
                        <Item label="Created At">{team.created_at}</Item>
                        <Item label="Updated At">{team.updated_at}</Item>
                    </Descriptions>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default TeamDetails;
