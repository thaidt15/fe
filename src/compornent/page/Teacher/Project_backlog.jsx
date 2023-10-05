import React, { useState } from 'react';
import AppHeader from './layout/Header';
import AppFooter from './layout/Footer';
import AppSidebar from './layout/Sidebar';
import { saveAs } from 'file-saver';
import './style.css'
import {
    Layout,
    Button,
    Input,
    Table,
    Modal,
    message,
    Select,
    Switch,
    Breadcrumb,
    Upload
} from 'antd';
import { Link } from "react-router-dom";
import { EditOutlined, CloseOutlined, CheckOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Content } = Layout;

const Project_Backlog = () => {
    const [checkList, setCheckList] = useState([]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editingCheckList, setEditingCheckList] = useState('');
    const [editingDescription, setEditingDescription] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [pkgStatusModalVisible, setPkgStatusModalVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('pending');
    const [selectedIteration, setSelectedIteration] = useState('Iteration 1');
    const [studentName, setStudentName] = useState('');
    const [percent_add, setPercent_add] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [functionName, setFunctionName] = useState('');
    const [actor, setActor] = useState('');
    const [featureName, setFeatureName] = useState('');
    const [complexity, setComplexity] = useState('');
    const [loc, setLoc] = useState('');
    const iterations = ['Iteration 1', 'Iteration 2', 'Iteration 3'];
    const pkgStatuses = ['doing', 'pending', 'complete'];
    const [isEditPercentageVisible, setIsEditPercentageVisible] = useState(false);
    const [editingPercentage, setEditingPercentage] = useState(0);
    const [editingRecord, setEditingRecord] = useState(null);
    const [isEditing, setIsEditing] = useState(null); // null means no row is being edited

    const defaultUsers = [
        { name: "Đoàn Trọng Thái", rollNumber: "HE153736" },
        { name: "Hà Tiến Thành", rollNumber: "HE153737" },
        { name: "Đoàn Văn Khánh", rollNumber: "HE153738" },
        { name: "Nguyễn Lê Huy", rollNumber: "HE153739" }
    ];
    const initialPackageStatus = {
        SRS: 'pending',
        SDS: 'pending',
        Coding: 'pending',
        Testing: 'pending'
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
    const handleDownload = () => {
        const className = "Sample Project Backlog";  // Placeholder, replace as needed
        const team = "Team";             // Placeholder, replace as needed
        const fileName = `${className}_${team}.xlsx`;

        // Create a blob representing an empty Excel file
        // For this demo, we're just creating an empty file, but in a real-world scenario, you could
        // use a library like XLSX.js to populate the file with data
        const blob = new Blob([""], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        // Use FileSaver's saveAs method to save the file
        saveAs(blob, fileName);
    };
    const complexities = ['Simple', 'Medium', 'Complex'];

    // State to manage the status of each package
    const [packageStatus, setPackageStatus] = useState(initialPackageStatus);

    // State to manage the visibility of the status editor modal
    const [isModalPKGVisible, setIsModalPKGVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (studentName && rollNumber) {
            console.log("Updated checklist:", checkList); // log the updated checklist
            const newId = checkList.length + 1;
            const newBacklogItem = {
                id: newId,
                student_name: studentName,
                roll_number: rollNumber,
                function_name: functionName,
                actor: actor,
                feature_name: featureName,
                complexity: complexity,
                loc: loc,
                planned_code_iteration: selectedIteration,
                percent_add: percent_add,
                enabled: true,
            };
            setCheckList(prevCheckList => [...prevCheckList, newBacklogItem]);

            // Clear the input fields
            setFunctionName('');
            setActor('');
            setFeatureName('');
            setComplexity('');
            setLoc('');
        }
        setIsModalVisible(false);
    };

    const save = (id) => {
        const updatedList = checkList.map(item => (item.id === id ? editingRecord : item));
        setCheckList(updatedList);

        // Integrate the grading logic here
        const currentRecord = updatedList.find(item => item.id === id); // Note the change here, using updatedList
        if (currentRecord) {
            const passedItems = Object.values(gradingCheckList).filter(v => v).length;
            const percentageComplete = (passedItems / 5) * 100;

            const percentAdd = parseFloat(currentRecord.percent_add) || 0;
            const locIterValue = ((percentageComplete * currentRecord.loc) / 100) + ((percentAdd * currentRecord.loc) / 100);

            const recordIndex = updatedList.findIndex(item => item.id === currentRecord.id);
            if (recordIndex !== -1) {
                updatedList[recordIndex].gradingChoices = gradingCheckList;
                updatedList[recordIndex].complete_percent_loc = `${percentageComplete}%`;
                updatedList[recordIndex].loc_iter = locIterValue;
            }
        }

        setCheckList(updatedList);  // You're setting checklist again with the updated values

        setIsEditing(null);
        setEditingRecord(null);
    };


    const handleEditOk = () => {
        if (editingCheckList) {
            const updatedCheckList = [...checkList];
            updatedCheckList[editingIndex].name = editingCheckList;
            updatedCheckList[editingIndex].description = editingDescription;
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
    const cancelEditing = () => {
        setIsEditing(null);
        setEditingRecord(null);
    };
    const handleEditCancel = () => {
        setEditModalVisible(false);
    };

    const handlePkgStatusModalCancel = () => {
        setPkgStatusModalVisible(false);
    };
    const [selectedUser, setSelectedUser] = useState(null);



    const handleStatusChange = (packageName, newStatus) => {
        setPackageStatus(prevStatus => ({
            ...prevStatus,
            [packageName]: newStatus
        }));
    };
    const showGradingLOCModal = (record) => {
        setCurrentRecord(record);

        // Fetch and set the previous grading choices
        const recordGradingChoices = checkList.find(item => item.id === record.id).gradingChoices;
        setGradingCheckList(recordGradingChoices || {
            useMVC: false,
            useJSTL: false,
            correctPackageNaming: false,
            correctClassNaming: false,
            useTextFormat: false,
        });

        setIsGradingLOCVisible(true);
    };
    const [isGradingLOCVisible, setIsGradingLOCVisible] = useState(false);
    const [gradingCheckList, setGradingCheckList] = useState({
        useMVC: 'notUse',  // default to 'notUse' or any value you prefer
        useJSTL: 'notUse',
        correctPackageNaming: 'notUse',
        correctClassNaming: 'notUse',
        useTextFormat: 'notUse',
    });

    const handleGradingLOCOk = (record) => {
        const passedItems = Object.values(gradingCheckList).filter(v => v === 'passed').length;
        const percentageComplete = (passedItems / 5) * 100;

        const percentAdd = parseFloat(record.percent_add) || 0;
        const locIterValue = ((percentageComplete * record.loc) / 100) + ((percentAdd * record.loc) / 100);

        const updatedList = [...checkList];
        const recordIndex = updatedList.findIndex(item => item.id === record.id);
        if (recordIndex !== -1) {
            updatedList[recordIndex].gradingChoices = gradingCheckList;
            updatedList[recordIndex].complete_percent_loc = `${percentageComplete}%`;
            updatedList[recordIndex].loc_iter = locIterValue;
        }

        setCheckList(updatedList);
        setIsGradingLOCVisible(false);
    };




    const [currentRecord, setCurrentRecord] = useState(null);


    // This function updates the complexity of a record in the checkList

    const columns = [
        {
            title: 'STT',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Feature',
            dataIndex: 'feature_name',
            key: 'feature_name',
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {
                    return <Input value={editingRecord.feature_name} onChange={(e) => setEditingRecord({ ...editingRecord, feature_name: e.target.value })} />;
                }
                return text;
            }
        },
        {
            title: 'Function',
            dataIndex: 'function_name',
            key: 'function_name',
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {
                    return <Input value={editingRecord.function_name} onChange={(e) => setEditingRecord({ ...editingRecord, function_name: e.target.value })} />;
                }
                return text;
            }
        },
        
        
        {
            title: 'Complexity',
            dataIndex: 'complexity',
            key: 'complexity',
            filters: complexities.map(complexity => ({ text: complexity, value: complexity })),
            onFilter: (value, record) => record.complexity === value,
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {
                    return (
                        <Select
                            value={editingRecord.complexity}
                            onChange={(value) => setEditingRecord({ ...editingRecord, complexity: value })}
                        >
                            {complexities.map(cmpx => (
                                <Select.Option key={cmpx} value={cmpx}>
                                    {cmpx}
                                </Select.Option>
                            ))}
                        </Select>
                    );
                }
                return text;
            }
        },
        {
            title: 'Actor',
            dataIndex: 'actor',
            key: 'actor',
            filters: [...new Set(checkList.map(item => item.actor))].map(actor => ({ text: actor, value: actor })),
            onFilter: (value, record) => record.actor === value,
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {
                    return <Input value={editingRecord.actor} onChange={(e) => setEditingRecord({ ...editingRecord, actor: e.target.value })} />;
                }
                return text;
            }
        },
        {
            title: 'LOC',
            dataIndex: 'loc',
            key: 'loc',
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {

                    return <Input value={editingRecord.loc} onChange={(e) => setEditingRecord({ ...editingRecord, loc: e.target.value })} />;

                }
                return text;
            }
        },
        
        {
            title: 'Planned Code Iteration',
            dataIndex: 'planned_code_iteration',
            key: 'planned_code_iteration',
            filters: iterations.map(iteration => ({ text: iteration, value: iteration })),
            onFilter: (value, record) => record.planned_code_iteration === value,
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {
                    return (
                        <Select
                            value={editingRecord ? editingRecord.planned_code_iteration : text}
                            onChange={value => {
                                const newEditingRecord = { ...editingRecord, planned_code_iteration: value };
                                setEditingRecord(newEditingRecord);
                            }}
                        >
                            {iterations.map(iter => (
                                <Select.Option key={iter} value={iter}>
                                    {iter}
                                </Select.Option>
                            ))}
                        </Select>
                    );
                }
                return text;
            }
        },
        {
            title: 'Student Name',
            dataIndex: 'student_name',
            key: 'student_name',
            render: (text, record) => {
                if (editingRecord && editingRecord.id === record.id) {
                    const selectedUser = defaultUsers.find(user => user.rollNumber === editingRecord.roll_number);
                    return selectedUser ? selectedUser.name : text;
                }
                return text;
            }
        },
        {
            title: 'Roll Number',
            dataIndex: 'roll_number',
            key: 'roll_number',
            filters: defaultUsers.map(user => ({ text: user.rollNumber, value: user.rollNumber })),
            onFilter: (value, record) => record.roll_number === value,
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {
                    return (
                        <Select
                            value={editingRecord.roll_number}
                            onChange={(value) => {
                                const correspondingUser = defaultUsers.find(user => user.rollNumber === value);
                                if (correspondingUser) {
                                    setEditingRecord({
                                        ...editingRecord,
                                        roll_number: value,
                                        student_name: correspondingUser.name
                                    });
                                }
                            }}
                        >
                            {defaultUsers.map(user => (
                                <Select.Option key={user.rollNumber} value={user.rollNumber}>
                                    {user.rollNumber}
                                </Select.Option>
                            ))}
                        </Select>
                    );
                }
                return text;
            }
        },
        
        
        
        {
            title: 'Actual Code Iteration',
            dataIndex: 'actual_code_iteration',
            key: 'actual_code_iteration',
            filters: iterations.map(iteration => ({ text: iteration, value: iteration })),
            onFilter: (value, record) => record.actual_code_iteration === value,
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {
                    return (
                        <Select
                            value={editingRecord ? editingRecord.actual_code_iteration : text}
                            onChange={value => {
                                const newEditingRecord = { ...editingRecord, actual_code_iteration: value };
                                setEditingRecord(newEditingRecord);
                            }}
                        >
                            {iterations.map(iter => (
                                <Select.Option key={iter} value={iter}>
                                    {iter}
                                </Select.Option>
                            ))}
                        </Select>
                    );
                }
                return text;
            }
        },

        {
            title: 'Package Status',
            dataIndex: 'pkg_status',
            key: 'pkg_status',
            render: (text, record) => (

                <Button onClick={() => setIsModalPKGVisible(true)}>
                    View Status
                </Button>
            )
        },
        {
            title: '% Completed',
            dataIndex: 'complete_percent_loc',
            key: 'complete_percent_loc',

            render: (text, record) => (
                <div>
                    {text ?
                        <>
                            {text}
                            <Button
                                size="small"
                                onClick={() => showGradingLOCModal(record)}
                            >
                                Edit
                            </Button>
                        </>
                        :
                        <Button size="small" onClick={() => showGradingLOCModal(record)}>Grading LOC</Button>
                    }
                </div>
            )
        }
        ,
        {
            title: 'Completed in Iteration',
            dataIndex: 'complete_in_iteration',
            key: 'complete_in_iteration',
            filters: iterations.map(iteration => ({ text: iteration, value: iteration })),
            onFilter: (value, record) => record.complete_in_iteration === value,
        }
        ,
        {
            title: '% Add',
            dataIndex: 'percent_add',
            key: 'percent_add',
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {
                    return <Input value={editingRecord.percent_add} onChange={(e) => setEditingRecord({ ...editingRecord, percent_add: e.target.value })} />;

                }

                return text;
            }
        }

        ,
        {
            title: 'Loc Iteration',
            dataIndex: 'loc_iter',
            key: 'loc_iter'
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
            render: (text, record) => {
                const editable = isEditing === record.id;
                if (editable) {
                    return <Input value={editingRecord.comment} onChange={(e) => setEditingRecord({ ...editingRecord, comment: e.target.value })} />;

                }

                return text;
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => {
                const editable = isEditing === record.id;
                return editable ? (
                    <div style={{ justifyContent: 'inline' }}>
                        <CheckOutlined onClick={() => save(record.id)} />
                        <CloseOutlined style={{ marginLeft: 10 }} onClick={cancelEditing} />

                    </div>
                ) : (
                    <span>
                        <EditOutlined onClick={() => {
                            setIsEditing(record.id);
                            setEditingRecord({ ...record });
                        }} />

                    </span>
                );
            }
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
                            title: <Link to='../teacher/class-user'>Class User</Link>,
                        },
                        {
                            title: <Link to='../teacher/team-details'>Team</Link>,
                        },

                        {
                            title: 'Project Backlog',
                        },
                    ]}
                    style={{
                        marginLeft: 140, marginTop: 20
                    }}
                />
                <h1>Project Backlog Management</h1>
                <Content style={{ textAlign: 'left', padding: '20px', paddingLeft: '40px', paddingRight: '40px' }}>
                    <Button type="primary" onClick={showModal}>
                        Add Project Backlog
                    </Button>

                    <Button icon={<DownloadOutlined />} onClick={handleDownload} style={{ marginTop: 16, marginLeft: 16 }}>
                        Export Project Backlog
                    </Button>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />} style={{ marginLeft: 16 }}>Import Project Backlog</Button>
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

                    <Modal title="Add Project Backlog" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <span style={{ color: 'red' }}>*</span>Student <br></br>
                        <Select
                            showSearch
                            style={{ width: 200, marginTop: 10 }}
                            placeholder="Select a user"
                            optionFilterProp="children"
                            onChange={value => {
                                const user = defaultUsers.find(user => user.rollNumber === value);
                                setSelectedUser(user);
                                setStudentName(user.name); // This line
                                setRollNumber(user.rollNumber); // and this line
                            }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {defaultUsers.map(user => (
                                <Select.Option key={user.rollNumber} value={user.rollNumber}>
                                    {user.name} - {user.rollNumber}
                                </Select.Option>
                            ))}

                        </Select>
                        <br /><br />
                        <span style={{ color: 'red' }}>*</span>Feature Name <br></br>
                        <Input
                            style={{ marginTop: 10 }}
                            value={featureName}
                            onChange={e => setFeatureName(e.target.value)}
                            placeholder="Feature Name"
                        />
                        <br /><br />
                        <span style={{ color: 'red' }}>*</span>Function Name <br></br>
                        <Input
                            style={{ marginTop: 10 }}
                            value={functionName}
                            onChange={e => setFunctionName(e.target.value)}
                            placeholder="Function Name"
                        />
                        <br /><br />
                        <span style={{ color: 'red' }}>*</span>Actor <br></br>
                        <Input

                            style={{ marginTop: 10 }}
                            value={actor}
                            onChange={e => setActor(e.target.value)}
                            placeholder="Actor"
                        />
                        <br /><br />

                        Complexity<br></br>
                        <Select
                            style={{ marginTop: 10 }}
                            defaultValue={complexities[0]}
                            onChange={(value) => setComplexity(value)}
                        >

                            {complexities.map(complex => (
                                <Select.Option key={complex} value={complex}>
                                    {complex}
                                </Select.Option>
                            ))}
                        </Select>
                        <br /><br />
                        <span style={{ color: 'red' }}>*</span>Line of code <br></br>
                        <Input
                            style={{ marginTop: 10 }}
                            value={loc}
                            onChange={e => setLoc(e.target.value)}
                            placeholder="LOC"
                        />
                        <br /><br />

                    </Modal>
                    <Modal
                        title="Edit % Completed"
                        visible={isEditPercentageVisible}
                        onOk={() => {
                            const updatedList = [...checkList];
                            const recordIndex = updatedList.findIndex(item => item.id === editingRecord.id);

                            if (recordIndex !== -1) {
                                updatedList[recordIndex].complete_percent_loc = `${editingPercentage}%`;
                                updatedList[recordIndex].loc_iter = updatedList[recordIndex].loc * (editingPercentage / 100);
                            }
                            setCheckList(updatedList);
                            setIsEditPercentageVisible(false);
                        }}
                        onCancel={() => setIsEditPercentageVisible(false)}
                    >
                        <Input
                            value={editingPercentage}
                            onChange={e => setEditingPercentage(e.target.value)}
                            addonAfter="%"
                            type="number"
                        />
                    </Modal>
                    <Modal
                        title="Grading LOC"
                        visible={isGradingLOCVisible}
                        onOk={() => handleGradingLOCOk(currentRecord)}
                        onCancel={() => setIsGradingLOCVisible(false)}
                    >
                         <div className="grading-item">
                            <strong>Sử dụng mô hình MVC cho chương trình</strong>
                            <div className="grading-options">
                            <input type="radio" value="passed" checked={gradingCheckList.useMVC === 'passed'} onChange={() => setGradingCheckList(prev => ({ ...prev, useMVC: 'passed' }))} />Passed
                            <input type="radio" value="notPassed" checked={gradingCheckList.useMVC === 'notPassed'} onChange={() => setGradingCheckList(prev => ({ ...prev, useMVC: 'notPassed' }))} />Not Passed
                            <input type="radio" value="notUse" checked={gradingCheckList.useMVC === 'notUse'} onChange={() => setGradingCheckList(prev => ({ ...prev, useMVC: 'notUse' }))} />Not Used
                            </div>
                        </div>
                        <div className="grading-item">
                            <strong>Sử dụng JSTL</strong>
                            <div className="grading-item">
                            <input type="radio" value="passed" checked={gradingCheckList.useJSTL === 'passed'} onChange={() => setGradingCheckList(prev => ({ ...prev, useJSTL: 'passed' }))} />Passed
                            <input type="radio" value="notPassed" checked={gradingCheckList.useJSTL === 'notPassed'} onChange={() => setGradingCheckList(prev => ({ ...prev, useJSTL: 'notPassed' }))} />Not Passed
                            <input type="radio" value="notUse" checked={gradingCheckList.useJSTL === 'notUse'} onChange={() => setGradingCheckList(prev => ({ ...prev, useJSTL: 'notUse' }))} />Not Used
                            </div> </div>
                        <div className="grading-item">
                            <strong>Format code cho đúng convention của Java?</strong>
                            <div className="grading-item"> 
                            <input type="radio" value="passed" checked={gradingCheckList.correctClassNaming === 'passed'} onChange={() => setGradingCheckList(prev => ({ ...prev, correctClassNaming: 'passed' }))} />Passed
                            <input type="radio" value="notPassed" checked={gradingCheckList.correctClassNaming === 'notPassed'} onChange={() => setGradingCheckList(prev => ({ ...prev, correctClassNaming: 'notPassed' }))} />Not Passed
                            <input type="radio" value="notUse" checked={gradingCheckList.correctClassNaming === 'notUse'} onChange={() => setGradingCheckList(prev => ({ ...prev, correctClassNaming: 'notUse' }))} />Not Used
                            </div> </div>
                        <div className="grading-item">
                            <strong>Đặt tên class cho đúng - Là danh từ, Chữ cái đầu của 1 từ là chữ hoa, Tên class phải có ý nghĩa, 		</strong>
                            <div className="grading-item">
                            <input type="radio" value="passed" checked={gradingCheckList.correctPackageNaming === 'passed'} onChange={() => setGradingCheckList(prev => ({ ...prev, correctPackageNaming: 'passed' }))} />Passed
                            <input type="radio" value="notPassed" checked={gradingCheckList.correctPackageNaming === 'notPassed'} onChange={() => setGradingCheckList(prev => ({ ...prev, correctPackageNaming: 'notPassed' }))} />Not Passed
                            <input type="radio" value="notUse" checked={gradingCheckList.correctPackageNaming === 'notUse'} onChange={() => setGradingCheckList(prev => ({ ...prev, correctPackageNaming: 'notUse' }))} />Not Used
                        </div></div>
                        <div className="grading-item">
                            <strong>Các trường nhập liệu cần kiểm tra</strong>
                            <div className="grading-item">
                            <input type="radio" value="passed" checked={gradingCheckList.useTextFormat === 'passed'} onChange={() => setGradingCheckList(prev => ({ ...prev, useTextFormat: 'passed' }))} />Passed
                            <input type="radio" value="notPassed" checked={gradingCheckList.useTextFormat === 'notPassed'} onChange={() => setGradingCheckList(prev => ({ ...prev, useTextFormat: 'notPassed' }))} />Not Passed
                            <input type="radio" value="notUse" checked={gradingCheckList.useTextFormat === 'notUse'} onChange={() => setGradingCheckList(prev => ({ ...prev, useTextFormat: 'notUse' }))} />Not Used
                        </div></div>
                        {/* ... Repeat for the other criteria ... */}
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
                    <Modal
                        title="View Package Status"
                        visible={isModalPKGVisible}
                        onOk={() => setIsModalPKGVisible(false)}
                        onCancel={() => setIsModalPKGVisible(false)}
                    >
                        {Object.keys(packageStatus).map(packageName => (
                            <div key={packageName} style={{ marginBottom: '15px' }}>
                                <strong style={{ display: 'inline-block', width: '150px' }}>{packageName} Status:</strong>
                                <Select
                                    value={packageStatus[packageName]}
                                    onChange={value => handleStatusChange(packageName, value)}
                                    style={{ width: '200px', marginLeft: '10px' }}
                                >
                                    <Select.Option value="doing">Doing</Select.Option>
                                    <Select.Option value="pending">Pending</Select.Option>
                                    <Select.Option value="complete">Complete</Select.Option>
                                </Select>
                            </div>
                        ))}
                    </Modal>
                    <Table
                        dataSource={checkList.map((item, index) => ({ ...item, key: index }))}
                        columns={columns}
                        style={{ marginTop: '20px' }}
                        scroll={{ x: 240 }}
                    />
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    );

};

export default Project_Backlog;