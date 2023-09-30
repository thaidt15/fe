import React, { useState, useEffect } from 'react';
import AppHeader from '../layout/Header';
import AppFooter from '../layout/Footer';
import moment from 'moment';
import AppSidebar from '../layout/Sidebar';
import { saveAs } from 'file-saver';
import {
    Layout, Table, Button, Modal, Switch, message, Select, InputNumber, Breadcrumb, Upload
} from 'antd';
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const { Content } = Layout;
const { Option } = Select;


const ClassUser = () => {
    const [classUser, setClassUsers] = useState([]);
    const [newClassUser, setNewClassUser] = useState({});
    const [countdown, setCountdown] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const showEditModal = (index) => {
        setEditingIndex(index);
        setNewClassUser({ ...classUser[index] });
        setIsModalVisible(true);
    };
    const [isMilestoneModalVisible, setMilestoneModalVisible] = useState(false);
    const [currentMilestone, setCurrentMilestone] = useState({
        from_date: '',
        to_date: '',
        iteration: 1,  // Assuming iteration starts from 1 by default
    });
    const [milestones, setMilestones] = useState({
        1: { from_date: '', to_date: '' },
        2: { from_date: '', to_date: '' },
        3: { from_date: '', to_date: '' },
        4: { from_date: '', to_date: '' }
    });
    const iterations = [
        { id: 1, name: 'Iteration 1' },
        { id: 2, name: 'Iteration 2' },
        { id: 3, name: 'Iteration 3' },
        { id: 4, name: 'Iteration 4' },
    ];
    const handleMilestoneOk = () => {
        setMilestones({
            ...milestones,
            [currentMilestone.iteration]: {
                from_date: currentMilestone.from_date,
                to_date: currentMilestone.to_date
            }
        });
        setMilestoneModalVisible(false);
    };
    const getNextIteration = () => {
        const today = new Date();
        for (let i = 1; i <= 4; i++) {
            const endDate = new Date(milestones[i].to_date);
            if (!milestones[i].to_date || endDate >= today) {
                return i;
            }
        }
        return null; // All iterations are set and past
    };
    const showMilestoneModal = () => {
        const nextIteration = getNextIteration();
        if (nextIteration) {
            setCurrentMilestone({
                ...milestones[nextIteration],
                iteration: nextIteration
            });
            setMilestoneModalVisible(true);
        } else {
            message.info('All iterations are set and past!');
        }
    };
    const handleOk = () => {
        if (newClassUser.roll_number) {
            if (editingIndex !== null) {
                const updatedClassUser = [...classUser];
                updatedClassUser[editingIndex] = newClassUser;
                setClassUsers(updatedClassUser);
                message.success('User edited successfully!');
            } else {
                setClassUsers(prev => [...prev, { ...newClassUser, id: (prev.length + 1).toString() }]);
                // ^ Automatically sets ID to the next number in line based on the length of milestones list
                message.success('User added successfully!');
            }
            setNewClassUser({});
            setEditingIndex(null);
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingIndex(null);
        setNewClassUser({});
    };
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file);
        });
        setUploading(true);
        // You can use any AJAX library you like
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
    const deleteItem = index => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this User??',
            onOk: () => {
                const UpdateClassUser = [...classUser];
                UpdateClassUser.splice(index, 1);
                setClassUsers(UpdateClassUser);
                message.success('User deleted successfully!');
            }
        });
    };
    const teams = ['Team1', 'Team2', 'Team3'];
    const rollNumbers = ['HE153736', 'HE153737', 'HE153738'];
    const handleDownload = () => {
        const className = "SampleClass";  // Placeholder, replace as needed
        const grade = "Grade";             // Placeholder, replace as needed
        const fileName = `${className}_${grade}.xlsx`;

        // Create a blob representing an empty Excel file
        // For this demo, we're just creating an empty file, but in a real-world scenario, you could
        // use a library like XLSX.js to populate the file with data
        const blob = new Blob([""], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        // Use FileSaver's saveAs method to save the file
        saveAs(blob, fileName);
    };
    const toggleTeamLeader = (index) => {
        Modal.confirm({
            title: 'Change Team Leader Status',
            content: `Are you sure you want to ${classUser[index].team_leader ? 'remove' : 'set'} this user as Team Leader?`,
            onOk: () => {
                const updatedClassUsers = [...classUser];
                updatedClassUsers[index].team_leader = !updatedClassUsers[index].team_leader;
                setClassUsers(updatedClassUsers);
                message.success(`${updatedClassUsers[index].team_leader ? 'User set as Team Leader' : 'User removed as Team Leader'} successfully!`);
            }
        });
    };
    const getCurrentIteration = () => {
        const today = moment();

        for (let i = 1; i <= 4; i++) {
            const milestone = milestones[i];
            const endDate = moment(milestone.to_date);
            if (!milestone.to_date || endDate >= today) {
                return i; // Returning the id of the current iteration
            }
        }
        return null; // If all iterations are set and past
    };
    useEffect(() => {
        const updateCountdown = () => {
            const currentIterationId = getCurrentIteration();
            if (currentIterationId !== null) {
                setCountdown(getTimeLeft(currentIterationId));
            }
        };
    
        // Initial update
        updateCountdown();
    
        // Update every second
        const interval = setInterval(updateCountdown, 1000);
    
        // Cleanup on component unmount
        return () => clearInterval(interval);
    }, [milestones]);  // Depend on milestones, so the effect reruns whenever they change
    const getTimeLeft = (iterationId) => {
        const today = moment();
        const endDate = moment(milestones[iterationId].to_date);
    
        if (endDate.isAfter(today)) {
            const duration = moment.duration(endDate.diff(today));
            const days = Math.floor(duration.asDays());
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            return `${days}d:${hours}h:${minutes}m:${seconds}s`;
        }
        return '0d:0h:0m:0s';
    };
    const getCurrentIterationDisplay = () => {
      
        // If the current iteration has days left, show it
        const currentIterationId = getCurrentIteration();
    
        if (currentIterationId === null) {
            return "All iterations are past"; // Or any other appropriate message
        }
        
        if (getTimeLeft(currentIterationId) !== '0d:0h:0m:0s') {
            return `Iteration ${currentIterationId}: ${countdown} left`;
        }
        else if (getTimeLeft(currentIterationId) === '0d:0h:0m:0s' && !milestones[currentIterationId + 1].to_date) {
            if(currentIterationId-1 ===0){
                return <><span style={{color: 'red'}}>Please set Milestone </span></>;
            }
            else{
                return <>Iteration {currentIterationId-1} is  <span style={{color: 'red'}}>expired</span> Please set milestone for Iteration {currentIterationId}</>;
            }
              
            
           
        }
    
        return '';  // Default, in case none of the above conditions are met
    };
    
    const currentIterationId = getCurrentIteration();
    const calculateDaysExpired = (iterationId) => {
        const today = moment();
        const endDate = moment(milestones[iterationId].to_date);
        return endDate.isBefore(today) ? today.diff(endDate, 'days') : 0;
    };
    const expiredDays = currentIterationId ? calculateDaysExpired(currentIterationId) : 0;
    const getDurationDays = () => {
        const startDate = new Date(currentMilestone.from_date);
        const endDate = new Date(currentMilestone.to_date);

        const differenceInTime = endDate - startDate;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return Math.ceil(differenceInDays);
    };
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Roll Number',
            dataIndex: 'roll_number',
            key: 'roll_number'
        },
        {
            title: 'Team',
            dataIndex: 'team',
            key: 'team'
        },


        {
            title: 'Team Leader',
            dataIndex: 'team_leader',
            key: 'team_leader',
            render: (isLeader, record, index) => (
                <Switch
                    checked={isLeader}
                    onChange={() => toggleTeamLeader(index)}
                />
            )
        },
        {
            title: 'On Going 1',
            dataIndex: 'on_going1',
            key: 'on_going1',
            render: value => value !== undefined && value !== null ? value : 0
        },
        {
            title: 'On Going 2',
            dataIndex: 'on_going2',
            key: 'on_going2',
            render: value => value !== undefined && value !== null ? value : 0
        },
        {
            title: 'On Going 3',
            dataIndex: 'on_going3',
            key: 'on_going3',
            render: value => value !== undefined && value !== null ? value : 0
        },
        {
            title: 'Final Presentation',
            dataIndex: 'final_pres',
            key: 'final_pres',
            render: value => value !== undefined && value !== null ? value : 0
        }
        ,
        {
            title: 'Final Grade',
            dataIndex: 'final_grade',
            key: 'final_grade',
            render: value => value !== undefined && value !== null ? value : 0
        },
        {
            title: 'Student note',
            dataIndex: 'note',
            key: 'note',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record, index) => (
                <div>
                    <Button icon={<EditOutlined />} onClick={() => showEditModal(index)} />
                    <Button icon={<DeleteOutlined />} onClick={() => deleteItem(index)} />
                </div>

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
                            title: <Link to='../class'>Class</Link>,
                        },

                        {
                            title: 'Class User',
                        },
                    ]}
                    style={{
                        marginLeft: 140, marginTop: 20
                    }}
                />
                <h1>Class User Management</h1>
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 600 }}>
                    {currentIterationId && (
                        <h3 style={{ marginRight: '10px' }}>
                            {getCurrentIterationDisplay()}
                        </h3>
                    )}

                    Total Duration: {getDurationDays()+1} days
                    <Button onClick={showMilestoneModal} style={{ width: 110, marginLeft: '10px' }}>Set Milestone</Button>

                </div>


                {/* Milestone Modal */}
                <Modal
                    title="Set Milestone"
                    visible={isMilestoneModalVisible}
                    onOk={handleMilestoneOk}
                    onCancel={() => setMilestoneModalVisible(false)}
                >
                    <Select
                        value={currentMilestone.iteration}
                        onChange={(value) =>
                            setCurrentMilestone({ ...currentMilestone, iteration: value })
                        }
                    >
                        {iterations.map((iter) => (
                            <Option key={iter.id} value={iter.id}>
                                {iter.name}
                            </Option>
                        ))}
                    </Select>

                    <div>
                        Start Date:
                        <input
                            type="date"
                            value={currentMilestone.from_date}
                            onChange={(e) => setCurrentMilestone({ ...currentMilestone, from_date: e.target.value })}
                        />
                    </div>
                    <div>
                        End Date:
                        <input
                            type="date"
                            value={currentMilestone.to_date}
                            onChange={(e) => setCurrentMilestone({ ...currentMilestone, to_date: e.target.value })}
                        />
                    </div>
                </Modal>
                <Content style={{ textAlign: 'left', padding: '20px', paddingLeft: '140px', paddingRight: '140px' }}>
                    <Button type="primary" onClick={showModal}>Add Class User</Button>
                    <Button icon={<DownloadOutlined />} onClick={handleDownload} style={{ marginTop: 16, marginLeft: 16 }}>
                        Export Class User
                    </Button>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />} style={{ marginLeft: 16 }}>Import Class User</Button>
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


                    <Table
                        dataSource={classUser}
                        columns={columns}
                        style={{ marginTop: '20px' }}
                        rowKey="id"
                    />
                    <Modal title={editingIndex !== null ? "Edit User" : "Add User"} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                        <Select
                            value={newClassUser.roll_number}
                            onChange={value => setNewClassUser({ ...newClassUser, roll_number: value })}
                            placeholder="Select Roll Number"
                            style={{ width: '100%', marginTop: '10px' }}
                        >
                            {rollNumbers.map(roll => <Option key={roll} value={roll}>{roll}</Option>)}
                        </Select>
                        <Select
                            value={newClassUser.team}
                            onChange={value => setNewClassUser({ ...newClassUser, team: value })}
                            placeholder="Select Team"
                            style={{ width: '100%', marginTop: '10px' }}
                        >
                            {teams.map(team => <Option key={team} value={team}>{team}</Option>)}
                        </Select>


                        <InputNumber
                            value={newClassUser.on_going1}
                            onChange={value => setNewClassUser({ ...newClassUser, on_going1: value })}
                            placeholder="On Going 1"
                            style={{ width: '100%', marginTop: '10px' }}
                            disabled
                        />
                        <InputNumber
                            value={newClassUser.on_going2}
                            onChange={value => setNewClassUser({ ...newClassUser, on_going2: value })}
                            placeholder="On Going 2"
                            style={{ width: '100%', marginTop: '10px' }}
                            disabled
                        />
                        <InputNumber
                            value={newClassUser.on_going3}
                            onChange={value => setNewClassUser({ ...newClassUser, on_going3: value })}
                            placeholder="On Going 3"
                            style={{ width: '100%', marginTop: '10px' }}
                            disabled
                        />
                        <InputNumber
                            value={newClassUser.final_pres}
                            onChange={value => setNewClassUser({ ...newClassUser, final_pres: value })}
                            placeholder="Final Presentation"
                            style={{ width: '100%', marginTop: '10px' }}
                            disabled
                        />
                        <InputNumber
                            value={newClassUser.final_grade}
                            onChange={value => setNewClassUser({ ...newClassUser, final_grade: value })}
                            placeholder="Final Grade"
                            style={{ width: '100%', marginTop: '10px' }}
                            disabled
                        />
                        <TextArea
                            value={newClassUser.note}
                            onChange={e => setNewClassUser({ ...newClassUser, note: e.target.value })}
                            placeholder="Student Note"
                            style={{ width: '100%', marginTop: '10px' }}
                        />
                    </Modal>
                </Content>
                <AppFooter />
            </Layout>
        </Layout >
    );
};

export default ClassUser;