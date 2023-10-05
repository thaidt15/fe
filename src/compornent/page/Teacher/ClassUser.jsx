import React, { useState } from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { saveAs } from 'file-saver';
import {
    Layout, Table, Button, Modal, message, Input, Breadcrumb, Form, Tooltip, Select
} from 'antd';
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { UploadDownloadButtons } from './compornent/ClassUserCompornent/UploadDownloadButtons';
import { FinalPresentationModal } from './compornent/ClassUserCompornent/FinalPresentationModal';
import { TeamDetailsModal } from './compornent/ClassUserCompornent/TeamDetatilsModal.jsx';
import { OG1GradingModal, OG2GradingModal, OG3GradingModal } from './compornent/ClassUserCompornent/GradingModal';

const { Content } = Layout;
const { Option } = Select;

const ClassUser = () => {
    const [newClassUser, setNewClassUser] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isGradingLOCVisible, setIsGradingLOCVisible] = useState(false);
    const [isGradingOG2Visible, setIsGradingOG2Visible] = useState(false);
    const [isGradingOG3Visible, setIsGradingOG3Visible] = useState(false);
    const [isTeamDetailsModalVisible, setIsTeamDetailsModalVisible] = useState(false);

    const showGradingOG2Modal = (record, index) => {
        setEditingIndex(index);
        setIsGradingOG2Visible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingIndex(null);
        setNewClassUser({});
    };
    const handleTeamDetailsCancel = () => {
        setIsTeamDetailsModalVisible(false);
        
    };
    const showGradingOG3Modal = (record, index) => {
        setEditingIndex(index);
        setIsGradingOG3Visible(true);
    };
    const showTeamDetailsModal = (team) => {
        // You can set the selected team here if needed
        setIsTeamDetailsModalVisible(true);
    };
    const calculateOGAndProtectionStatus = (user) => {
        const ogAverage = (user.on_going1 + user.on_going2 + user.on_going3) / 3;
        return {
            total_og: Number(ogAverage.toFixed(2)),
            pStatus: ogAverage < 5 ? 'not' : 'yes'
        };
    };
    const calculateFinalGrade = (user) => {
        return (user.total_og * 0.6) + (user.final_pres * 0.4);
    };
    
    const handleGradingOG2Ok = () => {
        const totalGrade = calculateTotalGrade();
        const updatedClassUser = [...classUser];
        const updatedUser = {
            ...updatedClassUser[editingIndex],
            on_going2: Number(totalGrade.toFixed(2)),
            ...calculateOGAndProtectionStatus(updatedClassUser[editingIndex])
        };
        updatedClassUser[editingIndex] = updatedUser;
        setClassUsers(updatedClassUser);
        setIsGradingOG2Visible(false);
    };
    

    const handleGradingOG3Ok = () => {
        const totalGrade = calculateTotalGrade();
        const updatedClassUser = [...classUser];
        const updatedUser = {
            ...updatedClassUser[editingIndex],
            on_going3: Number(totalGrade.toFixed(2)),
            ...calculateOGAndProtectionStatus(updatedClassUser[editingIndex])
        };
        updatedClassUser[editingIndex] = updatedUser;
        setClassUsers(updatedClassUser);
        setIsGradingOG3Visible(false);
    };
    
    const handleGradingOk = () => {
        const totalGrade = calculateTotalGrade();
        const updatedClassUser = [...classUser];
        const updatedUser = {
            ...updatedClassUser[editingIndex],
            on_going1: Number(totalGrade.toFixed(2)),
            ...calculateOGAndProtectionStatus(updatedClassUser[editingIndex])
        };
        updatedClassUser[editingIndex] = updatedUser;
        setClassUsers(updatedClassUser);
        setIsGradingLOCVisible(false);
    };
    const defaultUsers = [
        {
            id: '1',
            roll_number: 'HE153739',
            team: 'Team1',
            team_leader: false,
            on_going1: null,
            on_going2: null,
            on_going3: null,
            final_pres: null,
            final_grade: null,

        },
        {
            id: '2',
            roll_number: 'HE153740',
            team: 'Team2',
            team_leader: false,
            on_going1: null,
            on_going2: null,
            on_going3: null,
            final_pres: null,
            final_grade: null,
        },
        {
            id: '3',
            roll_number: 'HE153741',
            team: 'Team3',
            team_leader: false,
            on_going1: null,
            on_going2: null,
            on_going3: null,
            final_pres: null,
            final_grade: null,
        },
        {
            id: '4',
            roll_number: 'HE153742',
            team: 'Team6',
            team_leader: false,
            on_going1: null,
            on_going2: null,
            on_going3: null,
            final_pres: null,
            final_grade: null,
        },
        {
            id: '5',
            roll_number: 'HE153755',
            team: 'Team1',
            team_leader: false,
            on_going1: null,
            on_going2: null,
            on_going3: null,
            final_pres: null,
            final_grade: null,

        }
    ].map(user => {
        const ogAverage = (user.on_going1 + user.on_going2 + user.on_going3) / 3;
        return {
            ...user,
            total_og: ogAverage,
            pStatus: ogAverage < 5 ? 'not' : 'yes'
        };
    });
    const [classUser, setClassUsers] = useState(defaultUsers);

    const [srsGrade, setSrsGrade] = useState(null);
    const [sdsGrade, setSdsGrade] = useState(null);
    const [locGrade, setLocGrade] = useState(9); // Assuming default value is 9
    // caculate OG grade 
    const calculateTotalGrade = () => {
        const total = (srsGrade * 0.1) + (sdsGrade * 0.1) + (locGrade * 0.8);
        console.log("Calculated Grade:", total);
        return total;
    };
    const showEditModal = (index) => {
        setEditingIndex(index);
        setNewClassUser({ ...classUser[index] });
        setIsModalVisible(true);
    };
    const showFinalPresentationModal = (record, mode) => {
        setEditingIndex(record.id); // Assuming 'id' is unique for each record
        setFinalPresentationMode(mode); // 'grade' or 'edit'
        setIsFinalPresentationModalVisible(true);
    };
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
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
    const deleteItem = index => {
        Modal.confirm({
            title: 'Confirm Delete',
            content: 'Are you sure you want to delete this User from class??',
            onOk: () => {
                const UpdateClassUser = [...classUser];
                UpdateClassUser.splice(index, 1);
                setClassUsers(UpdateClassUser);
                message.success('User deleted successfully!');
            }
        });
    };
    const teams = ['Team1', 'Team2', 'Team3', 'Team6'];
    const rollNumbers = ['HE153736', 'HE153737', 'HE153738'];
    const handleDownload = () => {
        const className = "SampleClass";
        const grade = "Grade";
        const fileName = `${className}_${grade}.xlsx`;


        const blob = new Blob([""], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        saveAs(blob, fileName);
    };
    const onFinish = values => {

        if (values.roll_number) {
            if (editingIndex !== null) {
                const updatedClassUser = [...classUser];
                updatedClassUser[editingIndex] = values;
                setClassUsers(updatedClassUser);
            } else {
                setClassUsers(prev => [...prev, { ...values, id: (prev.length + 1).toString() }]);
                message.success('User added successfully!');
            }
            setEditingIndex(null);
            form.resetFields();
        }
        setIsModalVisible(false);
    };
    const showGradingModal = (record, index) => {
        setEditingIndex(index);
        setIsGradingLOCVisible(true);
    };
    const handleGradingLOCModalClose = () => {
        setIsGradingLOCVisible(false);
    };
    const [isFinalPresentationModalVisible, setIsFinalPresentationModalVisible] = useState(false);
    const [finalPresentationMode, setFinalPresentationMode] = useState('grade');
    const uniqueTeams = [...new Set(classUser.map(user => user.team))];

    const initialTeamGrades = uniqueTeams.map(team => ({ team, presentation1: 0, presentation2: 0 }));
    const [teamGrades, setTeamGrades] = useState(initialTeamGrades);

    const handleFinalPresentationOk = () => {
        const updatedClassUser = classUser.map(user => {
            const packageGrade = (user.srs * 0.1) + (user.sds * 0.1) + (locGrade * 0.8);
            const userTeamGrade = teamGrades.find(teamGrade => teamGrade.team === user.team);
            const teamGradeAverage = userTeamGrade ? (userTeamGrade.presentation1 + userTeamGrade.presentation2) / 2 : 0;
            const finalPresGrade = (packageGrade * 0.4) + (teamGradeAverage * 0.6);
            
            return {
                ...user,
                final_pres: Number(finalPresGrade.toFixed(2)),
                final_grade: calculateFinalGrade({
                    ...user,
                    final_pres: Number(finalPresGrade.toFixed(2))
                })
            };
        });
    
        setClassUsers(updatedClassUser);
    
        // Close the modal
        setIsFinalPresentationModalVisible(false);
    };
    



    const handleFinalPresentationCancel = () => {
        // Handle the Cancel button click for the modal
        setIsFinalPresentationModalVisible(false);
    };
    const columns = [
        {
            title: 'STT',
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
            key: 'team',
            render: (text, record) => (
                <Button onClick={() => showTeamDetailsModal(text)}>{text}</Button>
            ),
        },
        {
            title: (
                <div>
                    <Tooltip title="This is grade of Iteration 1 (20%)">
                        OG 1 <QuestionCircleOutlined />
                    </Tooltip>

                </div>
            ),
            dataIndex: 'on_going1',
            key: 'on_going1',

            render: (text, record, index) => (
                <div>
                    {text ?
                        <>
                            {text}
                            <Button
                                size="small"
                                onClick={() => showGradingModal(record, index)}
                            >
                                Edit
                            </Button>
                        </>
                        :
                        <Button size="small" onClick={() => showGradingModal(record, index)}>Grading</Button>
                    }
                </div>
            )
        },
        {
            title: (
                <div>
                    <Tooltip title="This is grade of Iteration 2 (20%)">
                        OG 2 <QuestionCircleOutlined />
                    </Tooltip>

                </div>
            ),
            dataIndex: 'on_going2',
            key: 'on_going2',

            render: (text, record, index) => (
                <div>
                    {text ?
                        <>
                            {text}
                            <Button
                                size="small"
                                onClick={() => showGradingOG2Modal(record, index)}
                            >
                                Edit
                            </Button>
                        </>
                        :
                        <Button size="small" onClick={() => showGradingOG2Modal(record, index)}>Grading</Button>
                    }
                </div>
            )


        },
        {
            title: (
                <div>
                    <Tooltip title="This is grade of Iteration 3 (20%)">
                        OG 3 <QuestionCircleOutlined />
                    </Tooltip>

                </div>
            ),
            dataIndex: 'on_going3',
            key: 'on_going3',

            render: (text, record, index) => (
                <div>
                    {text ?
                        <>
                            {text}
                            <Button
                                size="small"
                                onClick={() => showGradingOG3Modal(record, index)}
                            >
                                Edit
                            </Button>
                        </>
                        :
                        <Button size="small" onClick={() => showGradingOG3Modal(record, index)}>Grading</Button>
                    }
                </div>
            )

        },
        {
            title: 'Total OG',
            dataIndex: 'total_og',
            key: 'total_og',

            render: value => value !== undefined && value !== null ? value : 0

        },
        {
            title: 'Protection status',
            dataIndex: 'pStatus',
            key: 'pStatus',



        },
        {
            title: 'Final Presentation',
            dataIndex: 'final_pres',
            key: 'final_pres',
            render: (text, record) => (
                <div>
                    {text !== null ?
                        <>
                            {text}
                            <Button
                                size="small"
                                onClick={() => showFinalPresentationModal(record, 'edit')}
                            >
                                Edit
                            </Button>
                        </>
                        :
                        record.pStatus === 'yes' ? 
                        <Button size="small" onClick={() => showFinalPresentationModal(record, 'grade')}>Grading</Button>
                        : null
                    }
                </div>
            )
        },
        {
            title: 'Final Grade',
            dataIndex: 'final_grade',
            key: 'final_grade',
            render: value => value !== undefined && value !== null ? value : 0
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

    const handleGradeChange = (userId, gradeType, value) => {
        const updatedClassUser = [...classUser];
        const userIndex = updatedClassUser.findIndex(user => user.id === userId);
        if (userIndex !== -1) {
            updatedClassUser[userIndex][gradeType] = Number(value);
            setClassUsers(updatedClassUser);
        }
    };

    const packageGradeColumns = [
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
            title: 'SRS',
            dataIndex: 'srs',
            key: 'srs',
            render: (text, record) => (
                <Input
                    defaultValue={text}
                    onChange={(e) => handleGradeChange(record.id, 'srs', e.target.value)}
                />
            )
        },
        {
            title: 'SDS',
            dataIndex: 'sds',
            key: 'sds',
            render: (text, record) => (
                <Input
                    defaultValue={text}
                    onChange={(e) => handleGradeChange(record.id, 'sds', e.target.value)}
                />
            )
        },
        {
            title: 'LOC',
            dataIndex: 'loc',
            key: 'loc',
            render: () => (
                <Input defaultValue={8} disabled />
            )
        }
    ];


    const teamGradeColumns = [
        {
            title: 'Team',
            dataIndex: 'team',
            key: 'team'
        },
        {
            title: 'Presentation 1',
            dataIndex: 'presentation1',
            key: 'presentation1',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => {
                        const updatedGrades = [...teamGrades];
                        updatedGrades[index].presentation1 = Number(e.target.value);
                        setTeamGrades(updatedGrades);
                    }}
                />
            )
        },
        {
            title: 'Presentation 2',
            dataIndex: 'presentation2',
            key: 'presentation2',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => {
                        const updatedGrades = [...teamGrades];
                        updatedGrades[index].presentation2 = Number(e.target.value);
                        setTeamGrades(updatedGrades);
                    }}
                />
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
                            title: <Link to='../teacher/'>Home</Link>
                        },
                        {
                            title: <Link to='../teacher/class'>Class</Link>,
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
                <Content style={{ textAlign: 'left', padding: '20px', paddingLeft: '140px', paddingRight: '140px' }}>
                    <UploadDownloadButtons
                        handleDownload={handleDownload}
                        props={props}
                        handleUpload={handleUpload}
                        fileList={fileList}
                        uploading={uploading}
                    />
                    <Table
                        dataSource={classUser}
                        columns={columns}
                        style={{ marginTop: '20px' }}
                        rowKey="id"
                    />
                    <OG1GradingModal
                        isVisible={isGradingLOCVisible}
                        handleOk={handleGradingOk}
                        handleCancel={handleGradingLOCModalClose}
                        setSrsGrade={setSrsGrade}
                        setSdsGrade={setSdsGrade}
                    />

                    <OG2GradingModal
                        isVisible={isGradingOG2Visible}
                        handleOk={handleGradingOG2Ok}
                        handleCancel={() => setIsGradingOG2Visible(false)}
                        setSrsGrade={setSrsGrade}
                        setSdsGrade={setSdsGrade}
                    />

                    <OG3GradingModal
                        isVisible={isGradingOG3Visible}
                        handleOk={handleGradingOG3Ok}
                        handleCancel={() => setIsGradingOG3Visible(false)}
                        setSrsGrade={setSrsGrade}
                        setSdsGrade={setSdsGrade}
                    />
                      <FinalPresentationModal
                        isVisible={isFinalPresentationModalVisible}
                        handleOk={handleFinalPresentationOk}
                        handleCancel={handleFinalPresentationCancel}
                        classUser={classUser}
                        teamGrades={teamGrades}
                        packageGradeColumns={packageGradeColumns}
                        teamGradeColumns={teamGradeColumns}
                    />
                     <TeamDetailsModal
                        isVisible={isTeamDetailsModalVisible}
                        handleOk={handleTeamDetailsCancel}
                        handleCancel={handleTeamDetailsCancel}
                        
                    />
                    <Modal
                        title={editingIndex !== null ? "Edit Class User" : "Add User To Class"}
                        visible={isModalVisible}
                        onOk={form.submit}
                        onCancel={handleCancel}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            initialValues={newClassUser}
                        >
                            <Form.Item name="roll_number"
                                label="Roll number"
                                rules={[{ required: true, message: 'Please select a roll number.' }]}>
                                <Select placeholder="Select Roll Number" style={{ width: '100%' }}>
                                    {rollNumbers.map(roll => <Option key={roll} value={roll}>{roll}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="team"
                                label="Team"
                            >
                                <Select placeholder="Select Team" style={{ width: '100%', marginTop: '10px' }}>
                                    {teams.map(team => <Option key={team} value={team}>{team}</Option>)}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="note"
                                label="Student Note"
                            >

                            </Form.Item>
                        </Form>
                    </Modal>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );
};

export default ClassUser;