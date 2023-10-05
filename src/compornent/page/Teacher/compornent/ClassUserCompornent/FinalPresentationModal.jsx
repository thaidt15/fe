import React from 'react';
import { Modal, Tabs, Table } from 'antd';

export const FinalPresentationModal = ({ isVisible, handleOk, handleCancel, classUser, teamGrades, packageGradeColumns, teamGradeColumns }) => {
    const { TabPane } = Tabs;

    return (
        <Modal
    title="Final Presentation"
    visible={isVisible}
    onOk={handleOk}
    onCancel={handleCancel}
    width="80%"  // Optional: Increase the width of the modal if needed
>
    <Tabs defaultActiveKey="1">
        <TabPane tab="Package Grade" key="1">
            <Table 
                dataSource={classUser} 
                columns={packageGradeColumns} 
                rowKey="id" 
                scroll={{ y: 240 }}  // Set the height for the scrollable area
            />
        </TabPane>
        <TabPane tab="Team Grade" key="2">
            <Table 
                dataSource={teamGrades} 
                columns={teamGradeColumns} 
                rowKey="team" 
                scroll={{ y: 240 }}  // Set the height for the scrollable area
            />
        </TabPane>
    </Tabs>
</Modal>

    );
};
