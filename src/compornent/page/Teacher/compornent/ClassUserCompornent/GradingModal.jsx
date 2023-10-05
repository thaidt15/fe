import React from 'react';
import { Modal, Input, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';


export const OG1GradingModal = ({ isVisible, handleOk, handleCancel, setSrsGrade, setSdsGrade }) => {
    return (
        <Modal
            title="Grading For Iteration 1"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >


            <span >SRS Grade</span> <Tooltip title="SRS grade will account for 10%"> <QuestionCircleOutlined /></Tooltip>
            <br></br>
            <Input
                style={{ marginTop: 10 }}
                placeholder="Enter SRS grade"
                onChange={(e) => {
                    const grade = Number(e.target.value);
                    console.log("SRS Grade Set:", grade);
                    setSrsGrade(grade);
                }}
            />
            <br /><br />
            <span >SDS Grade</span>  <Tooltip title="SDS grade will account for 10%"> <QuestionCircleOutlined /></Tooltip>
            <br></br>
            <Input
                style={{ marginTop: 10 }}
                placeholder="Enter SDS grade"
                onChange={(e) => setSdsGrade(Number(e.target.value))}
            />
            <br /><br />
            <span >LOC</span> <Tooltip title="LOC grade will account for 80% and automationly import from project backlog"> <QuestionCircleOutlined /></Tooltip>
            <br></br>
            <Input
                style={{ marginTop: 10 }}
                value={
                    9
                }
                readOnly
                disabled
            />
            <br /><br />
        </Modal>
    );
};

export const OG2GradingModal = ({ isVisible, handleOk, handleCancel, setSrsGrade, setSdsGrade }) => {
    return (
        <Modal
            title="Grading For Iteration 2"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >


            <span >SRS Grade</span> <Tooltip title="SRS grade will account for 10%"> <QuestionCircleOutlined /></Tooltip>
            <br></br>
            <Input
                style={{ marginTop: 10 }}
                placeholder="Enter SRS grade"
                onChange={(e) => {
                    const grade = Number(e.target.value);
                    console.log("SRS Grade Set:", grade);
                    setSrsGrade(grade);
                }}
            />
            <br /><br />
            <span >SDS Grade</span>  <Tooltip title="SDS grade will account for 10%"> <QuestionCircleOutlined /></Tooltip>
            <br></br>
            <Input
                style={{ marginTop: 10 }}
                placeholder="Enter SDS grade"
                onChange={(e) => setSdsGrade(Number(e.target.value))}
            />
            <br /><br />
            <span >LOC</span> <Tooltip title="LOC grade will account for 80% and automationly import from project backlog"> <QuestionCircleOutlined /></Tooltip>
            <br></br>
            <Input
                style={{ marginTop: 10 }}
                value={
                    9
                }
                readOnly
                disabled
            />
            <br /><br />
        </Modal>
    );
};

export const OG3GradingModal = ({ isVisible, handleOk, handleCancel, setSrsGrade, setSdsGrade }) => {
    return (
        <Modal
            title="Grading For Iteration 3"
            visible={isVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >


            <span >SRS Grade</span> <Tooltip title="SRS grade will account for 10%"> <QuestionCircleOutlined /></Tooltip>
            <br></br>
            <Input
                style={{ marginTop: 10 }}
                placeholder="Enter SRS grade"
                onChange={(e) => {
                    const grade = Number(e.target.value);
                    console.log("SRS Grade Set:", grade);
                    setSrsGrade(grade);
                }}
            />
            <br /><br />
            <span >SDS Grade</span>  <Tooltip title="SDS grade will account for 10%"> <QuestionCircleOutlined /></Tooltip>
            <br></br>
            <Input
                style={{ marginTop: 10 }}
                placeholder="Enter SDS grade"
                onChange={(e) => setSdsGrade(Number(e.target.value))}
            />
            <br /><br />
            <span >LOC</span> <Tooltip title="LOC grade will account for 80% and automationly import from project backlog"> <QuestionCircleOutlined /></Tooltip>
            <br></br>
            <Input
                style={{ marginTop: 10 }}
                value={
                    9
                }
                readOnly
                disabled
            />
            <br /><br />
        </Modal>
    );
};
