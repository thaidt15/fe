import React from 'react';
import { Button, Upload } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';

export const UploadDownloadButtons = ({ handleDownload, props, handleUpload, fileList, uploading }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
                icon={<DownloadOutlined />}
                onClick={handleDownload}
                style={{ marginLeft: 16 }}
            >
                Export Class User
            </Button>
            <Upload {...props}>
                <Button icon={<UploadOutlined />} style={{ marginLeft: 16 }}>
                    Import Class User
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
        </div>
    );
};
