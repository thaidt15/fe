import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import {
    Layout,
    Descriptions,
    Breadcrumb, 
    Button
} from 'antd';
import { Link } from "react-router-dom";

const { Content } = Layout;

const UserDetails = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const formatDate = (date) => {
        const formattedDate = new Date(date);
      
        const day = formattedDate.getDate().toString().padStart(2, '0');
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = formattedDate.getFullYear();
        const hours = formattedDate.getHours().toString().padStart(2, '0');
        const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
      
        return `${month}/${day}/${year} ${hours}:${minutes}`;
      };
    // Fetch the user's data using the id from the URL (just a placeholder here)
    useEffect(() => {
        // This is just sample data. Replace with actual fetch from your API.
        const fetchedUserData = {
            Roll_number: 'HE153736',
            full_name: 'Đoàn Trọng Thái',
            gender: 'Male',
            date_of_birth: '2001-08-17',
            email: 'Thaidt15@fpt.edu.vn',
            phone_number: '+84337305098',
            avatar_image: 'https://s.net.vn/PFt1',
            facebook_link: 'https://facebook.com/thaidt15',
            created_at: formatDate(new Date()),
            updated_at:formatDate(new Date()),
        };
        setUserData(fetchedUserData);
    }, [id]);

    if (!userData) return <p>Loading...</p>;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Breadcrumb style={{ marginLeft: 140, marginTop: 20 }}>
                    <Breadcrumb.Item><Link to='../home'>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to='../users'>Users Management</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>{userData.full_name}</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ padding: '20px 140px' }}>
                    <h1>User Details: {userData.full_name}</h1>
                    <Descriptions bordered>
                        <Descriptions.Item label="Roll Number">{userData.Roll_number}</Descriptions.Item>
                        <Descriptions.Item label="Full Name">{userData.full_name}</Descriptions.Item>
                        <Descriptions.Item label="Gender">{userData.gender}</Descriptions.Item>
                        <Descriptions.Item label="Date of birth">{userData.date_of_birth}</Descriptions.Item>
                        <Descriptions.Item label="Email">{userData.email}</Descriptions.Item>
                        <Descriptions.Item label="facebook"><a href={userData.facebook_link}>{userData.facebook_link}</a></Descriptions.Item>
                        <Descriptions.Item label="Create at">{userData.created_at}</Descriptions.Item>
                        <Descriptions.Item label="Update at">{userData.updated_at}</Descriptions.Item>
                        <Descriptions.Item label="Image"><img style={{maxWidth: '50px'}} src={userData.avatar_image} alt="User Avatar" /></Descriptions.Item>
                    </Descriptions>
                    <Button type="primary" style={{ marginTop: '30px', float:'left' }}><Link to="../hod/user-list">Back to Users</Link></Button>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default UserDetails;
