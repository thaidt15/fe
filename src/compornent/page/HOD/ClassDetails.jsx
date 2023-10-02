import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { Layout, Descriptions, Breadcrumb, Button } from 'antd';
import { Link } from "react-router-dom";

const { Content } = Layout;

const ClassDetails = () => {
    const formatDate = (date) => {
        const formattedDate = new Date(date);
      
        const day = formattedDate.getDate().toString().padStart(2, '0');
        const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
        const year = formattedDate.getFullYear();
        const hours = formattedDate.getHours().toString().padStart(2, '0');
        const minutes = formattedDate.getMinutes().toString().padStart(2, '0');
      
        return `${month}/${day}/${year} ${hours}:${minutes}`;
      };
    const { class_code } = useParams(); // Get the class code from the URL
    const [classDetails, setClassDetails] = useState(null);

    // Example data fetching function
    useEffect(() => {
        // Fetch details of the class by class_code. 
        // For this example, I'm assuming a static response, 
        // but you should fetch the data from your backend or API.
        const fetchedClassDetails = {
            class_code: "SEP490_G75",
            trainer_id: "SangNV",
            status: "active",
            created_at: formatDate(new Date()),
            updated_at: formatDate(new Date()),
            created_by: "ThaiDT",
            updated_by: "ThaiDT"
        };
        setClassDetails(fetchedClassDetails);
    }, [class_code]);

    if (!classDetails) return <p>Loading...</p>;

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <AppSidebar />
            <Layout>
                <AppHeader />
                <Breadcrumb style={{ marginLeft: 140, marginTop: 20 }}>
                    <Breadcrumb.Item><Link to='../home'>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to='../classes'>Classes</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>SEP490_G75</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ padding: '20px 140px' }}>
                    <h1>Class Details: {classDetails.class_code}</h1>
                    <Descriptions bordered>
                        <Descriptions.Item label="Class Code">{classDetails.class_code}</Descriptions.Item>
                        <Descriptions.Item label="Lecturer">{classDetails.trainer_id}</Descriptions.Item>
                        <Descriptions.Item label="Status">{classDetails.status}</Descriptions.Item>
                        <Descriptions.Item label="Created At">{classDetails.created_at}</Descriptions.Item>
                        <Descriptions.Item label="Updated At">{classDetails.updated_at}</Descriptions.Item>
                        <Descriptions.Item label="Created By">{classDetails.created_by}</Descriptions.Item>
                        <Descriptions.Item label="Updated By">{classDetails.updated_by}</Descriptions.Item>
                    </Descriptions>
                    <Button type="primary" style={{ marginTop: '30px', float:'left' }}><Link to="../hod/class-list">Back to Classes</Link></Button>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default ClassDetails;
